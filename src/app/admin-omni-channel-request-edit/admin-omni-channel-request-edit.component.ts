import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe } from '@angular/common';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { AdminOmniChannelRequestEditService } from './admin-omni-channel-request-edit.service';
import { browserRefresh } from '../app.component';
declare var showToastMessage: any;
declare var $: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;


@Component({
  selector: 'app-admin-omni-channel-request-edit',
  templateUrl: './admin-omni-channel-request-edit.component.html',
  styleUrls: ['./admin-omni-channel-request-edit.component.css']
})
export class AdminOmniChannelRequestEditComponent implements OnInit {
  beforeParams: any;
  transactionAmount: any;
  finNonfinVal: any;
  omniChannelReqForm: FormGroup;
  generateOtpRequest;
  otpForm: FormGroup;
  statusId;
  formErrors = {
    serviceType: '',
    mobileNo: '',
  }

  otpFormError = {
    otp: ''
  };
  maskMobileNo: any;


  //feild parameter
  masterStatus = [];
  selectedUser = [];
  userId: any;
  userDtl: any;
  txnAmt: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private titlecasePipe: TitleCasePipe,
    private omniChannelReqEditService: AdminOmniChannelRequestEditService
  ) { }


  public buildForm() {
    this.omniChannelReqForm = this.form.group({
      custName: new FormControl({ value: '', disabled: true }),
      serviceType: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      mobileNo: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      status: new FormControl({ value: '', disabled: true }),
      transAmt: new FormControl({ value: '', disabled: true }),
      refNo: new FormControl({ value: '', disabled: true }),
    });
    this.omniChannelReqForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.omniChannelReqForm, this.formErrors, true)
    });

    this.otpForm = this.form.group({
      otp: new FormControl('', [Validators.required])
    });
    this.otpForm.valueChanges.subscribe((data) => {
      this.otpFormError = this.formValidation.validateForm(this.otpForm, this.otpFormError, true)
    });
  }

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.router.navigateByUrl('/adminOmniChannelReq');
      return;
    }

    this.userDtl = this.location.getState();
    this.buildForm();
    console.log(this.userDtl);
    this.getOmniChannelDetailReq(this.userDtl.value.id);
    this.commonServiceCall.pageName = "Edit Omni Channel Request";
  }


  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.omniChannelReqEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
    })
  }

  //on load functions


  getOmniChannelDetailReq(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getOmniChannelRequestById + param).subscribe((data) => {
      var res = data.resp;
      var result = res.result[0];
      console.log(res);
      if (res.responseCode == "200") {
        this.statusId = result.statusid;
        this.finNonfinVal = result.ft_nft;
        this.beforeParams = result;
        this.transactionAmount = JSON.parse(result.content).amount;
        console.log(result)
        console.log(result[0])
        this.commonMethod.hideLoader();
        this.omniChannelReqForm.patchValue({
          custName: result.custname,
          serviceType: result.servicetype != null ? this.titlecasePipe.transform(result.servicetype) : '-',
          mobileNo: result.mobile,
          status: result.statusname != null ? this.titlecasePipe.transform(result.statusname) : '-',
          transAmt: JSON.parse(result.content).amount ? JSON.parse(result.content).amount : '-',
          refNo: result.refno
        });
        this.maskMobileNo = this.commonMethod.maskMobileNumber(result.mobile);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getOmniChannelRequestById, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  submitOtp() {
    this.formValidation.markFormGroupTouched(this.otpForm);
    if (this.otpForm.valid) {
      var formData = this.otpForm.value;
      var param = this.omniChannelReqEditService.validateOtpRequestCall(formData, this.userDtl.value.id, this.statusId)
      this.validateOtp(param);
    }
    else {
      this.otpFormError = this.formValidation.validateForm(this.otpForm, this.otpFormError, false)
    }
  }

  validateOtp(param) {
    console.log('request params: ', param);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.validateOtpRequestUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.validateOtpRequestUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        this.router.navigateByUrl('/adminOmniChannelReq');
      }
      else {
        showToastMessage(res.responseMessage);
      }
      this.otpForm.reset();
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstant.validateOtpRequestUrl, res);
      closeTinyModel();
    })
  }

  saveOmniChannelReq() {
    this.formValidation.markFormGroupTouched(this.omniChannelReqForm);
    if (this.omniChannelReqForm.valid) {
      var formData = this.omniChannelReqForm.value;
      var param = {
        "id": this.userDtl.value.id,
        "customerId": this.userDtl.value.customerid,
        "serviceType": formData.serviceType,
        "mobile": formData.mobileNo
      }
      if (this.userDtl.status == 24 && this.userDtl.statusname == "PENDING AT OTP") {
        //TODO : Add OTP screen and implement otp api
        this.updateOmniChannelReq(param);
      } else {
        showToastMessage("You Cannot Perform This Action");
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.omniChannelReqForm, this.formErrors, false)
    }

  }
  cancel() {
    this.router.navigateByUrl("/adminOmniChannelReq");
  }

  updateOmniChannelReq(param) {
    this.commonMethod.showLoader();
    var userDetails = JSON.parse(this.commonServiceCall.userCredential);
    this.commonServiceCall.postResponsePromise(this.appConstant.proceedOmniChannelRequest + userDetails.role_ID, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        // showToastMessage(res.responseMessage);
        showToastMessage("Data has been saved successfully");
        this.commonMethod.hideLoader();
        this.router.navigateByUrl('/adminOmniChannelReq');
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.proceedOmniChannelRequest, res);
      }

    })
  }


  closeActionModel() {
    this.otpForm.reset();
    closeTinyModel();
  }

  sendOtpRequest(req) {
    $('#resend').css('display', 'none');
    this.generateOtpRequest = req;
    this.formValidation.markFormGroupTouched(this.omniChannelReqForm);
    if (this.omniChannelReqForm.valid) {
      var formData = this.omniChannelReqForm.value;
      var param = this.omniChannelReqEditService.generateOtpRequestCall(formData, this.userDtl.value.id, this.statusId)
      this.generateOtp(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.omniChannelReqForm, this.formErrors, false)
    }
  }

  generateOtp(param) {
    console.log('request params: ', param);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.generateOtpRequestUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        if (this.generateOtpRequest == 'fund_transfer') {
          openTinyModel();
        }
        else if (this.generateOtpRequest == 'resend_otp') {
          console.log('resend otp');
          $('#resend').css('display', 'block');
        }
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.generateOtpRequestUrl, res);
      }
    })
  }

}
