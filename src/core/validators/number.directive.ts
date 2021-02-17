import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numberOnly]'
})
export class NumberDirective {
  private specialKeys = ['Backspace', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Control']

  constructor() {

  }


  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    let text = event.key;
    if (event.code == 'Space') {
      event.preventDefault();
    } else {
      if (event.ctrlKey && (text == 'c' || text == 'v' || text == 'x' || text == 'a' || text == 'z')) {
        return;
      }
      else
        if ((text == "Backspace" || text == "Tab" || text == 'Delete' || text == 'ArrowLeft' || text == 'ArrowRight' || text == 'Shift' || text == 'Alt')) {
          return;
        }
        else {
          if (!isNaN(+text)) {
            return;
          }
          else
            event.preventDefault();
        }
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
