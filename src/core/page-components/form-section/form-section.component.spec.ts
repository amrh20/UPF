import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {FormSectionComponent} from "./form-section.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";



describe('FormSectionComponent', () => {
  let component: FormSectionComponent;
  let fixture: ComponentFixture<FormSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ FormsModule ],
      declarations: [ FormSectionComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('toggleHighlighted', () => {
    expect(component.statusPanel('status')).toBeDefined();
  });

  it('sectionID', () => {
    component.section.id = 'id';
    expect(component.sectionId()).toBeDefined();
  });



});
