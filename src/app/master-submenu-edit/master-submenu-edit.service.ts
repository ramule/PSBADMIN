import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterSubMenuEditService {

  user_ID;
  masterMenu: any;
  constructor(
    private location: Location,
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  updateMasterMenuCall(formData,subMenuId,resultData) {
    var inputData = {
      "id":subMenuId,
      "menuName":formData.menuName,
       "menudesc":formData.menudesc,
       "statusId":formData.status,
       "menuLink":formData.menuLink,
       "menuLogo":formData.menuLogo,
       "createdby": resultData.createdby,
       "menuId":resultData.mainMenuid.id,
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
