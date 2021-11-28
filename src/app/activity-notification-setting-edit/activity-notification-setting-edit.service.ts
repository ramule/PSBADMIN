import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class ActivityNotificationSettingEditService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  updateActivitySettingCall(formData, item) {
    var inputData = {
      "id": item.id,
      "push": formData.push,
      "sms": formData.sms,
      "displaynamitem": item.displayname,
      "activitycode": item.activitycode,
      "email": formData.email,
      "createdon": item.createdon,
      "createdby": this.commonDataService.user_ID,
      "activityid": {"id": item.activityid},
      "statusid":{"id":"3"}
    };
    return inputData;
  }
}
