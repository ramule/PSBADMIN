import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-user-level-setting',
  templateUrl: './corporate-user-level-setting.component.html',
  styleUrls: ['./corporate-user-level-setting.component.css']
})
export class CorporateUserLevelSettingComponent implements OnInit {

  corpCompanySelected: boolean = false;
  companyId: any;
  masterCompany: any = [];
  corpSetDefaultLimitDataArr: any = [];
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private commonDataService: CommonDataShareService,
  ) { }

  ngOnInit() {
    this.commonServiceCall.pageName = "Corporate User Level Settings";
    this.getCompanyList();
  }

  getCompanyList() {
    this.commonMethod.showLoader();
    this.masterCompany = [];
    this.commonServiceCall.getResponsePromise(this.appConstant.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        res.result.forEach(element => {
          if (element.statusName == 'ACTIVE') {
            this.masterCompany.push(element)
          }
        })
      } else {
        this.errorCallBack(this.appConstant.getCorpCompanyDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onCompanyChange(event) {
    this.corpCompanySelected = true;
    this.companyId = event.target.value;
    console.log(this.companyId);
  }

  onAddClicked() {
    this.router.navigateByUrl('corpUserLevelSettingAdd');
  }

  gotoEditCorporateSetLimit(item, index) {
    this.commonServiceCall.makerRequestEditUrl = this.router.url;
    console.log(item);
    console.log(index);

  }

}
