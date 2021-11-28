import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsMasterComponent } from './imps-master.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsMasterComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsMasterRoutingModule { }
