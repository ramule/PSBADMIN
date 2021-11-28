import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Injectable({
  providedIn: 'root'
})
export class MakerCheckerRequestsService {

  user_ID: any;
  constructor(
    private commonDataService: CommonDataShareService,
    public commonServiceCall: HttpCommonServiceCallService
  ) { }

  approveCall(item, formData) {
    console.log(JSON.parse(item.content));
    var itemData = JSON.parse(item.content);
    itemData.remark = formData.remark;
    itemData.createdByName = this.commonDataService.username;
    itemData.createdby = this.commonDataService.user_ID;
    itemData.roleName = this.commonDataService.roleType;
    console.log(itemData);
    console.log(JSON.stringify(itemData));
   // this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": item.id,
      "remark": formData.remark,
      "content": JSON.stringify(itemData),
      "statusId": 7,
      "activityRefNo": item.activityRefNo,
      "activityName": item.activityName,
      "userAction":item.userAction,
      "createdBy":this.commonDataService.user_ID,
      "pageId":item.pageId
    }
    return inputData;
  }

  rejectCall(item, formData) {
    console.log(JSON.parse(item.content));
    var itemData = JSON.parse(item.content);
    itemData.remark = formData.remark;
    itemData.createdByName = this.commonDataService.username;
    itemData.createdby = this.commonDataService.user_ID;
    itemData.roleName = this.commonDataService.roleType;
    console.log(itemData);
    console.log(JSON.stringify(itemData));
  // this.user_ID = this.commonDataService.user_ID;
    var inputData = {
      "id": item.id,
      "remark": formData.remark,
      "content": JSON.stringify(itemData),
      "statusId": 6,
      "activityRefNo": item.activityRefNo,
      "activityName": item.activityName,
      "userAction":item.userAction,
      "createdBy":this.commonDataService.user_ID,
      "pageId":item.pageId
    }
    return inputData;
  }
}

// "subMenu_ID": this.commonServiceCall.submenuId,
