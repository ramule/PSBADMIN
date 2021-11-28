import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateMenuAddComponent } from './corporate-menu-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateMenuAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateMenuAddRoutingModule { }
