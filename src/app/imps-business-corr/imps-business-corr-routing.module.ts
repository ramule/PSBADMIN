import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsBusinessCorrComponent } from './imps-business-corr.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsBusinessCorrComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsBusinessCorrRoutingModule { }
