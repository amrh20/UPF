import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileInfoDrop} from '../../models/form';
import * as Constants from '../../../app/constants/constants';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.css']
})
export class ProfileSectionComponent implements OnInit {

  @Input() profileFormVisibility;
  @Input() profile: ProfileInfoDrop;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  constructor(public i18n: I18nService) { }

  ngOnInit() {
    console.log(this.profile);
  }

  rtlDir() {
    return {
      "ar-dir-rtl": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  rtlFloatRight() {
    return {
      "ar-float-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

}
