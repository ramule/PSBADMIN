import { NgModule } from '@angular/core';
import { CorpCompanyRequestsComponent } from './corp-company-requests.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CorpCompanyRequestsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpCompanyRequestsRoutingModule { }
