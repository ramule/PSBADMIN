import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeAddService {

  user_ID;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod : CommonMethods
  ) { }

  addDocumentTypeCall(formData) {
    var commSeperatedDocs: any = [];
    formData.documentList.forEach(element => {
      commSeperatedDocs.push(element.documentName);
    });
    var inputData = {
      "type": formData.documentType,
      "document_list": commSeperatedDocs.join(),
      "statusId": 3,
      "createdBy": this.commonDataService.user_ID,
      "updatedBy": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "appId": formData.appId,
      "subMenu_ID": this.commonDataService.submenuId,
      "remark":"",
      "activityName": this.commonDataService.submenuname
    }
    return inputData;
  }

  addDocumentTypeCalltWithRemark(formData, tempDocTypeArr, remarkData) {
    var commSeperatedDocs: any = [];
    tempDocTypeArr.forEach(element => {
      commSeperatedDocs.push(element.documentName);
    });
    var inputData = {
      "type": formData.documentType,
      "document_list": commSeperatedDocs.join(),
      "statusId": 3,
      "createdBy": this.commonDataService.user_ID,
      "updatedBy": this.commonDataService.user_ID,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "appId": formData.appId,
      "subMenu_ID": this.commonDataService.submenuId,
      "remark": remarkData.remark,
      "activityName": this.commonDataService.submenuname
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Document Type',
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
