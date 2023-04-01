# ngx-object-diagram

## About this project

This angular library lets you generate object-diagrams from typescript objects.
Please note, that it is not a target or intention of it to reach uml conformity.

## Usage

```html
<ngx-object-diagram [objs]="simpleObjs"></ngx-object-diagram>
```

## Features

- customize color, font-family and sizes via css-variables
- Entities can be dragged
- Support for simple entities as well as overrides for more complex objects

## Documentation

### Theming
You can override colors, fonts and other styles using css 3 variables.

In your component.html
``` html
<ngx-object-diagram class="my-diagram" [objs]="simpleObjs"></ngx-object-diagram>
```

In your component.scss
``` scss
.my-diagram {
    --ngx-obj-diagram-height: 600px;
    --ngx-obj-diagram-width: 800px;
    --ngx-obj-diagram-stroke-color: red;
}
```

Available variables:
| CSS variable                              | Default                                         |
|-------------------------------------------|-------------------------------------------------|
| --ngx-obj-diagram-height                  | 600px                                           |
| --ngx-obj-diagram-width                   | 800px                                           |
| --ngx-obj-diagram-font-family             | 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif |
| --ngx-obj-diagram-font-size               | 16px                                            |
| --ngx-obj-diagram-entity-background-color | #fff                                            |
| --ngx-obj-diagram-entity-min-height       | 300px                                           |
| --ngx-obj-diagram-entity-min-width        | 225px                                           |
| --ngx-obj-diagram-header-font-size        | 16px                                            |
| --ngx-obj-diagram-header-font-color       | #000                                            |
| --ngx-obj-diagram-header-background-color | #fff                                            |
| --ngx-obj-diagram-stroke-color            | #000                                            |
| --ngx-obj-diagram-line-stroke-color       | #000                                            |
| --ngx-obj-diagram-line-stroke-width       | 2px                                             |
| --ngx-obj-diagram-button-font-size        | 19px                                            |

# Status

This Project is heavy work in progress and it is likely to change and or break.
You are welcome to send Pullrequests for improvements or new features.
