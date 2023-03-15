import { Component, EventEmitter, Input, Output } from "@angular/core";

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
  collapse: EventEmitter<void> = new EventEmitter();
}
