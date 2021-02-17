import {Section} from '../../core/models/form';

export default {
  beforeTranspileSection (section: Section): Section {
    let hookResult = section;
    // Here should be the code to manipulate the section object before the transpile stage
    return hookResult;
  },

  beforeSendPayload (submitPayload: {[key: string]: any}): {[key: string]: any} {
    let hookResult = submitPayload;
    // Here should be the code to manipulate the submit payload before the request to backend
    return hookResult;
  },

  afterSendPayload (responsePayload: {[key: string]: any}): {[key: string]: any} {
    let hookResult = responsePayload;
    // Here should be the code to manipulate the response payload to a submit of a form
    return hookResult;
  }
}
