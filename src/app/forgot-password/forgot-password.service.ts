import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor() { }

  forgotPasswordCall(formData) {
    var inputData = {
      "userid" : formData.username,
      "emailid" : formData.emailId
    }
    return inputData;
  }
}
