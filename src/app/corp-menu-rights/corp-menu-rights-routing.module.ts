import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorpMenuRightsComponent } from './corp-menu-rights.component';

const routes: Routes = [
  {
    path: '',
    component: CorpMenuRightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpMenuRightsRoutingModule { }
