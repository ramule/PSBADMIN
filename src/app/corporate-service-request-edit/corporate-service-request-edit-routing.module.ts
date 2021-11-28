import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateServiceRequestEditComponent } from './corporate-service-request-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateServiceRequestEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateServiceRequestEditRoutingModule { }
