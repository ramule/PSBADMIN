import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class AdminAdminstrationService {
  user_ID :any;
  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  userStatusChange(id, status) {
    var inputData = {
      "usermasterid" : id,
      "statusId" : status,
      "updatedBy": this.commonDataService.user_ID,
      "userid": this.commonDataService.user_ID,
    }
    return inputData;
  }

  roleStatusChange(id, status) {
    var inputData = {
      "id" : id,
      "statusId" : status
    }
    return inputData;
  }

  deleteRoleCall(id) {
    var inputData = {
      "id": id
    }
    return inputData;
  }

  getResetPasswordParam(item){
    var inputData = {
      "userMasterId" : item.user_ID,
      "email" : item.email,
      "mobileNumber": item.mobileNumber
    }

    return inputData
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
