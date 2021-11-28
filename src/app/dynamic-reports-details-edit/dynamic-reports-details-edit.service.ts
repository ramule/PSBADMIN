import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class DynamicReportsDetailsEditService {

  user_ID;
  createdon;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod:CommonMethods
  ) { }

  editDynamicReports(formData, id, dynamicReportsData) {
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.dynamicReports.createdOn;
    var inputData = {
      "id": id,
      "subreportname": formData.reportName,
      "subreportdescription": formData.description,
      "reportid": formData.report,
      "statusid": formData.status,
      "createdby": dynamicReportsData.createdby,
      "createdon": dynamicReportsData.createdon,
      "updatedby": this.user_ID
    }
    return inputData;
  }

  /*
  editDynamicReportsWithRemark(formData, id,remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.corpCompanyMenu.createdOn;
    var inputData = {
      "id": id,
      "reportName":formData.reportName,
      "reportDescription":formData.description,
      "statusId": formData.status,
      "createdBy": this.user_ID,
			"updatedBy":this.user_ID,
			"createdOn": this.createdon,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
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
            "eventName":'Reports Categoty',
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
