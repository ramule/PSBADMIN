import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsEcollectionRequestLogComponent } from './imps-ecollection-request-log.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsEcollectionRequestLogComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsEcollectionRequestLogRoutingModule { }
