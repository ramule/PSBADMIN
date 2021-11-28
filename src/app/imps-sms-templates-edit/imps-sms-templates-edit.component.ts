import { Component, OnInit } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { Location, TitleCasePipe, DatePipe } from "@angular/common";
import { AppConstants } from "../app-constants";
import { CommonMethods } from "../common-methods";
import { ImpsSmsTemplatesEditService } from "./imps-sms-templates-edit.service";
import { browserRefresh } from "../app.component";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-sms-templates-edit",
  templateUrl: "./imps-sms-templates-edit.component.html",
  styleUrls: ["./imps-sms-templates-edit.component.css"],
})
export class ImpsSmsTemplatesEditComponent implements OnInit {
  smsEditForm: FormGroup;
  smsData: any;
  smsTemplateDataArr: any = [];
  formErrors = {
    name: "",
    type: "",
    template: "",
    target: "",
    transType: "",
    cdciStatus: "",
  };
  remarkHistoryArr: any = [];

  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant: AppConstants,
    private commonMethod: CommonMethods,
    public titlecasePipe: TitleCasePipe,
    public datePipe: DatePipe,
    private impsSMSEditService: ImpsSmsTemplatesEditService
  ) {}

  public buildForm() {
    this.smsEditForm = this.form.group({
      name: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      template: new FormControl("", [Validators.required]),
      target: new FormControl("", [Validators.required]),
      transType: new FormControl(""),
      cdciStatus: new FormControl(""),
    });
    this.smsEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.smsEditForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsSMS');
      return;
    }

    this.commonServiceCall.pageName = "Edit SMS Templates";
    this.smsData = this.location.getState();
    this.buildForm();
    this.getSMSById(this.smsData.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsSMSEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  getSMSById(id) {
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.getSmsTemplatesByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.smsTemplateDataArr = res.result[0];

        console.log(res);
        this.smsEditForm.patchValue({
          name: res.result[0].name,
          type: res.result[0].type,
          template: res.result[0].template,
          target: res.result[0].target,
          transType: res.result[0].tran_type == "" || res.result[0].tran_type  == null ? '-' : res.result[0].tran_type,
          cdciStatus: res.result[0].cdci_status == "" || res.result[0].cdci_status  == null ? '-' : res.result[0].cdci_status,
        });
      }
      else {
        this.errorCallBack(this.appConstant.getSmsTemplatesByIdUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  update() {
    this.formValidation.markFormGroupTouched(this.smsEditForm);
    if (this.smsEditForm.valid) {
      var formData = this.smsEditForm.value;
      var param = this.impsSMSEditService.smsTemplateEditCall(formData, this.smsData.id, this.smsTemplateDataArr) ;
      this.updateSystemConfig(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.smsEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateSystemConfig(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstant.updateSmsTemplateUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      console.log("add invProduct response: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.updateSmsTemplateUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.smsTemplateDataArr), 'update')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        this.errorCallBack(this.appConstant.updateSmsTemplateUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  cancel() {
    this.router.navigateByUrl("/impsSMS");
  }
}
