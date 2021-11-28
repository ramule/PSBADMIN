import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdapterSrcChannelEditComponent } from 'src/app/adapter-src-channel-edit/adapter-src-channel-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdapterSrcChannelEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdapterSrcChannelEditRoutingModule { }
