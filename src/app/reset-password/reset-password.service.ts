import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor() { }

  validatePwdCall(usertoken) {
    var inputData = {
      "usertoken": usertoken
    }
    return inputData;
  }

  generateOtpCall(userValidateData) {
    var inputData = {
      "usertoken": userValidateData.userToken,
      "mobile": userValidateData.mobile
    }
    return inputData;
  }

  validateOtpAndChangePwd(formdata, userValidateData) {
    var inputData = {
      "usertoken": userValidateData.userToken,
      "userNewPassword": formdata.password,
      "otp": formdata.otp,
      "usermasterid": userValidateData.usermasterid
    }
    return inputData;
  }
}
