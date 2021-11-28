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
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ImpsRolesEditService } from "./imps-roles-edit.service";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-roles-edit",
  templateUrl: "./imps-roles-edit.component.html",
  styleUrls: ["./imps-roles-edit.component.css"],
})
export class ImpsRolesEditComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  impsRoleData: any;
  rolesEditForm: FormGroup;
  formErrors = {
    name: "",
    permissions: "",
  };
  userId: any;

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
    private impsRolesEditService: ImpsRolesEditService
  ) {}

  public buildForm() {
    this.rolesEditForm = this.form.group({
      name: new FormControl("", [Validators.required])
    });
    this.rolesEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.rolesEditForm,
        this.formErrors,
        true
      );
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsRolesEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Edit Roles";
    this.buildForm();
    this.impsRoleData = this.location.getState();
    this.getRolesById(this.impsRoleData.id);
  }

  getRolesById(id) {
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.getAllImpsRolesByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.selectedItems = res.result[0];

        console.log(res);
        this.rolesEditForm.patchValue({
          name: res.result[0].name
        });
      }
      else {
        this.errorCallBack(this.appConstant.getAllImpsRolesByIdUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  update() {
    this.formValidation.markFormGroupTouched(this.rolesEditForm);
    if (this.rolesEditForm.valid) {
      var formData = this.rolesEditForm.value;
      var param = this.impsRolesEditService.updateRolesall(formData, this.impsRoleData.id) ;
      this.updateRoles(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.rolesEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateRoles(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstant.updateImpsRoleUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      console.log("add invProduct response: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.updateImpsRoleUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.selectedItems), 'update')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        this.errorCallBack(this.appConstant.updateImpsRoleUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  cancel() {
    this.router.navigateByUrl("/impsRoles");
  }
}
