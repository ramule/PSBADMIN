import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsIfscCodesComponent } from './imps-ifsc-codes.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsIfscCodesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsIfscCodesRoutingModule { }
