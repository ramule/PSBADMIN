import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeEditService {

  constructor(
    private commonDataService: CommonDataShareService,
    private commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods
  ) { }

  getDocumentTypeEditParam(formdata, documentTypeData) {
    var commSeperatedDocs: any = [];
    formdata.documentList.forEach(element => {
      commSeperatedDocs.push(element.documentName);
    });
    var inputData = {
      "id": documentTypeData.id,
      "type": formdata.documentType,
      "document_list": commSeperatedDocs.join(),
      "statusId": formdata.statusId,
      "appId": formdata.appId,
      "createdBy": documentTypeData.createdBy,
      "createdOn": documentTypeData.createdOn,
      "updatedBy": this.commonDataShareService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataShareService.user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "remark":"",
      "activityName": this.commonDataShareService.submenuname
    }
    return inputData;
  }

  getDocumentTypeEditParamWithRemark(formdata, documentTypeData, tempDocTypeArr, remarkData) {
    var commSeperatedDocs: any = [];
    tempDocTypeArr.forEach(element => {
      commSeperatedDocs.push(element.documentName);
    });
    var inputData = {
      "id": documentTypeData.id,
      "type": formdata.documentType,
      "document_list": commSeperatedDocs.join(),
      "statusId": formdata.statusId,
      "appId": formdata.appId,
      "createdBy": documentTypeData.createdBy,
      "createdOn": documentTypeData.createdOn,
      "updatedBy": this.commonDataShareService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataShareService.user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "remark": remarkData.remark,
      "activityName": this.commonDataShareService.submenuname
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
