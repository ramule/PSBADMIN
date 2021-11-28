import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLanguageAddComponent } from './master-language-add.component';


const routes: Routes = [
  {
    path: '',
    component: MasterLanguageAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLanguageAddRoutingModule { }
