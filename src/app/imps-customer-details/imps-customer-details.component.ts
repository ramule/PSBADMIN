import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
import { DatePipe } from '@angular/common';
import { ImpsCustomerDetailsService } from './imps-customer-details.service';
import { CommonDataShareService } from '../common-data-share.service';


declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-customer-details',
  templateUrl: './imps-customer-details.component.html',
  styleUrls: ['./imps-customer-details.component.css']
})
export class ImpsCustomerDetailsComponent implements OnInit {
  impsCustomerDetailsForm: FormGroup;
  menuLink = "impsCustomerDetails";
  isToDateValidError:any = "";
  impsCustomerDetailsArr: any = [];
  priviledgeDataArr: any = [];

  formErrors = {
    mblDelFlag: '',
    mobileNo: ''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private impsCustomerDetailsService: ImpsCustomerDetailsService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Customer Details";
    this.buildForm();
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsCustomerDetailsService.addAuditTrailAdaptorParams(URL, operation);
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
    this.impsCustomerDetailsForm = this.form.group({
      mblDelFlag: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required])
    });
    this.impsCustomerDetailsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsCustomerDetailsForm, this.formErrors, true)
    });
  }

  onSubmitClicked() {
    this.formValidation.markFormGroupTouched(this.impsCustomerDetailsForm);

    if (this.impsCustomerDetailsForm.valid) {
      var formData = this.impsCustomerDetailsForm.value;
      var params = this.impsCustomerDetailsService.getCustomerDetailCall(formData);
      this.getCustomerDetails(params);
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsCustomerDetailsForm, this.formErrors, false)
    }
  }

  getCustomerDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.getImpsCustDetailsUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      if (res.result.responseCode == "200") {
        console.log("response data: ", res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsCustomerDetailsArr = res.result.result;
        console.log("IMPS customer details Array: ", this.impsCustomerDetailsArr);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getImpsCustDetailsUrl + "\n" + "Params={}", 'view')
      } else {
        showToastMessage(res.result.responseMessage);
        this.impsCustomerDetailsArr = [];
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  cancel(){
    this.commonMethod.cancel();
  }

}
