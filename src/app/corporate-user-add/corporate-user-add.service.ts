import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorporateUserAddService {

  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  //"designation": corpDropdownData.designationName,
  addCorporateUserCall(formdata, images, companyDetails, corpDropdownData) {
    var inputData = {
      "corp_comp_id": companyDetails.corpCompanyId,
      "companyName": corpDropdownData.companyName,
      "user_disp_name": formdata.userDisplayName,
      "createdby": this.commonDataService.user_ID,
      "first_name": formdata.firstName,
      "last_name": formdata.lastName,
      "email_id": formdata.emailId,
      "country": companyDetails.countryId,
      "countryName": corpDropdownData.countryName,
      "state": companyDetails.stateId,
      "stateName": corpDropdownData.stateName,
      "city": companyDetails.cityId,
      "cityName": corpDropdownData.cityName,
      "user_type": formdata.userType,
      "userType": corpDropdownData.userTypeName,
      "pancardNumber": formdata.panCardNo,
      "work_phone": formdata.workPhoneNumber,
      "personal_Phone": formdata.personalPhoneNumber,
      "tempUserName": formdata.tempUserName,
      "designation": formdata.designation,
      "nationalId": images.nationalid.split(',')[1],
      "passport": images.Passport.split(',')[1],
      "boardResolution": images.boardresolutionImg.split(',')[1],
      "user_image": images.userimage.split(',')[1],
      "otherDoc": images.otherdocsImg.split(',')[1],
      "certificate_incorporation": images.certofincorpImg.split(',')[1],
      "statusName": formdata.statusId,
      "user_ID": this.commonDataService.user_ID,
      "role_ID": this.commonDataService.roleTypeId,
      "subMenu_ID": this.commonDataService.submenuId,
      "remark": "",
      "activityName": this.commonDataService.submenuname,
    }
    return inputData;
  }

  addCorporateUserWithRemarkCall(formdata, images, companyDetails,corpDropdownData, remarkData) {
    var inputData = {
      "corp_comp_id": companyDetails.corpCompanyId,
      "companyName": corpDropdownData.companyName,
      "user_disp_name": formdata.userDisplayName,
      "createdby": this.commonDataService.user_ID,
      "first_name": formdata.firstName,
      "last_name": formdata.lastName,
      "email_id": formdata.emailId,
      "country": companyDetails.countryId,
      "countryName": corpDropdownData.countryName,
      "state": companyDetails.stateId,
      "stateName": corpDropdownData.stateName,
      "city": companyDetails.cityId,
      "cityName": corpDropdownData.cityName,
      "user_type": formdata.userType,
      "userType": corpDropdownData.userTypeName,
      "pancardNumber": formdata.panCardNo,
      "work_phone": formdata.workPhoneNumber,
      "personal_Phone": formdata.personalPhoneNumber,
      "tempUserName": formdata.tempUserName,
      "designation": formdata.designation,
      "nationalId": images.nationalid.split(',')[1],
      "passport": images.Passport.split(',')[1],
      "boardResolution": images.boardresolutionImg.split(',')[1],
      "user_image": images.userimage.split(',')[1],
      "otherDoc": images.otherdocsImg.split(',')[1],
      "certificate_incorporation": images.certofincorpImg.split(',')[1],
      "statusName": formdata.statusId,
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
