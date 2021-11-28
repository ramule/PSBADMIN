import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorpUserTypeService } from './corp-user-type.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corp-user-type',
  templateUrl: './corp-user-type.component.html',
  styleUrls: ['./corp-user-type.component.css']
})
export class CorpUserTypeComponent implements OnInit {

  corporateUserType: any = [];
  priviledgeDataArr: any = [];
  menuLink = "corpUserType"
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location,
    public corpUserService: CorpUserTypeService
  ) { }

  ngOnInit() {
    this.commonServiceCall.pageName = "Corporate Roles";
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.getLeftMenuId()
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpUserService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataShareService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getAllCorpUserTypeDetails();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  //on load functions
  getAllCorpUserTypeDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpUserTypesUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.corporateUserType = res.result;
        console.log('Corp User Types array: ', this.corporateUserType);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpUserTypesUrl + "\n" + "Params={}", 'view')
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpUserTypesUrl, res);
      }
      this.commonMethod.destroyDataTable();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  goToAddUser() {
    this.commonDataShareService.submenuname = "corpUserTypeAdd";
    this.router.navigateByUrl("/corpUserTypeAdd");
  }

  gotoCorpUserTypes(item) {
    console.log(item);
    if (item.statusname === 'CORP_APPROVER_PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.corpUserTypeDetails.createdOn = item.createdon;
      this.router.navigateByUrl("/corpUserTypeEdit", { state: { id: item.id } });
      this.commonDataShareService.submenuname = "corpUserTypeEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  cancelClick() {
    this.commonMethod.cancel()
  }
}
