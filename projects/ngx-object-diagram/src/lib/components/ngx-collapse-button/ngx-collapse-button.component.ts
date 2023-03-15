import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../state/app.state";

@Component({
  selector: '[ngx-collapse-button]',
  templateUrl: './ngx-collapse-button.component.html',
  styleUrls: ['./ngx-collapse-button.component.scss']
})
export class NgxCollapseButtonComponent {
  @Input()
  public x = 0;

  @Input()
  public y = 0;

  @Input()
  public displayText = "-";

  @Output()
  collapse: EventEmitter<void> = new EventEmitter();

  constructor(private store: Store<AppState>) {
    this.store = store;
  }

  @HostListener("click")
  onClick() {
    this.collapse.emit();
  }
}
