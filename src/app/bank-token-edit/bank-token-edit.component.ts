import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { BankTokenEditService } from './bank-token-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-bank-token-edit',
  templateUrl: './bank-token-edit.component.html',
  styleUrls: ['./bank-token-edit.component.css']
})
export class BankTokenEditComponent implements OnInit {

  bankTokenEditForm: FormGroup;
  remarkForm: FormGroup;
  roleId: any;
  selModel: any;
  selectedToken;
  bankTokenEditData: any;
  masterStatus = [];
  remarkHistoryArr: any = [];
  bankToken;
  referenceNumber: any = "";
  formErrors = {
    custName: '',
    mobNumber: '',
    status: '',
    remark: ''
  }

  bankTokenEditFields = {
    custName: '',
    mobNumber: '',
    status: ''
  }
  beforeParams: any
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private bankTokenEditService: BankTokenEditService
  ) { }

  public buildForm() {
    this.bankTokenEditForm = this.form.group({
      custName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      mobNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      status: new FormControl('', [Validators.required])
    });
    this.bankTokenEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.bankTokenEditForm, this.formErrors, true)
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

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/bankToken');
      return;
    }

    console.log('Role ID: ', this.commonData.roleId);
    this.commonServiceCall.pageName = "Edit Bank Token";
    this.roleId = this.commonData.roleId;
    this.bankToken = this.location.getState();
    console.log('bank token data: ', this.bankToken);
    this.getStatus();
    this.buildForm();
    if(this.bankToken.channel == 'Retail')
    this.getBankTokenId(this.bankToken.id);
    else
    this.getCorpBankTokenId(this.bankToken.id);
    this.getRemarkHistoryData(this.bankToken.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.bankTokenEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/" + this.commonData.submenuId).subscribe((data) => {
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

  filterStatus() {
    return this.masterStatus.filter(x => x.shortName == 'PENDING' || x.shortName == 'SUCCESS');
  }

  //on load functions
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

  openActionModel(action, formdata) {
    if (this.bankTokenEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.bankTokenEditFields.custName = formdata.custName;
      this.bankTokenEditFields.mobNumber = formdata.mobNumber;
      this.bankTokenEditFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.bankTokenEditForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.bankTokenEditForm.patchValue({
      custName: this.bankTokenEditFields.custName,
      mobNumber: this.bankTokenEditFields.mobNumber,
      status: this.bankTokenEditFields.status,
    });
    closeTinyModel();
  }

  getBankTokenId(id) {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getTicketListByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.beforeParams = res.result[0].statusId;
        this.bankTokenEditData = res.result[0];
        this.commonMethod.hideLoader();
        this.selectedToken = res.result[0];
        this.referenceNumber = res.result[0].referencenumber;
        this.bankTokenEditForm.patchValue({
          custName: res.result[0].customername,
          mobNumber: res.result[0].mobile,
          status: res.result[0].statusName
        })
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getTicketListByIdUrl, res);
      }
    })
  }

  getCorpBankTokenId(id) {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = "corpbanktoken/getBankTokenByIdForCorp/" + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.beforeParams = res.result[0].statusId;
        this.bankTokenEditData = res.result[0];
        this.commonMethod.hideLoader();
        this.selectedToken = res.result[0];
        this.referenceNumber = res.result[0].referencenumber;
        this.bankTokenEditForm.patchValue({
          custName: res.result[0].customername,
          mobNumber: res.result[0].mobile,
          status: res.result[0].statusName
        })
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack("corpbanktoken/getBankTokenByIdForCorp/", res);
      }
    })
  }

  update() {
    this.formValidation.markFormGroupTouched(this.bankTokenEditForm);
    if (this.bankTokenEditForm.valid) {
      var formData = this.bankTokenEditForm.value;
      var param = this.bankTokenEditService.updateBankTokenCall(formData, this.bankTokenEditData, this.referenceNumber)
      this.updateBankToken(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.bankTokenEditForm, this.formErrors, false)
    }
  }

  updateTokenWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.bankTokenEditService.updateBankTokenWithRemarkCall(this.bankTokenEditFields, this.bankTokenEditData, formData);
      this.updateBankToken(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  updateBankToken(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.generateTokenRequestUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/bankToken");
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.generateTokenRequestUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
      }
      else {
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateCalculatorMasterDetailsUrl, res);
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  gotoBankToken() {
    this.router.navigateByUrl('/bankToken');
  }

  alphaNumericOnly(event){
    var inp = String.fromCharCode(event.keyCode);
    if(/[a-zA-Z0-9-_ ]/.test(inp)){
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
  }
}
