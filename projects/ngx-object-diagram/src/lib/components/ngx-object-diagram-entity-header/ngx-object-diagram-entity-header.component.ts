import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: '[ngx-object-diagram-entity-header]',
    templateUrl: './ngx-object-diagram-entity-header.component.html',
    styleUrls: ['./ngx-object-diagram-entity-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxObjectDiagramEntityHeaderComponent {
    @Input()
    public text = 'object : Object';

    @Input()
    public x = 0;

    @Input()
    public y = 0;

    @Input()
    public maxTextLength = 30;

    @Input()
    public entityWidth = 225;

    @Input()
    public enableNavigation = false;

    @Output()
    public executeAction = new EventEmitter<void>();

    @Output()
    public navigateAction = new EventEmitter<void>();

    public onAction() {
        this.executeAction.emit();
    }
}
