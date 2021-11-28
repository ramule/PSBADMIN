import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from './app-constants';
import { HttpCommonServiceCallService } from './http-common-service-call.service';
declare var showToastMessage: any;
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  current_id: any;
  constructor(
    private router: Router,
    private appConstants: AppConstants,
    public commonServiceCall: HttpCommonServiceCallService,
  ) { }

  getLeftMenuId(menuLink) {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }
}
