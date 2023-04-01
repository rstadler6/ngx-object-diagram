import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgxObjectDiagramEntityField } from '../../model/ngx-object-diagram-entity-field';
import { CoordinatesService } from '../../services/coordinates.service';

@Component({
    selector: '[ngx-object-diagram-entity]',
    templateUrl: './ngx-object-diagram-entity.component.html',
    styleUrls: ['./ngx-object-diagram-entity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxObjectDiagramEntityComponent implements OnInit {
    @Input()
    public guid: unknown;

    @Input()
    public typeNameProp = 'typeName';

    @Input()
    public displayName = 'displayName';

    @Input()
    public x = 300;

    @Input()
    public y = 150;

    @Input()
    public height = 300;

    @Input()
    public width = 225;

    @Input()
    public title: string | unknown = '';

    @Input()
    public fields: NgxObjectDiagramEntityField[] = [];

    @Input()
    public maxTextLength: number = 30;

    @Output()
    public dragged = new EventEmitter<{ guid: unknown; x: number; y: number }>();

    @Output()
    public executeAction = new EventEmitter<{ guid: unknown }>();

    @Output()
    public addAssoc = new EventEmitter<{ guid: unknown; assocKey: string }>();

    public isDragging = false;

    @HostBinding('style.cursor')
    public get cursor(): string {
        return this.isDragging ? 'grabbing !important' : 'default';
    }

    public onMousedown() {
        this.isDragging = true;
    }

    @HostListener('mouseup')
    public onMouseUp() {
        this.isDragging = false;
    }

    @HostListener('mousemove', ['$event'])
    public onDrag(event: MouseEvent) {
        if (!this.isDragging) {
            return;
        }

        this.x = event.offsetX - 50;
        this.y = event.offsetY;
        this.dragged.emit({ guid: this.guid, x: this.x, y: this.y });
    }

    constructor(private readonly _coordinateService: CoordinatesService) {}
    public ngOnInit() {
        this._updateAssocCoords();
    }

    public onAction() {
        this.executeAction.emit({ guid: this.guid });
    }
    public onAddAssoc(field: NgxObjectDiagramEntityField) {
        this.addAssoc.emit({ guid: this.guid, assocKey: field.fieldKey });
    }
    private _updateAssocCoords() {
        this.fields.forEach((field, index) => {
            if (field.isAssoc) {
                this._coordinateService.updateCoordinate(this.guid, field.fieldKey, this.x, this.y, index);
            }
        });
    }
}
