import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterStateAddComponent } from './master-state-add.component';

const routes: Routes = [
  {
    path: '',
    component: MasterStateAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterStateAddRoutingModule { }
