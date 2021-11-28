import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeDetailsService {

  constructor(
    private commonDataService : CommonDataShareService
  ) { }

  themeListService(){
    let map = {
      "entityId": "MOBILE",
      "cbsType": "TCS",
      "mobPlatform": "android",
      "mobileAppVersion": "1.0.0",
      "deviceId": "9",
      "clientAppVer": "1.0.0"  
    }

    var inputData = {
      "entityId": "MOBILE",
      "deviceId": "9",
      "map":  this.commonDataService.encryptRequestData(map, "@MrN$2Qi8R")
    }

    return inputData;
  }

  themeEditService(formData,cssFile,themeId,status){
    var inputData = {
      "entityId": "MOBILE",
      "deviceId": "9",
      "map": {
        "entityId": "MOBILE",
        "cbsType": "TCS",
        "mobPlatform": "android",
        "mobileAppVersion": "1.0.0",
        "deviceId": "9",
        "clientAppVer": "1.0.0",
        "themeName": formData.themeName,
        "themeData": this.commonDataService.encryptRequestData(cssFile, "@MrN$2Qi8R"),
        "channelId" : formData.channel,
        "themeLogo":formData.images,
        "postostFix": formData.postfix,
        "dasboardbackImage":formData.dashboardBg,
        "logoImage":formData.uploadLogo,
        "themeId":themeId,
        "isDefaultTheme":status
      }
    }

    return inputData;
  }
}
