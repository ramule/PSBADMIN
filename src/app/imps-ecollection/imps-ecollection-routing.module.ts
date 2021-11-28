import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsEcollectionComponent } from './imps-ecollection.component';



const routes: Routes = [
  {
    path: '',
    component: ImpsEcollectionComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsEcollectionRoutingModule { }
