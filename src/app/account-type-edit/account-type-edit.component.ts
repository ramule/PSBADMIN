import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { AccountTypeEditService } from './account-type-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-account-type-edit',
  templateUrl: './account-type-edit.component.html',
  styleUrls: ['./account-type-edit.component.css']
})
export class AccountTypeEditComponent implements OnInit {

  accountTypeEditForm: FormGroup;
  remarkForm: FormGroup
  formErrors = {
    accountType: '',
    accountCode: '',
    status: '',
    remark: ''
  };
  selectedAccountType: any;
  account: any;
  masterStatus = [];
  remarkHistoryArr: any = [];
  roleId: any;
  selModel: any;
  accountTypeFields = {
    accountType: '',
    accountCode: '',
    status: '',
  }
  beforeParams: any
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private accountTypeEditService: AccountTypeEditService
  ) { }

  public buildForm() {
    this.accountTypeEditForm = this.form.group({
      accountType: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      accountCode: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      status: new FormControl('', [Validators.required])
    });
    this.accountTypeEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.accountTypeEditForm, this.formErrors, true)
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

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/accountType');
      return;
    }

    this.commonServiceCall.pageName = "Edit Corporate Account Type";
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.getStatus();
    this.account = this.location.getState();
    console.log(this.account.id);
    this.getAccountTypeById(this.account.id);
    this.getRemarkHistoryData(this.account.id);
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/" + this.commonDataShareService.submenuId).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.remarkHistoryArr = res.result;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.accountTypeEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }


  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        this.commonMethod.hideLoader();
        console.log('Data resp: ', data.resp);
        this.masterStatus = [];
        data.resp.forEach(el => {
          if (el.id == 0 || el.id == 3) {
            this.masterStatus.push(el);
          }
        });
      } else {
        this.commonMethod.hideLoader();
        this.commonMethod.errorMessage(data);
      }
    });
  }

  getAccountTypeById(id) {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getAccountTypeDetailsByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.selectedAccountType = res.result[0];
        this.beforeParams = res.result[0];
        if (res.result[0].userAction != null) {
          this.accountTypeEditForm.patchValue({
            accountType: res.result[0].accountType,
            accountCode: res.result[0].accountCode,
            status: res.result[0].userAction,
          })
        }
        else {
          this.accountTypeEditForm.patchValue({
            accountType: res.result[0].accountType,
            accountCode: res.result[0].accountCode,
            status: res.result[0].statusid,
          })
        }
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAccountTypeDetailsByIdUrl, res);
      }
    })
  }

  onAccountTypeUpdate() {
    this.formValidation.markFormGroupTouched(this.accountTypeEditForm);
    if (this.accountTypeEditForm.valid) {
      var formData = this.accountTypeEditForm.value;
      var param = this.accountTypeEditService.updateAccountTypeCall(formData, this.account.id, this.selectedAccountType);
      this.updateAccountType(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.accountTypeEditForm, this.formErrors, false)
    }
  }

  updateAccountType(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateAccountTypeDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateAccountTypeDetailsUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        this.cancel()
      }
      else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
          this.accountTypeEditForm.patchValue({
            accountType: this.accountTypeFields.accountType,
            accountCode: this.accountTypeFields.accountCode,
            status: this.accountTypeFields.status,
          })
        }
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateAccountTypeDetailsUrl, res);
    })
  }

  cancel() {

    if (this.commonServiceCall.makerRequestEditUrl == '/accountType') {
      this.router.navigateByUrl("/accountType");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests') {
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/accountType");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    if (this.accountTypeEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.accountTypeFields.accountType = formdata.accountType;
      this.accountTypeFields.accountCode = formdata.accountCode;
      this.accountTypeFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.accountTypeEditForm, this.formErrors, false)
    }
  }

  updateAccountTypeWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.accountTypeEditService.updateAccountTypeCallWithRemark(this.accountTypeFields, this.account.id, this.updateAccountType, formdata);
      this.updateAccountType(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.accountTypeEditForm.patchValue({
      accountType: this.accountTypeFields.accountType,
      accountCode: this.accountTypeFields.accountCode,
      status: this.accountTypeFields.status,
    })
    closeTinyModel();
  }

}
