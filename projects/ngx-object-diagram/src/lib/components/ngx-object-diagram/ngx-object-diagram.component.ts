import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";
import { NgxObjectDiagramAssoc } from "../../model/ngx-object-diagram-assoc";
import { NgxObjectDiagramEntityComponent } from "../ngx-object-diagram-entity/ngx-object-diagram-entity.component";
import { NgxObjectDiagramCoords } from "../../model/ngx-object-diagram-coords";
import { Observable } from "rxjs";
import { NgxObjectDiagramLineComponent } from "../ngx-object-diagram-line/ngx-object-diagram-line.component";

@Component({
  selector: "ngx-object-diagram",
  templateUrl: "ngx-object-diagram.component.html",
  styleUrls: ["ngx-object-diagram.component.scss"],
})
export class NgxObjectDiagramComponent implements AfterViewInit {
  @ViewChildren('entity')
  entityComponents: QueryList<NgxObjectDiagramEntityComponent> = new QueryList<NgxObjectDiagramEntityComponent>();

  @ViewChildren('line')
  assocLines: QueryList<NgxObjectDiagramLineComponent> = new QueryList<NgxObjectDiagramLineComponent>();

  @Input()
  public guidProp = "guid";

  @Input()
  public typeNameProp = "typeName";

  @Input()
  public displayNameProp = "displayName";

  @Input()
  public trackFields: (
    entity: Record<string, unknown>
  ) => NgxObjectDiagramEntityField[] = (entity) => {
    return Object.keys(entity)
      .filter((key) => key !== this.typeNameProp && key !== this.displayNameProp)
      .map((key) => {
        return {
          fieldName: key,
          fieldKey: key,
          value: entity[key],
          isAssoc: entity[key] instanceof Array<Record<string, unknown>>
        }
      });
  };

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

  onAddAssoc() {
    this.addAssoc.emit();
  }

  ngAfterViewInit() {
    console.log("after init");
    this.assocLines.forEach((line) => {
      const entityA = this.entityComponents?.find(e => e.guid === line.assoc?.guidA) ?? undefined;
      const entityB = this.entityComponents?.find(e => e.guid === line.assoc?.guidB) ?? undefined;
      if (entityA == undefined || entityB == undefined) {
        return;
      }

      line.coordsSubjectA = entityA.getAssocCoordsSubject(line.assoc?.fieldA ?? "");
      line.coordsSubjectB = entityB.getAssocCoordsSubject(line.assoc?.fieldB ?? "");
      line.initCoords();
    })
  }
}
