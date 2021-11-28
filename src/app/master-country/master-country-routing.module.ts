import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCountryComponent } from './master-country.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCountryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCountryRoutingModule { }
