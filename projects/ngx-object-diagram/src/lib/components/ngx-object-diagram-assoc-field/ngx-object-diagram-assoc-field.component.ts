import { Component, Input } from "@angular/core";

@Component({
  selector: 'ngx-ngx-object-diagram-assoc-field',
  templateUrl: './ngx-object-diagram-assoc-field.component.html',
  styleUrls: ['./ngx-object-diagram-assoc-field.component.scss']
})
export class NgxObjectDiagramAssocFieldComponent {
  @Input()
  public x = 0;

  @Input()
  public y = 0;

  @Input()
  public key = "";

  @Input()
  public values: string[] = []
}
