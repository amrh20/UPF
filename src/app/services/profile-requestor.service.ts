import { Injectable } from '@angular/core';
import { Form, Section, ProfileInfoDrop } from '../../core/models/form';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileRequestorService {
  private nationalitySubject = new Subject<any>();
  private FormIDSubject = new Subject<any>();
  private FormSubject = new Subject<any>();
  private SectionDetailsSubject = new Subject<any>();
  appFullLoader = false;
  haveDataFromElmnationalAddress = false
  form: Form;

  constructor() {
  }

  setForm(form: any) {
    this.form = form;
    console.log("this.form", this.form);
    this.FormIDSubject.next(this.form.header.formId);
    this.FormSubject.next(this.form)
  }

  setSectionDetails(details: any) {
    this.SectionDetailsSubject.next(details);
  }

  getSectionDetails() {
    return this.SectionDetailsSubject.asObservable();
  }

  getProfileData(): Observable<any> {
    console.log('getProfileData');
    return this.nationalitySubject.asObservable();
  }

  getFormID(): Observable<any> {
    console.log('getformID');
    return this.FormIDSubject.asObservable();
  }

  getForm(): Observable<any> {
    console.log('getForm');
    return this.FormSubject.asObservable();
  }

}
