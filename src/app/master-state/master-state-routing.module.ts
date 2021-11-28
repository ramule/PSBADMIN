import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterStateComponent } from './master-state.component';

const routes: Routes = [
  {
    path: '',
    component: MasterStateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterStateRoutingModule { }
