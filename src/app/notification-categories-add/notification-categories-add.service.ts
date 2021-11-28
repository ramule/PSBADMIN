import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';


import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class NotificationCategoriesAddService {

  user_ID:any;
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
     public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  getNotificationCategoriesAddCall(formData){
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "categoryName": formData.categoryName,
      "createdBy": this.user_ID,
      "updatedBy": this.user_ID,
      "statusId": formData.statusId,
      "appId": formData.appId,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  getNotificationCategoriesWithRemarkCall(formData, remarkData){
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "categoryName": formData.categoryName,
      "createdBy": this.user_ID,
      "updatedBy": this.user_ID,
      "statusId": formData.statusId,
      "appId": formData.appId,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
       // this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Notification Categories',
            "category":"Administartion",
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
