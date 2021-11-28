import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminActivitiesComponent } from './admin-activities.component';
const routes: Routes = [
  {
    path: '',
    component: AdminActivitiesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminActivitiesRoutingModule { }
