import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import * as Chart from 'chart.js'
import * as $ from 'jquery';
import { DaterangepickerConfig } from "ng2-daterangepicker";
import * as moment from 'moment'
import { CommonMethods } from '../common-methods';
import { CommonDataShareService } from '../common-data-share.service';

@Component({
  selector: 'app-analytics-service-req-report',
  templateUrl: './analytics-service-req-report.component.html',
  styleUrls: ['./analytics-service-req-report.component.css']
})
export class AnalyticsServiceReqReportComponent implements OnInit {

  public daterange: any = {};

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'D MMM YYYY' },
    alwaysShowCalendars: false,
  };

  canvasBar: any;
  ctxBar: any;

  selectedDate:any = {};
  todayDate = new Date();
  graphType:boolean = false;
  roleType:any = 'retail';

  serviceReportCntHeader = [];
  serviceReportCntValue = [];
  tableViewData:any =[];

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    private daterangepickerOptions: DaterangepickerConfig,
    public commonMethod : CommonMethods
  ) {
    this.daterangepickerOptions.settings = {
      locale: { format: 'D MMM YYYY' },
      alwaysShowCalendars: false,
      "opens": "right",
      ranges: {
        'Last 15 Days': [moment().subtract(14, 'days'), moment()],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment()],
        'Last Quarter': [moment().subtract(3, 'month'),moment()],
        'Last Year': [moment().subtract(1, 'year'), moment()]
      }
    };
  }

  ngOnInit(): void {
    $("#tableView").css("display", "none");
    this.getTransactionByChannel(this.roleType);
  }


  cancel(){
    this.commonMethod.cancel();
  }

  onSelChartType(type){

    if(type == '15days'){
      let date = new Date();
      let fromDate = date.setDate(date.getDate() - 15);
      this.selectedDate = {"fromdate" :  new Date(fromDate).toISOString().split('T')[0] , "todate" : this.todayDate.toISOString().split('T')[0]}
    }
    else if(type == '7days'){
      let date = new Date();
      let fromDate = date.setDate(date.getDate() - 7);
      this.selectedDate = {"fromdate" :  new Date(fromDate).toISOString().split('T')[0] , "todate" : this.todayDate.toISOString().split('T')[0]}
    }
    else if(type == 'month'){
      let date = new Date();
      let month = date.getMonth()+1;
      let year = date.getFullYear();
      let day = date.getDate()
      let fromDate = year+"-"+month+"-01"
      this.selectedDate = {"fromdate" :  fromDate, "todate" : this.todayDate.toISOString().split('T')[0]}
    }
    else if(type == 'quater'){

    }
    else if(type == 'year'){
      let date = new Date();
      let month = date.getMonth()+1;
      let year = date.getFullYear()-1;
      let day = date.getDate()
      let fromDate = year+"-"+month+"-"+day
      this.selectedDate = {"fromdate" :  fromDate, "todate" : this.todayDate.toISOString().split('T')[0]}
    }

    console.log(this.selectedDate);
    this.getTransactionByChannelNew(JSON.stringify(this.selectedDate));
    this.popOverClicked();
  }

  //onValueChange
  selectedType(value){
    console.log(value);
    this.roleType = value;
    this.getTransactionByChannel(value);
  }

  //on popover click
  popOverClicked(){
    this.graphType = !this.graphType;
  }

  getTransactionByChannel(type){
    var req = 'message/getServiceRequestByStatus/'+type;
    this.commonServiceCall.postResponsePromise(req).subscribe(data => {
      if (data.status) {
        this.serviceReportCntHeader = [];
        this.serviceReportCntValue = [];
        this.tableViewData = [];
        data.resp.forEach(el => {
          this.serviceReportCntValue.push(el[0]);
          this.serviceReportCntHeader.push(el[1]);
          let Obj = {
            channel : el[1],
            cnt: el[0]
          }
          this.tableViewData.push(Obj);
        });
        this.loadBarChart();
      }
    })
  }

  getTransactionByChannelNew(param){
    var req = 'message/getServiceRequestByStatusNew';
    this.commonServiceCall.postResponsePromise(req,param).subscribe(data => {
      if (data.status) {
        this.serviceReportCntHeader = [];
        this.serviceReportCntValue = [];
        this.tableViewData = [];
        data.resp.forEach(el => {
          this.serviceReportCntValue.push(el[0]);
          this.serviceReportCntHeader.push(el[1]);
          let Obj = {
            channel : el[1],
            cnt: el[0]
          }
          this.tableViewData.push(Obj);
        });
        this.loadBarChart();
      }
    })
  }

  loadBarChart(){
    this.canvasBar = document.getElementById('myBarChart');
    this.ctxBar = this.canvasBar.getContext('2d');
    let myChart = new Chart(this.ctxBar, {
      type: 'bar',
      data: {
          labels: this.serviceReportCntHeader,
          datasets: [{
              label: '# of Votes',
              data: this.serviceReportCntValue,
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        backgroundColor: false
      }
    });
  }

  graphView(){

    $("#tableView").css("display", "none");
    $("#myBarChart").css("display", "block");
  }

  tableView(){
    $("#myBarChart").css("display", "none");
    $("#tableView").css("display", "block");
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
    this.selectedDate = {"fromdate" :  new Date(this.daterange.start._d).toISOString().split('T')[0], "todate" : new Date(this.daterange.end._d).toISOString().split('T')[0]}

    console.log(this.selectedDate);
    this.getTransactionByChannelNew(JSON.stringify(this.selectedDate));
    //this.popOverClicked();
  }

}
