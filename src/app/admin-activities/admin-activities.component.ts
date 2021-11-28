import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { DaterangepickerConfig } from "ng2-daterangepicker";
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
declare var $: any
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var jQuery: any;
import * as moment from 'moment'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-admin-activities',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.css']
})
export class AdminActivitiesComponent implements OnInit {
  adminActivities: any = [];
  activityLog: any = [];
  tabselected: any;
  selectedDate: any = {};
  public daterange: any = {};
  public isGraphSelectedByActDate = true;
  public isListSelectedByActDate = false;
  public isGraphSelectedByChannel = true;
  public isListSelectedByChannel = false;
  public isGraphSelectedByReg = true;
  public isListSelectedByReg = false;
  public options: any = {
    locale: { format: 'D MMM YYYY' },
    alwaysShowCalendars: false,
  };
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private datePipe: DatePipe,
    private daterangepickerOptions: DaterangepickerConfig,
  ) {
    this.daterangepickerOptions.settings = {
      locale: { format: 'D MMM YYYY' },
      startDate: moment().startOf('week'),
      endDate: moment(),
      maxDate: new Date(),
      alwaysShowCalendars: false,
      "opens": "left",
      ranges: {
        'Last 15 Days': [moment().subtract(14, 'days'), moment()],
        'Last 7 Days': [moment().subtract(6, 'week'), moment()],
        'This Month': [moment().startOf('month'), moment()],
        'Last Quarter': [moment().subtract(3, 'month'), moment()],
        'Last Year': [moment().subtract(1, 'year'), moment()],
      }
    };
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Administration Activities";
    // this.getadminActivities();
    var value = {
      start: moment().startOf('week'),
      end: moment()
    }
    this.selectedDate1(value, this.daterange);
    this.tabselected = "activity"
  }

  getadminActivities(params) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.postResponsePromise(this.appConstants.getAdminUserActivityLogsByDateUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.adminActivities = res.result;
        this.adminActivities.forEach(el => {
          console.log(el.message1)
          let Obj = {
            'User Name': el.createdbyname,
            'Channel Request': el.channelRequest,
            'Category': el.category,
            'Event Name': el.eventName,
            'Operation': el.action,
            'Browser': el.browser,
            'OS': el.os,
            'Latitude': el.lat,
            'Longitude': el.lon,
            'IP Address': el.ip,
            'Created On': moment(el.createdon).format("YYYY-MM-DD"),
            'Time': moment(el.createdon).format("h:mm:ss a"),
          }
          this.activityLog.push(Obj);
        });
        this.loadPivotGraph()
        if (this.adminActivities.length < 1) {
          showToastMessage("No Record Available");
        }
        //initiallize datatable

        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();

      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAdminUserActivityLogs, res);
      }
    });
  }

  public selectedDate1(value: any, datepicker?: any) {
    this.tabselected = "activity";
    $("#activity").show()
    $("#report").hide()
    // this is the date  selected
    console.log(this.isGraphSelectedByActDate)
    console.log(this.isListSelectedByActDate)
    console.log(this.isGraphSelectedByChannel)
    console.log(this.isListSelectedByChannel)
    console.log(this.isGraphSelectedByReg)
    console.log(this.isListSelectedByReg)
    console.log(value);

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // use passed valuable to update state
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
    this.selectedDate = { "fromdate": this.datePipe.transform(this.daterange.start._d, 'yyyy-MM-dd'), "todate": this.datePipe.transform(this.daterange.end._d, 'yyyy-MM-dd') }
    $("#dateRangeInput").val(this.datePipe.transform(this.selectedDate.fromdate, "dd MMM yyyy") + " - " + this.datePipe.transform(this.selectedDate.todate, "dd MMM yyyy"))
    console.log(this.selectedDate);
    this.getadminActivities(this.selectedDate);
    this.activityLog = [];
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  activityTabClicked() {
    this.tabselected = "activity"
    $("#activity").show()
    $("#report").hide()
  }

  reportTabClicked() {
    this.loadPivotGraph()
    this.tabselected = "report"
    $("#report").show()
    $("#activity").hide()
  }

  loadPivotGraph() {
    var derivers = $.pivotUtilities.derivers;
    var renderers = $.extend($.pivotUtilities.renderers,
      $.pivotUtilities.plotly_renderers, $.pivotUtilities.export_renderers);
    $("#output").pivotUI(
      this.activityLog,
      {
        renderers: renderers,
        sorters: {
          "Created On": function (a, b) {
            return moment(a, "YYYY-MM-DD").diff(moment(b, "YYYY-MM-DD"));
          }
        }
      });
  }

}
