import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorporateCompanyEditService {

  createdOn: any;
  constructor(
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  updateCorpDetailsCall(formData, images, userDtls, id, corpCompData) {
    this.createdOn = this.commonDataShareService.corpCompanyDetails.createdOn;
    var inputData = {
      "id": id,
      "companyCode": formData.companyCode,
      "companyName": formData.companyName,
      "shortName": formData.shortName,
      "companyInfo": formData.CompanyInfo,
      "establishmentOn": formData.establishmentOn,
      "createdOn": this.createdOn,
      "logo": null,
      "statusId": formData.status,
      "createdBy": corpCompData.createdBy,
      "cif": formData.cif,
      "approvalLevel":formData.approval,
      "logoImage": images.logoImage.split(',')[1],
      "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": this.commonDataShareService.user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "activityName": this.commonDataShareService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateCorpDetailsCallWithRemark(formData, images, userDtls, id, corpCompData ,remarkData) {
    this.createdOn = this.commonDataShareService.corpCompanyDetails.createdOn;
    var inputData = {
      "id": id,
      "companyCode": formData.companyCode,
      "companyName": formData.companyName,
      "shortName": formData.shortName,
      "companyInfo": formData.CompanyInfo,
      "establishmentOn": formData.establishmentOn,
      "createdOn": this.createdOn,
      "logo": null,
      "statusId": formData.status,
      "createdBy": corpCompData.createdBy,
      "cif": formData.cif,
      "approvalLevel":formData.approval,
      "logoImage": images.logoImage.split(',')[1],
      "role_ID": this.commonDataShareService.roleTypeId,
      "user_ID": this.commonDataShareService.user_ID,
      "subMenu_ID": this.commonDataShareService.submenuId,
      "activityName": this.commonDataShareService.submenuname,
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
