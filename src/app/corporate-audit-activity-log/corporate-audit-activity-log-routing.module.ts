import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateAuditActivityLogComponent } from './corporate-audit-activity-log.component';


const routes: Routes = [
  {
    path: '',
    component: CorporateAuditActivityLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateAuditActivityLogRoutingModule { }
