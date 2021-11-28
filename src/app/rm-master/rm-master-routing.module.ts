import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RmMasterComponent } from 'src/app/rm-master/rm-master.component';

const routes: Routes = [
  {
    path: '',
    component: RmMasterComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class RmMasterRoutingModule { }
