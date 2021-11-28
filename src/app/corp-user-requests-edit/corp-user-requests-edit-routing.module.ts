import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpUserRequestsEditComponent } from './corp-user-requests-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorpUserRequestsEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpUserRequestsEditRoutingModule { }
