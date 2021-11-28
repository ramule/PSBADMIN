import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
@Injectable({
  providedIn: 'root'
})
export class MasterDonationsEditService {

  donationId:any
  constructor(
    private location: Location,
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
    public commonServiceCall: HttpCommonServiceCallService
  ) { }

  updateDonationMasterCall(formData) {
    this.donationId = this.location.getState();
    var inputData = {
      "id": this.donationId.id,
      "name" : formData.companyName,
      "accountNumber" : formData.accNo,
      "type" : formData.type,
      "category" : formData.category,
      "statusId": formData.status,
      "createdon": this.commonDataService.DonationData.createdOn,
      "createdby": this.commonDataService.DonationData.createdby,
      "role_ID":this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateDonationMasterCallWithRemark(formData,remarkData) {
    this.donationId = this.location.getState();
    var inputData = {
      "id": this.donationId.id,
      "name" : formData.companyName,
      "accountNumber" : formData.accNo,
      "type" : formData.type,
      "category" : formData.category,
      "statusId": formData.status,
      "createdon": this.commonDataService.DonationData.createdOn,
      "createdby": this.commonDataService.DonationData.createdby,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }
   addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Donation',
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
