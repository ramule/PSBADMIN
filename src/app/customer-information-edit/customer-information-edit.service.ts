import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class CustomerInformationEditService {

  user_ID: any;
  constructor(
        public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  getEditParam(formData,userId,userInfo){
    this.user_ID = this.commonDataService.user_ID;
    var inputData ={
      "id":userInfo.id,
      "customerId":userInfo.customerId,
      "customername":formData.custName,
      "mobile": this.commonDataService.customerInfo.mobile,
      "cif":formData.custCIFNo,
      "employerName": formData.employeerName,
      "employerAddress": formData.employeerAddress,
      "employerNumber": formData.employeerNo,
      "gstNumber": formData.gstNumber,
      "createdBy": userInfo.createdBy,
      "statusId": formData.status,
      "appId": userInfo.appId,
      "updatedBy": this.user_ID,
      "createdOn": userInfo.createdOn,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData
  }

  getEditParamWithRemark(formData,userId,userInfo, remarkData){
    this.user_ID = this.commonDataService.user_ID;
    var inputData ={
      "id":userInfo.id,
      "customerId":userInfo.customerId,
      "customername":formData.custName,
      "mobile": this.commonDataService.customerInfo.mobile,
      "cif":formData.custCIFNo,
      "employerName": formData.employeerName,
      "employerAddress": formData.employeerAddress,
      "employerNumber": formData.employeerNo,
      "gstNumber": formData.gstNumber,
      "createdBy": userInfo.createdBy,
      "statusId": formData.status,
      "appId": userInfo.appId,
      "updatedBy": this.user_ID,
      "createdOn": userInfo.createdOn,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData
  }

   addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Customer Info',
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
}
