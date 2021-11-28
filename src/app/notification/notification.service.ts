import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  user_ID;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  addNotificationData(formData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputdata = {
      "appId": formData.productType,
      "notificationId": formData.notificationId,
      "shortName":formData.shortname,
      "contents":formData.contents,
      "targetTitle1":formData.targettitle1,
      "targetAction1":formData.targetaction1,
      "targetTitle2":formData.targettitle2,
      "targetAction2":formData.targetaction2,
      "targetTitle3":formData.targettitle3,
      "targetAction3":formData.targetaction3,
      "targetTitle4":formData.targettitle4,
      "targetAction4":formData.targetaction4,
      "languagecode":formData.langCode,
      "statusId":formData.status,
      "createdby": this.user_ID,
      "createdon":"",
    }
    //      "createdon":formData.,
    return inputdata;
    console.log(formData)
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

