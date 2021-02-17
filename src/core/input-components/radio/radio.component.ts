import { Component, ViewChildren, QueryList } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class RadioComponent extends BaseComponent {

  @ViewChildren('labelElement') labelElement: QueryList<any>;

  ngOnInit() {
    if (this.hasLabel == undefined) {
      this.hasLabel = true;
    }
    if (this.hasLabel == undefined) {
      this.hasLabel = true;
    }
  }

  lovResolver(key: string) {
    let myOption = 'NOT_FOUND_OR_NO_DESCRIPTION';
    try {
      if (this.isReadOnly && (!this.lov || !this.field.value)) {
        myOption = '';
        return myOption;
      }
      this.lov.options.forEach(
        (option) => {
          if (key === option.key && (this.parentValue === null || this.parentValue === undefined || this.parentValue === option.parentValue)) {
            myOption = option.description;
          }
        })
    }
    catch (e) {
      return myOption;
    }
    return myOption;
  }

  onChooseElement(event, index) {
    let labelElement = document.querySelector(`[fb-id="${this.name}RadioLabel${event.target.value}"]`);
    this.chosenOption.emit({
      value: labelElement.innerHTML,
      key: event.target.value
    });
  }

  checkedRadio(radioValue) {
    if ( this.field && this.field.key === null && this.lov.selected) {
      this.field.key = this.lov.selected;
      if (this.lov.options) {
        this.lov.options.forEach((option) => {
          if (option.value === this.lov.selected) {
            this.field.value = option.description
          };
        })
      }
      this.chosenOption.emit({
        value: this.field.value,
        key: this.field.key
      });
      return true;
    } else if (this.field && this.field.key === radioValue) {
      return true;
    } else {
      return false;
    }

  }
}
