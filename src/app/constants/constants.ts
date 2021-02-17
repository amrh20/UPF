// Constant for basic validations
export const DONT_SHOW = null;
export const NO_COMMENTS = false;
export const HAS_COMMENTS = true;
export const URL_SEPARATOR = '/';
export const READ_ONLY = true;
export const WRITE_MODE = false;
export const NO_VALUE = null;
export const TRUE_STRING = 'TRUE';
export const FALSE_STRING = 'FALSE';
export const TRUE_BOOL = true;
export const FALSE_BOOL = false;

// State Machine statuses
export const STATE_MACHINE_STATUS_IDLE = 'idle';
export const STATE_MACHINE_STATUS_FETCHING = 'fetching';
export const STATE_MACHINE_STATUS_SENDING = 'sending';
export const STATE_MACHINE_STATUS_RESULT = 'result';
export const STATE_MACHINE_STATUS_ERROR = 'error';

// State Machine actions
export const STATE_MACHINE_ACTION_LOAD_FORM = 'loadForm';
export const STATE_MACHINE_ACTION_SUBMIT_FORM = 'submitForm';
export const STATE_MACHINE_ACTION_SEARCH_EMPLOYEE = 'searchEmployee';
export const STATE_MACHINE_ACTION_EMPLOYEE_PROFILE = 'employeeProfile';
export const STATE_MACHINE_ACTION_SUCCESS_WM = 'successWm';
export const STATE_MACHINE_ACTION_SUCCESS_USERS = 'successUsers';
export const STATE_MACHINE_ACTION_CONVERT = 'convert';
export const STATE_MACHINE_ACTION_SUCCESS = 'success';
export const STATE_MACHINE_ACTION_FAILURE = 'failure';
export const STATE_MACHINE_ACTION_HANDLE_ERROR = 'handleError';
export const STATE_MACHINE_ACTION_LOAD_FILE = 'loadFile';

// Process name code
export const PROCESS_NAME_CODE = 'SCR';

// HTTP protocols that are available
export const HTTP_PROTOCOL_HTTP = 'http://';
export const HTTP_PROTOCOL_HTTPS = 'https://';

// HTTP methods that are available are
export const HTTP_METHOD_GET = 'GET';
export const HTTP_METHOD_POST = 'POST';
export const HTTP_METHOD_PUT = 'PUT';

// Available servers to the UI
export const TARGET_SERVER_WM = 'WM';
export const TARGET_SERVER_DP = 'DP';

// Service Names that are available
export const SERVICE_NAME_WM_FORM = 'form';
export const SERVICE_NAME_WM_CHILD_FORM = '';
// export const SERVICE_NAME_DP_SEARCH_EMPLOYEE = 'igate.users.search';
export const SERVICE_NAME_DP_SEARCH_EMPLOYEE = 'igate.users.search.v3';

// Languages codes available in the application
export const LANGUAGE_CODE_EN = 'en';
export const LANGUAGE_CODE_AR = 'ar';

// URLs form static assets
export const IGATE_STATIC_ASSET_PROFILE_PHOTO_URL = '/group/i-gate/wm-bpm/forms/-/proxy/portrait?email=';
export const HEADER_CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded';

// Roles constants
export const ROLE_REQUESTER = 'R';

// Section IDs
export const SECTION_ID_REQUEST_DETAILS = 'requestDetails';
export const SECTION_ID_GM_PARTIAL_ROLE = 'GM';
export const SECTION_ID_SM_PARTIAL_ROLE = 'SM';
export const SECTION_ID_DM_PARTIAL_ROLE = 'DM';
export const SECTION_ID_VP_PARTIAL_ROLE = 'VP';
export const SECTION_ID_SVP_PARTIAL_ROLE = 'SVP';
export const SECTION_ID_EXECUTE_PARTIAL_ROLE = 'GovtRelationsLead';
export const SECTION_ID_PERFORM_PARTIAL_ROLE = 'GovtRelationsMember';
export const SECTION_ID_EMP_INFO_APPROVAL_PARTIAL_ROLE = 'EmpInfo';
export const SECTION_ID_PAYROLL_APPROVAL_PARTIAL_ROLE = 'Payroll';

export const SECTION_ID_REQUESTER_PARTIAL_NAME = 'Requester';
export const SECTION_ID_APPROVAL_PARTIAL_NAME = 'Approval';
export const SECTION_ID_NOTHING_PARTIAL_NAME = '';

export const SECTION_STATUS_PENDING = 'PENDING';
export const SECTION_STATUS_APPROVED = 'APPROVED';
export const SECTION_STATUS_UNSATISFIED = 'UNSATISFIED';

export const WM_ACTION_SAVE = 'SAVE';
export const WM_ACTION_SUBMIT = 'SUBMIT';

export const FORM_STATUS_NEW = 'NEW';
export const FORM_STATUS_PENDING = 'PENDING';
export const FORM_STATUS_APPROVED = 'APPROVED';
export const FORM_STATUS_REJECTED = 'REJECTED';
export const FORM_STATUS_SEND_BACK = 'SENDBACK';
export const FORM_STATUS_CANCELLED= 'CANCELLED';
export const FORM_STATUS_COMPLETED = 'COMPLETED';


export const PROFILE_CONTAINER = '#profileFormContent';
export const COMMENT_CONTAINER = '#commentsFormContent';
export const FEEDBACK_CONTAINER = '#feedbackFormContent';
export const INBOX_STATUS_PENDING = 'pending';
export const INBOX_STATUS_PROCESSED = 'processed';
export const INBOX_STATUS_SENT = 'sent';

// feedback and flag
export const STATE_MACHINE_ACTION_GET_INBOX_ITEM = 'getInboxItem';
export const SERVICE_NAME_DP_INBOX_ITEM = 'igate.get.inbox.item';
export const STATE_MACHINE_ACTION_SUCCESS_INBOX_ITEM = 'successInboxItem';

export const STATE_MACHINE_ACTION_SET_FLAG = 'setFlagPriority';
export const SERVICE_NAME_DP_UPDATE_INBOX_ITEM = 'igate.update.inbox.item';
export const STATE_MACHINE_ACTION_INBOX_ITEM_RESPONSE = 'inboxItemResponse';

export const FEEDBACK_STATUS_REQUEST = 'requestFeedback';
export const FEEDBACK_STATUS_RESPOND = 'respondToFeedback';
export const FEEDBACK_STATUS_WAITING = 'waitingFeedback';
export const FEEDBACK_STATUS_RESPONDED = 'feedbackResponded';


export const STATE_MACHINE_ACTION_SUBMIT_FEEDBACK = 'submitFeedback';
export const STATE_MACHINE_ACTION_GET_FEEDBACK = 'getFeedback';
export const STATE_MACHINE_ACTION_UPDATE_FEEDBACK = 'submitFeedbackResponse';
export const SERVICE_NAME_DP_CREATE_FEEDBACK = 'igate.create.inbox.item.feedback';
export const STATE_NAME_DP_GET_FEEDBACK = 'igate.get.inbox.item.feedback';
export const SERVICE_NAME_DP_UPDATE_FEEDBACK = 'igate.update.inbox.item.feedback';

export const STATE_MACHINE_ACTION_LOAD_HISTORY = 'loadHistory';
export const STATE_MACHINE_ACTION_SUCCESS_HISTORY = 'successHistory';
export const SERVICE_NAME_DP_LOAD_HISTORY = 'igate.get.inbox.item.workflow';
export const WM_ACTION_SAVE_CHANGES = 'SAVE_CHANGES';
export const SERVICE_NAME_WM_DRAFT_FORM = 'draft';
export const REPORT = 'report';

export const DATE_TIME = 'DD/MM/YYYY HH:mm:ss';
export const DATE_DASH = 'DD-MMM-YYYY';
export const DATE_SLASH = 'DD/MM/YYYY';

export const STATE_MACHINE_ACTION_GET_AREACODE  =  'getAreaCode'   ;