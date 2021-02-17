import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {RequestDetailsSectionComponent} from './page-components/request-details-section/request-details-section.component';
import {FinalApprovalSectionComponent} from './page-components/final-approval-section/final-approval-section.component';
import {RequesterSectionComponent} from './page-components/requester-section/requester-section.component';
import {ApprovalSectionComponent} from './page-components/approval-section/approval-section.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {SelectModule} from 'ng-select';
import {DynamicModule} from 'ng-dynamic-component';
import {SegmentDynamicLoaderService} from './services/segment-dynamic-loader.service';
import {StateMachineService} from '../core/services/state-machine.service';
import {ConsultantGroupService} from './services/consultant-group.service';
import {NO_ERRORS_SCHEMA, ViewChild} from '@angular/core';
import {I18nService} from '../core/services/i18n.service';
import * as Constants from './constants/constants';


describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [
        AppComponent,
        RequestDetailsSectionComponent,
        FinalApprovalSectionComponent,
        RequesterSectionComponent,
        ApprovalSectionComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        SelectModule,
        DynamicModule.withComponents([
          RequestDetailsSectionComponent,
          FinalApprovalSectionComponent,
          RequesterSectionComponent,
          ApprovalSectionComponent]
        )
      ],
      providers: [
        I18nService,
        SegmentDynamicLoaderService,
        StateMachineService,
        ConsultantGroupService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });



   it('should create the app', async(() => {

     app.title = 'app';
     app.isReady = false;
     app.state =  'closed';
     app.visibility = 'void';
     app.hidden = 'hidden';
     app.visible = 'visible';


    expect(app).toBeTruthy();
  }));

    it('onProfileFormClick true', async(() => {

    app.showProfileFormContent = true;
    app.onProfileFormClick();
    app.onCommentsFormClick();
    app.onProfileFormClick()
    expect(app).toBeTruthy();
  }));

    it('onProfileFormClick false', async(() => {

    app.showProfileFormContent = false;
    app.onProfileFormClick();
    app.onCommentsFormClick();
    app.onProfileFormClick();
    expect(app).toBeTruthy();
  }));

  it('onCommentsFormClick true', async(() => {

    app.showCommentFormContent = true;
    app.onCommentsFormClick();
    expect(app).toBeTruthy();
  }));

  it('onCommentsFormClick false', async(() => {

    app.showCommentFormContent = false;
    app.onCommentsFormClick();
    expect(app).toBeTruthy();
  }));

  it('ngAfterViewChecked()', async(() => {
    app.startedListener  = false;
    app.ngAfterViewChecked();

    expect(app).toBeTruthy();
  }));

  it('statusClass approved', async(() => {
    expect(app.statusClass(Constants.FORM_STATUS_APPROVED)).toBeDefined();
  }));

it('statusClass pending', async(() => {
  expect(app.statusClass(Constants.FORM_STATUS_PENDING)).toBeDefined();
  }));

it('statusClass rejected', async(() => {
  expect(app.statusClass(Constants.FORM_STATUS_REJECTED)).toBeDefined();
  }));
it('statusClass rejected', async(() => {
  app.sections = [1];

  expect(app.isReadOnly(10)).toBe(true);
  }));
});


