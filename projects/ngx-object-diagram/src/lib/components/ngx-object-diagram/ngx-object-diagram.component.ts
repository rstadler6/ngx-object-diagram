import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";
import { Entity } from "../../model/entity";
import { NgxObjectDiagramAssoc } from "../../model/ngx-object-diagram-assoc";

@Component({
  selector: "ngx-object-diagram",
  templateUrl: "ngx-object-diagram.component.html",
  styleUrls: ["ngx-object-diagram.component.scss"],
})
export class NgxObjectDiagramComponent implements OnInit,OnChanges {
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
  };*/

  @Input()
  public entities: Record<string, unknown>[] = [];

  @Input()
  public assocs: NgxObjectDiagramAssoc[] = [];

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
  }

  ngOnInit(): void {
    this.entities = this.objs.map(obj => {
      return { guid: obj['guid'] as string, values: new Map(Object.entries(obj)), collapsed: false }
    });
  }
}
