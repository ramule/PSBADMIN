import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpCompanyRequestsEditComponent } from './corp-company-requests-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorpCompanyRequestsEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpCompanyRequestsEditRoutingModule { }
