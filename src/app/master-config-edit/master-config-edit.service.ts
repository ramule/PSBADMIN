import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Injectable({
  providedIn: 'root'
})
export class MasterConfigEditService {

user_ID;
  masterConfig:any;
  constructor(
    private location: Location,
    private commonDataService: CommonDataShareService,
    public commonServiceCall: HttpCommonServiceCallService,
        public commonMethod: CommonMethods
  ) { }

  updateConfigMasterById(formData, masterConfigData) {
    this.masterConfig = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id"  :  this.masterConfig.id ,
      "configKey"  :  formData.configKey ,
      "configValue"  :  formData.configValue ,
      "description"  : formData.description,
      "statusId" : formData.status,
      "createdBy" : masterConfigData.createdBy,
      "appId" : formData.productName,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateConfigMasterDataWithRemarks(formData, masterConfigData, remarkData) {
    this.masterConfig = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inputdata = {
      "id"  :  this.masterConfig.id ,
      "configKey"  :  formData.configKey ,
      "configValue"  :  formData.configValue ,
      "description"  : formData.description,
      "statusId" : formData.status,
      "createdBy" : masterConfigData.createdBy,
      "appId" : formData.productType,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputdata;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Config Master',
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
