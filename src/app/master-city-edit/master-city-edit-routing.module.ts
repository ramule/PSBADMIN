import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCityEditComponent } from './master-city-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCityEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCityEditRoutingModule { }
