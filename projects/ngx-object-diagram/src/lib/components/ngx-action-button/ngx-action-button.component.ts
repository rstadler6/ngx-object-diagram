import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: '[ngx-action-button]',
  templateUrl: './ngx-action-button.component.html',
  styleUrls: ['./ngx-action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxActionButtonComponent {
  @Input()
  public x = 0;

  @Input()
  public y = 0;

  // TODO: replace with icon
  @Input()
  public displayText = '-';

  @Output()
  public execute = new EventEmitter<void>();

  @HostListener('click')
  public executeClicked() {
    this.execute.emit();
  }
}
