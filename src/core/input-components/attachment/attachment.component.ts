import { Component } from '@angular/core';
import { ControlContainer, NgForm } from "@angular/forms";
import { BaseComponent } from '../base-component/base-component.component';
import * as Constants from '../../../app/constants/constants';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AttachmentComponent extends BaseComponent {


  ngOnInit() {
    this.resetPropagator.subscribe(this, this.resetInputFile)
    if (this.maxSize == undefined) {
      this.maxSize = '10';
    }
    if (this.hasLabel == undefined) {
      this.hasLabel = true;
    }

    if (this.small == undefined) {
      this.small = false;
    }

    
  }

  onValueChange(event) {
    let input = event.target;
    this.filesize = ((input.files[0].size / 1024) / 1024).toFixed(4); // MB
    this.maxSizeValue = this.maxSize;
    let validMimeFileType, validExtension
    if (this.type == 'image') {
      validMimeFileType = this.isValidImgMimeType(input.files[0].type);
      validExtension = this.isValidImgExtension(input.files[0].name.split('.').pop());
    } else {
      validMimeFileType = this.isValidMimeType(input.files[0].type);
      validExtension = this.isValidExtension(input.files[0].name.split('.').pop());
    }
    this.wrongFileSizeFlag = false;
    this.isClean = false;
    if (+this.filesize < +this.maxSize && validMimeFileType && validExtension) {
      this.value = new AttatchmentFile(input.files[0].name, input.files[0].type, null);
      input.nextElementSibling.value = (input.files[0].name.length > 25 ? input.files[0].name.substring(0, 22) + '...' : input.files[0].name);
      let reader = new FileReader();
      reader.onload = () => {
        this.value.fileContents = (reader.result as string).split(',')[1];
        // this.field = JSON.stringify(this.value);
        this.field = this.value;
        // this.outPutData.emit({ data:this.value, size })

        this.AttachmentValue.emit({ data:this.value})
      };
      reader.readAsDataURL(input.files[0]);
      this.maxSizeFlag = true;
      this.wrongExtensionFlag = true;
      this.wrongMimeTypeFlag = true;
      let size = this.filesize
      this.outPutData.emit({ event, size })
    } else {
      this.maxSizeFlag = +this.filesize < +this.maxSize;
      this.wrongFileSizeFlag = true;
      this.wrongExtensionFlag = validExtension;
      this.wrongMimeTypeFlag = validMimeFileType;
      this.maxSizeValue = null;
    }
    if (!validExtension) {
      this.maxSizeFlag = true;
      this.wrongFileSizeFlag = true;
      this.wrongExtensionFlag = false;
      this.wrongMimeTypeFlag = false;
    }
  }

  removeAttachedFile(event) {
    this.value = new AttatchmentFile(null, null, null);
    this.field = this.value;
    this.AttachmentValue.emit({ data:this.value})
    if (this.inputFile && this.inputFileName) {
      this.inputFile.nativeElement.value = null;
      this.inputFileName.nativeElement.value = null;
    }
    this.isClean = true;
    let size = this.filesize
    this.outPutData.emit({ event, size })
  }

  downloadFile(event) {

    let placeholder = event.target.nextElementSibling;
    // this.stateMachine.dispatch(Constants.STATE_MACHINE_ACTION_LOAD_FILE, this.field.attachmentId).then((responseObject) => {
      this.stateMachine.dispatch("getAttachment", this.field.attachmentId , this.field.isIgate).then((responseObject) => {
      debugger ;
      let fileInformation = responseObject;
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
    this.field = {
      "fileName": "",
      "mimeType": "",
      "fileContents": "",
      "attachmentId": ""
    };
    this.value = {
      "fileName": "",
      "mimeType": "",
      "fileContents": "",
      "attachmentId": ""
    };
    this.isClean = hasResetted;
    let size = null, data = null
    this.outPutData.emit({ data, size })
  }
  
}

class AttatchmentFile {
  constructor(
    public fileName: string,
    public mimeType: string,
    public fileContents: string) { }
}
