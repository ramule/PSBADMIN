import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DocumentListComponent } from './document-list.component';



const routes: Routes = [
  {
    path: '',
    component: DocumentListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentListRoutingModule { }
