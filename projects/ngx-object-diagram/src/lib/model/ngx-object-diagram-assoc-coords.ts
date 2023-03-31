import { NgxObjectDiagramCoords } from './ngx-object-diagram-coords';
import { NgxObjectDiagramLineComponent } from '../components/ngx-object-diagram-line/ngx-object-diagram-line.component';
import { NgxObjectDiagramAssoc } from './ngx-object-diagram-assoc';

export interface NgxObjectDiagramAssocCoords {
    assocLine: NgxObjectDiagramAssoc;
    a: NgxObjectDiagramCoords;
    b: NgxObjectDiagramCoords;
}
