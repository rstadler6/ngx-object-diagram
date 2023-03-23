import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../state/app.state";
import { selectCurrentGraphId, selectEntities } from "../../state/graph.selectors";
import { Entity } from "../../model/entity";
import { setCurrentGraphId, setEntities } from "../../state/graph.actions";
import { skip } from "rxjs";
import { NgxObjectDiagramAssoc } from "../../model/ngx-object-diagram-assoc";

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

  @Input()
  public assocs: NgxObjectDiagramAssoc[] = [];

  @HostListener("mouseenter")
  public onMouseEnter() {
    //this.store.dispatch(setCurrentGraphId({ graphId: this.graphId }));
  }

  public entities: Entity[] = [];

  private graphId = "";

  constructor(private store: Store<AppState>) {
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
    this.store.dispatch(setEntities({ objs: this.objs, graphId: this.graphId }));
  }

  ngOnInit(): void {
    this.entities = this.objs.map(obj => {
      return { guid: obj['guid'] as string, values: new Map(Object.entries(obj)), collapsed: false }
    });
  }
}
