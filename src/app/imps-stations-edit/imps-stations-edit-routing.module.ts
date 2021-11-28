import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsStationsEditComponent } from './imps-stations-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsStationsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsStationsEditRoutingModule { }
