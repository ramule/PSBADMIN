import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateMenuEditComponent } from './corporate-menu-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateMenuEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateMenuEditRoutingModule { }
