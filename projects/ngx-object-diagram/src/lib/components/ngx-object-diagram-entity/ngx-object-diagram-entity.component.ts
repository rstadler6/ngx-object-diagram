import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input, OnInit,
  Output
} from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";
import { Store } from "@ngrx/store";
import { Entity } from "../../model/entity";

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

  @Output()
  public fieldsSet: EventEmitter<{ key: string, fields: NgxObjectDiagramEntityField[] }> = new EventEmitter<{ key: string, fields: NgxObjectDiagramEntityField[] }>();

  public fields: NgxObjectDiagramEntityField[] = [];

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

  @Output()
  executeAction: EventEmitter<void> = new EventEmitter();

  onAction() {
    this.executeAction.emit();
  }

  @Output()
  addAssoc: EventEmitter<void> = new EventEmitter();

  onAddAssoc() {
    this.addAssoc.emit();
  }

  public ngOnInit() {
    if (this.entity) {
      this.setFields(this.entity);
    }
  }

  private setFields(entity: Entity) {
    let i = 0;
    const fields: NgxObjectDiagramEntityField[] = []

    entity.values.forEach((value, key) => {
      fields.push({
          fieldKey: key, fieldName: key, assocValues: (value instanceof Array<Record<string, unknown>> ? value : undefined),
          x: this.x, y: this.y + 25 + i * 40
      });
      i++;
    });

    this.fields = fields;
    this.fieldsSet.emit({ key: entity.guid, fields: fields });
  }
}
