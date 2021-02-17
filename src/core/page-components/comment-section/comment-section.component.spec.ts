import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import { CommentSectionComponent } from './comment-section.component';
import { I18nService } from '../../services/i18n.service';



describe('CommentSectionComponent', () => {
  let component: CommentSectionComponent;
  let fixture: ComponentFixture<CommentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CommentSectionComponent ],
      providers: [I18nService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('translation return undefine', function() {
    expect(component.i18n.translate('')).not.toBeDefined();
  });

   it('create class by constructor', () => {
   let i18n = new I18nService;
   let newCommentComponent = new CommentSectionComponent(i18n);
   expect(newCommentComponent).toBeTruthy();
  });

  it('translation return correct name', function() {
    expect(component.i18n.translate('profileInfo.directManager')).toBe('Direct Manager' || 'المدير المباشر');
  });

});

