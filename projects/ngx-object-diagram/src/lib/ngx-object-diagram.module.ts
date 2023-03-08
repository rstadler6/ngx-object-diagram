import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxObjectDiagramComponent } from "./components/ngx-object-diagram/ngx-object-diagram.component";
import { NgxObjectDiagramEntityComponent } from "./components/ngx-object-diagram-entity/ngx-object-diagram-entity.component";
import { NgxObjectDiagramEntityHeaderComponent } from "./components/ngx-object-diagram-entity-header/ngx-object-diagram-entity-header.component";
import { NgxObjectDiagramLineComponent } from "./components/ngx-object-diagram-line/ngx-object-diagram-line.component";
import { NgxCollapseButtonComponent } from './components/ngx-collapse-button/ngx-collapse-button.component';

@NgModule({
  declarations: [
    NgxObjectDiagramComponent,
    NgxObjectDiagramEntityComponent,
    NgxObjectDiagramEntityHeaderComponent,
    NgxObjectDiagramEntityComponent,
    NgxObjectDiagramLineComponent,
    NgxCollapseButtonComponent,
  ],
  imports: [CommonModule],
  exports: [NgxObjectDiagramComponent],
})
export class NgxObjectDiagramModule {}
