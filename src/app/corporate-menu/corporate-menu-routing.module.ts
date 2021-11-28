import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateMenuComponent } from './corporate-menu.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateMenuRoutingModule { }
