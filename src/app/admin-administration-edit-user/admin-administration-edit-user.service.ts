import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class AdminAdministrationEditUserService {
  user_ID :any;
  adminEditUser;
  constructor(
    private location: Location,
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  updateUserIdCall(formData, images, selectedUserId) {
    this.adminEditUser = this.location.getState();
    var inputData = {
      "usermasterid" : this.adminEditUser.id,
      "createdby": selectedUserId.createdby,
      "updateby" : formData.productType,
      "roleid" : formData.productType,
      "firstname" : formData.fname,
      "lastname" : formData.lname,
      "email" : formData.emailId,
      "phonenumber" : formData.phoneNo,
      "template" :"",
      "thumbnail" : images.smallImage.split(',')[1] ? images.smallImage.split(',')[1] : ''
    }
    return inputData;
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
}
