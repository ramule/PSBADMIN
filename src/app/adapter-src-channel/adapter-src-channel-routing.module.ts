import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdapterSrcChannelComponent } from 'src/app/adapter-src-channel/adapter-src-channel.component';

const routes: Routes = [
  {
    path: '',
    component: AdapterSrcChannelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdapterSrcChannelRoutingModule { }
