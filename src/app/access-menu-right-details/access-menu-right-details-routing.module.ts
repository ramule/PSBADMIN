import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessMenuRightDetailsComponent } from './access-menu-right-details.component';


const routes: Routes = [
  {
    path: '',
    component: AccessMenuRightDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessMenuRightDetailsRoutingModule { }
