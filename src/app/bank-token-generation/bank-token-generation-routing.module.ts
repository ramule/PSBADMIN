import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BankTokenGenerationComponent } from './bank-token-generation.component';

const routes: Routes = [
  {
    path: '',
    component: BankTokenGenerationComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankTokenGenerationRoutingModule { }
