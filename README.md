# ngx-object-diagram

## About this project

This angular library lets you generate object-diagrams from typescript objects.
Please note, that it is not a target or intention of it to reach uml conformity.

## Usage

```html
<ngx-object-diagram [objs]="simpleObjs"></ngx-object-diagram>
```

## Features

-   customize color, font-family and sizes via css-variables
-   Entities can be dragged
-   Support for simple entities as well as overrides for more complex objects with associations
-   Supports interactions with two buttons: One in the header of an entity (ex. for reloading) and one for adding more associations

## Documentation

### API

The `ngx-object-diagram` component can be configured with the following properties.

``` typescript
    @Input() // key of the identifier property which every entity must have
    public guidProp = 'guid';

    @Input() // key of the type property, which value is used in the entity header
    public typeNameProp = 'typeName';

    @Input() // key of the displayname property, which value is used in the entity header
    public displayNameProp = 'displayName';

    @Input() // a function to filter the fields of provided entities, must return NgxObjectDiagramEntityField[]
    public trackFields: (entity: Record<string, unknown>) => NgxObjectDiagramEntityField[] = entity => {
        return Object.keys(entity)
            .filter(key => key !== this.typeNameProp && key !== this.displayNameProp)
            .map(key => {
                return {
                    fieldName: key,
                    fieldKey: key,
                    value: entity[key],
                    isAssoc: entity[key] instanceof Array,
                };
            });
    };

    @Input() // an array of objects, which are to be displayed as object diagram
    public entities: Record<string, unknown>[];

    @Input() // an optional array of NgxObjectDiagramAssoc, to provide connecting lines between objects
    public assocs?: NgxObjectDiagramAssoc[];

    @Input() // maximal amount of chars to be displayed within an object (header and field), the rest will be truncated with ellipsis
    public maxTextLength = 20;

    @Output() // an action handler which is emmitted when clicking on the entity-header button
    public executeAction = new EventEmitter<{ guid: unknown }>();

    @Output() // an action handler, which is emitted when clicking on an associations field button
    public addAssoc = new EventEmitter<{ guid: unknown; assocKey: string }>();
```

Model of `NgxObjectDiagramAssoc`
``` typescript
export interface NgxObjectDiagramAssoc {
    guidA: string;
    guidB: string;
    fieldA: string;
    fieldB: string;
}
```

Model of `NgxObjectDiagramEntityField`
``` typescript
export interface NgxObjectDiagramEntityField {
    fieldName: string;
    fieldKey: string;
    value: unknown;
    isAssoc: boolean;
}
```

### Usage

Please see the [demo-app](projects/demo-app/src/app/components/assoc-usage/assoc-usage.component.ts) for how a possible implementation with associations could look like.

### Theming

You can override colors, fonts and other styles using css-3 variables.

In your component.html

```html
<ngx-object-diagram class="my-diagram" [objs]="simpleObjs"></ngx-object-diagram>
```

In your component.scss

```scss
.my-diagram {
    --ngx-obj-diagram-height: 600px;
    --ngx-obj-diagram-width: 800px;
    --ngx-obj-diagram-stroke-color: red;
}
```

Available variables:
| CSS variable | Default |
|-------------------------------------------|-------------------------------------------------|
| --ngx-obj-diagram-height | 600px |
| --ngx-obj-diagram-width | 800px |
| --ngx-obj-diagram-font-family | 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif |
| --ngx-obj-diagram-font-size | 16px |
| --ngx-obj-diagram-entity-background-color | #fff |
| --ngx-obj-diagram-entity-min-height | 300px |
| --ngx-obj-diagram-entity-min-width | 225px |
| --ngx-obj-diagram-header-font-size | 16px |
| --ngx-obj-diagram-header-font-color | #000 |
| --ngx-obj-diagram-header-background-color | #fff |
| --ngx-obj-diagram-stroke-color | #000 |
| --ngx-obj-diagram-line-stroke-color | #000 |
| --ngx-obj-diagram-line-stroke-width | 2px |
| --ngx-obj-diagram-button-font-size | 19px |

# Status

This project is heavy work in progress and it is likely to change and or break.
You are welcome to send pullrequests for improvements or new features.
