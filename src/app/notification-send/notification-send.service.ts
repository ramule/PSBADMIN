import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { Location } from '@angular/common';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class NotificationSendService {

  user_ID;
  notification;
  constructor(
    private commonDataService: CommonDataShareService,
    private location: Location,
    public commonMethod: CommonMethods
  ) { }

  setSendNotificationParams(formData,custList) {
    this.user_ID = this.commonDataService.user_ID;
   var sendNotificationArr = [];
   custList.forEach(customer => {
     if(customer.isCustNameChecked){
      var obj ={
        "customerId": customer.id,
        "notificationMsg": formData.message,
        "appId": customer.appid,
        "activityId": 7,
        "rrn": "anc1",
        "createdBy": this.user_ID,
        "statusId": customer.statusid,
        "lastResentOn": "",
        "resendBy": this.user_ID,
        "type": formData.notificationId
      }
       sendNotificationArr.push(obj)
     }
   });
    return sendNotificationArr;
  }

  addAuditTrailAdaptorParams(URL,operation) {
     //   this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Notifications Send',
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
