import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[weightOnly]'
})
export class weightDirective {
  private specialKeys = ['Backspace', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Control','.']

  constructor() {

  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {

    let newvalue =  event.target.value  + event.key ;
   
    // Accept digits or special keys only
    if (/^[0-9]{1,3}(\.[0-9]{1,2})?$/.test(newvalue)  ==false && this.specialKeys.indexOf(event.key) === -1 && !event.metaKey) {
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
