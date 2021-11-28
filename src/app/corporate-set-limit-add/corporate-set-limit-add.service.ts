import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateSetLimitAddService {

  constructor(
    private commonDataShareService: CommonDataShareService
  ) { }

  saveCorpSetLimitCall(corpLimitDataArr, corpCompanyId) {
    var inputData = {
      "corpCompId": corpCompanyId.companyId,
      "currency": "USD",
      "createdBy": this.commonDataShareService.user_ID,
      "accountNumber": corpCompanyId.id,
      "user_ID": this.commonDataShareService.user_ID,
      "role_ID": this.commonDataShareService.roleTypeId,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "remark": "",
      "activityName": this.commonDataShareService.submenuname,
      "corpLimitData": corpLimitDataArr
    }
    return inputData;
  }

  saveCorpSetLimitWithRemarkCall(corpLimitDataArr, corpCompanyId, remarkData) {
    var inputData = {
      "corpCompId": corpCompanyId.companyId,
      "currency": "USD",
      "createdBy": this.commonDataShareService.user_ID,
      "accountNumber": corpCompanyId.id,
      "user_ID": this.commonDataShareService.user_ID,
      "role_ID": this.commonDataShareService.roleTypeId,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "remark": remarkData.remark,
      "activityName": this.commonDataShareService.submenuname,
      "corpLimitData": corpLimitDataArr
    }
    return inputData;
  }
}
