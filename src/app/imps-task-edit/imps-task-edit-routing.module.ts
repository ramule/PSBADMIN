import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsTaskEditComponent } from './imps-task-edit.component';



const routes: Routes = [
  {
    path: '',
    component: ImpsTaskEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTaskEditRoutingModule { }
