import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class RmMasterEditService {

  rmMaster;
  user_ID;
  constructor(
    private commonDataService: CommonDataShareService,
    private location: Location,
    public commonMethod: CommonMethods
  ) { }

  updateRmMastercall(formData,obj) {
    this.rmMaster = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inpurData = {
      "id": this.rmMaster.id,
      "createdby": obj.createdby,
      "updatedby": this.user_ID,
      "statusId": formData.status,
      "rmId": formData.rmId,
      "rmName": formData.rmName,
      "appId": formData.productType,
      "createdon":obj.createdon,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inpurData;
  }

  updateRmMastercallWithRemark(formData,obj,remarkData) {
    this.rmMaster = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inpurData = {
      "id": this.rmMaster.id,
      "createdby": obj.createdby,
      "updatedby": this.user_ID,
      "statusId": formData.status,
      "rmId": formData.rmId,
      "rmName": formData.rmName,
      "appId": formData.productType,
      "createdon":obj.createdon,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inpurData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'RM Master',
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
