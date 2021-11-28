import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Location } from '@angular/common';
import { param } from 'jquery';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-set-limit-view',
  templateUrl: './corporate-set-limit-view.component.html',
  styleUrls: ['./corporate-set-limit-view.component.css']
})
export class CorporateSetLimitViewComponent implements OnInit {

  corpDetails: any = "";
  accountNumber: any;
  corpSetDefaultLimitDataArr: any = [];
  defaultUsersArr: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location
  ) { }

  ngOnInit() {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.router.navigateByUrl('/corpSetLimit');
      return;
    }

    this.commonServiceCall.pageName = "Corporate Set Limit View";
    this.corpDetails = this.location.getState();
    console.log(this.corpDetails);
    var param = {
      "companyId": this.corpDetails.companyId,
      "accNumber": this.corpDetails.id,
    }
    this.getCorpAccLimit(param);
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  getCorpAccLimit(param) {
    var url = this.appConstants.getCorpTransactionsLimitUrl + param.accNumber + '/' + param.companyId
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.corpSetDefaultLimitDataArr = res.result.corpLimitListData;
        console.log(this.corpSetDefaultLimitDataArr);
        console.log(this.corpSetDefaultLimitDataArr[0]);
        this.accountNumber = "XXX" + res.result.accountNumber.slice(3, 50);
        console.log(this.corpSetDefaultLimitDataArr);
      }
      else {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
    });
  }

  gotoEditCorporateSetLimit(item, index) {
    this.commonServiceCall.makerRequestEditUrl = this.router.url;
    console.log(item);
    console.log(index);
    if (index == 0) {
      this.router.navigateByUrl('/corpSetLimitEdit', { state: { id: 0, accNum: this.corpDetails.id, companyId: this.corpDetails.companyId, transLimitId: item[0].transLimitId, isDefaultTrans: true } })
    }
    else {
      this.router.navigateByUrl('/corpSetLimitEdit', { state: { id: 0, accNum: this.corpDetails.id, companyId: this.corpDetails.companyId, transLimitId: item[0].transLimitId, isDefaultTrans: false } })
    }
  }

  onNewLimitAdd() {
    this.router.navigateByUrl("/corpSetLimitAdd", { state: { id: this.corpDetails.id, companyId: this.corpDetails.companyId, url: this.router.url } });
  }

  cancelClick() {
    this.router.navigateByUrl('/corpSetLimit');
  }

}
