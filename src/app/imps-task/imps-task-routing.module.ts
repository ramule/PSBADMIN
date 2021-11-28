import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsTaskComponent } from './imps-task.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsTaskComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTaskRoutingModule { }
