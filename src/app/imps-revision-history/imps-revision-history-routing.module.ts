import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsRevisionHistoryComponent } from './imps-revision-history.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsRevisionHistoryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsRevisionHistoryRoutingModule { }
