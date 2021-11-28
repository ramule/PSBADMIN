import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BulkNotificationSendService {

  constructor() { }

  sendBulkNotificationCall(formdata, sendNotificationTo, notificationType) {
    var inputData = {
      "type": notificationType,
      "notificationMsg": formdata.notificationMessage,
      "sendNotificationTo": sendNotificationTo,
      "mobile": formdata.mobileNo ? formdata.mobileNo : ""
    }
    return inputData;
  }
}
