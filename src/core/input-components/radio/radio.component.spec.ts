import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { RadioComponent } from './radio.component';


describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RadioComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('should get default lovValue', () => {

   component.lov = 'lovValue';
  //  component.s = 'selected';
    // expect(component.getDefaultValue()).toBe(component.lov);
  });

it('should get default selected', () => {

  //  component.selected = 'selected';
  //   expect(component.getDefaultValue()).toBe(component.selected);
  });

it('onInit', () => {

  //  component.lovValue = 10;
  //  component.selected = 'selected';
   component.isReadOnly = true;
   component.options = [{'value': 10}];
   component.ngOnInit();
  expect(component).toBeTruthy();
  });

it('onInit lovValue undefined', () => {

  //  component.lovValue = undefined;
  //  component.selected = 'selected';
   component.isReadOnly = true;


   component.ngOnInit();
  expect(component).toBeTruthy();
  });

// it('lovResolver', () => {

//    component.lovValue = 10;
//    component.selected = 'selected';
//    component.options = ['value'];
//    component.isReadOnly = true;
//    component.ngOnInit();
//     expect(component.lovResolver()).toBeDefined();
//   });

});

