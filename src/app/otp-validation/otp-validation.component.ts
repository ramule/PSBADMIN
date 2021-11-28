import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OtpAPIService } from './otp-api.service';
import { CommonMethods } from '../common-methods';
import { CommonDataShareService } from '../common-data-share.service';
import { Location } from '@angular/common';
import { FormValidationsService } from '../form-validations.service';
import { OnInit, Component } from '@angular/core';
declare var showToastMessage: any;

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css'],
  providers: [OtpAPIService]
})
export class OtpValidationComponent implements OnInit {
  public registrationData: any;
  otpForm: FormGroup;
  public formErrors = {
    otp: ''
  };
  userMerchant: boolean = false;
  platform;
  constructor(private location: Location, private form: FormBuilder,
    private otpService: OtpAPIService,
    private router: Router,
    private commonMethod: CommonMethods,
    private formValidation : FormValidationsService
  ) { }

  public buildForm() {
    this.otpForm = this.form.group({
      otp: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(6)])
    });

    this.otpForm.get('otp').valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.otpForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.buildForm();
  }


  otpValidation(data) {
    this.formValidation.markFormGroupTouched(this.otpForm);
    if (this.otpForm.valid) {
        var requestData = this.otpService.otpValidationCall(data);
    } else {
      this.formErrors = this.formValidation.validateForm(this.otpForm, this.formErrors, false)
    }
  }

  resendOtp() {
    this.otpForm.reset();
    var requestData = this.otpService.resendOtpCall();
    //Resend OTP Api call
  }

  otpBackCall() {
   
  }

 
 
}
