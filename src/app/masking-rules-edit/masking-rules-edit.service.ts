import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class MaskingRulesEditService {

  user_ID: any;
  constructor(
        public commonDataService: CommonDataShareService,
        public commonMethod: CommonMethods
  ) { }


  getEditRulesParam(formdata,id){
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": id,
      "statusid": formdata.status,
      "appid": formdata.appId,
      "rulenamedesc":formdata.description,
      "masklastdigits":formdata.lastNoDigit,
      "maskfirstdigits":formdata.firstNoDigit,
      "maskall_yn": formdata.isDataMasked,
      "maskchar": formdata.maskingCharacter ,
      "fieldname": formdata.feildName,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData
  }

  getEditRulesParamWithRemark(formdata,id, remarkData){
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": id,
      "statusid": formdata.status,
      "appid": formdata.appId,
      "rulenamedesc":formdata.description,
      "masklastdigits":formdata.lastNoDigit,
      "maskfirstdigits":formdata.firstNoDigit,
      "maskall_yn": formdata.isDataMasked,
      "maskchar": formdata.maskingCharacter ,
      "fieldname": formdata.feildName,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData
  }

   addAuditTrailAdaptorParams(URL,operation) {

        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Masking Rules',
            "category":"Masking Rules",
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
