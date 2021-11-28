import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class HolidayListAddService {

  constructor(
    private commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods
  ) { }

  getholidayAddParam(formdata) {
    var commSeperatedStates: any = [];
    formdata.state.forEach(element => {
      commSeperatedStates.push(element.stateName);
    });
    var inputData = {
      "name": formdata.holidayName,
      "holidayDate": formdata.holidayDate,
      "stateName": commSeperatedStates.join(),
      "createdBy": this.commonDataShareService.user_ID,
      "statusId": 3,
	    "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": this.commonDataShareService.user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "remark":"",
      "activityName": this.commonDataShareService.submenuname
    }
    return inputData;
  }

  getholidayAddParamWithRemark(formdata, remarkData) {
    var commSeperatedStates: any = [];
    formdata.state.forEach(element => {
      commSeperatedStates.push(element.stateName);
    });
    var inputData = {
      "name": formdata.holidayName,
      "holidayDate": formdata.holidayDate,
      "stateName": commSeperatedStates.join(),
      "createdBy": this.commonDataShareService.user_ID,
      "statusId": 3,
	    "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": this.commonDataShareService.user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "remark": remarkData.remark,
      "activityName": this.commonDataShareService.submenuname
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        //this.user_ID = this.commonDataShareService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Holiday Bulk List',
            "category":"Master",
            "action":operation,
            "properties":URL,
            "IP":this.commonDataShareService.user_IP,
            "X-FORWARDEDIP":this.commonDataShareService.user_IP,
            "Lat":this.commonDataShareService.user_lat,
            "Lon":this.commonDataShareService.user_lon,
            "Browser":this.commonMethod.getBrowserName(),
            "Device":"",
            "OS":this.commonMethod.getOSName(),
            "CHANNELID":"4",
            "CREATEDBY":this.commonDataShareService.user_ID,
            "CREATEDBYNAME":this.commonDataShareService.user_Name,
             "UPDATEDBY":this.commonDataShareService.user_ID,
            "UPDATEDBYNAME":this.commonDataShareService.user_Name,
            "authorization":"0"

        }
        return inputData;
      }
}