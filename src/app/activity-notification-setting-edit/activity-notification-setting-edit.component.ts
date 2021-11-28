import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from '@angular/common';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ActivityNotificationSettingEditService } from './activity-notification-setting-edit.service';
import { browserRefresh } from '../app.component';
declare var $: any;
declare var showToastMessage: any;
@Component({
  selector: 'app-activity-notification-setting-edit',
  templateUrl: './activity-notification-setting-edit.component.html',
  styleUrls: ['./activity-notification-setting-edit.component.css']
})
export class ActivityNotificationSettingEditComponent implements OnInit {
  activityNotifiactionSettingEditForm: FormGroup;
  activitySettingId: any;
  selectedActivityData: any;
  formErrors = {
    activityName: '',
    email: '',
    sms: '',
    push: '',
    checker: '',
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private activityNotificationSettingEditService: ActivityNotificationSettingEditService
  ) { }

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.router.navigateByUrl('/activityNotificationSetting');
      return;
    }

    this.commonServiceCall.pageName = "Edit Activity Notification Setting";
    this.activitySettingId = this.location.getState();
    this.buildForm();
    this.getActivityNotificationSettingById(this.activitySettingId.id);
  }

  public buildForm() {
    this.activityNotifiactionSettingEditForm = this.form.group({
      activityName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      sms: new FormControl('', [Validators.required]),
      push: new FormControl('', [Validators.required]),
    });
    this.activityNotifiactionSettingEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.activityNotifiactionSettingEditForm, this.formErrors, true)
    });
  }

  getActivityNotificationSettingById(id) {
    var param = {
      "id": id
    }
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getAllActivityNotificationsByIdUrl;
    this.commonServiceCall.postResponsePromise(reqUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.selectedActivityData = res.result[0];
        this.activityNotifiactionSettingEditForm.patchValue({
          activityName: res.result[0].displayname,
          email: res.result[0].email,
          sms: res.result[0].sms,
          push: res.result[0].push,
        })
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllActivityNotificationsByIdUrl, res);
      }
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


  gotoNotificationActivitySetting() {
    this.router.navigateByUrl("/activityNotificationSetting");
  }

  update() {
    this.formValidation.markFormGroupTouched(this.activityNotifiactionSettingEditForm);
    if (this.activityNotifiactionSettingEditForm.valid) {
      var formData = this.activityNotifiactionSettingEditForm.value;
      var param = this.activityNotificationSettingEditService.updateActivitySettingCall(formData, this.selectedActivityData)
      this.updateActivity(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.activityNotifiactionSettingEditForm, this.formErrors, false)
    }
  }

  updateActivity(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveActivityNotificationUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/activityNotificationSetting");
      }
      else {
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.saveActivityNotificationUrl, res);
    })
  }

}
