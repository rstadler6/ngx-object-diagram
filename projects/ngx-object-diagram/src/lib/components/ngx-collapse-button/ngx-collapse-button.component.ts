import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Component({
  selector: '[ngx-collapse-button]',
  templateUrl: './ngx-collapse-button.component.html',
  styleUrls: ['./ngx-collapse-button.component.scss']
})
export class NgxCollapseButtonComponent {
  @Input()
  public x: number = 0;

  @Input()
  public y: number = 0;

  @Output()
  collapse: EventEmitter<void> = new EventEmitter();

  @HostListener("click")
  onClick() {
    this.collapse.emit();
  }
}
