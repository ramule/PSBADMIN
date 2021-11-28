import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsOtpLogDetailsService } from './imps-otp-log-details.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-otp-log-details',
  templateUrl: './imps-otp-log-details.component.html',
  styleUrls: ['./imps-otp-log-details.component.css']
})
export class ImpsOtpLogDetailsComponent implements OnInit {

  impsOtpLogForm: FormGroup;
  isViewData: boolean = false;
  type: any;
  menuLink = "impsOtpLogDetails";
  impsOtpLogArr: any = [];
  priviledgeDataArr: any = [];
  formErrors = {
    searchBy: '',
    mobile: ''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private impsOtpLogDetailsService: ImpsOtpLogDetailsService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "OTP Log Details";
    this.buildForm();
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsOtpLogDetailsService.addAuditTrailAdaptorParams(URL, operation);
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
    this.impsOtpLogForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.impsOtpLogForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsOtpLogForm, this.formErrors, true)
    });
  }

  onSubmitClicked() {
    this.formValidation.markFormGroupTouched(this.impsOtpLogForm);

    if (this.impsOtpLogForm.valid) {
      var formData = this.impsOtpLogForm.value;
      if (this.type == 'mobile') {
        var params = this.impsOtpLogDetailsService.getOtpLogDetailsCall(formData);
        this.getOtpLogDetails(params);
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsOtpLogForm, this.formErrors, false)
    }
  }

  getOtpLogDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.getOtpLogsDetailsUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsOtpLogArr = res.result;
        console.log("IMPS OTP Log: ", this.impsOtpLogArr);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getOtpLogsDetailsUrl + "\n" + "Params={}", 'view')
      } else {
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  getSearchOtpLog(value) {
    console.log(value);
    this.type = value.searchBy;
    this.impsOtpLogArr = [];
    this.impsOtpLogForm.removeControl('mobile');

    if (this.type == 'mobile') {
      this.impsOtpLogForm.addControl('mobile', new FormControl('', [Validators.required]));
    }
  }

  cancel(){
    this.commonMethod.cancel();
  }

}
