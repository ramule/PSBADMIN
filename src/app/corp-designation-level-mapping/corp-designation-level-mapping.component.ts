import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Location } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corp-designation-level-mapping',
  templateUrl: './corp-designation-level-mapping.component.html',
  styleUrls: ['./corp-designation-level-mapping.component.css']
})
export class CorpDesignationLevelMappingComponent implements OnInit {

  menuLink = "corpdDesignationLevelMapping";

  //feild parameter
  corpDesignationLevelArr: any = [];
  priviledgeDataArr: any = [];
  status = [];
  companyArr: any = [];
  p: number = 1;
  corpCompanyId: any;
  selModel: any;
  roleId: any;
  isCompanySelected: boolean = false;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location
  ) { }

  ngOnInit() {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Designation Level Mapping";
    this.roleId = this.commonData.roleId;
    this.getLeftMenuId();
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        this.commonData.submenuId = res.result[0].id;
        this.commonData.submenuname = res.result[0].menuLink;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getCorpCompanies();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    //         var param = this.mastreDonationService.addAuditTrailAdaptorParams(URL,operation);
    //         console.log(param)
    //         this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    //         })
  }

  getCorpCompanies() {
    this.commonMethod.showLoader();
    this.companyArr = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.companyArr = res.result;
        this.companyArr.filter(f => f.status == 3)
      } else {
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  onCompanyChange(event) {
    console.log(event);
    this.isCompanySelected = true;
    this.corpCompanyId = event.target.value;
    console.log('corp comp id: ', this.corpCompanyId);
    if (this.corpCompanyId) {
      this.getCorpDesignationLevels(this.corpCompanyId);
    }
    else {
      this.isCompanySelected = false;
      showToastMessage('Please select company');
    }
  }

  gotoAddCorpDonation() {
    this.commonData.submenuname = "corpdDesignationLevelMappingAdd";
    this.router.navigateByUrl('/corpdDesignationLevelMappingAdd');
  }

  getCorpDesignationLevels(companyId) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getDesignationHierarchyByCompIdUrl + companyId).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        //    this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getDonationsDetailsUrl+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        this.corpDesignationLevelArr = res.result;
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      }
      else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getDesignationHierarchyByCompIdUrl, res);
      }
      this.commonMethod.destroyDataTable();
    })
  }

  gotoEditDonationMaster(item) {
    console.log(item);
    if (item.statusName === 'CORP_APPROVER_PENDING' && this.commonData.roleType == this.commonData.corpMakerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonData.submenuname = "corpdDesignationLevelMappingEdit";
      this.commonData.corpDesignationLevelData.createdOn = item.createdOn;
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/corpdDesignationLevelMappingEdit", { state: { id: item.id } });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

}
