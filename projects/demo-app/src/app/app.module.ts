import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxObjectDiagramModule } from 'projects/ngx-object-diagram/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxObjectDiagramModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
