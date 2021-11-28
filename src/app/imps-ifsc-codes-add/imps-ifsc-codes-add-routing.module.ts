import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ImpsIfscCodesAddComponent } from './imps-ifsc-codes-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsIfscCodesAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsIfscCodesAddRoutingModule { }
