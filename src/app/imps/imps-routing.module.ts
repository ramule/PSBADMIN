import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpsComponent } from './imps.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsRoutingModule { }
