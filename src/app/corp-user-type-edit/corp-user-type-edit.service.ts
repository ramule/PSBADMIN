import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorpUserTypeEditService {

  user_ID;
  constructor(
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  updateCorpUserTypeCall(formData, id, corpUserTypeData) {
    this.user_ID = this.commonDataShareService.user_ID;
    var inputData = {
      "id": id,
      "description": formData.description,
      "statusid": formData.statusId,
      "createdby": corpUserTypeData.createdby,
      "createdon": this.commonDataShareService.corpUserTypeDetails.createdOn,
      "rule_SEQ": formData.ruleSeq,
      "user_TYPE": formData.userType,
      "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "activityName": this.commonDataShareService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateCorpUserTypeCallWithRemark(formData, id, corpUserTypeData, remarkData) {
    this.user_ID = this.commonDataShareService.user_ID;
    var inputData = {
      "id": id,
      "description": formData.description,
      "statusid": formData.statusId,
      "createdby": corpUserTypeData.createdby,
      "createdon": this.commonDataShareService.corpUserTypeDetails.createdOn,
      "rule_SEQ": formData.ruleSeq,
      "user_TYPE": formData.userType,
      "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "activityName": this.commonDataShareService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Corporate User Type',
            "category":"Corporate",
            "action":operation,
            "properties":URL,
            "IP":this.commonDataShareService.user_IP,
            "X-FORWARDEDIP":this.commonDataShareService.user_IP,
            "Lat":this.commonDataShareService.user_lat,
            "Lon":this.commonDataShareService.user_lon,
            "Browser":this.commonMethod.getBrowserName(),
            "Device":"",
            "OS":this.commonMethod.getOSName(),
            "CHANNELID":"4",
            "CREATEDBY":this.commonDataShareService.user_ID,
            "CREATEDBYNAME":this.commonDataShareService.user_Name,
             "UPDATEDBY":this.commonDataShareService.user_ID,
            "UPDATEDBYNAME":this.commonDataShareService.user_Name,
            "authorization":"0"

        }
        return inputData;
      }
}
