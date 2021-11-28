import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { NavmenuComponent } from '../navmenu/navmenu.component';
import { RouterModule } from '@angular/router';
import { LimitDirective } from '../directives/limit-directive.directive';
import { NumbersOnlyDirective } from '../directives/numbers-only.directive';
import { AlphabetsOnlyDirective } from '../directives/alphabets-only.directive';
import { FooterComponent } from '../footer/footer.component';
import { SortPipe } from '../Pipes/sort.pipe';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavmenuComponent, LimitDirective, NumbersOnlyDirective,AlphabetsOnlyDirective, SortPipe],
  exports: [HeaderComponent, FooterComponent, NavmenuComponent, LimitDirective, NumbersOnlyDirective,AlphabetsOnlyDirective, SortPipe],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModuleModule { }
