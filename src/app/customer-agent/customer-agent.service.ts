import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class CustomerAgentService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  getCustomerDetails(formData){
    var inputData = {
      "fromdate": formData.fromDate,
      "todate": formData.toDate,
      "type":"C"
    }
    return inputData;
  }


  getResetPasswordParam(formData){
    console.log(formData);
    var inputData = {
      "id" : formData.id,
      "email" : formData.email,
      "statusid": formData.statusid,
      "appid": formData.appid,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": 'CUSTOMERRESETPASSWOEDEDIT',
      "createdon": this.commonDataService.customerAgent.createdon,
      "remark": ''
    }
    return inputData
  }

  getResetPasswordWithRemarkParam(formData, remarkData){
    console.log(formData);
    var inputData = {
      "id" : formData.id,
      "email" : formData.email,
      "statusid": formData.statusid,
      "appid": formData.appid,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": 'CUSTOMERRESETPASSWOEDEDIT',
      "createdon": this.commonDataService.customerAgent.createdon,
      "remark": remarkData.remarkDelete
    }
    return inputData
  }

  getCustomerDetailsByType(formData){
    var inputData = {
      "cif":  formData.cifNo,
      "customername": formData.customerName,
      "mobile": formData.mobileNo
      }

    return inputData
  }

   addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Customers',
            "category":"Customers",
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


  getDeviceMasterParam(id,status){
    var inputData = {
      "id":id,
      "statusId":status,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID":this.commonDataService.user_ID,
      "subMenu_ID":this.commonDataService.submenuId,
      "activityName":"customerDeviceMasterEdit",
      "remark":""
    }
    return inputData
  }

  getDeviceMasterParamWithRemark(id,status,remark){
    var inputData = {
      "id":id,
      "statusId":status,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID":this.commonDataService.user_ID,
      "subMenu_ID":this.commonDataService.submenuId,
      "activityName":"customerDeviceMasterEdit",
      "remark":remark
    }
    return inputData
  }
}

