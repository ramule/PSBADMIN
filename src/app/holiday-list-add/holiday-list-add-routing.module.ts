import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayListAddComponent } from './holiday-list-add.component';

const routes: Routes = [
  {
    path: '',
    component: HolidayListAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidayListAddRoutingModule { }
