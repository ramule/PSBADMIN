import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsCreditPoolAccDetailsAddService } from './imps-credit-pool-acc-details-add.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-credit-pool-acc-details-add',
  templateUrl: './imps-credit-pool-acc-details-add.component.html',
  styleUrls: ['./imps-credit-pool-acc-details-add.component.css']
})
export class ImpsCreditPoolAccDetailsAddComponent implements OnInit {

  showForm: boolean = false;
  isMultipleAccountChecked: boolean = false;
  creditPoolAccDetailsAddForm: FormGroup;
  impsDeliveryChannelArr: any = [];
  formErrors = {
    transType: "",
    channel: "",
    defaultAcc: "",
    sourceIdentifier: ""
  };

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstants: AppConstants,
    public datePipe: DatePipe,
    private impsCreditPoolAccDetailsAddService: ImpsCreditPoolAccDetailsAddService
  ) {}

  public buildForm() {
    this.creditPoolAccDetailsAddForm = this.form.group({
      transType: new FormControl("", [Validators.required]),
      channel: new FormControl("", [Validators.required]),
      defaultAcc: new FormControl("", [Validators.required]),
      sourceIdentifier: new FormControl("", [Validators.required])
    });
    this.creditPoolAccDetailsAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.creditPoolAccDetailsAddForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Credit Pool Account Details";
    this.buildForm();
    this.getDeliveryChannelDetails();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsCreditPoolAccDetailsAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  getDeliveryChannelDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstants.getAllDeliveryChannelDetailsUrl)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.impsDeliveryChannelArr = res.result;
        console.log("IMPS Delivery Channel: ", this.impsDeliveryChannelArr);
      } else {
        showToastMessage(res.responseMessage);
        this.errorCallBack(this.appConstants.getAllDeliveryChannelDetailsUrl, res)
      }
      this.commonMethod.hideLoader();
    });
  }

  addCreditPoolAccDetails() {
    this.formValidation.markFormGroupTouched(this.creditPoolAccDetailsAddForm);
    if (this.creditPoolAccDetailsAddForm.valid) {
      var formData = this.creditPoolAccDetailsAddForm.value;
      var param = this.impsCreditPoolAccDetailsAddService.addCreditPoolAccDetailsCall(formData);
      this.saveCreditPoolAccount(param)
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.creditPoolAccDetailsAddForm,
        this.formErrors,
        false
      );
    }
  }

  saveCreditPoolAccount(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.insertCreditPoolAccDetailsUrl, params)
    .subscribe((data) => {
      var res = data.resp;
      console.log("add system config: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.insertCreditPoolAccDetailsUrl +
            "\n" +
            "Params=" +
            JSON.stringify(params),
          "add"
        );
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        this.errorCallBack(this.appConstants.insertCreditPoolAccDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  // onMultipleAccCheckClick(event) {
  //   console.log(event);
  // }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.router.navigateByUrl("/impsCreditPoolAccDetails");
  }

}
