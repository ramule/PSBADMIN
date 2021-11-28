import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CorpUserTypeAddService } from './corp-user-type-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corp-user-type-add',
  templateUrl: './corp-user-type-add.component.html',
  styleUrls: ['./corp-user-type-add.component.css']
})
export class CorpUserTypeAddComponent implements OnInit {

  status: any = [];

  corporateUserAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    userType: '',
    description: '',
    ruleSeq: '',
    remark: ''
  }
  corpUserTypeFields = {
    userType: '',
    description: '',
    ruleSeq: '',
  }

  roleId: any;
  selModel: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private corpUserTypeAddService: CorpUserTypeAddService
  ) { }


  public buildForm() {
    this.corporateUserAddForm = this.form.group({
      userType: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
      description: new FormControl('', [Validators.required]),
      ruleSeq: new FormControl('', [Validators.required]),
    });
    this.corporateUserAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateUserAddForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Add Corporate Role";
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.commonMethod.hideLoader();
  }


  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpUserTypeAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  addUserType() {
    this.formValidation.markFormGroupTouched(this.corporateUserAddForm);
    if (this.corporateUserAddForm.valid) {
      var formData = this.corporateUserAddForm.value;
      var param = this.corpUserTypeAddService.addCorpoUserTypeCall(formData);
      console.log('request parameters: ', param);
      this.saveUserType(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateUserAddForm, this.formErrors, false)
    }
  }

  //called on adding of Corporate User Type
  saveUserType(param) {
    console.log('adding params: ', param);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addCorpUserTypeUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(data);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.cancel();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpUserTypesUrl + "\n" + "Params=" + JSON.stringify(param), 'add')
      }
      else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
          this.corporateUserAddForm.patchValue({
            userType: this.corpUserTypeFields.userType,
            description: this.corpUserTypeFields.description,
            ruleSeq: this.corpUserTypeFields.ruleSeq,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addCorpUserTypeUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.router.navigateByUrl("/corpUserType");
  }

  openActionModel(action, formdata) {
    if (this.corporateUserAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.corpUserTypeFields.userType = formdata.userType;
      this.corpUserTypeFields.description = formdata.description;
      this.corpUserTypeFields.ruleSeq = formdata.ruleSeq;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateUserAddForm, this.formErrors, false)
    }
  }

  addUserCorpTypeWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corpUserTypeAddService.addCorpoUserTypeCallWithRemark(this.corpUserTypeFields, formData);
      this.saveUserType(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.corporateUserAddForm.patchValue({
      userType: this.corpUserTypeFields.userType,
      description: this.corpUserTypeFields.description,
      ruleSeq: this.corpUserTypeFields.ruleSeq,
    });
    closeTinyModel();
  }

}
