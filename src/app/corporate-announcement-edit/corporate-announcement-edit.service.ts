import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorporateAnnouncementEditService {

  createdon: any;
  constructor(
    private commonDataShareService: CommonDataShareService,
     public commonMethod: CommonMethods
  ) { }

    updateAnnouncementCall(formData, images, userDtls, id) {
      this.createdon = this.commonDataShareService.announcementData.createdon;
      var inputData = {
        "id": id,
        "announcementHeader": formData.announcementHeaderName,
        "announcementDescription": formData.announcementDesc,
        "seqNumber": formData.seqNo,
        "createdby": userDtls.user_ID,
        "createdon": this.createdon,
        "updatedby": userDtls.user_ID,
        "statusId": formData.status,
        "appId": formData.productType,
        "baseImageSmall": images.smallImage.split(',')[1],
        "baseImageLarge": images.largeImage.split(',')[1],
        "validFrom": formData.fromDate,
        "validTo": formData.toDate,
        "latitude": formData.lat,
        "longitude": formData.lon,
        "weblink": formData.webLink,
        "type": formData.announcementType,
        "imagecaption": formData.caption,
        "role_ID": this.commonDataShareService.roleTypeId,
        "user_ID": userDtls.user_ID,
        "subMenu_ID": this.commonDataShareService.submenuId,
        "activityName": this.commonDataShareService.submenuname,
        "remark": ''
      }
    return inputData;
  }

  updateAnnouncementWithRemarkCall(formData, images, userDtls, id, remarkData) {
    this.createdon = this.commonDataShareService.announcementData.createdon;
    var inputData = {
      "id": id,
      "announcementHeader": formData.announcementHeaderName,
      "announcementDescription": formData.announcementDesc,
      "seqNumber": formData.seqNo,
      "createdby": userDtls.user_ID,
      "createdon": this.createdon,
      "updatedby": userDtls.user_ID,
      "statusId": formData.status,
      "appId": formData.productType,
      "baseImageSmall": images.smallImage.split(',')[1],
      "baseImageLarge": images.largeImage.split(',')[1],
      "validFrom": formData.fromDate,
      "validTo": formData.toDate,
      "latitude": formData.lat,
      "longitude": formData.lon,
      "weblink": formData.webLink,
      "type": formData.announcementType,
      "imagecaption": formData.caption,
      "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": userDtls.user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "activityName": this.commonDataShareService.submenuname,
      "remark": remarkData.remark
    }
  return inputData;
}

 addAuditTrailAdaptorParams(URL,operation) {
     // this.user_ID = this.commonDataService.user_ID;
      var inputData = {
          "ChannelName": "DESKTOP",
          "channelRequest": URL,
          "eventName":'Corporate Announcement',
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
