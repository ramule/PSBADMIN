import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ImpsNeftRtgsAddComponent } from './imps-neft-rtgs-add.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsNeftRtgsAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsNeftRtgsAddRoutingModule { }
