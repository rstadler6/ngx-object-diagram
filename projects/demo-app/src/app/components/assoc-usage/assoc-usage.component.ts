import { Component } from '@angular/core';

@Component({
  selector: 'app-assoc-usage',
  templateUrl: './assoc-usage.component.html',
  styleUrls: ['../../app.component.scss']
})
export class AssocUsageComponent {
  public objs = [
    {
      guid: '123',
      displayName: 'geschaeft1',
      typeName: 'Geschaeft',
      titel: 'Testinhalt',
      beginn: '01.01.2023',
      dokumente: [
        { guid: '456', field: 'geschaeft' }, { guid: '789', field: 'geschaeft' }
      ],
    },
    {
      guid: '456',
      titel: 'Testgugus',
      displayName: 'dok 1',
      typeName: 'Dokument',
      dokumentDatum: '01.02.2002',
      geschaeft: [
      ],
    },
    {
      guid: '789',
      titel: 'Test 123',
      displayName: 'dok 2',
      typeName: 'Dokument',
    },
  ];

  public assocs = [
    {
      guidA: '123',
      guidB: '456',
      fieldA: 'dokumente',
      fieldB: 'geschaeft',
    },
    {
      guidA: '123',
      guidB: '789',
      fieldA: 'dokumente',
      fieldB: 'geschaeft',
    }
  ];

  addObj() {
    this.objs.push(
    {
      guid: '101112',
      titel: 'Test 123',
      displayName: 'dok 2',
      typeName: 'Dokument',
      dokumentDatum: '01.02.2005',
      geschaeft: [
        // @ts-ignore
        { guid: '123', field: 'dokumente' }
      ],
    })
  }
}
