import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsMasterEditComponent } from './imps-master-edit.component';
import { ImpsMasterResolverService } from './imps-master-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ImpsMasterEditComponent,
    resolve: { impsData: ImpsMasterResolverService}
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsMasterEditRoutingModule { }
