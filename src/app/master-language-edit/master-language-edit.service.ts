import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { EncryptDecryptService } from '../encrypt-decrypt.service';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class MasterLanguageEditService {

  user_ID;
  masterLanguage: any;
  selectedLanguageDescription;
  constructor(
    private location: Location,
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
    public encryptDecryptService: EncryptDecryptService,
    public appConstants: AppConstants
  ) { }

  updateLanguageJSON(formData) {
    this.user_ID = this.commonDataService.user_ID;
    this.masterLanguage = this.location.getState();

    var encryptedLangText = this.encryptDecryptService.encryptText(this.appConstants.languageKey, formData.languageText);
    console.log('encryptedLangText: ', encryptedLangText);

    var decryptedLangText = this.encryptDecryptService.decryptText(this.appConstants.languageKey, encryptedLangText);
    console.log('decryptedLangText: ', decryptedLangText);

    // var encryptedLangDesc = this.encryptDecryptService.encryptText(this.appConstants.languageKey, formData.languagecode.split('-')[1]);
    // console.log('encryptedLangDesc: ', encryptedLangDesc);

    // var decryptedLangDesc = this.encryptDecryptService.decryptText(this.appConstants.languageKey, encryptedLangDesc);
    // console.log('decryptedLangDesc: ', decryptedLangDesc);

    var inputData = {
      "id": this.masterLanguage.id,
      "englishtext": formData.englishText,
      "languagecode": formData.languagecode.split('-')[0],
      "languagetext": encryptedLangText,
      "statusId": formData.isActive,
      "createdby" : this.user_ID,
      "languagecodedesc": formData.languagecode.split('-')[1],
      // "languagecodedesc": encryptedLangDesc,
      "role_ID": this.commonDataService.roleTypeId,
      "user_ID": this.user_ID,
      "subMenu_ID": this.commonDataService.submenuId,
      "activityName": this.commonDataService.submenuname,
      "remark": ''
    }
    return inputData;
  }

  updateLanguageJSONWithRemark(formData,remarkData) {
    this.user_ID = this.commonDataService.user_ID;
    this.masterLanguage = this.location.getState();

    var encryptedLangText = this.encryptDecryptService.encryptText(this.appConstants.languageKey, formData.languageText);
    console.log('encryptedLangText: ', encryptedLangText);

    var decryptedLangText = this.encryptDecryptService.decryptText(this.appConstants.languageKey, encryptedLangText);
    console.log('decryptedLangText: ', decryptedLangText);

    // var encryptedLangDesc = this.encryptDecryptService.encryptText(this.appConstants.languageKey, formData.languagecode.split('-')[1]);
    // console.log('encryptedLangDesc: ', encryptedLangDesc);

    // var decryptedLangDesc = this.encryptDecryptService.decryptText(this.appConstants.languageKey, encryptedLangDesc);
    // console.log('decryptedLangDesc: ', decryptedLangDesc);

    var inputData = {
      "id": this.masterLanguage.id,
      "englishtext": formData.englishText,
      "languagecode": formData.languagecode.split('-')[0],
      "languagetext": encryptedLangText,
      "statusId": formData.isActive,
      "createdby" : this.user_ID,
      "languagecodedesc": formData.languagecode.split('-')[1],
      // "languagecodedesc": encryptedLangDesc,
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
