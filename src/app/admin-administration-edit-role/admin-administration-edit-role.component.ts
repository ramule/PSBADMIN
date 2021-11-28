import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { CommonMethods } from "../common-methods";
import { Location } from "@angular/common";
import { AdminAdministrationEditRoleService } from "./admin-administration-edit-role.service";
import { browserRefresh } from "../app.component";
import { AdminAdministrationAddUserService } from "../admin-administration-add-user/admin-administration-add-user.service";
declare var showToastMessage: any;
@Component({
  selector: "app-admin-administration-edit-role",
  templateUrl: "./admin-administration-edit-role.component.html",
  styleUrls: ["./admin-administration-edit-role.component.css"],
})
export class AdminAdministrationEditRoleComponent implements OnInit {
  beforeParams: any;
  roleType: any;
  addRoleForm: FormGroup;
  formErrors = {
    roleName: "",
    roleCode: "",
    roleType: "",
    description: "",
  };

  selectedRole: any;
  roleId: any;
  roles: any = [];
  roletypesArr: any = [];

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public appConstants: AppConstants,
    private location: Location,
    public adminEditSevices: AdminAdministrationEditRoleService,
    public commonMethod: CommonMethods,
    public adminAddUser: AdminAdministrationAddUserService,
  ) { }

  public buildForm() {
    this.addRoleForm = this.form.group({
      roleName: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
      roleCode: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.maxLength(70),
      ]),
      roleType: new FormControl("", [Validators.required]),
    });
    this.addRoleForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.addRoleForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.router.navigateByUrl('/administration');
      return;
    }

    this.commonServiceCall.pageName = "Edit Role";
    this.buildForm();
    this.getRoles();
    this.getRoleTypes();
    this.roleId = this.location.getState();
    console.log(this.roleId);
    var param = this.adminEditSevices.getparamId(this.roleId.id);
    this.getRoleDetails(param);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.adminEditSevices.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

  //on load functions
  getRoles() {
    this.commonMethod.showLoader();
    var param = this.adminAddUser.getRoleTypeIdCall();
    console.log('role type id param: ', param);
    this.commonServiceCall
      .postResponsePromise(this.appConstants.getActiveRoles, param)
      .subscribe((data) => {
        var res = data.resp;
        this.commonMethod.hideLoader();
        if (data.status) {
          console.log("roles", data.resp);
          this.roles = res.result;
        } else {
          this.errorCallBack(this.appConstants.getActiveRoles, res);
        }
      });
  }

  //on load functions
  getRoleTypes() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getRoleTypes)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == 200) {
          console.log("role types: ", res);
          this.roletypesArr = res.result;
        } else {
          this.errorCallBack(this.appConstants.getRoleTypes, res);
        }
      });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.addRoleForm);
    if (this.addRoleForm.valid) {
      var formData = this.addRoleForm.value;
      var userDetails = this.commonServiceCall.userCredential;
      var param = this.adminEditSevices.getRoleParam(
        formData,
        userDetails,
        this.roleId.id
      );
      this.updateRoleMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.addRoleForm,
        this.formErrors,
        false
      );
    }
  }

  updateRoleMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.getEditRoleDetails, param)
      .subscribe((data) => {
        console.log(data);
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.commonMethod.hideLoader();
          showToastMessage(res.responseMessage);
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.getEditRoleDetails +
            "\n" +
            "Params=" +
            JSON.stringify(param) +
            "\n" +
            "Before Update Params=" +
            JSON.stringify(this.beforeParams),
            "update"
          );
          this.router.navigateByUrl("/administration");
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getTransactions, res);
        }
      });
  }

  onRoletypeChange(event) {
    this.roleType = event;
    console.log("Role Type: ", this.roleType);
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.router.navigateByUrl("/administration");
  }

  getRoleDetails(param) {
    this.commonServiceCall
      .postResponsePromise(this.appConstants.getRolesById, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.commonMethod.hideLoader();
          this.selectedRole = res.result[0];
          this.beforeParams = res.result[0];
          console.log(this.selectedRole);
          this.addRoleForm.patchValue({
            roleName: res.result[0].name,
            roleType: res.result[0].roleType,
            roleCode: res.result[0].code,
            description: res.result[0].description,
          });
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getRolesById, res);
        }
      });
  }

}
