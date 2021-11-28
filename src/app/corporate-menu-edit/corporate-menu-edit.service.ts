import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorporateMenuEditService {
  user_ID;
  createdon;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod:CommonMethods
  ) { }

  editCorpMenu(formData, id, corpMenuData) {
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.corpCompanyMenu.createdOn;
    var inputData = {
      "id": id,
      "createdby":  corpMenuData.createdby,
      "updatedby": this.user_ID,
      "status": formData.status,
      "menuLogo": formData.menuLogoPath,
      "menuLink": formData.menuLink,
      "menuname": formData.menuName,
      "createdon": this.createdon,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  editCorpMenuWithRemark(formData, id, corpMenuData, remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.corpCompanyMenu.createdOn;
    var inputData = {
      "id": id,
      "createdby":  corpMenuData.createdby,
      "updatedby": this.user_ID,
      "status": formData.status,
      "menuLogo": formData.menuLogoPath,
      "menuLink": formData.menuLink,
      "menuname": formData.menuName,
      "createdon": this.createdon,
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
            "eventName":'Corporate Menu',
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
