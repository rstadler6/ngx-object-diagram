import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";
import * as GraphActions from "../../state/graph.actions"
import { Store } from "@ngrx/store";
import { AppState } from "../../state/app.state";
import { getEntities } from "../../state/graph.reducer";
import { Entity } from "../../model/entity";

@Component({
  selector: "ngx-object-diagram",
  templateUrl: "ngx-object-diagram.component.html",
  styleUrls: ["ngx-object-diagram.component.scss"],
})
export class NgxObjectDiagramComponent implements OnInit, OnChanges {
  @Input()
  public typeNameProp: string = "typeName";

  @Input()
  public displayName: string = "displayName";

  @Input()
  public trackFields: (
    obj: Record<string, unknown>
  ) => NgxObjectDiagramEntityField[] = (obj) => {
    return Object.keys(obj)
      .filter((key) => key !== this.typeNameProp && key !== this.displayName)
      .map((key) => {
        return {
          fieldName: key,
          fieldKey: key,
          isAssoc: obj[key] instanceof Array<Record<string, unknown>>,
        };
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
  };

  @Input()
  public objs: Record<string, unknown>[] = [];

  public entities: Entity[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnChanges(): void {
    
  }

  ngOnInit(): void {
    this.store.select(getEntities).subscribe(
      entities => this.entities = entities
    )}
}
