import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateCompanyUserRequestsEditService {

  constructor(
    private commonData: CommonDataShareService
  ) { }

  getCorpCompanyIdCall(compId) {
    var inputData = {
      "corpId": compId
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

  addCorpUserCall(corpid, images, formData, selectedRoleData, selectedUserParentData, corpCompanyMenuArr, corpUsersAccountsArr) {
    var commSeperatedMenus: any = [];
    formData.menuMapped.forEach(element => {
      commSeperatedMenus.push(element.menuid);
    });

    var commaSeperatedAccounts: any = [];
    formData.accountsMapped.forEach(element => {
      commaSeperatedAccounts.push(element.accountNo);
    });

    var corpCompanyMenuIds: any = [];
    corpCompanyMenuArr.forEach(element => {
      corpCompanyMenuIds.push(element.menuid);
    });

    var corpCompanyAccNo: any = [];
    corpUsersAccountsArr.forEach(element => {
      corpCompanyAccNo.push(element.accountNo);
    });

    if(selectedRoleData.selectedRoleId == 1) {

      var inputData = {
        "corpUserMasterData": [
          {
           "corpid": corpid,
           "statusId": 3,
           "userName": formData.username,
           "firstName": formData.fName,
           "lastName": formData.lName,
           "email": formData.emailId,
           "mobile": formData.mobileNo,
           "dob": formData.dob,
           "pancardNo": formData.panNumber,
           "corpRoleId": selectedRoleData.selectedRoleId,
           "aadharCard": "",
           "passport": "",
           "passportNo": formData.passNumber,
           "boardResolution": "",
           "userImage": images.ui == null || images.ui == "" || images.ui == undefined ? "" : images.ui.split(',')[1],
           "aadharCardNo": formData.aadharCardNo,
           "otherDoc": images.od == null || images.od == "" || images.od == undefined ? "" : images.od.split(',')[1],
           "certificateIncorporation": "",
           "designation": selectedUserParentData.designation,
           "parentRrn": selectedUserParentData.parentRrn,
           "updatedby": this.commonData.user_ID,
           "menuList": corpCompanyMenuIds.join(),
           "accountList": corpCompanyAccNo.join(),
           "token":"HARD",
           "parentRoleId": selectedUserParentData.parentRoleId,
           "corpRoleName": selectedRoleData.selectedRoleName,
           "parentId": selectedUserParentData.parentId,
           "parentUserName": formData.user,
           "role_ID": this.commonData.roleTypeId,
           "user_ID": this.commonData.user_ID,
           "subMenu_ID": this.commonData.submenuId,
           "activityName": this.commonData.submenuname,
          }
        ]
      }
    }
    else {
      var inputData = {
        "corpUserMasterData": [
          {
           "corpid": corpid,
           "statusId": 3,
           "userName": formData.username,
           "firstName": formData.fName,
           "lastName": formData.lName,
           "email": formData.emailId,
           "mobile": formData.mobileNo,
           "dob": formData.dob,
           "pancardNo": formData.panNumber,
           "corpRoleId": selectedRoleData.selectedRoleId,
           "aadharCard": "",
           "passport": "",
           "passportNo": formData.passNumber,
           "boardResolution": "",
           "userImage": images.ui == null || images.ui == "" || images.ui == undefined ? "" : images.ui.split(',')[1],
           "aadharCardNo": formData.aadharCardNo,
           "otherDoc": images.od == null || images.od == "" || images.od == undefined ? "" : images.od.split(',')[1],
           "certificateIncorporation": "",
           "designation": selectedUserParentData.designation,
           "parentRrn": selectedUserParentData.parentRrn,
           "updatedby": this.commonData.user_ID,
           "menuList": commSeperatedMenus.join(),
           "accountList": commaSeperatedAccounts.join(),
           "token":"HARD",
           "parentRoleId": selectedUserParentData.parentRoleId,
           "corpRoleName": selectedRoleData.selectedRoleName,
           "parentId": selectedUserParentData.parentId,
           "parentUserName": formData.user,
           "role_ID": this.commonData.roleTypeId,
           "user_ID": this.commonData.user_ID,
           "subMenu_ID": this.commonData.submenuId,
           "activityName": this.commonData.submenuname,
          }
        ]
      }
    }
    return inputData;
  }

  updateCorpUserCall(corpid, images, formData, selectedCorpUserToEdit) {

    var commSeperatedMenus: any = [];
    formData.menuMapped.forEach(element => {
      commSeperatedMenus.push(element.menuid);
    });

    var commaSeperatedAccounts: any = [];
    formData.accountsMapped.forEach(element => {
      commaSeperatedAccounts.push(element.accountNo);
    });

    var inputData = {
      "corpUserMasterData": [
        {
            "id": selectedCorpUserToEdit.id,
            "corpid": corpid,
            "statusId": selectedCorpUserToEdit.statusId,
            "createdon": selectedCorpUserToEdit.createdon,
            "userName": formData.username,
            "firstName": formData.fName,
            "lastName": formData.lName,
            "email": formData.emailId,
            "mobile": formData.mobileNo,
            "dob": formData.dob,
            "pancardNo": formData.panNumber,
            "rrn": selectedCorpUserToEdit.rrn,
            "corpRoleId": selectedCorpUserToEdit.corpRoleId,
            "aadharCard": "",
            "passport": "",
            "passportNo": formData.passNumber,
            "boardResolution": "",
            "userImage": images.ui == null || images.ui == "" || images.ui == undefined ? "" : images.ui.split(',')[1],
            "aadharCardNo": formData.aadharCardNo,
            "otherDoc": images.od == null || images.od == "" || images.od == undefined ? "" : images.od.split(',')[1],
            "certificateIncorporation": "",
            "designation": selectedCorpUserToEdit.designation,
            "parentRrn": selectedCorpUserToEdit.parentRrn,
            "updatedby": this.commonData.user_ID,
            "menuList": commSeperatedMenus.join(),
            "accountList": commaSeperatedAccounts.join(),
            "token":"HARD",
            "parentRoleId": selectedCorpUserToEdit.parentRoleId,
            "parentUserName": formData.user,
            "parentId": selectedCorpUserToEdit.parentId,
            "role_ID": this.commonData.roleTypeId,
            "user_ID": this.commonData.user_ID,
            "subMenu_ID": this.commonData.submenuId,
            "activityName": this.commonData.submenuname,
        }
      ]
    }
    return inputData;
  }

  deleteCorpUserCall(item) {
    var inputData = {
      "id": item.id
    }
    return inputData;
  }

  getCorpCompanyEditCall(id, images, formdata, selCorpCompnay) {
    var inputData = {
      "id": id,
      "companyName": formdata.corpCompanyName,
      "companyCode": selCorpCompnay.companyCode,
      "companyInfo": formdata.corpCompanyInfo,
      "cif": formdata.cif,
      "rrn": formdata.rrn,
      "coi": images.coi.split(',')[1],
      "moa": images.moa.split(',')[1],
      "otherDoc": images.otherdocs.split(',')[1],
      "logo": images.logo.split(',')[1],
      "establishmentOn": formdata.establishmentOn,
      "corporateType": selCorpCompnay.corporateType,
      "statusId": formdata.status,
      "createdOn": selCorpCompnay.createdOn,
      "phoneNo": formdata.phoneNo,
      "pancardNo": formdata.pancardNo,
      "updatedBy": this.commonData.user_ID,
      "role_ID": this.commonData.roleTypeId,
      "user_ID": this.commonData.user_ID,
      "subMenu_ID": this.commonData.submenuId,
      "activityName": this.commonData.submenuname,
      "remark": formdata.remark ? formdata.remark : ""
    }
    return inputData;
  }

  getCorpCompanyMenuEditCall(corpCompanyrequMenuArr) {
    var inputData = {
      "corpMenuList": corpCompanyrequMenuArr
    }
    return inputData;
  }

  getCorpCompanyAccountEditCall(corpCompanyrequAccountsArr) {
    var inputData = {
      "corpAccList": corpCompanyrequAccountsArr
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
}
