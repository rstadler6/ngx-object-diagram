import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NgxObjectDiagramEntityComponent } from "../ngx-object-diagram-entity/ngx-object-diagram-entity.component";

@Component({
  selector: "[ngx-object-diagram-line]",
  templateUrl: "./ngx-object-diagram-line.component.html",
  styleUrls: ["./ngx-object-diagram-line.component.scss"],
})
export class NgxObjectDiagramLineComponent implements OnInit, OnDestroy {
  @Input()
  public elem1?: NgxObjectDiagramEntityComponent;

  @Input()
  public elem2?: NgxObjectDiagramEntityComponent;

  public linePositionX1: number = 0;
  public linePositionY1: number = 0;
  public linePositionX2: number = 0;
  public linePositionY2: number = 0;

  private _subs: (Subscription | undefined)[] = [];

  public ngOnInit(): void {
    this.updateLine();
    this._subs.push(this.elem1?.onDragged.subscribe(() => this.updateLine()));
    this._subs.push(this.elem2?.onDragged.subscribe(() => this.updateLine()));
  }

  public ngOnDestroy(): void {
    this._subs.forEach((s) => s?.unsubscribe());
  }

  public updateLine() {
    if (!this.elem1 || !this.elem2) {
      return;
    }

    this.linePositionY1 = this.elem1.y + this.elem1.height / 2;
    this.linePositionX1 = this.elem1.x + this.elem1.width;

    this.linePositionY2 = this.elem2.y;
    this.linePositionX2 = this.elem2.x;
  }
}
