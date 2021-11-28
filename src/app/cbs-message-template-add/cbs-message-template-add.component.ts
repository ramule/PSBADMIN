import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CbsMessageTemplateAddService } from './cbs-message-template-add.service';

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-cbs-message-template-add',
  templateUrl: './cbs-message-template-add.component.html',
  styleUrls: ['./cbs-message-template-add.component.css']
})
export class CbsMessageTemplateAddComponent implements OnInit {

  cbsMessageTemplateAddForm: FormGroup;
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
    private cbsMessageTemplateAddService: CbsMessageTemplateAddService
  ) { }


  public buildForm() {
    this.cbsMessageTemplateAddForm = this.form.group({
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
    this.cbsMessageTemplateAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.cbsMessageTemplateAddForm, this.formErrors, true)
    });
  }

  ngOnInit() {

    this.commonServiceCall.pageName = "Add Calculator Formula";
    this.buildForm();
    this.cbsMessageTemplateAddForm.patchValue({
      statusId: 3
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.cbsMessageTemplateAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  addCbsMessageTemplate() {
    this.formValidation.markFormGroupTouched(this.cbsMessageTemplateAddForm);
    if (this.cbsMessageTemplateAddForm.valid) {
      var formData = this.cbsMessageTemplateAddForm.value;
      var param = this.cbsMessageTemplateAddService.getCbsMessageTemplateAddParam(formData);
      this.saveCbsMessageTemplate(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.cbsMessageTemplateAddForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl("/cbsMessageTemplate");
  }

  saveCbsMessageTemplate(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addCbsMessageTemplateUrl, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.addCbsMessageTemplateUrl + "\n" + "Params=" + JSON.stringify(param), 'add')
        this.cancel();
      } else {
        this.errorCallBack(this.appConstants.addCbsMessageTemplateUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
