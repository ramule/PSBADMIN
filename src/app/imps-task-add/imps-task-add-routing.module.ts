import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsTaskAddComponent } from './imps-task-add.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsTaskAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTaskAddRoutingModule { }
