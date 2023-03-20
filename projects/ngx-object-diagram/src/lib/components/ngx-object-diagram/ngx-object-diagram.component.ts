import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";
import { select, Store } from "@ngrx/store";
import { selectCurrentEntities, selectCurrentGraphId } from "../../state/graph.selectors";
import { Entity } from "../../model/entity";
import { skip, tap } from "rxjs";
import { State } from "../../state/graph.reducer";
import { addEntities, addGraph, setCurrentGraphId } from "../../state/graph.actions";

@Component({
  selector: "ngx-object-diagram",
  templateUrl: "ngx-object-diagram.component.html",
  styleUrls: ["ngx-object-diagram.component.scss"],
})
export class NgxObjectDiagramComponent implements OnInit,OnChanges {
  @Input()
  public typeNameProp: string = "typeName";

  @Input()
  public displayName: string = "displayName";

 /* @Input()
  public trackFields: (
    obj: Record<string, unknown>
  ) => NgxObjectDiagramEntityField[] = (obj) => {
    return Object.keys(obj)
      .filter((key) => key !== this.typeNameProp && key !== this.displayName)
      .map((key) => {
        return {
          fieldName: key,
          fieldKey: key,
          isAssoc: obj[key] instanceof Array<Record<string, unknown>>
        }
      });
  };

  @Input()
  public trackAssocs: (
    obj: Record<string, unknown>
  ) => Record<string, unknown>[] = (obj) => {
    return Object.keys(obj)
      .filter((key) => obj[key] instanceof Array<Record<string, unknown>>)
      .flatMap((key) => {
        return obj[key] as Record<string, unknown>[];
      });
  };*/

  @Input()
  public objs: Record<string, unknown>[] = [];

  @HostListener("mouseenter")
  public onMouseEnter() {
    //this.store.dispatch(setCurrentGraphId({ graphId: this.graphId }));
  }

  public entities: Entity[] = [];

  @Input()
  public graphId = "";

  constructor(private store: Store<State>) {
  }

  @Output()
  executeAction: EventEmitter<void> = new EventEmitter();

  onAction() {
    this.executeAction.emit();
  }

  @Output()
  addAssoc: EventEmitter<void> = new EventEmitter();
  fields: Map<string, NgxObjectDiagramEntityField[]> = new Map()

  public onFieldsSet(value: { key: string, fields: NgxObjectDiagramEntityField[] }) {
    this.fields.set(value.key, value.fields);
  }

  onAddAssoc() {
    this.addAssoc.emit();
  }

  ngOnChanges(): void {
    //this.store.dispatch(addEntities({ objs: this.objs, graphId: this.graphId }));
  }

  ngOnInit(): void {
    this.store.pipe(select(selectCurrentEntities), skip(0)).subscribe(
      entities => this.entities = entities  // console.log("test " + JSON.stringify(entities))
    );
    /*this.store.select(selectCurrentGraphId).subscribe(
      id => this.graphId = id
    );*/

    if (this.graphId) {
      console.log("graphId: " + this.graphId);
      this.store.dispatch(setCurrentGraphId({ graphId: this.graphId }));
      this.store.dispatch(addGraph({ graph: { id: this.graphId } }));
      this.store.dispatch(addEntities({ objs: this.objs, graphId: this.graphId }));
    };
  }
}
