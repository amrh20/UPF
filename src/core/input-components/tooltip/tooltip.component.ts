import {Component} from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
declare var $j: any;

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})

export class TooltipComponent extends BaseComponent {

  ngAfterViewChecked() {
    $j(function () {
      $j('[data-toggle="popover"]').popover()
    })
  }

}
