import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[arOnly]'
})
export class ArOnlyDirective {
  private specialKeys = ['Backspace', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Control']

  constructor() {

  }


  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    let text = event.key;
    var arabicAlphabetDigits = /[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]|[\u0200]|[\u00A0]/g;
    if (arabicAlphabetDigits.test(text) ||  text == " " ||  text == 'Backspace') {
      return;
    }
    else {
      event.preventDefault();
    }
 
  }

  @HostListener('paste', ['$event'])
  onPaste(event) {
    let data = event.clipboardData.getData('text/plain');
    if (/(?!^\d+$)^.+$/.test(data)) {
      event.preventDefault();
    }

  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    let data = event.dataTransfer.getData("text/plain");
    if (/(?!^\d+$)^.+$/.test(data)) {
      event.preventDefault();
    }
  }

}
