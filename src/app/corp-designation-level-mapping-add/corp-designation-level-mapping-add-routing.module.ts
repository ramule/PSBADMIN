import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpDesignationLevelMappingAddComponent } from './corp-designation-level-mapping-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorpDesignationLevelMappingAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpDesignationLevelMappingAddRoutingModule { }
