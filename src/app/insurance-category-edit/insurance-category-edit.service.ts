import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCategoryEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  editCategoryCall(formdata, masterCategoryData){
    var param = {
      "id": masterCategoryData.id,
      "categoryName": formdata.categoryName,
      "createdby": masterCategoryData.createdby,
      "createdon": masterCategoryData.createdon,
      "statusId": formdata.statusId,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID":this.commonDataService.user_ID,
      "subMenu_ID":this.commonDataService.submenuId,
      "updatedby":this.commonDataService.user_ID,
      "activityName": this.commonDataService.submenuname,
      "remark":""
    }
    return param;
  }

  editCategoryWithRemarkCall(formdata, masterCategoryData, remarkData) {
    var inputData = {
      "id": masterCategoryData.id,
      "categoryName": formdata.categoryName,
      "createdby": masterCategoryData.createdby,
      "createdon": masterCategoryData.createdon,
      "statusId": formdata.statusId,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID":this.commonDataService.user_ID,
      "subMenu_ID":this.commonDataService.submenuId,
      "updatedby":this.commonDataService.user_ID,
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
