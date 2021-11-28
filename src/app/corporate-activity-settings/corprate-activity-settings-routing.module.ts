import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateActivitySettingsComponent } from './corporate-activity-settings.component';
const routes: Routes = [
  {
    path: '',
    component: CorporateActivitySettingsComponent  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorprateActivitySettingsRoutingModule { }
