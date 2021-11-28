import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { AdminAdminstrationService } from './admin-adminstration.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-admin-adminstration',
  templateUrl: './admin-adminstration.component.html',
  styleUrls: ['./admin-adminstration.component.css']
})
export class AdminAdminstrationComponent implements OnInit {

  // selectedPage = 'role'

  // id = 3;
  menuLink = "administration";
  priviledgeDataArr: any = [];
  roles: any = [];
  newRolesArr: any = [];
  users: any = [];
  corporateUsers: any = [];
  userDetails: any;
  updatedUserStatusId;
  updatedRoleId;
  selUserToResetPass: any;
  selModel: any;
  selUserToDeleteUser: any;
  selRoleToDelete: any;
  userEmail: any;

  globalRoleStatusIndex: any;
  globalUserStatusIndex: any;

  roleStatusData: any = {
    id: '',
    isActive: ''
  };

  userStatusData: any = {
    user_ID: '',
    statusid: ''
  };

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private adminAdminstrationService: AdminAdminstrationService
  ) { }

  ngOnInit() {
    // $('.recent-trans').addClass('active');
    // $('.account-details').removeClass('active');

    this.commonServiceCall.pageName = "Administration";
    // this.getAllUser();
    this.getLeftMenuId();
    // this.getAllCorporateUser();
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    if(this.commonServiceCall.userCredential != null && this.commonServiceCall.userCredential != "" && this.commonServiceCall.userCredential != undefined) {
      this.userDetails = JSON.parse(this.commonServiceCall.userCredential);
    }
    else {
      this.userDetails = JSON.parse(localStorage.getItem('userCredential'));
    }
    console.log(this.userDetails.role_ID);
    this.userEmail = this.commonServiceCall.emailId;
    console.log('email: ', this.userEmail);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.adminAdminstrationService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
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
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('this.commonData.page: ', this.commonData.page);
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          if (this.commonData.page == 'role') {
            this.getAllRoles();
          }
          else {
            this.getAllUser();
          }
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }


  gotoAddRecord(page) {
    if (page == 'role') {
      this.commonData.page = 'role';
      this.router.navigateByUrl("/adminAddRole");
    }
    else if (page == 'user') {
      this.commonData.page = 'user';
      this.router.navigateByUrl("/adminAddUser");
    }
    else if (page == 'corporateUser') {
      this.router.navigateByUrl("/adminAddCorporateUser");
    }
  }

  getAllRoles() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllRolesUrl).subscribe(data => {
      var res = data.resp;
      this.destroyUserDataTable();
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllRolesUrl + "\n" + "Params={}", 'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.roles = res.result;
        // assign boolean false value first to status
        this.roles.forEach(element => {
          element.isRoleStatusActive = false;
        });

        this.roles.forEach(element => {
          var newElements = this.filterRecord(element);
          console.log(newElements);
          if (newElements) {
            this.newRolesArr.push(newElements);
          }
        });

        // assign boolean values according to status isActive or not
        for (var i = 0; i < this.roles.length; i++) {
          console.log(this.roles[i].statusId);
          if (this.roles[i].statusId == 3) {
            this.roles[i].isRoleStatusActive = true;
          }
          else {
            this.roles[i].isRoleStatusActive = false;
          }
        }

        setTimeout(function () {
          $('table.display').DataTable({
            dom: 'lfrtipB',
            scrollY: "350px",
            scrollCollapse: true,
            buttons: [
              { extend: 'excel', className: 'buttonsToHide', exportOptions: { orthogonal: 'sort' } },
              { extend: 'pdf', className: 'buttonsToHide', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: { orthogonal: 'sort' } },
              { extend: 'csv', className: 'buttonsToHide', exportOptions: { orthogonal: 'sort' } }
            ],
          });
          $('#dt-role-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
          $('.dataTables_paginate').css({ "width": "50%", "float": "right" })
          $('.dataTables_length').css({ "float": "left", "margin-top": "10px" })
          $('.dataTables_info').css("float", "left")
          $(".dataTables_filter input").focus(function () {
            $('.dataTables_filter input').attr('type', 'text');
          })
        })
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllRolesUrl, res);
      }
      this.destroyRoleDataTable();
    })
  }

  filterRecord(el) {
    if (el.id !== this.commonData.roleId) {
      return el;
    }
  }

  destroyRoleDataTable() {
    console.log('destroy datatable called...');
    $('#dt-role-sample').DataTable().clear().destroy();
  }

  openModelToChangeRoleStatus(index, item) {
    this.globalRoleStatusIndex = index;
    this.roleStatusData.id = item.id;
    this.roleStatusData.statusId = item.statusId;
    this.selModel = "roleStatusChange";
    openTinyModel();
  }

  onRoleStatusChange() {
    closeTinyModel();
    console.log('usermasterid: ', this.roleStatusData.id);
    console.log('statusid: ', this.roleStatusData.statusId);
    if (this.roleStatusData.statusId == 3) {
      this.updatedRoleId = 0
      for (var i in this.roles) {
        if (this.roles[i].id == this.roleStatusData.id) {
          console.log('role id of array: ', this.roles[i].id);
          this.roles[i].statusId = 0;
        }
      }
    }
    else {
      this.updatedRoleId = 3
      for (var i in this.roles) {
        if (this.roles[i].id == this.roleStatusData.id) {
          console.log('role id of array: ', this.roles[i].id);
          this.roles[i].statusId = 3;
        }
      }
    }
    var param = this.adminAdminstrationService.roleStatusChange(this.roleStatusData.id, this.updatedRoleId);
    this.updateRoleStatus(param);
  }

  updateRoleStatus(params) {
    console.log('request parameters: ', params);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateRolesStatus, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateRolesStatus + "\n" + "Params=" + JSON.stringify(params), 'update')
        showToastMessage(res.responseMessage);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateRolesStatus, res);
      }
    });
  }

  openModelToDeleteRole(item) {
    if (item.id == this.userDetails.role_ID) {
      showToastMessage("You Cannot Perform This Action");
      return;
    }
    this.selModel = "deleteRole"
    this.selRoleToDelete = item;
    openTinyModel();
  }

  deleteRole() {
    closeTinyModel();
    console.log('deletable item: ', this.selRoleToDelete);
    var param = this.adminAdminstrationService.deleteRoleCall(this.selRoleToDelete.id);
    this.deleteRoleDetails(param);
  }

  deleteRoleDetails(param) {
    this.commonServiceCall.postResponsePromise(this.appConstants.deleteRolesDetails, param).subscribe(data => {
      var res = data.resp;
      console.log('delete response: ', data);
      console.log('delete res: ', res);
      if (res) {
        this.commonMethod.hideLoader();
        showToastMessage('Role Deleted Successfully');
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.deleteRolesDetails + "\n" + "Params=" + JSON.stringify(param), 'delete')
        this.getAllRoles();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.deleteRolesDetails, res);
      }
    })
  }

  onUserTabClicked() {
    this.commonData.page = 'user';
    this.getAllUser();
  }

  onRoleTabClicked() {
    this.commonData.page = 'role';
    this.getAllRoles();
  }

  getAllUser() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllUsersUrl).subscribe(data => {
      var res = data.resp;
      this.destroyRoleDataTable();
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllUsersUrl + "\n" + "Params={}", 'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.users = res.result;

        // assign boolean false value first to status
        this.users.forEach(element => {
          element.isUserStatusActive = false;
        });

        // assign boolean values according to status isActive or not
        for (var i = 0; i < this.users.length; i++) {
          console.log(this.users[i].statusid);
          if (this.users[i].statusid == 3) {
            this.users[i].isUserStatusActive = true;
          }
          else {
            this.users[i].isUserStatusActive = false;
          }
        }

        setTimeout(function () {
          $('table.display').DataTable({
            dom: 'lfrtipB',
            scrollY: "350px",
            scrollCollapse: true,
            buttons: [
              { extend: 'excel', className: 'buttonsToHide', exportOptions: { orthogonal: 'sort' } },
              { extend: 'pdf', className: 'buttonsToHide', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: { orthogonal: 'sort' } },
              { extend: 'csv', className: 'buttonsToHide', exportOptions: { orthogonal: 'sort' } }
            ],
          });
          $('#dt-user-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
          $('.dataTables_paginate').css({ "width": "50%", "float": "right" })
          $('.dataTables_length').css({ "float": "left", "margin-top": "10px" })
          $('.dataTables_info').css("float", "left")
          $(".dataTables_filter input").focus(function () {
            $('.dataTables_filter input').attr('type', 'text');
          })
        })
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllUsersUrl, res);
      }
      this.destroyUserDataTable();
    })
  }

  destroyUserDataTable() {
    console.log('destroy datatable called...');
    $('#dt-user-sample').DataTable().clear().destroy();
  }

  editRole(item) {
    if (item.id == this.userDetails.role_ID) {
      showToastMessage("You Cannot Perform This Action");
      return;
    }
    this.commonData.adminEditData.roleId = item.id
    this.router.navigateByUrl("/adminEditRole", { state: { id: item.id } });
  }


  editUser(item) {
    if (item.role_ID == this.userDetails.role_ID && item.email == this.userEmail) {
      showToastMessage("You Cannot Perform This Action");
      return;
    }
    console.log(item);
    localStorage.setItem('routeUrl', this.router.url);
    this.commonData.routeUrl = this.router.url;
    this.commonData.adminEditData.userId = item.user_ID
    this.router.navigateByUrl("/adminEditUser", { state: { id: item.user_ID } });
  }

  openModelToDeleteUser(item) {
    if (item.role_ID == this.userDetails.role_ID && item.email == this.userEmail) {
      showToastMessage("You Cannot Perform This Action");
      return;
    }
    this.selModel = "deleteUser"
    this.selUserToDeleteUser = item;
    openTinyModel();
  }

  deleteUser() {
    closeTinyModel();
    console.log('deletable item: ', this.selUserToDeleteUser);
    this.commonMethod.showLoader();
    var url = this.appConstants.deleteUserUrl + this.selUserToDeleteUser.user_ID;
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.deleteUserUrl + this.selUserToDeleteUser.user_ID + "\n" + "Params={}", 'delete')
        this.getAllUser();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.deleteUserUrl, res);
      }
    })
  }


  editCorpUser(item) {
    this.commonData.adminEditData.corpUserId = item.id
    this.router.navigateByUrl("/adminEditCorporateUser");
  }


  resetPasswordCorpUser(item) {
    console.log(item);
    var param = {
      "id": item.id,
      "email": item.email,
      "custid": item.custid
    }
    var req = 'corporateUser/resetCorporatePass';
    this.commonServiceCall.postResponsePromise(req, JSON.stringify(param)).subscribe(data => {
      console.log(data);
      if (data.status) {
        showToastMessage(data.resp.responseValue);
      }
      else {

      }
    })
  }

  openModelToResetPwd(item) {
    if (item.role_ID == this.userDetails.role_ID && item.email == this.userEmail) {
      showToastMessage("You Cannot Perform This Action");
      return;
    }
    this.selModel = "passwordReset";
    this.selUserToResetPass = item;
    openTinyModel();
  }
  resetPassword() {
    closeTinyModel();
    var param = this.adminAdminstrationService.getResetPasswordParam(this.selUserToResetPass);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.adminResetPassword, param).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.deleteUserUrl, res);
      }
    })

  }

  closeActionModel() {
    closeTinyModel();
  }

  closeRoleActionModel() {
    console.log(this.globalRoleStatusIndex);

    if (this.roles[this.globalRoleStatusIndex].isRoleStatusActive == true) {
      this.roles[this.globalRoleStatusIndex].isRoleStatusActive = false;
    }
    else {
      this.roles[this.globalRoleStatusIndex].isRoleStatusActive = true;
    }
    closeTinyModel();
  }

  closeUserActionModel() {
    console.log(this.globalUserStatusIndex);

    if (this.users[this.globalUserStatusIndex].isUserStatusActive == true) {
      this.users[this.globalUserStatusIndex].isUserStatusActive = false;
    }
    else {
      this.users[this.globalUserStatusIndex].isUserStatusActive = true;
    }
    closeTinyModel();
  }

  openModelToChangeUserStatus(index, item) {
    this.globalUserStatusIndex = index;
    this.userStatusData.user_ID = item.user_ID;
    this.userStatusData.statusid = item.statusid;
    this.selModel = "userStatusChange";
    openTinyModel();
  }

  onUserStatusChange() {
    closeTinyModel();
    console.log('usermasterid: ', this.userStatusData.user_ID);
    console.log('isactive: ', this.userStatusData.statusid);
    if (this.userStatusData.statusid == 3) {
      this.updatedUserStatusId = 0
      for (var i in this.users) {
        if (this.users[i].user_ID == this.userStatusData.user_ID) {
          this.users[i].statusid = 0;
        }
      }
    }
    else {
      this.updatedUserStatusId = 3
      for (var i in this.users) {
        if (this.users[i].user_ID == this.userStatusData.user_ID) {
          this.users[i].statusid = 3;
        }
      }
    }
    var param = this.adminAdminstrationService.userStatusChange(this.userStatusData.user_ID, this.updatedUserStatusId);
    this.updateUserStatus(param);
    console.log(param);
  }

  updateUserStatus(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateUserStatusUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateUserStatusUrl + "\n" + "Params=" + JSON.stringify(params), 'update')
        showToastMessage(res.responseMessage);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateUserStatusUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

}
