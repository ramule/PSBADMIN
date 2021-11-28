import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { AdminActivitySettingEditService } from './admin-activity-setting-edit.service';
import { browserRefresh } from '../app.component';
declare var $: any;
declare var showToastMessage: any;
@Component({
  selector: 'app-admin-activity-setting-edit',
  templateUrl: './admin-activity-setting-edit.component.html',
  styleUrls: ['./admin-activity-setting-edit.component.css']
})
export class AdminActivitySettingEditComponent implements OnInit {
  activityAdminSettingEditForm: FormGroup;
  activityAdminSettingId: any;
  checkerValue: any;
  approverValue: any;
  formErrors = {
    activityName: '',
    maker: '',
    checker: '',
    approver: ''
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
    private activityAdminSettingEditService: AdminActivitySettingEditService
  ) { }

  public buildForm() {
    this.activityAdminSettingEditForm = this.form.group({
      activityName: new FormControl('', [Validators.required]),
      maker: new FormControl( '', [Validators.required]),
      checker: new FormControl('', [Validators.required]),
      approver: new FormControl( '', [Validators.required]),
    });
    this.activityAdminSettingEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.activityAdminSettingEditForm, this.formErrors, true)
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

    this.commonServiceCall.pageName = "Edit Admin Activity Setting";
    this.activityAdminSettingId = this.location.getState();
    this.buildForm();
    this.getActivitySettingById(this.activityAdminSettingId.id);
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
        this.checkerValue = res.result[0].checker;
        this.approverValue = res.result[0].approver;
        this.activityAdminSettingEditForm.patchValue({
          activityName: res.result[0].activityName,
          maker: res.result[0].maker,
          checker: res.result[0].checker,
          approver: res.result[0].approver,
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

  onCheckerValueChange(event) {
    console.log('Checker value: ', event.target.value);
    this.checkerValue = event.target.value;

    if(this.checkerValue == 'N') {
      this.activityAdminSettingEditForm.patchValue({
        approver: this.checkerValue
      });
    }
    else {
      this.activityAdminSettingEditForm.patchValue({
        approver: ""
      });
    }
  }

  update() {
    this.formValidation.markFormGroupTouched(this.activityAdminSettingEditForm);
    if (this.activityAdminSettingEditForm.valid) {
      var formData = this.activityAdminSettingEditForm.value;
      var param = this.activityAdminSettingEditService.updateActivitySettingCall(formData, this.activityAdminSettingId.id)
      this.updateChannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.activityAdminSettingEditForm, this.formErrors, false)
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
