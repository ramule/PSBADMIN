import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { Location } from '@angular/common';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
@Injectable({
  providedIn: 'root'
})
export class MasterFacilityEditService {

  user_ID;
  masterFacility;
  constructor(
    private commonDataService: CommonDataShareService,
    private location: Location,
    public commonMethod: CommonMethods,
    public commonServiceCall:HttpCommonServiceCallService

  ) { }

  masterFacilityUpdateCall(formData, selectedFacility) {
    this.masterFacility = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id":this.masterFacility.id,
      "statusid": formData.status,
      "createdby": this.user_ID,
      "createdon": selectedFacility.createdon,
      "appid": formData.productType,
      "displayname": formData.displayName,
      "encryptiontype": formData.encryptionType,
      "activitycode": formData.activitycode,
      "limits": formData.limits,
      "ft_nft": formData.ftNft,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }


  masterFacilityUpdateCallWithRemark(formData, selectedFacility, remarkData) {
    this.masterFacility = this.location.getState();
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id":this.masterFacility.id,
      "statusid": formData.status,
      "createdby": this.user_ID,
      "createdon": selectedFacility.createdon,
      "appid": formData.productType,
      "displayname": formData.displayName,
      "encryptiontype": formData.encryptionType,
      "activitycode": formData.activitycode,
      "limits": formData.limits,
      "ft_nft": formData.ftNft,
      "role_ID": this.commonDataService.roleTypeId,
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
            "eventName":'Facility Master',
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
