import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { FormValidationsService } from '../form-validations.service';
import { ImpsSystemStatusEditService } from './imps-system-status-edit.service';
import { Router } from '@angular/router';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-system-status-edit',
  templateUrl: './imps-system-status-edit.component.html',
  styleUrls: ['./imps-system-status-edit.component.css']
})
export class ImpsSystemStatusEditComponent implements OnInit {

  impsSystemStatusEditForm: FormGroup;
  impsSystemStatusData: any = [];
  status: any = [];
  selModel: any;
  selectedStateId: any;
  systemStatusData: any;
  selectedCountryId: any;

  expiredStatusFlag: boolean = false;
  isTimeoutStateFlag: boolean = false;
  isEmailEnabledFlag: boolean = false;

  formErrors = {
    name: "",
    state: "",
    groupName: "",
    detail: "",
    maxEvents: "",
    timeoutState: "",
    expiredStatus: ""
  };

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public impsSystemStatusEditService: ImpsSystemStatusEditService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsSystemStatus');
      return;
    }

    this.commonServiceCall.pageName = "IMPS System Status Edit";
    this.systemStatusData = this.location.getState();
    this.buildForm();
    this.getImpsSystemStatusId(this.systemStatusData.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsSystemStatusEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.impsSystemStatusEditForm = this.form.group({
      name: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      groupName: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      maxEvents: new FormControl("", [Validators.required]),
      timeoutState: new FormControl("", [Validators.required]),
      expiredStatus: new FormControl("", [Validators.required]),
    });

    this.impsSystemStatusEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.impsSystemStatusEditForm,
        this.formErrors,
        true
      );
    });
  }

  onEmailEnabledStatusChange(event) {
    this.isEmailEnabledFlag = !this.isEmailEnabledFlag;
  }

  getImpsSystemStatusId(id){
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getImpsStatusByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.impsSystemStatusData = res.result[0];

        console.log(res);
        this.impsSystemStatusEditForm.patchValue({
          name: res.result[0].name,
          state: res.result[0].state,
          groupName: res.result[0].groupName,
          detail: res.result[0].detail,
          maxEvents: res.result[0].maxEvents,
          expiredStatus: res.result[0].expired == 'N' ? 'NO' : 'YES',
          timeoutState: res.result[0].timeOut
        });

        if(res.result[0].enableEmail == "N") {
          this.isEmailEnabledFlag = false;
        }
        else {
          this.isEmailEnabledFlag = true;
        }
      }
      else {
        this.errorCallBack(this.appConstants.getImpsStatusByIdUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  editSystemStatus() {
    this.formValidation.markFormGroupTouched(this.impsSystemStatusEditForm);
    if (this.impsSystemStatusEditForm.valid) {
      var param = this.impsSystemStatusEditService.editSystemStatus(
        this.impsSystemStatusEditForm.value,
        this.impsSystemStatusData,
        this.isTimeoutStateFlag,
        this.isEmailEnabledFlag,
        this.expiredStatusFlag
      );
      this.updateImpsSystemStatus(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.impsSystemStatusEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateImpsSystemStatus(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.updateImpsStatusDataUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      console.log("add invProduct response: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateImpsStatusDataUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.impsSystemStatusData), 'update')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        this.errorCallBack(this.appConstants.updateImpsStatusDataUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  cancel() {
    this.router.navigateByUrl("/impsSystemStatus");
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
