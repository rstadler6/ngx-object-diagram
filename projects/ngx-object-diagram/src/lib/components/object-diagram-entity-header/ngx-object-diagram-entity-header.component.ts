import { Component, Input } from '@angular/core';

@Component({
  selector: '[ngx-object-diagram-entity-header]',
  templateUrl: './ngx-object-diagram-entity-header.component.html',
  styleUrls: ['./ngx-object-diagram-entity-header.component.scss'],
})
export class NgxObjectDiagramEntityHeaderComponent {
  @Input()
  public text: string = 'object : Object';

  @Input()
  public x?: number;

  @Input()
  public y?: number;
}
