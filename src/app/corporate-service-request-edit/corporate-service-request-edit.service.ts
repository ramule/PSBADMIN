import { Injectable } from "@angular/core";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: "root",
})
export class CorporateServiceRequestEditService {
  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) {}

  getUpdateParam(id, formdata, appid, createdby) {
    var inputdata = {
      id: id,
      appid: appid,
      createdby: createdby,
      statusid: formdata.status,
      role_ID: this.commonDataService.roleTypeId,
      user_ID: this.commonDataService.user_ID,
      subMenu_ID: this.commonDataService.submenuId,
      activityName: this.commonDataService.submenuname,
      remark: "",
    };
    return inputdata;
  }

  getUpdateParamWithRemark(id, formdata, remarkData, appid, createdby) {
    var inputdata = {
      id: id,
      appid: appid,
      createdby: createdby,
      statusid: formdata.status,
      role_ID: this.commonDataService.roleTypeId,
      user_ID: this.commonDataService.user_ID,
      subMenu_ID: this.commonDataService.submenuId,
      activityName: this.commonDataService.submenuname,
      remark: remarkData.remark,
    };
    return inputdata;
  }
}
