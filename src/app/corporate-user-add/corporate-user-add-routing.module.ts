import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateUserAddComponent } from './corporate-user-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateUserAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateUserAddRoutingModule { }
