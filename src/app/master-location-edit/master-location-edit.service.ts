import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { Location } from '@angular/common';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterLocationEditService {

  user_ID;
  masterLocation:any;
  constructor(
    private commonDataService: CommonDataShareService,
    private location: Location,
       public commonMethod: CommonMethods
  ) { }

  updateLocationCall(formData, selectedLoc) {
    this.masterLocation = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id"  : this.masterLocation.id,
      "locationTypeId"  : formData.locType,
      "displayName"  : formData.displayName,
      "countryId" : formData.country,
      "stateId" : formData.state,
      "cityId" : formData.city,
      "appId": formData.productType,
      "address"  : formData.address,
      "branchCode"  : formData.branchCode,
      "emailAddress"  : formData.emailId,
      "phoneNumber" : formData.mobile,
      "latitude" : formData.latitude,
      "longitude" : formData.longitude,
      "postCode"  : formData.postCode,
      "languageCode"  : formData.langCode,
      "createdon": selectedLoc.createdon,
      "createdby": this.user_ID,
      "updatedby" : this.user_ID,
      "statusId" : formData.status,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateLocationCallWithRemark(formData, selectedLoc, remarkData) {
    this.masterLocation = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id"  : this.masterLocation.id,
      "locationTypeId"  : formData.locType,
      "displayName"  : formData.displayName,
      "countryId" : formData.country,
      "stateId" : formData.state,
      "cityId" : formData.city,
      "appId": formData.productType,
      "address"  : formData.address,
      "branchCode"  : formData.branchCode,
      "emailAddress"  : formData.emailId,
      "phoneNumber" : formData.mobile,
      "latitude" : formData.latitude,
      "longitude" : formData.longitude,
      "postCode"  : formData.postCode,
      "languageCode"  : formData.langCode,
      "createdon": selectedLoc.createdon,
      "createdby": this.user_ID,
      "updatedby" : this.user_ID,
      "statusId" : formData.status,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Master Location',
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
