import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateDonationComponent } from './corporate-donation.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateDonationComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateDonationRoutingModule { }
