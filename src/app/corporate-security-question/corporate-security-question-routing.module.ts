import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateSecurityQuestionComponent } from './corporate-security-question.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateSecurityQuestionComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateSecurityQuestionRoutingModule { }
