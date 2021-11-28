import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateSecurityQuestionEditComponent } from './corporate-security-question-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateSecurityQuestionEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateSecurityQuestionEditRoutingModule { }
