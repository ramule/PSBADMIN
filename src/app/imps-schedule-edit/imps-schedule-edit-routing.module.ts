import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsScheduleEditComponent } from './imps-schedule-edit.component';



const routes: Routes = [
  {
    path: '',
    component: ImpsScheduleEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsScheduleEditRoutingModule { }
