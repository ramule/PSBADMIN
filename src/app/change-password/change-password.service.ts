import { Injectable } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  userid;
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
        public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  changePasswordCall(formData) {
    this.userid = this.commonDataService.username;
    var inputData = {
      "userid" : this.userid,
      "emailid" : formData.emailId,
      "newpassword": formData.newPassword,
      "oldpassword": formData.oldPassword
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Change Password',
            "category":"Password",
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
