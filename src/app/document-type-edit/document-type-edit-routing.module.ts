import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTypeEditComponent } from './document-type-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentTypeEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypeEditRoutingModule { }
