import { Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../state/app.state";
import * as GraphActions from "../../state/graph.actions"

@Component({
  selector: '[ngx-collapse-button]',
  templateUrl: './ngx-collapse-button.component.html',
  styleUrls: ['./ngx-collapse-button.component.scss']
})
export class NgxCollapseButtonComponent implements OnInit {
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

  ngOnInit(): void {
    /*this.store.select(s => s.entities).subscribe(
      graph => {
        if (graph) {
          this.collapse.emit();
        }
      });*/
  }

  @HostListener("click")
  onClick() {
    this.store.dispatch(GraphActions.collapseEntity());
    this.collapse.emit();
  }
}
