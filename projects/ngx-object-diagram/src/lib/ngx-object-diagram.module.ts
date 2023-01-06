import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxObjectDiagramComponent } from './components/ngx-object-diagram/ngx-object-diagram.component';
import { NgxObjectDiagramEntityComponent } from './components/ngx-object-diagram-entity/ngx-object-diagram-entity.component';
import { NgxObjectDiagramEntityHeaderComponent } from './components/object-diagram-entity-header/ngx-object-diagram-entity-header.component';

@NgModule({
  declarations: [
    NgxObjectDiagramComponent,
    NgxObjectDiagramEntityComponent,
    NgxObjectDiagramEntityHeaderComponent,
  ],
  imports: [CommonModule],
  exports: [NgxObjectDiagramComponent],
})
export class NgxObjectDiagramModule {}
