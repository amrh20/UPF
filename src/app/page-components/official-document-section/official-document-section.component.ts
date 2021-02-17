import { RequestDetailsSectionComponent } from './../request-details-section/request-details-section.component';
import { ProfileRequestorService } from './../../services/profile-requestor.service';
import { Section } from './../../../core/models/form';
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { I18nService } from '../../../core/services/i18n.service';
import * as Constants from '../../constants/constants';
import { ListenerService } from '../../services/listener.service';
import { StateMachineService } from '../../../core/services/state-machine.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
@Component({
  selector: "app-official-document-section",
  templateUrl: "./official-document-section.component.html",
  styleUrls: ["./official-document-section.component.css"],
})
export class OfficialDocumentSectionComponent extends RequestDetailsSectionComponent {
  officialDocumentType
  officialDocumentIndex

  openPopUp(type) {
    this.section.body.details.officialDocumentSegment.officialDocument.push(
      Object.assign({}, this.officialDocumentObj));
    let row = this.section.body.details.officialDocumentSegment.officialDocument[this.section.body.details.officialDocumentSegment.officialDocument.length - 1]
    let obj = {
      type: type,
      row: row,
      index: null
    }
    this.officialDocumentType = type
    this.officialDocumentIndex = null
    this._messageService.filter(obj);
  }

  edit(type, index, row) {
    let obj = {
      type: type,
      row: row,
      index: index
    }
    this.officialDocumentType = type
    this.officialDocumentIndex = index
    this._messageService.filter(obj);
  }

  close() {
    let ind
    if (this.officialDocumentIndex == null) {
      if (this.type == 'officialDocumentSegment') {
        ind = this.section.body.details['officialDocumentSegment']['officialDocument'].length - 1
      }
    } else {
      ind = this.officialDocumentIndex
    }
    if (this.type == 'officialDocumentSegment') {
      this.deleteGenericRow('officialDocumentSegment', 'officialDocument', ind)
    }
  }

  formisvalid() {
    let obj, ind
    if (this.section.body.details.officialDocumentSegment && this.section.body.details.officialDocumentSegment.officialDocument) {
      if (this.officialDocumentIndex == null) {
        ind = this.section.body.details['officialDocumentSegment']['officialDocument'].length - 1
      } else {
        ind = this.officialDocumentIndex
      }
      obj = this.section.body.details.officialDocumentSegment.officialDocument[ind]
    }
    if (obj) {

      if (obj.documentNumber
        && obj.expiryDate && obj.profession
        && obj.version 
      ) {
        return true
      } else {
        return false
      }
    }
    else {
      return false
    }

  }
}


@Component({
  selector: 'app-official-document-popup',
  templateUrl: './official-document-details.component.html',
  styleUrls: ["./official-document-section.component.css"],
})
export class OfficialDocumentPopupDetailsComponent {
  @Input() section: Section;
  @Input() lov: any;
  data: any;
  type: any
  i: any
  isReady: boolean = false;


  constructor(public i18n: I18nService
    , private _messageService: ListenerService
    , public profileRequestorService: ProfileRequestorService
    , public stateMachine: StateMachineService
    , private cdr: ChangeDetectorRef
    , private sanitizer: DomSanitizer
  ) {
    this._messageService.listen().subscribe((result: any) => {
      this.isReady = false
      this.cdr.detectChanges();
      if (result) {
        this.type = result.type
        this.data = result.row
        this.i = result.index
      }
    })
  }

  ngOnInit() {
  }

  onSelectChange(fieldName, GenericDocument, object) {

    GenericDocument[fieldName] = object;

    if (fieldName == "nationality") {
      GenericDocument.idNumber = null;
    }


    if (fieldName == "scale") {
      if (GenericDocument[fieldName].key == "STC_QUALIFICATION_GPA_TYPE_100") {
        GenericDocument.gpa = "100";
      }
      else if (GenericDocument[fieldName].key == "STC_QUALIFICATION_GPA_TYPE_4") {
        GenericDocument.gpa = "4";
      }
      else if (GenericDocument[fieldName].key == "STC_QUALIFICATION_GPA_TYPE_5") {
        GenericDocument.gpa = "5";
      }
      else if (GenericDocument[fieldName].key == "STC_QUALIFICATION_GPA_TYPE_PAS") {
        GenericDocument.gpa = null;
      }
    }

    if (fieldName == "country" && GenericDocument.evaluationNo !== undefined) {
      if ((GenericDocument[fieldName].key !== "SA" && this.section.body.details.personalProfile.nationality.key === '001') == false) {
        GenericDocument.evaluationNo = null;
        GenericDocument.evaluationDate = null;

      }
    }

    if (fieldName == "educationLevel" && (GenericDocument.educationLevel.key == '5' || GenericDocument.educationLevel.key == '8' || GenericDocument.educationLevel.key == '9')) {

      GenericDocument.major.key = null;
      GenericDocument.subMajor.key = null;

    }

    if (fieldName == "type") {
      GenericDocument.areaCode = { key: null, value: null }
      GenericDocument.phone = null;
    }

    if (fieldName == "countryCode") {
      this.stateMachine.dispatch(Constants.STATE_MACHINE_ACTION_GET_AREACODE,
        object.key).then((response) => {
          if (response) {
            this.lov.areaCode.options = response["response"].areaCode.options;
          }
        }, (err) => {



        });
    }

    if (fieldName == "universityInstitute") {
      this.stateMachine.dispatch("getEstLocation",
        object.key).then((response) => {
          if (response) {
            GenericDocument.country.key = response["response"].country.key;

            GenericDocument.city.key = response["response"].city.key;
          }
        }, (err) => {



        });
    }

    if (fieldName == "major") {
      this.stateMachine.dispatch("getSubMajor",
        object.key).then((response) => {
          if (response) {
            this.lov.subMajor.options = response["response"].subMajor.options;
          }
        }, (err) => {



        });
    }




    //  disabilityFlag  exist in many segments i need only medical details
    if (fieldName == "disabilityFlag" && GenericDocument.disabilityCard !== undefined) {
      GenericDocument.disabilityType.key = null;
      GenericDocument.disabilityCard = { fileName: null, mimeType: null, fileContents: null };
      GenericDocument.medicalReport = { fileName: null, mimeType: null, fileContents: null };

    }

    if (fieldName == "chronicDisease") {
      GenericDocument.chronicDiseaseType.key = null;

    }


    if (fieldName == "justification" && GenericDocument.isUpdated) {
      GenericDocument.isUpdated = "true";
    }



    this.cdr.detectChanges();
  }

  handleDateSelected(RowItem, fieldName, event) {
    RowItem[fieldName] = event;

    this.calculateDaysDuration(RowItem, event);

  }

  calculateDaysDuration(RowItem, event) {


    if (RowItem.startDate != null
      && RowItem.endDate != null) {
      ;

      var FromDate = moment(RowItem.startDate);
      var ToDate = moment(RowItem.endDate);



      var days = ToDate.diff(FromDate, 'days');



      if (days <= 30) {
        RowItem.duration.periodDays = days.toString();
        RowItem.duration.periodMonths = "0";
        RowItem.duration.periodYears = "0";
      }
      else if (days <= 365) {


        RowItem.duration.periodDays = (days - Math.floor(days / 30) * 30).toString();
        RowItem.duration.periodMonths = Math.floor(days / 30).toString();
        RowItem.duration.periodYears = "0";
      }
      else {
        let years = Math.floor(days / 365);
        let months = Math.floor((days - years * 365) / 30);
        let dayspart = days - (years * 365 + months * 30);

        RowItem.duration.periodDays = dayspart.toString();
        RowItem.duration.periodMonths = months.toString();
        RowItem.duration.periodYears = years.toString();

      }
    }
  }

  handleTextInput(fieldName, GenericDocument, event) {

    GenericDocument[fieldName] = event;
    delete this.section.body.details.fieldName
  }

  handleAttachment(fieldName, segment, data) {
    if (data.data == null) {
      segment[fieldName] = {
        fileName: "",
        mimeType: "",
        fileContents: "",
        attachmentId: "",
      };
    } else {
      segment[fieldName] = data.data;
    }
  }

  hidenationalAttch(fieldName, national) {
    if (
      this.profileRequestorService.haveDataFromElmnationalAddress &&
      this.section.body.details.officialDocumentSegment.importFromElm == "true"
    ) {
      return true;
    } else {
      return false;
    }
  }

  rtlFloatRight() {
    return {
      "ar-float-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  loaderArabic() {
    return {
      "loaderArabic": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR && !this.stateMachine.isMobileApp(),
    }
  }

  close(type) {
    console.log('xxxxxxxxxxxxxxxxxx', type)
  }

  update(type) {

  }

  onValueChange(genericRow, value, index) {

    if (genericRow.scale.key == "STC_QUALIFICATION_GPA_TYPE_100") {
      if (parseFloat(value) > 100) {
        genericRow.gpa = "100";
      }
    }
    else if (genericRow.scale.key == "STC_QUALIFICATION_GPA_TYPE_4") {
      if (parseFloat(value) > 4) {
        genericRow.gpa = "4";
      }
    }
    else if (genericRow.scale.key == "STC_QUALIFICATION_GPA_TYPE_5") {
      if (parseFloat(value) > 5) {
        genericRow.gpa = "5";
      }
    }
    else if (genericRow.scale.key == "STC_QUALIFICATION_GPA_TYPE_PAS") {

      genericRow.gpa = null;


    }

    this.cdr.detectChanges();
  }

  hidenational(fieldName, national) {
    if (
      this.profileRequestorService.haveDataFromElmnationalAddress &&
      this.section.body.details.officialDocumentSegment.importFromElm == "true"
    ) {
      return true;
    } else {
      return false;
    }
  }


  hidenationalSelectize(fieldName, national) {
    if (
      this.profileRequestorService.haveDataFromElmnationalAddress &&
      this.section.body.details.officialDocumentSegment.importFromElm == "true"
    ) {
      return true;
    } else {
      return false;
    }
  }

  ConvertStringToBoolean(strValue) {
    if (strValue == "Y") {
      return true;
    }
    else {
      return false;

    }
  }

  chaneStringToBoolean(index, Flag) {
    if (Flag == true) {
      this.section.body.details.contactInformationSegment.contactInformation[index]["primary"] = "Y"
    }
    else {
      this.section.body.details.contactInformationSegment.contactInformation[index]["primary"] = "N"
    }
  }

  handleCheckboxChange(fieldName, data, checkboxState) {
    data[fieldName] = checkboxState;
    delete this.section.body.details.fieldName
  }

}
