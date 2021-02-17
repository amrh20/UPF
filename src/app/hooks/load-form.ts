import {Form} from '../../core/models/form';

export default {
  beforeTranspilePayload (payload: {[key: string]: any}): {[key: string]: any} {
    let hookResult = payload;
    // Here should be the code to manipulate the payload before the transpile stage
    return hookResult;
  },

  afterTranspilePayload (form: Form): Form {
    let hookResult = form;
    // Here should be the code to manipulate the form object after the transpile stage
    return hookResult;
  }
}
