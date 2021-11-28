import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { BulkNotificationSendService } from './bulk-notification-send.service';
declare var showToastMessage: any;
declare var $ :any;
@Component({
  selector: 'app-bulk-notification-send',
  templateUrl: './bulk-notification-send.component.html',
  styleUrls: ['./bulk-notification-send.component.css']
})
export class BulkNotificationSendComponent implements OnInit {

  sendNotificationForm: FormGroup;
  notificationType: any = "Push";
  sendNotificationTo: any = "All";
  formErrors = {
    notificationMessage: '',
    mobileNo: ''
  }
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public datePipe: DatePipe,
    public bulkNotificationSendService:BulkNotificationSendService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Send Notification";
    this.buildForm();
  }


  public buildForm() {
    this.sendNotificationForm = this.form.group({
      notificationMessage: new FormControl('', [Validators.required]),
    });
    this.sendNotificationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.sendNotificationForm, this.formErrors, true)
    });
  }

  cancel() {
    this.commonMethod.cancel();
  }

  SendNotificationDetails() {
    if(this.sendNotificationForm.valid) {
      var param = this.bulkNotificationSendService.sendBulkNotificationCall(this.sendNotificationForm.value, this.sendNotificationTo, this.notificationType);
      this.sendNotification(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.sendNotificationForm, this.formErrors, false)
    }
  }

  sendNotification(params) {
    console.log('request params: ', params);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.sendNotificationToAllUrl, params).subscribe((data) => {
      var res = data.resp;
      console.log('response params: ', res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response params: ', res);
        showToastMessage(res.responseMessage);
      } else {
        this.commonMethod.hideLoader();
        //    this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.sendNotificationToAllUrl+"\n"+"Params="+JSON.stringify(params),'update')
        this.errorCallBack(this.appConstants.sendNotificationToAllUrl, res);
      }
    });
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  setNotificationType(type:string){
    this.notificationType = type;
  }

  setNotificationTo(type: string) {
    this.sendNotificationTo = type;
    if(this.sendNotificationTo == "Mobile") {
      this.sendNotificationForm.addControl("mobileNo", new FormControl("", [Validators.required, Validators.minLength(10)]))
    }
    else {
      this.sendNotificationForm.removeControl('mobileNo');
    }

  }

}
