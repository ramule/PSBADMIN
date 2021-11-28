import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KycDocumentListComponent } from './kyc-document-list.component';


const routes: Routes = [
  {
    path: '',
    component: KycDocumentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycDocumentListRoutingModule { }
