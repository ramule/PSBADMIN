import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class InvestmentProductEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  editInvProductCall(formdata , images, id, invData){
    var param = {
      "id": id,
      "productName": formdata.productName,
      "productLink": formdata.productLink,
      "jsonKey": formdata.languagecode,
      "statusId": formdata.statusId,
      "logo": images.logoImage.split(',')[1],
      "createdon": invData.createdon,
      "createdby": invData.createdby,
      "updatedby": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ""
    }
    return param;
  }

  editInvProductWithRemarkCall(formdata, images, id, invData, remarkData) {
    var inputData = {
      "id": id,
      "productName": formdata.productName,
      "productLink": formdata.productLink,
      "jsonKey": formdata.languagecode,
      "statusId": formdata.statusId,
      "logo": images.logoImage.split(',')[1],
      "createdon": invData.createdon,
      "createdby": invData.createdby,
      "updatedby": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark":  remarkData.remark
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        //this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Investment Product Edit',
            "category":"Portfolio",
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
