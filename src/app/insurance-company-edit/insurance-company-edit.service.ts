import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompanyEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  editCategoryCall(formdata, masterCategoryData, CategoryData,logo){
    var param = {
      "id":masterCategoryData.id,
      "companyName":formdata.companyName,
      "categoryId":CategoryData[0].id,
      "createdon": masterCategoryData.createdon,
      "updatedby":this.commonDataService.user_ID,
      "logo":logo.logo.split(',')[1],
      "companyInfo":formdata.info,
      "categoryName":CategoryData[0].categoryName,
      "statusId":formdata.statusId,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID":this.commonDataService.user_ID,
      "subMenu_ID":this.commonDataService.submenuId,
      "createdby":masterCategoryData.createdby,
      "activityName":this.commonDataService.submenuname,
      "remark":""
    }
    return param;
  }

  editCategoryWithRemarkCall(formdata, masterCategoryData, remarkData,CategoryData,logo) {
    var inputData = {
      "id":masterCategoryData.id,
      "companyName":formdata.companyName,
      "categoryId":CategoryData[0].id,
      "createdon": masterCategoryData.createdon,
      "updatedby":this.commonDataService.user_ID,
      "logo":logo.logo.split(',')[1],
      "companyInfo":formdata.info,
      "categoryName":CategoryData[0].categoryName,
      "statusId":formdata.statusId,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID":this.commonDataService.user_ID,
      "subMenu_ID":this.commonDataService.submenuId,
      "createdby":masterCategoryData.createdby,
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
            "eventName":'Insurance Company',
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
