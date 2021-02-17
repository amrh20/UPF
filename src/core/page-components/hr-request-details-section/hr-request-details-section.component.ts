import { Component, Input, OnInit } from '@angular/core';
import * as Constants from '../../../app/constants/constants';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hr-request-details-section',
  templateUrl: './hr-request-details-section.component.html',
  styleUrls: ['./hr-request-details-section.component.css']
})
export class HrRequestDetailsSectionComponent implements OnInit {

  @Input() isReadOnly: boolean;
  @Input() section: any;
  @Input() lov: any;
  hasAgreed = false;
  lovs: any;

  constructor(public i18n: I18nService) {
  }

  ngOnInit() {
  }

  handleCheckBoxs(fieldName, object) {
    this.section.body.details[fieldName] = object;
    if (object == 'false') {
      this.section.body.details.onBehalfOfEmail = null;
    }
  }

  searchEmployee(name, object) {
    this.section.body.details.onBehalfOfEmail = { personEmail: object.personEmail, personName: object.personName };
    this.validComponent();
  }

  rtlDir() {
    return {
      "ar-dir-rtl": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  validComponent() {
    let lastSection = this.section.body.details

    if (lastSection.onBehalfFlag == 'true') {
      if (lastSection.onBehalfOfEmail) {
        this.section['valid'] = true;
      } else {
        this.section['valid'] = false;
      }
    }

  }

}
