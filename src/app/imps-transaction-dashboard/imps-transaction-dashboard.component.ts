import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsTransactionDashboardService } from './imps-transaction-dashboard.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-transaction-dashboard',
  templateUrl: './imps-transaction-dashboard.component.html',
  styleUrls: ['./imps-transaction-dashboard.component.css']
})
export class ImpsTransactionDashboardComponent implements OnInit {

  impsTransDashboardForm: FormGroup;
  type: any;
  menuLink = "impsTransDashboard";
  impsTransDashboardDataArr: any = [];
  priviledgeDataArr: any = [];
  formErrors = {
    searchBy: '',
    id: ''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private impsTransactionDashboardService: ImpsTransactionDashboardService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Transaction Dashboard";
    this.buildForm();
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsTransactionDashboardService.addAuditTrailAdaptorParams(URL, operation);
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
    this.impsTransDashboardForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.impsTransDashboardForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsTransDashboardForm, this.formErrors, true)
    });
  }

  onSubmitClicked() {
    this.formValidation.markFormGroupTouched(this.impsTransDashboardForm);

    if (this.impsTransDashboardForm.valid) {
      var formData = this.impsTransDashboardForm.value;
      if (this.type == 'id') {
        var params = this.impsTransactionDashboardService.getTransDashboardDataCall(formData);
        this.getTransDashboardData(params);
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsTransDashboardForm, this.formErrors, false)
    }
  }

  getTransDashboardData(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.getSysConfigDataByIdUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsTransDashboardDataArr = res.result;
        console.log("IMPS Transaction Dashboard Data: ", this.impsTransDashboardDataArr);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getSysConfigDataByIdUrl + "\n" + "Params={}", 'view')
      } else if (res.responseCode == "202") {
        this.impsTransDashboardDataArr = [];
        showToastMessage(res.responseMessage);
      } else {
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  getSearchId(value) {
    console.log(value);
    this.type = value.searchBy;
    this.impsTransDashboardDataArr = [];
    this.impsTransDashboardForm.removeControl('id');

    if (this.type == 'id') {
      this.impsTransDashboardForm.addControl('id', new FormControl('', [Validators.required]));
    }
  }

  cancel(){
    this.commonMethod.cancel();
  }

}
