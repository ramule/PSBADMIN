import { Injectable } from '@angular/core';
import { CommonMethods } from '../common-methods';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentListEditService {

  user_ID;
  createdon;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod:CommonMethods
  ) { }

  editDocumentList(formData, id) {
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.dynamicReports.createdOn;
    var inputData = {
      "id": id,
      "documentName":formData.reportName,
      "statusId": formData.status,
      "createdBy": this.user_ID,
			"updatedBy":this.user_ID,
			"createdOn": this.createdon,
      "role_ID": this.commonDataService.roleId,
      "user_ID": this.user_ID,
      "subMenu_ID": "",
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  /*
  editDocumentListWithRemark(formData, id,remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.corpCompanyMenu.createdOn;
    var inputData = {
      "id": id,
      "documentName":formData.reportName,
      "statusId": formData.status,
      "createdBy": this.user_ID,
			"updatedBy":this.user_ID,
			"createdOn": this.createdon,
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
