import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[maximumInputSize]'
})
export class MaximumInputSizeDirective {
  @Input('maximumInputSize') maxLimit: number;

  private specialKeys = ['Backspace', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Delete']
  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    // Restrict input if limit was reached and the input is not a special key
    let invalidSelection = null;
    let differentElementSelection = event.target !== document.activeElement;
    let inputElement = <HTMLInputElement> (document.activeElement)
    let noSelection = inputElement.selectionStart === inputElement.selectionEnd;
    invalidSelection = differentElementSelection || noSelection;
    if (event.target.value.length >= this.maxLimit && this.specialKeys.indexOf(event.key) === -1 && invalidSelection) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event) {
    let data = event.clipboardData.getData('text/plain');
    let invalidSelection = null;
    let differentElementSelection = event.target !== document.activeElement;
    let inputElement = <HTMLInputElement> (document.activeElement)
    let noSelection = inputElement.selectionStart === inputElement.selectionEnd;
    // Restrict input if limit was reached and the input is not a special key
    if ((event.target.value.length + data.length) > this.maxLimit && invalidSelection) {
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
    onDrop(event){
      console.log(event.dataTransfer.getData("text/plain").length)
      let dataLenght = event.dataTransfer.getData("text/plain").length;
      let inputLenght = event.target.value.length;
      if ((dataLenght + inputLenght) > this.maxLimit ) {
        event.preventDefault();
      }
  }

}
