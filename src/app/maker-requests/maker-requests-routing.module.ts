import { NgModule } from '@angular/core';
import { MakerRequestsComponent } from './maker-requests.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MakerRequestsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakerRequestsRoutingModule { }
