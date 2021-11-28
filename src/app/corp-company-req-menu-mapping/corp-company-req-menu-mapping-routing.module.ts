import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpCompanyReqMenuMappingComponent } from './corp-company-req-menu-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: CorpCompanyReqMenuMappingComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpCompanyReqMenuMappingRoutingModule { }
