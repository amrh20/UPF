import { Component } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import * as Constants from '../../../app/constants/constants';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['../base-component/base-component.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class SelectOptionComponent extends BaseComponent {

  ngOnInit() {
    this.resetPropagator.subscribe(this, this.resetInputFile)
    if (this.hasLabel == undefined) {
      this.hasLabel = true;
    }
  }

  resetInputFile() {
    this.field.value =""
    this.field.key =""
  }

  lovResolver(key: string) {
    let returnLabel;
    if (this.i18n.getLanguage() !== Constants.LANGUAGE_CODE_AR) {
      returnLabel = 'None';
    } else {
      returnLabel = 'لا يوجد';
    }
    try {
      let wasFound = false;
      this.lov.options.forEach((option) => {
        let hasKey = key !== null && key !== undefined;

        let keyWasFound = key === option.value;

        let hasParent = this.parentValue !== null && this.parentValue !== undefined;

        let parentMatches = option.parentValue === this.parentValue;

        if ((hasKey && keyWasFound && (!hasParent || parentMatches)) || (!hasKey && hasParent && parentMatches)) {
          returnLabel = option.description;
          returnLabel = this.parseNewlines(returnLabel);
          wasFound = true;
        }
        if (!hasKey && hasParent && parentMatches) {
          this.selectedElement.emit({
            key: option.value,
            value: option.description
          })
          wasFound = true;
        }
      })
      if (!wasFound) {
        this.selectedElement.emit({
          key: null,
          value: null
        })
      }
    }
    catch (e) {
      return returnLabel;
    }
    return returnLabel;
  }
  parseNewlines(text) {
    if (text) {
      if (text.indexOf("\n") !== -1) {
        return text.split(/\n/).join('<br/>');
      }
    }
    return text;
  }

  onSelectElement(event) {
    if (event && event.target.selectedIndex != 0) {
      this.selectedElement.emit({
        value: event.target.options[event.target.selectedIndex].text,
        key: event.target.value,
        index: event.target.selectedIndex
      });
    }
    else {
      this.selectedElement.emit({
        value: null,
        key: null
      });
    }
  }
}
