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
import { Location, DatePipe } from "@angular/common";
import { AppConstants } from "../app-constants";
import { CommonMethods } from "../common-methods";
import { ImpsReportCategoryEditService } from "./imps-report-category-edit.service";
import { browserRefresh } from "../app.component";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-report-category-edit",
  templateUrl: "./imps-report-category-edit.component.html",
  styleUrls: ["./imps-report-category-edit.component.css"],
})
export class ImpsReportCategoryEditComponent implements OnInit {
  reportCategoryEditForm: FormGroup;
  formErrors = {
    title: "",
    menu: "",
    sys: "",
  };
  beforeParams: any;
  selModel: any;
  category_id: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant: AppConstants,
    private commonMethod: CommonMethods,
    public datePipe: DatePipe,
    private impsCategoryEditService: ImpsReportCategoryEditService
  ) {}

  public buildForm() {
    this.reportCategoryEditForm = this.form.group({
      title: new FormControl("", [Validators.required]),
      menu: new FormControl("", [Validators.required]),
      sys: new FormControl("", [Validators.required]),
    });
    this.reportCategoryEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.reportCategoryEditForm,
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
      this.router.navigateByUrl('/impsReportCategory');
      return;
    }

    this.commonServiceCall.pageName = "Edit Report Category";
    this.buildForm();
    this.category_id = this.location.getState();
    this.getCategoryById(this.category_id);
  }

  getCategoryById(param) {
    var params = {
      id: param.id,
    };
    this.commonServiceCall
      .postResponsePromise(this.appConstant.getReportCategoryByIdUrl, params)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.commonMethod.hideLoader();
          this.beforeParams = res.result[0];
          this.reportCategoryEditForm.patchValue({
            title: res.result[0].title,
            menu: res.result[0].show_as_submenu,
            sys: res.result[0].system_category,
          });
        } else {
          this.commonMethod.hideLoader();
        }
      });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsCategoryEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  update() {
    this.formValidation.markFormGroupTouched(this.reportCategoryEditForm);
    if (this.reportCategoryEditForm.valid) {
      var formData = this.reportCategoryEditForm.value;
      var param = this.impsCategoryEditService.editCategory(
        formData,
        this.category_id.id
      );
      this.updateCategory(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.reportCategoryEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateCategory(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.updateReportCategoryUrl;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.updateReportCategoryUrl +
            "\n" +
            "Params=" +
            JSON.stringify(param) +
            "\n" +
            "Before Update Params=" +
            JSON.stringify(this.beforeParams),
          "update"
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
