import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsUsersAddComponent } from './imps-users-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsUsersAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsUsersAddRoutingModule { }
