import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class AdapterSrcIpService {

  user_ID:any;
  createdon: any;
  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  addAdapterServiceCall(formData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "sourceIp": formData.sourceIp,
      "appId": formData.adapterChannel,
      "createdby": this.user_ID,
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

  addAdapterServiceWithRemarkCall(formData, remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "sourceIp": formData.sourceIp,
      "appId": formData.adapterChannel,
      "createdby": this.user_ID,
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

  deleteChannelCall(formData) {
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.adapterIp.createdon;
    var inputData = {
      "id": formData.id,
      "sourceIp": formData.sourceIp,
      "appId": formData.appId,
      "createdon": this.createdon,
      "createdby": this.user_ID ,
      "updatedby": this.user_ID,
      "statusId": formData.statusId,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": 'ADAPTERSRCIPDELETE',
      "remark": ''
    }
    return inputData;
  }

  deleteChannelWithRemarkCall(formData, remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    this.createdon = this.commonDataService.adapterIp.createdon;
    var inputData = {
      "id": formData.id,
      "sourceIp": formData.sourceIp,
      "appId": formData.appId,
      "createdon": this.createdon,
      "createdby": this.user_ID ,
      "updatedby": this.user_ID,
      "statusId": formData.statusId,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": 'ADAPTERSRCIPDELETE',
      "remark": remarkData.remarkDelete
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
