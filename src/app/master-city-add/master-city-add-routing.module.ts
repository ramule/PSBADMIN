import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCityAddComponent } from './master-city-add.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCityAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCityAddRoutingModule { }
