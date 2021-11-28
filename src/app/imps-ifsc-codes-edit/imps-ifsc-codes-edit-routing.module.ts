import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ImpsIfscCodesEditComponent } from './imps-ifsc-codes-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsIfscCodesEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsIfscCodesEditRoutingModule { }
