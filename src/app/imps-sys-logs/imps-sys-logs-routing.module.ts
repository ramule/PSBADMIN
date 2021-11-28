import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsSysLogsComponent } from './imps-sys-logs.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsSysLogsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsSysLogsRoutingModule { }
