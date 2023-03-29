import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Component({
  selector: '[ngx-action-button]',
  templateUrl: './ngx-action-button.component.html',
  styleUrls: ['./ngx-action-button.component.scss']
})
export class NgxActionButtonComponent {
  @Input()
  public x = 0;

  @Input()
  public y = 0;

  // TODO: replace with icon
  @Input()
  public displayText = "-";

  @Output()
  execute: EventEmitter<void> = new EventEmitter();

  @HostListener("click")
  onClick() {
    this.execute.emit();
  }
}
