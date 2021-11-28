import { Injectable } from '@angular/core';

import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class CustomerOfferAddService {

  constructor(
     public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  getOfferAddParam(formData, images ,userDtls) {
    var inputData = {
      "base64ImageSmall": images.smallImage.split(',')[1],
      "base64ImageLarge": images.largeImage.split(',')[1],
      "imgcaption": formData.officeCaption ,
      "appId":  formData.productType, // file
      "seqNumber": formData.seqNo, ///input feild
      "createdby": userDtls.user_ID, /// userid
      "statusId": formData.status,	// staus
      "updatedby": userDtls.user_ID, //userid
      "latitude": formData.lat,
      "longitude": formData.lon,
      "weblink": formData.webLink,
      "serviceType": formData.serviceType,
      "validFrom": formData.fromDate,
      "validTo": formData.toDate,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": userDtls.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  getOfferAddParamWithRemark(formData, images ,userDtls, remarkData) {
    var inputData = {
      "base64ImageSmall": images.smallImage.split(',')[1],
      "base64ImageLarge": images.largeImage.split(',')[1],
      "imgcaption": formData.officeCaption ,
      "appId":  formData.productType, // file
      "seqNumber": formData.seqNo, ///input feild
      "createdby": userDtls.user_ID, /// userid
      "statusId": formData.status,	// staus
      "updatedby": userDtls.user_ID, //userid
      "latitude": formData.lat,
      "longitude": formData.lon,
      "weblink": formData.webLink,
      "serviceType": formData.serviceType,
      "validFrom": formData.fromDate,
      "validTo": formData.toDate,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": userDtls.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark":  remarkData.remark
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Offers',
            "category":"General",
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
