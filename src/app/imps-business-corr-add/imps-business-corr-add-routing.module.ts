import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsBusinessCorrAddComponent } from './imps-business-corr-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsBusinessCorrAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsBusinessCorrAddRoutingModule { }
