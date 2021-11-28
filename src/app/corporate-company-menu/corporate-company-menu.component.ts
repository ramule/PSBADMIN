import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorporateCompanyMenuService } from './corporate-company-menu.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-company-menu',
  templateUrl: './corporate-company-menu.component.html',
  styleUrls: ['./corporate-company-menu.component.css']
})
export class CorporateCompanyMenuComponent implements OnInit {

  corpCompanyMenuForm: FormGroup;
  corporateCompanyMenu: any = [];
  priviledgeDataArr: any = [];
  companyArr: any = [];
  displayImage: any;
  selModel: any;
  corpCompanyId: any;
  menuLink = "corporateCompanyMenu";

  formErrors = {
    companyName: ''
  }

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location,
    public corpCompanyMenuService: CorporateCompanyMenuService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Corporate Company Menu";
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.buildForm();
    this.getLeftMenuId();
  }

  public buildForm() {
    this.corpCompanyMenuForm = this.form.group({
      companyName: new FormControl('', [Validators.required]),
    });
    this.corpCompanyMenuForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corpCompanyMenuForm, this.formErrors, true)
    });

  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpCompanyMenuService.addAuditTrailAdaptorParams(URL, operation);
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
          this.loadType();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  selectedValue(event) {
    console.log(event);
    this.corpCompanyId = event.target.value;
    console.log('corp comp id: ', this.corpCompanyId);
  }

  getAllCorpMenuByCompId() {

    this.formValidation.markFormGroupTouched(this.corpCompanyMenuForm);

    if (this.corpCompanyMenuForm.valid) {
      var param = this.corpCompanyMenuService.getCorpCompanyMenuCall(this.corpCompanyId);
      this.getAllCorpMenus(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corpCompanyMenuForm, this.formErrors, false)
    }
  }

  getAllCorpMenus(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getAllCorpCompanyMenuByCompanyIdUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.corporateCompanyMenu = res.result;
        console.log('Corporate Company Menu Array: ', this.corporateCompanyMenu);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllCorpCompanyMenuByCompanyIdUrl + "\n" + "Params={}", 'view')
      } else if(res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.errorCallBack(this.appConstants.getAllCorpCompanyMenuByCompanyIdUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  loadType(){
    this.commonMethod.showLoader();
    this.companyArr = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('companies data: ', res);
        this.companyArr = res.result;
      } else {
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  filterActiveCompanies() {
    return this.companyArr.filter(f => f.statusId == 3)
  }

  //on load function to get data of corporate company
  /*
  getAllCompanyMenuDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCorpCompanyMenu).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.corporateCompanyMenu = res.result;
        console.log('Corporate Company Menu Array: ', this.corporateCompanyMenu);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllCorpCompanyMenu + "\n" + "Params={}", 'view')
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllCorpCompanyMenu, res);
      }
      this.commonMethod.destroyDataTable();
    });
  }
  */

  errorCallBack(fld, res) {
    if (fld == this.appConstants.getAllCorpCompanyMenu) {
      this.commonMethod.errorMessage(res);
    }
  }

  cancelClick() {
    this.commonMethod.cancel()
  }

  /* The function is called on add record and sends to corporate company add page */
  goToAddCompany() {
    this.router.navigateByUrl("/corporateCompanyMenuAdd");
    this.commonDataShareService.submenuname = "corporateCompanyMenuAdd";
  }

  /* The function is called on edit record and sends Id of the record into target page */
  goToEditCompanyMenu(item) {
    console.log(item);
    if (item.statusName === 'CORP_APPROVER_PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.corpCompanyDetails.createdOn = item.createdOn;
      this.router.navigateByUrl("/corporateCompanyMenuEdit", { state: { id: item.id } });
      this.commonDataShareService.submenuname = "corporateCompanyMenuEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

}
