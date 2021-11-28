import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { ForgotPasswordService } from './forgot-password.service';
declare var showToastMessage: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  formErrors = {
    username: '',
    emailId: '',
  }
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private forgotPasswordService: ForgotPasswordService
  ) { }

  public buildForm() {
    this.forgotPasswordForm = this.form.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      emailId: new FormControl('', [Validators.required,Validators.maxLength(50), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]),
    });
    this.forgotPasswordForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.forgotPasswordForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  goToLogin() {
    this.formValidation.markFormGroupTouched(this.forgotPasswordForm);
    if (this.forgotPasswordForm.valid) {
      console.log(this.forgotPasswordForm.value);
      var param = this.forgotPasswordService.forgotPasswordCall(this.forgotPasswordForm.value);
      this.apiForgotPassword(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.forgotPasswordForm, this.formErrors, false)
    }
  }

  apiForgotPassword(params) {
    console.log('request params: ', params);
    this.commonMethod.showLoader();
    this.commonServiceCall.authResponsePromise(this.appConstants.forgotPasswordUrl, params).subscribe((data) => {
      var res = data.resp;
      console.log('response params: ', res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response params: ', res);
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl('/login');
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.forgotPasswordUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.forgotPasswordUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

}
