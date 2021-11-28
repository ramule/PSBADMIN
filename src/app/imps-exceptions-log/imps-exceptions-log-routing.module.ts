import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsExceptionsLogComponent } from './imps-exceptions-log.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsExceptionsLogComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsExceptionsLogRoutingModule { }
