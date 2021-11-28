import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Location } from '@angular/common';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-set-limit-checker-view',
  templateUrl: './corporate-set-limit-checker-view.component.html',
  styleUrls: ['./corporate-set-limit-checker-view.component.css']
})
export class CorporateSetLimitCheckerViewComponent implements OnInit {

  companyDetails: any = "";
  corpSetLimitDataArr: any = [];
  HierarchyArr: any = [];
  corpApproverTypeValuesArr: any = [];
  transLimitId: any;
  accountNumber: any;
  corporateSetLimitForm: FormGroup;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location,
  ) { }

  ngOnInit() {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.router.navigateByUrl('/corpCheckerRequests');
      return;
    }

    this.commonServiceCall.pageName = "Corporate Set Limit Checker View";
    this.companyDetails = this.location.getState();
    var param = {
      "id": this.companyDetails.id,
      "accNumber": this.companyDetails.accNum,
      "companyId": this.companyDetails.companyId,
      "transLimitId": this.companyDetails.transLimitId
    };
    this.getCorpSetLimitById(param);
  }

  getCorpSetLimitById(param) {
    console.log('editable item: ', param);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getTranByAccNoAndCompIdAndTransIdUrl + param.accNumber + '/' + param.companyId + '/' + param.transLimitId + '/' + param.id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log(res.result);
        this.corpSetLimitDataArr = res.result.corpLimitListData;
        this.accountNumber = res.result.accountNumber;

        console.log(this.corpSetLimitDataArr);

        this.transLimitId = this.corpSetLimitDataArr[0].transLimitId;
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getTranByAccNoAndCompIdAndTransIdUrl, res);
      }
    })
  }

  // corp checker - 451
  // corp approver - 454
  cancelClick() {
    if (this.commonDataShareService.roleId == 454) {
      this.router.navigateByUrl('/corpApproverRequests');
    }
    else {
      this.router.navigateByUrl('/corpCheckerRequests');
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
