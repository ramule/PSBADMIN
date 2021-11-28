import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessMenuRightsComponent } from './access-menu-rights.component';


const routes: Routes = [
  {
    path: '',
    component: AccessMenuRightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessMenuRightsRoutingModule { }
