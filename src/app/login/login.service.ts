import { Injectable } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { CommonDataShareService } from '../common-data-share.service';
declare var showToastMessage: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public dataCode;
  isBometric: boolean = false;
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    private router: Router,
    private appConstant: AppConstants,
    private commonMethod: CommonMethods,
    private commonDataShareService: CommonDataShareService
  ) { }

  /* Method to return OMNI login params */
  getLoginCredential(formData){
    var inputData={
      "userid":formData.username,
      "password":formData.password,
      "biometricflag":"false",
      "latitude": this.commonDataShareService.user_lat,
      "longitude": this.commonDataShareService.user_lon,
      "clientIp": this.commonDataShareService.user_IP,
      "os": this.commonMethod.getOSName(),
      "browser": this.commonMethod.getBrowserName()
    };
    return inputData;
  }

  /* Method to return Active Directory login params */
  getADLoginCredential(formData){
    var inputData={
      "userid":formData.cn,
      "password":formData.password,
      "biometricflag":"false",
      "base": formData.cn
    };
    return inputData;
  }

  validateOtpCall(formData) {
    var inputData = {
      "userid": this.commonDataShareService.user_ID,
      "otp": formData.otp
    };
    return inputData;
  }

  resendOtpCall() {
    var inputData = {
      "userid": this.commonDataShareService.user_ID,
      "phonenumber": this.commonServiceCall.phonenumber,
      "email": this.commonServiceCall.emailId
    };
    return inputData;
  }
}
