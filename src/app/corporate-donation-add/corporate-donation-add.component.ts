import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CorporateDonationAddService } from './corporate-donation-add.service';
import { Location } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-donation-add',
  templateUrl: './corporate-donation-add.component.html',
  styleUrls: ['./corporate-donation-add.component.css']
})
export class CorporateDonationAddComponent implements OnInit {

  corporateDonationForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    companyName: '',
    accNo: '',
    type: '',
    status: '',
    remark: ''
  }

  corporateDonationFields = {
    companyName: '',
    accNo: '',
    type: '',
    status: ''
  }

  //feild parameter
  masterDonation: any = [];
  priviledgeDataArr: any = [];
  status = [];
  p: number = 1;

  selModel: any;
  roleId: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private corporateDonationAddService: CorporateDonationAddService,
    public location: Location
  ) { }

  public buildForm() {
    this.corporateDonationForm = this.form.group({
      companyName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9_\d\-_.,\s ]+$/)]),
      accNo: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(18), Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9]+$/)]),
      type: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9_\d\-_.,\s ]+$/)]),
      status: new FormControl('', [Validators.required])
    });
    this.corporateDonationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateDonationForm, this.formErrors, true)
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
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Corporate Donation Add";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getStatus();
    this.corporateDonationForm.patchValue({
      status: 3,
      type: 'CORPORATE'
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corporateDonationAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  filterStatus() {
    return this.status.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.status = res.resp;
        console.log('response array: ', this.status);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  addMaster() {
    var userDetails = JSON.parse(this.commonServiceCall.userCredential);
    this.formValidation.markFormGroupTouched(this.corporateDonationForm);
    if (this.corporateDonationForm.valid) {
      var formData = this.corporateDonationForm.value;
      var param = this.corporateDonationAddService.getMasterDonationsDetailsCall(formData);
      this.addDonationMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateDonationForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl('/corporateDonation');
  }

  addDonationMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveCorpDonationDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.saveCorpDonationDetailsUrl + "\n" + "Params=" + JSON.stringify(param), 'add')

        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.cancel();
        showToastMessage(res.responseMessage);
      }
      else {
        if (this.commonData.roleType == this.commonData.corpMakerRole) {
          this.corporateDonationForm.patchValue({
            companyName: this.corporateDonationFields.companyName,
            accNo: this.corporateDonationFields.accNo,
            type: this.corporateDonationFields.type,
            status: this.corporateDonationFields.status
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.saveCorpDonationDetailsUrl, res);
      }
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  openActionModel(action, formdata) {
    if (this.corporateDonationForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.corporateDonationFields.companyName = formdata.companyName;
      this.corporateDonationFields.accNo = formdata.accNo;
      this.corporateDonationFields.type = formdata.type;
      this.corporateDonationFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateDonationForm, this.formErrors, false)
    }
  }

  addDonationWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corporateDonationAddService.getMasterDonationsDetailsCallWithRemark(this.corporateDonationFields, formData);
      this.addDonationMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.corporateDonationForm.patchValue({
      companyName: this.corporateDonationFields.companyName,
      accNo: this.corporateDonationFields.accNo,
      type: this.corporateDonationFields.type,
      status: this.corporateDonationFields.status
    });
    closeTinyModel();
  }

}
