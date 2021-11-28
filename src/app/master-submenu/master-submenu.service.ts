import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterSubMenuService {

  user_ID;
  constructor(
    private commonDataService: CommonDataShareService,
     public commonMethod: CommonMethods
  ) { }

  addSubMasterMenuCall(formData,menuId) {
    var inputData = {
      "menuName": formData.subMenuName,
      "menudesc": formData.menudesc,
      "statusId": formData.status,
      "menuLink": formData.menuLink,
      "menuLogo": formData.logoPath,
      "createdby": this.commonDataService.user_ID,
      "mainMenuid":{"id":menuId}
    }
    return inputData;
  }
   addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Submenu Master',
            "category":"Master",
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
