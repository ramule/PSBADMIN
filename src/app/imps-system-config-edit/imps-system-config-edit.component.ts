import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe, DatePipe } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';

import { ImpsSystemConfigEditService } from './imps-system-config-edit.service';
import { browserRefresh } from '../app.component';

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-system-config-edit',
  templateUrl: './imps-system-config-edit.component.html',
  styleUrls: ['./imps-system-config-edit.component.css']
})
export class ImpsSystemConfigEditComponent implements OnInit {

  systemConfigEditForm: FormGroup;
  systemConfigData: any;
  sysConfigurationData: any = [];
  formErrors = {
    id: '',
    value: ''
  }

  userId: any;
  remarkHistoryArr :any=[];


  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant : AppConstants,
    private commonMethod : CommonMethods,
    public titlecasePipe : TitleCasePipe,
    public datePipe: DatePipe,
    private impsSystemConfigEditService: ImpsSystemConfigEditService
  ) { }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsSystemConfigEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.systemConfigEditForm = this.form.group({
      id: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required])
    });
    this.systemConfigEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.systemConfigEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsSystemConfig');
      return;
    }

    this.commonServiceCall.pageName = "Edit System Configuration";
    this.systemConfigData = this.location.getState();
    this.buildForm();
    this.getSystemConfigById(this.systemConfigData.id);
  }

  getSystemConfigById(id) {

    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.getSysConfigDataByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.sysConfigurationData = res.result[0];

        console.log(res);
        this.systemConfigEditForm.patchValue({
          id: res.result[0].id,
          value: res.result[0].value
        });
      }
      else {
        this.errorCallBack(this.appConstant.getSysConfigDataByIdUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  update(){
    this.formValidation.markFormGroupTouched(this.systemConfigEditForm);
    if (this.systemConfigEditForm.valid) {
      var formData = this.systemConfigEditForm.value;
      var param = this.impsSystemConfigEditService.updateSysConfigCall(formData, this.sysConfigurationData) ;
      this.updateSystemConfig(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.systemConfigEditForm, this.formErrors, false)
    }
  }

  updateSystemConfig(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstant.updateSysConfigDataUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      console.log("add invProduct response: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.updateSysConfigDataUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.sysConfigurationData), 'update')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        this.errorCallBack(this.appConstant.updateSysConfigDataUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  cancel() {
    this.router.navigateByUrl('/impsSystemConfig')
  }

}
