import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsEcollectionAddComponent } from './imps-ecollection-add.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsEcollectionAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsEcollectionAddRoutingModule { }
