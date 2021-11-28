import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsSystemConfigAddComponent } from './imps-system-config-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsSystemConfigAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsSystemConfigAddRoutingModule { }
