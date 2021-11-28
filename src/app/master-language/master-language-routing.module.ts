import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLanguageComponent } from './master-language.component';


const routes: Routes = [
  {
    path: '',
    component: MasterLanguageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLanguageRoutingModule { }
