import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {FeedbackSectionComponent} from "./feedback-section.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";



describe('FeedbackSectionComponent', () => {
  let component: FeedbackSectionComponent;
  let fixture: ComponentFixture<FeedbackSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ FormsModule ],
      declarations: [ FeedbackSectionComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('toggleHighlighted', () => {
    // expect(component.statusPanel('status')).toBeDefined();
  });

  it('sectionID', () => {
    // component.section.id = 'id';
    // expect(component.sectionId()).toBeDefined();
  });



});
