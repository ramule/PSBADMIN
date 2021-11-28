import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateOffersEditComponent } from './corporate-offers-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateOffersEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateOffersEditRoutingModule { }
