import { Component, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-textareatable',
  templateUrl: './textareatable.component.html',
  // styleUrls: ['./textarea.component.css'],
  styleUrls: ['../base-component/base-component.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class TextAreaTableComponent extends BaseComponent {

  @Output() enteredData: EventEmitter<any> = new EventEmitter();

  textAreaFocus = false

  validationMessages = [
    ['error length', (this.field && this.field.length <= this.minLength)],
    ['error test', false],
    ['error show test', true],
  ];
  messages = []

  ngOnInit() {
    this.inputField();
    if (this.hasLabel == undefined) {
      this.hasLabel = true;
    }
  }

  validateTextAreaBorder() {
    return {
      "field-border-error": (this.field && this.field.length < this.minLength) || (this.field && this.field.length > this.maxlength),
    }
  }

  onValueChange(data) {
    debugger  ;
    this.enteredData.emit(data);
  }

  focusInFunction() {
    this.textAreaFocus = true;
    this.validationBorder();
  }

  focusOutFunction() {
    this.textAreaFocus = false;
    this.validationBorder();
  }
}