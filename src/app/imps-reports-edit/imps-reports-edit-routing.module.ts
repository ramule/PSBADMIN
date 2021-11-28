import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsReportsEditComponent } from './imps-reports-edit.component';



const routes: Routes = [
  {
    path: '',
    component: ImpsReportsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsReportsEditRoutingModule { }
