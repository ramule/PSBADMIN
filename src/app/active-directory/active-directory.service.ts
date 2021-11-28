import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveDirectoryService {

  constructor(
    private commonDataService: CommonDataShareService
  ) { }

  getActiveUser(formdata) {
    var inputData = {
      "user_name": formdata.searchVal
    }
    return inputData;
  }

  getAdduserParam(item){
    var reqParam = {
      "userid" : item.cn,
      "createdby" : this.commonDataService.user_ID,
      "updateby" : this.commonDataService.user_ID,
      "roleid" : null,
      "rolename": item.title,
      "name" : item.cn,
      "email" : item.mail,
      "phonenumber" : "",
      "template" :"",
      "thumbnail" : ""
    }
    return reqParam;
  }
}
