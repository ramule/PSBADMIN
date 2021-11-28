import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsDeliveryChannelAddComponent } from './imps-delivery-channel-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsDeliveryChannelAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsDeliveryChannelAddRoutingModule { }
