import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CorpAccountUserTypeAddService } from 'src/app/corp-account-user-type-add/corp-account-user-type-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corp-account-user-type-add',
  templateUrl: './corp-account-user-type-add.component.html',
  styleUrls: ['./corp-account-user-type-add.component.css']
})
export class CorpAccountUserTypeAddComponent implements OnInit {
  corporateAccountUserAddForm: FormGroup;
  remarkForm: FormGroup
  masterAccount: any = [];
  masterUser: any = [];
  formErrors = {
    accountType: '',
    userType: '',
    remark: ''
  }

  corpAcoountUserFields = {
    accountType: '',
    userType: '',
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
    private CorpAccountUserTypeAddService: CorpAccountUserTypeAddService
  ) { }

  public buildForm() {
    this.corporateAccountUserAddForm = this.form.group({
      accountType: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
    });
    this.corporateAccountUserAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateAccountUserAddForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Add Corporate Account User Type";
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.getAccountType()
    this.getUserType();
    this.commonMethod.hideLoader();
  }


  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.CorpAccountUserTypeAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }
  getAccountType() {
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllAccountTypes).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        res.result.forEach(element => {
          if (element.statusname == 'ACTIVE') {
            this.masterAccount.push(element);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  getUserType() {
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpUserTypesUrl).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        res.result.forEach(element => {
          if (element.statusname == 'ACTIVE') {
            this.masterUser.push(element);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  addAccountUserType() {
    this.formValidation.markFormGroupTouched(this.corporateAccountUserAddForm);
    if (this.corporateAccountUserAddForm.valid) {
      var formData = this.corporateAccountUserAddForm.value;
      var param = this.CorpAccountUserTypeAddService.getAccountUserTypeAddParam(formData);
      this.saveCorpUserTypeAccount(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateAccountUserAddForm, this.formErrors, false)
    }
  }

  //called on adding of Corporate User Type Account
  saveCorpUserTypeAccount(param) {
    console.log('adding params: ', param);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addCorpUserTypeAccount, param).subscribe(data => {
      var res = data.resp;
      console.log(data);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.addCorpUserTypeAccount + "\n" + "Params=" + JSON.stringify(param), 'add')
        this.cancel();
        showToastMessage(res.responseMessage);
      }
      else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
          this.corporateAccountUserAddForm.patchValue({
            accountType: this.corpAcoountUserFields.accountType,
            userType: this.corpAcoountUserFields.userType,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpUserTypesUrl, res);
      }
    });
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.router.navigateByUrl("/corpAccountUserType");
  }


  openActionModel(action, formdata) {
    if (this.corporateAccountUserAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.corpAcoountUserFields.accountType = formdata.accountType;
      this.corpAcoountUserFields.userType = formdata.userType;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateAccountUserAddForm, this.formErrors, false)
    }
  }

  addCorpAccountUserWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.CorpAccountUserTypeAddService.getAccountUserTypeAddParamWithRemark(this.corpAcoountUserFields, formData);
      this.saveCorpUserTypeAccount(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.corporateAccountUserAddForm.patchValue({
      accountType: this.corpAcoountUserFields.accountType,
      userType: this.corpAcoountUserFields.userType,
    });
    closeTinyModel();
  }

}
