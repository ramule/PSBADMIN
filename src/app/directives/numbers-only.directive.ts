import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numbersOnly]',
})
export class NumbersOnlyDirective {
  private specialKeys: Array<string> = [ 'Backspace', 'Tab']; 
  
  constructor(private control : NgControl) { }

  @HostListener('input',['$event']) ngOnChanges(e) {
    if (this.specialKeys.indexOf(e.key) !== -1) {
      return;
    }
    let pattern = /^[0-9]*$/;
    if(!pattern.test(this.control.value)){
      let newVal = this.control.value.replace(/[^0-9]/g,'');
      this.control.control.setValue(newVal); 
    }
  }
}
