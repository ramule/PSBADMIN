import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorporateUserEditService {

  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  editCorpUserCall(formdata, userDetails, corpDropdownData, id, images) {
    var inputData = {
      "id": id,
      "corp_comp_id": userDetails.corp_comp_id,
      "companyName": corpDropdownData.companyName,
      "countryName": corpDropdownData.countryName,
      "stateName": corpDropdownData.stateName,
      "cityName": corpDropdownData.cityName,
      "userType": corpDropdownData.userTypeName,
      "user_disp_name": formdata.userDisplayName,
      "pancardNumber": formdata.panCardNo,
      "first_name": formdata.firstName,
      "last_name": formdata.lastName,
      "country": formdata.country,
      "state": formdata.state,
      "city": formdata.city,
      "createdby": userDetails.createdby,
      "createdon": userDetails.createdon,
      "email_id": formdata.emailId,
      "user_type": formdata.userType,
      "personal_Phone": formdata.mobileNo,
      "work_phone": formdata.workPhoneNumber,
      "tempUserName": formdata.tempUserName,
      "nationalId": images.nationalid.split(',')[1],
      "passport": images.Passport.split(',')[1],
      "boardResolution": images.boardresolutionImg.split(',')[1],
      "user_image": images.userimage.split(',')[1],
      "otherDoc": images.otherdocsImg.split(',')[1],
      "certificate_incorporation": images.certofincorpImg.split(',')[1],
      "designation": formdata.designation,
      "statusid": formdata.statusId,
      "user_ID": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "subMenu_ID": this.commonDataService.submenuId,
      "remark": "",
      "activityName": this.commonDataService.submenuname,
    }
    return inputData;
  }

  editCorpUserWithRemarkCall(formdata, userDetails, corpDropdownData, id, remarkData, images) {
    var inputData = {
      "id": id,
      "corp_comp_id": userDetails.corp_comp_id,
      "companyName": corpDropdownData.companyName,
      "countryName": corpDropdownData.countryName,
      "stateName": corpDropdownData.stateName,
      "cityName": corpDropdownData.cityName,
      "userType": corpDropdownData.userTypeName,
      "user_disp_name": formdata.userDisplayName,
      "pancardNumber": formdata.panCardNo,
      "first_name": formdata.firstName,
      "last_name": formdata.lastName,
      "country": formdata.country,
      "state": formdata.state,
      "city": formdata.city,
      "createdby": userDetails.createdby,
      "createdon": userDetails.createdon,
      "email_id": formdata.emailId,
      "user_type": formdata.userType,
      "personal_Phone": formdata.mobileNo,
      "work_phone": formdata.workPhoneNumber,
      "tempUserName": formdata.tempUserName,
      "nationalId": images.nationalid.split(',')[1],
      "passport": images.Passport.split(',')[1],
      "boardResolution": images.boardresolutionImg.split(',')[1],
      "user_image": images.userimage.split(',')[1],
      "otherDoc": images.otherdocsImg.split(',')[1],
      "certificate_incorporation": images.certofincorpImg.split(',')[1],
      "designation": formdata.designation,
      "statusid": formdata.statusId,
      "user_ID": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "subMenu_ID": this.commonDataService.submenuId,
      "remark": remarkData.remark,
      "activityName": this.commonDataService.submenuname,
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
       // this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Corporate User',
            "category":"Corporate",
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
