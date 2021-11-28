import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class AdminAdministrationAddUserService {
  user_ID :any;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  getAdduserParam(formData, images){
    var reqParam = {
      "userid" : formData.userId,
      "createdby" : this.commonDataService.user_ID,
      "updateby" : this.commonDataService.user_ID,
      "roleid" : formData.productType,
      "logintype": formData.userType,
      "rolename": null,
      "statusId": 3,
      "firstname" : formData.fname,
      "lastname" : formData.lname,
      "email" : formData.emailId,
      "mobileNumber" : formData.phoneNo,
      "phonenumber" : formData.phoneNo,
      "template" :"",
      "thumbnail" : images.smallImage.split(',')[1]
    }
    return reqParam;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Administration',
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

    getRoleTypeIdCall() {
      var inputData = {
        "roleTypeId": this.commonDataService.roleTypeId,
      }
      return inputData;
    }
}
