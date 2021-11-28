import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorpAccountUserTypeService } from './corp-account-user-type.service';
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corp-account-user-type',
  templateUrl: './corp-account-user-type.component.html',
  styleUrls: ['./corp-account-user-type.component.css']
})
export class CorpAccountUserTypeComponent implements OnInit {
  corporateAccountUserType: any = [];
  priviledgeDataArr: any = [];
  menuLink = "corpAccountUserType"

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location,
    public corpAccountUserService: CorpAccountUserTypeService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Corporate Account User Type";

    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.getLeftMenuId()
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpAccountUserService.addAuditTrailAdaptorParams(URL, operation);
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
          this.getAllCorpUserTypeAccount();
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
  getAllCorpUserTypeAccount() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCorpUserTypeAccount).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.corporateAccountUserType = res.result;
        console.log('Corp User Types array: ', this.corporateAccountUserType);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllCorpUserTypeAccount + "\n" + "Params={}", 'view')
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllCorpUserTypeAccount, res);
      }
      this.commonMethod.destroyDataTable();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  goToAddAccountUser() {
    this.router.navigateByUrl("/corpAccountUserTypeAdd");
    this.commonDataShareService.submenuname = "corpAccountUserTypeAdd";
  }

  gotoCorpAccountUserTypeEdit(item) {
    if (item.statusName === 'CORP_APPROVER_PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.corpAccountUserTypeDetails.createdOn = item.createdon;
      this.router.navigateByUrl("/corpAccountUserTypeEdit", { state: { id: item.id } });
      this.commonDataShareService.submenuname = "corpAccountUserTypeEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  cancelClick() {
    this.commonMethod.cancel()
  }

}
