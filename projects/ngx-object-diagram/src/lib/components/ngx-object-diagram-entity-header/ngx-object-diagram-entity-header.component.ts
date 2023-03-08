import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "[ngx-object-diagram-entity-header]",
  templateUrl: "./ngx-object-diagram-entity-header.component.html",
  styleUrls: ["./ngx-object-diagram-entity-header.component.scss"],
})
export class NgxObjectDiagramEntityHeaderComponent {
  @Input()
  public text: string = "object : Object";

  @Input()
  public x: number = 0;

  @Input()
  public y: number = 0;

  @Output()
  collapse: EventEmitter<void> = new EventEmitter();

  onCollapse() {
    this.collapse.emit();
  }
}
