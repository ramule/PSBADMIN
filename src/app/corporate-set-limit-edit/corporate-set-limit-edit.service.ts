import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateSetLimitEditService {

  constructor(
    private commonDataShareService: CommonDataShareService
  ) { }

  updateCorpSetLimitCall(corpLimitDataArr, corpCompanyId, createdBy) {
    var inputData = {
      "corpCompId": corpCompanyId.companyId,
      "currency": "USD",
      "createdBy": createdBy,
      "createdOn": this.commonDataShareService.setCorpLimits.createdOn,
      "adminWorkFlowId": corpCompanyId.id,
      "transLimitId": corpCompanyId.transLimitId,
      "accountNumber": corpCompanyId.accNum,
      "user_ID": this.commonDataShareService.user_ID,
      "role_ID": this.commonDataShareService.roleTypeId,
      "subMenu_ID": 1412,
      "remark": "",
      "activityName": "corpSetLimitEdit",
      "corpLimitData": corpLimitDataArr
    }
    return inputData;
  }

  updateCorpSetLimitWithRemarkCall(corpLimitDataArr, corpCompanyId, createdBy, remarkData) {
    var inputData = {
      "corpCompId": corpCompanyId.companyId,
      "currency": "USD",
      "createdBy": createdBy,
      "createdOn": this.commonDataShareService.setCorpLimits.createdOn,
      "adminWorkFlowId": corpCompanyId.id,
      "transLimitId": corpCompanyId.transLimitId,
      "accountNumber": corpCompanyId.accNum,
      "user_ID": this.commonDataShareService.user_ID,
      "role_ID": this.commonDataShareService.roleTypeId,
      "subMenu_ID": 1412,
      "remark": remarkData.remark,
      "activityName": "corpSetLimitEdit",
      "corpLimitData": corpLimitDataArr
    }
    return inputData;
  }
}
