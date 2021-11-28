import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KycFolderAddComponent } from './kyc-folder-add.component';

const routes: Routes = [
  {
    path: '',
    component: KycFolderAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycFolderAddRoutingModule { }
