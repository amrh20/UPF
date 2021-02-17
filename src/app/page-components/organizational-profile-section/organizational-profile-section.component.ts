import {
  Component,
  Input,
  AfterViewInit,
} from "@angular/core";
import { I18nService } from "../../../core/services/i18n.service";
import * as Constants from "../../constants/constants";
import { ProfileRequestorService } from "../../services/profile-requestor.service";
import { Section, Form } from "../../../core/models/form";
import { StateMachineService } from "../../../core/services/state-machine.service";
import loadFormHooks from "./../../hooks/load-form";
import { isArray } from "util";

@Component({
  selector: "app-organizational-profile-section",
  templateUrl: "./organizational-profile-section.component.html",
  styleUrls: ["./organizational-profile-section.component.css"],
})
export class OrganizationalProfileSectionComponent implements AfterViewInit {
  @Input() isReadOnly: boolean;
  @Input() section: Section;
  @Input() lov: any;

  personalProfileVisibility: boolean = false;
  currentSectionId: any;
  personalProfilehelpMessage: string = "";
  form: Form;

  constructor(
    public i18n: I18nService,
    public stateMachine: StateMachineService,
    public profileRequestorService: ProfileRequestorService
  ) { }

  ngAfterViewInit() {
    this.ServicesSubScriptions();
  }

  rtlButtonBrowseLabel() {
    return {
      rtlButtonBrowseLabel:
        this.i18n.getLanguage() === Constants.LANGUAGE_CODE_AR,
    };
  }

  public ServicesSubScriptions() {
    this.profileRequestorService.getForm().subscribe((data) => {
      this.form = data;
      this.currentSectionId = this.form.sections[
        this.form.sections.length - 1
      ].id;
    });
  }

  getSegmentDetails(segment, checked) {
    let segmentData = {
      segment: segment,
    };

    if (segment == "personalProfile" || segment == "organizationalProfile") {
      this.FlipCheckBox(segment);
      return;
    }

    // Show hide Panels

    if (checked) {

      this.stateMachine.dispatch("getSegmentDetails", segmentData).then(
        (form) => {
          console.log("response", form);
          if (form.error) {
            window.scroll(0, 0);
            if (!this.form) {
              this.form = new Form(
                Constants.NO_VALUE,
                Constants.NO_VALUE,
                Constants.NO_VALUE,
                Constants.NO_VALUE,
                Constants.NO_VALUE,
                Constants.NO_VALUE,
                form
              );
            } else {
              this.form.messages = form;
              this.form = loadFormHooks.afterTranspilePayload(this.form);
            }
          } else {
            let mainSegment = segment + "Segment";
            this.section.body.details[mainSegment] = {
              ...this.section.body.details[mainSegment],
              ...form.request.details[mainSegment],
            };
            if (isArray(this.section.body.details[mainSegment][segment])) {
              this.section.body.details[mainSegment][segment].forEach(element => {
                element['action'] = 'UPDATE'
              });
            }
          }
        },
        (err) => { }
      );
      if (this.section.body.details[segment + "Segment"][segment] === undefined) {
        if (segment != "personalProfile" && segment != "organizationalProfile"
          && segment != "medicalDetails" && segment != "officeLocation") {
          this.section.body.details[segment + "Segment"][segment] = [];
        }
      }
    }
    else {
      delete this.section.body.details[segment + "Segment"][segment];
      this.section.body.details[segment + "Segment"].isUpdated = "false";
    }
  }

  FlipCheckBox(segment) {
    if (segment == "personalProfile") {
      this.personalProfileVisibility = !this.personalProfileVisibility;
    }
  }


}


