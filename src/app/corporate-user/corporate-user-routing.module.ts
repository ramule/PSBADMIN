import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateUserComponent } from './corporate-user.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateUserRoutingModule { }
