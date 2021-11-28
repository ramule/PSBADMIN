import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Injectable({
  providedIn: 'root'
})
export class ImpsMasterEditService {

  user_ID:any;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonMethod: CommonMethods
  ) { }

  getImpsMasterEditParam(formData, isImpsChecked, isNeftChecked, isRtgsChecked, isUpiChecked, beforeParams){
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": beforeParams.id,
      "bank": formData.bankName,
      "ifsc": formData.ifscCode,
      "branch": formData.branchName,
      "center": formData.center,
      "district": formData.district,
      "state": formData.state,
      "address": formData.address,
      "contact": formData.contact,
      "imps": isImpsChecked ? 'Y' : 'N',
      "rtgs": isRtgsChecked ? 'Y' : 'N',
      "city": formData.city,
      "neft": isNeftChecked ? 'Y' : 'N',
      "micr": formData.micr,
      "upi": isUpiChecked ? 'Y' : 'N',
      "createdby": beforeParams.createdby,
      "statusId": beforeParams.statusId,
      "updatedby": this.commonDataService.user_ID
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {

        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
             "eventName":'IMPS Master Edit',
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
