import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CalculatorFormulaEditService {
  user_ID:any;

  constructor(
    private commonDataService: CommonDataShareService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonMethod:CommonMethods
  ) { }

  getCalcFormulaAddParam(formData,selUserDtl){
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": selUserDtl.id,
      "calculatorId": formData.calculatorType,
      "calculatorname": selUserDtl.calculatorname,
      "calculatorFormula": formData.calculatorFormula,
      "ratesCharges": formData.rateCharges,
      "createdby": selUserDtl.createdby,
      "createdon": selUserDtl.createdon,
      "statusId": formData.statusId,
      "appId": formData.productType,
      "updatedby": this.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }

    return inputData;
  }

  getCalcFormulaAddParamWithRemark(formData, selUserDtl, remarkData){
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": selUserDtl.id,
      "calculatorId": formData.calcName,
      "calculatorname": selUserDtl.calculatorname,
      "calculatorFormula": formData.calcFormula,
      "ratesCharges": formData.ratecharge,
      "createdby": selUserDtl.createdby,
      "createdon": selUserDtl.createdon,
      "statusId": formData.statusid,
      "appId": formData.channel,
      "updatedby": this.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
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
             "eventName":'Calculator Formula',
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
