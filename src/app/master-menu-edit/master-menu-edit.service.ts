import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Injectable({
  providedIn: 'root'
})
export class MasterMenuEditService {

  user_ID;
  masterMenu: any;
  constructor(
    private location: Location,
    private commonDataService : CommonDataShareService,
    public commonMethod: CommonMethods,
    public commonServiceCall:HttpCommonServiceCallService
  ) { }

  updateMasterMenuCall(formData, menuData) {
    this.user_ID = this.commonDataService.user_ID;
    this.masterMenu = this.location.getState();
    var inputData = {
      "id": this.masterMenu.id,
      "menuname": formData.menuName,
      "statusId": formData.status,
      "createdon": menuData.createdon,
      "createdby":this.user_ID,
      "updatedby":this.user_ID,
      "menuLogo": formData.logoPath,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateMasterMenuCallWithRemark(formData, menuData, remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    this.masterMenu = this.location.getState();
    var inputData = {
      "id": this.masterMenu.id,
      "menuname": formData.menuName,
      "statusId": formData.status,
      "createdon": menuData.createdon,
      "createdby":this.user_ID,
      "updatedby":this.user_ID,
      "menuLogo": formData.logoPath,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Menu Master',
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
