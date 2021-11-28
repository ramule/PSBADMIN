import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
import { DatePipe } from '@angular/common';
import { AdapterAuditLogService } from './adapter-audit-log.service';
declare var $: any
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var jQuery: any;
import * as moment from 'moment'
import { CommonDataShareService } from '../common-data-share.service';


@Component({
  selector: 'app-adapter-audit-log',
  templateUrl: './adapter-audit-log.component.html',
  styleUrls: ['./adapter-audit-log.component.css']
})
export class AdapterAuditLogComponent implements OnInit {

  // id = 69;
  menuLink = "adapterAuditLog";
  priviledgeDataArr: any = [];
  auditLogForm: FormGroup;
  formErrors = {
    fromDate: '',
    toDate: '',
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
    public adapterAuditLogService: AdapterAuditLogService,
    public commonData: CommonDataShareService
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
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    //this.getStatus();
    this.commonServiceCall.pageName = "Adapter Audit Log";
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.adapterAuditLogService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
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

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonData.roleTypeId;
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
        this.isToDateValidError = "* Please enter valid date";
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


  getAuditLog() {
    this.formValidation.markFormGroupTouched(this.auditLogForm);
    if (this.auditLogForm.valid) {
      if (this.toDateValid) { return; }

      var formData = this.auditLogForm.value;
      var param = {
        fromdate: formData.fromDate,
        todate: formData.toDate
      }
      this.getAuditLogDetails(param, formData.channel);
    } else {
      this.formErrors = this.formValidation.validateForm(this.auditLogForm, this.formErrors, false)
    }
  }






  getAuditLogDetails(param, appId) {
    //  $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getAdapterAuditLogByDate, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.showGraph = false
        this.activityLog = []
        this.commonMethod.hideLoader();
        data.resp.result.forEach(el => {
          console.log(el.message1)
          let Obj = {
            'Id': el.id,
            'Adapter IP': el.adapter_IP,
            'Mobile Number': el.mobile_NO,
            'Message Type': el.msg_TYPE,
            'Channel Name': el.adapter_CHANNEL,
            'Created Date': moment(el.created_ON).format("YYYY-MM-DD"),
            'Created By': el.createdByName,
            'Logs': JSON.stringify(el.message),
            'RRN': el.rrn,
            'Channel Reference Number': el.channel_REF_NO
          }
          this.activityLog.push(Obj);
        });
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAdapterAuditLogByDate + "\n" + "Params=" + JSON.stringify(param), 'view')
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
