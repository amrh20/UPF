import { Component, SimpleChanges } from '@angular/core';
import * as Constants from '../../../app/constants/constants';
import { ControlContainer, NgForm } from '@angular/forms';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AttachmentListComponent extends BaseComponent {

  ngOnInit() {
    if (this.field) {
      this.value = this.field;
      if (this.field != null && this.field.length > 0) {
        this.totalattachments = this.field;
        this.isSendBack = true;
      }
      if (this.totalattachments.length == this.max_files) {
        this.isAddMoreVisible = false;
      }
    }
    this.resetPropagator.subscribe(this, this.resetInputFile)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.totalattachments.length > 0) {
      if (changes.field.previousValue.length > 0) {
        if (this.field != undefined && this.field && null && this.field.length > 0) {
          for (let attachment of this.field) {
            if (attachment.fileContents == undefined) {
              attachment.fileContents = null;
            }
          }
          if (this.field.length == this.max_files) {
            this.isAddMoreVisible = false;
          }
        }
      }
    }
  }

  add_more_attachment() {
    if (this.totalattachments.length < this.max_files) {
      this.totalattachments.push();
    } else {
      this.isAddMoreVisible = false;
    }
  }

  onFileInputValueChange(event) {
    let input = event.target;
    let filesize = ((input.files[0].size / 1024) / 1024).toFixed(4); // MB
    let validMimeFileType, validExtension
    if (this.type == 'image') {
      validMimeFileType = this.isValidImgMimeType(input.files[0].type);
      validExtension = this.isValidImgExtension(input.files[0].name.split('.').pop());
    } else {
      validMimeFileType = this.isValidMimeType(input.files[0].type);
      validExtension = this.isValidExtension(input.files[0].name.split('.').pop());
    }
    this.isClean = false;
    if (+filesize < 10 && validMimeFileType && validExtension) {
      this.value = new AttatchmentFile(input.files[0].name, input.files[0].type, null);
      input.nextElementSibling.value = (input.files[0].name.length > 25 ? input.files[0].name.substring(0, 22) + '...' : input.files[0].name);
      let reader = new FileReader();
      reader.onload = () => {
        this.value.fileContents = reader.result['split'](',')[1];
        let object = {
          fileContents: this.value.fileContents,
          fileName: this.value.fileName,
          mimeType: this.value.mimeType
        }
        if (this.totalattachments.length >= this.max_files) {
          this.isAddMoreVisible = false;
        } else {
          let elementExist: boolean = false
          for (let index = 0; index < this.totalattachments.length; index++) {
            const element = this.totalattachments[index];
            if (element.fileName == object.fileName) {
              elementExist = true
              break
            }
          }
          if (elementExist == false) {
            this.totalattachments.push(object);
            this.attachmentList.emit(object);
          }
        }
      };
      reader.readAsDataURL(input.files[0]);
      this.maxSizeFlag = true;
      this.wrongExtensionFlag = true;
      this.wrongMimeTypeFlag = true;
    } else {
      this.maxSizeFlag = +filesize < this.max_files;
      this.wrongExtensionFlag = validExtension;
      this.wrongMimeTypeFlag = validMimeFileType;
    }
  }

  removeAttachment(i, event) {
    if (this.totalattachments.length <= this.max_files) {
      this.isAddMoreVisible = true;
    } else {
      this.isAddMoreVisible = false
    }
    if (i > -1) {
      if (this.inputFile) {
        this.inputFile.nativeElement.value = "";
      }
      this.totalattachments.splice(i, 1);
      this.removefile.emit(i);
    }
  }

  downloadFile(event, fileid) {
    let placeholder = event.target.nextElementSibling;
    this.stateMachine.dispatch(Constants.STATE_MACHINE_ACTION_LOAD_FILE, fileid).then((responseObject) => {
      let fileInformation = responseObject.body;
      const fileBlob = this.dataURItoBlob(fileInformation.fileContents);
      const file = new File([fileBlob], fileInformation.fileName, { type: fileInformation.mimeType });
      placeholder.href = URL.createObjectURL(file);
      placeholder.download = file.name;
      placeholder.click();
    });
  }

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return blob;
  }

  resetInputFile(hasResetted) {
    if (this.inputFile && this.inputFileName) {
      this.inputFile.nativeElement.value = "";
      this.inputFileName.nativeElement.value = "";
    }
    this.totalattachments = []
    this.isClean = hasResetted;
    this.removefile.emit(null);
  }

}

class AttatchmentFile {
  constructor(
    public fileName: string,
    public mimeType: string,
    public fileContents: string) { }

}
