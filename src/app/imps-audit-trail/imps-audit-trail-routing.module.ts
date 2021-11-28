import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsAuditTrailComponent } from './imps-audit-trail.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsAuditTrailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsAuditTrailRoutingModule { }
