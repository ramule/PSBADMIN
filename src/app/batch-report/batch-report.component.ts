import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { DaterangepickerConfig } from "ng2-daterangepicker";
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import * as moment from 'moment'
import { DatePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-batch-report',
  templateUrl: './batch-report.component.html',
  styleUrls: ['./batch-report.component.css']
})
export class BatchReportComponent implements OnInit {

  public options: any = {
    locale: { format: 'D MMM YYYY' },
    alwaysShowCalendars: false,
  };
  public daterange: any = {};
  selectedDate: any = {};
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private daterangepickerOptions: DaterangepickerConfig,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private datePipe: DatePipe
  ) {
    this.daterangepickerOptions.settings = {
      locale: { format: 'D MMM YYYY' },
      startDate: moment().startOf('month'),
      endDate: moment(),
      maxDate: new Date(),
      timePicker: true,
      alwaysShowCalendars: false,
      "opens": "left",
      ranges: {
        'Last 15 Days': [moment().subtract(14, 'days'), moment()],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment()],
        'Last Quarter': [moment().subtract(3, 'month'), moment()],
        'Last Year': [moment().subtract(1, 'year'), moment()],
      }
    };
  }

  public buildForm() {
    $('#fromDate').datetimepicker({
      format: 'LT'
    });
    $('#toDate').datetimepicker({
      format: 'LT'
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Batch Report";
    this.buildForm();
  }

  public selectedDate1(value: any, datepicker?: any) {
    // this is the date  selected
    console.log(value);

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // use passed valuable to update state
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
    this.selectedDate = { "fromdate": this.datePipe.transform(this.daterange.start._d, 'yyyy-MM-dd'), "todate": this.datePipe.transform(this.daterange.end._d, 'yyyy-MM-dd'), "type": "retail" }
    $("#dateRangeInput").val(this.datePipe.transform(this.selectedDate.fromdate, "dd MMM yyyy") + " - " + this.datePipe.transform(this.selectedDate.todate, "dd MMM yyyy"))
    console.log(this.selectedDate);
  }

  onDateChange() {

  }

}
