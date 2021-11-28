import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListEditComponent } from './document-list-edit.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: DocumentListEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentListEditRoutingModule { }
