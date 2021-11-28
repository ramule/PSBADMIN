import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsTransactionFeeSetupEditService } from './imps-transaction-fee-setup-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-transaction-fee-setup-edit',
  templateUrl: './imps-transaction-fee-setup-edit.component.html',
  styleUrls: ['./imps-transaction-fee-setup-edit.component.css']
})
export class ImpsTransactionFeeSetupEditComponent implements OnInit {

  impsTransFeeSetupEditForm: FormGroup;
  isFeeAppliedFlag: boolean = false;
  selectedFeeSetup: any;
  beforeParams:any;
  feeSetupId: any;
  formErrors = {
    transType: '',
    desc: '',
    transDirection: ''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant : AppConstants,
    private commonMethod : CommonMethods,
    private impsTransactionFeeSetupEditService: ImpsTransactionFeeSetupEditService
  ) { }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsTransactionFeeSetup');
      return;
    }

    this.commonServiceCall.pageName = "Edit Task";
    this.buildForm();
    this.feeSetupId = this.location.getState();
    this.getFeeSetupById(this.feeSetupId);
  }

    /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL, operation) {
      var param = this.impsTransactionFeeSetupEditService.addAuditTrailAdaptorParams(URL, operation);
      console.log(param)
      this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
      })
    }

  public buildForm() {
    this.impsTransFeeSetupEditForm = this.form.group({
      transType: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      transDirection: new FormControl('', [Validators.required])
    });
    this.impsTransFeeSetupEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsTransFeeSetupEditForm, this.formErrors, true)
    });
  }

  onFeeApplyStatusChange(event) {
    console.log(event.target.value);
    this.isFeeAppliedFlag = !this.isFeeAppliedFlag;
  }

  cancel() {
    this.router.navigateByUrl('/impsTransactionFeeSetup');
  }

  getFeeSetupById(param) {
    this.commonMethod.showLoader();
    var params = {
      "id": param.id
    }
    this.commonServiceCall
    .postResponsePromise(this.appConstant.getTransFeeSetupByApplyFeeAndTransTypeByIdUrl, params)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.commonMethod.hideLoader();
        this.beforeParams = res.result[0];
        this.selectedFeeSetup = res.result[0].paramValue;

        if(res.result[0].apply_fee == 'Y') {
          this.isFeeAppliedFlag = true;
        }
        else {
          this.isFeeAppliedFlag = false;
        }

        this.impsTransFeeSetupEditForm.patchValue({
          transType: res.result[0].transaction_type,
          transDirection: res.result[0].transaction_direction,
          desc: res.result[0].description
        });
      } else {
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
      }
    });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.impsTransFeeSetupEditForm);
    if (this.impsTransFeeSetupEditForm.valid) {
      var formData = this.impsTransFeeSetupEditForm.value;
      var param = this.impsTransactionFeeSetupEditService.editTransFee(formData, this.feeSetupId.id, this.isFeeAppliedFlag);
      console.log(param);
      this.updateTransFeeSetup(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsTransFeeSetupEditForm, this.formErrors, false)
    }
  }

  updateTransFeeSetup(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.updateTransFeeSetupUrl
    this.commonServiceCall.postResponsePromise(url, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {

        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.updateTransFeeSetupUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl('/impsTransactionFeeSetup');
      } else {
        this.commonMethod.hideLoader();
      }

    })
  }

}
