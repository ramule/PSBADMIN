import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkUploadComponent } from './bulk-upload.component';

const routes: Routes = [
  {
    path: '',
    component: BulkUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkUploadRoutingModule { }
