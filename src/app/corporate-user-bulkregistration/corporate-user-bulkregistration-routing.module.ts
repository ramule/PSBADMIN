import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CorporateUserBulkregistrationComponent } from './corporate-user-bulkregistration.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateUserBulkregistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateUserBulkregistrationRoutingModule { }
