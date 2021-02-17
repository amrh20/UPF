import { Injectable } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import {RequestDetailsSectionComponent} from '../page-components/request-details-section/request-details-section.component';
import {HrRequestDetailsSectionComponent} from '../../core/page-components/hr-request-details-section/hr-request-details-section.component';
import segmentDynamicLoaderConfiguration from '../config/segment-dynamic-loader.config';
import * as Constants from '../constants/constants'

@Injectable()
export class SegmentDynamicLoaderService {
  requestDetailsSection = RequestDetailsSectionComponent;
  hrRequestDetailsSection = HrRequestDetailsSectionComponent;
  roleToApprovalSectionMapping = segmentDynamicLoaderConfiguration.roleToApprovalSectionMapping;

  constructor(private i18n: I18nService) {

  }

  getComponent(componentId: string) {
    if (componentId.toLowerCase() === Constants.SECTION_ID_REQUEST_DETAILS.toLowerCase()) {
      return this.requestDetailsSection;
    }
    if (componentId.toLowerCase() === 'hrRequestDetails'.toLowerCase()) {
      return this.requestDetailsSection;
    }
    let role = componentId.toLowerCase().split(Constants.SECTION_ID_APPROVAL_PARTIAL_NAME.toLowerCase())[0].toLowerCase();
    return this.roleToApprovalSectionMapping[role];
  }

  getSectionName(componentId: string): string {
    if(componentId.toLowerCase() === Constants.SECTION_ID_REQUEST_DETAILS.toLowerCase()) {
      return this.i18n.translate('requestDetailsTitle');
    }
    else if(componentId.toLowerCase() === 'hrRequestDetails'.toLowerCase()) {
      return this.i18n.translate('hrRequestDetailsTitle');
    }
    let role = componentId.toLowerCase().split(Constants.SECTION_ID_APPROVAL_PARTIAL_NAME.toLowerCase())[0].toLowerCase();
    return this.i18n.translate(`${role.toLowerCase()}Role`);
  }

  getPrintPartialName (componentName: string) {
    if (componentName == 'requestDetails') {
      return 'requestDetails';
    }
 
  }
}
