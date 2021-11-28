import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CommonMethods } from '../common-methods';

@Directive({
  selector: '[limit-to]',
/*   host: {
    '(keydown)': '_onKeyup($event)',
  } */
})
export class LimitDirective {
  private specialKeys: Array<string> = [ 'Backspace', 'Tab'];
  constructor(private control : NgControl, private commonMethods : CommonMethods) { }
  @Input('limit-to') limitTo; 

  @HostListener('input',['$event']) ngOnChanges(e) {
    const limit = +this.limitTo;
    if (this.specialKeys.indexOf(e.key) !== -1 || this.commonMethods.validateEmpty(this.control.value)) {
      return;
    }
    
    if (this.control.value.length >= limit) {
      let newVal = this.control.value.substring(0,limit)
      this.control.control.setValue(newVal)
    }
  }
  /* _onKeyup(e) {
    if (this.specialKeys.indexOf(e.key) !== -1) {
      return;
    }
     const limit = +this.limitTo;
     alert(e.target.value.length)
     if (e.target.value.length === limit) e.preventDefault();
  }  */
}
