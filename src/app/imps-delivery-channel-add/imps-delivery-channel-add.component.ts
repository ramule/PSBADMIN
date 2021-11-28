import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsDeliveryChannelAddService } from './imps-delivery-channel-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-delivery-channel-add',
  templateUrl: './imps-delivery-channel-add.component.html',
  styleUrls: ['./imps-delivery-channel-add.component.css']
})
export class ImpsDeliveryChannelAddComponent implements OnInit {

  deliveryChannelAddForm: FormGroup;
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

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    private impsDeliveryChannelAddService: ImpsDeliveryChannelAddService
  ) {}
  public buildForm() {
    this.deliveryChannelAddForm = this.form.group({
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
    this.deliveryChannelAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.deliveryChannelAddForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Delivery Channel";
    this.buildForm();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsDeliveryChannelAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  addDeliveryChannel() {
    this.formValidation.markFormGroupTouched(this.deliveryChannelAddForm);
    if (this.deliveryChannelAddForm.valid) {
      var formData = this.deliveryChannelAddForm.value;
      var param = this.impsDeliveryChannelAddService.addDeliveryChannelCall(
        formData,
        this.isMPINNeeded,
        this.isAccNumPartial,
        this.isCustomerAuthenticated,
        this.isRemMobileNeeded
      );
      this.saveDeliveryChannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.deliveryChannelAddForm,
        this.formErrors,
        false
      );
    }
  }

  saveDeliveryChannel(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.insertDeliveryChannelUrl;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.insertDeliveryChannelUrl +
            "\n" +
            "Params=" +
            JSON.stringify(param),
          "add"
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
