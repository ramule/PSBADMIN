import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsSystemStatusEditComponent } from './imps-system-status-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsSystemStatusEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsSystemStatusEditRoutingModule { }
