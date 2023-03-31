import { NgxObjectDiagramCoords } from './ngx-object-diagram-coords';
import { NgxObjectDiagramAssoc } from './ngx-object-diagram-assoc';

export interface NgxObjectDiagramAssocCoords {
    assocLine: NgxObjectDiagramAssoc;
    a: NgxObjectDiagramCoords;
    b: NgxObjectDiagramCoords;
}
