import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class ActivitySettingEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  updateActivitySettingCall(formData,id) {
    var inputData = {
            "id": id,
            "activityId": this.commonDataService.activitySetting.activityId,
            "tpinAllowd": formData.tpin,
            "otpAllowed": formData.otp,
            "createdBy": this.commonDataService.user_ID,
            "createdOn": this.commonDataService.activitySetting.createdOn,
            "statusId": this.commonDataService.activitySetting.statusId,
            "maker": formData.maker,
            "checker": formData.checker,
            "statusName": this.commonDataService.activitySetting.statusName
    }
    return inputData;
  }
}
