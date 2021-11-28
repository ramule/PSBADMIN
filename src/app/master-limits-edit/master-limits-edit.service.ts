import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterLimitsEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }
  getEditLimitsParam(formdata, id, masterLimitData){
    var inputData = {
      "id":id,
      "appId": formdata.productType,
      "activityId": '1',
      "limitName": formdata.limitName,
      "frequency": formdata.frequency,
      "minimumValue": formdata.minval,
      "maximumValue": formdata.maxval,
      "createdBy": masterLimitData.createdBy,
      "updatedBy": this.commonDataService.user_ID,
      "statusId": formdata.statusId,
      "createdOn": this.commonDataService.masterLimits.createdOn,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  getEditLimitsParamWithRemark(formdata, id, masterLimitData, remarkData){
    var inputData = {
      "id":id,
      "appId": formdata.productType,
      "activityId": '1',
      "limitName": formdata.limitName,
      "frequency": formdata.frequency,
      "minimumValue": formdata.minval,
      "maximumValue": formdata.maxval,
      "createdBy": masterLimitData.createdBy,
      "updatedBy": this.commonDataService.user_ID,
      "statusId": formdata.statusId,
      "createdOn": this.commonDataService.masterLimits.createdOn,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {

        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Limits Master',
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
