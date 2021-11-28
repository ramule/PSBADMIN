import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsDeliveryChannelComponent } from './imps-delivery-channel.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsDeliveryChannelComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsDeliveryChannelRoutingModule { }
