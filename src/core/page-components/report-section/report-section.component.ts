import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Form, Section } from '../../models/form';
import * as Constants from '../../../app/constants/constants';
import { ProfileRequestorService } from '../../../app/services/profile-requestor.service';
import { I18nService } from '../../services/i18n.service';
import { StateMachineService } from '../../services/state-machine.service';

declare var $j: any;
@Component({
  selector: 'app-report-section',
  templateUrl: './report-section.component.html',
  styleUrls: ['./report-section.component.css']
})
export class ReportSectionComponent{
  
  isSubmitting = {
    key: ''
  };
  complaintArea:boolean=false;
  textComplaintArea:boolean=false;
  textComplaintAreaResponse:boolean=false;
  complaintAreaClicked:boolean=false;
  currentLang:string;
  form: Form;
  @Input() section: Section;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(public i18n: I18nService, private stateMachineService:StateMachineService,public profileRequestorService: ProfileRequestorService) { 
    this.ServicesSubScriptions();
  }

  ngOnInit() {
    this.currentLang = this.i18n.getLanguage();
    console.log('***************form**************', this.form);
    // this.section.body.details.from=this.form.profileInfoDrop.employeeEmail
      this.section.body.details.emailBody=this.i18n.translate('emailBody');
      this.section.body.details.subject=this.i18n.translate('subject');
    console.log('***************data**************', this.section);
  }

  ngAfterViewInit() {
    this.ServicesSubScriptions();
  }

  public ServicesSubScriptions() {
    this.profileRequestorService.getForm().subscribe(data => {
      data['sections']['0']['valid'] = false;
      this.form = data;
      console.log('***************data**************', data);
    });
  }

  showTextArea(){
    this.textComplaintArea=true;
        this.textComplaintAreaResponse=false;
      this.section.body.details.from=this.form.profileInfoDrop.employeeEmail
      if(this.currentLang=='ar'){
      this.section.body.details.emailBody="أواجه مشكلة في خدمة الاعتراضات..........."
      this.section.body.details.subject="SCR Issue"
    }else{
      this.section.body.details.emailBody="I have an issue in grieviance service............"
      this.section.body.details.subject="SCR Issue"
    }
  }

  handleTextArea(fieldName, object) {
    this.section.body.details[fieldName] =  object;
  }

  sendComplaint(){
      // this.close.emit();
      this.isSubmitting.key = 'search';
    this.stateMachineService.dispatch(Constants.REPORT, this.section.body.details)
    .then(Response => {
      //  if (Response) {
        this.isSubmitting.key = '';
      this.close.emit();
        // this.textComplaintArea=false;
        // this.textComplaintAreaResponse=true;
        // this.complaintArea=false;
    // }
    });
  }

  onReportClick(){
    this.complaintAreaClicked=true;
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
