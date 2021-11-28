import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MessageCodeMasterEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  updateMessageCodeCall(formdata, id, messageCodeData, selectedChannel){
    var param = {
      "id": id,
      "shortName": formdata.messageCodeName,
      "activityId": messageCodeData.activityId,
      "activityCodeName": messageCodeData.activityCodeName,
      "errorCode": formdata.errorCode,
      "statusId": formdata.statusId,
      "appId": formdata.productType,
      "i18nCode": formdata.languagecode,
      "description": formdata.messageCodeDesc,
      "appName": selectedChannel,
      "createdon": messageCodeData.createdon,
      "createdby": messageCodeData.createdby,
      "updatedby": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ""
    }
    return param;
  }

  updateMessageCodeWithRemarkCall(formdata, id, messageCodeData, remarkData, selectedChannel) {
    var inputData = {
      "id": id,
      "shortName": formdata.messageCodeName,
      "activityId": messageCodeData.activityId,
      "activityCodeName": messageCodeData.activityCodeName,
      "errorCode": formdata.errorCode,
      "statusId": formdata.statusId,
      "appId": formdata.productType,
      "appName": selectedChannel,
      "i18nCode": formdata.languagecode,
      "description": formdata.messageCodeDesc,
      "createdon": messageCodeData.createdon,
      "createdby": messageCodeData.createdby,
      "updatedby": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark":  remarkData.remark
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        //this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Message Code Master Edit',
            "category":"Master",
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
