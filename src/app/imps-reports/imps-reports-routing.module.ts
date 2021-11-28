import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsReportsComponent } from './imps-reports.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsReportsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsReportsRoutingModule { }
