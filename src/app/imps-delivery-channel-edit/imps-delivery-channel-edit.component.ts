import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe, Location } from "@angular/common";
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { ImpsDeliveryChannelEditService } from './imps-delivery-channel-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-delivery-channel-edit',
  templateUrl: './imps-delivery-channel-edit.component.html',
  styleUrls: ['./imps-delivery-channel-edit.component.css']
})
export class ImpsDeliveryChannelEditComponent implements OnInit {

  impsDeliveryChannelEditForm: FormGroup;
  remarkForm: FormGroup;

  isMPINNeeded: boolean = false;
  isCustomerAuthenticated: boolean = false;
  isAccNumPartial: boolean = false;
  isRemMobileNeeded: boolean = false;

  formErrors = {
    name: "",
    channelCode: "",
    dailyLimitAmt: "",
    monthlyLimitAmt: "",
    mcc: "",
    posEntryMode: "",
    otpValidity: "",
    otpLimit: "",
    posConditionCode: "",
  };
  beforeParams: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    private impsDeliveryChannelEditService: ImpsDeliveryChannelEditService,
    public location: Location
  ) {}
  public buildForm() {
    this.impsDeliveryChannelEditForm = this.form.group({
      name: new FormControl("", [Validators.required]),
      channelCode: new FormControl("", [Validators.required]),
      dailyLimitAmt: new FormControl("", [Validators.required]),
      monthlyLimitAmt: new FormControl("", [Validators.required]),
      mcc: new FormControl("", [Validators.required]),
      posEntryMode: new FormControl("", [Validators.required]),
      otpValidity: new FormControl(""),
      otpLimit: new FormControl(""),
      posConditionCode: new FormControl("", [Validators.required]),
    });
    this.impsDeliveryChannelEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.impsDeliveryChannelEditForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsDeliveryChannel');
      return;
    }

    this.commonServiceCall.pageName = "Edit IFSC Codes";
    this.buildForm();
    var IFSC_id = this.location.getState();
    this.getIFSCDetailsById(IFSC_id);
  }

  getIFSCDetailsById(param) {

    var params = {
      "id": param.id
    }

    this.commonServiceCall
    .postResponsePromise(this.appConstant.getAllDeliveryChannelDetailsByIdUrl, params)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.commonMethod.hideLoader();
        this.beforeParams = res.result[0];

        if(this.beforeParams.check_mpin == 'Y') {
          this.isMPINNeeded = true;
        }
        else {
          this.isMPINNeeded = false;
        }

        if(this.beforeParams.cust_authenticated == 'Y') {
          this.isCustomerAuthenticated = true;
        }
        else {
          this.isCustomerAuthenticated = false;
        }

        if(this.beforeParams.accnum_partial == 'Y') {
          this.isAccNumPartial = true;
        }
        else {
          this.isAccNumPartial = false;
        }

        if(this.beforeParams.check_remitter_mobile == 'Y') {
          this.isRemMobileNeeded = true;
        }
        else {
          this.isRemMobileNeeded = false;
        }

        this.impsDeliveryChannelEditForm.patchValue({
          name: res.result[0].name,
          channelCode: res.result[0].nfs_channel_code,
          dailyLimitAmt: res.result[0].daily_limit_amount,
          monthlyLimitAmt: res.result[0].monthly_limit_amount,
          mcc: res.result[0].mcc,
          posEntryMode: res.result[0].pos_entry_mode,
          otpValidity: res.result[0].otp_validity,
          otpLimit: res.result[0].otp_limit,
          posConditionCode: res.result[0].pos_condition_code,
        });
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsDeliveryChannelEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  editDeliveryChannel() {
    this.formValidation.markFormGroupTouched(this.impsDeliveryChannelEditForm);
    if (this.impsDeliveryChannelEditForm.valid) {
      var formData = this.impsDeliveryChannelEditForm.value;
      var param = this.impsDeliveryChannelEditService.editDeliveryChannelCall(
        formData,
        this.beforeParams,
        this.isMPINNeeded,
        this.isAccNumPartial,
        this.isCustomerAuthenticated,
        this.isRemMobileNeeded
      );
      this.updateDeliveryChannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.impsDeliveryChannelEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateDeliveryChannel(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.updateDeliveryChannelUrl;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.updateDeliveryChannelUrl +
            "\n" +
            "Params=" +
            JSON.stringify(param) +
            "\n" +
            "Before Update Params=" +
            JSON.stringify(this.beforeParams),
          "update"
        );
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.cancel();
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  onMPINStateChange(event) {
    this.isMPINNeeded = !this.isMPINNeeded;
  }

  onCustAuthStateChange(event) {
    this.isCustomerAuthenticated = !this.isCustomerAuthenticated;
  }

  onAccNumPartialStateChange(event) {
    this.isAccNumPartial = !this.isAccNumPartial;
  }

  onRemMobileNeededStateChange(event) {
    this.isRemMobileNeeded = !this.isRemMobileNeeded;
  }

  cancel() {
    this.router.navigateByUrl("/impsDeliveryChannel");
  }

}
