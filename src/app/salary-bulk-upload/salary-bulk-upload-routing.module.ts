import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SalaryBulkUploadComponent } from './salary-bulk-upload.component';

const routes: Routes = [
  {
    path: '',
    component: SalaryBulkUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SalaryBulkUploadRoutingModule { }
