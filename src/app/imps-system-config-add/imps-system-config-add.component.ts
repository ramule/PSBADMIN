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
import { ImpsSystemConfigAddService } from "./imps-system-config-add.service";
ImpsSystemConfigAddService;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-system-config-add",
  templateUrl: "./imps-system-config-add.component.html",
  styleUrls: ["./imps-system-config-add.component.css"],
})
export class ImpsSystemConfigAddComponent implements OnInit {
  showForm: boolean = false;
  sysConfigAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    id: "",
    value: ""
  };

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstants: AppConstants,
    public datePipe: DatePipe,
    private impsSystemConfigAddService: ImpsSystemConfigAddService
  ) {}

  public buildForm() {
    this.sysConfigAddForm = this.form.group({
      id: new FormControl("", [Validators.required]),
      value: new FormControl("", [Validators.required])
    });
    this.sysConfigAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.sysConfigAddForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add System Configuration";
    this.buildForm();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsSystemConfigAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  addSystemConfig() {
    this.formValidation.markFormGroupTouched(this.sysConfigAddForm);
    if (this.sysConfigAddForm.valid) {
      var formData = this.sysConfigAddForm.value;
      var param = this.impsSystemConfigAddService.addSystemConfigCall(formData);
      this.saveSystemConfig(param)
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.sysConfigAddForm,
        this.formErrors,
        false
      );
    }
  }

  saveSystemConfig(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.insertSysConfigDataUrl, params)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add system config: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.insertSysConfigDataUrl +
              "\n" +
              "Params=" +
              JSON.stringify(params),
            "add"
          );
          console.log(res);
          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          this.errorCallBack(this.appConstants.insertSysConfigDataUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.router.navigateByUrl("/impsSystemConfig");
  }
}
