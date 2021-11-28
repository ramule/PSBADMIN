import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsScheduleComponent } from './imps-schedule.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsScheduleComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsScheduleRoutingModule { }
