import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateCheckerRequestsComponent } from './corporate-checker-requests.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateCheckerRequestsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateCheckerRequestsRoutingModule { }
