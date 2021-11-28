import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
import { DatePipe } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
declare var $: any
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var jQuery: any;
import * as moment from 'moment'



@Component({
  selector: 'app-audit-activity-log',
  templateUrl: './audit-activity-log.component.html',
  styleUrls: ['./audit-activity-log.component.css']
})
export class AuditActivityLogComponent implements OnInit {

  id = 7;
  menuLink = "auditActivityLog";
  priviledgeDataArr: any = [];
  auditLogForm: FormGroup;
  formErrors = {
    fromDate: '',
    toDate: '',
    //  channel: ''
  }

  showForm: boolean = false;
  toDateValid: boolean = false;
  isToDateValidError: any;
  todayDate: any;
  productTypes = [];
  activityLog: any = [];
  status: any = [];
  p: number = 1;
  message = '';
  showGraph: boolean = false;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstants: AppConstants,
    public datePipe: DatePipe,
    public commonDataService: CommonDataShareService
  ) { }

  public buildForm() {
    this.auditLogForm = this.form.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      // channel: new FormControl('', [Validators.required])
    });
    this.auditLogForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.auditLogForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.buildForm();
    this.getProductType();
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.commonServiceCall.pageName = "Activity Log";
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = {
      "ChannelName": "DESKTOP",
      "channelRequest": URL,
      "eventName": 'Activity Log',
      "category": "Audit",
      "action": operation,
      "properties": URL,
      "IP": this.commonDataService.user_IP,
      "X-FORWARDEDIP": this.commonDataService.user_IP,
      "Lat": this.commonDataService.user_lat,
      "Lon": this.commonDataService.user_lon,
      "Browser": this.commonMethod.getBrowserName(),
      "Device": "",
      "OS": this.commonMethod.getOSName(),
      "CHANNELID": "4",
      "CREATEDBY": this.commonDataService.user_ID,
      "CREATEDBYNAME": this.commonDataService.user_Name,
      "UPDATEDBY": this.commonDataService.user_ID,
      "UPDATEDBYNAME": this.commonDataService.user_Name,
      "authorization": "0"
    }

    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (!this.priviledgeDataArr.viewChecked) {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  onDateChange(value) {
    var dateFirst = new Date(value.fromDate);
    var dateSecond = new Date(value.toDate);
    // time difference
    var timeDiff = Math.abs(dateSecond.getTime() - dateFirst.getTime());

    // days difference
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (value.fromDate != "" && value.toDate != "") {
      if (value.toDate < value.fromDate) {
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* From date can't be greater than to date";
      }
      else if (diffDays > 7) {
        this.toDateValid = true;
        this.isToDateValidError = "* Please select date range within 7 days";
      }
      else {
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }

  cancel() {
    this.commonMethod.cancel();
  }

  // showHideForm(){
  //   this.showForm = !this.showForm
  // }

  addAuditLog() {
    this.formValidation.markFormGroupTouched(this.auditLogForm);
    if (this.auditLogForm.valid) {
      if (this.toDateValid) { return; }

      var formData = this.auditLogForm.value;
      var param = {
        fromdate: formData.fromDate,
        todate: formData.toDate
      }
      this.saveLocationType(param, formData.channel);
    } else {
      this.formErrors = this.formValidation.validateForm(this.auditLogForm, this.formErrors, false)
    }
  }



  getProductType() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe(data => {
      if (data.status) {
        console.log("roles", data.resp);
        this.productTypes = data.resp;
      }
      else {
        this.commonMethod.errorMessage(data);
      }

    })
  }



  filterProduct() {
    return this.productTypes.filter(x => x.shortName == "WALLET" || x.shortName == "MOBILE" || x.shortName == "DESKTOP" || x.shortName == "TAB" || x.shortName == "AGENCYBANKING" || x.shortName == "BOTS" || x.shortName == "CORPORATE" || x.shortName == "IVR" || x.shortName == "WHATSAPP" || x.shortName == "ALEXA");
  }

  saveLocationType(param, appId) {
    //  $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getAllTrasactionLog, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {

        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllTrasactionLog + "\n" + "Params=" + JSON.stringify(param), 'view')

        this.activityLog = [];
        this.showGraph = false
        this.commonMethod.hideLoader();
        data.resp.result.forEach(el => {
          console.log(el.message1)
          let Obj = {
            'Third Party Ref No': el.thirdpartyrefno,
            'ServiceRef No': el.servicerefno,
            RRN: el.rrn,
            'Request Response': el.req_RES,
            'Customer Id': el.customerid,
            'Customer Name': el.customername,
            Amount: el.amount,
            Status: el.status,
            'Mobile Number': el.mobile,
            'Display Name': el.displayname,
            'Channel Name': el.shortname,
            'Created Date': moment(el.createdon).format("YYYY-MM-DD"),
            'Created By': el.createdByName,
            Message: JSON.stringify(el.message1)

          }
          this.activityLog.push(Obj);
        });
        this.loadPivotGraph();
      } else {
        this.showGraph = true
        setTimeout(function () {

        })
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllTrasactionLog, res);
      }
    })
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  loadPivotGraph() {
    // var renderers = $.extend($.pivotUtilities.renderers,
    //   $.pivotUtilities.export_renderers);
    var derivers = $.pivotUtilities.derivers;
    var renderers = $.extend($.pivotUtilities.renderers,
      $.pivotUtilities.plotly_renderers, $.pivotUtilities.export_renderers);
    $("#output").pivotUI(
      this.activityLog,
      {
        renderers: renderers,
        sorters: {
          "Created Date": function (a, b) {
            return moment(a, "YYYY-MM-DD").diff(moment(b, "YYYY-MM-DD"));
          }
        }
      });
  }

  openPopup(item) {
    console.log(item);
    this.message = item.message1
    openTinyModel()
  }

  closeActionModel() {
    closeTinyModel();
  }

}
