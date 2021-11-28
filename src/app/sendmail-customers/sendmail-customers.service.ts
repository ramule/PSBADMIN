import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendmailCustomersService {

  constructor() { }

  sendMailApiCall(APIName, Parameters, EmailsArray) {
    var inputData = {
      "api_name": APIName,
      "columanNames": Parameters,
      "emailList": EmailsArray
    }
    return inputData;
  }
}
