export class Form {

  constructor(
    public header: Header,
    public profileInfoDrop: ProfileInfoDrop,
    public commentsDrop: CommentsDrop[],
    public inboxItem: InboxItem,
    public sections: Section[],
    public lovs: any,
    public messages: Messages
  ) {}
}

export class Header {

  constructor(
    public requesterName: string,
    public requesterPhoto: string,
    public formId:  string,
    public creationDate: string,
    public status: {[key:string]: string},
    public details: any
    /* possibly something about flag */
  ) {}
}

export class ProfileInfoDrop {

  constructor(
    public onBehalfAuthorized : boolean,
    public employeeNumber : number,
    public employeeEmail : string,
    public fullName : string,
    public generalDepartmentName : string,
    public jobPosition : string,
    public sectorName : string,
    public departmentName : string,
    public generalDepartmentCode : string,
    public humanResourcesLocation : string,
    public nationality : string,
    public businessPhone : string,
    public directManagerName : string
  ) {}
}
/* istanbul ignore next  */
export class CommentsDrop {

  constructor(
    public profilePicture: string,
    public employeeName: string,
    public commentBody: string,
    public commentDate: string,
    public attachment: string,
    public jobPosition:string
  ) {}
}


export class Section {

  constructor(
    public id: string,
    public header: SectionHeader,
    public body: any
  ) {}
}
export class SectionHeader {

  constructor(
    public processedBy: string,
    public processingDate: string,
    public personTo: string,
    public personToThumbnail: string,
    public delegatedTo: string,
    public delegatedToThumbnail: string,
    public status: string,
    public hasComments: boolean,
    public readOnly: boolean
  ) {}
}


export class Messages {
  /* istanbul ignore next  */
  constructor(
    public errorFields: any,
    public info: string[],
    public warning: string[],
    public error: string[]
  ) {}
}


export class InboxItem {
  constructor(
    public flagPriority: string,
    public isFlagged: string,
    public canRequestFeedback: string,
    public hasFeedback: string,
    public isPending: string,
    public isRequested: string,
    public isResponded: string
  ) {}
}
