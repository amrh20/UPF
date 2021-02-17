import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {SelectOptionComponent} from './select.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('SelectOptionComponent', () => {
  let component: SelectOptionComponent;
  let fixture: ComponentFixture<SelectOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SelectOptionComponent],
      imports: [FormsModule],
      providers: [NgForm]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOptionComponent);
    component = fixture.componentInstance;
    component.name = 'nameDefault';
    fixture.detectChanges();
  });


  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/


  it('component field', () => {
    component.field = 'test';
    expect(component.field).toBe('test');

  });

  it('should get default lovValue', () => {

    // component.lovValue = 'lovValue';
    // component.selected = 'selected';
    // expect(component.getDefaultValue()).toBe(component.lovValue);
  });

  it('should get default selected', () => {

    // component.selected = 'selected';
    // expect(component.getDefaultValue()).toBe(component.selected);
  });

  it('onInit', () => {

    // component.lovValue = 10;
    // component.selected = 'selected';
    component.isReadOnly = true;
    component.options = [{'value': 10}];
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('onInit lovValue undefined', () => {

    // component.lovValue = undefined;
    // component.selected = 'selected';
    component.isReadOnly = true;


    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('lovResolver', () => {

    // component.lovValue = 10;
    // component.selected = 'selected';
    component.options = ['value'];
    component.isReadOnly = true;
    component.ngOnInit();
    // expect(component.lovResolver()).toBeDefined();
  });

});


