import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { browserRefresh } from '../app.component';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsCreditPoolAccDetailsEditService } from './imps-credit-pool-acc-details-edit.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-credit-pool-acc-details-edit',
  templateUrl: './imps-credit-pool-acc-details-edit.component.html',
  styleUrls: ['./imps-credit-pool-acc-details-edit.component.css']
})
export class ImpsCreditPoolAccDetailsEditComponent implements OnInit {

  creditPoolAccDetailsEditForm: FormGroup;
  creditPoolAccDetailsData: any;
  creditPoolAccDetailsDataArr: any = [];
  impsDeliveryChannelArr: any = [];
  formErrors = {
    transType: "",
    channel: "",
    defaultAcc: "",
    sourceIdentifier: ""
  };

  userId: any;
  remarkHistoryArr :any=[];


  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant : AppConstants,
    private commonMethod : CommonMethods,
    public datePipe: DatePipe,
    private impsCreditPoolAccDetailsEditService: ImpsCreditPoolAccDetailsEditService
  ) { }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsCreditPoolAccDetailsEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.creditPoolAccDetailsEditForm = this.form.group({
      transType: new FormControl("", [Validators.required]),
      channel: new FormControl("", [Validators.required]),
      defaultAcc: new FormControl("", [Validators.required]),
      sourceIdentifier: new FormControl("", [Validators.required])
    });
    this.creditPoolAccDetailsEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.creditPoolAccDetailsEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsCreditPoolAccDetails');
      return;
    }

    this.commonServiceCall.pageName = "Edit Credit Pool Account Details";
    this.creditPoolAccDetailsData = this.location.getState();
    this.buildForm();
    this.getDeliveryChannelDetails();
    this.getCreditPoolAccDetailsById(this.creditPoolAccDetailsData.id);
  }

  getDeliveryChannelDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstant.getAllDeliveryChannelDetailsUrl)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.impsDeliveryChannelArr = res.result;
        console.log("IMPS Delivery Channel: ", this.impsDeliveryChannelArr);
      } else {
        showToastMessage(res.responseMessage);
        this.errorCallBack(this.appConstant.getAllDeliveryChannelDetailsUrl, res)
      }
      this.commonMethod.hideLoader();
    });
  }

  getCreditPoolAccDetailsById(id) {

    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.getCreditPoolAccDetailsByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.creditPoolAccDetailsDataArr = res.result[0];

        console.log(res);
        this.creditPoolAccDetailsEditForm.patchValue({
          transType: res.result[0].tran_type,
          channel: res.result[0].channel_id,
          defaultAcc: res.result[0].default_account,
          sourceIdentifier: res.result[0].source_identifier,
        });
      }
      else {
        this.errorCallBack(this.appConstant.getCreditPoolAccDetailsByIdUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  update(){
    this.formValidation.markFormGroupTouched(this.creditPoolAccDetailsEditForm);
    if (this.creditPoolAccDetailsEditForm.valid) {
      var formData = this.creditPoolAccDetailsEditForm.value;
      var param = this.impsCreditPoolAccDetailsEditService.updateCreditPoolAccDetailsCall(formData, this.creditPoolAccDetailsDataArr) ;
      this.updateCreditPoolAccDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.creditPoolAccDetailsEditForm, this.formErrors, false)
    }
  }

  updateCreditPoolAccDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstant.updateCreditPoolAccDetailsUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      console.log("add invProduct response: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.updateCreditPoolAccDetailsUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.creditPoolAccDetailsDataArr), 'update')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        this.errorCallBack(this.appConstant.updateCreditPoolAccDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  cancel() {
    this.router.navigateByUrl('/impsCreditPoolAccDetails')
  }

}
