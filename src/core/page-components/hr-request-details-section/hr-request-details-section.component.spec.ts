import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import {HrRequestDetailsSectionComponent} from "./hr-request-details-section.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {StateMachineService} from "../../../core/services/state-machine.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import { I18nService } from '../../services/i18n.service';



describe('RequestDetailsSectionComponent', () => {
  let component: HrRequestDetailsSectionComponent;
  let fixture: ComponentFixture<HrRequestDetailsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HrRequestDetailsSectionComponent],
      providers: [StateMachineService, HttpClient, HttpHandler, I18nService],
        schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRequestDetailsSectionComponent);
    component = fixture.componentInstance;
    component.section.body = {'details': {'complaintType': null, 'issuesDiscussed': null}, 'performanceRatings': ''};
    component.lov = null;
    fixture.detectChanges();
  });

  it('should be created', () => {
    component.section.body.details.issuesDiscussed = 'YES';
    // expect(component.showHowManyTimes()).toBeDefined();
  });

});


