import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import * as Chart from "chart.js";
//import * as $ from 'jquery';
import { DaterangepickerConfig } from "ng2-daterangepicker";
import * as moment from "moment";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { CommonDataShareService } from "../common-data-share.service";
import { browserRefresh } from '../app.component';
declare var google: any;
declare var $: any;
declare var showToastMessage: any;
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {

  public daterange: any = {};
  public isGraphSelectedByActDate = true;
  public isListSelectedByActDate = false;
  public isGraphSelectedByChannel = true;
  public isListSelectedByChannel = false;
  public isGraphSelectedByReg = true;
  public isListSelectedByReg = false;
  public hideCustomerRegByDate = false;
  public hideCustomerRegByDateNoData = true;
  public hideActivityCountDate = false;
  public hideActivityCountDateNoData = true;
  public hideFinancialActivityCountDate = false;
  public hideFinancialActivityCountDateNoData = true;
  public hideAdapterAuditLogByDate = false;
  public hideAdapterAuditLogByDateNoData = true;
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: "D MMM YYYY" },
    alwaysShowCalendars: false,
    startDate: moment().startOf("month")
  };

  id = 1;
  menuLink = "dashboard";
  priviledgeDataArr: any = [];
  canvasLine: any;
  ctxLine: any;

  canvasPie: any;
  ctxPie: any;

  canvasBar: any;
  ctxBar: any;

  financialGView: boolean = true;
  financialTView: boolean = false;
  financialActivity: any = [];
  channelActivityCount: any = [];
  registrationCount: any = [];

  //activity by date
  acctivityDateCntValue: any = [];
  acctivityDateCntHeader: any = [];

  //activity count by channel
  acctivityCntValue: any = [];
  acctivityCntHeader: any = [];

  //activity by
  acctivityCustRegValue: any = [];
  acctivityCustRegValueSuccess: any = [];
  acctivityCustRegHeader: any = [];
  activityCustRegTotalCount: any = [];

  //Adapter Audit by
  activityLog: any = [];

  //other variable
  roleType: any = "retail";
  graphType: boolean = false;
  selectedDate: any = {};
  todayDate = new Date();

  myChartPie: any;
  myChartLine: any;
  myChartBar: any;

  HeaderArray: any = [];
  ColorArray: any = [];

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private daterangepickerOptions: DaterangepickerConfig,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private datePipe: DatePipe,
    public commonData: CommonDataShareService
  ) {
    var output = document.getElementById("linechart");

    document.addEventListener("fullscreenchange", (event) => {
      if (document.fullscreenElement) {
        console.log(
          `Element: ${document.fullscreenElement.id} entered full-screen mode.`
        );
      } else {
        $("#linechart_title").css("display", "none");
        $("#barchart_title").css("display", "none");
        $("#piechart_title").css("display", "none");
      }
    });

    this.daterangepickerOptions.settings = {
      locale: { format: "D MMM YYYY" },
      startDate: moment().startOf("month"),
      endDate: moment(),
      maxDate: new Date(),
      alwaysShowCalendars: false,
      opens: "left",
      ranges: {
        "Last 15 Days": [moment().subtract(14, "days"), moment()],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "This Month": [moment().startOf("month"), moment()],
        "Last Quarter": [moment().subtract(3, "month"), moment()],
        "Last Year": [moment().subtract(1, "year"), moment()],
      },
    };
  }

  ngOnInit(): void {

    // this.commonData.browserRefresh = false;
    // this.commonData.browserRefresh = browserRefresh;
    // console.log('refreshed?:', browserRefresh);

    // if(this.commonData.browserRefresh) {
    //   this.router.navigateByUrl('/login');
    //   return
    // }

    this.commonMethod.hideLoader();
    console.log('common method loginRequestUrl: ', this.commonMethod.loginRequestUrl);
    //calling lat long function
    if (
      this.commonData.user_lat == "" ||
      this.commonData.user_lat == undefined
    ) {
      this.commonMethod.getLatLon();
    }

    this.commonServiceCall.pageName = "Customers Login By Location";
    this.financialGView = true;
    this.financialTView = false;
    $("#financialView").css("display", "none");
    $("#activityView").css("display", "none");
    $("#customerView").css("display", "none");

    // this.loadCountBychannel(this.roleType);
    // this.loadCustomerCountByDate(this.roleType);
    // this.loadCountByDate(this.roleType);
    // google.maps.event.addDomListener(window, 'load', this.initialize.bind(this));
    // this.initialize();
    console.log(this.options.startDate);
    this.getPriviledgeData();
  }

  getPriviledgeData() {
    var url =
      this.appConstants.getPriviledgeDataUrl +
      this.id +
      "/" + localStorage.getItem('roleTypeId')
      // this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          var value = {
            start: moment().startOf("month"),
            end: moment(),
          };
          this.selectedDate1(value, this.daterange);

        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  //onValueChange
  selectedType(value) {
    console.log(value);
    this.roleType = value;
    this.loadCountBychannel(value);
    this.loadCustomerCountByDate(value);
    this.loadCountByDate(value);
  }

  //on popover click
  popOverClicked() {
    this.graphType = !this.graphType;
  }

  //api call
  loadCustomerCountByDate(roleType) {
    var req = "message/getCustomerCountByDate/" + roleType;
    this.commonServiceCall.postResponsePromise(req).subscribe((data) => {
      console.log("my data ===>", data);
      if (data.status) {
        this.acctivityDateCntValue = [];
        this.acctivityDateCntHeader = [];
        this.financialActivity = [];
        data.resp.forEach((el) => {
          this.acctivityDateCntValue.push(el[1]);
          this.acctivityDateCntHeader.push(el[0]);
          let Obj = {
            date: el[0],
            cnt: el[1],
          };
          this.financialActivity.push(Obj);
        });
        //this.loadLineChart();
      }
    });
  }
  loadCountBychannel(roleType) {
    var req = "message/getCountBychannel/" + roleType;
    this.commonServiceCall.getResponsePromise(req).subscribe((data) => {
      if (data.status) {
        this.acctivityCntValue = [];
        this.acctivityCntHeader = [];
        this.channelActivityCount = [];
        data.resp.forEach((el) => {
          this.acctivityCntValue.push(el[1]);
          this.acctivityCntHeader.push(el[0]);
          let Obj = {
            channel: el[0],
            cnt: el[1],
          };
          this.channelActivityCount.push(Obj);
        });
        this.loadPieChart();
      }
    });
  }

  loadCountByDate(roleType) {
    var req = "message/getCountByDate/" + roleType;
    this.commonServiceCall.getResponsePromise(req).subscribe((data) => {
      if (data.status) {
        this.acctivityCustRegValue = [];
        this.acctivityCustRegHeader = [];
        this.registrationCount = [];
        data.resp.forEach((el) => {
          this.acctivityCustRegValue.push(el[2]);
          this.acctivityCustRegHeader.push(el[1]);
          let Obj = {
            date: el[1],
            cnt: el[2],
          };
          this.registrationCount.push(Obj);
        });
        this.loadBarChart();
      }
    });
  }

  //on filter
  getCustomerCountByDate(roleType, param) {
    // var req = 'message/getCustomerCountByDateNew';
    this.commonMethod.destroyDataTable();
    var req = "message/getActivityLogCountByDate";
    this.commonServiceCall
      .postResponsePromise(req, param)
      .subscribe((data) => {
        if (data.status) {
          this.acctivityDateCntValue = [];
          this.acctivityDateCntHeader = [];
          this.financialActivity = [];
          if (data.resp.result != null) {
            // Display list for line chart
            data.resp.result.forEach((el) => {
              let Obj = {
                date: el[1],
                type: el[0],
                cnt: el[2],
              };
              this.financialActivity.push(Obj);
            });
            this.commonMethod.setDataTableChat("dt-sample");

            var boderColor = [
              "#708090",
              "#800000",
              "#87CEEB",
              "#CD853F",
              "#196F3D",
              "#616A6B",
              "#922B21",
              "#7D3C98",
              "#D98880",
            ];

            var mapData = [];
            var _data = [];
            var _displayDate = [];
            var _obj = {};

            var borderColorCnt = 0;
            data.resp.result.forEach((el) => {
              if (el[0] == "FT") var typename = "Financial Transactions";
              else typename = "Non Financial Transactions";
              if (mapData.length == 0) {
                _data = [el[2]];
                _displayDate = [this.datePipe.transform(el[1], "yyyy/MM/dd")];
                _obj = {
                  data: _data,
                  diaplayDate: _displayDate,
                  label: typename,
                  borderColor: boderColor[borderColorCnt],
                  backgroundColor: boderColor[borderColorCnt],
                  // borderColor: boderColor[Math.floor(Math.random() * 9) + 1],
                  fill: false,
                };
                mapData.push(_obj);
                borderColorCnt++;
              } else {
                var cnt = 0;
                mapData.forEach((e) => {
                  if (e.label == typename) {
                    cnt++;
                    e.data.push(el[2]);
                    e.diaplayDate.push(
                      this.datePipe.transform(el[1], "yyyy/MM/dd")
                    );
                  }
                });
                if (cnt == 0) {
                  _data = [el[2]];
                  _displayDate = [this.datePipe.transform(el[1], "yyyy/MM/dd")];
                  _obj = {
                    data: _data,
                    diaplayDate: _displayDate,
                    label: typename,
                    borderColor: boderColor[borderColorCnt],
                    backgroundColor: boderColor[borderColorCnt],
                    fill: false,
                  };
                  mapData.push(_obj);
                  borderColorCnt++;
                }
              }
            });
            this.hideFinancialActivityCountDate = false;
            this.hideFinancialActivityCountDateNoData = true;
            console.log(this.financialActivity);
            this.loadLineChart(mapData);
          } else {
            this.hideFinancialActivityCountDate = true;
            this.hideFinancialActivityCountDateNoData = false;
          }
        }
      });
  }
  getCountBychannel(roleType, param) {
    //var req = 'message/getCountBychannelNew';
    this.commonMethod.destroyDataTable2();
    var req = "message/getChannelCount";
    this.commonServiceCall
      .postResponsePromise(req, param)
      .subscribe((data) => {
        if (data.status) {
          this.acctivityCntValue = [];
          this.acctivityCntHeader = [];
          this.channelActivityCount = [];
          if (data.resp.result != null) {
            data.resp.result.forEach((el) => {
              this.acctivityCntValue.push(el[1]);
              this.acctivityCntHeader.push(el[0]);
              let Obj = {
                channel: el[0],
                cnt: el[1],
              };
              this.channelActivityCount.push(Obj);
            });
            this.commonMethod.setDataTableChat("dt-sample2");
            this.hideActivityCountDate = false;
            this.hideActivityCountDateNoData = true;
            this.loadPieChart();
          } else {
            this.hideActivityCountDate = true;
            this.hideActivityCountDateNoData = false;
          }
        }
      });
  }

  getAdapterAuditLogByDate(param) {
    param = {
      fromdate: this.datePipe.transform(this.daterange.start._d, "yyyy-MM-dd"),
      todate: this.datePipe.transform(this.daterange.end._d, "yyyy-MM-dd"),
    };
    console.log('adapter audit log req params: ', param);
    this.commonServiceCall
      .postResponsePromise(this.appConstants.getAdapterAuditLogByDate, param)
      .subscribe((data) => {
        console.log(data);
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.activityLog = [];
          // this.commonMethod.hideLoader();
          data.resp.result.forEach((el) => {
            let Obj = {
              Id: el.id,
              "Adapter IP": el.adapter_IP,
              "Mobile Number": el.mobile_NO,
              "Message Type": el.msg_TYPE,
              "Channel Name": el.adapter_CHANNEL,
              "Created Date": moment(el.created_ON).format("YY-MM-DD"),
              Logs: JSON.stringify(el.message),
              RRN: el.rrn,
              "Channel Reference Number": el.channel_REF_NO,
            };
            this.activityLog.push(Obj);
          });
          this.hideAdapterAuditLogByDate = false;
          this.hideAdapterAuditLogByDateNoData = true;
          this.loadPivotGraph();
          // this.initialize(this.selectedDate);
        } else {
          this.hideAdapterAuditLogByDate = true;
          this.hideAdapterAuditLogByDateNoData = false;
          // this.commonMethod.hideLoader();
          // this.initialize(this.selectedDate);
          //  this.errorCallBack(this.appConstants.getAdapterAuditLogByDate, res);
        }
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  getCountByDate(roleType, param) {
    //var req = 'message/getCountByDateNew';
    this.commonMethod.destroyDataTable1();
    var req = "message/getCustomerCount";
    this.commonServiceCall
      .postResponsePromise(req, param)
      .subscribe((data) => {
        if (data.status) {
          if (data.resp.result != null) {
            this.acctivityCustRegValue = [];
            this.acctivityCustRegHeader = [];
            this.acctivityCustRegValueSuccess = [];
            this.activityCustRegTotalCount = [];
            this.registrationCount = [];
            data.resp.result.forEach((el) => {
              this.acctivityCustRegValue.push(el[1]);
              this.acctivityCustRegHeader.push(el[0]);
              this.acctivityCustRegValueSuccess.push(el[2]);
              this.activityCustRegTotalCount.push(el[3]);
              let Obj = {
                date: el[0],
                pendingCnt: el[1],
                cnt: el[2],
                totalCnt: el[3],
              };
              this.registrationCount.push(Obj);
            });
            this.commonMethod.setDataTableChat("dt-sample1");
            this.hideCustomerRegByDate = false;
            this.hideCustomerRegByDateNoData = true;

            console.log(this.acctivityCustRegValue);
            console.log(this.acctivityCustRegHeader);
            this.loadBarChart();
          } else {
            this.hideCustomerRegByDate = true;
            this.hideCustomerRegByDateNoData = false;
          }
        }
      });
  }

  //load pivot graph
  loadPivotGraph() {
    // var renderers = $.extend($.pivotUtilities.renderers,
    //   $.pivotUtilities.export_renderers);
    var derivers = $.pivotUtilities.derivers;
    var renderers = $.extend(
      $.pivotUtilities.renderers,
      $.pivotUtilities.plotly_renderers,
      $.pivotUtilities.export_renderers
    );
    $("#output").pivotUI(this.activityLog, {
      renderers: renderers, //
      // cols: ["Mobile Number"], rows: ["Channel Name"],
      //  rendererName: "Horizontal Stacked Bar Chart",
      // rowOrder: "value_a_to_z", colOrder: "value_z_to_a",
    });
  }

  //graph load
  loadPieChart() {
    this.HeaderArray = [];
    this.ColorArray = [];
    if (typeof this.myChartPie != "undefined") {
      this.myChartPie.destroy();
    }

    this.canvasPie = document.getElementById("myPieChart");
    this.ctxPie = this.canvasPie.getContext("2d");
    var data = this.acctivityCntHeader;
    this.acctivityCntHeader = [];
    data.forEach((el) => {
      if (el == "BOTS") {
        this.HeaderArray.push("BOTS");
        this.ColorArray.push("rgba(97, 255, 113, 1)");
      } else if (el == "DESKTOP") {
        this.HeaderArray.push("DESKTOP");
        this.ColorArray.push("rgba(54, 162, 235, 1)");
      } else if (el == "MOBILE") {
        this.HeaderArray.push("MOBILE");
        this.ColorArray.push("rgba(255, 206, 86, 1)");
      } else if (el == "WALLET") {
        this.HeaderArray.push("WALLET");
        this.ColorArray.push("rgba(54, 78, 134, 1)");
      } else if (el == "CORPORATE") {
        this.HeaderArray.push("CORPORATE");
        this.ColorArray.push("rgba(111, 98, 155, 1)");
      } else if (el == "SMARTWATCH") {
        this.HeaderArray.push("SMARTWATCH");
        this.ColorArray.push("rgba(122, 255, 255, 1)");
      }
    });

    // var labelCount = this.acctivityCntHeader
    // var backgroundColors;
    // if(labelCount.length == 1)
    // {
    //     switch(labelCount[0])
    //     {
    //      case 'BOTS':
    //      backgroundColors =  ['rgba(97, 255, 113, 1)']
    //      break;
    //      case 'DESKTOP':
    //      backgroundColors =  ['rgba(54, 162, 235, 1)']
    //      break;
    //      case 'MOBILE':
    //      backgroundColors =  ['rgba(255, 206, 86, 1)']
    //      break;
    //      case 'WALLET':
    //      backgroundColors =  ['rgba(54, 78, 134, 1)']
    //      break;
    //     }
    // }
    // else
    // {
    //     backgroundColors =  [
    //     'rgba(97, 255, 113, 1)',
    //     'rgba(54, 162, 235, 1)',
    //     'rgba(255, 206, 86, 1)',
    //     'rgba(54, 78, 134, 1)'
    //   ]
    // }

    this.myChartPie = new Chart(this.ctxPie, {
      type: "pie",
      data: {
        labels: this.HeaderArray,
        datasets: [
          {
            label: "# of Votes",
            data: this.acctivityCntValue,
            backgroundColor: this.ColorArray,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
    if (this.isGraphSelectedByChannel == true) {
      $("#activityView").css("display", "none");
      $("#myPieChart").css("display", "block");
    } else {
      $("#activityView").css("display", "block");
      $("#myPieChart").css("display", "none");
    }
  }

  getFullscreenGraph(chartid) {
    var elem = document.getElementById(chartid);
    elem.requestFullscreen();
    $("#linechart_title").css("display", "block");
    $("#piechart_title").css("display", "block");
    $("#barchart_title").css("display", "block");
  }

  loadLineChart(mapData) {
    if (typeof this.myChartLine != "undefined") {
      this.myChartLine.destroy();
    }

    console.log(this.acctivityDateCntHeader);
    console.log(this.acctivityDateCntValue);
    this.canvasLine = document.getElementById("myChart");
    this.ctxLine = this.canvasLine.getContext("2d");
    this.myChartLine = new Chart(this.ctxLine, {
      type: "line",
      data: {
        labels: mapData[0].diaplayDate,
        // datasets: [{
        //     label: ['FT','NFT'],
        //     data: [{120:90},{130:150},{180:200},{70:45}],
        //     borderWidth: 1,
        //     backgroundColor:'rgb(161, 231, 255)',
        //     borderColor:'rgba(0, 180, 241, 1)',
        // }]
        datasets: mapData,
      },
      options: {
        responsive: true,
        backgroundColor: false,
        scales: {
          xAxes: [
            {
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
                labelString: "Count",
              },
            },
          ],
        },
      },
    });

    if (this.isGraphSelectedByActDate == true) {
      $("#financialView").css("display", "none");
      $("#myChart").css("display", "block");
    } else {
      $("#financialView").css("display", "block");
      $("#myChart").css("display", "none");
    }
  }

  loadBarChart() {
    if (typeof this.myChartBar != "undefined") {
      this.myChartBar.destroy();
    }

    this.canvasBar = document.getElementById("myBarChart");
    this.ctxBar = this.canvasBar.getContext("2d");
    this.myChartBar = new Chart(this.ctxBar, {
      type: "bar",
      data: {
        labels: this.acctivityCustRegHeader,
        datasets: [
          {
            label: "Pending",
            data: this.acctivityCustRegValue,
            borderWidth: 1,
            backgroundColor: "#800000",
            borderColor: "#7E57C2",
          },
          {
            label: "Success",
            data: this.acctivityCustRegValueSuccess,
            borderWidth: 1,
            backgroundColor: "rgba(54, 162, 235, 1)",
            borderColor: "#FFCA28",
          },
        ],
      },
      options: {
        responsive: true,
        backgroundColor: false,
        scales: {
          xAxes: [
            {
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Date",
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Count",
              },
            },
          ],
        },
      },
    });
    if (this.isGraphSelectedByReg == true) {
      $("#customerView").css("display", "none");
      $("#myBarChart").css("display", "block");
    } else {
      $("#customerView").css("display", "block");
      $("#myBarChart").css("display", "none");
    }
  }

  graphView(type) {
    if (type == "Financial") {
      $("#financialView").css("display", "none");
      $("#myChart").css("display", "block");
      this.isGraphSelectedByActDate = true;
      this.isListSelectedByActDate = false;
    } else if (type == "Activity") {
      $("#activityView").css("display", "none");
      $("#myPieChart").css("display", "block");
      this.isGraphSelectedByChannel = true;
      this.isListSelectedByChannel = false;
    } else if (type == "Customer") {
      $("#customerView").css("display", "none");
      $("#myBarChart").css("display", "block");
      this.isGraphSelectedByReg = true;
      this.isListSelectedByReg = false;
    }
  }

  tableView(type) {
    if (type == "Financial") {
      $("#myChart").css("display", "none");
      $("#financialView").css("display", "block");
      this.isGraphSelectedByActDate = false;
      this.isListSelectedByActDate = true;
    } else if (type == "Activity") {
      $("#myPieChart").css("display", "none");
      $("#activityView").css("display", "block");
      this.isGraphSelectedByChannel = false;
      this.isListSelectedByChannel = true;
    } else if (type == "Customer") {
      $("#myBarChart").css("display", "none");
      $("#customerView").css("display", "block");
      this.isGraphSelectedByReg = false;
      this.isListSelectedByReg = true;
    }
  }

  logout() {
    var params = {
      "userid": this.commonData.user_ID
    }
    this.commonServiceCall.postResponsePromise(this.appConstants.logoutUrl, params).subscribe((resp) => {
      console.log(resp);
      if (resp.status) {
        //this.commonServiceCall.authToken = '';
        localStorage.clear();
        this.commonServiceCall.userCredential = {};
        sessionStorage.setItem("userCredential", "");
        this.router.navigateByUrl("/login");
      } else {
      }
    });
  }

  public selectedDate1(value: any, datepicker?: any) {
    // document.getElementById('map').innerHTML = "";
    if(document.getElementById('map') != null) {
      document.getElementById('map').innerHTML = "";
    }
 //   this.commonMethod.showLoader();
    // this is the date  selected
    console.log(this.isGraphSelectedByActDate);
    console.log(this.isListSelectedByActDate);
    console.log(this.isGraphSelectedByChannel);
    console.log(this.isListSelectedByChannel);
    console.log(this.isGraphSelectedByReg);
    console.log(this.isListSelectedByReg);
    console.log(value);

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // use passed valuable to update state
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
    this.selectedDate = {
      fromdate: this.datePipe.transform(this.daterange.start._d, "yyyy-MM-dd"),
      todate: this.datePipe.transform(this.daterange.end._d, "yyyy-MM-dd"),
      type: "retail",
    };
    $("#dateRangeInput").val(
      this.datePipe.transform(this.selectedDate.fromdate, "dd MMM yyyy") +
        " - " +
        this.datePipe.transform(this.selectedDate.todate, "dd MMM yyyy")
    );
    console.log(this.selectedDate);
    // this.getCustomerCountByDate(
    //   this.roleType,
    //   this.selectedDate
    // );
    // this.getCountBychannel(this.roleType, this.selectedDate);
    // this.getCountByDate(this.roleType, this.selectedDate);
    // this.getAdapterAuditLogByDate(this.selectedDate);
    setTimeout(() => {
      this.initialize(this.selectedDate);
    }, 2000);
    this.popOverClicked();
  }

  initialize(param) {
    console.log('maps params: ', param);
    var mapOptions = {
      zoom: 3,
      center: { lat: 19.076, lng: 72.8777 },
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.commonServiceCall
      .postResponsePromise(this.appConstants.getCustLocation, param)
      .subscribe((data) => {
        var resp = data.resp;
        if (resp.result != null && resp.result.length > 0) {
          var arrLatLng = [];
          for (var i = 0; i < resp.result.length; i++) {
            //for (var i = 0; i < 5; i++) {
            var temp = resp.result[i];

            arrLatLng.push({ lat: temp[0], lon: temp[1] });
          }
          //console.log(arrLatLng);
          for (i = 0; i < arrLatLng.length; i++) {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(
                arrLatLng[i].lat,
                arrLatLng[i].lon
              ),
              map: map,
            });

            var infowindow = new google.maps.InfoWindow({
              content: "<p>Marker Location:" + marker.getPosition() + "</p>",
            });

            google.maps.event.addListener(marker, "click", function () {
              infowindow.open(map, marker);
            });
          }
        }
      });
  }

  //https://infrabotsdev.infrasofttech.com/UploadOffer/message/getCustomerCountByDate/retail
  //https://infrabotsdev.infrasofttech.com/UploadOffer/message/getCountBychannel/retail
  //https://infrabotsdev.infrasofttech.com/UploadOffer/message/getCountByDate/retail
}
