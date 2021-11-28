import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorporateCompanyService } from './corporate-company.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-company',
  templateUrl: './corporate-company.component.html',
  styleUrls: ['./corporate-company.component.css']
})
export class CorporateCompanyComponent implements OnInit {

  corporateCompanyArr: any = [];
  priviledgeDataArr: any = []
  displayImage: any;
  selModel: any;
  menuLink = "corporateCompany"
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location,
    public corpCompanyService: CorporateCompanyService
  ) { }

  ngOnInit() {
    this.commonServiceCall.pageName = "Corporate Company";
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.getLeftMenuId()
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpCompanyService.addAuditTrailAdaptorParams(URL, operation);
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
          this.getAllDetails();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  //on load function to get data of corporate company
  getAllDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.corporateCompanyArr = res.result;
        console.log('Corporate Company Array: ', this.corporateCompanyArr);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpCompanyDetailsUrl + "\n" + "Params={}", 'view')
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
      this.commonMethod.destroyDataTable();
    });
  }

  getLogoImage(item) {
    console.log(item);
    if (item.logoImage === null || item.logoImage === "" || item.logoImage === undefined) {
      showToastMessage("Logo Image Not Available");
    }
    else {
      this.displayImage = item.logoImage;
      this.selModel = "logoImage";
      openTinyModel();
    }
  }

  closeActionModel() {
    closeTinyModel();
  }

  /* This function calls when an error occurs */
  errorCallBack(fld, res) {
    if (fld == this.appConstants.addConfigMasterUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  /* The function is called on add record and sends to corporate company add page */
  goToAddCompany() {
    this.router.navigateByUrl("/corporateCompanyAdd");
    this.commonDataShareService.submenuname = "corporateCompanyAdd";
  }

  /* The function is called on edit record and sends Id of the record into target page */
  goToEditCompanyDetails(item) {
    if (item.statusName === 'CORP_APPROVER_PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.corpCompanyDetails.createdOn = item.createdOn;
      this.router.navigateByUrl("/corporateCompanyEdit", { state: { id: item.id } });
      this.commonDataShareService.submenuname = "corporateCompanyEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  cancelClick() {
    this.commonMethod.cancel()
  }

}
