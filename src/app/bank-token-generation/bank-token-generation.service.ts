import { Injectable } from '@angular/core';

import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class BankTokenGenerationService {

  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  getCustomerDetailsByType(formData){
    var inputData = {
      "cif":  formData.cifNo,
      "mobile": formData.mobileNo
      }

    return inputData
  }

  generateBankTokenCall(formData) {
    var inputData = {
      "customerId":formData.id,
      "channelId": formData.appid,
	    "generatedOnChannelId":formData.appid,
      "statusId": formData.statusid,
      "createdBy": this.commonDataService.user_ID,
      "updatedBy": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  generateBankTokenWithRemarkCall(formData, remarkData) {
    var inputData = {
      "customerId":formData.id,
      "channelId": formData.appid,
	    "generatedOnChannelId":formData.appid,
      "statusId": formData.statusid,
      "createdBy": this.commonDataService.user_ID,
      "updatedBy": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
       // this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Bank Token Generation',
            "category":"Administration",
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
