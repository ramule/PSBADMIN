import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorporateUserService } from '../corporate-user/corporate-user.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-registration-details-table',
  templateUrl: './registration-details-table.component.html',
  styleUrls: ['./registration-details-table.component.css']
})
export class RegistrationDetailsTableComponent implements OnInit {

  corporateUser: any = [];
  priviledgeDataArr: any = [];
  colsArr: any = [0,1,2,3,4,5,6,7,]
  menuLink = "corporateUser";
  displayImage: any;
  selModel: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private location: Location,
    private appConstants: AppConstants,
    public corpUserService: CorporateUserService
  ) { }

  ngOnInit(): void {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Registration Details Table";
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
        this.commonDataShareService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  /*??Insert??tracking??for??user??activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpUserService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
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
          this.getCorporateUsers();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  
  closeActionModel() {
    closeTinyModel();
  }

  getCorporateUsers() {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCorpUsersUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.corporateUser = res.result;
        //initiallize datatable
        this.commonMethod.setDataTableWithImages(this.commonServiceCall.pageName, this.colsArr);
        this.commonMethod.hideLoader();
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllCorpUsersUrl + "\n" + "Params={}", 'view')
      } else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllCorpUsersUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  // gotoAddCorporateUser() {
  //   this.commonDataShareService.submenuname = "corporateUserAdd";
  //   this.router.navigateByUrl("/corporateUserAdd");
  // }

  gotoEditCorporateUser(item) {
    console.log(item);
    if (item.statusName === 'CORP_APPROVER_PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.corpUserLocation.countryId = item.country;
      this.commonDataShareService.corpUserLocation.cityId = item.city;
      this.commonDataShareService.corpUserLocation.stateId = item.state;
      this.commonDataShareService.submenuname = "corporateUserEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/corporateUserEdit", { state: { id: item.id } });
    }
  }

  cancelClick() {
    this.commonMethod.cancel()
  }

}
