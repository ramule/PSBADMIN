import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateSetLimitCheckerViewComponent } from './corporate-set-limit-checker-view.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateSetLimitCheckerViewComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateSetLimitCheckerViewRoutingModule { }
