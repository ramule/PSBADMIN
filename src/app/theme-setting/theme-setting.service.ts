import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeSettingService {

  constructor(
    private commonDataService : CommonDataShareService
  ) { }

  themeSettingService(formData,cssFile,uploadLogo,dashboardBgImg,image,status){

    var inputData = {
      "entityId": "DESKTOP",
      "deviceId": "9",
      "map": {
        "entityId": "DESKTOP",
        "cbsType": "TCS",
        "mobPlatform": "android",
        "mobileAppVersion": "1.0.0",
        "deviceId": "9",
        "clientAppVer": "1.0.0",
        "themeName": formData.themeName,
        "themeData": this.commonDataService.encryptRequestData(cssFile, "@MrN$2Qi8R"),
        "themeLogo": image,
        "postostFix":formData.postfix,
        "dasboardbackImage": dashboardBgImg,
        "logoImage": uploadLogo,
        "channelId": formData.channel,
        "isDefaultTheme":status
        //"status": formData.status
      }
    }

    return inputData;
  }
}
