import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementEditComponent } from './announcement-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementEditRoutingModule { }
