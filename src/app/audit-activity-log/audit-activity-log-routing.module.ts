import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditActivityLogComponent } from './audit-activity-log.component';


const routes: Routes = [
  {
    path: '',
    component: AuditActivityLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditActivityLogRoutingModule { }
