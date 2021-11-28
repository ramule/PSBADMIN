import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsMasterAddComponent } from './imps-master-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsMasterAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsMasterAddRoutingModule { }
