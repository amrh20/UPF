import { AfterViewInit, AfterViewChecked, Component, ElementRef, Input, OnInit, Renderer, ViewChild } from '@angular/core';
import { Form, Section } from '../../models/form';
import * as Constants from '../../../app/constants/constants';
import { SegmentDynamicLoaderService } from '../../../app/services/segment-dynamic-loader.service';
import * as moment from 'moment';
import { I18nService } from '../../services/i18n.service';
import { StateMachineService } from '../../services/state-machine.service';

declare var $j: any;

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css'],
})
export class FormSectionComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @ViewChild('dataToggle') dataToggle: ElementRef;

  @Input() section: Section;
  @Input() lov: any;
  @Input() isReadOnly: boolean;
  @Input() isOpen: boolean;
  @Input() isFinalApproval: boolean;
  @Input() controllers: any;
  sectionNumber: number;
  sectionStatusValue: string;
  sectionStatusKey: string;
  receipient = {
    isShowing: false,
    profile: null
  };
  delegate = {
    isShowing: false,
    profile: null
  };

  public input;

  highlightflag: boolean;
  sectionFormComponent = null;
  sectionName = 'SECTION_NAME.requestDetails';
  processingDate;
  public randomID: Number = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  constructor(private segmentDynamicLoaderService: SegmentDynamicLoaderService,
    public i18n: I18nService, private stateMachine: StateMachineService,
    private renderer: Renderer) {

    this.highlightflag = false;
  }

  ngOnInit() {
    console.log('this.section', this.section);
    this.sectionFormComponent = this.segmentDynamicLoaderService.getComponent(this.section.id);
    this.sectionName = this.segmentDynamicLoaderService.getSectionName(this.section.id);
    console.log('this.section.sectionName', this.sectionName);
    this.input = { isReadOnly: this.isReadOnly, lov: this.lov, section: this.section, controllers: this.controllers };
    if(this.section.header && this.section.header.processingDate){
      this.processingDate = moment(this.section.header.processingDate).locale('en-US').format('DD/MM/YYYY HH:mm:ss');
    }

    this.highlightflag = this.isOpen;
    let x = document.querySelectorAll("#collapse" + this.sectionId())
    if (x.length > 0) {
      this.sectionNumber = x.length;
    }
  }

  ngOnChanges() {
    if (this.section.id !== 'requestDetails' && this.section.id !== 'hrRequestDetails' && !this.sectionStatusKey && this.section.body.details.decision && this.section.body.details.decision.key) {
      this.sectionStatusKey = this.section.body.details.decision.key
    }
    if (this.section.id !== 'requestDetails' && this.section.id !== 'hrRequestDetails' && !this.sectionStatusValue && this.section.body.details.decision && this.section.body.details.decision.value) {
      this.sectionStatusValue = this.section.body.details.decision.value
    }
  }

  ngAfterViewInit() {
    if (this.isOpen) {
      $j("#collapse" + this.sectionId()).css("display", "block");
    }
    if(this.section.id.split(' ').join('') =='hrRequestDetails'){
      this.toggleHighlighted();
    }
  }

  highlightedSectionToggle() {
    return {
      panel: true,
      'panel-default': !this.highlightflag,
      'panel-primary': this.highlightflag
    };
  }

  toggleHighlighted() {
    this.highlightflag = !this.highlightflag;
    $j("#collapse" + this.sectionId()).slideToggle();
  }

  ngAfterViewChecked() {
    this.input = { isReadOnly: this.isReadOnly, lov: this.lov, section: this.section, controllers: this.controllers , sectionId :this.section };
  }

  sectionId() {
    return this.section.id.split(' ').join('') + this.randomID;
  }

  getSectionName() {
    return this.section.id;
  }

  getFormStepStatus(key: string) {
    let status = "NOT_FOUND_IN_LOV";
    if (this.lov.formStepStatus && this.lov.formStepStatus.options) {
      this.lov.formStepStatus.options.forEach((option) => {
        if (option.value === key) {
          status = option.description;
        }
      })
    }
    return status;
  }

  toggleSmallProfileInfo(event, personType) {
    event.stopPropagation();
    let userInfo = this[personType];
    if (userInfo.profile === null) {
      let userEmail = (personType === 'receipient' ? this.section.header.personToThumbnail.split('=')[1] : this.section.header.delegatedToThumbnail.split('=')[1])
      this.stateMachine.dispatch(Constants.STATE_MACHINE_ACTION_EMPLOYEE_PROFILE, userEmail).then((response) => {
        if (response) {
          this[personType].profile = response;
          userInfo.isShowing = !userInfo.isShowing;
          userInfo.isShowing = !userInfo.isShowing;
          let popUpElement = null;
          if (personType === 'receipient') {
            popUpElement = document.querySelector('[fb-id="popupReceipient' + this.sectionId() + '"]');
          }
          else if (personType === 'delegate') {
            popUpElement = document.querySelector('[fb-id="popupDelegate' + this.sectionId() + '"]');
          }
          popUpElement.style.display = 'block';
          this.renderer.invokeElementMethod(popUpElement, 'focus', []);
        }
      })
    }
    else {
      userInfo.isShowing = !userInfo.isShowing;
      let popUpElement = null;
      if (personType === 'receipient') {
        popUpElement = document.querySelector('[fb-id="popupReceipient' + this.sectionId() + '"]');
      }
      else if (personType === 'delegate') {
        popUpElement = document.querySelector('[fb-id="popupDelegate' + this.sectionId() + '"]');
      }
      popUpElement.style.display = 'block';
      this.renderer.invokeElementMethod(popUpElement, 'focus', []);
    }
  }

  hideElement(personType, event) {
    let toCheckElement = event.relatedTarget;
    if (!toCheckElement || toCheckElement.offsetParent !== event.target) {
      let popUpElement = null;
      if (personType === 'receipient') {
        popUpElement = document.querySelector('[fb-id="popupReceipient' + this.sectionId() + '"]');
      }
      else if (personType === 'delegate') {
        popUpElement = document.querySelector('[fb-id="popupDelegate' + this.sectionId() + '"]');
      }
      popUpElement.style.display = 'none';
      this[personType].isShowing = false;
    }
    this.renderer.invokeElementMethod(event.target, 'focus', []);
  }

  statusPanel(status) {
    return {
      'panel-title': true,
      'status': true,
      'statusNoDate': !this.section.header.processingDate,
      'statusDoubleLine': this.section.header.status === "PROPOSED SOLUTION",
      success: status === Constants.SECTION_STATUS_APPROVED,
      warning: status === Constants.SECTION_STATUS_PENDING,
      danger: status === Constants.SECTION_STATUS_UNSATISFIED,
    };
  }

  commentsIcons() {
    return {
      'commentsNoDate': !this.section.header.processingDate
    };
  }

  rtlDir(personType = null) {
    return {
      'is-hiding': (personType === null ? false : !this[personType].isShowing),
      'ar-dir-rtl': this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR
    };
  }

  rtlFloatRight() {
    return {
      'ar-float-right': this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR
    };
  }

  rtlFloatLeft() {
    return {
      'ar-float-left': this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR
    };
  }

  noProcessingDate() {
    return {
      'no-processing-date': !this.section.header.processedBy
    };
  }

  isWindowsOs() {
    let windowsOs = null;
    if (navigator.appVersion.indexOf("Win") != -1) {
      windowsOs = true;
    } else {
      windowsOs = false;
    };
    return {
      'panel-title-windows': windowsOs
    };
  }

  locationHref(hrefLink) {
    window.location.href = hrefLink;
  }
}
