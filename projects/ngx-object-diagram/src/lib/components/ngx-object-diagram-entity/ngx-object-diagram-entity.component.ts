import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";

@Component({
  selector: "[ngx-object-diagram-entity]",
  templateUrl: "./ngx-object-diagram-entity.component.html",
  styleUrls: ["./ngx-object-diagram-entity.component.scss"],
})
export class NgxObjectDiagramEntityComponent {
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

  @Input()
  public obj: Record<string, unknown> = {};

  @Output()
  public onDragged: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public trackFields: (
    obj: Record<string, unknown>
  ) => NgxObjectDiagramEntityField[] = () => [];

  public isDragging = false;

  public onDrag(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }
    event.preventDefault();

    this.x = event.offsetX - 50;
    this.y = event.offsetY;
    this.onDragged.emit();
  }
}
