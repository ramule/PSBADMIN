import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Injectable({
  providedIn: 'root'
})
export class CbsMessageTemplateEditService {

  user_ID:any;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonMethod: CommonMethods
  ) { }

  getCbsMessageTemplateEditParam(id, formData){
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": id,
      "errorcode": formData.errorCode,
      "errormessage": formData.errorMessage,
      "sms": formData.sms,
      "email": formData.email,
      "push": formData.push,
      "inapp": formData.inApp,
      "smstemplate": formData.smsTemplate,
      "emailtemplate": formData.emailTemplate,
      "inapptemplate": formData.inAppTemplate,
      "statusid": 3,
      "createdon": 1623386563000,
      "createdby": this.commonDataService.user_ID,
      "pushtemplate": formData.pushTemplate
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {

        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
             "eventName":'CBS Message Template',
            "category":"Calculator",
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
