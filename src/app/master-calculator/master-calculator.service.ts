import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterCalculatorService {

  user_ID;
  constructor(
    private commonDataService: CommonDataShareService,
    private commonServiceCall: HttpCommonServiceCallService,
    public commonMethod:CommonMethods
  ) { }

  addCalculatorMasterCall(formData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "seqNumber": formData.seqNumber,
      "calculatorName": formData.calcName,
      "calculatorDescription": formData.calcDesc,
      "createdby": this.user_ID,
      "statusId": formData.status,
      "appId": formData.productType,
      "updatedby":this.user_ID,
      "role_ID":  this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  addCalculatorMasterWithRemarkCall(formData, remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "seqNumber": formData.sequenceNo,
      "calculatorName": formData.calculatorName,
      "calculatorDescription": formData.calculatorDesc,
      "createdby": this.user_ID,
      "statusId": formData.statusid,
      "appId": formData.producttype,
      "updatedby":this.user_ID,
      "role_ID":  this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
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
             "eventName":'Calculator Master',
            "category":"Calculator",
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
