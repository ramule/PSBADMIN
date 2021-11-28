import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { AccountSchemeMasterAddService } from './account-scheme-master-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-account-scheme-master-add',
  templateUrl: './account-scheme-master-add.component.html',
  styleUrls: ['./account-scheme-master-add.component.css']
})
export class AccountSchemeMasterAddComponent implements OnInit {

  status:any = [];
  productTypes:any = [];
  selModel: any;
  accSchemeMasteAddForm: FormGroup;
  remarkForm: FormGroup;

  formErrors = {
    schemeType:'',
    schemeCode:'',
    schemeMapping:'',
    remark: ''
  }

  masterCountryAddFields = {
    countryName:'',
    statusId:'',
    productType:''
  }

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public accountSchemeMasterAddService : AccountSchemeMasterAddService,
    public appConstants : AppConstants,
    public commonMethod : CommonMethods,
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Account Scheme Master";
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    this.accSchemeMasteAddForm.patchValue({
      statusId: 3
    });
    this.commonMethod.hideLoader();
  }

    //on load functions
  getAppMasterList() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstants.masterListUrl)
    .subscribe((data) => {
      var res = data;
      console.log("response data: ", res);
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        this.productTypes = res.resp;
        console.log("response array: ", this.productTypes);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = this.accountSchemeMasterAddService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
   })
  }

  public buildForm() {
    this.accSchemeMasteAddForm = this.form.group({
      schemeType: new FormControl('', [Validators.required]),
      schemeCode: new FormControl('', [Validators.required]),
      schemeMapping: new FormControl('', [Validators.required]),
    });

    this.accSchemeMasteAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.accSchemeMasteAddForm, this.formErrors, true)
    });

    if (this.selModel == "remarkField") {
      this.remarkForm = this.form.group({
        remark: new FormControl("", [Validators.required]),
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.remarkForm,
          this.formErrors,
          true
        );
      });
    }
  }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.status = data.resp;
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  filterStatus()
  {
    return this.status.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  filterProduct()
  {
    return this.commonDataShareService.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "UPIDESKTOP" || x.shortName == "UPIMOBILE" || x.shortName == "ALL");
  }

  openActionModel(action, formdata) {
    if (this.accSchemeMasteAddForm.valid) {

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterCountryAddFields.countryName = formdata.countryName;
      this.masterCountryAddFields.statusId = formdata.statusId;
      this.masterCountryAddFields.productType = formdata.productType;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.accSchemeMasteAddForm, this.formErrors, false)
    }
  }

  closeActionModel() {
    this.accSchemeMasteAddForm.patchValue({
      messageCodeName: this.masterCountryAddFields.countryName,
      statusId: this.masterCountryAddFields.statusId,
      productType: this.masterCountryAddFields.productType
    });
    closeTinyModel();
  }

  addAccountSchemeMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.accountSchemeMasterAddService.addAccountSchemeCallWithRemarkCall(this.masterCountryAddFields, this.remarkForm.value);
      this.addAccountScheme(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  addAccountSchemeMaster(){
    this.formValidation.markFormGroupTouched(this.accSchemeMasteAddForm);
    if (this.accSchemeMasteAddForm.valid) {
      var param = this.accountSchemeMasterAddService.addAccountSchemeCall(this.accSchemeMasteAddForm.value);
        this.addAccountScheme(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.accSchemeMasteAddForm, this.formErrors, false)
    }
  }

  addAccountScheme(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addCertificateConfigMasterUrl, param).subscribe(data => {
      var res = data.resp;
      console.log('add account scheme response: ', res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addCertificateConfigMasterUrl+"\n"+"Params="+JSON.stringify(param),'add')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.accSchemeMasteAddForm.patchValue({
            countryName: this.masterCountryAddFields.countryName,
            statusId: this.masterCountryAddFields.statusId,
            productType: this.masterCountryAddFields.productType
          });
        }
        this.errorCallBack(this.appConstants.addCertificateConfigMasterUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  cancel() {
    this.router.navigateByUrl("/accountScheme");
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
