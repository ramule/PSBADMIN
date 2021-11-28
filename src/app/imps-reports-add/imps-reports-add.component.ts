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
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { DatePipe } from "@angular/common";
import { ImpsReportsAddService } from "./imps-reports-add.service";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-reports-add",
  templateUrl: "./imps-reports-add.component.html",
  styleUrls: ["./imps-reports-add.component.css"],
})
export class ImpsReportsAddComponent implements OnInit {
  showForm: boolean = false;
  reportsAddForm: FormGroup;
  remarkForm: FormGroup;
  reportCategoryMaster: any = [];
  formErrors = {
    category: "",
    name: "",
    title: "",
    query: "",
    sub_title_temp: "",
    file_name_temp: "",
  };

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    private impsReportsAddService: ImpsReportsAddService
  ) {}

  public buildForm() {
    this.reportsAddForm = this.form.group({
      category: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      query: new FormControl("", [Validators.required]),
      sub_title_temp: new FormControl("", [Validators.required]),
      file_name_temp: new FormControl("", [Validators.required]),
    });
    this.reportsAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.reportsAddForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Reports Master";
    this.buildForm();
    this.getReportCategory();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsReportsAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
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

  addReports() {
    this.formValidation.markFormGroupTouched(this.reportsAddForm);
    if (this.reportsAddForm.valid) {
      var formData = this.reportsAddForm.value;
      var param = this.impsReportsAddService.addReport(formData);
      this.saveReport(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.reportsAddForm,
        this.formErrors,
        false
      );
    }
  }

  saveReport(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.insertReportData;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.insertReportData +
            "\n" +
            "Params=" +
            JSON.stringify(param),
          "add"
        );
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl("/impsReports");
      } else {
        this.errorCallBack(this.appConstant.insertReportData, res);
        this.commonMethod.hideLoader();
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.router.navigateByUrl("/impsReports");
  }
}
