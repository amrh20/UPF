import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import { DatepickerComponent } from './datepicker.component';


describe('DatePickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ DatepickerComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('toggleCallendar', () => {
    component.toggleCalendar('test');
    expect(component).toBeTruthy();
  });

  it('toggleCalendarType' , () => {
    component.toggleCalendarType(true);
    expect(component).toBeTruthy();
  });

  it('dropdownClass' , () => {
    component.dropdownClass();
    expect(component).toBeTruthy();
  });

  it('gregorianClasses' , () => {
    component.gregorianClasses();
    expect(component).toBeTruthy();
  });

  it('hijriClasses' , () => {
    component.hijriClasses();
    expect(component).toBeTruthy();
  });

  it('hijriTabClasses' , () => {
    component.hijriTabClasses();
    expect(component).toBeTruthy();
  });

  it('ngAfterViewInit' , () => {
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
  });


});

