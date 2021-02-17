import { ListenerService } from './../../../app/services/listener.service';
import { Component, ElementRef, Input, Output, OnChanges, OnInit, EventEmitter, SimpleChanges, ViewChild, AfterViewInit, forwardRef } from '@angular/core';
import * as Constants from '../../../app/constants/constants';
import { ResetPropagationService } from "../../services/reset-propagation.service";
import { ControlContainer, NgForm, AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../services/i18n.service';
import { StateMachineService } from '../../services/state-machine.service';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BaseComponent),
  multi: true
};
@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class BaseComponent implements OnInit, AfterViewInit {

  @Input() field: any;
  @Input() labelTextReadOnly: string;
  @Input() labelTextReadMode: string;
  @Input() labelTextWriteMode: string;
  @Input() isReadOnly: boolean;
  @Input() name: string;
  @Input() required: boolean;
  @Input() hasColumnBreak: boolean;
  @Input() terms: boolean;
  
  
  @Input() maxSize: string;
  @Input() errorMessage: string;
  @Input() placeholder: string;
  @Input() maxlength: string;
  @Input() minLength: string;
  @Input() maxValue: string;
  @Input() minValue: string;
  @Input() disabled: boolean;
  // @Input() format: string;
  @Input() componentClass: string;
  @Input() controls: AbstractControl;
  @Input() tooltipText: string;
  @Input() parentValue: string;
  @Input() lov: any;
  @Input() defaultValue: string;
  @Input() verticalRadios: boolean;
  @Input() text: string;
  @Input() type: string;
  @Input() hasLabel: boolean;
  @Input() useCurrency: boolean;
  @Input() small: boolean;

  @Output() chosenOption: EventEmitter<{ [key: string]: string }>;
  @Output() checked: EventEmitter<string> = new EventEmitter();
  @Output() userSelected: EventEmitter<Object>;
  @Output() TextsearchCleared: EventEmitter<Object>;

  @ViewChild('textArea') textArea: ElementRef;
  value: any;
  maxSizeValue: any;
  @Output() selectedElement: EventEmitter<{ [key: string]: string }>;
  public nameInput;
  maxSizeFlag = true;
  wrongExtensionFlag = true;
  wrongMimeTypeFlag = true;
  wrongFileSizeFlag = true;
  isClean = true;
  filesize;
  public isOpen;
  public options;
  public randomID: Number = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  public tooltipOpen: boolean;

  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('inputFileName') inputFileName: ElementRef;

  //attachment parameters
  @Output() outPutData: EventEmitter<object> = new EventEmitter();
  @Output() AttachmentValue: EventEmitter<object> = new EventEmitter();
  validFileTypes = {
    'pdf': ['application/pdf'],
    'doc': ['application/msword'],
    'docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    'ppt': ['application/vnd.ms-powerpoint'],
    'pptx': ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    'pps': ['application/vnd.ms-powerpoint'],
    'ppsx': ['application/vnd.openxmlformats-officedocument.presentationml.slideshow'],
    'odt': ['application/vnd.oasis.opendocument.text'],
    'xls': ['application/vnd.ms-excel'],
    'xlsx': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    'zip': ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip', 'application/zip'],
    'msg': ['application/vnd.ms-outlook', 'application/msg'],
    'csv': ['text/csv'],
    'txt': ['text/plain'],
    'rtf': ['application/rtf', 'application/x-rtf', 'text/richtext'],
    'html': ['text/html'],
    'mp4': ['video/mp4'],
    'm4v': ['video/mp4'],
    'mov': ['video/quicktime'],
    'wmv': ['video/x-ms-wmv'],
    'avi': ['video/x-msvideo'],
    'mpg': ['mpg'],
    'ogv': ['video/ogg'],
    '3gp': ['video/3gpp', 'audio/3gpp'],
    '3g2': ['video/3gpp2', 'audio/3gpp'],
    'jpg': ['image/jpeg', 'image/pjpeg'],
    'jpeg': ['image/jpeg', 'image/pjpeg'],
    'png': ['image/png'],
    'gif': ['image/gif'],
    'bmp': ['image/bmp', 'image/x-windows-bmp']
  }

  validImageTypes = {

    jpg: ['image/jpeg', 'image/pjpeg'],
    JPG: ['image/jpeg', 'image/pjpeg'],
    jpeg: ['image/jpeg', 'image/pjpeg'],
    png: ['image/png']
  }

  //attachment-list parameters
  @Input() max_files: number;
  isAddMoreVisible = true;
  totalattachments: Array<any>;
  @Output() attachmentList: EventEmitter<any>;
  @Output() removefile: EventEmitter<any>;
  isSendBack: boolean = false;

  constructor(public i18n: I18nService, public stateMachine: StateMachineService, public resetPropagator: ResetPropagationService, private http: HttpClient
    ,public _messageService: ListenerService
    ) {
    this.value = this.field;
    this.isOpen = false;
    this.selectedElement = new EventEmitter();
    this.userSelected = new EventEmitter();
    this.TextsearchCleared = new EventEmitter();
    this.options = [];
    this.chosenOption = new EventEmitter();
    this.tooltipOpen = false;

    this.attachmentList = new EventEmitter();
    this.removefile = new EventEmitter();
    this.totalattachments = new Array();
  }

  ngOnInit() {
    if (this.required == undefined) {
      this.required = true;
    }
    if (this.disabled == undefined) {
      this.disabled = false;
    }
  }

  ngAfterViewInit() {
  }

  inputField() {
    if ((this.isReadOnly && this.field) || (!this.isReadOnly && this.field !== undefined)) {
      return this.field;
    } else {
      return '';
    }
  }

  isValidMimeType(value) {
    return [].concat(...Object.values(this.validFileTypes)).includes(value);
  }

  isValidExtension(value) {
    return [].concat(...Object.keys(this.validFileTypes)).includes(value.toLowerCase());
  }

  isValidImgMimeType(value) {
    return [].concat(...Object.values(this.validImageTypes)).includes(value);
  }

  isValidImgExtension(value) {
    return [].concat(...Object.keys(this.validImageTypes)).includes(value.toLowerCase());
  }

  validationBorder() {
    return {
      "field-border-error": (!this.wrongMimeTypeFlag || !this.wrongExtensionFlag) && this.isClean === false,
      "rtlButtonBrowse": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  rtlLabel() {
    return {
      "rtlAttachmentLabel": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  rtlOptionalLabel() {
    return {
      "rtlOptionalLabel": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  rtlButtonBrowseLabel() {
    return {
      "rtlButtonBrowseLabel": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  rtlFloatRight() {
    return {
      "ar-float-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  rtlFloatLeft() {
    return {
      "ar-float-left": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  formComponent() {
    return {
      "ar-float-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
      "form-group": !this.isReadOnly && this.field,
      "col-xs-12": true,
      "col-md-6 ": !this.hasColumnBreak,
      "col-md-12": this.hasColumnBreak
    }
  }

  inputDisplay() {
    return {
      "input-display": this.isReadOnly && !this.field,
    }
  }

  rtlDir() {
    return {
      "ar-dir-rtl": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
      "vertical-radio": this.verticalRadios,
    }
  }

  rtlCheckboxClasses() {
    return {
      "rtlCheckbox": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  rtlPhoneField() {
    return {
      "rtlPhoneField": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
      "ar-float-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }
}