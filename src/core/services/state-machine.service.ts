import { environment } from '../../environments/environment';
import * as Constants from '../../app/constants/constants';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import saveFormHooks from '../../app/hooks/save-form';
import { Form, Header, ProfileInfoDrop, CommentsDrop, InboxItem, Section, SectionHeader, Messages } from '../models/form';

@Injectable()
export class StateMachineService {
  private transitions: { [key: string]: { [key: string]: Function } };
  private state: string;
  private currentSubmitter: any;
  private authToken: string;
  private refreshToken: string;
  private formId: string;
  private formName: string;
  private currentActor: string;
  private isMobile: boolean;
  private requesterEmail: string;
  private authorizedEmail: string;
  private serviceName: string;
  private inboxType: string;
  private successed: string;
  constructor(private http: HttpClient) {
    this.isMobile = (window as any).wmConfig.isMobile;
    this.state = Constants.STATE_MACHINE_STATUS_IDLE;
    this.currentSubmitter = null;
    this.authToken = null;
    this.refreshToken = null;
    this.formId = (window as any).wmConfig.formId;
    this.checkDraftRequest();
    this.formName = (window as any).wmConfig.formPrefix;
    /* istanbul ignore next  */
    this.transitions = {
      idle: {
        loadForm: function (data, ...args) {
          let result = null;
          let [onBehalfOfEmail] = args;
          this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
          /* Make request to load data */
          let authToken = null;
          let refreshToken = null;
          let authUrl = environment.proxyServiceBaseUrl + (window as any).wmConfig.language + environment.proxyFullAddress + environment.proxyServiceAuthorization + '?ts=' + (new Date()).valueOf();
          return this.http.get(authUrl, { observe: 'response' }).toPromise()
            .then(
              (responseObject: any) => {
                let tokenInformation = responseObject.body;
                this.authToken = tokenInformation.token;
                this.refreshToken = tokenInformation.refreshToken;
                let body = {
                  method: Constants.HTTP_METHOD_GET,
                  destination: Constants.TARGET_SERVER_WM,
                  serviceName: this.serviceName,
                  formName: this.formName,
                  formId: null,
                  queryParameters: null
                }
                if (data) {
                  body.queryParameters = {
                    onBehalfOfEmail: data.onBehalfOfEmail.personEmail,
                    onBehalfFlag: data.onBehalfFlag
                  }
                }
                else {
                  delete body.queryParameters;
                }
                if (this.formId) {
                  body.formId = this.formId;
                }
                else {
                  delete body.formId;
                }
                let options = this.getRequestOptions();
                let succ = Constants.STATE_MACHINE_ACTION_SUCCESS_WM;
                return this.callPost(body, succ, options);
              }
            ).catch(
              (httpError: any) => {
                let responseError = httpError.error;
                if (responseError) {
                  return this.dispatch(Constants.STATE_MACHINE_ACTION_FAILURE, responseError);
                }
                else {
                  this.state = Constants.STATE_MACHINE_STATUS_IDLE;
                  throw httpError;
                }
              }
            );
        },
        searchEmployee: function (...args) {
          let [searchString] = args;
          this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
          let body = {
            method: Constants.HTTP_METHOD_GET,
            destination: Constants.TARGET_SERVER_DP,
            serviceName: Constants.SERVICE_NAME_DP_SEARCH_EMPLOYEE,
            parameters: {
              q: searchString,
              limit: 10
            }
          }
          let options = this.getRequestOptions();
          let succ = Constants.STATE_MACHINE_ACTION_SUCCESS_USERS;
          return this.callPost(body, succ, options);
        },
        employeeProfile: function (...args) {
          let [employeeEmail] = args;
          let isSuccessfull = true;
          let result = null;
          this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
          let url = environment.proxyServiceBaseUrl + (window as any).wmConfig.language + environment.proxyFullAddress + environment.proxyServiceExecute;
          let body = {
            method: Constants.HTTP_METHOD_GET,
            destination: Constants.TARGET_SERVER_DP,
            serviceName: Constants.SERVICE_NAME_DP_SEARCH_EMPLOYEE,
            parameters: {
              q: employeeEmail
            }
          }
          let options = this.getRequestOptions();
          return this.http.post(url, encodeURIComponent(JSON.stringify(body)), options).toPromise()
            .then(
              (responseObject: any) => {
                // return first result
                console.log(responseObject.body);
                let payload = responseObject.body.Users[0];
                this.state = Constants.STATE_MACHINE_STATUS_IDLE;
                return payload;
              },
            ).catch(
              (httpError: any) => {
                let responseError = httpError.error;
                if (responseError) {
                  return this.dispatch(Constants.STATE_MACHINE_ACTION_FAILURE, responseError);
                }
                else {
                  this.state = Constants.STATE_MACHINE_STATUS_IDLE;
                  throw httpError;
                }
              }
            );
        },
        loadFile: function (...args) {
          const [id] = args;
          return this.http.get(environment.proxyFullAddress + environment.proxyServiceForms + this.formId + environment.proxyServiceAttachment + id, { observe: 'response' }).toPromise();
        },
        submitForm: function (...args) {
          let [submitData, action] = args;
          let isSuccessfull = false;
          let result = null;
          this.state = Constants.STATE_MACHINE_STATUS_SENDING;
          return this.dispatch(Constants.STATE_MACHINE_ACTION_CONVERT, submitData, action);
        },

        importFromElm : function (...args) {
          let [date ] = args;
          this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
          let body = {
            method: Constants.HTTP_METHOD_GET,
            destination: Constants.TARGET_SERVER_WM,
            formName: (window as any).wmConfig.formPrefix,
            serviceName: 'importFromElm', 
            queryParameters: {
                segment : date.segment ,
                idNumber : date.idNumber ,
                dateOfBirth : date.dateOfBirth ,
                
            }
          }
          let options = this.getRequestOptions();
          let succ = 'serviceResponce'
          return this.callPost(body, succ, options);
          },


          getSegmentDetails: function (...args) {
            let [date ] = args;
            this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
            let body = {
              method: Constants.HTTP_METHOD_GET,
              destination: Constants.TARGET_SERVER_WM,
              formName: (window as any).wmConfig.formPrefix,
              serviceName: 'getSegmentDetails', 
              queryParameters: {
                  segment : date.segment ,
              }
            }
            let options = this.getRequestOptions();
            let succ = 'serviceResponce'
            return this.callPost(body, succ, options);
            },

            getAreaCode: function (...args) {
              let [data ] = args;
              this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
              let body = {
                method: Constants.HTTP_METHOD_GET,
                destination: Constants.TARGET_SERVER_WM,
                formName: (window as any).wmConfig.formPrefix,
                serviceName: 'getAreaCode', 
                queryParameters: {
                    countryCode : data ,
                }
              }
              let options = this.getRequestOptions();
              let succ = 'serviceResponce'
              return this.callPost(body, succ, options);
              },
            getEstLocation: function (...args) {
                let [data ] = args;
                this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
                let body = {
                  method: Constants.HTTP_METHOD_GET,
                  destination: Constants.TARGET_SERVER_WM,
                  formName: (window as any).wmConfig.formPrefix,
                  serviceName: 'getEstLocation', 
                  queryParameters: {
                      establishmentId : data ,
                  }
                }
                let options = this.getRequestOptions();
                let succ = 'serviceResponce'
                return this.callPost(body, succ, options);
                },
            getSubMajor : function (...args) {
                let [data ] = args;
                this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
                let body = {
                  method: Constants.HTTP_METHOD_GET,
                  destination: Constants.TARGET_SERVER_WM,
                  formName: (window as any).wmConfig.formPrefix,
                  serviceName: 'getSubMajor', 
                  queryParameters: {
                      majorCode : data ,
                  }
                }
                let options = this.getRequestOptions();
                let succ = 'serviceResponce'
                return this.callPost(body, succ, options);
                },
              getAttachment : function (...args) {
                  let [attachmentId ,  isIgate ] = args;
                  this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
                  let body = {
                    method: Constants.HTTP_METHOD_GET,
                    destination: Constants.TARGET_SERVER_WM,
                    formName: (window as any).wmConfig.formPrefix,
                    serviceName: 'attachment', 
                    queryParameters: {
                        attachmentId: attachmentId ,
                        isIgate : isIgate ,
                        formId:this.formId
                    }
                  }
                  let options = this.getRequestOptions();
                  let succ = 'serviceResponce'
                  return this.callPost(body, succ, options);
                  },

          //-----------------------------------------------

        submitFeedback: function (...args) {
          const [email, question] = args;
          let body = {
            method: Constants.HTTP_METHOD_POST,
            destination: Constants.TARGET_SERVER_DP,
            serviceName: Constants.SERVICE_NAME_DP_CREATE_FEEDBACK,
            formName: (window as any).wmConfig.formPrefix,
            urlParameters: {
              inboxid: this.formId
            },
            body: {
              request: question,
              to: email
            }
          }
          let options = this.getRequestOptions();
          this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
          let succ = Constants.STATE_MACHINE_ACTION_SUCCESS_INBOX_ITEM;
          return this.callPost(body, succ, options);
        },
        submitFeedbackResponse: function (...args) {
          const [feedbackId, feedbackResponse] = args;
          let body = {
            method: Constants.HTTP_METHOD_PUT,
            destination: Constants.TARGET_SERVER_DP,
            serviceName: Constants.SERVICE_NAME_DP_UPDATE_FEEDBACK,
            formName: (window as any).wmConfig.formPrefix,
            urlParameters: {
              inboxid: this.formId
            },
            body: {
              response: feedbackResponse,
              feedbackId: feedbackId
            }
          }
          let options = this.getRequestOptions();
          this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
          let succ = Constants.STATE_MACHINE_ACTION_SUCCESS_INBOX_ITEM;
          return this.callPost(body, succ, options);
        },
        getFeedback: function (...args) {
          const [email] = args;
          const body = {
            method: Constants.HTTP_METHOD_GET,
            destination: Constants.TARGET_SERVER_DP,
            serviceName: Constants.STATE_NAME_DP_GET_FEEDBACK,
            urlParameters: {
              inboxid: this.formId,
              email: email
            }
          }
          let options = this.getRequestOptions();
          let succ = Constants.STATE_MACHINE_ACTION_SUCCESS_INBOX_ITEM;
          return this.callPost(body, succ, options);
        },
        getInboxItem: function (...args) {
          const [id, inboxType] = args;
          const body = {
            method: Constants.HTTP_METHOD_GET,
            destination: Constants.TARGET_SERVER_DP,
            serviceName: Constants.SERVICE_NAME_DP_INBOX_ITEM,
            urlParameters: {
              inboxid: id,
              inboxtype: inboxType
            }
          }
          let options = this.getRequestOptions();
          let succ = Constants.STATE_MACHINE_ACTION_SUCCESS_INBOX_ITEM;
          return this.callPost(body, succ, options);
        },
        setFlagPriority(...args) {
          const [id] = args;
          let body = {
            method: Constants.HTTP_METHOD_PUT,
            destination: Constants.TARGET_SERVER_DP,
            serviceName: Constants.SERVICE_NAME_DP_UPDATE_INBOX_ITEM,
            formName: (window as any).wmConfig.formPrefix,
            urlParameters: {
              inboxid: this.formId
            },
            body: {
              flag: id
            }
          }
          let options = this.getRequestOptions();
          this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
          let succ = Constants.STATE_MACHINE_ACTION_SUCCESS_INBOX_ITEM;
          return this.callPost(body, succ, options);
        },
        loadHistory: function (...args) {
          const [id] = args;
          const body = {
            method: Constants.HTTP_METHOD_GET,
            destination: Constants.TARGET_SERVER_DP,
            serviceName: Constants.SERVICE_NAME_DP_LOAD_HISTORY,
            urlParameters: {
              inboxid: id
            }
          }
          let options = this.getRequestOptions();
          let succ = Constants.STATE_MACHINE_ACTION_SUCCESS_HISTORY;
          return this.callPost(body, succ, options);
        },
        mockApi: function (filterData, ...args) {
          let body = {
            method: Constants.HTTP_METHOD_GET, //GET - PUT - POST
            destination: Constants.TARGET_SERVER_WM,
            serviceName: 'Your Service Name' //,  //this.getServiceName(),
            , formName: 'FormName'
            , queryParameters: {
              // put your parameters here 
            }
          }
          let options = this.getRequestOptions();
          let succ = 'serviceResponce';
          return this.callPost(body, succ, options);
        }
      },
      fetching: {
        serviceResponce: function (...args) {
          let [payload] = args;
          let result = payload;
          console.log(result, 'result');
          this.state = Constants.STATE_MACHINE_STATUS_IDLE;
          return result;
        },
        successWm: function (...args) {
          let [payload] = args;
          let wasSendBack = false;
          /* Convert into Form Object */
          let result = new Form(
            Constants.NO_VALUE,
            Constants.NO_VALUE,
            Constants.NO_VALUE,
            Constants.NO_VALUE,
            Constants.NO_VALUE,
            Constants.NO_VALUE,
            Constants.NO_VALUE
          );
          // keep emails on-track
          this.requesterEmail = payload.data.requester.employeeEmail;
          this.authorizedEmail = payload.data.requester.authorizedEmail;
          /* Generate Header Object */
          let payloadFormDetails = payload.data.form;
          this.currentActor = (payload.data.form.currentActor ? payload.data.form.currentActor.email : null);
          let isReadOnly = (payloadFormDetails.readOnly.toUpperCase() === Constants.TRUE_STRING ? Constants.TRUE_BOOL : (payloadFormDetails.readOnly.toUpperCase() === Constants.FALSE_STRING ? Constants.FALSE_BOOL : Constants.NO_VALUE))
          let requestDetailsHasComment = false;

          try {
            result.header = new Header(
              payload.data.requester.fullName,
              Constants.IGATE_STATIC_ASSET_PROFILE_PHOTO_URL + payload.data.requester.employeeEmail,
              (payloadFormDetails.formId ? payloadFormDetails.formId : Constants.DONT_SHOW),
              (payloadFormDetails.creationDate ? payloadFormDetails.creationDate : Constants.DONT_SHOW),
              payloadFormDetails.formStatus,
              payloadFormDetails.details
            );
            this.formId = (payloadFormDetails.formId ? payloadFormDetails.formId : Constants.NO_VALUE)
            /* Generate Profile Information Object */
            let payloadProfileInfo = payload.data.requester;

            result.profileInfoDrop = new ProfileInfoDrop(
              (JSON.parse(payloadProfileInfo.onBehalfAuthorized) ? JSON.parse(payloadProfileInfo.onBehalfAuthorized) : null),
              payloadProfileInfo.employeeId,
              payloadProfileInfo.employeeEmail,
              payloadProfileInfo.fullName,
              payloadProfileInfo.generalDepartmentName,
              payloadProfileInfo.jobPosition,
              payloadProfileInfo.sectorName,
              payloadProfileInfo.departmentName,
              payloadProfileInfo.generalDepartmentCode,
              payloadProfileInfo.humanResourceLocation,
              payloadProfileInfo.nationality,
              payloadProfileInfo.businessPhone,
              payloadProfileInfo.directManagerName
            );
            /* Generate Sections Object */
            result.sections = [];
            /* Push as first object the section for the request details */
            let requestDetailsHasComment = false;
            if (payload.data.request.details.comment) {
              requestDetailsHasComment = true;
            }
            result.sections.push(
              new Section(
                Constants.SECTION_ID_REQUEST_DETAILS,
                new SectionHeader(
                  Constants.DONT_SHOW,
                  Constants.DONT_SHOW,
                  Constants.DONT_SHOW,
                  Constants.DONT_SHOW,
                  Constants.DONT_SHOW,
                  Constants.DONT_SHOW,
                  Constants.DONT_SHOW,
                  requestDetailsHasComment,
                  (payload.data.workflowSteps ? Constants.READ_ONLY : isReadOnly)
                ),
                payload.data.request
              )
            );
            this.successed = "true"
          }
          catch (Error) {
            this.successed = "false"
          }
          /* Code for Workflow Written By Umair 25/07/2018 */
          //if(requestDetailsHasComment && result.header.formId) {
          if (result.header.formId) {
            this.state = Constants.STATE_MACHINE_STATUS_IDLE;
            result.commentsDrop = (!result.commentsDrop ? [] : result.commentsDrop);
            this.dispatch(Constants.STATE_MACHINE_ACTION_LOAD_HISTORY, result.header.formId).then((responseObject) => {
              if (responseObject) {
                responseObject.items.forEach(item => {
                  if (item.sequenceNumber !== '0' && item.processedBy) {
                    const name = item.processedBy.firstName + ' ' + item.processedBy.secondMiddleName + ' ' + item.processedBy.familyName;
                    if (item.attachments.length > 0) {
                      this.dispatch(Constants.STATE_MACHINE_ACTION_LOAD_FILE, item.attachments[0].id).then((responseObject) => {
                        let file = responseObject.fileName + "|data:" + responseObject.mimeType + ";base64," + responseObject.fileContents;
                        result.commentsDrop.push(new CommentsDrop(
                          Constants.IGATE_STATIC_ASSET_PROFILE_PHOTO_URL + item.processedBy.email,
                          name,
                          item.comments,
                          item.modifiedDate,
                          file,
                          item.processedBy.job
                        ));
                      })
                    } else {
                      result.commentsDrop.push(new CommentsDrop(
                        Constants.IGATE_STATIC_ASSET_PROFILE_PHOTO_URL + item.processedBy.email,
                        name,
                        item.comments,
                        item.modifiedDate,
                        '',
                        item.processedBy.job
                      ));
                    }

                  }
                });
              }
            });
          }
          /* end Code for Workflow Written By Umair 25/07/2018 */

          /* code for feedback and flag, getinboxitem written by Umair 05/09/2018*/
          const inboxType = this.getInboxType(result);
          if (result.header.formId && !this.isOpenOnInbox()) {
            this.state = Constants.STATE_MACHINE_STATUS_IDLE;
            this.dispatch(Constants.STATE_MACHINE_ACTION_GET_INBOX_ITEM, result.header.formId, inboxType).then((responseObject) => {
              if (responseObject) {
                const item = responseObject.item;
                result.inboxItem = new InboxItem(
                  item.flagging.flagPriority,
                  item.flagging.isFlagged,
                  item.feedback.canRequestFeedback,
                  item.feedback.hasFeedback,
                  item.feedback.isPending,
                  item.feedback.isRequested,
                  item.feedback.isResponded
                );
              }
            });
          }
          /* end of code for feedback and flag, getinboxitem written by Umair 05/09/2018*/
          /* Create other sections from the request details, also generating comments for comments drop if they exist */
          let payloadWorkflowSteps = payload.data.workflowSteps;
          if (payloadWorkflowSteps && payloadWorkflowSteps.constructor === Array && payloadWorkflowSteps.length > 0) {
            payloadWorkflowSteps.forEach((step, index) => {
              let currentIsRequesterSendBack = JSON.stringify(step.details) === JSON.stringify({});
              let hasComments = (!currentIsRequesterSendBack && (step.details.comment || step.comment) ? Constants.HAS_COMMENTS : Constants.NO_COMMENTS);
              // edit current actor in case current actor is the requester
              // let currentActor = (step.actor.email === step.actor.recipient.email ? step.actor.recipient : (step.actor.delegate ? step.actor.delegate : null))
              let currentActor
              if (step.actor.email === step.actor.recipient.email) {
                currentActor = step.actor.recipient
              }
              else {
                if (step.actor.delegate) {
                  currentActor = step.actor.delegate
                }
                if (step.actor.email) {
                  if (step.actor.email === payload.data.requester.employeeEmail) {
                    let data = {
                      role: null,
                      name: payload.data.requester.fullName,
                      shortName: this.getShortName(payload.data.requester.fullName),
                      email: payload.data.requester.employeeEmail,
                      employeeNumber: payload.data.requester.employeeId
                    }
                    currentActor = data
                  } else {
                    currentActor = null
                  }
                }
                else {
                  currentActor = null
                }
              }
               if (hasComments) {
                result.commentsDrop = (!result.commentsDrop ? [] : result.commentsDrop);
                if (step.details.attachment && step.details.attachment.attachmentId) {
                  this.state = Constants.STATE_MACHINE_STATUS_IDLE;
                  this.dispatch(Constants.STATE_MACHINE_ACTION_LOAD_FILE, step.details.attachment.attachmentId).then((responseObject) => {
                    let fileInformation = responseObject.body;
                  });
                  this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
                }
                else if (step.details.attachmentId) {
                  this.state = Constants.STATE_MACHINE_STATUS_IDLE;
                  this.dispatch(Constants.STATE_MACHINE_ACTION_LOAD_FILE, step.details.attchmentId).then((responseObject) => {
                    let fileInformation = responseObject.body;
                  });
                  this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
                }
                else {
                  if (currentActor) {
                    this.state = Constants.STATE_MACHINE_STATUS_IDLE;
                  }
                  this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
                }
              };
              if (wasSendBack && step.actor.recipient.role === 'REQUESTER') {
                result.sections = [new Section(
                  Constants.SECTION_ID_REQUEST_DETAILS,
                  new SectionHeader(
                    Constants.DONT_SHOW,
                    Constants.DONT_SHOW,
                    Constants.DONT_SHOW,
                    Constants.DONT_SHOW,
                    Constants.DONT_SHOW,
                    Constants.DONT_SHOW,
                    Constants.DONT_SHOW,
                    requestDetailsHasComment,
                    (payload.data.workflowSteps ? Constants.READ_ONLY : isReadOnly)
                  ),
                  payload.data.request
                )]
              }
              else if (wasSendBack) {
                if (result.sections.length > 1) {
                  result.sections.pop();
                }
                wasSendBack = false;
              }
              if (step.details.decision && step.details.decision.key === Constants.FORM_STATUS_SEND_BACK) {
                wasSendBack = true;
              }
              else if (JSON.stringify(step.details) !== JSON.stringify({})) {
                result.sections.push(
                  new Section(
                    step.actor.recipient.role.toLowerCase() + Constants.SECTION_ID_APPROVAL_PARTIAL_NAME,
                    new SectionHeader(
                      (currentActor ? this.getShortName(currentActor.name) : null),
                      step.date,
                      this.getShortName(step.actor.recipient.name),
                      Constants.IGATE_STATIC_ASSET_PROFILE_PHOTO_URL + step.actor.recipient.email,
                      (step.actor.delegate && step.actor.delegate.name ? this.getShortName(step.actor.delegate.name) : null),
                      (step.actor.delegate && step.actor.delegate.email ? Constants.IGATE_STATIC_ASSET_PROFILE_PHOTO_URL + step.actor.delegate.email : null),
                      step.actor.status,
                      hasComments,
                      (index < payloadWorkflowSteps.length - 1 ? Constants.READ_ONLY : isReadOnly)
                    ),
                    { details: step.details, processingDate: step.date }
                  )
                );
                this.currentSubmitter = { actor: step.actor, recipient: step.recipient, delegate: step.actor.delegate };
              }
            });
          };
          /* Create Lov Sections */
          result.lovs = (payload.meta && payload.meta.lovs ? payload.meta.lovs : null);

          if (payload.meta && payload.meta.messages) {
            result.messages = new Messages(
              {},
              [],
              [],
              []
            );
            payload.meta.messages.forEach((message) => {
              result.messages[message.type].push(message.message);
            });
          }

          // result.messages = (payload.meta && payload.meta.messages ? payload.meta.messages : null);
          /* Fix last section to be the RO/WM from the variable */
          result.sections[result.sections.length - 1].header.readOnly = isReadOnly;
          this.state = Constants.STATE_MACHINE_STATUS_IDLE;
          return result;
        },
        successInboxItem: function (...args) {
          let [payload] = args;
          const result = payload;
          this.state = Constants.STATE_MACHINE_STATUS_IDLE;
          return result;
        },
        successHistory: function (...args) {
          let [payload] = args;
          const result = payload;
          this.state = Constants.STATE_MACHINE_STATUS_IDLE;
          return result;
        },
        successUsers: function (...args) {
          let [payload] = args;
          let result = {
            parent: null,
            selected: null,
            options: []
          };
          if (payload) {
            payload.Users.forEach((element, index) => {
              result.options.push({
                value: element.employeeNumber,
                description: element.name,
                jobPosition: element.job.name,
                email: element.email,
                order: index,
                parent: null
              })
            });
          }
          this.state = Constants.STATE_MACHINE_STATUS_IDLE;
          return result;
        },
        failure: function (...args) {
          let [errors] = args;
          this.state = Constants.STATE_MACHINE_STATUS_ERROR;
          return this.dispatch(Constants.STATE_MACHINE_ACTION_HANDLE_ERROR, errors);
        }
      },
      error: {
        handleError: function (...args) {
          let [errors] = args;
          console.log(errors);
          let result = new Messages(
            {},
            [],
            [],
            []
          );
          if (errors && errors.meta && errors.meta.messages) {
            errors.meta.messages.forEach((message) => {
              result[message.type].push(message.message);
              if (message.payloadReference) {
                let payloadReferenceTokens = message.payloadReference.split('/');
                payloadReferenceTokens.slice(1, payloadReferenceTokens.length - 1);
                let element = result.errorFields;
                payloadReferenceTokens.forEach((token) => {
                  element[token] = {};
                  element = element[token];
                })
                element = true;
              }
            });
          }
          this.state = Constants.STATE_MACHINE_STATUS_IDLE;
          return result;
        }
      },
      sending: {
        convert: function (...args) {
          let [section, action] = args;
          let payload = null;
          let result = null;
          let body = null
          let url = '/' + (window as any).wmConfig.language + environment.proxyFullAddress + environment.proxyServiceExecute;
          let options = this.getRequestOptions();
          let method = (this.formId && !this.getDraftId(this.formId) ? Constants.HTTP_METHOD_PUT : Constants.HTTP_METHOD_POST);
          if (saveFormHooks.beforeTranspileSection) {
            section = saveFormHooks.beforeTranspileSection(section);
          }
          /* Convert into success result object */
          // Handle submit of new request
          if (section.id === Constants.SECTION_ID_REQUEST_DETAILS) {
            payload = { request: { details: section.body.details } };
            let servicename = Constants.SERVICE_NAME_WM_FORM;
            if (action === Constants.WM_ACTION_SAVE_CHANGES) {
              method = Constants.HTTP_METHOD_POST;
              servicename = Constants.SERVICE_NAME_WM_DRAFT_FORM;
            }
            // if(){
            //   servicename = Constants.SERVICE_NAME_WM_CHILD_FORM,
            // }
            body = {
              method: method,
              destination: Constants.TARGET_SERVER_WM,
              serviceName: servicename,
              parameters: {
                action: action
              },
              queryParameters: {
                onBehalfOfEmail: this.requesterEmail
              },
              // onBehalfOfEmail: section.body.details.searchEmployee,
              formName: this.formName,
              body: payload,
              formId: this.formId
            }
            if (!this.authorizedEmail || !this.authorizedEmail.length || this.authorizedEmail === this.requesterEmail) {
              delete body.queryParameters
            }
          }
          // Handle submit of approval
          else {
            payload = { workflowSteps: {} };
            payload.workflowSteps.details = section.body.details;
            payload.workflowSteps.actor = this.currentSubmitter.actor;
            payload.workflowSteps.actor.email = this.currentActor;
            payload.workflowSteps.status = Constants.SECTION_STATUS_PENDING;
            let servicename = Constants.SERVICE_NAME_WM_FORM;
            let formName = this.formName
            if (action === Constants.WM_ACTION_SAVE_CHANGES) {
              servicename = Constants.SERVICE_NAME_WM_DRAFT_FORM;
              formName = 'common'
            }
            body = {
              method: method,
              destination: Constants.TARGET_SERVER_WM,
              serviceName: servicename,
              parameters: {
                action: action
              },
              formName: formName,
              body: payload,
              formId: this.formId
            }
          }
          if (!this.formId) {
            delete body.formId;
          }
          if (saveFormHooks.beforeSendPayload) {
            body.payload = saveFormHooks.beforeSendPayload(body.payload);
          }
          return this.http.post(url, encodeURIComponent(JSON.stringify(body)), options)
            .toPromise().then(
              (responseObject: any) => {
                console.log('----------responseObject-----------', responseObject)
                let formResponse = responseObject.body.data.form;
                if (saveFormHooks.afterSendPayload) {
                  formResponse = saveFormHooks.afterSendPayload(formResponse);
                }
                let result = {
                  id: null,
                  status: null,
                  nextApprover: {
                    name: null,
                    email: null,
                    role: null
                  },
                  creationDate: null
                };
                /* format data */
                result.id = formResponse.formId;
                result.status = formResponse.formStatus;
                if (formResponse.currentActor) {
                  result.nextApprover = {
                    name: formResponse.currentActor.name,
                    email: formResponse.currentActor.email,
                    role: formResponse.formStep
                  }
                }
                result.creationDate = formResponse.creationDate;
                this.state = Constants.STATE_MACHINE_STATUS_RESULT;
                return result;
              }).catch(
                (httpError: any) => {
                  let responseError = httpError.error;
                  console.log('catch error on submit', responseError)
                  if (responseError) {
                    return this.dispatch(Constants.STATE_MACHINE_ACTION_FAILURE, responseError);
                  }
                  else {
                    this.state = Constants.STATE_MACHINE_STATUS_IDLE;
                    throw httpError;
                  }
                }
              );
        },
        failure: function (...args) {
          let [errors] = args;
          this.state = Constants.STATE_MACHINE_STATUS_ERROR;
          return this.dispatch(Constants.STATE_MACHINE_ACTION_HANDLE_ERROR, errors);
        }
      }
    }
  }

  public dispatch(actionName, ...args) {
    const actions = this.transitions[this.state];
    const action = actions[actionName];

    if (action) {
      return action.apply(this, args);
    }
  }
  public getState() {
    return this.state;
  }

  private getRequestOptions() {
    return {
      headers: new HttpHeaders({
        authToken: this.authToken,
        'Content-Type': Constants.HEADER_CONTENT_TYPE_FORM
      }),
      observe: 'response'
    }
  }

  public isMobileApp() {
    return this.isMobile;
  }

  public isOpenOnInbox() {
    return (window as any).wmConfig.outlook;
  }
  public showPrint() {
    return (window as any).wmConfig.showPrint;
  }

  public getInboxType(result) {
    let rtn = null;
    //if(result.header.key === Constants.FORM_STATUS_PENDING){
    console.log(this.loggedInUserId(), 'this.loggedInUserId()', result.profileInfoDrop.employeeEmail);
    if (this.loggedInUserId() === result.profileInfoDrop.employeeEmail) {
      rtn = Constants.INBOX_STATUS_SENT;
    } else {
      rtn = Constants.INBOX_STATUS_PENDING;
    }
    //}else{
    //rtn = Constants.INBOX_STATUS_PROCESSED;
    //}
    return rtn;
  }

  public loggedInUserId() {
    return (window as any).wmConfig.loggedInUserEmail;
  }

  private getShortName(name: string) {
    if (name) {
      let nameTokens = name.split(' ');

      if (nameTokens.length == 1) {
        return [nameTokens[0]]
      } else {
        return [nameTokens[0], nameTokens[nameTokens.length - 1]].join(' ');
      }
    }
    else {
      return null;
    }
  }

  public getSessionToken() {
    return this.authToken;
  }

  public getFormId() {
    return this.formId;
  }

  public setState(state: string) {
    if (state === Constants.STATE_MACHINE_STATUS_ERROR) {
      this.state = state;
    }
    else {
      throw 'Invalid state set. State was ' + state + ' and it can only be ' + Constants.STATE_MACHINE_STATUS_ERROR;
    }
  }

  public isOnBehalfOfRequest() {
    return (this.authorizedEmail && this.authorizedEmail.length && this.authorizedEmail !== this.requesterEmail);
  }

  public onBehalfOfEmail() {
    return this.requesterEmail;
  }

  private isChildFormRequest() {
    let isChildFormRequest = null;
    if (this.formId && this.formId.split('')[3] === 'C') {
      isChildFormRequest = true;
    }
    else {
      isChildFormRequest = false;
    }
    return isChildFormRequest;
  }
  private getDraftId(val) {
    const rtn = val.toUpperCase().startsWith('DRAFT');
    return rtn;
  }

  private checkDraftRequest() {
    if ((this.formId) && this.formId.startsWith("DRAFT"))
      this.serviceName = Constants.SERVICE_NAME_WM_DRAFT_FORM;
    else
      if (this.isChildFormRequest())
        this.serviceName = Constants.SERVICE_NAME_WM_CHILD_FORM;
      else
        this.serviceName = Constants.SERVICE_NAME_WM_FORM
  }

  public callPost(body, succ, options) {
    let apiUrl = environment.proxyServiceBaseUrl + (window as any).wmConfig.language + environment.proxyFullAddress + environment.proxyServiceExecute;
    return this.http.post(apiUrl, encodeURIComponent(JSON.stringify(body)), options).toPromise()
      .then(
        (responseObject: any) => {
          let payload = responseObject.body;
          this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
          return this.dispatch(succ, payload);
        },
      ).catch(
        (httpError: any) => {
          let responseError = httpError.error;
          if (responseError) {
            this.state = Constants.STATE_MACHINE_STATUS_FETCHING;
            return this.dispatch(Constants.STATE_MACHINE_ACTION_FAILURE, responseError);
          }
          else {
            this.state = Constants.STATE_MACHINE_STATUS_IDLE;
            throw httpError;
          }
        }
      );
  }
}
