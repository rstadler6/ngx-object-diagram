import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { NgxObjectDiagramEntityField } from '../../model/ngx-object-diagram-entity-field';
import { NgxObjectDiagramAssoc } from '../../model/ngx-object-diagram-assoc';
import { NgxObjectDiagramEntityComponent } from '../ngx-object-diagram-entity/ngx-object-diagram-entity.component';
import { CoordinatesService } from '../../services/coordinates.service';

@Component({
    selector: 'ngx-object-diagram',
    templateUrl: 'ngx-object-diagram.component.html',
    styleUrls: ['ngx-object-diagram.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxObjectDiagramComponent implements OnInit {
    @ViewChildren('entity')
    public entityComponents = new QueryList<NgxObjectDiagramEntityComponent>();

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
                    isAssoc: entity[key] instanceof Array<Record<string, unknown>>,
                };
            });
    };

    @Input()
    public entities: Record<string, unknown>[] = [];

    @Input()
    public set assocs(value: NgxObjectDiagramAssoc[]) {
        this._assocs = value;
        this._refreshAssocs();
    }
    public get assocs(): NgxObjectDiagramAssoc[] {
        return this._assocs;
    }

    @Input()
    public maxTextLength: number = 20;

    @Output()
    public executeAction = new EventEmitter<{ guid: unknown }>();

    @Output()
    public addAssoc = new EventEmitter<{ guid: unknown; assocKey: string }>();

    public readonly coords$ = this._coordinateService.coordinates$;

    private _assocs: NgxObjectDiagramAssoc[] = [];
    constructor(private readonly _coordinateService: CoordinatesService) {}

    public ngOnInit() {
        this._refreshAssocs();
    }

    public onEntityDragged(dragData: { guid: unknown; x: number; y: number }) {
        const entityComp = this.entityComponents?.find(e => e.guid === dragData.guid);
        if (!entityComp) {
            return;
        }

        this.assocs
            .filter(assoc => assoc?.guidB === dragData.guid || assoc?.guidA === dragData.guid)
            .forEach(assoc => {
                const assocKey = assoc?.guidA === dragData.guid ? assoc?.fieldA : assoc?.fieldB;
                const index = entityComp.fields.findIndex(field => field.fieldKey === assocKey);
                this._coordinateService.updateCoordinate(dragData.guid, assocKey ?? '', dragData.x, dragData.y, index);
            });
    }

    public onAction(entity: { guid: unknown }) {
        this.executeAction.emit(entity);
    }

    public onAddAssoc(event: { guid: unknown; assocKey: string }) {
        this.addAssoc.emit(event);
    }

    private _refreshAssocs() {
        setTimeout(() => {
            this.assocs.forEach(assoc => {
                const entityA = this.entityComponents?.find(e => e.guid === assoc?.guidA);
                const entityB = this.entityComponents?.find(e => e.guid === assoc?.guidB);
                if (!entityA || !entityB || !assoc) {
                    return;
                }
                const indexA = entityA.fields.findIndex(field => field.fieldKey === assoc?.fieldA);
                const indexB = entityA.fields.findIndex(field => field.fieldKey === assoc?.fieldB);
                this._coordinateService.upsertCoordinate(assoc, entityA.x, entityA.y, entityB.x, entityB.y, indexA, indexB);
            });
        });
    }
}
