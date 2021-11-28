import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLanguageKeyComponent } from './master-language-key.component';


const routes: Routes = [
  {
    path: '',
    component: MasterLanguageKeyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLanguageKeyRoutingModule { }
