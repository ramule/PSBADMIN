import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class ImpsSmsTemplatesEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  smsTemplateEditCall(formdata, id, smsTemplateData) {
    var inputData = {
      "id": id,
      "name": formdata.name,
      "template": formdata.template,
      "type": formdata.type,
      "target": formdata.target,
      "tran_type": formdata.transType == '-' ? '' : formdata.transType,
      "cdci_status": formdata.cdciStatus == '-' ? '' : formdata.cdciStatus,
      "nfs_status": smsTemplateData.nfs_status,
      "nfs_response_code": smsTemplateData.nfs_response_code
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        //this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'System Config Edit',
            "category":"IMPS",
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
