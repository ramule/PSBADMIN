import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsDeliveryChannelEditComponent } from './imps-delivery-channel-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsDeliveryChannelEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsDeliveryChannelEditRoutingModule { }
