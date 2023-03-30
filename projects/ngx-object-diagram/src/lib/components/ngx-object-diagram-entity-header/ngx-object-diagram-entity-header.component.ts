import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: '[ngx-object-diagram-entity-header]',
  templateUrl: './ngx-object-diagram-entity-header.component.html',
  styleUrls: ['./ngx-object-diagram-entity-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxObjectDiagramEntityHeaderComponent {
  @Input()
  public text = 'object : Object';

  @Input()
  public x = 0;

  @Input()
  public y = 0;

  @Output()
  public executeAction: EventEmitter<void> = new EventEmitter();

  public onAction() {
    this.executeAction.emit();
  }
}
