import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ResetPasswordService } from './reset-password.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  isUsernameAndMobileValidated: boolean = false;
  userValidateData: any = {
    id: '',
    usermasterid: '',
    userToken: '',
    username: '',
    mobile: '',
    email: '',
  };

  formErrors = {
    username: '',
    password: '',
    cnfPassword: '',
    mobileNo: '',
    otp: ''
  }
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private resetPasswordService: ResetPasswordService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    $('#pwd').hide();
    $('#cnfPwd').hide();
    $('#otp').hide();

    // this method to validate password link is expired or not
    // this.validatePwdLink();
  }

  public buildForm() {
    this.resetPasswordForm = this.form.group({
      username: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      cnfPassword: new FormControl(''),
      otp: new FormControl(''),
    });
    this.resetPasswordForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.resetPasswordForm, this.formErrors, true);
    });
  }

  validatePwdLink() {
    var params = this.resetPasswordService.validatePwdCall(this.userValidateData.userToken);
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.validatePwdRestLinkUrl, params)
    .subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
      } else {
        this.errorCallBack(this.appConstants.validatePwdRestLinkUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onGetOtpCall() {
    if(this.resetPasswordForm.valid) {

      var param = this.resetPasswordService.generateOtpCall(this.userValidateData);
      this.generateOtp(param)
      /*
      this.isUsernameAndMobileValidated = true;
      showToastMessage('OTP Sent to your registered Mobile Number');

      this.resetPasswordForm.controls["username"].setValidators([]);
      this.resetPasswordForm.controls["username"].updateValueAndValidity();

      this.resetPasswordForm.controls["mobileNo"].setValidators([]);
      this.resetPasswordForm.controls["mobileNo"].updateValueAndValidity();

      this.resetPasswordForm.controls["password"].setValidators([Validators.required]);
      this.resetPasswordForm.controls["password"].updateValueAndValidity();

      this.resetPasswordForm.controls["cnfPassword"].setValidators([Validators.required]);
      this.resetPasswordForm.controls["cnfPassword"].updateValueAndValidity();

      this.resetPasswordForm.controls["otp"].setValidators([Validators.required]);
      this.resetPasswordForm.controls["otp"].updateValueAndValidity();

      $('#pwd').show();
      $('#cnfPwd').show();
      $('#otp').show();
      $('#username').hide();
      $('#mob').hide();
      */
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.resetPasswordForm, this.formErrors, false);
    }
  }

  generateOtp(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.generateOTPForForgetPwdUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.isUsernameAndMobileValidated = true;
        this.resetPasswordForm.controls["username"].setValidators([]);
        this.resetPasswordForm.controls["username"].updateValueAndValidity();

        this.resetPasswordForm.controls["mobileNo"].setValidators([]);
        this.resetPasswordForm.controls["mobileNo"].updateValueAndValidity();

        this.resetPasswordForm.controls["password"].setValidators([Validators.required]);
        this.resetPasswordForm.controls["password"].updateValueAndValidity();

        this.resetPasswordForm.controls["cnfPassword"].setValidators([Validators.required]);
        this.resetPasswordForm.controls["cnfPassword"].updateValueAndValidity();

        this.resetPasswordForm.controls["otp"].setValidators([Validators.required]);
        this.resetPasswordForm.controls["otp"].updateValueAndValidity();

        $('#pwd').show();
        $('#cnfPwd').show();
        $('#otp').show();
        $('#username').hide();
        $('#mob').hide();
      } else {
        this.errorCallBack(this.appConstants.generateOTPForForgetPwdUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  onResetPassword() {
    if(this.resetPasswordForm.valid) {
      if(this.resetPasswordForm.get('password').value != this.resetPasswordForm.get('cnfPassword').value) {
        var param = this.resetPasswordService.validateOtpAndChangePwd(this.resetPasswordForm.value, this.userValidateData);
        // showToastMessage('Please Enter Valid Confirm Password');
        this.resetPassword(param);
      }
      else {
        showToastMessage('Password Reset successful');
      }
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.resetPasswordForm, this.formErrors, false);
    }
  }

  resetPassword(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.validateOtpAndChangePwdUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
      } else {
        this.errorCallBack(this.appConstants.validateOtpAndChangePwdUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

}
