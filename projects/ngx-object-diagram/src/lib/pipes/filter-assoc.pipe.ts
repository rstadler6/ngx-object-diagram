import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NgxObjectDiagramAssoc } from '../model/ngx-object-diagram-assoc';
import { NgxObjectDiagramAssocCoords } from '../model/ngx-object-diagram-assoc-coords';

@Pipe({
    name: 'filterAssoc',
})
export class FilterAssocPipe implements PipeTransform {
    transform(value: NgxObjectDiagramAssocCoords[], assoc: NgxObjectDiagramAssoc): NgxObjectDiagramAssocCoords | undefined {
        return value.find(
            c =>
                c.assocLine.fieldA === assoc.fieldA &&
                c.assocLine.guidA == assoc.guidA &&
                c.assocLine.guidB === assoc.guidB &&
                c.assocLine.fieldB === assoc.fieldB,
        );
    }
}
