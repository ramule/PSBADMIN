import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsSystemStatusComponent } from './imps-system-status.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsSystemStatusComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsSystemStatusRoutingModule { }
