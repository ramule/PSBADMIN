import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateServiceRequestComponent } from './corporate-service-request.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateServiceRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateServiceRequestRoutingModule { }
