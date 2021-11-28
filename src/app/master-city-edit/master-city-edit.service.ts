import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterCityEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  editCityCall(formdata, masterCityData){
    var param = {
      "id": masterCityData.id,
      "countryId": formdata.countryName,
      "stateId": formdata.stateName,
      "cityName": formdata.cityName,
      "statusId": formdata.statusId,
      "createdBy": masterCityData.createdBy,
      "updatedby": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ""
    }
    return param;
  }

  editCityWithRemarkCall(formdata, masterCityData, remarkData) {
    var inputData = {
      "id": masterCityData.id,
      "countryId": formdata.countryName,
      "stateId": formdata.stateName,
      "cityName": formdata.cityName,
      "statusId": formdata.statusId,
      "createdBy": masterCityData.createdBy,
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
            "eventName":'City Master Edit',
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
