import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public simpleObjs = [
    {
      guid: "1",
      displayName: "geschaeft1",
      typeName: "Geschaeft",
      titel: "Testinhalt",
      beginn: "01.01.2023",
    },
    {
      guid: "2",
      displayName: "geschaeft2",
      typeName: "Geschaeft",
      titel: "Testinhalt 13",
      beginn: "05.01.2025",
    },
  ];

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
