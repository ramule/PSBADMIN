import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class ImpsSystemStatusEditService {

  timeoutStatusFlag: any;
  emailEnabledStatusFlag: any;
  expiredStatusFlag: any;

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  editSystemStatus(formdata, systemStatusData, timeoutStatus, emailEnabledStatus, expiredStatus){

    if(timeoutStatus == true) {
      this.timeoutStatusFlag = 'ON';
    }
    else {
      this.timeoutStatusFlag = 'OFF';
    }

    if(emailEnabledStatus == true) {
      this.emailEnabledStatusFlag = 'Y';
    }
    else {
      this.emailEnabledStatusFlag = 'N';
    }

    if(expiredStatus == true) {
      this.expiredStatusFlag = 'Y';
    }
    else {
      this.expiredStatusFlag = 'N';
    }

    var param = {
      "id": systemStatusData.id,
      "name": formdata.name,
      "state": formdata.state,
      "detail": formdata.detail,
      "groupName": formdata.groupName,
      "lastTick": systemStatusData.lastTick,
      "timeOut": 0,
      "command":"",
      "validCommands":"",
      "tags":"",
      "timeoutState": this.timeoutStatusFlag,
      "expired": this.expiredStatusFlag,
      "maxEvents": formdata.maxEvents,
      "enableEmail": this.emailEnabledStatusFlag
    }
    return param;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        //this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'City Master Edit',
            "category":"Master",
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
