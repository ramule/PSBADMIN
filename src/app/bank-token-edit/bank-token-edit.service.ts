import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class BankTokenEditService {

  bankToken;
  constructor(
    private location: Location,
    private commonDataService: CommonDataShareService,
     public commonMethod: CommonMethods
  ) { }

  updateBankTokenCall(formData, bankTokenData, referenceNumber) {

    this.bankToken = this.location.getState();
    var app = ""
    if(this.bankToken.channel=='Retail')
    app = "RIB"
    else
    app = "CIB"
    var inputData = {
      "id": this.bankToken.id,
      "statusId": bankTokenData.statusId,
      "reqInitiatedFor": bankTokenData.appId,
      "mobile":formData.mobNumber,
      "channel": this.commonDataService.bankTokenData.channel,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "referencenumber": referenceNumber,
      "appName":app,
      "remark": ''
    }
    return inputData;
  }

  updateBankTokenWithRemarkCall(formData, bankTokenData, remarkData) {
    this.bankToken = this.location.getState();
    var app = ""
    if(this.bankToken.channel=='Retail')
    app = "RIB"
    else
    app = "CIB"
    var inputData = {
      "id": this.bankToken.id,
      "statusId": bankTokenData.statusId,
      "reqInitiatedFor": bankTokenData.appId,
      "mobile":formData.mobNumber,
      "channel": this.commonDataService.bankTokenData.channel,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "appName":app,
      "remark": remarkData.remark
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
       // this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Bank Token',
            "category":"Registartion",
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
