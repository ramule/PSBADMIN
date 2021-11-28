import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterSecurityQuestionComponent } from './master-security-question.component';

const routes: Routes = [
  {
    path: '',
    component: MasterSecurityQuestionComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSecurityQuestionRoutingModule { }
