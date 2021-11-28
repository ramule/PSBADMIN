import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { Location } from '@angular/common';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class NotificationEditService {

  user_ID;
  notification;
  createdon;
  constructor(
    private commonDataService: CommonDataShareService,
    private location: Location,
    public commonMethod: CommonMethods
  ) { }

  updateNotificationCall(formData) {
    this.createdon = this.commonDataService.notificationTemplate.createdon;
    this.user_ID = this.commonDataService.user_ID;
    this.notification = this.location.getState();
    var inputData = {
      "id": this.notification.id,
      "appId": formData.productType,
      "notificationId": formData.notificationId,
      "shortName": formData.shortname,
      "contents": formData.contents,
      "targetTitle1": formData.targettitle1,
      "targetAction1": formData.targetaction1,
      "targetTitle2": formData.targettitle2,
      "targetAction2": formData.targetaction2,
      "targetTitle3": formData.targettitle3,
      "targetAction3": formData.targetaction3,
      "targetTitle4": formData.targettitle4,
      "targetAction4": formData.targetaction4,
      "languagecode": formData.langCode,
      "statusId": formData.status,
      "createdby": this.user_ID,
      "createdon": this.createdon
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Notifications Template',
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
