import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpUserRequestsComponent } from './corp-user-requests.component';

const routes: Routes = [
  {
    path: '',
    component: CorpUserRequestsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpUserRequestsRoutingModule { }
