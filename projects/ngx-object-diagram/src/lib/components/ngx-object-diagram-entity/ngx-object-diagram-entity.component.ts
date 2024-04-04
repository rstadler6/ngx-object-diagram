import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxObjectDiagramEntityField } from '../../model/ngx-object-diagram-entity-field';
@Component({
    selector: '[ngx-object-diagram-entity]',
    templateUrl: './ngx-object-diagram-entity.component.html',
    styleUrls: ['./ngx-object-diagram-entity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxObjectDiagramEntityComponent {
    @Input()
    public guid: unknown;

    @Input()
    public typeNameProp = 'typeName';

    @Input()
    public displayName = 'displayName';

    @Input()
    public point: { x: number; y: number } = { x: 0, y: 0 };

    @Input()
    public title: string | unknown = '';

    @Input()
    public fields: NgxObjectDiagramEntityField[] = [];

    @Input()
    public maxTextLength = 30;

    @Input()
    public entityWidth = 225;

    @Input()
    public enableNavigation = false;

    @Output()
    public executeAction = new EventEmitter<{ guid: unknown }>();
    
    @Output()
    public executeNavigate = new EventEmitter<{ guid: unknown }>();

    @Output()
    public addAssoc = new EventEmitter<{ guid: unknown; assocKey: string }>();

    @Output()
    public startDragDrop = new EventEmitter<{ entity: NgxObjectDiagramEntityComponent }>();

    public onDragDropStart() {
        this.startDragDrop.emit({ entity: this });
    }

    public onAction() {
        this.executeAction.emit({ guid: this.guid });
    }

    public onNavigate() {
        this.executeNavigate.emit({ guid: this.guid });
    }

    public onAddAssoc(field: NgxObjectDiagramEntityField) {
        this.addAssoc.emit({ guid: this.guid, assocKey: field.fieldKey });
    }
}
