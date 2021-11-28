import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCountryAddComponent } from './master-country-add.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCountryAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCountryAddRoutingModule { }
