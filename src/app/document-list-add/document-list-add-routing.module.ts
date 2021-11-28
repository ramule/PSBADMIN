import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DocumentListAddComponent } from './document-list-add.component';



const routes: Routes = [
  {
    path: '',
    component: DocumentListAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentListAddRoutingModule { }
