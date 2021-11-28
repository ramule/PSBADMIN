import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class AdminOmniChannelRequestEditService {
  user_ID :any;
  mobileNo;
  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  generateOtpRequestCall(formData, id, statusId) {

    this.mobileNo = formData.mobileNo;
    var inputData = {
      "id": id,
      "statusid": statusId,
      "mobile": formData.mobileNo
    }
    return inputData;
  }

  validateOtpRequestCall(formData, id, statusId) {
    var inputData = {
      "id": id,
	    "statusid": statusId,
	    "mobile": this.mobileNo,
	    "otpCode": formData.otp
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
          "ChannelName": "DESKTOP",
          "channelRequest": URL,
          "eventName":'Omni Channel Request',
          "category":"Administration",
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
