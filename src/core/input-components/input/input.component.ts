import { Component, EventEmitter, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['../base-component/base-component.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class InputComponent extends BaseComponent {

  @Output() enteredData: EventEmitter<any> = new EventEmitter();
  inputInValid: boolean;

  ngOnInit() {
    this.inputField();
    if (this.disabled == undefined) {
      this.disabled = false;
    }
    if (this.required == undefined) {
      this.required = true;
    }
    if (this.hasLabel == undefined) {
      this.hasLabel = true;
    }
    if (this.type == undefined) {
      this.type = 'text'
    }
  }
  onValueChange(data) {



    if (data.length > this.maxlength) {
      data = data.substr(0, this.maxlength);
      this.enteredData.emit(data);
      this.field = data
    }
    if (+data < +this.minValue) {
      data = this.minValue
      this.enteredData.emit(data);
    }

    if (+data > +this.maxValue) {
      data = this.maxValue
      this.enteredData.emit(data);
    }
    this.enteredData.emit(data);
  }

  InputValidations(data) {
    if ((this.field && data.target.value.length < this.minLength) || (this.field && data.target.value.length > this.maxlength)) {
      this.inputInValid = true
    } else {
      this.inputInValid = false
    }
  }

}
