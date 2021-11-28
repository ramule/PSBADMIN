import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
        public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  getCountryDetails(formData, filterValue) {
    if(filterValue === "customerId") {
      var inputData={
        "custid": formData.searchVal,
        "mobileno": ""
      }
      return inputData;
    }
    else {
      var inputData1={
        "custid": "",
        "mobileno": formData.searchVal
      }
      return inputData1;
    }
  }

  updateCountryRestrictionStatus(Id, StatusId) {
    var inputData = {
      "id": Id,
      "statusid": StatusId
    }
    return inputData;
  }

   addAuditTrailAdaptorParams(URL,operation) {

        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Country Restrictions',
            "category":"Country",
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
