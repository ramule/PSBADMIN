import { Injectable } from '@angular/core';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterCustomizeSubmenuEditService {
  masterMenu: any;
  constructor(
    public commonMethod: CommonMethods
  ) { }

  updateMasterMenuCall(formData,subMenuId, menuResData) {
    var uppercaseMenuName = formData.menuName.toUpperCase();
    console.log(uppercaseMenuName);
    var jsonKeyStr = uppercaseMenuName.replace(/ /g,'_');
    console.log(jsonKeyStr);
    var inputData = {
      "id":subMenuId,
      "submenuName":formData.menuName,
      "statusId":formData.status,
      "menuLogo":formData.menuLogo,
      "jsonKey": jsonKeyStr,
      "createdOn": menuResData.createdOn,
      "appId": formData.channel,
      "createdby": menuResData.createdby

    }
    return inputData;
  }
}
