import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RmMasterService {
  user_ID:any="";
  rmMaster: any;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private location: Location,
  ) { }

  addRMMaster(formData) {
   this.user_ID = this.commonDataService.user_ID;
    var inputdata = {
      "statusId": formData.status,
      "rmName": formData.rmName,
      "appId": formData.productType,
      "createdby": this.user_ID,
      "createdon": "",
      "updatedby": this.user_ID,
      "updatedon": "",
      "rmId": formData.rmId,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputdata;
    console.log(formData)
  }

  addRMMasterWithRemark(formData,remarkData) {
    this.user_ID = this.commonDataService.user_ID;
     var inputdata = {
       "statusId": formData.status,
       "rmName": formData.rmName,
       "appId": formData.productType,
       "createdby": this.user_ID,
       "createdon": "",
       "updatedby": this.user_ID,
       "updatedon": "",
       "rmId": formData.rmId,
       "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
     }
     return inputdata;
     console.log(formData)
   }

   deleteRMMasterCall(formData) {
    this.rmMaster = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inpurData = {
      "id": formData.id,
      "createdby": this.user_ID,
      "updatedby": this.user_ID,
      "statusId": formData.statusId,
      "rmId": formData.rmId,
      "rmName": formData.rmName,
      "appId": formData.appId,
      "createdon":this.commonDataService.RMMaster.createdon,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inpurData;
   }


   deleteRMMasterWithRemarkCall(formData, remarkData) {
    this.rmMaster = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inpurData = {
      "id": formData.id,
      "createdby": this.user_ID,
      "updatedby": this.user_ID,
      "statusId": formData.statusId,
      "rmId": formData.rmId,
      "rmName": formData.rmName,
      "appId": formData.appId,
      "createdon":this.commonDataService.RMMaster.createdon,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remarkDelete
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
