import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpiVolumeDetailsComponent } from './upi-volume-details.component';




const routes: Routes = [
  {
    path: '',
    component: UpiVolumeDetailsComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpiVolumeDetailsRoutingModule { }
