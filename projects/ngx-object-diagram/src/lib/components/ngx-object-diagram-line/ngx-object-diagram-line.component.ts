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
  public readonly coords$ = this._coordinateService.coordinates$.pipe(map(coordinates => coordinates.find(c => c.assocLine === this.assoc)));

  constructor(private readonly _coordinateService: CoordinatesService) {
  }
}
