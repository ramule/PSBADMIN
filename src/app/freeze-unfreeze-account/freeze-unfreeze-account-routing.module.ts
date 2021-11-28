import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FreezeUnfreezeAccountComponent } from './freeze-unfreeze-account.component';

const routes: Routes = [
  {
    path: '',
    component: FreezeUnfreezeAccountComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreezeUnfreezeAccountRoutingModule { }
