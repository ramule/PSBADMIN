import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class CustomerInformationAddService {
  user_ID;
  constructor(
    private commonDataService: CommonDataShareService,
        public commonMethod: CommonMethods
  ) { }

  // setSendNotificationParams(formData,custList,type) {
  //   var user_ID = "";
  //  var sendNotificationArr = [];
  //  custList.forEach(customer => {
  //    if(customer.isCustNameChecked){
  //     var obj ={
  //       "customerId": customer.id,
  //       "notificationMsg": formData.message,
  //       "appId": customer.appid,
  //       "activityId": 1,
  //       "rrn": "anc1",
  //       "createdBy": user_ID,
  //       "statusId": customer.statusid,
  //       "lastResentOn": "",
  //       "resendBy": user_ID,
  //       "type": type
  //     }
  //      sendNotificationArr.push(obj)
  //    }
  //  });
  //   return sendNotificationArr;
  // }

  setCustomerInfoParams(formData,custId, item)
  {
    this.user_ID = this.commonDataService.user_ID;
    var inputdata = {

      "customerId":custId[0].id,
      "customername":formData.custName,
      "mobile":item.mobile,
      "cif":formData.custCIFNo,
      "employerName": formData.employeerName,
      "employerAddress": formData.employeerAddress,
      "employerNumber": formData.employeerNumber,
      "gstNumber": formData.gstNo,
      "createdBy": this.user_ID,
      "statusId": formData.status,
      "appId": formData.productType,
      "updatedBy": this.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    //      "createdon":formData.,
    console.log(inputdata)
    return inputdata;

  }

  setCustomerInfoParamsWithRemark(formData,custId, remarkData, item)
  {
    this.user_ID = this.commonDataService.user_ID;
    var inputdata = {

      "customerId":custId[0].id,
      "customername":formData.custName,
      "mobile":item.mobile,
      "cif":formData.custCIFNo,
      "employerName": formData.employeerName,
      "employerAddress": formData.employeerAddress,
      "employerNumber": formData.employeerNumber,
      "gstNumber": formData.gstNo,
      "createdBy": this.user_ID,
      "statusId": formData.status,
      "appId": formData.productType,
      "updatedBy": this.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    //      "createdon":formData.,
    console.log(inputdata)
    return inputdata;

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
