import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsBcRetailersAddComponent } from './imps-bc-retailers-add.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsBcRetailersAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsBcRetailersAddRoutingModule { }
