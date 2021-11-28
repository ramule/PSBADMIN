import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class ImpsDeliveryChannelAddService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  addDeliveryChannelCall(formData, isMPINNeeded, isAccNumPartial, isCustomerAuthenticated, isRemMobileNeeded) {
    var mpinNeededStatus = isMPINNeeded == true ? 'Y' : 'N';
    var accNumPartialStatus = isAccNumPartial == true ? 'Y' : 'N';
    var custAuthStatus = isCustomerAuthenticated == true ? 'Y' : 'N';
    var remMobileNeededStatus = isRemMobileNeeded == true ? 'Y' : 'N';
    var inputData = {
      "name": formData.name,
      "nfs_channel_code": formData.channelCode,
      "daily_limit_amount": formData.dailyLimitAmt,
      "monthly_limit_amount": formData.monthlyLimitAmt,
      "mcc": formData.mcc,
      "pos_entry_mode": formData.posEntryMode,
      "pos_condition_code": formData.posConditionCode,
      "check_mpin": mpinNeededStatus,
      "cust_authenticated": custAuthStatus,
      "accnum_partial": accNumPartialStatus,
      "otp_limit": formData.otpLimit,
      "otp_validity": formData.otpValidity,
      "check_remitter_mobile": remMobileNeededStatus
    }
    return inputData;
  }


  addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'IFSC Codes',
            "category":"IMPS",
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
