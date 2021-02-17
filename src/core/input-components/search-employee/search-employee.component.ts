import {Component} from '@angular/core';
import {ControlContainer, NgForm} from "@angular/forms";
import * as Constants from '../../../app/constants/constants'
import { BaseComponent } from '../base-component/base-component.component';
declare var $j: any;
@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class SearchEmployeeComponent extends BaseComponent{


  ngOnInit() {
    this.resetPropagator.subscribe(this, this.resetInput);
    if (this.hasLabel == undefined) {
      this.hasLabel = true;
    }
  }

  resetInput(hasResetted) {
    if (!this.isClean) {
      this.field.personName = null;
      this.field.personEmail = null;
      this.nameInput.value = null;
    }
    this.isClean = hasResetted;
  }

  onLoadOptions(event) {
    this.isClean = false;
    this.nameInput = event.target;
    let input = event.target.value;
    this.options = [];
    if (input.length >= 3) {
      this.stateMachine.dispatch(Constants.STATE_MACHINE_ACTION_SEARCH_EMPLOYEE, input).then((result) => {
        this.options = result.options;
      });
    }else if (input.length == 0){
    this.userSelected.emit({personName: null, personEmail: null});
    }
  }

  ngAfterViewInit() {
    const self = this;
    $j('[data-toggle="feedbackpopover"]').popover(
      {
        placement: function(){ 
          let rtn = 'left';
          if (self.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR) { rtn = 'left'; }
          return rtn;
        },
        html : true,
        content: function() {
          return $j('#fbtooltipContent').html();
        }
      }
    )
  }

  getImage(id): string {
    return Constants.IGATE_STATIC_ASSET_PROFILE_PHOTO_URL + String(id);
  }

  getShortNameSearch(name : string) {
    if(name) {
      let nameTokens = name.split(' ');
      return [nameTokens[0], nameTokens[nameTokens.length-1]].join(' ');
    }
    else {
      return null;
    }
  }
  selectUser(event, option) {
    this.nameInput.value = option.description;
    this.options = [];
    this.userSelected.emit({personName: option.description, personEmail: option.email});
  }
}
