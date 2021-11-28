import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service'
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonServiceService } from '../common-service.service';
import { AccessMenuRightsService } from './access-menu-rights.service';
import { AdminAdministrationAddUserService } from '../admin-administration-add-user/admin-administration-add-user.service';

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var $: any;
declare var showToastMessage: any;
@Component({
  selector: 'app-access-menu-rights',
  templateUrl: './access-menu-rights.component.html',
  styleUrls: ['./access-menu-rights.component.css']
})
export class AccessMenuRightsComponent implements OnInit {
  // id = 200;
  leftMenuArr = [];
  menuLink = "accessMenuRight"
  menuForm: FormGroup;
  priviledgeDataArr: any = [];
  allRolls: any = [];
  showTable: boolean = false;
  roleError: boolean = false;
  selRole: any = '';
  allRoles: any = [];
  shoeRoles: boolean = false;
  menuRights: any = [];
  menuId: "";
  selProduct: any;
  selType: any;
  selRoles: any
  formErrors = {
    selectedRole: ''
  }
  menuIndex = 0;
  reload = true;
  headerLang = { col1: 'Menu Name', col2: 'Access Right', col3: 'View Sub Menu' }


  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private commonService: CommonServiceService,
    public menuRightsService: AccessMenuRightsService,
    public adminAddUser: AdminAdministrationAddUserService,

  ) { }

  /**
   * This function is used for initialisation
   */
  ngOnInit() {
    this.commonServiceCall.pageName = "Menu Rights";
    this.getAllRoles();
    this.buildForm();
    this.getLeftMenuId();
  }


  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.menuRightsService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
    })
  }
  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstant.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstant.getPriviledgeDataUrl + id + "/" + this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (!this.priviledgeDataArr.viewChecked) {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  /**
   * This function is used to build the form for validations
   */
  public buildForm() {
    this.menuForm = this.form.group({
      selectedRole: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
    this.menuForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.menuForm, this.formErrors, true)
    });
  }

  /**
   * This function is used to go to the dashboard if on the current page
   */
  cancel() {
    this.commonMethod.cancel();
  }

  /**
   * This function is used to get all roles and bind in the dropdown
   */
  getAllRoles() {
    this.commonMethod.showLoader();
    var param = this.adminAddUser.getRoleTypeIdCall();
    console.log('role type id param: ', param);
    this.commonServiceCall.postResponsePromise(this.appConstant.getActiveRoles, param).subscribe(data => {
      var res = data.resp;
      if (data.status) {
        this.commonMethod.hideLoader();
        console.log("roles", data.resp);
        this.allRoles = res.result;
      }
      else {
        this.errorCallBack(this.appConstant.getActiveRoles, res);
      }

    })
  }

  /**
   * This function is used to get the records from the selected value
   * @param roleid
   * @param fld
   */
  selectedValue(roleid, fld) {
    $('#dt-sample').DataTable().clear().destroy();
    this.selRole = roleid;
    this.commonMethod.showLoader();
    this.commonData.menuRightDetailValue.roleId = roleid;
    var menuRightURL = this.appConstant.getMenuRightsForRoleId + roleid;
    this.commonServiceCall.getResponsePromise(menuRightURL).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.getMenuRightsForRoleId + roleid + "\n" + "Params={}", 'view')
        console.log(res);
        this.commonMethod.hideLoader();
        this.menuRights = res.result;
        this.menuRights.forEach(el => {
          el.isChecked = el.isActive == 3 ? true : false;
        });
        this.showTable = true;
        console.log(this.menuRights)
      }
      else if (res.responseCode == "202") {
        console.log(res);
        showToastMessage('You Need To Map Submenus For These Menus');
        this.commonMethod.hideLoader();
        this.menuRights = res.result;
        this.menuRights.forEach(el => {
          el.isChecked = el.isActive == 3 ? false : true;
        });
        this.showTable = true;
        console.log(this.menuRights)
      }
      else {
        this.commonMethod.hideLoader();
        this.showTable = false;
        this.errorCallBack(this.appConstant.getPSBAppMenu, res);
      }
      this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
    })
  }

  /**
   * This function is invoked whenever there is an error in the rest api
   * @param fld
   * @param res
   */
  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  /**
   * show Message if user is on same page
   */
  showMsg(menu) {
    if (menu.menuName == 'Access Rights' && this.selRole == this.commonData.roleTypeId) {
      showToastMessage("You Cannot Perform This Action")
      return false;
    }
  }

  /**
   * To save the details of menu-rights this function is invoked
   */
  saveMenuDetails() {
    this.formValidation.markFormGroupTouched(this.menuForm);
    if (this.menuForm.valid) {
      // alert("called")
      this.roleError = false;
      if (this.selRole == '') {
        this.roleError = true;
        return;
      }
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);
      let selParam = [];
      this.menuRights.forEach(e => {
        var menuDtl = {
          menuId: { id: e.menuid.toString() },
          roleid: this.selRole,
          statusId: { id: e.isChecked ? "3" : "0" },
          createdby: userDetails.user_ID
        }
        selParam.push(menuDtl);
      });

      console.log(selParam);
      this.saveRoles(selParam);
    } else {
      this.formErrors = this.formValidation.validateForm(this.menuForm, this.formErrors, false)
    }
  }

  showPopup(menu, index) {
    if (menu.isActive == 0) {
      this.menuIndex = index;
      this.menuId = menu.menuid;
      openTinyModel();
    }
  }

  closeActionModel() {
    if (this.menuRights[this.menuIndex].isChecked) {
      this.menuRights[this.menuIndex].isChecked = false;
    }
    closeTinyModel();
  }


  /**
   * This function is required to route the page to menu right details page
   * @param menu
   */
  gotoMenuDetails(menu) {
    if (!menu.isChecked) {
      showToastMessage("Please Check Access Rights To View Submenu");
    }
    else {
      console.log(menu);
      console.log('this.selRole', this.selRole);

      this.commonData.menuRightDetailValue.menuId = menu.id;
      this.router.navigateByUrl("/accessMenuRightDetails", { state: { menuId: menu.menuid, roleId: this.commonData.menuRightDetailValue.roleId } });
    }
  }



  /**
   * The functionality to save the roles
   * @param param
   */
  saveRoles(param) {
    this.reload = false;
    // var url = 'menu/saveMenuRights';
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.saveMenuRights, param).subscribe(data => {
      if (data.status) {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.saveMenuRights + "\n" + "Params=" + JSON.stringify(param), 'update')
        this.commonMethod.hideLoader();
        console.log("on saved", data.resp);
        showToastMessage("Menu Rights Has Been Updated Successfully");
        this.getAllRoles();
        this.showTable = false;
        this.reload = true;
      }
      else {
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else {
          showToastMessage("Master Update Error");
        }
      }

    })
  }

  goToSubmenuDetailsRoute() {
    this.router.navigateByUrl("/accessMenuRightDetails", { state: { menuId: this.menuId, roleId: this.commonData.menuRightDetailValue.roleId } });
  }

}
