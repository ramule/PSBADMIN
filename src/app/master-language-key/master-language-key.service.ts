import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { EncryptDecryptService } from '../encrypt-decrypt.service';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class MasterLanguageKeyService {
  user_ID;
  selectedLanguageDescription;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
    public encryptDecryptService: EncryptDecryptService,
    public appConstants: AppConstants
  ) { }

  addMasterLanguage(formData,formArray, languageArray) {
    var objIndex = languageArray.findIndex((obj) => obj.languagecode == formArray.languageCode)
    var languageDesc = languageArray[objIndex].languagecodedesc;

    var encryptedLangText = this.encryptDecryptService.encryptText(this.appConstants.languageKey, formArray.languageText);
    console.log('encryptedLangText: ', encryptedLangText);

    var decryptedLangText = this.encryptDecryptService.decryptText(this.appConstants.languageKey, encryptedLangText);
    console.log('decryptedLangText: ', decryptedLangText);

    var encryptedLangDesc = this.encryptDecryptService.encryptText(this.appConstants.languageKey, languageDesc);
    console.log('encryptedLangDesc: ', encryptedLangDesc);

    var decryptedLangDesc = this.encryptDecryptService.decryptText(this.appConstants.languageKey, encryptedLangDesc);
    console.log('decryptedLangDesc: ', decryptedLangDesc);

    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": formArray.id,
      "englishtext": formData.englishText,
      "languagecode": formArray.languageCode,
      "languagetext": encryptedLangText,
      "createdon": formArray.createdon,
      "createdby": formArray.createdby == "" ? this.commonDataService.user_ID : formArray.createdby,
      // "languagecodedesc": languageDesc,
      "languagecodedesc": encryptedLangDesc,
      "statusId": 3,
      "createdByName": formArray.createdByName,
      "statusName": "ACTIVE"
    }
    return inputData;
  }

  addMasterLanguageWithRemark(formData,remarkData,formArray, languageArray) {
    var objIndex = languageArray.findIndex((obj) => obj.languagecode == formArray.languageCode)
    var languageDesc = languageArray[objIndex].languagecodedesc;

    var encryptedLangText = this.encryptDecryptService.encryptText(this.appConstants.languageKey, formArray.languageText);
    console.log('encryptedLangText: ', encryptedLangText);

    var decryptedLangText = this.encryptDecryptService.decryptText(this.appConstants.languageKey, encryptedLangText);
    console.log('decryptedLangText: ', decryptedLangText);

    var encryptedLangDesc = this.encryptDecryptService.encryptText(this.appConstants.languageKey, languageDesc);
    console.log('encryptedLangDesc: ', encryptedLangDesc);

    var decryptedLangDesc = this.encryptDecryptService.decryptText(this.appConstants.languageKey, encryptedLangDesc);
    console.log('decryptedLangDesc: ', decryptedLangDesc);

    this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "englishtext" : formData.englishText,
      "languagecode" : formArray.languageCode,
      "languagetext" : encryptedLangText,
      "statusId" : 3,
      "createdby" : this.user_ID,
      // "languagecodedesc": languageDesc,
      "languagecodedesc": encryptedLangDesc,
      "appid": 3,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": remarkData.remark
    }
    return inputData;
  }



   addAuditTrailAdaptorParams(URL,operation) {
        this.user_ID = this.commonDataService.user_ID;
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Language Json',
            "category":"Master",
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
