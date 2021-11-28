import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsOtpLogDetailsComponent } from './imps-otp-log-details.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsOtpLogDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsOtpLogDetailsRoutingModule { }
