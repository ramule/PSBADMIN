import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsSmsTemplatesEditComponent } from './imps-sms-templates-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsSmsTemplatesEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsSmsTemplatesEditRoutingModule { }
