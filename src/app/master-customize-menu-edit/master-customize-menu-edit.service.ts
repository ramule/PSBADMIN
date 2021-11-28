import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class MasterCustomizeMenuEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }


  updateCustomizeUserParam(formdata, images, id){
    var uppercaseMenuName = formdata.modelName.toUpperCase();
    console.log(uppercaseMenuName);
    var jsonKeyStr = uppercaseMenuName.replace(/ /g,'_');
    console.log(jsonKeyStr);
    var param = {
      "id": id,
      "moduleName":formdata.modelName,
      "type": formdata.menuType,
      "appId": formdata.appId,
      "statusId": formdata.statusId,
      "roleId": formdata.type == 0 ? formdata.type : formdata.productType,
      "menuImageString": images.logoImage.split(',')[1],
      "json_key": jsonKeyStr
    }
    return param;
  }
}
