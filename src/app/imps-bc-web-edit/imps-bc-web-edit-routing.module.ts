import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsBcWebEditComponent } from './imps-bc-web-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsBcWebEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsBcWebEditRoutingModule { }
