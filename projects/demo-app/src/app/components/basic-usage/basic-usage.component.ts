import { Component } from '@angular/core';

@Component({
    selector: 'app-basic-usage',
    templateUrl: './basic-usage.component.html',
    styleUrls: ['../../app.component.scss'],
})
export class BasicUsageComponent {
    public simpleObjs = [
        {
            guid: '1',
            displayName: 'geschaeft1',
            typeName: 'Geschaeft',
            titel: 'Testinhalt',
            beginn: '01.01.2023',
        },
        {
            guid: '2',
            displayName: 'geschaeft2',
            typeName: 'Geschaeft',
            titel: 'Testinhalt 13',
            beginn: '05.01.2025',
        },
    ];
}
