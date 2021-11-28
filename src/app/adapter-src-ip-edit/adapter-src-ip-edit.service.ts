import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class AdapterSrcIpEditService {

  user_ID:any;
  createdon: any;
  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  updateAdapterSrcIpCall(formData, id, channelId, srcIpData) {
    console.log(channelId);
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.adapterIp.createdon;
    var inputData = {
      "id": id,
      "sourceIp": formData.sourceIp,
      "appId": formData.adapterChannel,
      "createdon": this.createdon,
      "createdby": srcIpData.createdby,
      "updatedby": this.user_ID,
      "statusId": formData.status,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateAdapterSrcIpWithRemarkCall(formData, id, channelId, remarkData, srcIpData) {
    console.log(channelId);
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.adapterIp.createdon;
    var inputData = {
      "id": id,
      "sourceIp": formData.sourceIp,
      "appId": formData.adapterChannel,
      "createdon": this.createdon,
      "createdby": srcIpData.createdby ,
      "updatedby": this.user_ID,
      "statusId": formData.status,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
        "ChannelName": "DESKTOP",
        "channelRequest": URL,
        "eventName":'Adapter Source IP',
        "category":"Adapter",
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
    return inputData;
  }
}
