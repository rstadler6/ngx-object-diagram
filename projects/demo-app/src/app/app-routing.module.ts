import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicUsageComponent } from "./components/basic-usage/basic-usage.component";
import { AssocUsageComponent } from "./components/assoc-usage/assoc-usage.component";

const routes: Routes = [
  { path: '123', component: BasicUsageComponent },
  { path: '456', component: AssocUsageComponent },
  { path: '',   redirectTo: '/123', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
