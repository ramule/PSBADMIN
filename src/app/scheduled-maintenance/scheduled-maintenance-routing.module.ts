import { NgModule } from '@angular/core';
import { ScheduledMaintenanceComponent } from './scheduled-maintenance.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ScheduledMaintenanceComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledMaintenanceRoutingModule { }
