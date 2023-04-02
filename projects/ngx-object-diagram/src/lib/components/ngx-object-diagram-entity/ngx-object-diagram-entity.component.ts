import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
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

    @Output()
    public executeAction = new EventEmitter<{ guid: unknown }>();

    @Output()
    public addAssoc = new EventEmitter<{ guid: unknown; assocKey: string }>();

    public isDragging = false;

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

        event.preventDefault();
        this.point.x = event.offsetX - 100;
        this.point.y = event.offsetY + 15;
    }

    public onAction() {
        this.executeAction.emit({ guid: this.guid });
    }
    public onAddAssoc(field: NgxObjectDiagramEntityField) {
        this.addAssoc.emit({ guid: this.guid, assocKey: field.fieldKey });
    }
}
