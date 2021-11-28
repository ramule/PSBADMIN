import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessCustomizeMenuDetailsComponent } from './access-customize-menu-details.component';

const routes: Routes = [
  {
    path: '',
    component: AccessCustomizeMenuDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessCustomizeMenuDetailsRoutingModule { }
