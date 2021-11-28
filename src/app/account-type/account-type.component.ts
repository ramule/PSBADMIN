import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { AccountTypeService } from './account-type.service';
import { Location } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css']
})
export class AccountTypeComponent implements OnInit {

  formErrors = {
    accountType: '',
    accountCode: '',
    remark: ''
  };

  accountTypeFileds = {
    accountType: '',
    accountCode: ''
  }
  accountTypeArr = [];
  isAddButtonClicked = false;
  showForm: boolean = false;
  priviledgeDataArr: any = []
  accountTypeForm: FormGroup;
  remarkForm: FormGroup
  menuLink = "accountType"

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
    private accountTypeService: AccountTypeService,
    public location: Location
  ) { }

  public buildForm() {
    this.accountTypeForm = this.form.group({
      accountType: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      accountCode: new FormControl('', [Validators.required, , Validators.pattern(/^[a-zA-Z0-9]+$/)])
    });
    this.accountTypeForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.accountTypeForm, this.formErrors, true)
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

  ngOnInit() {
    this.commonServiceCall.pageName = "Corporate Account Type";
    this.roleId = this.commonDataShareService.roleId;
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.buildForm();
    this.getLeftMenuId()
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.accountTypeService.addAuditTrailAdaptorParams(URL, operation);
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
        this.commonDataShareService.submenuname = res.result[0].menuLink
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
          this.getAllAccountTypeDetails();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  showHideForm() {
    this.commonServiceCall.pageName = "Add Corporate Account Type";
    this.showForm = !this.showForm
    this.isAddButtonClicked = true;
  }

  getAllAccountTypeDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAccountTypeDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.accountTypeArr = res.result;
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAccountTypeDetailsUrl + "\n" + "Params={}", 'view')
        console.log('Account type array: ', this.accountTypeArr);
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAccountTypeDetailsUrl, res);
      }
      this.commonMethod.destroyDataTable();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  addAccountType() {
    if (this.accountTypeForm.valid) {
      var formData = this.accountTypeForm.value;
      var param = this.accountTypeService.addAccountTypeCall(formData);
      console.log('request parameters: ', param);
      this.saveAccontType(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.accountTypeForm, this.formErrors, false);
    }
  }

  saveAccontType(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveAccountTypeDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(data);
      if (res.responseCode == 200) {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.saveAccountTypeDetailsUrl + "\n" + "Params=" + JSON.stringify(param), 'add')
        this.cancel();
      }
      else {
        if (this.commonDataShareService.roleType == 'Corporate Maker') {
          this.accountTypeForm.patchValue({
            accountType: this.accountTypeFileds.accountType,
            accountCode: this.accountTypeFileds.accountCode,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.saveAccountTypeDetailsUrl, res);
      }
    });
  }

  gotoAccountTypeEdit(item) {
    console.log(item);
    if (item.statusName === 'CORP_APPROVER_PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.accountType.createdon = item.createdon;
      this.router.navigateByUrl("/accountTypeEdit", { state: { id: item.id } });
      this.commonDataShareService.submenuname = "accountTypeEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  cancel() {
    this.commonServiceCall.pageName = "Corporate Account Type";
    this.showForm = !this.showForm;
    this.accountTypeForm.reset();
    this.isAddButtonClicked = false;
    this.getAllAccountTypeDetails();
  }

  openActionModel(action, formdata) {
    if (this.accountTypeForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.accountTypeFileds.accountType = formdata.accountType;
      this.accountTypeFileds.accountCode = formdata.accountCode;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.accountTypeForm, this.formErrors, false)
    }
  }

  addAccountTypeWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.accountTypeService.addAccountTypeCallWithRemark(this.accountTypeFileds, formData);
      this.saveAccontType(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.accountTypeForm.patchValue({
      accountType: this.accountTypeFileds.accountType,
      accountCode: this.accountTypeFileds.accountCode,
    });
    closeTinyModel();
  }

}
