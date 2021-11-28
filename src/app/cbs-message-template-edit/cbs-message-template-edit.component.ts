import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from '@angular/common';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CbsMessageTemplateEditService } from './cbs-message-template-edit.service';
import { browserRefresh } from '../app.component';

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-cbs-message-template-edit',
  templateUrl: './cbs-message-template-edit.component.html',
  styleUrls: ['./cbs-message-template-edit.component.css']
})
export class CbsMessageTemplateEditComponent implements OnInit {

  msgTemplateId: any;
  selectedMsgTemplate: any = [];
  cbsMessageTemplateEditForm: FormGroup;
  formErrors = {
    errorCode: '',
    errorMessage: '',
    sms: '',
    smsTemplate: '',
    email: '',
    emailTemplate: '',
    push: '',
    pushTemplate: '',
    inApp: '',
    inAppTemplate: '',
  };

  selModel: any;
  masterStatus: any = [];
  productTypes: any = [];
  calculatorName: any = [];

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private cbsMessageTemplateEditService: CbsMessageTemplateEditService
  ) { }


  public buildForm() {
    this.cbsMessageTemplateEditForm = this.form.group({
      errorCode: new FormControl('', [Validators.required]),
      errorMessage: new FormControl('', [Validators.required]),
      sms: new FormControl('', [Validators.required]),
      smsTemplate: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      emailTemplate: new FormControl('', [Validators.required]),
      push: new FormControl('', [Validators.required]),
      pushTemplate: new FormControl('', [Validators.required]),
      inApp: new FormControl('', [Validators.required]),
      inAppTemplate: new FormControl('', [Validators.required]),
    });
    this.cbsMessageTemplateEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.cbsMessageTemplateEditForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.cancel();
      return;
    }

    this.msgTemplateId = this.location.getState();
    console.log(this.msgTemplateId);
    this.commonServiceCall.pageName = "Edit CBS Message Template";
    this.buildForm();
    this.getMessageTemplateById(this.msgTemplateId.id);
    this.cbsMessageTemplateEditForm.patchValue({
      statusId: 3
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.cbsMessageTemplateEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getMessageTemplateById(id) {
    var param = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCbsMessageTemplateByIdUrl, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result[0]);
        this.selectedMsgTemplate = res.result[0];

        this.cbsMessageTemplateEditForm.patchValue({
          errorCode: res.result[0].errorcode,
          errorMessage: res.result[0].errormessage,
          sms: res.result[0].sms,
          email: res.result[0].email,
          push: res.result[0].push,
          inApp: res.result[0].inapp,
          smsTemplate: res.result[0].smstemplate,
          emailTemplate: res.result[0].emailtemplate,
          inAppTemplate: res.result[0].inapptemplate,
          pushTemplate: res.result[0].pushtemplate,
        });

      } else {
        this.errorCallBack(this.appConstants.getCbsMessageTemplateByIdUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  editCbsMessageTemplate() {
    this.formValidation.markFormGroupTouched(this.cbsMessageTemplateEditForm);
    if (this.cbsMessageTemplateEditForm.valid) {
      var formData = this.cbsMessageTemplateEditForm.value;
      var param = this.cbsMessageTemplateEditService.getCbsMessageTemplateEditParam(this.msgTemplateId.id, formData);
      this.updateCbsMessageTemplate(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.cbsMessageTemplateEditForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl("/cbsMessageTemplate");
  }

  updateCbsMessageTemplate(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCbsMessageTemplateUrl, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCbsMessageTemplateUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.selectedMsgTemplate), 'update')
        this.cancel();
      } else {
        showToastMessage(res.responseMessage);
        this.errorCallBack(this.appConstants.updateCbsMessageTemplateUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
