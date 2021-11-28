import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorporateCompanyAddService {

  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  addCorporateCompanyDetailsCall(formData, images, userDtls) {
    var inputData = {
      "companyCode": formData.companyCode,
      "companyName": formData.companyName,
      "shortName": formData.shortName,
      "companyInfo": formData.CompanyInfo,
      "establishmentOn": formData.establishmentOn,
      "logo": null,
      "createdBy": userDtls.user_ID,
      "cif": formData.cif,
      // "makerLimit": formData.makerLimit,
      // "checkerLimit": formData.checkerLimit,
      "approvalLevel":formData.approval,
      "logoImage": images.logoImage.split(',')[1],
      "statusId":formData.status,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.commonDataService.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  addCorporateCompanyDetailsCallWithRemark(formData, images, userDtls,remarkData) {
    var inputData = {
      "companyCode": formData.companyCode,
      "companyName": formData.companyName,
      "shortName": formData.shortName,
      "companyInfo": formData.CompanyInfo,
      "establishmentOn": formData.establishmentOn,
      "logo": null,
      "createdBy": userDtls.user_ID,
      "cif": formData.cif,
      // "makerLimit": formData.makerLimit,
      // "checkerLimit": formData.checkerLimit,
      "approvalLevel":formData.approval,
      "logoImage": images.logoImage.split(',')[1],
      "statusId":formData.status,
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
            "eventName":'Corporate Company',
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
