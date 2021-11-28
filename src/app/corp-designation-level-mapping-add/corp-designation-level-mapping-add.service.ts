import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CorpDesignationLevelMappingAddService {

  constructor(
    private commonData: CommonDataShareService
  ) { }

  addCorpDesignationLevelMappingCall(formdata) {
    var commaSeperatedCorpRoles: any = [];
    formdata.corpRoles.forEach(element => {
      commaSeperatedCorpRoles.push(element.user_TYPE);
    });
    var inputData = {
      "designationName": formdata.designationName,
      "designationCode": formdata.designationCode,
      "authType": commaSeperatedCorpRoles.join(),
      "hierarchyLevel": formdata.hierarchyLevel,
      "createdBy": this.commonData.user_ID,
      "updatedBy": this.commonData.user_ID,
      "statusId": 3,
      "companyId": formdata.companyName,
      "user_ID": this.commonData.user_ID,
      "role_ID": this.commonData.roleTypeId,
      "subMenu_ID": this.commonData.submenuId,
      "remark": "",
      "activityName": this.commonData.submenuname
    }
    return inputData;
  }

  addCorpDesignationLevelMappingWithRemarkCall(formdata, remarkData, tempRolesArr) {
    var commaSeperatedCorpRoles: any = [];
    tempRolesArr.forEach(element => {
      commaSeperatedCorpRoles.push(element.user_TYPE);
    });
    var inputData = {
      "designationName": formdata.designationName,
      "designationCode": formdata.designationCode,
      "authType": commaSeperatedCorpRoles.join(),
      "hierarchyLevel": formdata.hierarchyLevel,
      "createdBy": this.commonData.user_ID,
      "updatedBy": this.commonData.user_ID,
      "statusId": 3,
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
