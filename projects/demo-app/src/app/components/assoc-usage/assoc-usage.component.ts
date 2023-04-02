import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-assoc-usage',
    templateUrl: './assoc-usage.component.html',
    styleUrls: ['assoc-usage.component.scss'],
})
export class AssocUsageComponent {
    public objs = new BehaviorSubject<Record<string, unknown>[]>([
        {
            guid: '123',
            displayName: 'Darth Vader this is a verly long stuff',
            typeName: 'Person',
            title: 'Darth Vader this is a verly long stuff',
            birthday: '01.01.1950',
            relations: [
                { guid: '456', field: 'relations' },
                { guid: '789', field: 'relations' },
            ],
        },
        {
            guid: '456',
            displayName: 'Death Star',
            typeName: 'Object',
            title: 'Death Star',
            created: '01.02.1980',
            relatedPersons: [],
        },
        {
            guid: '789',
            displayName: 'Luke Skywalker',
            title: 'Luke Skywalker',
            typeName: 'Person',
            relatedPersons: [],
        },
    ]);

    public objs$ = this.objs.asObservable();
    public assocs = [
        {
            guidA: '123',
            guidB: '456',
            fieldA: 'relations',
            fieldB: 'relatedPersons',
        },
        {
            guidA: '123',
            guidB: '789',
            fieldA: 'relations',
            fieldB: 'relatedPersons',
        },
    ];

    public addObj(data: { guid: unknown; assocKey: string }): void {
        console.log('addobj');
        const newObj = {
            guid: '101112',
            title: 'Another Person',
            displayName: 'another person',
            typeName: 'Person',
            birthday: '01.02.2005',
            relations: [{ guid: '123', field: 'relations' }],
        };

        const newObjs = [...this.objs.getValue(), newObj];
        this.objs.next(newObjs);
        this.assocs = [...this.assocs, { fieldA: data.assocKey, guidA: data.guid + '', fieldB: 'relations', guidB: newObj.guid }];
    }

    public doSomething(data: { guid: unknown }): void {
        const obj = this.objs.getValue().find(obj => obj['guid'] === data.guid);

        if (!obj) {
            return;
        }

        obj['title'] = 'this name changed';
        console.log('changed', obj);
        this.objs.next([...this.objs.getValue().filter(obj => obj['guid'] === data.guid), obj]);
    }
}
