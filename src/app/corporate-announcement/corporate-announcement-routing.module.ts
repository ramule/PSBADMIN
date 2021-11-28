import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateAnnouncementComponent } from './corporate-announcement.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateAnnouncementComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateAnnouncementRoutingModule { }
