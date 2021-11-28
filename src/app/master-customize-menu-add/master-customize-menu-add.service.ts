import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterCustomizeMenuAddService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  addCustomizeUserParam(formdata , images){
    var uppercaseMenuName = formdata.modelName.toUpperCase();
    console.log(uppercaseMenuName);
    var jsonKeyStr = uppercaseMenuName.replace(/ /g,'_');
    console.log(jsonKeyStr);
    var param = {
      "moduleName":formdata.modelName,
      "type": formdata.menuType,
      "appId":formdata.appId,
      "statusId":formdata.statusId,
      "roleId": formdata.type == 0 ? formdata.type : formdata.productType,
      "menuImageString": images.logoImage.split(',')[1],
      "json_key": jsonKeyStr
    }
    return param;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        //this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Customize Menu Master',
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
