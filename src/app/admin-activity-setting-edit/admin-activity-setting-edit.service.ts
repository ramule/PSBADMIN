import { Injectable } from '@angular/core';
import { CommonMethods } from '../common-methods';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class AdminActivitySettingEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  updateActivitySettingCall(formData,id) {
    var inputData = {
            "id": id,
            "activityId": this.commonDataService.adminactivitySetting.activityId,
            "tpinAllowd": this.commonDataService.adminactivitySetting.tpin,
            "otpAllowed": this.commonDataService.adminactivitySetting.otp,
            "createdBy": this.commonDataService.user_ID,
            "createdOn": this.commonDataService.adminactivitySetting.createdOn,
            "statusId": this.commonDataService.adminactivitySetting.statusId,
            "maker": formData.maker,
            "checker": formData.checker,
            "approver": formData.approver,
            "statusName": this.commonDataService.adminactivitySetting.statusName
    }
    return inputData;
  }
}
