import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsStationsAddComponent } from './imps-stations-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsStationsAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsStationsAddRoutingModule { }
