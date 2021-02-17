import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaComponent } from './textareatable.component';
import {FormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';

describe('TextAreaFieldComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAreaComponent ],
      imports: [FormsModule],
      providers: [NgForm]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect variable field to be undefined', () => {
    component.ngOnInit();
    expect(component.field).toBe(undefined);
  });

  it('expect inputField() to return String if variable field is a valid string', () => {
    component.field = 'Name';
    expect(component.inputField()).toBe('Name');
  });

  it('expect inputField() to return empty string if variable field is undefined', () => {
    component.field = 'Name';
    expect(component.inputField()).toBe('Name');
  });

  it('expect inputField() to return empty string if variable field is undefined', () => {
    component.field = 'Name';
    component.isReadOnly = true;
    expect(component.inputField()).toBe('Name');
  });
});
