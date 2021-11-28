import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CorpCompanyRequestsEditService {

  constructor(
    private commonData: CommonDataShareService
  ) { }

  getCorpCompanyIdCall(compId) {
    var inputData = {
      "corpReqId": compId
    }
    return inputData;
  }

  getCorpUserCall(compId) {
    var inputData = {
      "corpid": compId
    }
    return inputData;
  }

  getCorpCompanyReqDetailByIdCall(id) {
    var inputData = {
      "id": id
    }
    return inputData;
  }

  submitCorpCompanyRequest(id, formdata, menusArr, accountsArr, usersArr, menuMapDataArr, accountsMapDataArr, documentsObject, selCorpCompnay, remarkData, approveRejectVal) {
    var inputData = {
      "corpCompData":{
        "id": id,
        "companyName": formdata.corpCompanyName,
        "companyInfo": formdata.corpCompanyInfo,
        "rrn": formdata.rrn,
        "phoneNo":formdata.phoneNo,
        "establishmentOn": formdata.establishmentOn,
        "companyCode": selCorpCompnay.companyCode,
        "logo": documentsObject.logo,
        "coi": documentsObject.coi,
        "moa": documentsObject.moa,
        "otherDoc": documentsObject.otherdocs,
        "pancardNo": selCorpCompnay.pancardNo,
        "cif": formdata.cif,
        "corporateType": selCorpCompnay.corporateType,
        "updatedBy": this.commonData.user_ID
      },
      "corpMenuAccData": {
        "corpMenuList": menusArr,
        "corpAccList": accountsArr
      },
      "corpUserMasterData": usersArr,
      "corpUserMenuAccMapData": {
        "corpUserMenuMapData": menuMapDataArr,
        "corpUserAccMapData": accountsMapDataArr
      },
      "remark": remarkData.remark,
      "reqStatus": approveRejectVal
    }
    return inputData;
  }

  updateCorpCompanyRequestCall(id, formdata, selCorpDesLevelMapping, approveRejectVal) {
    var inputData = {
      "id": id,
      "companyName": formdata.corpCompanyName,
      "companyInfo": formdata.corpCompanyInfo,
      "rrn": formdata.rrn,
      "createdBy": selCorpDesLevelMapping.createdBy,
      "corporateType": selCorpDesLevelMapping.corporateType,
      "establishmentOn": formdata.establishmentOn,
      "updatedBy": this.commonData.user_ID,
      "statusId": formdata.status,
      "reqApproved": approveRejectVal,
      "cif": formdata.cif,
      "user_ID": this.commonData.user_ID,
      "role_ID": this.commonData.roleTypeId,
      "subMenu_ID": this.commonData.submenuId,
      "activityName": this.commonData.submenuname,
      "remark": ""
    }
    return inputData;
  }

  updateCorpCompanyRequestWithRemarkCall(id, formdata, selCorpDesLevelMapping, remarkData, approveRejectVal) {
    var inputData = {
      "id": id,
      "companyName": formdata.corpCompanyName,
      "companyInfo": formdata.corpCompanyInfo,
      "rrn": formdata.rrn,
      "createdBy": selCorpDesLevelMapping.createdBy,
      "corporateType": selCorpDesLevelMapping.corporateType,
      "establishmentOn": formdata.establishmentOn,
      "updatedBy": this.commonData.user_ID,
      "statusId": formdata.status,
      "reqApproved": approveRejectVal,
      "cif": formdata.cif,
      "user_ID": this.commonData.user_ID,
      "role_ID": this.commonData.roleTypeId,
      "subMenu_ID": this.commonData.submenuId,
      "activityName": this.commonData.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }
}
