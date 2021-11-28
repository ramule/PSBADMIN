import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class DocumentListAddService {

  user_ID;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod : CommonMethods
  ) { }

  addDocumentList(formData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "documentName":formData.reportName,
      "statusId": formData.status,
      "createdBy": this.user_ID,
      "updatedBy":this.user_ID,
      "role_ID": this.commonDataService.roleId,
      "user_ID": this.user_ID,
      "subMenu_ID": "",
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  /*
  addDocumentListWithRemark(formData,remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "documentName":formData.reportName,
      "statusId": formData.status,
      "createdBy": this.user_ID,
      "updatedBy":this.user_ID,
      "role_ID": this.commonDataService.roleId,
      "user_ID": this.user_ID,
      "subMenu_ID": "",
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }
  */

  addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Dynamic Reports',
            "category":"Reports",
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
