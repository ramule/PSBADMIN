import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CorpCompanyReqMenuMappingService } from './corp-company-req-menu-mapping.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corp-company-req-menu-mapping',
  templateUrl: './corp-company-req-menu-mapping.component.html',
  styleUrls: ['./corp-company-req-menu-mapping.component.css']
})
export class CorpCompanyReqMenuMappingComponent implements OnInit {

  corpCompanyMenuMappingForm: FormGroup;
  remarkForm: FormGroup;
  priviledgeDataArr: any = [];
  corpCompanyReqArr: any = [];
  corpCompanyMenuArr: any = [];
  corpCompanyAccountsArr: any = [];
  priveledge: any;
  selectedCorpCompanyId: any;
  menuLink = "corpCompanyRequestsMenuMapping";
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private corpCompanyReqMenuMappingService: CorpCompanyReqMenuMappingService,
    public commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Corporate Company Requests Menu Mapping";
    // this.getLeftMenuId()
    this.getAllCorpCompanyDetails();
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.priveledge = true;
          this.getAllCorpCompanyDetails();
        }
        else {
          this.priveledge = false
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        this.priveledge = false
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpCompanyReqMenuMappingService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getAllCorpCompanyDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompRequestsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpCompRequestsUrl + "\n" + "Params={}", 'view')
        this.corpCompanyReqArr = res.result;
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpCompRequestsUrl, res);
      }
    });
  }

  onCorpCompanyChange(event) {
    console.log(event.target.value);
    this.selectedCorpCompanyId = event.target.value;
    console.log(this.selectedCorpCompanyId);
    var param = this.corpCompanyReqMenuMappingService.getCorpCompanyIdCall(this.selectedCorpCompanyId);
    this.getCorpMenuByCompId(param);
  }

  getCorpMenuByCompId(companyId) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCorpMenuAndAccCompanyIdUrl, companyId).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpMenuAndAccCompanyIdUrl + "\n" + "Params={}", 'view')
        this.corpCompanyMenuArr = res.result.corpMenuList;
        this.corpCompanyAccountsArr = res.result.corpAccList;

        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else {
        this.errorCallBack(this.appConstants.getCorpMenuAndAccCompanyIdUrl, res);
      }
      this.commonMethod.destroyDataTable();
      this.commonMethod.hideLoader();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.commonMethod.cancel();
  }

}
