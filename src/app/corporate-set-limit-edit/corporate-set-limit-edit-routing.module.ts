import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateSetLimitEditComponent } from './corporate-set-limit-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateSetLimitEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateSetLimitEditRoutingModule { }
