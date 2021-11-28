import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsUsersComponent } from './imps-users.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsUsersComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsUsersRoutingModule { }
