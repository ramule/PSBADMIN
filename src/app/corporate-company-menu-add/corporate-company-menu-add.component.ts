import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorporateCompanyMenuAddService } from './corporate-company-menu-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-company-menu-add',
  templateUrl: './corporate-company-menu-add.component.html',
  styleUrls: ['./corporate-company-menu-add.component.css']
})
export class CorporateCompanyMenuAddComponent implements OnInit {
  masterStatus: any = []
  masterCompany: any = []
  masterMenu: any = []
  corporateCompanyMenuAddForm: FormGroup
  remarkForm: FormGroup

  formErrors = {
    companyName: '',
    menuName: '',
    status,
    remark: ''
  }

  corpCompanyMenuFields = {
    companyName: '',
    menuName: '',
    status,
  }

  roleId: any;
  selModel: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location,
    public corpCompanyMenuAddService: CorporateCompanyMenuAddService
  ) { }


  public buildForm() {
    this.corporateCompanyMenuAddForm = this.form.group({
      companyName: new FormControl('', [Validators.required]),
      menuName: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
    this.corporateCompanyMenuAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateCompanyMenuAddForm, this.formErrors, true)
    });

    if (this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Corporate Company Menu";
    this.roleId = this.commonDataShareService.roleId;
    console.log('role id: ', this.roleId);
    this.buildForm();
    this.getCompanyList();
    this.getMenuList();
    this.getStatus();
    this.commonMethod.hideLoader();
    this.corporateCompanyMenuAddForm.patchValue({
      status: 3
    });
  }

  //on load functions
  getCompanyList() {
    this.commonMethod.showLoader();
    this.masterCompany = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.masterCompany = res.result;
      } else {
        this.errorCallBack(this.appConstants.getCorpCompanyDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  getMenuList() {
    this.commonMethod.showLoader();
    this.masterCompany = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCorpMenus).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.masterMenu = res.result;
      } else {
        this.errorCallBack(this.appConstants.getAllCorpMenus, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }


  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.masterStatus = res.resp;
        console.log('response array: ', this.masterStatus);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  filterStatus() {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }
  /* This function calls when an error occurs */
  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  addCorporateCompanyMenu() {
    this.formValidation.markFormGroupTouched(this.corporateCompanyMenuAddForm);
    if (this.corporateCompanyMenuAddForm.valid) {
      var formData = this.corporateCompanyMenuAddForm.value;
      var param = this.corpCompanyMenuAddService.getCompanyMenuAddParam(formData);
      this.saveCorpCompanyMenu(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateCompanyMenuAddForm, this.formErrors, false)
    }
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpCompanyMenuAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  //called on adding of Corporate User Type Account
  saveCorpCompanyMenu(param) {
    console.log('adding params: ', param);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addCorpCompanyMenu, param).subscribe(data => {
      var res = data.resp;
      console.log(data);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.addCorpCompanyMenu + "\n" + "Params=" + JSON.stringify(param), 'add')
        this.cancel();
        showToastMessage(res.responseMessage);
      }
      else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
          this.corporateCompanyMenuAddForm.patchValue({
            companyName: this.corpCompanyMenuFields.companyName,
            menuName: this.corpCompanyMenuFields.menuName,
            status: this.corpCompanyMenuFields.status,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpUserTypesUrl, res);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl("/corporateCompanyMenu");
  }


  openActionModel(action, formdata) {
    if (this.corporateCompanyMenuAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.corpCompanyMenuFields.companyName = formdata.companyName;
      this.corpCompanyMenuFields.menuName = formdata.menuName;
      this.corpCompanyMenuFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateCompanyMenuAddForm, this.formErrors, false)
    }
  }

  addCorpAccountUserWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corpCompanyMenuAddService.getCompanyMenuAddParamWithRemark(this.corpCompanyMenuFields, formData);
      this.saveCorpCompanyMenu(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.corporateCompanyMenuAddForm.patchValue({
      companyName: this.corpCompanyMenuFields.companyName,
      menuName: this.corpCompanyMenuFields.menuName,
      status: this.corpCompanyMenuFields.status,
    });
    closeTinyModel();
  }


}
