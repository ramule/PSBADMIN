import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsReportsAddComponent } from './imps-reports-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsReportsAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsReportsAddRoutingModule { }
