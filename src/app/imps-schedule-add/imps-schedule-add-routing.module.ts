import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsScheduleAddComponent } from './imps-schedule-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsScheduleAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsScheduleAddRoutingModule { }
