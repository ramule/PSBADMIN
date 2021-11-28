import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateSetLimitViewComponent } from './corporate-set-limit-view.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateSetLimitViewComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateSetLimitViewRoutingModule { }
