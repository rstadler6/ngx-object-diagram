import { Component, Input } from '@angular/core';
import { NgxObjectDiagramEntityField } from '../../model/ngx-object-diagram-entity-field';

@Component({
  selector: 'ngx-object-diagram',
  templateUrl: 'ngx-object-diagram.component.html',
  styleUrls: ['ngx-object-diagram.component.scss'],
})
export class NgxObjectDiagramComponent {
  @Input()
  public typeNameProp: string = 'typeName';

  @Input()
  public displayName: string = 'displayName';

  @Input()
  public trackFields: (
    obj: Record<string, unknown>
  ) => NgxObjectDiagramEntityField[] = (obj) => {
    return Object.keys(obj)
      .filter((key) => key !== this.typeNameProp && key !== this.displayName)
      .map((key) => {
        return {
          fieldName: key,
          fieldKey: key,
        };
      });
  };

  @Input()
  public objs: Record<string, unknown>[] = [
    {
      displayName: 'geschaeft1',
      typeName: 'Geschaeft',
      titel: 'Testinhalt',
      beginn: '01.01.2023',
    },
    {
      displayName: 'geschaeft2',
      typeName: 'Geschaeft',
      titel: 'Testinhalt 13',
      beginn: '05.01.2025',
    },
  ];
}
