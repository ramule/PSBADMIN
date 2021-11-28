import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CorpDesignationLevelMappingEditService {

  constructor(
    private commonData: CommonDataShareService
  ) { }

  updateCorpDesignationLevelMappingCall(id, formdata, selCorpDesLevelMapping) {
    var commaSeperatedCorpRoles: any = [];
    formdata.corpRoles.forEach(element => {
      commaSeperatedCorpRoles.push(element.user_TYPE);
    });
    var inputData = {
      "id": id,
      "designationName": formdata.designationName,
      "designationCode": formdata.designationCode,
      "authType": commaSeperatedCorpRoles.join(),
      "hierarchyLevel": formdata.hierarchyLevel,
      "createdBy": selCorpDesLevelMapping.createdBy,
      "createdOn": this.commonData.corpDesignationLevelData.createdOn,
      "updatedBy": this.commonData.user_ID,
      "statusId": formdata.status,
      "companyId": formdata.companyName,
      "user_ID": this.commonData.user_ID,
      "role_ID": this.commonData.roleTypeId,
      "subMenu_ID": this.commonData.submenuId,
      "remark": "",
      "activityName": this.commonData.submenuname
    }
    return inputData;
  }

  updateCorpDesignationLevelMappingWithRemarkCall(id, formdata, selCorpDesLevelMapping, remarkData, tempRolesArr) {
    var commaSeperatedCorpRoles: any = [];
    tempRolesArr.forEach(element => {
      commaSeperatedCorpRoles.push(element.user_TYPE);
    });
    var inputData = {
      "id": id,
      "designationName": formdata.designationName,
      "designationCode": formdata.designationCode,
      "authType": commaSeperatedCorpRoles.join(),
      "hierarchyLevel": formdata.hierarchyLevel,
      "createdBy": selCorpDesLevelMapping.createdBy,
      "createdOn": this.commonData.corpDesignationLevelData.createdOn,
      "updatedBy": this.commonData.user_ID,
      "statusId": formdata.status,
      "companyId": formdata.companyName,
      "user_ID": this.commonData.user_ID,
      "role_ID": this.commonData.roleTypeId,
      "subMenu_ID": this.commonData.submenuId,
      "remark": remarkData.remark,
      "activityName": this.commonData.submenuname
    }
    return inputData;
  }
}
