import { Injectable } from '@angular/core';

import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class NotificationDetailsService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  getResendParam(item) {
    var inputData = {
      "id": item.id,
      "notificationMsg": item.notificationMsg,
      "type": item.type,
      "typeName": item.typeName,
      "mobile": item.mobile,
      "email": item.email,
      "customerId": item.customerId,
      "appId": item.appId,
      "activityId": item.activityId,
      "rrn": item.rrn,
      "createdOn": item.createdOn,
      "createdBy": item.createdBy,
      "statusId": item.statusId,
      "lastResentOn": item.lastResentOn,
      "resendBy": item.resendBy,
      "customerName": item.customerName
    }

    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
     //   this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Notifications Details',
            "category":"Notifications",
            "action":operation,
            "properties":URL,
            "IP":this.commonDataService.user_IP,
            "X-FORWARDEDIP":this.commonDataService.user_IP,
            "Lat":this.commonDataService.user_lat,
            "Lon":this.commonDataService.user_lon,
            "Browser":this.commonMethod.getBrowserName(),
            "Device":"",
            "OS":this.commonMethod.getOSName(),
            "CHANNELID":"4",
            "CREATEDBY":this.commonDataService.user_ID,
            "CREATEDBYNAME":this.commonDataService.user_Name,
             "UPDATEDBY":this.commonDataService.user_ID,
            "UPDATEDBYNAME":this.commonDataService.user_Name,
            "authorization":"0"
     
        }
        return inputData;
      }
}
