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
import { ImpsDebitPoolAccDetailsEditService } from './imps-debit-pool-acc-details-edit.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-debit-pool-acc-details-edit',
  templateUrl: './imps-debit-pool-acc-details-edit.component.html',
  styleUrls: ['./imps-debit-pool-acc-details-edit.component.css']
})
export class ImpsDebitPoolAccDetailsEditComponent implements OnInit {

  debitPoolAccDetailsEditForm: FormGroup;
  debitPoolAccDetailsData: any;
  debitPoolAccDetailsDataArr: any = [];
  formErrors = {
    transType: "",
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
    private impsDebitPoolAccDetailsEditService: ImpsDebitPoolAccDetailsEditService
  ) { }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsDebitPoolAccDetailsEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.debitPoolAccDetailsEditForm = this.form.group({
      transType: new FormControl("", [Validators.required]),
      defaultAcc: new FormControl("", [Validators.required]),
      sourceIdentifier: new FormControl("", [Validators.required])
    });
    this.debitPoolAccDetailsEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.debitPoolAccDetailsEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsDebitPoolAccDetails');
      return;
    }

    this.commonServiceCall.pageName = "Edit Debit Pool Account Details";
    this.debitPoolAccDetailsData = this.location.getState();
    this.buildForm();
    this.getDebitPoolAccDetailsById(this.debitPoolAccDetailsData.id);
  }

  getDebitPoolAccDetailsById(id) {

    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.getDebitPoolAccDetailsBYIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.debitPoolAccDetailsDataArr = res.result[0];

        console.log(res);
        this.debitPoolAccDetailsEditForm.patchValue({
          transType: res.result[0].tran_type,
          channel: res.result[0].channel_id,
          defaultAcc: res.result[0].default_account,
          sourceIdentifier: res.result[0].source_identifier,
        });
      }
      else {
        this.errorCallBack(this.appConstant.getDebitPoolAccDetailsBYIdUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  update(){
    this.formValidation.markFormGroupTouched(this.debitPoolAccDetailsEditForm);
    if (this.debitPoolAccDetailsEditForm.valid) {
      var formData = this.debitPoolAccDetailsEditForm.value;
      var param = this.impsDebitPoolAccDetailsEditService.updateDebitPoolAccDetailsCall(formData, this.debitPoolAccDetailsDataArr) ;
      this.updateDebitPoolAccDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.debitPoolAccDetailsEditForm, this.formErrors, false)
    }
  }

  updateDebitPoolAccDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstant.updateDebitPoolAccDetailsUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      console.log("add invProduct response: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.updateDebitPoolAccDetailsUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.debitPoolAccDetailsDataArr), 'update')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        this.errorCallBack(this.appConstant.updateDebitPoolAccDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  cancel() {
    this.router.navigateByUrl('/impsDebitPoolAccDetails')
  }

}
