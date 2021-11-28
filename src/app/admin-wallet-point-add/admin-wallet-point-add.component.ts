import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { AdminWalletPointAddService } from './admin-wallet-point-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-admin-wallet-point-add',
  templateUrl: './admin-wallet-point-add.component.html',
  styleUrls: ['./admin-wallet-point-add.component.css']
})
export class AdminWalletPointAddComponent implements OnInit {
  showForm: boolean = false;
  rewardsPointsForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    walletPointsType: '',
    transAmt: '',
    walletPoints: '',
    status: '',
    productType: '',
    fromDate: '',
    toDate: '',
    remark: ''
  }

  rewardPointsFields = {
    walletPointsType: '',
    transAmt: '',
    walletPoints: '',
    status: '',
    productType: '',
    fromDate: '',
    toDate: '',
  }
  isAddButtonClicked = false;
  toDateValid: boolean = false;
  masterStatus: any = [];
  productTypes: any = [];
  todayDate: any;
  isToDateValidError: any = "";

  roleId: any;
  selModel: any;


  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    private adminWalletPointAddService: AdminWalletPointAddService
  ) { }

  public buildForm() {
    this.rewardsPointsForm = this.form.group({
      walletPointsType: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      transAmt: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      walletPoints: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      status: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required])
    });
    this.rewardsPointsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.rewardsPointsForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Add Reward Points";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getProductType();
    this.getStatus();
    this.rewardsPointsForm.patchValue({
      status: 3
    });
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }


  cancel() {
    this.rewardsPointsForm.reset();
    this.router.navigateByUrl("/adminWalletPoints");
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.adminWalletPointAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
    })
  }

  addMaster() {
    this.formValidation.markFormGroupTouched(this.rewardsPointsForm);
    if (this.rewardsPointsForm.valid) {
      var formData = this.rewardsPointsForm.value;
      var param = this.adminWalletPointAddService.addAdminWalletPoint(formData);
      this.saveWalletPoints(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.rewardsPointsForm, this.formErrors, false)
    }
  }

  onDateChange(value) {
    if (value.fromDate != "" && value.toDate != "") {
      if (value.toDate < value.fromDate) {
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* Please enter valid date";
      }
      else {
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }


  saveWalletPoints(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.addWalletPoints
    this.commonServiceCall.postResponsePromise(url, param).subscribe(data => {
      if (this.toDateValid) return;
      var res = data.resp;
      if (res.responseCode == "200") {

        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.addWalletPoints + "\n" + "Params=" + JSON.stringify(param), 'add')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl('/adminWalletPoints');
      } else {
        this.rewardsPointsForm.patchValue({
          walletPointsType: this.rewardPointsFields.walletPointsType,
          transAmt: this.rewardPointsFields.transAmt,
          walletPoints: this.rewardPointsFields.walletPoints,
          status: this.rewardPointsFields.status,
          fromDate: this.rewardPointsFields.fromDate,
          toDate: this.rewardPointsFields.toDate,
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.addWalletPoints, res);
      }

    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstant.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.masterStatus = [];
        data.resp.forEach(el => {
          if (el.id == 3 || el.id == 0) {
            this.masterStatus.push(el);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  getProductType() {
    this.commonServiceCall.getResponsePromise(this.appConstant.masterListUrl).subscribe(data => {
      if (data.status) {
        console.log("roles", data.resp);
        this.productTypes = data.resp;
      }
      else {
        this.commonMethod.errorMessage(data);
      }

    })
  }

  filterStatus() {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }

  filterProduct() {
    return this.productTypes.filter(x => x.shortName == "WALLET");
  }

  openActionModel(action, formdata) {
    if (this.rewardsPointsForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.rewardPointsFields.walletPointsType = formdata.walletPointsType;
      this.rewardPointsFields.transAmt = formdata.transAmt;
      this.rewardPointsFields.walletPoints = formdata.walletPoints;
      this.rewardPointsFields.status = formdata.status;
      this.rewardPointsFields.productType = formdata.productType;
      this.rewardPointsFields.fromDate = formdata.fromDate;
      this.rewardPointsFields.toDate = formdata.toDate;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.rewardsPointsForm, this.formErrors, false)
    }
  }

  addRewardPointsWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.adminWalletPointAddService.addAdminWalletPointWithRemark(this.rewardPointsFields, formData);
      this.saveWalletPoints(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.rewardsPointsForm.patchValue({
      walletPointsType: this.rewardPointsFields.walletPointsType,
      transAmt: this.rewardPointsFields.transAmt,
      walletPoints: this.rewardPointsFields.walletPoints,
      status: this.rewardPointsFields.status,
      productType: this.rewardPointsFields.productType,
      fromDate: this.rewardPointsFields.fromDate,
      toDate: this.rewardPointsFields.toDate,
    });
    closeTinyModel();
  }

}
