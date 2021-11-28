import { Directive,HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[alphabetsOnly]',
})
export class AlphabetsOnlyDirective {

  private specialKeys: Array<string> = [ 'Backspace', 'Tab'];
  constructor(private control : NgControl) { }

  @HostListener('input',['$event']) onInputChange(e) {
    // e.stopPropagation();
    if (this.specialKeys.indexOf(e.key) !== -1) {
      return;
    }
    let pattern = /^[a-zA-Z]$/;
    if(!pattern.test(this.control.value)){
      let firstVal = this.control.value.replace(/^\s/, '');
      let newVal = firstVal.replace(/[^a-zA-Z_ ]/g,'');
      this.control.control.setValue(newVal);
    }
  }
}


@Directive({
  selector: '[alphaNumericOnly]'
})
export class AlphaNumericOnlyDirective {

  private specialKeys: Array<string> = [ 'Backspace', 'Tab'];
  constructor(private control : NgControl) { }

  /**** listening to  changes event **/
  @HostListener('input',['$event']) onInputChange(e) {
    if (this.specialKeys.indexOf(e.key) !== -1) {
      return;
    }
    let pattern = /^([a-zA-Z0-9 _-]+)$/;
    /**** check redgex factor for alphabet only **/
    console.log("value "+this.control.value + " test:: " +pattern.test(this.control.value));
    if(!pattern.test(this.control.value)){
      /**** If input text is not alphabet replace with empty string **/
      let firstVal = this.control.value.replace(/\s/, '');
      let newVal = firstVal.replace(/[^a-zA-Z0-9 _-]/gi,'').trim();
      this.control.control.setValue(newVal);
    }
  }
}
