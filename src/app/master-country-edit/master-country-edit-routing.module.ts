import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCountryEditComponent } from './master-country-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCountryEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCountryEditRoutingModule { }
