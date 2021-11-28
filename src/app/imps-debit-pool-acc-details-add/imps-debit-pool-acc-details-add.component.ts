import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsDebitPoolAccDetailsAddService } from './imps-debit-pool-acc-details-add.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-debit-pool-acc-details-add',
  templateUrl: './imps-debit-pool-acc-details-add.component.html',
  styleUrls: ['./imps-debit-pool-acc-details-add.component.css']
})
export class ImpsDebitPoolAccDetailsAddComponent implements OnInit {

  showForm: boolean = false;
  debitPoolAccDetailsAddForm: FormGroup;
  formErrors = {
    transType: "",
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
    private impsDebitPoolAccDetailsAddService: ImpsDebitPoolAccDetailsAddService
  ) {}

  public buildForm() {
    this.debitPoolAccDetailsAddForm = this.form.group({
      transType: new FormControl("", [Validators.required]),
      defaultAcc: new FormControl("", [Validators.required]),
      sourceIdentifier: new FormControl("", [Validators.required])
    });
    this.debitPoolAccDetailsAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.debitPoolAccDetailsAddForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Debit Pool Account Details";
    this.buildForm();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsDebitPoolAccDetailsAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  addDebitPoolAccDetails() {
    this.formValidation.markFormGroupTouched(this.debitPoolAccDetailsAddForm);
    if (this.debitPoolAccDetailsAddForm.valid) {
      var formData = this.debitPoolAccDetailsAddForm.value;
      var param = this.impsDebitPoolAccDetailsAddService.addDebitPoolAccDetailsCall(formData);
      this.addDebitPoolAccount(param)
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.debitPoolAccDetailsAddForm,
        this.formErrors,
        false
      );
    }
  }

  addDebitPoolAccount(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.insertDebitPoolAccDetailsUrl, params)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add debit pool acc details: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.insertDebitPoolAccDetailsUrl +
              "\n" +
              "Params=" +
              JSON.stringify(params),
            "add"
          );
          console.log(res);
          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          this.errorCallBack(this.appConstants.insertDebitPoolAccDetailsUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.router.navigateByUrl("/impsDebitPoolAccDetails");
  }

}
