import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsConnectionStatusService } from './imps-connection-status.service';

declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-connection-status',
  templateUrl: './imps-connection-status.component.html',
  styleUrls: ['./imps-connection-status.component.css']
})
export class ImpsConnectionStatusComponent implements OnInit {

  impsConnectionStatusForm: FormGroup;
  toDateValid: boolean = false;
  isViewData: boolean = false;
  todayDate:any;
  type: any;
  menuLink = "impsConnectionStatus";
  isToDateValidError:any = "";
  impsTransLogArr: any = [];
  priviledgeDataArr: any = [];
  viewDataArray: any = [];
  formErrors = {
    searchBy: '',
    state: ''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private impsConnectionStatusService: ImpsConnectionStatusService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Connection Status";
    this.buildForm();
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsConnectionStatusService.addAuditTrailAdaptorParams(URL, operation);
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
    this.impsConnectionStatusForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.impsConnectionStatusForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsConnectionStatusForm, this.formErrors, true)
    });
  }

  onSubmitClicked() {
    this.formValidation.markFormGroupTouched(this.impsConnectionStatusForm);

    if (this.impsConnectionStatusForm.valid) {
      var formData = this.impsConnectionStatusForm.value;
      if (this.type == 'state') {
        var params = this.impsConnectionStatusService.getConnectionStatusByStateCall(formData);
        this.getConnectionStatusDetails(params);
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsConnectionStatusForm, this.formErrors, false)
    }
  }

  getConnectionStatusDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.getImpsStatusByStateUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsTransLogArr = res.result;
        console.log("IMPS Connection Status: ", this.impsTransLogArr);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getImpsStatusByStateUrl + "\n" + "Params={}", 'view')
      } else {
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  getSearchConnectionStatus(value) {
    this.toDateValid = false;
    console.log(value);
    this.type = value.searchBy;
    this.impsTransLogArr = [];
    this.impsConnectionStatusForm.removeControl('state');

    if (this.type == 'state') {
      this.impsConnectionStatusForm.addControl('state', new FormControl('', [Validators.required]));
    }
  }

  cancel(){
    this.commonMethod.cancel();
  }

}
