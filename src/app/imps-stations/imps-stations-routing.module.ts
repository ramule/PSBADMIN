import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsStationsComponent } from './imps-stations.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsStationsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsStationsRoutingModule { }
