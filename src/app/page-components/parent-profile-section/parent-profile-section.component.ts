import { RequestDetailsSectionComponent } from './../request-details-section/request-details-section.component';
import { isArray } from 'util';
import { DomSanitizer } from '@angular/platform-browser';
import { StateMachineService } from './../../../core/services/state-machine.service';
import { ProfileRequestorService } from './../../services/profile-requestor.service';
import { ListenerService } from './../../services/listener.service';
import { I18nService } from './../../../core/services/i18n.service';
import { Section, Form } from './../../../core/models/form';
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import * as Constants from '../../constants/constants';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import loadFormHooks from "./../../hooks/load-form";

@Component({
  selector: "app-parent-profile-section",
  templateUrl: "./parent-profile-section.component.html",
  styleUrls: ["./parent-profile-section.component.css"],
})
export class ParentProfileSectionComponent extends RequestDetailsSectionComponent{
  ParentProfileType
  ParentProfileIndex

  openPopUp(type) {
    if (type == "parentProfileSegment") {
      this.section.body.details.parentProfileSegment.parentProfile.push(
        Object.assign({}, this.parentProfileObj));
    }
    else if (type == "familyProfileSegment") {
      this.section.body.details.familyProfileSegment.familyProfile.push(
        Object.assign({}, this.familyProfileObj));
    }

    let row 
    if (type == 'parentProfileSegment') {
      row = this.section.body.details.parentProfileSegment.parentProfile[this.section.body.details.parentProfileSegment.parentProfile.length - 1]
    }
    if(type == 'familyProfileSegment'){
      row = this.section.body.details.familyProfileSegment.familyProfile[this.section.body.details.familyProfileSegment.familyProfile.length - 1]
    }
    let obj = {
      type: type,
      row: row,
      index: null
    }
    this.ParentProfileType = type
    this.ParentProfileIndex = null
    this._messageService.filter(obj);
  }

  edit(type, index, row) {
    let obj = {
      type: type,
      row: row,
      index: index
    }
    this.ParentProfileType = type
    this.ParentProfileIndex = index
    this._messageService.filter(obj);
  }

  close() {
    let ind
    if (this.ParentProfileIndex == null) {
      if (this.ParentProfileType == "parentProfileSegment") {
        ind = this.section.body.details['parentProfileSegment']['parentProfile'].length - 1
      }
      else if (this.ParentProfileType == "familyProfileSegment") {
        ind = this.section.body.details['familyProfileSegment']['familyProfile'].length - 1
      }
    } else {
      ind = this.ParentProfileIndex
    }
    if (this.ParentProfileType == "parentProfileSegment") {
      this.deleteGenericRow('parentProfileSegment', 'parentProfile', ind)
    }
    else if (this.ParentProfileType == "familyProfileSegment") {
      this.deleteGenericRow('familyProfileSegment', 'familyProfile', ind)
    }
  }

  


}


@Component({
  selector: 'app-parent-profile-popup',
  templateUrl: './parent-profile-details.component.html',
  styleUrls: ["./parent-profile-section.component.css"],
})
export class ParentProfilePopupDetailsComponent  {
  @Input() section: Section;
  @Input() lov: any;
  @Input() isReadOnly: boolean;
  data: any;
  type: any
  i: any
  isReady: boolean = false;
  haveDataFromElmfamilyProfile: boolean;
  index

  constructor(public i18n: I18nService
    , private _messageService: ListenerService
    , public profileRequestorService: ProfileRequestorService
    , public stateMachine: StateMachineService
    , private cdr: ChangeDetectorRef
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

  personalProfileVisibility: boolean = false;
  organizationalProfileVisibility: boolean = false;


  familyProfile = "true";
  nationalAddressSegment = "true";
  officialDocumentSegment = "true";

  currentSectionId: any;
  helpMessage: string = "";
  importFromElmMessage: string = "";
  nationalAddresshelpMessage: string = "";
  organizationalProfilehelpMessage: string = "";
  officialDocumenthelpMessage: string = "";
  personalProfilehelpMessage: string = "";
  previousExperienceMessage: string = "";
  qualificationhelpMessage: string = "";
  originalAddresshelpMessage: string = "";
  contactInformationhelpMessage: string = "";
  officeLocationhelpMessage: string = "";
  medicalDetailhelpMessage: string = "";
  profCertInformationhelpMessage: string = "";
  profParentDetailshelpMessage: string = "";
  form: Form;
  haveDataFromElmnationalAddress: boolean;
  nationalAddressElmData: any;

  popupLabel: string = ''


  // this objects use to Add/ delete from Tables
  familyProfileObj = {
    new: "new",

    title: {
      value: null,
      key: null,
    },

    firstNameEn: null,
    firstNameAr: null,
    fatherNameEn: null,
    fatherNameAr: null,
    grandFatherNameEn: null,
    grandFatherNameAr: null,
    familyNameEn: null,
    familyNameAr: null,

    nationality: {
      value: null,
      key: null,
    },
    newToSaudi: "false",
    idNumber: null,
    birthDate: null,
    borderBirthNumber: null,
    maritalStatus: {
      value: null,
      key: null,
    },
    age: null,
    disabilityType: {
      key: null,
    },
    gender: {
      value: null,
      key: null,
    },
    disabilityFlag: {
      value: null,
      key: null,
    },
    relationship: {
      value: null,
      key: null,
    },
    chronicDisease: {
      value: null,
      key: null,
    },
    chronicDiseaseType: {
      key: null,
    },
    working: {
      value: null,
      key: null,
    },
    passportOrBirthAttachment: {
      fileName: null,
      mimeType: null,
      fileContents: null,
    },

    noNeedMedical: {
      value: null,
      key: null,
    },

    supportDoc: {
      fileName: null,
      mimeType: null,
      fileContents: null,
    },
    coverageNote: null,



    justification: {
      key: null,
    },

    idAttachment: {
      fileName: null,
      mimeType: null,
      fileContents: null,
    },
    note: null,


    familyCard: {
      fileName: null,
      mimeType: null,
      fileContents: null,
    },
    isUpdated: true,

    importFromElm: false,







  };


  parentProfileObj = {
    new: "new",
    action: 'ADD',
    title: {
      value: null,
      key: null,
    },
    firstNameEn: null,
    firstNameAr: null,
    fatherNameEn: null,
    fatherNameAr: null,
    grandFatherNameEn: null,
    grandFatherNameAr: null,
    familyNameEn: null,
    familyNameAr: null,
    nationality: {
      value: null,
      key: null,
    },
    idNumber: null,
    maritalStatus: {
      value: null,
      key: null,
    },
    age: "",

    gender: {
      value: null,
      key: null,
    },

    familyCard: {
      fileName: null,
      mimeType: null,
      fileContents: null,
    },

    relationship: {
      value: null,
      key: null,
    },

    idAttachment: {
      fileName: null,
      mimeType: null,
      fileContents: null,
    },
    chronicDisease: {
      value: "NO",
      key: "N"
    },
    chronicDiseaseType: {
      key: null,
    }
    ,
    disabilityFlag: {
      value: "NO",
      key: "N",
    },
    disabilityType: {
      key: null,
    },
    birthDate: null,


    note: '',
    justification: '',

  };
  qualificationObj = {
    action: 'ADD',
    certificate: { fileName: null, isIgate: null, mimeType: null, attachmentId: null, fileContents: null },
    country: { value: null, key: null },
    city: { value: null, key: null },
    educationLevel: { value: null, key: null },
    evaluationCertificate: { fileName: null, isIgate: null, mimeType: null, attachmentId: null, fileContents: null },
    evaluationDate: null,
    evaluationNo: null,
    gpa: null,
    graduatedDate: null,
    id: null,
    major: { value: null, key: null },
    scale: { value: null, key: null },
    startDate: null,
    subMajor: { value: null, key: null },
    new: "new",
    universityInstitute: { value: null, key: null },
    note: null,
    justification: null
  }
  nationalAddressObj = {
    action: 'ADD',
    new: "new",
    note: null,
    streetName: null,
    attachment: {
      fileName: null,
      mimeType: null,
      fileContents: null,
    },
    city: null,
    district: null,
    postalCode: null,
    buildingNumber: null,
    counter: null,
  };
  officeLocationObj = {
    action: 'ADD',
    new: "new",
    costCentre: null,
    region: null,
    district: null,
    campus: null,
    building: null,
    floor: null,
    officeNo: null,
    note: null,
  };
  officialDocumentObj = {
    action: 'ADD',
    new: "new",
    expiryDate: null,
    profession: null,
    attachment: {
      fileName: null,
      mimeType: null,
      fileContents: null,
    },
    documentType: {
      value: null,
      key: null,
    },
    documentNumber: null,
    issueDate: null,
    version: null,
    issuePlace: {
      value: null,
      key: null,
    },
  };
  medicalDetailsObj = {
    action: 'ADD',
    new: "new",
    bloodType: { value: null, key: null },
    chronicDisease: { value: "YES", key: "Y" },
    chronicDiseaseType: { value: null, key: null },
    disabilityFlag: { value: "YES", key: "Y" },
    disabilityType: { value: null, key: null },
    height: null,
    personId: null,
    smoker: { value: "NO", key: "N" },
    weight: null
  };
  originalAddressObj = {
    new: "new",
    id: null,
    action: 'ADD',
    country: { value: null, key: null },
    city: null,
    districtName: null,
    streetName: null,
    postalCode: null,
    buildingNumber: null,
    unitNumber: null,
    additionalNumber: null,
  };

  previousExperienceObj = {
    new: "new",
    action: 'ADD',
    attachment: {
      fileName: null,
      isIgate: null,
      mimeType: null,
      attachmentId: null,
    },
    city: null,
    companyName: null,
    companySector: { value: "unknown", key: "UNKNOWN" },
    country: { value: null, key: null },
    duration: { periodDays: null, periodMonths: null, periodYears: null },
    endDate: null,
    id: null,
    jobField: { value: null, key: null },
    jobTitle: null,
    responsibilities: null,
    startDate: null,
    justification: null,
    note: null
  };

  contactInformationObj = {
    new: "new",
    action: 'ADD',
    type: { value: null, key: null },
    countryCode: { value: null, key: null },
    areaCode: { value: null, key: null },
    phone: "",
    primary: "N"
  }


  professionalCertificateObj = {
    action: 'ADD',
    new: "new",
    certificateNo: null,
    certificateName: null,
    certificateDate: null,
    certificateOrganization: null,
    expiryDate: null,
    justification: null,
    certificate: { fileName: null, isIgate: null, mimeType: null, attachmentId: null, fileContents: null },

  };
  //----------------------------------------------------------------

  update() {
  }


  formisvalid(){

  }


  // this functions used to update isupdated Flag 

  familyProfileSegmentisUpdated: boolean;
  onfamilyProfileSegmentisUpdated(checked) {
    if (checked) {
      this.section.body.details.familyProfileSegment.isUpdated = "true";
    } else {
      this.section.body.details.familyProfileSegment.isUpdated = "false";
    }
  }

  nationalAddressSegmentisUpdated: boolean;
  nationalAddressSegmentisUpdatedChange(checked) {
    if (checked) {
      this.section.body.details.nationalAddressSegment.isUpdated = "true";
    } else {
      this.section.body.details.nationalAddressSegment.isUpdated = "false";
    }
  }

  officialDocumentSegmentisUpdated: boolean;
  officialDocumentSegmentisUpdatedChange(checked) {
    if (checked) {
      this.section.body.details.officialDocumentSegment.isUpdated = "true";
    } else {
      this.section.body.details.officialDocumentSegment.isUpdated = "false";
    }
  }


  parentProfile: boolean
  parentProfileChange(checked) {
    if (checked) {
      this.section.body.details.parentProfileSegment.isUpdated = "true";
    } else {
      this.section.body.details.parentProfileSegment.isUpdated = "false";
    }
  }

  previousExperience: boolean
  previousExperienceChange(checked) {
    if (checked) {
      this.section.body.details.previousExperienceSegment.isUpdated = "true";
    } else {
      this.section.body.details.previousExperienceSegment.isUpdated = "false";
    }
  }

  qualification: boolean
  qualificationChange() {
    if (this.qualification) {
      this.section.body.details.qualificationSegment.isUpdated = "true";
    } else {
      this.section.body.details.qualificationSegment.isUpdated = "false";
    }
  }
  originalAddress: boolean
  originalAddressChange(checked) {
    if (checked) {
      this.section.body.details.originalAddressSegment.isUpdated = "true";
    } else {
      this.section.body.details.originalAddressSegment.isUpdated = "false";
    }
  }
  contactInformation: boolean
  contactInformationChange(checked) {
    if (checked) {
      this.section.body.details.contactInformationSegment.isUpdated = "true";
    } else {
      this.section.body.details.contactInformationSegment.isUpdated = "false";
    }
  }

  officeLocation: boolean
  officeLocationChange(checked) {
    if (checked) {
      this.section.body.details.officeLocationSegment.isUpdated = "true";
    } else {
      this.section.body.details.officeLocationSegment.isUpdated = "false";
    }
  }

  professionalCertificate: boolean
  professionalCertificateChange(checked) {
    if (checked) {
      this.section.body.details.professionalCertificateSegment.professionalCertificate.isUpdated = "true";
    } else {
      this.section.body.details.professionalCertificateSegment.professionalCertificate.isUpdated = "false";
    }
  }


  // ---------------------------------------------------------------------


  // Generic functions should replace per segment functions

  deleteGenericRow(firstLevel, secondLevel, index) {


    if (firstLevel != "familyProfileSegment") {
      var index = this.section.body.details[firstLevel][secondLevel].indexOf(this.getFilteredList(this.section.body.details[firstLevel][secondLevel])[index]);
    }



    if (this.section.body.details[firstLevel][secondLevel][index].new === "new") {
      this.section.body.details[firstLevel][secondLevel].splice(index, 1);
    }
    else {
      this.section.body.details[firstLevel][secondLevel][index].action = "DELETE";
    }

  }



  AddNewGenericRow(Segment) {


    if (Segment == "previousExperience") {
      this.section.body.details.previousExperienceSegment.previousExperience.push(
        Object.assign({}, this.previousExperienceObj));
    }
    else if (Segment == "contactInformationSegment") {
      this.section.body.details.contactInformationSegment.contactInformation.push(
        Object.assign({}, this.contactInformationObj));
    }

    else if (Segment == "qualificationSegment") {
      this.section.body.details.qualificationSegment.qualification.push(
        Object.assign({}, this.qualificationObj));
    }
    else if (Segment == "originalAddressSegment") {
      this.section.body.details.originalAddressSegment.originalAddress.push(
        Object.assign({}, this.originalAddressObj));
    }
    else if (Segment == "parentProfileSegment") {
      this.section.body.details.parentProfileSegment.parentProfile.push(
        Object.assign({}, this.parentProfileObj));
    }
    else if (Segment == "familyProfileSegment") {
      this.section.body.details.familyProfileSegment.familyProfile.push(
        Object.assign({}, this.familyProfileObj));
    }
    else if (Segment == "officialDocumentSegment") {
      this.section.body.details.officialDocumentSegment.officialDocument.push(
        Object.assign({}, this.officialDocumentObj));
    }
    else if (Segment == "nationalAddressSegment") {
      this.section.body.details.nationalAddressSegment.nationalAddress.push(
        Object.assign({}, this.nationalAddressObj));
    }
    else if (Segment == "officeLocationSegment") {
      this.section.body.details.officeLocationSegment.officeLocation = this.officeLocationObj;
    }

    else if (Segment == "professionalCertificateSegment") {
      this.section.body.details.professionalCertificateSegment.professionalCertificate.push(
        Object.assign({}, this.professionalCertificateObj));
    }




  }



  //---------------------------------------------


  
  inputDisplay() {
    // return {
    //   "input-display": this.isReadOnly ,
    // }
  }
  minimizeSegment(fam) {
    fam["minimize"] = true;
  }
  plusSegment(fam) {
    fam["minimize"] = false;
  }
  ngAfterViewInit() {
    this.helpMessage = this.i18n.translate("helpMessage");
    this.nationalAddresshelpMessage = this.i18n.translate(
      "nationalAddresshelpMessage"
    );
    this.officialDocumenthelpMessage = this.i18n.translate(
      "officialDocumenthelpMessage"
    );

    this.personalProfilehelpMessage = this.i18n.translate(
      "personalProfilehelpMessage"
    );
    this.organizationalProfilehelpMessage = this.i18n.translate(
      "organizationalProfilehelpMessage"
    );

    this.previousExperienceMessage = this.i18n.translate(
      "previousExperienceMessage"
    );
    this.qualificationhelpMessage = this.i18n.translate(
      "qualificationhelpMessage"
    );
    this.originalAddresshelpMessage = this.i18n.translate(
      "originalAddresshelpMessage"
    );

    this.contactInformationhelpMessage = this.i18n.translate(
      "contactInformationhelpMessage"
    );
    this.officeLocationhelpMessage = this.i18n.translate(
      "officeLocationhelpMessage"
    );
    this.medicalDetailhelpMessage = this.i18n.translate(
      "medicalDetailhelpMessage"
    );

    this.profCertInformationhelpMessage = this.i18n.translate(
      "profCertInformationhelpMessage"
    );

    this.profParentDetailshelpMessage = this.i18n.translate(
      "profParentDetailshelpMessage"
    );






    this.ServicesSubScriptions();

    //to set existing prob
    if (
      this.section.body.details &&
      this.section.body.details.familyProfileSegment &&
      this.section.body.details.familyProfileSegment.familyProfile
    ) {
      this.section.body.details.familyProfileSegment.familyProfile.forEach(
        (element) => {
          element["existing"] = "true";
          element["minimize"] = true;
          element["importFromElm"] = false;
          if (element.justification && element.justification.key != "") {
            element.isUpdated == "true";
          }
        }
      );
    }

    if (
      this.section.body.details &&
      this.section.body.details.nationalAddressSegment &&
      this.section.body.details.nationalAddressSegment.nationalAddress
    ) {
      this.section.body.details.nationalAddressSegment.nationalAddress.forEach(
        (element) => {
          element["existing"] = "true";
          element["importFromElm"] = false;
        }
      );
    }
    if (
      this.section.body.details &&
      this.section.body.details.officialDocumentSegment &&
      this.section.body.details.officialDocumentSegment.officialDocument
    ) {
      this.section.body.details.officialDocumentSegment.officialDocument.forEach(
        (element) => {
          element["existing"] = "true";
          element["importFromElm"] = false;
        }
      );
    }

    if (
      this.section.body.details.familyProfileSegment &&
      this.section.body.details.familyProfileSegment.isUpdated == "true"
    ) {
      this.familyProfileSegmentisUpdated = true;
    } else {
      this.familyProfileSegmentisUpdated = false;
    }

    if (
      this.section.body.details.nationalAddressSegment &&
      this.section.body.details.nationalAddressSegment.isUpdated == "true"
    ) {
      this.nationalAddressSegmentisUpdated = true;
    } else {
      this.nationalAddressSegmentisUpdated = false;
    }

    if (
      this.section.body.details.officialDocumentSegment &&
      this.section.body.details.officialDocumentSegment.isUpdated == "true"
    ) {
      this.officialDocumentSegmentisUpdated = true;
    } else {
      this.officialDocumentSegmentisUpdated = false;
    }
  }

  help() { }
  activeRow() {
    return {
      active: 1 == 1,
    };
  }
  rtlButtonBrowseLabel() {
    return {
      rtlButtonBrowseLabel:
        this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    };
  }



  getFilteredList(list) {



    let FilteredList = [];


    if (!this.isReadOnly) {
      list.forEach(item => {

        if (item.action !== 'DELETE' && item.id !== '-1') {

          FilteredList.push(item);
        }




      });


      return FilteredList;
    }
    else {
      list.forEach(item => {

        if (item.id !== '-1') {

          FilteredList.push(item);
        }




      });


      return FilteredList;
    }




  }
  deleted() {
    return {
      isDeleted: true,
    };
  }

  removefamilyProfile() {
    let idx =
      this.section.body.details.familyProfileSegment.familyProfile.length - 1;
    if (
      this.section.body.details.familyProfileSegment.familyProfile[idx] &&
      this.section.body.details.familyProfileSegment.familyProfile[idx][
      "new"
      ] == "true"
    ) {
      this.section.body.details.familyProfileSegment.familyProfile.splice(
        idx,
        1
      );
    }
  }



  addDeleteRow() {
    this.section.body.details.originalAddress.originalAddress.originalAddress.push(
      Object.assign({}, this.originalAddressObj)
    );
  }

  tableSize() {
    return {
      "ar-float-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
      "col-xs-12": true,
      "col-md-12 ": true,
    };
  }

  tableCellTextAlign() {
    return {
      "control-cells-ar":
        this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    };
  }

  rtlFloatRight() {

    return {
      "ar-float-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
      "en-float-left ": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_EN,
    };
  }

  public ServicesSubScriptions() {
    this.profileRequestorService.getForm().subscribe((data) => {
      this.form = data;
      this.currentSectionId = this.form.sections[
        this.form.sections.length - 1
      ].id;
    });
  }

  setbirthDate(dateOfBirth: any, familyProfile, fieldName) {
    console.log("dateOfBirthHijri", dateOfBirth);
    if (dateOfBirth) {
      familyProfile["dateOfBirthHijri"] = dateOfBirth;
    } else {
      familyProfile["dateOfBirthHijri"] = null;
    }
  }
  ageFromDateOfBirthday(dateOfBirth: any, GenericObject) {
    GenericObject.birthDate = dateOfBirth;

    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();


    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    GenericObject.age = age;
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

  handleTextInput(fieldName, GenericDocument, event) {

    GenericDocument[fieldName] = event;
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

  onSelectTwoLevelsChange(fieldName, firstLevel, secondLevel, object) {
    this.section.body.details[firstLevel][secondLevel][fieldName] = object;
  }





  getMaxLenthFromNationality(nationalityKey, GenericSegment) {

    // GCC
    if (
      nationalityKey == "023" ||
      nationalityKey == "041" ||   // Bahrain 
      nationalityKey == "058" ||  // Kuwait
      nationalityKey == "040" || //Oman
      nationalityKey == "082" ||
      nationalityKey == "UAE"   //United Arab Emirates / 
    ) {
      /// GCC---------------------------------

      return 15;
    } else if (nationalityKey == "001") {
      /// soudi---------------------------------

      if (!GenericSegment.idNumber || !GenericSegment.idNumber.startsWith("1")) {
        GenericSegment.idNumber = "1";
      }
      return 10;

    } else {

      if (!GenericSegment.idNumber || !GenericSegment.idNumber.startsWith("2")) {
        GenericSegment.idNumber = "2";
      }

      return 10;
    }
  }

  handleCheckbo(fieldName, checkboxState) {
    this.section.body.details[fieldName] = checkboxState;
  }

  handleCheckboxChange(fieldName, familyProfile, checkboxState) {
    familyProfile[fieldName] = checkboxState;
    if (fieldName == "importFromElm" && checkboxState == "true") {
      familyProfile.importFromElm = true;
    }
    if (fieldName == "importFromElm" && checkboxState == "false") {
      familyProfile.importFromElm = false;
    }
  }

  handlenationalAddressCheckboxChange(fieldName, checkboxState) {
    this.section.body.details.nationalAddressSegment.importFromElm = checkboxState;
    if (checkboxState == "true") {
      this.importFromElm("nationalAddress");
    }
  }
  handleofficialDocumentCheckboxChange(fieldName, checkboxState) {
    this.section.body.details.officialDocumentSegment.importFromElm = checkboxState;
    if (checkboxState == "true") {
      // this.importFromElm("officialDocument");
    }
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




  familyProfileData(fieldName, data, familyProfile) {
    familyProfile[fieldName] = data;
    console.log(
      "this.section.body.details.familyProfileSegment.familyProfile",
      this.section.body.details.familyProfileSegment.familyProfile
    );
  }
  callElm(segment, familyProfile, ev) {
    if (ev == "true" && segment == "familyProfile") {
      this.importFromElm(segment, familyProfile);
    }
  }

  hidenational(fieldName, national) {
    if (
      this.haveDataFromElmnationalAddress &&
      this.section.body.details.nationalAddressSegment.importFromElm == "true"
    ) {
      return true;
    } else {
      return false;
    }
  }

  hidenationalAttch(fieldName, national) {
    if (
      this.haveDataFromElmnationalAddress &&
      this.section.body.details.nationalAddressSegment.importFromElm == "true"
    ) {
      return true;
    } else {
      return false;
    }
  }

  hidenationalSelectize(fieldName, national) {
    if (
      this.haveDataFromElmnationalAddress &&
      this.section.body.details.nationalAddressSegment.importFromElm == "true"
    ) {
      return true;
    } else {
      return false;
    }
  }
  getSegmentDetails(segment, checked) {
    let segmentData = {
      segment: segment,
    };

    if (segment == "personalProfile" || segment == "organizationalProfile") {
      this.FlipCheckBox(segment, checked);
      return;
    }

    // Show hide Panels

    if (checked) {
      this.isReady = false;
      this.stateMachine.dispatch("getSegmentDetails", segmentData).then(
        (form) => {
          this.isReady = true;
          console.log("response", form);
          if (form.error) {
            window.scroll(0, 0);
            if (!this.form) {
              this.form = new Form(
                Constants.NO_VALUE,
                Constants.NO_VALUE,
                Constants.NO_VALUE,
                Constants.NO_VALUE,
                Constants.NO_VALUE,
                Constants.NO_VALUE,
                form
              );
            } else {
              this.form.messages = form;
              this.form = loadFormHooks.afterTranspilePayload(this.form);
            }
          } else {
            console.log("this.section.body.details", this.section.body.details);
            if (segment == this.section.body.details.familyProfileSegment.name) {
              this.section.body.details.familyProfileSegment.name = "familyProfile";
              form.request.details.familyProfileSegment.name = "familyProfile";
              segment = "familyProfile";
            }
            let mainSegment = segment + "Segment";
            this.section.body.details[mainSegment] = {
              ...this.section.body.details[mainSegment],
              ...form.request.details[mainSegment],
            };
            if (isArray(this.section.body.details[mainSegment][segment])) {
              this.section.body.details[mainSegment][segment].forEach(element => {
                element['action'] = 'UPDATE'
              });
            }
          }
        },
        (err) => { }
      );
      if (segment == this.section.body.details.familyProfileSegment.name) {
        this.section.body.details.familyProfileSegment.name = "familyProfile";
        segment = "familyProfile";
      }
      if (this.section.body.details[segment + "Segment"][segment] === undefined) {
        if (segment != "personalProfile" && segment != "organizationalProfile"
          && segment != "medicalDetails" && segment != "officeLocation") {
          this.section.body.details[segment + "Segment"][segment] = [];
        }
      }
    }
    else {
      delete this.section.body.details[segment + "Segment"][segment];
      this.section.body.details[segment + "Segment"].isUpdated = "false";
    }
  }

  FlipCheckBox(segment, checked) {
    if (segment == "personalProfile") {
      this.personalProfileVisibility = !this.personalProfileVisibility;
    }
    else if (segment == "organizationalProfile") {
      this.organizationalProfileVisibility = !this.organizationalProfileVisibility;
    }

  }

  loaderArabic() {
    return {
      loaderArabic:
        this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR &&
        !this.stateMachine.isMobileApp(),
    };
  }
  importFromElm(segment, familyProfile?) {
    let idNumberData = "";
    let birthDate = "";
    if (segment == "familyProfile") {
      if (familyProfile.dateOfBirthHijri) {
        birthDate = familyProfile.dateOfBirthHijri;
      } else {
        birthDate = familyProfile.birthDate;
      }
    }

    if (familyProfile && (familyProfile.idNumber || familyProfile.birthDate)) {
      idNumberData = familyProfile.idNumber;
      birthDate = birthDate;
    }
    let segmentData = {
      segment: segment,
      idNumber: idNumberData,
      dateOfBirth: birthDate,
    };

    this.stateMachine.dispatch("importFromElm", segmentData).then(
      (form) => {
        console.log("response", form);
        if (form.error) {
          window.scroll(0, 0);
          if (!this.form) {
            this.form = new Form(
              Constants.NO_VALUE,
              Constants.NO_VALUE,
              Constants.NO_VALUE,
              Constants.NO_VALUE,
              Constants.NO_VALUE,
              Constants.NO_VALUE,
              form
            );
          } else {
            this.form.messages = form;
            this.form = loadFormHooks.afterTranspilePayload(this.form);
          }
        } else {
          console.log("importFromElm", form);
          if (segment == "familyProfile") {
            if (
              form.data.request.details &&
              form.data.request.details.familyProfileSegment &&
              form.data.request.details.familyProfileSegment.familyProfile &&
              form.data.request.details.familyProfileSegment.familyProfile
                .length > 0
            ) {
              this.haveDataFromElmfamilyProfile = true;
              this.populatefamilyProfile(
                form.data.request.details.familyProfileSegment,
                familyProfile
              );
            } else {
              this.haveDataFromElmfamilyProfile = false;
            }

            // this.section.body.details.familyProfileSegment =response.data.request.details.familyProfileSegment;
          }
          if (segment == "nationalAddress") {
            this.section.body.details.nationalAddressSegment =
              form.data.request.details.nationalAddressSegment;

            this.nationalAddressElmData =
              form.data.request.details.nationalAddressSegment;
            if (
              form.data.request.details &&
              form.data.request.details.nationalAddressSegment &&
              form.data.request.details.nationalAddressSegment
                .nationalAddress &&
              form.data.request.details.nationalAddressSegment.nationalAddress
                .length > 0
            ) {
              this.haveDataFromElmnationalAddress = true;
              this.profileRequestorService.haveDataFromElmnationalAddress = true;
            } else {
              this.haveDataFromElmnationalAddress = false;
              this.profileRequestorService.haveDataFromElmnationalAddress = false;
            }
          }
          if (segment == "officialDocument") {
            this.section.body.details.officialDocumentSegment =
              form.data.request.details.officialDocumentSegment;
          }
        }
      },
      (err) => { }
    );
  }

  formComponent() {
    return {
      "ar-float-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
      "form-group": !this.isReadOnly,
      "col-xs-12": true,
      "col-md-6 ": true,
    };
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


  populatefamilyProfile(familyProfileSegment, familyProfile) {
    this.section.body.details.familyProfileSegment.isUpdated =
      familyProfileSegment.isUpdated;
    familyProfile.age = familyProfileSegment.familyProfile[0].age;
    familyProfile.firstNameEn =
      familyProfileSegment.familyProfile[0].firstNameEn;
    familyProfile.firstNameAr =
      familyProfileSegment.familyProfile[0].firstNameAr;
    familyProfile.fatherNameEn =
      familyProfileSegment.familyProfile[0].fatherNameEn;
    familyProfile.fatherNameAr =
      familyProfileSegment.familyProfile[0].fatherNameAr;
    familyProfile.grandFatherNameEn =
      familyProfileSegment.familyProfile[0].grandFatherNameEn;
    familyProfile.grandFatherNameAr =
      familyProfileSegment.familyProfile[0].grandFatherNameAr;
    familyProfile.familyNameEn =
      familyProfileSegment.familyProfile[0].familyNameEn;
    familyProfile.familyNameAr =
      familyProfileSegment.familyProfile[0].familyNameAr;
    familyProfile.birthDate = familyProfileSegment.familyProfile[0].birthDate;

    // this.ageFromDateOfBirthday(familyProfile ,familyProfileSegment.familyProfile[0].birthDatefamilyProfile)
    familyProfile.nationality =
      familyProfileSegment.familyProfile[0].nationality;
    familyProfile.gender = familyProfileSegment.familyProfile[0].gender;
    familyProfile.idNumber = familyProfileSegment.familyProfile[0].idNumber;
    familyProfile.borderBirthNumber =
      familyProfileSegment.familyProfile[0].borderBirthNumber;
    familyProfile.borderBirthNumber =
      familyProfileSegment.familyProfile[0].borderBirthNumber;
  }

  checkIfImportFromElmFamilyProfile(familyProfile) {
    if (this.haveDataFromElmfamilyProfile && familyProfile.importFromElm) {
      return true;
    } else {
      return false;
    }
  }

}
