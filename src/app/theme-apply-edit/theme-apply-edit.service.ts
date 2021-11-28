import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class ThemeApplyEditService {

  createdon: any;
  userID: any;
  constructor(
    private commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  updateThemeCall(formData, id, forceStatus, selectedThemeData) {
    this.createdon = this.commonDataShareService.themeApply.createdon;
    this.userID = this.commonDataShareService.user_ID;
    var inputData = {
      "id": id,
      "themeName": formData.themeName,
      "themeSideBarColor": formData.themeColor,
      "themeSideBarBackground": formData.themeBgColor,
      "fromDate": formData.fromDate,
      "themeMenuOptions": formData.themeMenuOption,
      "toDate": formData.toDate,
      "fromDateStr": formData.fromDate,
      "toDateStr": formData.toDate,
      "forcedToAll": forceStatus,
      "statusid": formData.status,
      "createdby": selectedThemeData.createdby,
      "createdon": this.createdon,
      "updatedby": this.userID,
      "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": this.userID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "activityName": this.commonDataShareService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateThemeWithRemarkCall(formData, id, forceStatus, selectedThemeData, remarkData) {
    this.createdon = this.commonDataShareService.themeApply.createdon;
    this.userID = this.commonDataShareService.user_ID;
    var inputData = {
      "id": id,
      "themeName": formData.themeName,
      "themeSideBarColor": formData.themeColor,
      "themeSideBarBackground": formData.themeBgColor,
      "fromDate": formData.fromDate,
      "themeMenuOptions": formData.themeMenuOption,
      "toDate": formData.toDate,
      "fromDateStr": formData.fromDate,
      "toDateStr": formData.toDate,
      "forcedToAll": forceStatus,
      "statusid": formData.status,
      "createdby": selectedThemeData.createdby,
      "createdon": this.createdon,
      "updatedby": this.userID,
      "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": this.userID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "activityName": this.commonDataShareService.submenuname,
      "remark":  remarkData.remark
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Theme Apply',
            "category":"Themes",
            "action":operation,
            "properties":URL,
            "IP":this.commonDataShareService.user_IP,
            "X-FORWARDEDIP":this.commonDataShareService.user_IP,
            "Lat":this.commonDataShareService.user_lat,
            "Lon":this.commonDataShareService.user_lon,
            "Browser":this.commonMethod.getBrowserName(),
            "Device":"",
            "OS":this.commonMethod.getOSName(),
            "CHANNELID":"4",
            "CREATEDBY":this.commonDataShareService.user_ID,
            "CREATEDBYNAME":this.commonDataShareService.user_Name,
             "UPDATEDBY":this.commonDataShareService.user_ID,
            "UPDATEDBYNAME":this.commonDataShareService.user_Name,
            "authorization":"0"

        }
        return inputData;
      }
}
