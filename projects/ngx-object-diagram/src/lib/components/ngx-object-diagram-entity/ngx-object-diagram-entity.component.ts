import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input, OnInit,
  Output
} from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";
import { createAction, props, Store } from "@ngrx/store";
import { Entity } from "../../model/entity";
import { AppState } from "../../state/app.state";
import { collapseEntity } from "../../state/graph.actions";
import { selectEntity } from "../../state/graph.reducer";

@Component({
  selector: "[ngx-object-diagram-entity]",
  templateUrl: "./ngx-object-diagram-entity.component.html",
  styleUrls: ["./ngx-object-diagram-entity.component.scss"],
})
export class NgxObjectDiagramEntityComponent implements OnInit {
  @Input()
  public x = 300;

  @Input()
  public y = 150;

  @Input()
  public height = 300;

  @Input()
  public width = 225;

  @Input()
  public title: string | unknown = "";

  @Output()
  public onDragged: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public trackFields: (
    obj: Record<string, unknown>
  ) => NgxObjectDiagramEntityField[] = () => [];

  @Input()
  public entity: Entity | undefined;

  public isDragging = false;

  @HostBinding("style.cursor")
  public get cursor(): string {
    return this.isDragging ? "grabbing !important" : "default";
  }

  @HostListener("mousedown")
  public onMousedown() {
    //console.log("click");
    this.isDragging = true;
    //console.log("click", this.isDragging);
  }

  @HostListener("mouseup")
  public onMouseUp() {
    this.isDragging = false;
  }

  @HostListener("mousemove", ["$event"])
  public onDrag(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    event.preventDefault();
    this.x = event.offsetX - 50;
    this.y = event.offsetY;
    this.onDragged.emit();
  }

  constructor(private store: Store<AppState>) {}

  public onCollapse() {
    if (this.entity) {
      this.store.dispatch(collapseEntity({ entity: this.entity }));
    }
  }

  public ngOnInit() {
    if (this.entity) {
      this.store.select(selectEntity(this.entity?.guid)).subscribe(entity => this.entity = entity);
    }
  }
}
