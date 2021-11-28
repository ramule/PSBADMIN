import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsReportsDetailsComponent } from './imps-reports-details.component';



const routes: Routes = [
  {
    path: '',
    component: ImpsReportsDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsReportsDetailsRoutingModule { }
