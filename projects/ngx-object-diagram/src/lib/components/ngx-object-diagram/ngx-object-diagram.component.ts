import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren
} from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";
import { NgxObjectDiagramAssoc } from "../../model/ngx-object-diagram-assoc";
import { NgxObjectDiagramEntityComponent } from "../ngx-object-diagram-entity/ngx-object-diagram-entity.component";
import { NgxObjectDiagramLineComponent } from "../ngx-object-diagram-line/ngx-object-diagram-line.component";
import { CoordinatesService } from "../../services/coordinates.service";

@Component({
  selector: 'ngx-object-diagram',
  templateUrl: 'ngx-object-diagram.component.html',
  styleUrls: ['ngx-object-diagram.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxObjectDiagramComponent implements AfterViewInit {
  @ViewChildren('entity')
  public entityComponents = new QueryList<NgxObjectDiagramEntityComponent>();

  @ViewChildren('line')
  public assocLines = new QueryList<NgxObjectDiagramLineComponent>();

  @Input()
  public guidProp = 'guid';

  @Input()
  public typeNameProp = 'typeName';

  @Input()
  public displayNameProp = 'displayName';

  @Input()
  public trackFields: (entity: Record<string, unknown>) => NgxObjectDiagramEntityField[] = (entity) => {
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
  public executeAction = new EventEmitter<void>();

  @Output()
  public addAssoc = new EventEmitter<void>();

  constructor(private readonly _coordinateService: CoordinatesService) {
  }

  public ngAfterViewInit() {
    this.assocLines.forEach((line) => {
      const entityA = this.entityComponents?.find(e => e.guid === line.assoc?.guidA);
      const entityB = this.entityComponents?.find(e => e.guid === line.assoc?.guidB);
      if (!entityA || !entityB || !line.assoc) {
        return;
      }

      this._coordinateService.upsertCoordinate(line.assoc, entityA.x, entityA.y, entityB.x, entityB.y);
    });
  }

  public onEntityDragged(dragData: { guid: unknown, x: number, y: number }) {
    const entityComp = this.entityComponents?.find(e => e.guid === dragData.guid);
    if (!entityComp) {
      return;
    }

    const assocsToUpdate = this.assocLines.map(line => line.assoc).filter(assoc => assoc?.guidB === dragData.guid || assoc?.guidA === dragData.guid);
    assocsToUpdate.forEach(assoc => {
        const assocKey = assoc?.guidA === dragData.guid ? assoc?.fieldA : assoc?.fieldB;
        const index = entityComp.fields.findIndex(field => field.fieldKey === assocKey);
        this._coordinateService.updateCoordinate(dragData.guid, assocKey ?? '', dragData.x, dragData.y, index);
    });
  }

  public onAction() {
    this.executeAction.emit();
  }

  public onAddAssoc() {
    this.addAssoc.emit();
  }
}
