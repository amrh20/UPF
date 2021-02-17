import { ParentProfileSectionComponent, ParentProfilePopupDetailsComponent } from './page-components/parent-profile-section/parent-profile-section.component';
import { FamilyProfilePopupDetailsComponent, FamilyProfileSectionComponent } from './page-components/family-profile-section/family-profile-section.component';
import { OfficialDocumentPopupDetailsComponent, OfficialDocumentSectionComponent } from './page-components/official-document-section/official-document-section.component';
import { NationalAddressPopupDetailsComponent, NationalAddressSectionComponent } from './page-components/national-address-section/national-address-section.component';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { I18nService } from '../core/services/i18n.service';
import { ResetPropagationService } from '../core/services/reset-propagation.service';
import { AppComponent } from './app.component';
import { FormSectionComponent } from '../core/page-components/form-section/form-section.component';
import { SegmentDynamicLoaderService } from './services/segment-dynamic-loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateMachineService } from '../core/services/state-machine.service';
import { HttpClientModule } from '@angular/common/http';
import { DynamicModule } from 'ng-dynamic-component';
import { SelectModule } from "ng-select";
import { NumberDirective } from '../core/validators/number.directive';
import { NumberDecimalDirective } from '../core/validators/numberDecimal.directive';
import { weightDirective } from '../core/validators/weight.directive';
import { MaximumInputSizeDirective } from '../core/validators/maximum-input-size.directive';
import { DateValueAccessorModule } from "angular-date-value-accessor";
import { ProfileSectionComponent } from "../core/page-components/profile-section/profile-section.component";
import { CommentSectionComponent } from "../core/page-components/comment-section/comment-section.component";
import { HrRequestDetailsSectionComponent } from "../core/page-components/hr-request-details-section/hr-request-details-section.component";
import { TextAreaComponent } from "../core/input-components/textarea/textarea.component";
import { TextAreaTableComponent } from "../core/input-components/textareatable/textareatable.component";

import { SelectOptionComponent } from "../core/input-components/select/select.component";
import { RadioComponent } from "../core/input-components/radio/radio.component";
import { InputComponent } from "../core/input-components/input/input.component";
import { InputTableComponent } from "../core/input-components/InputTable/inputtable.component";

import { InfoComponent } from "../core/input-components/info/info.component";
import { DatepickerbirthComponent } from "../core/input-components/datepicker-birth/datepicker.component";
import { DatepickerComponent } from "../core/input-components/datepicker/datepicker.component";
import { CheckBoxComponent } from "../core/input-components/checkbox/checkbox.component";
import { AttachmentComponent } from "../core/input-components/attachment/attachment.component";
import { MessageBoxComponent } from '../core/input-components/message-box/message-box.component';
import { SearchEmployeeComponent } from "../core/input-components/search-employee/search-employee.component";
import { TooltipComponent } from '../core/input-components/tooltip/tooltip.component';
import { BaseComponent } from '../core/input-components/base-component/base-component.component';
import { ReportSectionComponent } from '../core/page-components/report-section/report-section.component';
import { ProfileRequestorService } from './services/profile-requestor.service';
import { FeedbackSectionComponent } from '../core/page-components/feedback-section/feedback-section.component';
import { AttachmentListComponent } from '../core/input-components/attachment-list/attachment-list.component';
import { MycurrencyDirective } from '../core/validators/currency.directive';
import { MycurrencyPipe } from '../core/validators/currency.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListenerService } from './services/listener.service';

import { RequestDetailsSectionComponent } from './page-components/request-details-section/request-details-section.component';

import { DataTableModule } from "../core/primeNg/datatable/datatable";
import { ArOnlyDirective } from '../core/validators/ar.directive';
import { EnOnlyDirective } from '../core/validators/en.directive';
import { DatePipe } from '@angular/common';
import { PopupDetailsComponent } from './page-components/popup-details/popup-details.component';
import { PersonalInfoSectionComponent } from './page-components/personal-info-section/personal-info-section.component';
import { OrganizationalProfileSectionComponent } from './page-components/organizational-profile-section/organizational-profile-section.component';
import { PreviousExperienceSectionComponent, PreviousExperiencePopupDetailsComponent } from './page-components/previous-experience-section/previous-experience-section.component';
import { QualificationSectionComponent, QualificationPopupDetailsComponent } from './page-components/qualification-section/qualification-section.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    FormSectionComponent,
    ProfileSectionComponent,
    CommentSectionComponent,
    InfoComponent,
    RadioComponent,
    SelectOptionComponent,
    DatepickerComponent,
    DatepickerbirthComponent,
    AttachmentComponent,
    CheckBoxComponent,
    TextAreaComponent,
    TextAreaTableComponent,
    InputComponent,
    InputTableComponent,
    NumberDirective,
    weightDirective,
    ArOnlyDirective,
    EnOnlyDirective,
    NumberDecimalDirective,
    MaximumInputSizeDirective,
    MessageBoxComponent,
    SearchEmployeeComponent,
    TooltipComponent,
    ReportSectionComponent,
    BaseComponent,
    FeedbackSectionComponent,
    AttachmentListComponent,
    MycurrencyDirective,
    MycurrencyPipe,

    HrRequestDetailsSectionComponent,
    RequestDetailsSectionComponent,
    PopupDetailsComponent,
    PersonalInfoSectionComponent,
    OrganizationalProfileSectionComponent,
    PreviousExperienceSectionComponent,
    QualificationSectionComponent,
    QualificationPopupDetailsComponent,
    PreviousExperiencePopupDetailsComponent,
    NationalAddressPopupDetailsComponent,
    NationalAddressSectionComponent,
    OfficialDocumentPopupDetailsComponent,
    OfficialDocumentSectionComponent,
    ParentProfileSectionComponent,
    FamilyProfilePopupDetailsComponent,
    FamilyProfileSectionComponent,
    ParentProfilePopupDetailsComponent,
  ],
  imports: [
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    AngularMaterialModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    DataTableModule,
    SelectModule,
    DateValueAccessorModule,
    DynamicModule.withComponents([
      HrRequestDetailsSectionComponent,
      RequestDetailsSectionComponent,
      PopupDetailsComponent,
      PersonalInfoSectionComponent,
      OrganizationalProfileSectionComponent,
      PreviousExperienceSectionComponent,
      QualificationSectionComponent,
    QualificationPopupDetailsComponent,
    PreviousExperiencePopupDetailsComponent,
    NationalAddressPopupDetailsComponent,
    NationalAddressSectionComponent,
    OfficialDocumentPopupDetailsComponent,
    OfficialDocumentSectionComponent,
    ParentProfileSectionComponent,
    ParentProfilePopupDetailsComponent,
    FamilyProfilePopupDetailsComponent,
    FamilyProfileSectionComponent,

    ]
    )
  ],
  entryComponents: [
    HrRequestDetailsSectionComponent,
    RequestDetailsSectionComponent,
    PopupDetailsComponent,
    PersonalInfoSectionComponent,
    OrganizationalProfileSectionComponent,
    PreviousExperienceSectionComponent,
    QualificationSectionComponent,
    QualificationPopupDetailsComponent,
    PreviousExperiencePopupDetailsComponent,
    NationalAddressPopupDetailsComponent,
    NationalAddressSectionComponent,
    OfficialDocumentPopupDetailsComponent,
    OfficialDocumentSectionComponent,
    ParentProfileSectionComponent,
    ParentProfilePopupDetailsComponent,
    FamilyProfilePopupDetailsComponent,
    FamilyProfileSectionComponent,


  ],
  providers: [SegmentDynamicLoaderService,
    StateMachineService,
    I18nService,
    MycurrencyPipe,
    ArOnlyDirective,
    // DatePipe,
    EnOnlyDirective,
    ListenerService,
    ResetPropagationService,
    ProfileRequestorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
