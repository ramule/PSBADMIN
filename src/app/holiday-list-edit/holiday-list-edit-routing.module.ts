import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayListEditComponent } from './holiday-list-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HolidayListEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidayListEditRoutingModule { }
