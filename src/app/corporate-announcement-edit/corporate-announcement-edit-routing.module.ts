import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateAnnouncementEditComponent } from './corporate-announcement-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateAnnouncementEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateAnnouncementEditRoutingModule { }
