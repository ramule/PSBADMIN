import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorpAccountUserTypeEditService {
  user_ID:any;
  constructor(
    public commonDataShareService : CommonDataShareService,
    public commonMethod:CommonMethods
  ) { }

  updateCorpAccountUserTypeCall(formData, id, corpUserType) {
    this.user_ID = this.commonDataShareService.user_ID;
    var inputData = {
      "id": id,
      "accountTypeId": this.commonDataShareService.corpAccountUserTypeDetails.accountTypeId,
      "corpUserTypeId": this.commonDataShareService.corpAccountUserTypeDetails.corpUserTypeId,
      "createdon": this.commonDataShareService.corpAccountUserTypeDetails.createdOn,
      "createdby": corpUserType.createdby,
      "statusid": formData.statusId,
      "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "activityName": this.commonDataShareService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateCorpAccountUserTypeCallWithRemark(formData, id, corpUserType, remarkData) {
    this.user_ID = this.commonDataShareService.user_ID;
    var inputData = {
      "id": id,
      "accountTypeId": this.commonDataShareService.corpAccountUserTypeDetails.accountTypeId,
      "corpUserTypeId": this.commonDataShareService.corpAccountUserTypeDetails.corpUserTypeId,
      "createdon": this.commonDataShareService.corpAccountUserTypeDetails.createdOn,
      "createdby": corpUserType.createdby,
      "statusid": formData.statusId,
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
            "eventName":'Corporate Account User Type',
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
