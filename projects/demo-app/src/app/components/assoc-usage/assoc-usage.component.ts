import { Component } from '@angular/core';

@Component({
  selector: 'app-assoc-usage',
  templateUrl: './assoc-usage.component.html',
  styleUrls: ['../../app.component.scss']
})
export class AssocUsageComponent {
  public assocObjs = [
    {
      guid: "123",
      displayName: "geschaeft1",
      typeName: "Geschaeft",
      titel: "Testinhalt",
      beginn: "01.01.2023",
      dokumente: [
        {
          guid: "456",
          titel: "Testgugus",
          displayName: "dok 1",
          typeName: "Dokument",
          dokumentDatum: "01.02.2002",
        },
        {
          guid: "789",
          titel: "Test 123",
          displayName: "dok 2",
          typeName: "Dokument",
          dokumentDatum: "01.02.2005",
        },
      ],
    },
  ];
}
