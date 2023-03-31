import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: '[ngx-add-assoc-button]',
  templateUrl: './ngx-add-assoc-button.component.html',
  styleUrls: ['./ngx-add-assoc-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxAddAssocButtonComponent {
  @Input()
  public x = 0;

  @Input()
  public y = 0;

  @Input()
  public displayText = '+';

  @Output()
  public addAssoc = new EventEmitter<void>();

  @HostListener('click')
  public onAddAssocClicked() {
    this.addAssoc.emit();
  }
}
