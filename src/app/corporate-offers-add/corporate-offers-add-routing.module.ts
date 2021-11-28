import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateOffersAddComponent } from './corporate-offers-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateOffersAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateOffersAddRoutingModule { }
