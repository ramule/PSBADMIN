import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CustomerNotificationCategoriesEditService {

  constructor(
    private commonDataService: CommonDataShareService,
        public commonMethod: CommonMethods
  ) { }

  setCustNotificationCategoriesCall(formData, user_ID, custInfo)
  {
    var inputdata = {

      "id":custInfo.id,
      "customerId":custInfo.customerId,
      "categoryId": custInfo.categoryId,
      "fromTime": formData.fromTime,
      "toTime": formData.toTime,
      "createdBy": custInfo.createdBy,
      "createdOn": custInfo.createdOn,
      "statusId": formData.status,
      "appId": custInfo.appId,
      "updatedBy": user_ID,
      "role_ID": this.commonDataService.roleId,
      "user_ID": user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    //      "createdon":formData.,
    console.log(inputdata)
    return inputdata;

  }

  setCustNotificationCategoriesWithRemarkCall(formData, user_ID,custInfo, remarkData)
  {
    var inputdata = {

      "id":custInfo.id,
      "customerId":custInfo.customerId,
      "categoryId": custInfo.categoryId,
      "fromTime": formData.fromTime,
      "toTime": formData.toTime,
      "createdBy": custInfo.createdBy,
      "createdOn": custInfo.createdOn,
      "statusId": formData.status,
      "appId": custInfo.appId,
      "updatedBy": user_ID,
      "role_ID": this.commonDataService.roleId,
      "user_ID": user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    //      "createdon":formData.,
    console.log(inputdata)
    return inputdata;
  }

  addAuditTrailAdaptorParams(URL,operation) {
       // this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Customer Notification Categories',
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
