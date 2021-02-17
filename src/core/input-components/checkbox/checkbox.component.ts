import { Component } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CheckBoxComponent extends BaseComponent {

  checkboxId: string;

  ngOnInit(){
    if (this.hasLabel == undefined) {
      this.hasLabel = true;
    }
  }

  resetCheckbox() {
    if (!this.isReadOnly) {
      let realValue = (this.defaultValue ? this.defaultValue : "false");
      this.checked.emit(realValue);
    }
  }

  ngAfterViewInit() {
    if (this.field === null) {
      let result = (this.defaultValue ? this.defaultValue : "false");
      this.checked.emit(result);
    }
    if (this.defaultValue && !this.isReadOnly) {
      let result = this.defaultValue;
      this.checked.emit(result);
    }
    this.checkboxId = this.name;
    this.resetPropagator.subscribe(this, this.resetCheckbox);
  }

  readOnlyChecked() {
    let result = false;
    if (this.field) {
      result = JSON.parse(this.field);
      return result;
    }
    if (this.defaultValue) {
      result = JSON.parse(this.field);
      return result;
    }
    return result;
  }

  toggle() {
    this.isClean = false;
    if(this.field == undefined || this.field == "" || this.field == null){
      this.field ='false'
    }
    let result = JSON.parse(this.field);
    result = !result;
    this.checked.emit(JSON.stringify(result));
  }

  openPopUp(type) {
    let row = null
    let obj = {
      type: type,
      row: null,
      index: null
    }
    this.type = type
    this._messageService.filter(obj);
  }
}
