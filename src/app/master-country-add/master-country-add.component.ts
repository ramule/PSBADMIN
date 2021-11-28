import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MasterCountryAddService } from './master-country-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-country-add',
  templateUrl: './master-country-add.component.html',
  styleUrls: ['./master-country-add.component.css']
})
export class MasterCountryAddComponent implements OnInit {

  status:any = [];
  productTypes:any = [];
  selModel: any;
  masterCountryAddForm: FormGroup;
  remarkForm: FormGroup;

  formErrors = {
    countryName:'',
    statusId:'',
    productType:'',
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
    public masterCountryAddService : MasterCountryAddService,
    public appConstants : AppConstants,
    public commonMethod : CommonMethods,
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Country Master";
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    this.masterCountryAddForm.patchValue({
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
    var param = this.masterCountryAddService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
   })
  }

  public buildForm() {
    this.masterCountryAddForm = this.form.group({
      countryName: new FormControl('', [Validators.required]),
      productType: new FormControl('', []),
      statusId: new FormControl('', [Validators.required]),
    });

    this.masterCountryAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.masterCountryAddForm, this.formErrors, true)
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
    if (this.masterCountryAddForm.valid) {

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterCountryAddFields.countryName = formdata.countryName;
      this.masterCountryAddFields.statusId = formdata.statusId;
      this.masterCountryAddFields.productType = formdata.productType;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.masterCountryAddForm, this.formErrors, false)
    }
  }

  closeActionModel() {
    this.masterCountryAddForm.patchValue({
      messageCodeName: this.masterCountryAddFields.countryName,
      statusId: this.masterCountryAddFields.statusId,
      productType: this.masterCountryAddFields.productType
    });
    closeTinyModel();
  }

  addCountryMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.masterCountryAddService.addCountryWithRemarkCall(this.masterCountryAddFields, this.remarkForm.value);
      this.addCountry(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  addCountryMaster(){
    this.formValidation.markFormGroupTouched(this.masterCountryAddForm);
    if (this.masterCountryAddForm.valid) {
      var param = this.masterCountryAddService.addCountryCall(this.masterCountryAddForm.value);
        this.addCountry(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.masterCountryAddForm, this.formErrors, false)
    }
  }

  addCountry(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addCountryDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      console.log('add invProduct response: ', res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addCountryDetailsUrl+"\n"+"Params="+JSON.stringify(param),'add')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.masterCountryAddForm.patchValue({
            countryName: this.masterCountryAddFields.countryName,
            statusId: this.masterCountryAddFields.statusId,
            productType: this.masterCountryAddFields.productType
          });
        }
        this.errorCallBack(this.appConstants.addCountryDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  cancel() {
    this.router.navigateByUrl("/masterCountry");
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
