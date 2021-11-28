import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class ImpsTransactionFeeSetupEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  editTransFee(formdata, id, isFeeAppliedFlag) {

    var appliedFee;
    if(isFeeAppliedFlag) {
      appliedFee = 'Y';
    }
    else {
      appliedFee = 'N';
    }

    var inputData = {
      "id": id,
      "transaction_type": formdata.transType,
      "transaction_direction": formdata.transDirection,
      "apply_fee": appliedFee,
      "description": formdata.desc
    };
    return inputData;
  }

  addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Transaction Fee Setup Edit',
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
