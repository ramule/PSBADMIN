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
import { ImpsReportCategoryAddService } from "./imps-report-category-add.service";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-report-category-add",
  templateUrl: "./imps-report-category-add.component.html",
  styleUrls: ["./imps-report-category-add.component.css"],
})
export class ImpsReportCategoryAddComponent implements OnInit {
  showForm: boolean = false;
  reportCategoryAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    title: "",
    menu: "",
    sys: "",
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
    private impsCategoryAddService: ImpsReportCategoryAddService
  ) {}

  public buildForm() {
    this.reportCategoryAddForm = this.form.group({
      title: new FormControl("", [Validators.required]),
      menu: new FormControl("", [Validators.required]),
      sys: new FormControl("", [Validators.required]),
    });
    this.reportCategoryAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.reportCategoryAddForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Report Category";
    this.buildForm();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsCategoryAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  addTask() {
    this.formValidation.markFormGroupTouched(this.reportCategoryAddForm);
    if (this.reportCategoryAddForm.valid) {
      var formData = this.reportCategoryAddForm.value;
      var param = this.impsCategoryAddService.addTask(formData);
      this.saveCategory(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.reportCategoryAddForm,
        this.formErrors,
        false
      );
    }
  }

  saveCategory(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.insertReportCategoryUrl;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.insertReportCategoryUrl +
            "\n" +
            "Params=" +
            JSON.stringify(param),
          "add"
        );
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl("/impsReportCategory");
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  cancel() {
    this.router.navigateByUrl("/impsReportCategory");
  }
}
