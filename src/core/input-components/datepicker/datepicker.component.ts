import { Component, Output, EventEmitter } from '@angular/core';
import * as Constants from '../../../app/constants/constants';
import { ControlContainer, NgForm } from "@angular/forms";
import { BaseComponent } from '../base-component/base-component.component';
import * as moment from 'moment';
import * as momenthijri from "moment-hijri";
declare var $j: any;
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DatepickerComponent extends BaseComponent {
  inputValue: any;
  private validDate = null;
  private shownCalendar;
  topDate: any;
  topHijriDate: string;
  @Output() dateValue: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.shownCalendar = 'gregorian';
    this.topDate = new Date()
    this.topDate = moment(this.topDate).locale('en-US').format("DD/MM/YYYY");
    this.topHijriDate = momenthijri(new Date()).format("iMMMM iYYYY");
    if (this.hasLabel == undefined) {
      this.hasLabel = true;
    }
  }
  ngAfterViewInit() {
    if (this.i18n.getLanguage().toUpperCase() === Constants.LANGUAGE_CODE_AR) {
      var calendarFormTodayButton = 'اليوم';
    } else {
      var calendarFormTodayButton = 'Today';
    };
    let altCommands = $j.extend(true, {}, $j.calendarsPicker.commands);
    altCommands.today.action = () => {
      let todayDate = new Date();
      let todayDateCalendarObject = $j.calendars.newDate(todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate(), $j.calendars.instance('gregorian'), this.i18n.getLanguage());
      let todayDateSelected = todayDateCalendarObject.toJD();
      let gregorian_date = $j.calendars.instance().fromJD(todayDateSelected);
      let hijri_date = $j.calendars.instance('islamic').fromJD(todayDateSelected);
      $j('#' + this.name + '_gregorian_datepicker_placeholder').calendarsPicker('setDate', gregorian_date);
      $j('#' + this.name + '_hijri_datepicker_placeholder').calendarsPicker('setDate', hijri_date);
      $j(`[fb-id="${this.name}_date_field"]`).val(todayDateCalendarObject.formatDate('dd/mm/YYYY'));
      let dateArray = (todayDateCalendarObject.formatDate('YYYY-mm-dd')).split('-');
      let newDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
      newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
      this.inputValue = moment(newDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      this.isOpen = !this.isOpen;
      this.dateValue.emit(newDate)
    }
    /* istanbul ignore next  */
    $j('#' + this.name + '_gregorian_datepicker_placeholder').calendarsPicker({
      calendar: $j.calendars.instance('gregorian', this.i18n.getLanguage()), // The calendar to use
      prevText: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      nextText: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      todayText: calendarFormTodayButton,
      pickerClass: 'calendar', // CSS class to add to this instance of the datepicker
      showOnFocus: true, // True for popup on focus, false for not
      showTrigger: null, // Element to be cloned for a trigger, null for none
      showAnim: '', // Name of jQuery animation for popup, '' for no animation
      showOptions: {}, // Options for enhanced animations
      showSpeed: 'normal', // Duration of display/closure
      popupContainer: null, // The element to which a popup calendar is added, null for body
      alignment: 'bottomLeft', // Alignment of popup - with nominated corner of input:
      // 'top' or 'bottom' aligns depending on language direction,
      // 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
      fixedWeeks: true, // True to always show 6 weeks, false to only show as many as are needed
      firstDay: 0, // First day of the week, 0 = Sunday, 1 = Monday, ...
      // defaults to calendar local setting if null
      calculateWeek: null, // Calculate week of the year from a date, null for calendar default
      localNumbers: false, // True to localise numbers (if available),
      // false to use normal Arabic numerals
      monthsToShow: 1, // How many months to show, cols or [rows, cols]
      monthsOffset: 0, // How many months to offset the primary month by
      monthsToStep: 1, // How many months to move when prev/next clicked
      monthsToJump: 12, // How many months to move when large prev/next clicked
      changeMonth: true, // True to change month/year via drop-down, false for navigation only
      yearRange: 'c-10:c+10', // Range of years to show in drop-down: 'any' for direct text entry
      // or 'start:end', where start/end are '+-nn' for relative to today
      // or 'c+-nn' for relative to the currently selected date
      // or 'nnnn' for an absolute year
      showOtherMonths: true, // True to show dates from other months, false to not show them
      selectOtherMonths: false, // True to allow selection of dates from other months too
      defaultDate: null, // Date to show if no other selected
      selectDefaultDate: false, // True to pre-select the default date if no other is chosen
    //  minDate: this.topDate, // The minimum selectable date
      minDate: null , // The minimum selectable date
      maxDate: null, // The maximum selectable date
      dateFormat: 'dd/mm/yyyy', // Format for dates, defaults to calendar setting if null
      autoSize: false, // True to size the input field according to the date format
      rangeSelect: false, // Allows for selecting a date range on one date picker
      rangeSeparator: ' - ', // Text between two dates in a range
      multiSelect: 0, // Maximum number of selectable dates, zero for single select
      multiSeparator: ',', // Text between multiple dates
      onDate: null, // Callback as a date is added to the datepicker
      onShow: $j.calendarsPicker.hoverCallback(function () {
        $j('#' + this.name + '_gregorian_datepicker_placeholder a').hover(function () {
          $j(this).toggleClass('calendars-highlight');
        })
      }), // Callback just before a datepicker is shown
      onChangeMonthYear: null, // Callback when a new month/year is selected
      onSelect: (dates) => {
        var selected = dates[0].toJD();
        var hijri_date = $j.calendars.instance('islamic').fromJD(selected);
        $j('#' + this.name + '_hijri_datepicker_placeholder').calendarsPicker('setDate', hijri_date);
        $j(`[fb-id="${this.name}_date_field"]`).val(dates[0].formatDate('dd/mm/YYYY'));
        var dateArray = (dates[0].formatDate('YYYY-mm-dd')).split('-');
        // this.inputValue = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        var newDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
        this.inputValue = moment(newDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        this.isOpen = !this.isOpen; //Only used in one Calendar
        this.dateValue.emit(this.inputValue)
      }, // Callback when a date is selected
      onClose: null, // Callback when a datepicker is closed
      altField: null, // Alternate field to update in synch with the datepicker
      altFormat: 'dd/mm/yyyy', // Date format for alternate field, defaults to dateFormat
      constrainInput: true, // True to constrain typed input to dateFormat allowed characters
      commandsAsDateFormat: false, // True to apply formatDate to the command texts
      commands: altCommands,
    });
    /* istanbul ignore next  */
    $j('#' + this.name + '_hijri_datepicker_placeholder').calendarsPicker({
      calendar: $j.calendars.instance('islamic', this.i18n.getLanguage()), // The calendar to use
      prevText: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      nextText: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      todayText: calendarFormTodayButton,
      pickerClass: 'calendar', // CSS class to add to this instance of the datepicker
      showOnFocus: true, // True for popup on focus, false for not
      showTrigger: null, // Element to be cloned for a trigger, null for none
      showAnim: '', // Name of jQuery animation for popup, '' for no animation
      showOptions: {}, // Options for enhanced animations
      showSpeed: 'normal', // Duration of display/closure
      popupContainer: null, // The element to which a popup calendar is added, null for body
      alignment: 'bottomLeft', // Alignment of popup - with nominated corner of input:
      // 'top' or 'bottom' aligns depending on language direction,
      // 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
      fixedWeeks: true, // True to always show 6 weeks, false to only show as many as are needed
      firstDay: null, // First day of the week, 0 = Sunday, 1 = Monday, ...
      // defaults to calendar local setting if null
      calculateWeek: null, // Calculate week of the year from a date, null for calendar default
      localNumbers: false, // True to localise numbers (if available),
      // false to use normal Arabic numerals
      monthsToShow: 1, // How many months to show, cols or [rows, cols]
      monthsOffset: 0, // How many months to offset the primary month by
      monthsToStep: 1, // How many months to move when prev/next clicked
      monthsToJump: 12, // How many months to move when large prev/next clicked
      changeMonth: true, // True to change month/year via drop-down, false for navigation only
      yearRange: 'c-10:c+10', // Range of years to show in drop-down: 'any' for direct text entry
      // or 'start:end', where start/end are '+-nn' for relative to today
      // or 'c+-nn' for relative to the currently selected date
      // or 'nnnn' for an absolute year
      showOtherMonths: true, // True to show dates from other months, false to not show them
      selectOtherMonths: false, // True to allow selection of dates from other months too
      defaultDate: null, // Date to show if no other selected
      selectDefaultDate: false, // True to pre-select the default date if no other is chosen
      //minDate: this.topHijriDate, // The minimum selectable date
      minDate: null , // The minimum selectable date
      maxDate: null, // The maximum selectable date
      dateFormat: 'dd/mm/yyyy', // Format for dates, defaults to calendar setting if null
      autoSize: false, // True to size the input field according to the date format
      rangeSelect: false, // Allows for selecting a date range on one date picker
      rangeSeparator: ' - ', // Text between two dates in a range
      multiSelect: 0, // Maximum number of selectable dates, zero for single select
      multiSeparator: ',', // Text between multiple dates
      onDate: null, // Callback as a date is added to the datepicker
      onShow: $j.calendarsPicker.hoverCallback(function () {
        $j('#' + this.name + '_hijri_datepicker_placeholder a').hover(function () {
          $j(this).toggleClass('calendars-highlight');
        })
      }), // Callback just before a datepicker is shown
      onChangeMonthYear: null, // Callback when a new month/year is selected
      onSelect: (dates) => {
        var selected = dates[0].toJD();
        var gregorian_date = $j.calendars.instance('gregorian').fromJD(selected);
        var hijri_date = $j.calendars.instance('islamic').fromJD(selected);
        $j('#' + this.name + '_gregorian_datepicker_placeholder').calendarsPicker('setDate', gregorian_date);
        $j(`[fb-id="${this.name}_date_field"]`).val(gregorian_date.formatDate('dd/mm/YYYY'));
        var dateArray = (gregorian_date.formatDate('YYYY-mm-dd')).split('-');
        // this.inputValue = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        var newDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
        this.inputValue = moment(newDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        // this.isOpen = !this.isOpen; //Only used in one Calendar
      }, // Callback when a date is selected
      onClose: null, // Callback when a datepicker is closed
      altField: null, // Alternate field to update in synch with the datepicker
      altFormat: 'dd/mm/yyyy', // Date format for alternate field, defaults to dateFormat
      constrainInput: true, // True to constrain typed input to dateFormat allowed characters
      commandsAsDateFormat: false, // True to apply formatDate to the command texts
      commands: altCommands,
    });
  }
  validateInput(event) {
    let specialKeysToIgnore = ['Shift', 'Ctrl', 'Alt', 'Meta', 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Enter'];
    if (specialKeysToIgnore.indexOf(event.key) === -1) {
      if (/^(?:(?:31(\/)(?:0[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29(\/)(?:02)\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0[1-9]|1\d|2[0-8])(\/)(?:(?:0[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/.test(event.target.value)) {
        this.validDate = true;
      }
      else {
        this.validDate = false;
      }
    }
  }
  updateDate(event) {
    if (this.validDate) {
      let inputDateArray = event.target.value.split('/');
      let newDate = new Date(inputDateArray[2], inputDateArray[1] - 1, inputDateArray[0]);
      newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
      this.inputValue = moment(newDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      console.log('date is valid');
      if (inputDateArray[0] != "") {
        this.dateValue.emit(newDate)
      } else {
        this.dateValue.emit(null)
      }
    }
    else {
      this.inputValue = null;
      this.dateValue.emit(this.inputValue)
      console.log('date is invalid');
    }
  }
  toggleCalendar(event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }
  toggleCalendarType(toUse) {
    this.shownCalendar = toUse;
  }
  dropdownClass() {
    let fixedClass = 'date-picker';
    /* istanbul ignore next  */
    return fixedClass + (this.isOpen ? ' calendar-open' : '');
  }
  gregorianClasses() {
    return {
      gregorian: true,
      'show-calendar': this.shownCalendar === 'gregorian'
    }
  }
  gregorianTabClasses() {
    return {
      tab: true,
      'tab-gregorian': true,
      active: this.shownCalendar === 'gregorian',
      notActive: this.shownCalendar !== 'gregorian'
    }
  }
  hijriClasses() {
    return {
      hijri: true,
      'show-calendar': this.shownCalendar === 'hijri'
    }
  }
  hijriTabClasses() {
    return {
      tab: true,
      'tab-hijri': true,
      active: this.shownCalendar === 'hijri',
      notActive: this.shownCalendar !== 'hijri'
    }
  }

  isWindowsOs() {
    let windowsOs = null;
    if (navigator.appVersion.indexOf("Win") != -1) {
      windowsOs = true;
    } else {
      windowsOs = false;
    };
    return {
      'tab-content-windows': windowsOs
    };
  }
}
