import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent  {

  @Input() messages: string[]=[];
  @Input() type: string;

  constructor() {
    this.messages = [];
  }

  messageBoxClasses(){
    return {
      "alert": true,
      "alert-success": this.type === 'info',
      "alert-danger": this.type === 'error',
      "alert-warning": this.type === 'warning'
    }
  }

  messageClose() {
    this.messages = [];
  }

}
