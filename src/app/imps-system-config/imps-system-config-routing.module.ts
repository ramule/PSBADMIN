import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsSystemConfigComponent } from './imps-system-config.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsSystemConfigComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsSystemConfigRoutingModule { }
