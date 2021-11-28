import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsSmsTemplatesComponent } from './imps-sms-templates.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsSmsTemplatesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsSmsTemplatesRoutingModule { }
