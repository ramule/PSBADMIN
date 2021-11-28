import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyAnnouncementAddService {

  constructor(
    private commonDataService: CommonDataShareService
  ) { }

  getAnnouncementParams(formData, images ,userDtls) {
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

  getAnnouncementParamsWithRemark(formData, images ,userDtls, remarkData) {
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
}
