import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateOffersComponent } from './corporate-offers.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateOffersComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateOffersRoutingModule { }
