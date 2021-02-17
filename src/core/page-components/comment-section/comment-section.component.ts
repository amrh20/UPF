import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommentsDrop} from '../../models/form';
import * as Constants from '../../../app/constants/constants';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {

  @ViewChild('placeholder') attachmentDownloadPlaceholder;
  @Input() commentFormVisibility;
  @Input() comments: CommentsDrop;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  constructor(public i18n: I18nService) { }

  ngOnInit() {
  }

  rtlDir() {
    return {
      "ar-dir-rtl": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  rtlFloatRight() {
    return {
      "ar-float-right": this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    }
  }

  downloadAttachment(event,attachmentString) {
    let attachmentInformation = attachmentString.split('|');
    let attachmentName = attachmentInformation[0];
    let attachmentUrl = attachmentInformation[1];
    let placeholder = this.attachmentDownloadPlaceholder.nativeElement;
    placeholder.href = attachmentUrl;
    placeholder.download = attachmentName;
    placeholder.click();
  }

}
