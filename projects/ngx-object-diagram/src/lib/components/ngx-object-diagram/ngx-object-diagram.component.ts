import { Component, Input } from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";

@Component({
  selector: "ngx-object-diagram",
  templateUrl: "ngx-object-diagram.component.html",
  styleUrls: ["ngx-object-diagram.component.scss"],
})
export class NgxObjectDiagramComponent {
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
      .filter((key) => !(obj[key] instanceof Array<Record<string, unknown>>))
      .map((key) => {
        return {
          fieldName: key,
          fieldKey: key,
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
}
