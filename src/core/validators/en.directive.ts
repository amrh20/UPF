import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[enOnly]'
})
export class EnOnlyDirective {
  private specialKeys = ['Backspace', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Control']

  constructor() {

  }


  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    let text = event.key; 
    var english = /^[a-zA-Z ]*$/;
    if (english.test(text) ||  text == " " ||  text == 'Backspace') {
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
