import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterSortModuleComponent } from './master-sort-module.component';


const routes: Routes = [
  {
    path: '',
    component: MasterSortModuleComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSortModuleRoutingModule { }
