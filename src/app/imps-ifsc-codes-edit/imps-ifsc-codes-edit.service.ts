import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class ImpsIfscCodesEditService {
  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

editIFSC(formData,isCustomizedIFSC, isLiveFlag, beforeParams) {
    var isCustomizedData = isCustomizedIFSC == true ? "Y" : "N";
    var isLiveFlagData = isLiveFlag == true ? 'Y' : 'N';
    var inputData = {
      "id": beforeParams.id,
      "ifsc_code": formData.ifsc,
      "nbin": formData.nbin,
      "bank_name": formData.bank_name,
      "created_by": this.commonDataService.user_ID,
      "short_code": formData.short,
      "use_customized_ifsc": isCustomizedData,
      "bank_type": formData.banktype,
      "member_type": formData.membertype,
      "is_live": isLiveFlagData
    }
    return inputData;
  }


  addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'IFSC Codes',
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
