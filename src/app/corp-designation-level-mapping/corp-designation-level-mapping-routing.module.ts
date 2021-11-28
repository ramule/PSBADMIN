import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpDesignationLevelMappingComponent } from './corp-designation-level-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: CorpDesignationLevelMappingComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpDesignationLevelMappingRoutingModule { }
