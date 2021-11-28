import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpiVolumeComponent } from './upi-volume.component';



const routes: Routes = [
  {
    path: '',
    component: UpiVolumeComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpiVolumeRoutingModule { }
