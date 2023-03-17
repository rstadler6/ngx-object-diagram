import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../state/app.state";

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

  @Input()
  public icon = "placeholder"

  // TODO: replace with icon
  @Input()
  public displayText = "-";

  @Output()
  execute: EventEmitter<void> = new EventEmitter();

  constructor(private store: Store<AppState>) {
    this.store = store;
  }

  @HostListener("click")
  onClick() {
    this.execute.emit();
  }
}
