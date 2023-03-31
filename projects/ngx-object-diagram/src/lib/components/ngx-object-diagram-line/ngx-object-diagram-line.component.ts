import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map } from "rxjs";
import { NgxObjectDiagramAssoc } from '../../model/ngx-object-diagram-assoc';
import { CoordinatesService } from "../../services/coordinates.service";

@Component({
  selector: '[ngx-object-diagram-line]',
  templateUrl: './ngx-object-diagram-line.component.html',
  styleUrls: ['./ngx-object-diagram-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxObjectDiagramLineComponent {
  @Input()
  public assoc?: NgxObjectDiagramAssoc;
  public readonly coords$ = this._coordinateService.coordinates$.pipe(
    map(coordinates => {
      return coordinates.find(c =>
        c.assocLine.fieldA === this.assoc?.fieldA
        && c.assocLine.guidA == this.assoc?.guidA
        && c.assocLine.guidB === this.assoc?.guidB
        && c.assocLine.fieldB === this.assoc.fieldB);
    }));

  constructor(private readonly _coordinateService: CoordinatesService) {
  }
}
