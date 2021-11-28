import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { ActivitySettingEditService } from './activity-setting-edit.service';
import { browserRefresh } from '../app.component';
declare var $: any;
declare var showToastMessage: any;
@Component({
  selector: 'app-activity-setting-edit',
  templateUrl: './activity-setting-edit.component.html',
  styleUrls: ['./activity-setting-edit.component.css']
})
export class ActivitySettingEditComponent implements OnInit {
  activitySettingEditForm: FormGroup;
  activitySettingId: any;
  formErrors = {
    activityName: '',
    tpin: '',
    otp: '',
    maker: '',
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
    private activitySettingEditService: ActivitySettingEditService
  ) { }

  public buildForm() {
    this.activitySettingEditForm = this.form.group({
      activityName: new FormControl('', [Validators.required]),
      tpin: new FormControl('', [Validators.required]),
      otp: new FormControl('', [Validators.required]),
      maker: new FormControl('', [Validators.required]),
      checker: new FormControl('', [Validators.required]),
    });
    this.activitySettingEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.activitySettingEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.router.navigateByUrl('/activitysetting');
      return;
    }

    this.commonServiceCall.pageName = "Edit Mobile Activity Setting";
    this.activitySettingId = this.location.getState();
    this.buildForm();
    this.getActivitySettingById(this.activitySettingId.id);
  }


  getActivitySettingById(id) {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getActivitySettingById + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.activitySettingEditForm.patchValue({
          activityName: res.result[0].activityName,
          tpin: res.result[0].tpinAllowd,
          otp: res.result[0].otpAllowed,
          maker: res.result[0].maker,
          checker: res.result[0].checker,
        })
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAdaptrSrcChannelById, res);
      }
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


  gotoActivitySetting() {
    this.router.navigateByUrl("/activitysetting");
  }

  update() {
    this.formValidation.markFormGroupTouched(this.activitySettingEditForm);
    if (this.activitySettingEditForm.valid) {
      var formData = this.activitySettingEditForm.value;
      var param = this.activitySettingEditService.updateActivitySettingCall(formData, this.activitySettingId.id)
      this.updateChannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.activitySettingEditForm, this.formErrors, false)
    }
  }

  updateChannel(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateActivitySetting, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/activitysetting");
      }
      else {
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateAdapterSrcChannel, res);
    })
  }

}
