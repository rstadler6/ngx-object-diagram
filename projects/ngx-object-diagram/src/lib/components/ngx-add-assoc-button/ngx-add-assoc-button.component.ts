import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Component({
  selector: '[ngx-add-assoc-button]',
  templateUrl: './ngx-add-assoc-button.component.html',
  styleUrls: ['./ngx-add-assoc-button.component.scss']
})
export class NgxAddAssocButtonComponent {
  @Input()
  public x = 0;

  @Input()
  public y = 0;

  @Input()
  public displayText = "+";

  @Output()
  addAssoc: EventEmitter<void> = new EventEmitter();

  @HostListener("click")
  onClick() {
    this.addAssoc.emit();
  }
}