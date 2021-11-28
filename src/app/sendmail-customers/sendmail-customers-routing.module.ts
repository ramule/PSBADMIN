import { NgModule } from '@angular/core';
import { SendmailCustomersComponent } from './sendmail-customers.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SendmailCustomersComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendmailCustomersRoutingModule { }
