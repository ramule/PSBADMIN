import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class CustomerAgentEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
  ) { }

  getAgentparam(id,formData,isResetMobileChecked, regFlag, blockFlag, isMpinEnabledFlag, isTpinBlockedFlag, isWebEnabledFlag, isMobileEnabledFlag, isBiometricEnabledFlag){
    var RegisterFlag = regFlag == true ? 'Y' : 'N';
    var Blockflag = blockFlag == true ? 'Y' : 'N';
    var mpinEnableFlg = isMpinEnabledFlag == true ? 'Y' : 'N';
    var tpinBlockedFlg = isTpinBlockedFlag == true ? 'Y' : 'N';
    var mobileEnableFlg = isMobileEnabledFlag == true ? 'Y' : 'N';
    var webEnableFlg = isWebEnabledFlag == true ? 'Y' : 'N';
    var biometricEnableFlg = isBiometricEnabledFlag == true ? 'Y' : 'N';
    var inputData={
      "id": id,
      "ismpinenabled": mpinEnableFlg,
      "istpinlocked":  tpinBlockedFlg,
      "isbiometricenabled": biometricEnableFlg,
      "ismobileenabled": mobileEnableFlg,
      "iswebenabled": webEnableFlg,
      "isUPIEnabled": formData.upiEnabled == 'YES' ? 'Y' : 'N',
      "isUPIRegistered": RegisterFlag,
      "isBlocked_upi": Blockflag,
      "preferedlanguage": formData.prefLang,
      "statusid": formData.Status,
      "ibregstatus": formData.mobileBlockedStatus,
      "appName": formData.productType,
      "wrongattemptsmpin": formData.mpinWrongAttempts,
      "wrongattemptstpin": formData.tpinWrongAttempts,
      "wrongattemptspwd": formData.passwordWrongAttempts,
      "resetLastMobileLoggedIn": isResetMobileChecked,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "createdon": this.commonDataService.customerAgent.createdon,
      "remark": ''
    }

    return inputData;
  }

  getCustAgentAddParamWithRemark(id,isResetMobileChecked,formData,remark, regFlag, blockFlag, isMpinEnabledFlag, isTpinBlockedFlag, isWebEnabledFlag, isMobileEnabledFlag, isBiometricEnabledFlag)
  {
    var RegisterFlag = regFlag == true ? 'Y' : 'N';
    var Blockflag = blockFlag == true ? 'Y' : 'N';
    var mpinEnableFlg = isMpinEnabledFlag == true ? 'Y' : 'N';
    var tpinBlockedFlg = isTpinBlockedFlag == true ? 'Y' : 'N';
    var mobileEnableFlg = isMobileEnabledFlag == true ? 'Y' : 'N';
    var webEnableFlg = isWebEnabledFlag == true ? 'Y' : 'N';
    var biometricEnableFlg = isBiometricEnabledFlag == true ? 'Y' : 'N';
    var inputData={
      "id": id,
      "ismpinenabled": mpinEnableFlg,
      "istpinlocked":  tpinBlockedFlg,
      "isbiometricenabled": biometricEnableFlg,
      "ismobileenabled": mobileEnableFlg,
      "iswebenabled": webEnableFlg,
      "isUPIEnabled": formData.upiEnabled == 'YES' ? 'Y' : 'N',
      "isUPIRegistered": RegisterFlag,
      "isBlocked_upi": Blockflag,
      "preferedlanguage": formData.prefLang,
      "statusid": formData.Status,
      "ibregstatus": formData.mobileBlockedStatus,
      "appName": formData.productType,
      "wrongattemptsmpin": formData.mpinWrongAttempts,
      "wrongattemptstpin": formData.tpinWrongAttempts,
      "wrongattemptspwd": formData.passwordWrongAttempts,
      "resetLastMobileLoggedIn": isResetMobileChecked,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "createdon": this.commonDataService.customerAgent.createdon,
      "remark": remark.remark
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
     var inputData = {
       "ChannelName": "DESKTOP",
       "channelRequest": URL,
       "eventName":'Customers',
       "category":"Customers",
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
