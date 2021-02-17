import { TestBed, inject } from '@angular/core/testing';
import {StateMachineService} from './state-machine.service';
import * as Constants from '../../app/constants/constants';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('StateMachineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateMachineService, HttpClient, HttpHandler]
    });
  });

 it('should be created', inject([StateMachineService], (service: StateMachineService) => {
    expect(service).toBeTruthy();
  }));

   it('function should return null', inject([StateMachineService], (service: StateMachineService) => {

    expect(service.dispatch(Constants.STATE_MACHINE_ACTION_HANDLE_ERROR, null, Constants.LANGUAGE_CODE_EN)).not.toBeDefined();
  }));



it('get state', inject([StateMachineService], (service: StateMachineService)  => {
  expect(service.dispatch(service.getState())).not.toBeDefined();

}));
});
