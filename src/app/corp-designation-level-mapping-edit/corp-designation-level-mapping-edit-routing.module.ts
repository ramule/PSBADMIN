import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpDesignationLevelMappingEditComponent } from './corp-designation-level-mapping-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorpDesignationLevelMappingEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpDesignationLevelMappingEditRoutingModule { }
