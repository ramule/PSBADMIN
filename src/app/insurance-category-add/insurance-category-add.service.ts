import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCategoryAddService {
  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  addCategoryCall(formdata){
    var param = {
      "categoryName":formdata.categoryName,
      "statusId":3,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID":this.commonDataService.user_ID,
      "subMenu_ID":this.commonDataService.submenuId,
      "createdby":this.commonDataService.user_ID,
      "activityName":this.commonDataService.submenuname,
      "remark":""
    }
    return param;
  }

  addCategoryWithRemarkCall(formdata, remarkData) {
    var inputData = {
      "categoryName":formdata.categoryName,
      "statusId":3,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID":this.commonDataService.user_ID,
      "subMenu_ID":this.commonDataService.submenuId,
      "createdby":this.commonDataService.user_ID,
      "activityName":this.commonDataService.submenuname,
      "remark":remarkData.remark
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        //this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Insurance Category',
            "category":"Insurance",
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
