import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';


import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { AdminAdministrationAddRoleService } from './admin-administration-add-role.service';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { AdminAdministrationAddUserService } from '../admin-administration-add-user/admin-administration-add-user.service';
declare var showToastMessage: any;
@Component({
  selector: 'app-admin-administration-add-role',
  templateUrl: './admin-administration-add-role.component.html',
  styleUrls: ['./admin-administration-add-role.component.css']
})
export class AdminAdministrationAddRoleComponent implements OnInit {

  addRoleForm: FormGroup;
  roleType: any;
  roles: any = [];
  roletypesArr: any = [];
  formErrors = {
    roleName: '',
    roleCode: '',
    roleType: '',
    description: ''
  }

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private adminAddRoleService: AdminAdministrationAddRoleService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public adminAddUser: AdminAdministrationAddUserService,
  ) { }

  // role code validation - Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9]+$/)
  public buildForm() {
    this.addRoleForm = this.form.group({
      roleName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      roleCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      roleType: new FormControl('', [Validators.required]),
    });
    this.addRoleForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.addRoleForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Add New Role";
    this.buildForm();
    this.getRoles();
    this.getRoleTypes();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.adminAddRoleService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  //on load functions
  getRoles() {
    this.commonMethod.showLoader();
    var param = this.adminAddUser.getRoleTypeIdCall();
    console.log('role type id param: ', param);
    this.commonServiceCall.postResponsePromise(this.appConstants.getActiveRoles, param).subscribe(data => {
      var res = data.resp;
      this.commonMethod.hideLoader();
      if (data.status) {
        console.log("roles", data.resp);
        this.roles = res.result;
      }
      else {
        this.errorCallBack(this.appConstants.getActiveRoles, data.resp);
      }
    })
  }

  //on load functions
  getRoleTypes() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRoleTypes).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("role types: ", res);
        this.roletypesArr = res.result;
      }
      else {
        this.errorCallBack(this.appConstants.getRoleTypes, res);
      }
    })
  }

  add() {
    this.formValidation.markFormGroupTouched(this.addRoleForm);
    if (this.addRoleForm.valid) {
      var param = this.adminAddRoleService.addAdminRole(this.addRoleForm.value)
      this.addRoleMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.addRoleForm, this.formErrors, false)
    }
  }

  addRoleMaster(param) {
    console.log('request params: ', param);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addRoleUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        console.log(res);
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.addRoleUrl + "\n" + "Params=" + JSON.stringify(param), 'add')
        this.router.navigateByUrl("/administration");
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addRoleUrl, res);
      }
    })
  }

  onRoletypeChange(event) {
    this.roleType = event;
    console.log('Role Type: ', this.roleType);
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.addRoleUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  cancel() {
    this.router.navigateByUrl("/administration");
  }

}
