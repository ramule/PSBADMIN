import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsConnectionStatusComponent } from './imps-connection-status.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsConnectionStatusComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsConnectionStatusRoutingModule { }
