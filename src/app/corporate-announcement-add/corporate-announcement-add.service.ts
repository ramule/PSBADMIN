import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorporateAnnouncementAddService {

  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod : CommonMethods
  ) { }

  getAnnouncementParams(formData,images,userDtls) {
    var inputData = {
      "announcementHeader": formData.announcementHeaderName,
      "announcementDescription": formData.announcementDesc,
      "seqNumber": formData.seqNo,
      "createdby": userDtls.user_ID,
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
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": userDtls.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  getAnnouncementParamsWithRemark(formData,images,userDtls, remarkData) {
    var inputData = {
      "announcementHeader": formData.announcementHeaderName,
      "announcementDescription": formData.announcementDesc,
      "seqNumber": formData.seqNo,
      "createdby": userDtls.user_ID,
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
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": userDtls.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
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