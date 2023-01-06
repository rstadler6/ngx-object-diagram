import { Component, Input } from '@angular/core';
import { NgxObjectDiagramEntityField } from '../../model/ngx-object-diagram-entity-field';

@Component({
  selector: '[ngx-object-diagram-entity]',
  templateUrl: './ngx-object-diagram-entity.component.html',
  styleUrls: ['./ngx-object-diagram-entity.component.scss'],
})
export class NgxObjectDiagramEntityComponent {
  @Input()
  public x = 300;

  @Input()
  public y = 125;

  @Input()
  public height = 300;

  @Input()
  public width = 225;

  @Input()
  public title: string | unknown = '';

  @Input()
  public obj: Record<string, unknown> = {};

  @Input()
  public trackFields: (
    obj: Record<string, unknown>
  ) => NgxObjectDiagramEntityField[] = () => [];
}
