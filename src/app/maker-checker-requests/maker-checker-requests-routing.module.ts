import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakerCheckerRequestsComponent } from './maker-checker-requests.component';



const routes: Routes = [
  {
    path: '',
    component: MakerCheckerRequestsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakerCheckerRequestsRoutingModule { }
