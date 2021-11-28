import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class MasterCalculatorEditService {

  user_ID;
  masterCalc;
  createdOn;
  constructor(
    private commonDataService: CommonDataShareService,
    private commonServiceCall: HttpCommonServiceCallService,
    private location: Location,
    public commonMethod:CommonMethods
  ) { }

  updateCaluMasterCall(formData, selectedCalculator) {
    this.createdOn = this.commonDataService.masterCalculator.createdon;
    this.masterCalc = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id":this.masterCalc.id,
      "seqNumber": formData.seqNumber,
      "calculatorName": formData.calcName,
      "calculatorDescription": formData.calcDesc,
      "createdby": selectedCalculator.createdby,
      "createdon": this.createdOn,
      "statusId": formData.status,
      "appId": formData.productType,
      "updatedby":this.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateCaluMasterWithRemarkCall(formData, selectedCalculator, remarkData) {
    this.createdOn = this.commonDataService.masterCalculator.createdon;
    this.masterCalc = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id":this.masterCalc.id,
      "seqNumber": formData.sequenceNo,
      "calculatorName": formData.calculatorName,
      "calculatorDescription": formData.calculatorDesc,
      "createdby": selectedCalculator.createdby,
      "createdon": this.createdOn,
      "statusId": formData.statusid,
      "appId": formData.producttype,
      "updatedby":this.user_ID,
      "role_ID":this.commonDataService.roleTypeId,
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
