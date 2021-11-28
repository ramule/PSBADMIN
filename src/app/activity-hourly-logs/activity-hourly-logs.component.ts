import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import * as Chart from "chart.js";
import { DaterangepickerConfig } from "ng2-daterangepicker";
import * as moment from "moment";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { CommonDataShareService } from "../common-data-share.service";
import { Location } from '@angular/common';
import { ActivityHourlyLogsService } from './activity-hourly-logs.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
declare var google: any;
declare var $: any;
declare var showToastMessage: any;

@Component({
  selector: 'app-activity-hourly-logs',
  templateUrl: './activity-hourly-logs.component.html',
  styleUrls: ['./activity-hourly-logs.component.css']
})
export class ActivityHourlyLogsComponent implements OnInit {
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
  canvasBar: any;
  ctxBar: any;
  myChartBar: any;
  chartDataSet: any;
  colorLabel: any[];
  activityLogMaster: any[];
  labelsdata: any[];
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

    document.addEventListener("fullscreenchange", (event) => {
      if (document.fullscreenElement) {
        console.log(
          `Element: ${document.fullscreenElement.id} entered full-screen mode.`
        );
      } else {
        this.myChartBar.options.title.text = "";
        this.myChartBar.update()
      }
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Activity Hourly Logs";
    // this.getadminActivities();
    var value = {
      start: moment().startOf('week'),
      end: moment()
    }
    this.selectedDate1(value, this.daterange);
    this.tabselected = "activity"
  }

  getActivityHourlyLogs(params) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.postResponsePromise(this.appConstants.getActivityHourlyLogsDetails, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.chartDataSet = []
        this.colorLabel =[]
        this.activityLogMaster =[]
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.activityLogMaster = res.result;
        console.log('Activity Hourly Log Array: ', this.activityLogMaster);
        if(this.activityLogMaster.length>0)
        {
          this.labelsdata = this.activityLogMaster.map(item => item.activityName)
          .filter((value, index, self) => self.indexOf(value) === index)
          this.labelsdata.forEach(element => {
            var activityName = element
            var color = this.getRandomColor()
            this.colorLabel.push({activityName,color})
          });
          var data:any  = []
          this.colorLabel.forEach(element => {
            var dataArray = this.activityLogMaster
            var filterData = dataArray.filter(x => x.activityName == element.activityName);
            data=[]
            filterData.forEach(element => {
              var str = moment("/Date("+element.activityDate+")/").format("MM/DD/YYYY");
              var data1 ={
                    x:str,
                    y:element.activityHour,
                    r:element.recCount,
                  }
                data.push(data1)   
            });
            var label = element.activityName
            var backgroundColor = element.color
            var hoverRadius = 0
            this.chartDataSet.push({label,data,backgroundColor,hoverRadius})
  
          });
        }
        if (this.activityLogMaster.length < 1) {
          showToastMessage("No Record Available");
        }
        this.commonMethod.hideLoader();
        $("#myBarChart").hide()
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
    this.getActivityHourlyLogs(this.selectedDate);
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
    $("#myBarChart").hide()
  }

  reportTabClicked() {
    this.tabselected = "report"
    this.loadBarChart()
    $("#report").show()
    $("#myBarChart").show()
    $("#activity").hide()
  }


  loadBarChart() {

    if (typeof this.myChartBar != "undefined") {
      this.myChartBar.destroy();
    }

    this.canvasBar = document.getElementById("myBarChart");
    this.ctxBar = this.canvasBar.getContext("2d");
    this.myChartBar = new Chart(this.ctxBar, {
      type: "bubble",
      data: {
        datasets:this.chartDataSet,
      },
      options: {
        responsive: true,
        backgroundColor: "false",
        title:{
          display: true,
          text: ""
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
                unitStepSize: 1,
                displayFormats: {
                   'month': 'MMM DD'
                }
              },
              scaleLabel: {
                display: true,
                labelString: "Date",
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Hours",
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function(t, d) {
              console.log(t)
              console.log(d)
              console.log(d.datasets[t.datasetIndex])
              return d.datasets[t.datasetIndex].label +
              ' : (Date: ' + t.xLabel + ', Count: ' + d.datasets[t.datasetIndex].data[t.index].r + ')';
            }
          }
        }
      },
    });
    $("#myBarChart").css("display", "block");
  }


  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getGraph()
  {
    this.myChartBar.options.title.text = "Activity Hourly Log Chart";
    this.myChartBar.update();
    var elem = document.getElementById('myBarChart');
    elem.requestFullscreen();
    $("#myBarChart").css("background-color", "white");
    
  }

}
