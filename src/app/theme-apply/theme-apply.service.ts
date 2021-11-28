import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class ThemeApplyService {

  user_ID;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod:CommonMethods
  ) { }

  saveThemeNameCall(formData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "createdby": this.user_ID,
      "updatedby": this.user_ID,
      "description": formData.themeNameDesc,
      "details": formData.themeNameDetails
    }
    return inputData;
  }

  saveThemeColorCall(formData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "createdby": this.user_ID,
      "updatedby": this.user_ID,
      "description": formData.themeColorDesc,
      "details": formData.themeColorDetails
    }
    return inputData;
  }

  saveThemeBgColorCall(formData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "createdby": this.user_ID,
      "updatedby": this.user_ID,
      "description": formData.themeBgColorDesc,
      "details": formData.themeBgColorDetails
    }
    return inputData;
  }

  saveMenuOptionCall(formData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "createdby": this.user_ID,
      "updatedby": this.user_ID,
      "description": formData.themeMenuOptDesc,
      "details": formData.themeMenuOptDetails
    }
    return inputData;
  }

  saveApplyThemeCall(formData, forceToAllStatus) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "createdby": this.user_ID,
      "updatedby": this.user_ID,
      "themeName": formData.themeName,
      "fromDate": formData.fromDate,
      "toDate": formData.toDate,
      "fromDateStr": formData.fromDate,
      "toDateStr": formData.toDate,
      "themeMenuOptions": formData.themeMenuOption,
      "themeSideBarColor": formData.themeColor,
      "themeSideBarBackground": formData.themeBgColor,
      "statusid": formData.status,
      "forcedToAll": forceToAllStatus,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  saveApplyThemeWithRemarkCall(formData, forceToAllStatus, remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "createdby": this.user_ID,
      "updatedby": this.user_ID,
      "themeName": formData.themeName,
      "fromDate": formData.fromDate,
      "toDate": formData.toDate,
      "fromDateStr": formData.fromDate,
      "toDateStr": formData.toDate,
      "themeMenuOptions": formData.themeMenuOption,
      "themeSideBarColor": formData.themeColor,
      "themeSideBarBackground": formData.themeBgColor,
      "statusid": formData.status,
      "forcedToAll": forceToAllStatus,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }

  updateThemeNameStatusCall(theme, statusid) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": theme.id,
      "statusid": statusid,
      "createdby": this.user_ID,
      "createdon": theme.createdon,
      "updatedby": this.user_ID,
      "details": theme.details,
      "description": theme.description
    }
    return inputData;
  }

  updateThemeColorStatusCall(theme, statusid) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": theme.id,
      "statusid": statusid,
      "createdby": this.user_ID,
      "createdon": theme.createdon,
      "updatedby": this.user_ID,
      "details": theme.details,
      "description": theme.description
    }
    return inputData;
  }

  updateThemeBgColorStatusCall(theme, statusid) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": theme.id,
      "statusid": statusid,
      "createdby": this.user_ID,
      "createdon": theme.createdon,
      "updatedby": this.user_ID,
      "details": theme.details,
      "description": theme.description
    }
    return inputData;
  }

  updateThemeMenuOptionStatusCall(theme, statusid) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": theme.id,
      "statusid": statusid,
      "createdby": this.user_ID,
      "createdon": theme.createdon,
      "updatedby": this.user_ID,
      "details": theme.details,
      "description": theme.description
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Theme Apply',
            "category":"Themes",
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
