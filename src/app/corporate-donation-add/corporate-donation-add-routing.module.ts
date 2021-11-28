import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateDonationAddComponent } from './corporate-donation-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateDonationAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateDonationAddRoutingModule { }
