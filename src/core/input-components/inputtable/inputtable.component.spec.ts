import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './inputtable.component';


describe('InputFieldComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
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
