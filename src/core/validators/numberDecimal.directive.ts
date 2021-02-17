import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[numberDecimalOnly]'
})
export class NumberDecimalDirective {
  private specialKeys = ['Backspace', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Control','.']

  constructor() {

  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    // Accept digits or special keys only
    if (/(?!^\d+$)^.+$/.test(event.key) && this.specialKeys.indexOf(event.key) === -1 && !event.metaKey) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
    onPaste(event){
      let data = event.clipboardData.getData('text/plain');
      if (/(?!^\d+$)^.+$/.test(data)) {
        event.preventDefault();
      }

    }

    @HostListener('drop', ['$event'])
      onDrop(event){
        console.log("Inside HostListener")
        let data = event.dataTransfer.getData("text/plain");
        if (/(?!^\d+$)^.+$/.test(data)) {
          event.preventDefault();
        }
    }

  }
