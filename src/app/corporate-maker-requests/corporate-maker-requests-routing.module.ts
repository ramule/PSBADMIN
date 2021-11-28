import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateMakerRequestsComponent } from './corporate-maker-requests.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateMakerRequestsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateMakerRequestsRoutingModule { }
