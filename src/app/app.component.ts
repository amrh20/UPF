import { Component, ViewChild, AfterViewChecked } from "@angular/core";
import { StateMachineService } from "../core/services/state-machine.service";
import { SegmentDynamicLoaderService } from "./services/segment-dynamic-loader.service";
import { Form, Section, SectionHeader, Messages } from "../core/models/form";
import * as Constants from "./constants/constants";
import { NgForm, AbstractControl } from "@angular/forms";
import { I18nService } from "../core/services/i18n.service";
import { ResetPropagationService } from "../core/services/reset-propagation.service";
import * as Handlebars from "handlebars";
import printTemplate from "../app/templates/print";
import printTemplateRtl from "../app/templates/print_rtl";
import * as moment from "moment";
import loadFormHooks from "./hooks/load-form";
import { ProfileRequestorService } from "./services/profile-requestor.service";
import { ClassGetter } from "@angular/compiler/src/output/output_ast";
import { isArray } from "util";

declare var $j: any;
@Component({
  selector: "app-wm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewChecked {
  @ViewChild("f") public formStateObject: NgForm;
  @ViewChild("template") public printFormTemplate;
  private printFormHTML;
  title = "app";
  requestSection: any;
  isReady = false;
  isValidLoad = false;
  isSuccessfullySubmitted = false;
  state = "closed";
  visibility = "void";
  hidden = "hidden";
  visible = "visible";
  showProfileFormContent: boolean;
  showCommentFormContent: boolean;
  form: Form;
  sections: Section[];
  sectionsController: { [key: string]: AbstractControl };
  numberOfComments = 0;
  startedListener = false;
  submitResponse: any;
  creationDate: string;
  isSubmitting = {
    hrSubmit: false,
  };
  profileData = {
    name,
  };
  SectionDetails: any;
  hrRequestIsSubmitted: boolean = false;
  isPrintResponse = false;
  noError = true;
  message: string;
  // hrRequestDetailsSection = new Section(
  //   'hrRequestDetails',
  //   new SectionHeader(
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     false
  //   ),
  //   {
  //     details: {
  //       isOnBehalfOf: {
  //         key: null,
  //         value: null
  //       },
  //       onBehalfOfEmail: {
  //         personName: null,
  //         personEmail: null
  //       }
  //     }
  //   }
  // );
  public feedBackIcon: string = null;
  showFlagOptions: boolean = false;

  constructor(
    public profileRequestorService: ProfileRequestorService,
    public stateMachineService: StateMachineService,
    private i18n: I18nService,
    public segmentDynamicLoader: SegmentDynamicLoaderService,
    public resetPropagator: ResetPropagationService
  ) {
    // Decode config

    this.showProfileFormContent = true;
    this.showCommentFormContent = true;
    this.submitResponse = null;
    this.stateMachineService
      .dispatch(Constants.STATE_MACHINE_ACTION_LOAD_FORM)
      .then((form: any) => {
        if (form instanceof Form) {
          console.log("forms", form);
          if (form.sections && form.sections.length > 0) {
            this.form = form;
            this.sections = form.sections;
            setTimeout(() => {
              this.profileRequestorService.setForm(form);
            }, 0);

            this.creationDate = moment(form.header.creationDate)
              .locale("en-US")
              .format("DD/MM/YYYY HH:mm:ss");
            /* istanbul ignore next  */
            if (form.commentsDrop) {
              this.numberOfComments = this.form.commentsDrop.length;
            }
            if (
              form.lovs &&
              form.lovs.decision &&
              form.lovs.decision.type === "buttons"
            ) {
              form.lovs.decision.options.forEach((option) => {
                this.isSubmitting[option.value] = false;
              });
            } else {
              this.isSubmitting["SUBMIT"] = false;
            }
            this.isValidLoad = true;
            if (form.header.status.key !== "NEW") {
              this.hrRequestIsSubmitted = true;
            }
          }
        } else if (form instanceof Messages) {
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
          }
        }
        this.isReady = true;
        this.noError = true;
        this.profileRequestorService.getSectionDetails().subscribe((data) => {
          this.SectionDetails = data;
          const [sect] = this.form.sections;
          this.requestSection = sect;
        });
      });

    setTimeout(() => {
      if (this.isReady == false) {
        this.isReady = true;
        this.noError = false;
        if (this.stateMachineService["successed"] == "false") {
          this.message = this.i18n.translate("pageErrorLoading");
        }
        if (this.stateMachineService["successed"] == undefined) {
          this.message = this.i18n.translate("pageTimeOut");
        }
      }
    }, 20000);
  }

  messageBoxClasses() {
    return {
      alert: true,
      "alert-danger": true,
    };
  }




  validatePayload(section) {
    var arrSubSegments = this.GetListofSegments(section);
    let isUpdated: Boolean = false;


    for (var segmentID = 0; segmentID < arrSubSegments.length; segmentID++) {
     

      let subSegment = arrSubSegments[segmentID];
      let Segment = subSegment + "Segment";

      if (section[Segment] && section[Segment][subSegment]) {

        if (section[Segment]["isUpdated"] == "true"  ) {
           

          if (isArray(section[Segment][subSegment])  && section[Segment][subSegment].length > 0) {
         
            isUpdated = true;

            for (let rowID = 0; rowID < section[Segment][subSegment].length; rowID++) {
             
              let Row = section[Segment][subSegment][rowID];

              if (Row.action  !== "DELETE"  &&  Row.id  !== "-1")
              {
                let arrKeys = Object.keys(Row);

                for (let keyID = 0; keyID < arrKeys.length; keyID++) {
  
                  let key = arrKeys[keyID];
                   
                  if (!this.isExcluded(section, subSegment, key  ,rowID)) {
                    if (Row[key] == null || Row[key] == "") {
  
                      return false;
                    }
                    else if (Row[key] != null && Row[key]["key"] !== undefined &&  ( Row[key]["key"] === null || Row[key]["key"] === "" )) {
  
                      return false;
                    }
                    else if (Row[key] != null && Row[key]["fileName"] !== undefined && (Row[key]["fileName"] === null  ||  Row[key]["fileName"] === "") ) {
  
                      return false;
                    }
  
                  }
                }
  
               
              }
          

            }

          } else if (!isArray(section[Segment][subSegment]) ) 
          {
            isUpdated = true;

            let Row = section[Segment][subSegment]
            let arrKeys = Object.keys(Row);

            for (var keyID = 0; keyID < arrKeys.length; keyID++) {
              let key = arrKeys[keyID];

             

              if (!this.isExcluded(section, subSegment, key  , -1)) {

                if (Row[key] == null || Row[key] == "") {
              
                  return false;
                }
                else if (Row[key] != null && Row[key]["key"] !== undefined && (Row[key]["key"] === null || Row[key]["key"] === "") ) {

               
                  return false;
                }
                else if (Row[key] != null && Row[key]["fileName"] !== undefined && (Row[key]["fileName"] === null  ||  Row[key]["fileName"] === "") ) {
              
                  return false;
                }

              }
            }
          }
        }

      }

    }


    if (!isUpdated) {

      return false;
    }

    return this.ValidateSpecialCases(section);
  }

  ValidateSpecialCases(section) {
    var arrSegments = this.GetListofSegments(section);

    for (var segmentID = 0; segmentID < arrSegments.length; segmentID++) {


      let Segment = arrSegments[segmentID];
      if (Segment == section.medicalDetailsSegment.name && section.medicalDetailsSegment.isUpdated == "true") {
        if (section.medicalDetailsSegment.medicalDetails.disabilityFlag.key == 'Y'
          &&  (section.medicalDetailsSegment.medicalDetails.medicalReport.fileName  === undefined ||
           section.medicalDetailsSegment.medicalDetails.medicalReport.fileName == null)) {
           
          return false;
        }
      }

    }
   
    return true;


  }

  checkSegmentRowIsDuplicated(section)
  {
    
    let primary:boolean  = false  ;

    if (section.contactInformationSegment && section.contactInformationSegment.isUpdated == "true")
      {
        for (var rowIndex = 0; rowIndex < section.contactInformationSegment.contactInformation.length; rowIndex++) {
            let Row = section.contactInformationSegment.contactInformation[rowIndex];
          for (var rowIndex1 = rowIndex +1; rowIndex1 < section.contactInformationSegment.contactInformation.length; rowIndex1++) {
              let Row1 = section.contactInformationSegment.contactInformation[rowIndex1];
              if (Row1.action  != "DELETE") 
                {
                  if (Row.type.key  === Row1.type.key  &&  Row.countryCode.key  === Row1.countryCode.key  
                    && Row.areaCode.key  === Row1.areaCode.key  && Row.phone  === Row1.phone
                    )  
                    {
                       return  false  ;
                    }
    
                    if ( Row.primary === 'Y' ) 
                    {
                        primary = true  ;
                    }
    
                    // if (Row1.primary === 'Y'  &&  primary  == true ) 
                    // {
                    //   return  false  ;
                    // }
                }
             

              
               
                  
                 


       
          }     
       
        } 

        if (primary == false) 
        {
          return false  ;
        }

      }
    
     if (section.qualificationSegment && section.qualificationSegment.isUpdated == "true")
      {
        for (var rowIndex = 0; rowIndex < section.qualificationSegment.qualification.length; rowIndex++) {
            let Row = section.qualificationSegment.qualification[rowIndex];
            if (Row.id  != "-1") 
                {
                  for (var rowIndex1 = rowIndex +1; rowIndex1 < section.qualificationSegment.qualification.length; rowIndex1++) {
                      let Row1 = section.qualificationSegment.qualification[rowIndex1];
                      if (Row1.action  != "DELETE"  && Row1.id  != "-1") 
                        {
                          if (Row.educationLevel.key  === Row1.educationLevel.key  
                          &&  Row.universityInstitute.key  === Row1.universityInstitute.key  
                          &&  Row.country.key  === Row1.country.key 
                          &&  Row.city.key  === Row1.city.key
                          &&  Row.major.key  === Row1.major.key 
                          &&  moment(Row.startDate).diff(moment(Row1.startDate), 'days') ==  0
                          &&  moment(Row.graduatedDate).diff(moment(Row1.graduatedDate), 'days') ==  0
                         )  
                            {
                              return  false  ;
                            }
                              
                        }
            
                  }   
                }  
       
        } 
        

      }

    
      if (section.previousExperienceSegment && section.previousExperienceSegment.isUpdated == "true")
      {
      
        for (var rowIndex = 0; rowIndex < section.previousExperienceSegment.previousExperience.length; rowIndex++) {
            let Row = section.previousExperienceSegment.previousExperience[rowIndex];
           
                  for (var rowIndex1 = rowIndex +1; rowIndex1 < section.previousExperienceSegment.previousExperience.length; rowIndex1++) {
                      let Row1 = section.previousExperienceSegment.previousExperience[rowIndex1];
                      if (Row1.action  != "DELETE"  ) 
                        {
                        if (Row.jobTitle  === Row1.jobTitle
                          &&  Row.country.key  === Row1.country.key 
                          &&  Row.city  === Row1.city
                          &&  Row.companyName  === Row1.companyName
                          &&  Row.jobField.key  === Row1.jobField.key 
                          &&  Row.companySector.key  === Row1.companySector.key
                          &&  moment(Row.startDate).diff(moment(Row1.startDate), 'days') ==  0
                          &&  moment(Row.endDate).diff(moment(Row1.endDate), 'days') ==  0
                         
                         
                          )  
                            {
                              return  false  ;
                            }
                              
                        }
            
                  }   
                
       
        } 
        

      }

      if (section.professionalCertificateSegment && section.professionalCertificateSegment.isUpdated == "true")
      {
      
        for (var rowIndex = 0; rowIndex < section.professionalCertificateSegment.professionalCertificate.length; rowIndex++) {
            let Row = section.professionalCertificateSegment.professionalCertificate[rowIndex];
           
                  for (var rowIndex1 = rowIndex +1; rowIndex1 < section.professionalCertificateSegment.professionalCertificate.length; rowIndex1++) {
                      let Row1 = section.professionalCertificateSegment.professionalCertificate[rowIndex1];
                      if (Row1.action  != "DELETE"  ) 
                        {
                          
                          if (Row.certificateNo  === Row1.certificateNo
                          &&  Row.certificateOrganization.key  === Row1.certificateOrganization.key 
                          &&  Row.certificateName.key  === Row1.certificateName.key
                          &&  moment(Row.certificateDate).diff(moment(Row1.certificateDate), 'days') ==  0
                          &&  moment(Row.expiryDate).diff(moment(Row1.expiryDate), 'days') ==  0
                             )  
                            {
                              return  false  ;
                            }
                              
                        }
            
                  }   
                
       
        } 
        

      }

    


    

    return true  ;

  }

  GetListofSegments(section) {


    let arrSegments = [];

    Object.keys(section).forEach(Segment => {
      if (section[Segment] != null && section[Segment]["name"] !== undefined) {
        arrSegments.push(section[Segment]["name"]);

      }
    });

    return arrSegments;

  }

  
  isExcluded(section, Segment, field , index) {

    if (Segment === section.previousExperienceSegment.name) {
      if (field === "id"  || field  == "companyId"   || field == "note"  || field   == "responsibilities") {

        return true;
      }

    }
    else if (Segment === section.qualificationSegment.name) {
      if (field === "id" || field === "note" || field === "action" || field  == "subMajor"  || field  == "startDate"
       || field  == "country"  || field  == "city" ) {

        return true;
      }
      else if (field === "gpa"  &&  section.qualificationSegment.qualification[index]["scale"].key  === "STC_QUALIFICATION_GPA_TYPE_PAS")
      {
          return true;
      }
      else  if (field  == "evaluationNo"  || field  == "evaluationDate" || field  == "evaluationCertificate" ) 
      {
         if ((section.qualificationSegment.qualification[index]["country"].key !=="SA" && 
              section.personalProfile.nationality.key === '001' ) == false )
         {
          return true;

         }
      }
      else  if (field  == "major"   ) 
      {
            if (section.qualificationSegment.qualification[index]["educationLevel"].key =="5" || 
            section.qualificationSegment.qualification[index]["educationLevel"].key =="8" ||
            section.qualificationSegment.qualification[index]["educationLevel"].key =="9" )
          
              {
              return true;

              }
      }

      
    }
    else if (Segment === section.originalAddressSegment.name) {

      if (field === "id"  || field ===  "city"  || field ===  "districtName"   || field === "streetName"
      || field === "postalCode"  || field === "buildingNumber"  || field === "unitNumber"  || field === "additionalNumber") {

        return true;
      }
      
    }
    else if (Segment === section.contactInformationSegment.name) {

      if (field === "id" || field === "action") {

        return true;
      }

      else if (field == "areaCode"  &&  (section.contactInformationSegment.contactInformation[index].type.key == 'ER'  
                              || section.contactInformationSegment.contactInformation[index].type.key == 'M'))
      {
        return true;

      }
      
    }
    else if (Segment === section.professionalCertificateSegment.name) {

      if (field === "id" || field === "action"  ||  field === "expiryDate"  ) {

        return true;
      }
      
    }
    else if (Segment === section.parentProfileSegment.name) {

    
      if (field === "id" || field === "action"  ||  field === "empPersonId" 
       || field === "personId" || field === "note"  
       || field === "fatherNameEn"  
       || field === "fatherNameAr"  
       || field === "grandFatherNameEn"  
       || field === "grandFatherNameAr"   ) {

        return true;
      }
      else if (field === "chronicDiseaseType"  &&   section.parentProfileSegment.parentProfile[index].chronicDisease.key  == "N" )
      {
          return true;
      }
      else if (field === "disabilityType"  &&   section.parentProfileSegment.parentProfile[index].disabilityFlag.key  == "N" )
      {
          return true;
      }
      else if (field == "familyCard"  &&    section.parentProfileSegment.parentProfile[index].nationality.key !== '001')
         {
          return true;
         }

      
      
    }
    else if (Segment === section.medicalDetailsSegment.name) {
         
      if (field === "id" || field === "action"  || field ===  "disabilityCard"  ||  field ===  "smoker"
      || field === "weight" || field === "height" || field === "personId"  || field === "disabilityId"  ) {
       
        return true;
      }
      else if (field === "chronicDiseaseType"  &&   section.medicalDetailsSegment.medicalDetails.chronicDisease.key  === "N" )
      {
       
          return true;
      }
    
      else if (field === "disabilityType"  &&   section.medicalDetailsSegment.medicalDetails.disabilityFlag.key  === "N" )
      {
      
          return true;
      }
      else if (field === "medicalReport"  &&   section.medicalDetailsSegment.medicalDetails.disabilityFlag.key  === "N" )
      {
       
          return true;
      }
     



      
      
    }
    else if (Segment === section.officeLocationSegment.name) 
    {
      if (field === "id" || field === "action"  ||  field === "officeNo"  ||  field === "note" ) 
        {
          return true;
        }
      
      


    }
    else if (Segment === section.nationalAddressSegment.name) 
    {
      if (field === "id" || field === "action"  || field === "counter" ) 
        {
          return true;
        }
    
    }
    else if (Segment === section.familyProfileSegment.name) 
    {
      if (field === "id" || field === "action"  ) 
        {
          return true;
        }
      else if (field  === "newToSaudi" &&  section.familyProfileSegment.familyProfile[index].nationality.key === '001')
      {

        return true;
      }
      else if (field === "chronicDiseaseType"  &&   section.familyProfileSegment.familyProfile[index].chronicDisease.key  === "N" )
      {
       
          return true;
      }
    
      else if (field === "disabilityType"  &&   section.familyProfileSegment.familyProfile[index].disabilityFlag.key  === "N" )
      {
      
          return true;
      }
      else if ((field === "passportOrBirthAttachment"  || field === "borderBirthNumber" ) &&   (section.familyProfileSegment.familyProfile[index].newToSaudi  === "false" || section.familyProfileSegment.familyProfile[index].newToSaudi  === ""))
      {
      
          return true;
      }
      else if (field === "supportDoc"  &&   section.familyProfileSegment.familyProfile[index].justification.key !== 'DE' && section.familyProfileSegment.familyProfile[index].justification.key !== 'DV' )
      {
         return true;
      }
      else if (field === "coverageNote"  &&   (section.familyProfileSegment.familyProfile[index].justification.key ===  null || section.familyProfileSegment.familyProfile[index].action !== 'ADD') )
      {
         return true;
      }
      
      
      
    }


    



    


    


    

    



      return false;

   


  }



  messageClose(event) {
    // this.message=null;
    // this.noError=true
  }

  /* istanbul ignore next  */
  ngAfterViewChecked() {
    if (this.formStateObject && this.form && !this.startedListener) {
      this.formStateObject.valueChanges.subscribe(
        /* istanbul ignore next  */
        (form) => {
          Object.keys(form).forEach((key) => {
            if (
              this.sections[this.sections.length - 1].body.details[key] !==
              form[key] &&
              form[key] !== undefined
            )
              this.sections[this.sections.length - 1].body.details[key] =
                form[key];
          });
        }
      );
      this.sectionsController = this.formStateObject.controls;
      this.startedListener = true;
    }
  }
  private sectionIdHelper(context, id) {
    return context.segmentDynamicLoader.getPrintPartialName(id);
  }

  print() {
    let compiledTemplate = null;
    let popupWin;
    popupWin = window.open(
      "",
      "_blank",
      "top=0,left=0,height=auto,width=auto",
      false
    );
    let printObject = {
      form: this.form,
      i18n: this.i18n,
      segmentDynamicLoader: this.segmentDynamicLoader,
      lovs: this.form.lovs,
      formId: this.form.header.formId,
    };
    Handlebars.registerHelper("i18nTranslate", this.translateHelper);
    Handlebars.registerHelper("dateFormat", this.dateFormatHelper);
    Handlebars.registerHelper("dateFormatHelper3", this.dateFormatHelper3);
    Handlebars.registerHelper("dateFormat2", this.dateFormatHelper2);
    Handlebars.registerHelper("getPartialName", this.sectionIdHelper);
    Handlebars.registerHelper("lovResolver", this.lovResolverHelper);
    Handlebars.registerHelper("paragraphSplit", this.paragraphSplit);
    Handlebars.registerHelper("getSectionTitle", this.sectionTitleHelper);
    Handlebars.registerHelper("consolelog", this.consolelog);
    Handlebars.registerHelper("getCurrentLang", this.getCurrentLang.bind(this));
    Handlebars.registerHelper("eq", this.eq);
    Handlebars.registerHelper("getFormId", this.getFormId.bind(this));
    Handlebars.registerHelper("and", this.and);
    Handlebars.registerHelper("or", this.or);
    Handlebars.registerHelper("not", this.not);
    // Handlebars.registerHelper('performanceRatings', this.performanceRatingsHelper);
    Handlebars.registerHelper("log", function (text) {
      console.log(text);
    });
    Handlebars.registerPartial("requestDetails", printTemplate.requestDetails);
    // Handlebars.registerPartial('sectionApprover', printTemplate.sectionApprover);
    if (this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR) {
      compiledTemplate = Handlebars.compile(printTemplateRtl.printTemplate);
    } else {
      compiledTemplate = Handlebars.compile(printTemplate.printTemplate);
    }
    popupWin.document.open();
    popupWin.document.write(compiledTemplate(printObject));
    popupWin.document.close();
  }

  // private getSecrionData(this) {
  //   console.log('*************getSecrionData****************', this);
  //   let userEmail = (this.header.personToThumbnail.split('=')[1])
  //   this.stateMachineService.dispatch(Constants.STATE_MACHINE_ACTION_EMPLOYEE_PROFILE, userEmail).then((response) => {
  //     if (response) {
  //       this.profileData['name'] = response;
  //     }
  //   })
  // }

  public getCurrentLang() {
    return this.i18n.getLanguage();
  }

  private translateHelper = (key) => {
    return this.i18n.translate(key);
  };

  private consolelog(type) {
    console.log("------------", type, "-----------------", this);
  }

  private getFormId() {
    return this.form.header.formId;
  }

  private dateFormatHelper(key) {
    return moment(key).format(Constants.DATE_TIME);
  }

  private dateFormatHelper2(key) {
    return moment(key).format(Constants.DATE_DASH);
  }

  private dateFormatHelper3(key) {
    if (key != null && key !== undefined )
    {
      return moment(key).format(Constants.DATE_SLASH);
    }
  
  }

  private lovResolverHelper(key, lov) {
    let description = "NOT_FOUND_IN_LOV";
    if (lov && lov.options && key) {
      lov.options.forEach((element) => {
        if (element.value === key) {
          description = element.description;
        }
      });
    }
    return description;
  }

  private paragraphSplit(string) {
    return string.split("\n");
  }

  // private performanceRatingsHelper(key, yearBehind) {
  //   let performanceRatingsObj = {};
  //   key.forEach(({ year, rating }) => {
  //     performanceRatingsObj[year] = rating;
  //   })
  //   let currentYear = new Date().getFullYear();
  //   return performanceRatingsObj[currentYear - yearBehind]
  // }

  private sectionTitleHelper(componentId, segmentDynamicLoader) {
    return segmentDynamicLoader.getSectionName(componentId);
  }

  private eq(valueA, valueB) {
    let result = valueA === valueB;
    return result;
  }

  private and(valueA, valueB) {
    let result = valueA && valueB;
    return result;
  }

  private or(valueA, valueB) {
    let result = valueA || valueB;
    return result;
  }

  private not(valueA) {
    let result = !valueA;
    return result;
  }

  onProfileFormClick() {
    if ($j(Constants.PROFILE_CONTAINER).is(":visible")) {
      $j(Constants.PROFILE_CONTAINER).slideUp(300);
    } else {
      this.slideUpOpenedContainer();
      $j(Constants.PROFILE_CONTAINER).delay(300).slideDown(300);
    }
  }

  onCommentsFormClick() {
    if ($j(Constants.COMMENT_CONTAINER).is(":visible")) {
      $j(Constants.COMMENT_CONTAINER).slideUp(300);
    } else {
      this.slideUpOpenedContainer();
      $j(Constants.COMMENT_CONTAINER).delay(300).slideDown(300);
    }
  }

  onFeedbackFormClick() {
    if ($j(Constants.FEEDBACK_CONTAINER).is(":visible")) {
      $j(Constants.FEEDBACK_CONTAINER).slideUp(300);
    } else {
      this.slideUpOpenedContainer();
      $j(Constants.FEEDBACK_CONTAINER).delay(300).slideDown(300);
    }
  }

  slideUpOpenedContainer() {
    $j(".formInfoModals").slideUp(300);
  }

  isReadOnly(index: number) {
    return this.sections.length - index !== 1;
  }

  statusClass(status) {
    if (
      status === Constants.FORM_STATUS_REJECTED ||
      status === Constants.FORM_STATUS_CANCELLED
    ) {
      return {
        status: true,
        danger:
          status === Constants.FORM_STATUS_REJECTED ||
          status === Constants.FORM_STATUS_CANCELLED,
      };
    } else if (
      status === Constants.FORM_STATUS_COMPLETED ||
      status === Constants.FORM_STATUS_APPROVED
    ) {
      return {
        status: true,
        success:
          status === Constants.FORM_STATUS_COMPLETED ||
          Constants.FORM_STATUS_APPROVED,
      };
    } else if (status === Constants.FORM_STATUS_PENDING) {
      return {
        status: true,
        warning: status === Constants.FORM_STATUS_PENDING,
      };
    }
  }

  // tryParseJSON(value) {
  //   try {
  //     let o = JSON.parse(value);
  //     if (o && typeof o === "object") {
  //       return o;
  //     }
  //   } catch (e) { }
  //   return value;
  // }

  onSubmit(action) {
    let sectionSize = this.sections.length - 1;
    let sectionDecision = this.sections[sectionSize].body.details.decision;
    // let detailsKeys = Object.keys(this.sections[sectionSize].body.details)
   

    if (this.sections[sectionSize].body.details.familyProfileSegment != undefined) 
    {
      this.sections[sectionSize].body.details.familyProfileSegment.name = "familySegment"  ;
    }
    
    
    if (sectionDecision && action === "SUBMIT") {
      sectionDecision = { key: action };

      
    }


    debugger  ;
    if (sectionDecision && action !== "SUBMIT") {
      sectionDecision = { key: action };
      // SAVE_CHANGES
    }
    this.sections[sectionSize].body.details.decision = sectionDecision;
    // detailsKeys.forEach((key) => {
    //   let value = this.sections[sectionSize].body.details[key];
    //   this.sections[sectionSize].body.details[key] = this.tryParseJSON(value)
    //   // if (value !== null && value instanceof Date) {
    //   //   this.sections[sectionSize].body.details[key] = moment(value).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    //   // }
    // })

    // if (this.sections[sectionSize].id == "requestDetails") {
    // }
    console.log("this.sections", this.sections);
    this.isSubmitting[action] = true;
    this.stateMachineService
      .dispatch(
        Constants.STATE_MACHINE_ACTION_SUBMIT_FORM,
        this.sections[sectionSize],
        action
      )
      .then((form) => {
        if (form.error) {
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
          window.scrollTo(0, 0);
        } else {
          this.submitResponse = form;
          this.isSuccessfullySubmitted = true;
          this.submitResponse.creationDate = moment(
            this.submitResponse.creationDate
          )
            .locale("en-US")
            .format("DD/MM/YYYY HH:mm:ss");
          // this.submitResponse.creationDate = moment(this.submitResponse.creationDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
          if (this.stateMachineService.isOpenOnInbox()) {
            (window as any).verifySuccessOrFailureBPM();
          }
          window.scrollTo(0, 0);
        }
        this.isSubmitting[action] = false;
        console.log(this.submitResponse);
      });
  }

  // gregorianDay(date) {
  //   let m = moment(date);
  //   let rtn = m.format('D');
  //   if (m.toString() === m.startOf('month').toString()) {
  //     rtn = m.format('D MMM');
  //   }

  //   return rtn;
  // }




  validForm(action) {


    let returnValue = true;
    let lastSection = this.form.sections[this.form.sections.length - 1].body.details;

    let lastSectionId = this.form.sections[this.form.sections.length - 1].id;
    let formIsValid = this.formStateObject ? this.formStateObject.valid : true;
    let commentValid;
    if (lastSection.comment && lastSection.comment.length > 0) {
      if (
        lastSection.comment.length >= 15 &&
        lastSection.comment.length <= 500
      ) {
        commentValid = true;
      } else {
        commentValid = false;
      }
    } else {
      commentValid = true;
    }
    switch (action) {
      case "SUBMIT":

        if (this.validatePayload(lastSection) && lastSection.iAccept == "true"  && this.checkSegmentRowIsDuplicated(lastSection)) {
          returnValue = true;
        } else {
          returnValue = false;
        }


        break;
      case "APPROVE":
        if (formIsValid && commentValid) {
          returnValue = true;
        } else {
          returnValue = false;
        }
        break;
      case "REJECT":
        if (lastSection.comment && commentValid) {
          returnValue = true;
        } else {
          returnValue = false;
        }
        break;
      case "SENDBACK":
        if (lastSection.comment && commentValid) {
          returnValue = true;
        } else {
          returnValue = false;
        }
        break;
      case "SAVE_CHANGES":
        returnValue = true;
        break;
      case "CANCEL":
        if (lastSection.comment && commentValid) {
          returnValue = true;
        } else {
          returnValue = false;
        }
        break;
    }
    return returnValue;
  }

  resetForm() {
    console.log(this.formStateObject.value);
    this.formStateObject.reset();
    this.resetPropagator.propagate();
    console.log(this.formStateObject.value);
  }

  // validHrForm() {
  //   if (this.hrRequestDetailsSection.body.details.onBehalfFlag == 'true'
  //     && this.hrRequestDetailsSection.body.details.onBehalfOfEmail) {
  //     return true
  //   } else if (this.hrRequestDetailsSection.body.details.onBehalfFlag == 'false') {
  //     return true
  //   } else if (this.hrRequestDetailsSection.body.details.onBehalfFlag == 'true'
  //     && !this.hrRequestDetailsSection.body.details.onBehalfOfEmail) {
  //     return false
  //   }
  // }

  // resetFormHr() {
  //   this.resetPropagator.propagate();
  //   let lastSection = this.hrRequestDetailsSection.body.details;
  //   lastSection.isOnBehalfOf.key = null;
  //   lastSection.isOnBehalfOf.value = null;
  //   lastSection.onBehalfOfEmail.personName = null;
  //   lastSection.onBehalfOfEmail.personEmail = null;
  // }

  // onHrSubmit() {
  //   this.isSubmitting.hrSubmit = true;
  //       if (this.hrRequestDetailsSection.body.details.onBehalfFlag == 'true') {
  //     this.stateMachineService.dispatch(Constants.STATE_MACHINE_ACTION_LOAD_FORM, this.hrRequestDetailsSection.body.details).then((form: any) => {
  //       if (form instanceof Form) {
  //         if (form.sections && form.sections.length > 0) {
  //           this.form = form;
  //           this.sections = form.sections;
  //           this.creationDate = moment(form.header.creationDate).format("DD/MM/YYYY HH:mm:ss");
  //           /* istanbul ignore next  */
  //           if (form.commentsDrop) {
  //             this.numberOfComments = this.form.commentsDrop.length;
  //           }
  //           if (form.lovs && form.lovs.decision && form.lovs.decision.type === 'buttons') {
  //             form.lovs.decision.options.forEach((option) => {
  //               this.isSubmitting[option.value] = false;
  //             })
  //           }
  //           else {
  //             this.isSubmitting['SUBMIT'] = false;
  //           }
  //           this.isValidLoad = true;
  //         }
  //       } else if (form instanceof Messages) {
  //         if (!this.form) {
  //           this.form = new Form(
  //             Constants.NO_VALUE,
  //             Constants.NO_VALUE,
  //             Constants.NO_VALUE,
  //             Constants.NO_VALUE,
  //             Constants.NO_VALUE,
  //             Constants.NO_VALUE,
  //             form
  //           );
  //         } else {
  //           this.form.messages = form;
  //         }
  //       }
  //       this.isReady = true;
  //       this.hrRequestIsSubmitted = true;
  //     });
  //   }
  //   else {
  //     this.hrRequestIsSubmitted = true;
  //   }
  // }

  buttonTypes(key) {
    return {
      "btn-primary": true,
    };
  }

  nameOnly(status) {
    return {
      nameOnly: status === Constants.FORM_STATUS_NEW,
    };
  }

  loaderArabic() {
    return {
      loaderArabic:
        this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR &&
        !this.stateMachineService.isMobileApp(),
    };
  }

  rtlDir() {
    return {
      "ar-dir-rtl": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    };
  }

  rtlFloatRight() {
    return {
      "ar-float-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    };
  }

  rtlFloatLeft() {
    return {
      "ar-float-left": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    };
  }

  rtlAlignRight() {
    return {
      "ar-align-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    };
  }

  containerClass() {
    return {
      "ar-dir-rtl": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
      "mobile-app-container": this.stateMachineService.isMobileApp(),
    };
  }

  isOnBehalfOfAuthorized() {
    return this.form.profileInfoDrop.onBehalfAuthorized;
  }

  // public b64DecodeUnicode(str: string): string {
  //   if (window
  //     && 'atob' in window
  //     && 'decodeURIComponent' in window) {
  //     return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
  //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //     }).join(''));
  //   } else {
  //     console.warn('b64DecodeUnicode requirements: window.atob and window.decodeURIComponent functions');
  //     return null;
  //   }
  // }

  flagOptionsHandler() {
    this.showFlagOptions = true;
  }

  setFlagPriority(id: string) {
    this.form.inboxItem.flagPriority = id;
    this.showFlagOptions = false;
    this.stateMachineService
      .dispatch(Constants.STATE_MACHINE_ACTION_SET_FLAG, id)
      .then((Response) => { });
  }

  changeFeedbackStatus(event) {
    const self = this;
    setTimeout(function () {
      self.feedBackIcon = event;
    }, 100);
  }

  showPrintIcon() {
    let rtn = true;
    if (
      this.stateMachineService.isOpenOnInbox() ||
      this.stateMachineService.showPrint()
    ) {
      rtn = true;
    } else if (this.stateMachineService.isMobileApp()) {
      rtn = false;
    }
    return rtn;
  }

  // isPrintAble() {
  //   return this.requestSection.body.canPrint === 'true' ? true : false;
  // }
}
