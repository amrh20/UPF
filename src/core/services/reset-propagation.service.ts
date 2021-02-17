import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ResetPropagationService {
  private propagator: EventEmitter<boolean>;

  constructor() {
    this.propagator = new EventEmitter<boolean>();
  }

  propagate() {
    this.propagator.emit(true);
  }

  subscribe(component, callback) {
    return this.propagator.subscribe(value => callback.call(component, value));
  }
}
