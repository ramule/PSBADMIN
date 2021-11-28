import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsBcRetailersComponent } from './imps-bc-retailers.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsBcRetailersComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsBcRetailersRoutingModule { }
