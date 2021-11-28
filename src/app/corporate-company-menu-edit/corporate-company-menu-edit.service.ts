import { Injectable } from '@angular/core';
import { CommonMethods } from '../common-methods';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateCompanyMenuEditService {

  constructor(
     public commonDataService: CommonDataShareService,
     public commonMethod: CommonMethods
  ) { }

  updateCorpCompanyMenu(formData, id, createdon, selectedCorpUserType) {
    var inputData = {
      "id":id,
      "companyId": formData.companyName,
      "corpMenuId": formData.menuName,
      "statusId": formData.statusId,
      "createdon":createdon,
      "createdby": selectedCorpUserType.createdby,
      "updatedby": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateCorpCompanyMenuWithRemark(formData, id, remarkData, createdon, selectedCorpUserType) {
    var inputData = {
      "id":id,
      "companyId": formData.companyName,
      "corpMenuId": formData.menuName,
      "statusId": formData.statusId,
      "createdon": createdon,
      "createdby": selectedCorpUserType.createdby,
      "updatedby": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
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
            "eventName":'Corporate Company Menu',
            "category":"Corporate",
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
