import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterCustomizeSubmenuAddService {
  user_ID;
  constructor(
     public commonMethod: CommonMethods,
     public commonData: CommonDataShareService
  ) { }

  addSubMasterMenuCall(formData) {
    var uppercaseMenuName = formData.subMenuName.toUpperCase();
    console.log(uppercaseMenuName);
    var jsonKeyStr = uppercaseMenuName.replace(/ /g,'_');
    console.log(jsonKeyStr);
    var inputData = {
      "submenuName": formData.subMenuName,
      "menuLogo": formData.logoPath,
      "jsonKey": jsonKeyStr,
      "appId": formData.channel,
      "statusId": formData.status,
      "createdby": this.commonData.user_ID
    }
    return inputData;
  }
}
