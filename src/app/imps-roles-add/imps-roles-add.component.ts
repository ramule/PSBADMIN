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
import { ImpsRolesAddService } from "./imps-roles-add.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-roles-add",
  templateUrl: "./imps-roles-add.component.html",
  styleUrls: ["./imps-roles-add.component.css"],
})
export class ImpsRolesAddComponent implements OnInit {
  showForm: boolean = false;
  rolesAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    name: "",
  };
  dropdownList = [];
  selectedItems = [];

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstants: AppConstants,
    public datePipe: DatePipe,
    private impsRolesAddService: ImpsRolesAddService
  ) {}

  public buildForm() {
    this.rolesAddForm = this.form.group({
      name: new FormControl("", [Validators.required])
    });
    this.rolesAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.rolesAddForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Roles";
    this.buildForm();
    this.selectedItems = [];
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsRolesAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  addRoles() {
    this.formValidation.markFormGroupTouched(this.rolesAddForm);
    if (this.rolesAddForm.valid) {
      var formData = this.rolesAddForm.value;
      var param = this.impsRolesAddService.addImpsRolesCall(formData);
      this.saveImpsRoles(param)
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.rolesAddForm,
        this.formErrors,
        false
      );
    }
  }

  saveImpsRoles(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.insertImpsRoleUrl, params)
    .subscribe((data) => {
      var res = data.resp;
      console.log("add system config: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.insertImpsRoleUrl +
            "\n" +
            "Params=" +
            JSON.stringify(params),
          "add"
        );
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        this.errorCallBack(this.appConstants.insertImpsRoleUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.router.navigateByUrl("/impsRoles");
  }
}
