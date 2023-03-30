import { Component, Input, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NgxObjectDiagramCoords } from "../../model/ngx-object-diagram-coords";
import { NgxObjectDiagramAssoc } from "../../model/ngx-object-diagram-assoc";

@Component({
  selector: "[ngx-object-diagram-line]",
  templateUrl: "./ngx-object-diagram-line.component.html",
  styleUrls: ["./ngx-object-diagram-line.component.scss"],
})
export class NgxObjectDiagramLineComponent implements OnDestroy {
  @Input()
  public assoc: NgxObjectDiagramAssoc | undefined

  public coordsSubjectA: BehaviorSubject<NgxObjectDiagramCoords> | undefined;

  public coordsSubjectB: BehaviorSubject<NgxObjectDiagramCoords> | undefined;

  public coordsA: NgxObjectDiagramCoords | undefined;

  public coordsB: NgxObjectDiagramCoords | undefined;

  initCoords() {
    this.coordsSubjectA?.subscribe((value) => this.coordsA = value);
    this.coordsSubjectB?.subscribe((value) => this.coordsB = value);
  }

  public ngOnDestroy(): void {
    this.coordsSubjectA?.unsubscribe();
    this.coordsSubjectB?.unsubscribe();
  }
}
