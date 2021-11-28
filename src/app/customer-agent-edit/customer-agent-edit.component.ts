import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CustomerAgentEditService } from './customer-agent-edit.service';
import { CommonMethods } from '../common-methods';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-customer-agent-edit',
  templateUrl: './customer-agent-edit.component.html',
  styleUrls: ['./customer-agent-edit.component.css']
})
export class CustomerAgentEditComponent implements OnInit {
  userDtl: any;
  beforeParams: any = [];
  remarkHistoryArr: any = [];
  languageArray: any = [];
  customerAgentForm: FormGroup;
  isUpiRegFlag: boolean = false;
  isUpiBlockedFlag: boolean = false;
  isUpiEnabledFlag: boolean = false;
  isMpinEnabledFlag: boolean = false;
  isTpinBlockedFlag: boolean = false;
  isMobileEnabledFlag: boolean = false;
  isWebEnabledFlag: boolean = false;
  isBiometricEnabledFlag: boolean = false;
  remarkForm: FormGroup;
  formErrors = {
    custName: '',
    mobNo: '',
    emailId: '',
    userId: '',
    prefLang: '',
    productType: '',
    isMpinActive: '',
    isTpinActive: '',
    isMobEnable: '',
    isWebEnable: '',
    isBometricEnable: '',
    Status: '',
    mobileBlockedStatus: '',
    ssaAccountNo: '',
    ssaAccStatus: '',
    upiEnabled: '',
    dob: '',
    remark: ''
  }

  custAgentField = {
    custName: '',
    mobNo: '',
    emailId: '',
    userId: '',
    prefLang: '',
    productType: '',
    isMpinActive: '',
    isTpinActive: '',
    isMobEnable: '',
    isWebEnable: '',
    isBometricEnable: '',
    Status: '',
    mobileBlockedStatus: '',
    ssaAccountNo: '',
    ssaAccStatus: '',
    upiEnabled: '',
    dob: '',
    mpinWrongAttempts: '',
    passwordWrongAttempts: '',
    tpinWrongAttempts: '',
  }

  selectedRole: any;
  status: any = [];
  isResetMobileChecked: boolean = false;
  resetMoileValue: any = 50;

  roleId: any;
  selModel: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private appConstants: AppConstants,
    public cusomerAgentService: CustomerAgentEditService,
    public commonMethod: CommonMethods,
  ) { }

  public buildForm() {
    this.customerAgentForm = this.form.group({
      custName: new FormControl(''),
      mobNo: new FormControl(''),
      emailId: new FormControl(''),
      userId: new FormControl(''),
      dob: new FormControl(''),
      prefLang: new FormControl('', [Validators.required]),
      productType: new FormControl(''),
      // isMpinActive: new FormControl('', [Validators.required]),
      // isTpinActive: new FormControl('', [Validators.required]),
      // isMobEnable: new FormControl('', [Validators.required]),
      // isWebEnable: new FormControl('', [Validators.required]),
      // isBometricEnable: new FormControl('', [Validators.required]),
      Status: new FormControl('', [Validators.required]),
      mobileBlockedStatus: new FormControl('', [Validators.required]),
      mpinWrongAttempts: new FormControl('', [Validators.required]),
      passwordWrongAttempts: new FormControl('', [Validators.required]),
      tpinWrongAttempts: new FormControl('', [Validators.required]),
      ssaAccountNo: new FormControl(''),
      upiEnabled: new FormControl(''),
      // ssaAccStatus:new FormControl('', [Validators.required])
    });
    this.customerAgentForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.customerAgentForm, this.formErrors, true)
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

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/customerAgent');
      return;
    }

    this.commonServiceCall.pageName = "Edit Customer Details";
    this.roleId = this.commonData.roleId;
    console.log('Role ID: ', this.roleId);
    this.buildForm();
    console.log(this.commonServiceCall.userCredential.userid);
    this.userDtl = this.location.getState();
    this.getStatus();
    this.getLanguage();
    this.getRemarkHistoryData(this.userDtl.id);
    this.getAgentDetails(this.userDtl.id);
  }

  /* It brings dynamic languages*/
  getLanguage() {
    var url = this.appConstants.getDistinctLanguageJsonCode;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.languageArray = res.result;
      } else {
        showToastMessage(res.responseMessage);
      }
    });
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

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.cusomerAgentService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }


  update() {
    this.formValidation.markFormGroupTouched(this.customerAgentForm);
    if (this.customerAgentForm.valid) {
      var formData = this.customerAgentForm.value;
      var param = this.cusomerAgentService.getAgentparam(this.userDtl.id, formData, this.resetMoileValue, this.isUpiRegFlag, this.isUpiBlockedFlag, this.isMpinEnabledFlag, this.isTpinBlockedFlag, this.isWebEnabledFlag, this.isMobileEnabledFlag, this.isBiometricEnabledFlag);
      this.updateAgentMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.customerAgentForm, this.formErrors, false)
    }
  }

  onMpinEnabledStatusChange(event) {
    this.isMpinEnabledFlag = !this.isMpinEnabledFlag;
  }

  onTpinBlockedStatusChange(event) {
    this.isTpinBlockedFlag = !this.isTpinBlockedFlag;
  }

  onWebEnabledStatusChange(event) {
    this.isWebEnabledFlag = !this.isWebEnabledFlag;
  }

  onBiometricEnabledStatusChange(event) {
    this.isBiometricEnabledFlag = !this.isBiometricEnabledFlag;
  }

  onMobileEnabledStatusChange(event) {
    this.isMobileEnabledFlag = !this.isMobileEnabledFlag;
  }

  updateAgentMaster(param) {
    this.commonMethod.showLoader();

    this.commonServiceCall.postResponsePromise(this.appConstants.updateCustomerDtl, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCustomerDtl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.cancel();
      } else {
        if (this.commonData.roleType == this.commonData.makerRole) {
          this.customerAgentForm.patchValue({
            custName: this.custAgentField.custName,
            mobNo: this.custAgentField.mobNo,
            emailId: this.custAgentField.emailId,
            userId: this.custAgentField.userId,
            prefLang: this.custAgentField.prefLang,
            productType: this.custAgentField.productType,
            isMpinActive: this.custAgentField.isMpinActive,
            isTpinActive: this.custAgentField.isTpinActive,
            isMobEnable: this.custAgentField.isMobEnable,
            isWebEnable: this.custAgentField.isWebEnable,
            isBometricEnable: this.custAgentField.isBometricEnable,
            Status: this.custAgentField.Status,
            mobileBlockedStatus: this.custAgentField.mobileBlockedStatus,
            ssaAccountNo: this.custAgentField.ssaAccountNo,
            ssaAccStatus: this.custAgentField.ssaAccStatus,
            dob: this.custAgentField.dob,
            upiEnabled: this.custAgentField.upiEnabled,
            mpinWrongAttempts: this.custAgentField.mpinWrongAttempts,
            tpinWrongAttempts: this.custAgentField.tpinWrongAttempts,
            passwordWrongAttempts: this.custAgentField.passwordWrongAttempts,
          })
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustomerDetails, res);
      }
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    console.log(this.commonServiceCall.makerRequestEditUrl);
    if (this.commonServiceCall.makerRequestEditUrl == '/customerAgent') {
      this.router.navigateByUrl("/customerAgent");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/customerAgent");
    }
  }

//on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        console.log('status data: ', data);
        var res = data;
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.status = res.resp;
          console.log("response array: ", this.status);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  filterStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  filterMobRegStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "REGISTRATION_BLOCKED" || x.shortName == "PENDING AT VERIFYTOKEN"
    );
  }

  getAgentDetails(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCustDtlById + "/" + id).subscribe(data => {
      console.log(data);
      if (data.status) {
        this.selectedRole = data.resp.result[0];
        this.beforeParams = data.resp.result[0]
        console.log(this.selectedRole);
        console.log(data.resp.result[0].mobilelastloggedon);
        if (data.resp.result[0].isupiregistered == 'Y') {
          this.isUpiRegFlag = true;
        }
        else {
          this.isUpiRegFlag = false;
        }

        if (data.resp.result[0].isblocked_UPI == 'Y') {
          this.isUpiBlockedFlag = true;
        }
        else {
          this.isUpiBlockedFlag = false;
        }

        if (data.resp.result[0].isupienabled == 'Y') {
          this.isUpiEnabledFlag = true;
        }
        else {
          this.isUpiEnabledFlag = false;
        }

        if(data.resp.result[0].ismpinenabled == "N") {
          this.isMpinEnabledFlag = false;
        }
        else {
          this.isMpinEnabledFlag = true;
        }

        if(data.resp.result[0].istpinlocked == "N") {
          this.isTpinBlockedFlag = false;
        }
        else {
          this.isTpinBlockedFlag = true;
        }

        if(data.resp.result[0].ismobileenabled == "N") {
          this.isMobileEnabledFlag = false;
        }
        else {
          this.isMobileEnabledFlag = true;
        }

        if(data.resp.result[0].iswebenabled == "N") {
          this.isWebEnabledFlag = false;
        }
        else {
          this.isWebEnabledFlag = true;
        }

        if(data.resp.result[0].isbiometricenabled == "N") {
          this.isBiometricEnabledFlag = false;
        }
        else {
          this.isBiometricEnabledFlag = true;
        }

        if (data.resp.result[0].userAction != null) {
          this.customerAgentForm.patchValue({
            custName: data.resp.result[0].customername,
            mobNo: data.resp.result[0].mobile,
            emailId: data.resp.result[0].email,
            userId: data.resp.result[0].username,
            prefLang: data.resp.result[0].preferedlanguage,
            productType: data.resp.result[0].appname,
            // isMpinActive: data.resp.result[0].ismpinenabled,
            // isTpinActive: data.resp.result[0].istpinlocked,
            // isMobEnable: data.resp.result[0].ismobileenabled,
            // isWebEnable: data.resp.result[0].iswebenabled,
            // isBometricEnable: data.resp.result[0].isbiometricenabled,
            Status: data.resp.result[0].userAction,
            mobileBlockedStatus: data.resp.result[0].ibregstatus,
            ssaAccountNo: data.resp.result[0].ssa_ACCOUNT_NUMBER,
            ssaAccStatus: data.resp.result[0].ssa_ACTIVE,
            dob: data.resp.result[0].dob,
            mpinWrongAttempts: data.resp.result[0].wrongattemptsmpin == null || data.resp.result[0].wrongattemptsmpin == "" || data.resp.result[0].wrongattemptsmpin == undefined ? 0 : data.resp.result[0].wrongattemptsmpin,
            tpinWrongAttempts: data.resp.result[0].wrongattemptstpin == null || data.resp.result[0].wrongattemptstpin == "" || data.resp.result[0].wrongattemptstpin == undefined ? 0 : data.resp.result[0].wrongattemptstpin,
            passwordWrongAttempts: data.resp.result[0].wrongattemptspwd == null || data.resp.result[0].wrongattemptspwd == "" || data.resp.result[0].wrongattemptspwd == undefined ? 0 : data.resp.result[0].wrongattemptspwd,
            upiEnabled: data.resp.result[0].isupienabled == 'Y' ? 'YES' : 'NO'
          })
        }
        else {
          this.customerAgentForm.patchValue({
            custName: data.resp.result[0].customername,
            mobNo: data.resp.result[0].mobile,
            emailId: data.resp.result[0].email,
            userId: data.resp.result[0].username,
            prefLang: data.resp.result[0].preferedlanguage,
            productType: data.resp.result[0].appname,
            // isMpinActive: data.resp.result[0].ismpinenabled,
            // isTpinActive: data.resp.result[0].istpinlocked,
            // isMobEnable: data.resp.result[0].ismobileenabled,
            // isWebEnable: data.resp.result[0].iswebenabled,
            // isBometricEnable: data.resp.result[0].isbiometricenabled,
            Status: data.resp.result[0].statusid,
            mobileBlockedStatus: data.resp.result[0].ibregstatus,
            ssaAccountNo: data.resp.result[0].ssa_ACCOUNT_NUMBER,
            ssaAccStatus: data.resp.result[0].ssa_ACTIVE,
            dob: data.resp.result[0].dob,
            mpinWrongAttempts: data.resp.result[0].wrongattemptsmpin == null || data.resp.result[0].wrongattemptsmpin == "" || data.resp.result[0].wrongattemptsmpin == undefined ? 0 : data.resp.result[0].wrongattemptsmpin,
            tpinWrongAttempts: data.resp.result[0].wrongattemptstpin == null || data.resp.result[0].wrongattemptstpin == "" || data.resp.result[0].wrongattemptstpin == undefined ? 0 : data.resp.result[0].wrongattemptstpin,
            passwordWrongAttempts: data.resp.result[0].wrongattemptspwd == null || data.resp.result[0].wrongattemptspwd == "" || data.resp.result[0].wrongattemptspwd == undefined ? 0 : data.resp.result[0].wrongattemptspwd,
            upiEnabled: data.resp.result[0].isupienabled == 'Y' ? 'YES' : 'NO'
          })
        }
      }
      else {

      }
      this.commonMethod.hideLoader();
    })
  }

  onResetTpinMpinPassword(type) {
    if(type == 'mpin') {
      this.customerAgentForm.patchValue({
        mpinWrongAttempts: 0
      });
      this.isMpinEnabledFlag = true;
    }
    else if(type == 'tpin') {
      this.customerAgentForm.patchValue({
        tpinWrongAttempts: 0
      });
    }
    else {
      this.customerAgentForm.patchValue({
        passwordWrongAttempts: 0
      });
    }
  }

  checkMobileStatus() {
    if (this.isResetMobileChecked == false) {
      this.isResetMobileChecked = true;
      this.resetMoileValue = 3;
    }
    else {
      this.isResetMobileChecked = false;
      this.resetMoileValue = 50;
    }
  }

  ///////maker-checker //////
  openActionModel(action, formdata) {
    if (this.customerAgentForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.custAgentField.custName = formdata.custName
      this.custAgentField.mobNo = formdata.mobNo
      this.custAgentField.emailId = formdata.emailId
      this.custAgentField.userId = formdata.userId
      this.custAgentField.prefLang = formdata.prefLang
      this.custAgentField.productType = formdata.productType
      this.custAgentField.isMpinActive = formdata.isMpinActive
      this.custAgentField.isTpinActive = formdata.isTpinActive
      this.custAgentField.isMobEnable = formdata.isMobEnable
      this.custAgentField.isWebEnable = formdata.isWebEnable
      this.custAgentField.isBometricEnable = formdata.isBometricEnable
      this.custAgentField.Status = formdata.Status
      this.custAgentField.mobileBlockedStatus = formdata.mobileBlockedStatus
      this.custAgentField.ssaAccountNo = formdata.ssaAccountNo
      this.custAgentField.ssaAccStatus = formdata.ssaAccStatus
      this.custAgentField.dob = formdata.dob
      this.custAgentField.upiEnabled = formdata.upiEnabled
      this.custAgentField.mpinWrongAttempts = formdata.mpinWrongAttempts
      this.custAgentField.tpinWrongAttempts = formdata.tpinWrongAttempts
      this.custAgentField.passwordWrongAttempts = formdata.passwordWrongAttempts
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.customerAgentForm, this.formErrors, false)
    }
  }

  updateCustomerAgentWithRemark(formData) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formDataRemark = this.remarkForm.value;
      var param = this.cusomerAgentService.getCustAgentAddParamWithRemark(this.userDtl.id, this.resetMoileValue, this.custAgentField, formDataRemark, this.isUpiRegFlag, this.isUpiBlockedFlag, this.isMpinEnabledFlag, this.isTpinBlockedFlag, this.isWebEnabledFlag, this.isMobileEnabledFlag, this.isBiometricEnabledFlag);
      this.updateAgentMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.customerAgentForm.patchValue({
      custName: this.custAgentField.custName,
      mobNo: this.custAgentField.mobNo,
      emailId: this.custAgentField.emailId,
      userId: this.custAgentField.userId,
      prefLang: this.custAgentField.prefLang,
      productType: this.custAgentField.productType,
      isMpinActive: this.custAgentField.isMpinActive,
      isTpinActive: this.custAgentField.isTpinActive,
      isMobEnable: this.custAgentField.isMobEnable,
      isWebEnable: this.custAgentField.isWebEnable,
      isBometricEnable: this.custAgentField.isBometricEnable,
      Status: this.custAgentField.Status,
      mobileBlockedStatus: this.custAgentField.mobileBlockedStatus,
      ssaAccountNo: this.custAgentField.ssaAccountNo,
      ssaAccStatus: this.custAgentField.ssaAccStatus,
      dob: this.custAgentField.dob,
      upiEnabled: this.custAgentField.upiEnabled,
      mpinWrongAttempts: this.custAgentField.mpinWrongAttempts,
      tpinWrongAttempts: this.custAgentField.tpinWrongAttempts,
      passwordWrongAttempts: this.custAgentField.passwordWrongAttempts,
    })
    closeTinyModel();
  }

  onUpiRegStatusChange(event) {
    this.isUpiRegFlag = !this.isUpiRegFlag;
  }

  onUpiBlockStatusChange(event) {
    this.isUpiBlockedFlag = !this.isUpiBlockedFlag;
  }

}
