import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxObjectDiagramComponent } from './components/ngx-object-diagram/ngx-object-diagram.component';
import { NgxObjectDiagramEntityComponent } from './components/ngx-object-diagram-entity/ngx-object-diagram-entity.component';
import { NgxObjectDiagramEntityHeaderComponent } from './components/ngx-object-diagram-entity-header/ngx-object-diagram-entity-header.component';
import { NgxActionButtonComponent } from './components/ngx-action-button/ngx-action-button.component';
import { FilterAssocPipe } from './pipes/filter-assoc.pipe';

@NgModule({
    declarations: [
        NgxObjectDiagramComponent,
        NgxObjectDiagramEntityComponent,
        NgxObjectDiagramEntityHeaderComponent,
        NgxObjectDiagramEntityComponent,
        NgxActionButtonComponent,
        FilterAssocPipe,
    ],
    imports: [CommonModule],
    exports: [NgxObjectDiagramComponent],
})
export class NgxObjectDiagramModule {}
