import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsBcWebAddComponent } from './imps-bc-web-add.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsBcWebAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsBcWebAddRoutingModule { }
