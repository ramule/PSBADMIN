import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsTransLogComponent } from './imps-trans-log.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsTransLogComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTransLogRoutingModule { }
