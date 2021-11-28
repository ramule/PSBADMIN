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
import { ImpsReportsEditService } from "./imps-reports-edit.service";
import { browserRefresh } from "../app.component";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-reports-edit",
  templateUrl: "./imps-reports-edit.component.html",
  styleUrls: ["./imps-reports-edit.component.css"],
})
export class ImpsReportsEditComponent implements OnInit {
  reportsEditForm: FormGroup;
  formErrors = {
    category: "",
    name: "",
    title: "",
    query: "",
    sub_title_temp: "",
    file_name_temp: "",
  };

  userId: any;
  remarkHistoryArr: any = [];

  roleId: any;
  selModel: any;

  report_id: any;
  beforeParams: any;
  reportCategoryMaster: any = [];
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
    private impsReportsEditService: ImpsReportsEditService
  ) {}

  public buildForm() {
    this.reportsEditForm = this.form.group({
      category: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      query: new FormControl("", [Validators.required]),
      sub_title_temp: new FormControl("", [Validators.required]),
      file_name_temp: new FormControl("", [Validators.required]),
    });
    this.reportsEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.reportsEditForm,
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
      this.router.navigateByUrl('/impsReports');
      return;
    }

    this.commonServiceCall.pageName = "Edit Reports Master";
    this.buildForm();

    this.report_id = this.location.getState();
    this.getReportById(this.report_id);
    this.getReportCategory();
  }

  getReportCategory() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getReportCategoryUrl)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.reportCategoryMaster = res.result;
        } else {
          this.commonMethod.hideLoader();
        }
      });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsReportsEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  getReportById(param) {

    var params = {
      "id": param.id
    };

    this.commonServiceCall
    .postResponsePromise(this.appConstant.getAllReportsById, params)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.commonMethod.hideLoader();
        this.beforeParams = res.result[0];
        this.reportsEditForm.patchValue({
          category: res.result[0].category_id,
          name: res.result[0].name,
          title: res.result[0].title,
          query: res.result[0].query,
          sub_title_temp: res.result[0].sub_title_template,
          file_name_temp: res.result[0].file_name_template,
        });
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.reportsEditForm);
    if (this.reportsEditForm.valid) {
      var formData = this.reportsEditForm.value;
      var param = this.impsReportsEditService.editTask(
        formData,
        this.report_id.id
      );
      this.updateReport(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.reportsEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateReport(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.updateReportData;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.updateReportData + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl("/impsReports");
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  cancel() {
    this.router.navigateByUrl("/impsReports");
  }
}
