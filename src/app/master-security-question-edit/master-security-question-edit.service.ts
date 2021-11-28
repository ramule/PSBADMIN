import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterSecurityQuestionEditService {
  constructor(
    private commonDataService: CommonDataShareService,
     public commonMethod: CommonMethods
  ) { }
  user_ID;
  updateMasterProductCall(formData,id, secQuestionsData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id":id,
      "appid": formData.appId,
      "statusid": formData.status,
      "createdby": secQuestionsData.createdby,
      "createdon": secQuestionsData.createdon,
      "updatedby":this.user_ID,
      "question": formData.question,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateMasterProductCallWithRemark(formData,id,secQuestionsData,remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id":id,
      "appid": formData.appId,
      "statusid": formData.status,
      "createdby": secQuestionsData.createdby,
      "createdon": secQuestionsData.createdon,
      "updatedby":this.user_ID,
      "question": formData.question,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Security Question',
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
