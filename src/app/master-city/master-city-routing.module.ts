import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCityComponent } from './master-city.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCityComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCityRoutingModule { }
