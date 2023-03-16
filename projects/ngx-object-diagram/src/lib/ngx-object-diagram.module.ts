import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxObjectDiagramComponent } from "./components/ngx-object-diagram/ngx-object-diagram.component";
import { NgxObjectDiagramEntityComponent } from "./components/ngx-object-diagram-entity/ngx-object-diagram-entity.component";
import { NgxObjectDiagramEntityHeaderComponent } from "./components/ngx-object-diagram-entity-header/ngx-object-diagram-entity-header.component";
import { NgxObjectDiagramLineComponent } from "./components/ngx-object-diagram-line/ngx-object-diagram-line.component";
import { NgxCollapseButtonComponent } from './components/ngx-collapse-button/ngx-collapse-button.component';
import { StoreModule } from "@ngrx/store";
import { graphReducer } from "./state/graph.reducer";
import { NgxReloadButtonComponent } from './components/ngx-reload-button/ngx-reload-button.component';
import { NgxAddAssocButtonComponent } from './components/ngx-add-assoc-button/ngx-add-assoc-button.component';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { RouterModule } from "@angular/router";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";

@NgModule({
  declarations: [
    NgxObjectDiagramComponent,
    NgxObjectDiagramEntityComponent,
    NgxObjectDiagramEntityHeaderComponent,
    NgxObjectDiagramEntityComponent,
    NgxObjectDiagramLineComponent,
    NgxCollapseButtonComponent,
    NgxReloadButtonComponent,
    NgxAddAssocButtonComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot({ graph: graphReducer, router: routerReducer }),
    RouterModule.forRoot([
      //{ path: ':graphId', component: NgxObjectDiagramComponent }
    ]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({})
  ],
  exports: [NgxObjectDiagramComponent],
})
export class NgxObjectDiagramModule {}
