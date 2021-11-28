import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsMyreportComponent } from './imps-myreport.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsMyreportComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsMyreportRoutingModule { }
