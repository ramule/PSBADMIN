import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateCompanyUserRequestsAddService {

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

  getAccountsByCif(){
    var inputData = {
      "id1": this.commonData.corpUserAddCifValue,
      "id2": Math.floor(Math.random() * 8),
      "id3": Math.floor(Math.random() * 8),
    }
    return inputData;
  }

  submitCorpCompanyRequest(id, formdata, menusArr, accountsArr, usersArr, menuMapDataArr, accountsMapDataArr, documentsObject, selCorpCompnay, remarkData) {
    var inputData = {
      "corpCompData":{
        "id": id,
        "companyName": formdata.corpCompanyName,
        "companyInfo": formdata.corpCompanyInfo,
        "rrn": formdata.rrn,
        "establishmentOn": formdata.establishmentOn,
        "companyCode": selCorpCompnay.companyCode,
        "logo": documentsObject.logo,
        "coi": documentsObject.coi,
        // "coi": formdata.coi,
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
    }
    return inputData;
  }

  save(companyForm,menuList,accountList,userData)
  {
    var inputData = {
      "corpCompData":companyForm,
      "corpMenuAccData":{
        "corpMenuList": menuList,
        "corpAccList": accountList
    },

  "corpUserMasterData": userData
     }
     return inputData;
  }

  saveCompany(formdata,images, pdf){
    console.log('images: ', images);
    console.log('pdf: ', pdf);
    var inputData = {
      "corpCompMasterData":{
        "companyName": formdata.corpCompanyName,
        "companyInfo": formdata.corpCompanyInfo,
        "establishmentOn": formdata.establishmentOn,
        "companyCode":formdata.rrn,
        "logo": images.logo.split(',')[1],
        "coi": images.coi.split(',')[1],
        "moa": images.moa.split(',')[1],
        "pancardNo":formdata.pancardNo,
        "otherDoc": images.otherdocs.split(',')[1],
        "phoneNo":formdata.phoneNo,
        "cif": formdata.cif,
        "corporateType": "1",
        "updatedBy": this.commonData.user_ID,
        "role_ID": this.commonData.roleTypeId,
        "user_ID": this.commonData.user_ID,
        "subMenu_ID": this.commonData.submenuId,
        "activityName": this.commonData.submenuname,
        "remark": formdata.remark ? formdata.remark : ""
      }
    }
    return inputData;
  }

  updateCompany(formdata,images, pdf, id){
    console.log('images: ', images);
    console.log('pdf: ', pdf);
    var inputData = {
      "id": id,
      "companyName": formdata.corpCompanyName,
      "companyInfo": formdata.corpCompanyInfo,
      "establishmentOn": formdata.establishmentOn,
      "rrn":formdata.rrn,
      "logo": images.logo.split(',')[1],
      "coi": images.coi.split(',')[1],
      "moa": images.moa.split(',')[1],
      "pancardNo":formdata.pancardNo,
      "otherDoc": images.otherdocs.split(',')[1],
      "phoneNo":formdata.phoneNo,
      "cif": formdata.cif,
      "corporateType": "1",
      "statusId": 3,
      "updatedBy": this.commonData.user_ID,
      "role_ID": this.commonData.roleTypeId,
      "user_ID": this.commonData.user_ID,
      "subMenu_ID": this.commonData.submenuId,
      "activityName": this.commonData.submenuname,
      "remark": formdata.remark ? formdata.remark : ""
    }
    return inputData;
  }

  saveMenu(menuArray)
  {
    var inputData = {
      "corpCompId": localStorage.getItem("compId"),
      "corpMenuAccData":{
          "corpMenuList": menuArray
      },
    }
    return inputData;
  }

  saveAccount(accountArray)
  {
    var inputData = {
      "corpCompId": localStorage.getItem("compId"),
      "corpMenuAccData":{
           "corpAccList": accountArray
      }
    }
    return inputData;
  }

  saveUser(userArray)
  {
    var inputData = {
      "corpCompId": localStorage.getItem("compId"),
      "corpUserMasterData": userArray
    }
    return inputData;
  }

  checkEmail(email) {
    var inputData = {
      "id1": email
    }
    return inputData;
  }
}
