import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsTransactionFeeSetupService } from './imps-transaction-fee-setup.service';

declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-transaction-fee-setup',
  templateUrl: './imps-transaction-fee-setup.component.html',
  styleUrls: ['./imps-transaction-fee-setup.component.css']
})
export class ImpsTransactionFeeSetupComponent implements OnInit {

  impsTransactionFeeSetupForm: FormGroup;
  menuLink = "impsTransactionFeeSetup";
  isToDateValidError:any = "";
  impsTransLogArr: any = [];
  priviledgeDataArr: any = [];
  viewDataArray: any = [];
  formErrors = {
    applyFee: '',
    transactionType: ''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private impsTransactionFeeSetupService: ImpsTransactionFeeSetupService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Transaction";
    this.buildForm();
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsTransactionFeeSetupService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonDataService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  getPriviledgeData(id) {
    var url =
      this.appConstants.getPriviledgeDataUrl +
      id +
      "/" +
      this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  public buildForm() {
    this.impsTransactionFeeSetupForm = this.form.group({
      transactionType: new FormControl('', [Validators.required]),
      applyFee: new FormControl('', [Validators.required])
    });
    this.impsTransactionFeeSetupForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsTransactionFeeSetupForm, this.formErrors, true)
    });
  }

  onSubmitClicked() {
    this.formValidation.markFormGroupTouched(this.impsTransactionFeeSetupForm);

    if (this.impsTransactionFeeSetupForm.valid) {
      var formData = this.impsTransactionFeeSetupForm.value;
      var params = this.impsTransactionFeeSetupService.getTransFeeSetupCall(formData);
      this.getTransFeeSetupDetails(params);
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsTransactionFeeSetupForm, this.formErrors, false)
    }
  }

  getTransFeeSetupDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.getTransFeeSetupByApplyFeeAndTransTypeUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsTransLogArr = res.result;
        console.log("IMPS Transaction Fee Setup Array: ", this.impsTransLogArr);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getTransFeeSetupByApplyFeeAndTransTypeUrl + "\n" + "Params={}", 'view')
      } else {
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  cancel(){
    this.commonMethod.cancel();
  }

  gotoEdit(item) {
    this.router.navigateByUrl("/impsTransactionFeeSetupEdit", {
      state: { id: item.id },
    });
  }
}
