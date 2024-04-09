import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    HostListener,
} from '@angular/core';
import { NgxObjectDiagramEntityField } from '../../model/ngx-object-diagram-entity-field';
import { NgxObjectDiagramAssoc } from '../../model/ngx-object-diagram-assoc';
import { NgxObjectDiagramEntityComponent } from '../ngx-object-diagram-entity/ngx-object-diagram-entity.component';

@Component({
    selector: 'ngx-object-diagram',
    templateUrl: 'ngx-object-diagram.component.html',
    styleUrls: ['ngx-object-diagram.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxObjectDiagramComponent<T extends Record<string, unknown>> implements OnInit, AfterViewChecked {
    @ViewChildren('entity')
    public entityComponents?: QueryList<NgxObjectDiagramEntityComponent>;

    @ViewChild('svg')
    public svg?: ElementRef<HTMLElement>;

    @Input()
    public guidProp = 'guid';

    @Input()
    public typeNameProp = 'typeName';

    @Input()
    public displayNameProp = 'displayName';

    @Input()
    public trackFields: (entity: Record<string, unknown>) => NgxObjectDiagramEntityField[] = entity => {
        return Object.keys(entity)
            .filter(key => key !== this.typeNameProp && key !== this.displayNameProp)
            .map(key => {
                return {
                    fieldName: key,
                    fieldKey: key,
                    value: entity[key],
                    isAssoc: entity[key] instanceof Array,
                };
            });
    };

    @Input()
    public set entities(value: unknown[]) {
        this._entities = value as T[];
        this._calculatePositions();
    }
    public get entities(): T[] {
        return this._entities;
    }

    @Input()
    public set assocs(value: NgxObjectDiagramAssoc[]) {
        this._assocs = value;
    }
    public get assocs(): NgxObjectDiagramAssoc[] {
        return this._assocs;
    }

    @Input()
    public maxTextLength = 20;

    @Input()
    public autoAdjustHeight = false;

    @Output()
    public executeAction = new EventEmitter<{ guid: unknown }>();

    @Output()
    public addAssoc = new EventEmitter<{ guid: unknown; assocKey: string }>();

    public positions?: { [guid: string]: { x: number; y: number } };
    
    public entityWidth = 225;

    private _assocs: NgxObjectDiagramAssoc[] = [];
    private _entities: T[] = [];
    private _entityWidth = 0;
    private _initialHeight = 800;

    constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) {}

    public ngOnInit() {
        this.entityWidth = parseInt(getComputedStyle(this._elementRef.nativeElement).getPropertyValue('--entity-min-width'), 10);
        this._initialHeight =
            parseInt(getComputedStyle(this._elementRef.nativeElement).getPropertyValue('--ngx-obj-diagram-height'), 10) || 800;
        if (this.autoAdjustHeight) {
            this._calculateHeight();
        }
        this._calculatePositions();
    }

    public ngAfterViewChecked() {
        if (this.autoAdjustHeight) {
            this._calculateHeight();
        }
    }

    public onAction(entity: { guid: unknown }) {
        this.executeAction.emit(entity);
    }

    public onAddAssoc(event: { guid: unknown; assocKey: string }) {
        this.addAssoc.emit(event);
    }

    private _dragDropEntity: NgxObjectDiagramEntityComponent | undefined;

    public onDragDropStart(event: { entity: NgxObjectDiagramEntityComponent }) {
        this._dragDropEntity = event.entity;
    }

    @HostListener('mousemove', ['$event'])
    public onDrag(event: MouseEvent) {
        if (this._dragDropEntity) {
            event.preventDefault();
            this._dragDropEntity.point.x = event.offsetX - 100;
            this._dragDropEntity.point.y = event.offsetY + 15;
        }
    }

    @HostListener('mouseup')
    public onMouseUp() {
        if (this._dragDropEntity) {
            this._dragDropEntity = undefined;
        }
    }

    private _calculateHeight() {
        let largestHeight = this._initialHeight;

        this.entities.forEach(entity => {
            const height = (this.positions?.[entity[this.guidProp] + ''].y ?? 0) + (this.trackFields(entity).length + 1) * 40 - 35;
            if (height > largestHeight) {
                largestHeight = height;
            }
        });

        document.documentElement.style.setProperty('--ngx-obj-diagram-height', largestHeight + 'px');
    }

    private _calculatePositions() {
        const newPositions: { [guid: string]: { x: number; y: number } } = {};

        let entityGuid = this.entities[0][this.guidProp] + '';
        let entityHeight = this.trackFields(this.entities[0]).length * 10;

        const clientWidth = this._elementRef.nativeElement.firstChild.clientWidth;
        const clientHeight = this._elementRef.nativeElement.firstChild.clientHeight;

        const centerX = clientWidth / 2 - this.entityWidth / 2;
        const centerY = clientHeight / 2 - (entityHeight + 20);

        const radius = Math.min(clientWidth, clientHeight) / 2 - Math.min(this.entityWidth, entityHeight) * 2;
        const angle = (2 * Math.PI) / this.entities.length;

        newPositions[entityGuid] = { x: centerX, y: centerY };
        const maxX = clientWidth - this.entityWidth - 10;

        for (let i = 1; i < this.entities.length; i++) {
            entityGuid = this.entities[i][this.guidProp] + '';
            entityHeight = this.trackFields(this.entities[i]).length * 30;

            const x = Math.max(Math.min(centerX + radius * Math.cos(angle * (i - 1)), maxX), 10);
            const y = Math.max(Math.min(centerY + radius * Math.sin(angle * (i - 1)), clientHeight - entityHeight), 50);
            newPositions[entityGuid] = { x, y };
        }

        this.positions = newPositions;
        this._cdr.detectChanges();
    }

    public x1(assoc: NgxObjectDiagramAssoc) {
        if (!this.positions) {
            return;
        }
        const xA = this.positions[assoc.guidA]?.x ?? 0;
        const xB = this.positions[assoc.guidB]?.x ?? 0;
        return xA > xB ? xA : xA + this.entityWidth;
    }

    public y1(assoc: NgxObjectDiagramAssoc) {
        if (!this.positions || !this.entityComponents) {
            return;
        }
        const yA = this.positions[assoc.guidA]?.y ?? 0;
        const indexA =
            this.entityComponents?.find(e => e.guid === assoc.guidA)?.fields.findIndex(field => field.fieldKey === assoc.fieldA) ?? 0;

        return yA + 25 + indexA * 40;
    }

    public x2(assoc: NgxObjectDiagramAssoc) {
        if (!this.positions) {
            return;
        }
        const xA = this.positions[assoc.guidA]?.x ?? 0;
        const xB = this.positions[assoc.guidB]?.x ?? 0;
        return xB > xA ? xB : xB + this.entityWidth;
    }

    public y2(assoc: NgxObjectDiagramAssoc) {
        if (!this.positions) {
            return;
        }
        const yB = this.positions[assoc.guidB]?.y ?? 0;
        const indexB =
            this.entityComponents?.find(e => e.guid === assoc.guidB)?.fields.findIndex(field => field.fieldKey === assoc.fieldB) ?? 0;

        return yB + 25 + indexB * 40;
    }
}
