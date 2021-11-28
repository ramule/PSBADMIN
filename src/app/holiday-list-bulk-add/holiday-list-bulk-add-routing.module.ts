import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayListBulkAddComponent } from './holiday-list-bulk-add.component';

const routes: Routes = [
  {
    path: '',
    component: HolidayListBulkAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidayListBulkAddRoutingModule { }
