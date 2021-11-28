import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLanguageEditComponent } from './master-language-edit.component';


const routes: Routes = [
  {
    path: '',
    component: MasterLanguageEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLanguageEditRoutingModule { }
