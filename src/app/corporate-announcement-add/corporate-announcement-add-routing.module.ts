import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateAnnouncementAddComponent } from './corporate-announcement-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateAnnouncementAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateAnnouncementAddRoutingModule { }
