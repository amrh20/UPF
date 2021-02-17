import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit} from '@angular/core';
import { InboxItem, ProfileInfoDrop } from '../../models/form';
import * as Constants from '../../../app/constants/constants';
import { I18nService } from '../../services/i18n.service';
import { StateMachineService } from '../../services/state-machine.service';

declare var $j: any;
@Component({
  selector: 'app-feedback-section',
  templateUrl: './feedback-section.component.html',
  styleUrls: ['./feedback-section.component.css']
})
export class FeedbackSectionComponent implements OnInit, AfterViewInit {
  
  @Input() inboxItem: InboxItem;
  @Input() profile: ProfileInfoDrop;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() changeFeedbackStatus: EventEmitter<any> = new EventEmitter();
  
  feedbackStatus: String = null;
  selecteduser: string = null;
  selecteduserName: string = null;
  feedbackquestion: string = null;
  feedbackresponse: string = null;
  isFeedbackValidated: boolean = false;
  isResponseValidated: boolean = false;
  employeeInput: string = null;
  feedbackForm: boolean = false;
  pendingForm:boolean = false;
  responderForm:boolean = false;
  feedbackId:string = null;

  feedbackReponse: any = {
    requestFrom: null,
    requestTo: null,
    requestFeedback: null,
    responseFeedback: null
  };

  constructor(public i18n: I18nService, private stateMachineService:StateMachineService) { }

  ngOnInit() {
      const item = this.inboxItem;
      if (item.canRequestFeedback === 'true') {
        this.feedbackStatus = Constants.FEEDBACK_STATUS_REQUEST;
        this.feedbackForm = true;
      }

      if (item.isRequested === 'true' && item.hasFeedback === 'true' && item.isPending === 'false' && item.isResponded === 'false') {
        this.feedbackStatus = Constants.FEEDBACK_STATUS_WAITING;
        this.pendingForm = true;
        this.getFeedBack();
      }

      if (item.isRequested === 'false'  && item.hasFeedback === 'true' && item.isPending === 'true' && item.isResponded === 'false') {
        this.feedbackStatus = Constants.FEEDBACK_STATUS_RESPOND;
        this.responderForm = true;
        this.getFeedBack();
      }

      if (item.isRequested === 'true'  && item.hasFeedback === 'true' && item.isPending === 'false' && item.isResponded === 'true') {
        this.feedbackStatus = Constants.FEEDBACK_STATUS_RESPONDED;
        this.pendingForm = true;
        this.getFeedBack();
      }

      this.changeFeedbackStatus.emit(this.feedbackStatus);
  }

  getFeedBack(){
    console.log('this.profile',this.profile);
    const email = this.profile.employeeEmail;
    this.stateMachineService.dispatch(Constants.STATE_MACHINE_ACTION_GET_FEEDBACK, email).then(Response =>  {
      const resp = Response.items[0];
      this.feedbackReponse.requestFrom = resp.from.firstName + ' ' + resp.from.middleName + ' ' + resp.from.familyName;
      this.feedbackReponse.requestTo = resp.to.firstName + ' ' + resp.to.middleName + ' ' + resp.to.familyName;
      this.feedbackReponse.requestFeedback = resp.query;
      this.feedbackReponse.responseFeedback = resp.response;
      this.feedbackId = resp.id;
    });
  }

  addFeedback() {
    const email = this.selecteduser, question = this.feedbackquestion;
    this.stateMachineService.dispatch(Constants.STATE_MACHINE_ACTION_SUBMIT_FEEDBACK, email, question).then(Response =>  {
      this.feedbackStatus = Constants.FEEDBACK_STATUS_WAITING;
      this.changeFeedbackStatus.emit(this.feedbackStatus);
      this.close.emit();
      this.feedbackForm = false;
      this.pendingForm = true;
      this.feedbackReponse.requestFrom = this.profile.fullName;
      this.feedbackReponse.requestTo = this.selecteduserName;
      this.feedbackReponse.requestFeedback = this.feedbackquestion;
    });
  }

  addResponse() {
    const feedbackId = this.feedbackId, feedbackResponse = this.feedbackresponse;
    this.stateMachineService.dispatch(Constants.STATE_MACHINE_ACTION_UPDATE_FEEDBACK, feedbackId, feedbackResponse).then(Response =>  {
      this.feedbackStatus = Constants.FEEDBACK_STATUS_RESPONDED;
      this.changeFeedbackStatus.emit(this.feedbackStatus);
      this.close.emit();
      this.responderForm = false;
      this.pendingForm = true;
      this.feedbackReponse.responseFeedback = this.feedbackresponse;
    });
  }

  handleFeedbackQuestion(event){
    this.feedbackquestion = event.target.value;
    this.handleFeedbackValidation();
  }

  handleFeedbackResponse(event){
    this.feedbackresponse = event.target.value;
    this.handleResponseValidation()
  }

  handleInput(event) {
    this.employeeInput = event.target.value;
    if(!this.feedbackquestion){ return;  }
    this.handleFeedbackValidation();
  }

  handleUserSelected(event) {
      this.selecteduser = event.personEmail;
      this.selecteduserName = event.personName;
      console.log(this.selecteduserName, event);
      if(!this.feedbackquestion){ return;  }
      this.handleFeedbackValidation();
  }

  handleResponseValidation() {
    if ((this.feedbackresponse.length > 15 && this.feedbackresponse.length < 500)){
      this.isResponseValidated = true;
    }else {
      this.isResponseValidated = false;
    }
  }

  handleFeedbackValidation(){
    if ((this.feedbackquestion.length > 15 && this.feedbackquestion.length < 500) && this.selecteduser && this.employeeInput.length >= 3){
      this.isFeedbackValidated = true;
    }else {
      this.isFeedbackValidated = false;
    }
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

  ngAfterViewInit() {
    const self = this;
    $j('[data-toggle="feedbackpopover"]').popover(
      {
        placement: function(){ 
          let rtn = 'right';
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


}
