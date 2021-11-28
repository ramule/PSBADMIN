import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorporateOffersEditService {

  createdon: any;
  constructor(
    private commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  updateOfferCall(formData, images, user_ID , id) {
    this.createdon = this.commonDataShareService.offerData.createdon;
    var inputData = {
      "id": id,
      "base64ImageSmall": images.smallImage.split(',')[1],
      "base64ImageLarge": images.largeImage.split(',')[1],
      "imgcaption": formData.offerCaption,
      "appId": formData.productType,
      "seqNumber": formData.seqNo,
      "createdby": user_ID,
      "statusId": formData.status,
      "updatedby":user_ID,
      "latitude": formData.lat,
      "longitude": formData.long,
      "weblink": formData.webLink,
      "serviceType": formData.serviceType,
      "validFrom": formData.fromDate,
      "validTo": formData.toDate,
      "createdon": this.createdon,
      "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "activityName": this.commonDataShareService.submenuname,
      "remark":  ''
    }
    return inputData
  }

  updateOfferWithRemarkCall(formData, images, user_ID , id, remarkData) {
    this.createdon = this.commonDataShareService.offerData.createdon;
    var inputData = {
      "id": id,
      "base64ImageSmall": images.smallImage.split(',')[1],
      "base64ImageLarge": images.largeImage.split(',')[1],
      "imgcaption": formData.offerCaption,
      "appId": formData.productType,
      "seqNumber": formData.seqNo,
      "createdby": user_ID,
      "statusId": formData.status,
      "updatedby":user_ID,
      "latitude": formData.lat,
      "longitude": formData.long,
      "weblink": formData.webLink,
      "serviceType": formData.serviceType,
      "validFrom": formData.fromDate,
      "validTo": formData.toDate,
      "createdon": this.createdon,
      "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "activityName": this.commonDataShareService.submenuname,
      "remark": remarkData.remark
    }
    return inputData
  }

   addAuditTrailAdaptorParams(URL,operation) {
       // this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Corporate Offers',
            "category":"Corporate",
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
