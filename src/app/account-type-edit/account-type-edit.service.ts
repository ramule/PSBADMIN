import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeEditService {

  user_ID: any;
  createdon: any;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod:CommonMethods
  ) { }

  updateAccountTypeCall(formData, id, accountTypeData) {
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.accountType.createdon;
    var inputData = {
      "id": id,
      "accountType": formData.accountType,
      "accountCode": formData.accountCode,
      "createdby": accountTypeData.createdby,
      "createdon": this.createdon,
      "statusid": formData.status,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateAccountTypeCallWithRemark(formData, id, accountTypeData,remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.accountType.createdon;
    var inputData = {
      "id": id,
      "accountType": formData.accountType,
      "accountCode": formData.accountCode,
      "createdby": accountTypeData.createdby,
      "createdon": this.createdon,
      "statusid": formData.status,
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
            "eventName":'Corporate Account Type',
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
