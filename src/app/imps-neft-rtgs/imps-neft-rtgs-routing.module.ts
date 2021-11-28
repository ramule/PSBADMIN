import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsNeftRtgsComponent } from './imps-neft-rtgs.component';




const routes: Routes = [
  {
    path: '',
    component: ImpsNeftRtgsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsNeftRtgsRoutingModule { }
