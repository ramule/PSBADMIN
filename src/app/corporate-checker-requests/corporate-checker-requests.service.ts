import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateCheckerRequestsService {

  constructor(
    private commonDataService: CommonDataShareService
  ) { }

  approveCall(item, formData) {

    if(item.activityName == 'corpCompanyUserRequestsAdd' || item.activityName == 'corpCompanyUserRequestsEdit') {
      console.log('old content data: ', item.content);
      console.log(JSON.parse(item.content.split('~~')[1]));
      var itemCompanyData = JSON.parse(item.content.split('~~')[1]);
      var itemMenuData = item.content.split('~~')[2];
      var itemAccountData = item.content.split('~~')[3];
      var itemUserData = item.content.split('~~')[4];

      console.log('item company data: ', itemCompanyData);
      console.log('item Menu data: ', itemMenuData);
      console.log('item account data: ', itemAccountData);
      console.log('item user data: ', itemUserData);

      itemCompanyData.remark = formData.remark;
      itemCompanyData.createdByName = this.commonDataService.username;
      itemCompanyData.createdby = this.commonDataService.user_ID;
      itemCompanyData.roleName = this.commonDataService.roleType;
      console.log(itemCompanyData);
      console.log(JSON.stringify(itemCompanyData));

      var newContentData = '~~'+JSON.stringify(itemCompanyData)+ '~~'+ itemMenuData+ '~~'+ itemAccountData+ '~~'+ itemUserData;
      console.log('new content data: ', newContentData);

       var inputData = {
         "id": item.id,
         "remark": formData.remark,
         "content": newContentData,
         "statusId": 7,
         "activityRefNo": item.activityRefNo,
         "activityName": item.activityName,
         "userAction":item.userAction,
         "createdBy":this.commonDataService.user_ID,
         "pageId":item.pageId
       }
      return inputData;
    }
    else {
      console.log(JSON.parse(item.content));
      var itemData = JSON.parse(item.content);
      itemData.remark = formData.remark;
      itemData.createdByName = this.commonDataService.username;
      itemData.createdby = this.commonDataService.user_ID;
      itemData.roleName = this.commonDataService.roleType;
      console.log(itemData);
      console.log(JSON.stringify(itemData));
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
   }

   rejectCall(item, formData) {

    if(item.activityName == 'corpCompanyUserRequestsAdd' || item.activityName == 'corpCompanyUserRequestsEdit') {
      console.log('old content data: ', item.content);
      console.log(JSON.parse(item.content.split('~~')[1]));
      var itemCompanyData = JSON.parse(item.content.split('~~')[1]);
      var itemMenuData = item.content.split('~~')[2];
      var itemAccountData = item.content.split('~~')[3];
      var itemUserData = item.content.split('~~')[4];

      console.log('item company data: ', itemCompanyData);
      console.log('item Menu data: ', itemMenuData);
      console.log('item account data: ', itemAccountData);
      console.log('item user data: ', itemUserData);

      itemCompanyData.remark = formData.remark;
      itemCompanyData.createdByName = this.commonDataService.username;
      itemCompanyData.createdby = this.commonDataService.user_ID;
      itemCompanyData.roleName = this.commonDataService.roleType;
      console.log(itemCompanyData);
      console.log(JSON.stringify(itemCompanyData));

      var newContentData = '~~'+JSON.stringify(itemCompanyData)+ '~~'+ itemMenuData+ '~~'+ itemAccountData+ '~~'+ itemUserData;
      console.log('new content data: ', newContentData);

      var inputData = {
        "id": item.id,
        "remark": formData.remark,
        "content": newContentData,
        "statusId": 6,
        "activityRefNo": item.activityRefNo,
        "activityName": item.activityName,
        "userAction":item.userAction,
        "createdBy":this.commonDataService.user_ID,
        "pageId":item.pageId
      }
    }
    else {
      console.log(JSON.parse(item.content));
      var itemData = JSON.parse(item.content);
      itemData.remark = formData.remark;
      itemData.createdByName = this.commonDataService.username;
      itemData.createdby = this.commonDataService.user_ID;
      itemData.roleName = this.commonDataService.roleType;
      console.log(itemData);
      console.log(JSON.stringify(itemData));
    //  this.user_ID = this.commonDataService.user_ID;
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
    }
    return inputData;
   }
}
