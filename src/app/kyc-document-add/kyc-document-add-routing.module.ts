import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KycDocumentAddComponent } from './kyc-document-add.component';


const routes: Routes = [
  {
    path: '',
    component: KycDocumentAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycDocumentAddRoutingModule { }
