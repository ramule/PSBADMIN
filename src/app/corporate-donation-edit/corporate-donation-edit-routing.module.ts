import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateDonationEditComponent } from './corporate-donation-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateDonationEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateDonationEditRoutingModule { }
