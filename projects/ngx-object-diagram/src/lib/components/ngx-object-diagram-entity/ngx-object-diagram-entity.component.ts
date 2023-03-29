import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input, OnInit,
  Output
} from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";
import { NgxObjectDiagramAssoc } from "../../model/ngx-object-diagram-assoc";
import { NgxObjectDiagramCoords } from "../../model/ngx-object-diagram-coords";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

@Component({
  selector: "[ngx-object-diagram-entity]",
  templateUrl: "./ngx-object-diagram-entity.component.html",
  styleUrls: ["./ngx-object-diagram-entity.component.scss"],
})
export class NgxObjectDiagramEntityComponent implements OnInit {
  @Input()
  public guid: unknown;

  @Input()
  public guidProp = "guid";

  @Input()
  public typeNameProp = "typeName";

  @Input()
  public displayName = "displayName";

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
    this.updateAssocCoords();
    this.onDragged.emit();
  }

  @Output()
  executeAction: EventEmitter<void> = new EventEmitter();

  onAction() {
    this.executeAction.emit();
  }

  @Output()
  addAssoc: EventEmitter<void> = new EventEmitter();
  
  private assocCoordSubjects: Map<string, BehaviorSubject<NgxObjectDiagramCoords>> = new Map();
  
  private updateAssocCoords() {
    const updatedSubjects: string[] = [];

    this.fields.forEach((field, index) => {
      if (field.isAssoc) {
        if (this.assocCoordSubjects.has(field.fieldKey)) {
          this.assocCoordSubjects.get(field.fieldKey)?.next({ x: this.x, y: this.y + 25 + index * 40 });
        } else {
          const subject = new BehaviorSubject({ x: this.x, y: this.y + 25 + index * 40 })
          this.assocCoordSubjects.set(field.fieldKey, subject);
        }
        updatedSubjects.push(field.fieldKey);
      }
    });
    this.assocCoordSubjects.forEach((value, key) => {
      if (!updatedSubjects.includes(key)) {
        this.assocCoordSubjects.get(key)?.next({ x: this.x, y: this.y - 20 });
      }
    })
  }

  onAddAssoc() {
    this.addAssoc.emit();
  }

  public getAssocCoordsSubject(assocField: string): BehaviorSubject<NgxObjectDiagramCoords> {
    if (this.assocCoordSubjects.has(assocField)) {
      return this.assocCoordSubjects.get(assocField)!;
    }

    const subject = new BehaviorSubject({ x: this.x, y: this.y - 20 })
    this.assocCoordSubjects.set(assocField, subject);
    return subject;
  }

  public ngOnInit() {
    this.updateAssocCoords();
  }
}
