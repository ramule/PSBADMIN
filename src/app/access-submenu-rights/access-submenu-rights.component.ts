import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { AdminAdministrationAddUserService } from '../admin-administration-add-user/admin-administration-add-user.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-access-submenu-rights',
  templateUrl: './access-submenu-rights.component.html',
  styleUrls: ['./access-submenu-rights.component.css']
})
export class AccessSubmenuRightsComponent implements OnInit {

  beforeParams :any = []
  CreateCheckBox: boolean = false;
  UpdateCheckBox: boolean = false;
  roles: any = [];
  menuMaster: any = [];
  finalSidemenuArr: any = [];

  selRole = '';
  showTable: boolean = false;
  roleError: boolean = false;
  userDetails: any;
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private commonDataService: CommonDataShareService,
    public adminAddUser: AdminAdministrationAddUserService,
  ) { }

  ngOnInit() {
    this.commonServiceCall.pageName = "Submenu Rights";
    this.getMenuDetailsAccess();
    this.getAllRoles();
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = {
          "ChannelName": "DESKTOP",
          "channelRequest": URL,
          "eventName":'Submenu Rights',
          "category":"Access Rights",
          "action":operation,
          "properties":URL,
          "IP":this.commonDataService.user_IP,
          "X-FORWARDEDIP":this.commonDataService.user_IP,
          "Lat":this.commonDataService.user_lat,
          "Lon":this.commonDataService.user_lon,
          "Browser":this.commonMethod.getBrowserName(),
          "Device":"",
          "OS":this.commonMethod.getOSName(),
          "CHANNELID":"4",
          "CREATEDBY":this.commonDataService.user_ID,
          "CREATEDBYNAME":this.commonDataService.user_Name,
           "UPDATEDBY":this.commonDataService.user_ID,
          "UPDATEDBYNAME":this.commonDataService.user_Name,
          "authorization":"0"
        }
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
        })
    }



  cancel() {
    this.commonMethod.cancel();
  }

  onRoleChange(value) {
    this.selRole = value
    if (this.selRole == '') {
      this.showTable = false;
      return;
    }
    this.menuMaster.forEach(el => {
      el.isViewChecked = false;
      el.isCreateChecked = false;
      el.isUpdateChecked = false;
      el.isReviewChecked = false;
      el.isApproveChecked = false;
      el.isDeleteChecked = false;
      el.isRejectChecked = false;

      el.viewValue = 0;
      el.createValue = 0;
      el.updateValue = 0;
      el.reviewValue = 0;
      el.approveValue = 0;
      el.deleteValue = 0;
      el.rejectValue = 0;
    });
    // this.showTable = true;
    this.onRolesSelected(value);
  }

  select(type) {
    console.log(type);
    switch (type) {
      case 'view':
        if ($("#viewCheckBox").is(":checked")) {
          this.menuMaster.map(v => v.isViewChecked = true);
        } else {
          this.menuMaster.map(v => v.isViewChecked = false);
        }
        break;

      case 'create':
        if ($("#createCheckBox").is(":checked")) {
          this.menuMaster.map(v => v.isCreateChecked = true);
        } else {
          this.menuMaster.map(v => v.isCreateChecked = false);
        }
        break;

      case 'update':
        if ($("#updateCheckBox").is(":checked")) {
          this.menuMaster.map(v => v.isUpdateChecked = true);
        } else {
          this.menuMaster.map(v => v.isUpdateChecked = false);
        }
        break;


      case 'review':
        if ($("#reviewCheckBox").is(":checked")) {
          this.menuMaster.map(v => v.isReviewChecked = true);
        } else {
          this.menuMaster.map(v => v.isReviewChecked = false);
        }
        break;



      case 'approve':
        if ($("#approveCheckBox").is(":checked")) {
          this.menuMaster.map(v => v.isApproveChecked = true);
        } else {
          this.menuMaster.map(v => v.isApproveChecked = false);
        }
        break;


      case 'delete':
        if ($("#deleteCheckBox").is(":checked")) {
          this.menuMaster.map(v => v.isDeleteChecked = true);
        } else {
          this.menuMaster.map(v => v.isDeleteChecked = false);
        }
        break;

        case 'reject':
        if ($("#rejectCheckBox").is(":checked")) {
          this.menuMaster.map(v => v.isRejectChecked = true);
        } else {
          this.menuMaster.map(v => v.isRejectChecked = false);
        }
        break;

      default:
        break;
    }
  }

  saveMenuDetails() {
    this.roleError = false;
    if (this.selRole == '') {
      this.roleError = true;
      return;
    }

    console.log("inside");

    let selParam = [];
    let date = new Date();
    this.menuMaster.forEach(e => {
      var menuDtl = {}
      if (e.isViewChecked) {
        menuDtl = {
          createdOn: date,
          createdBy: this.commonDataService.user_ID,
          statusId: 3,
          menuId: e.id,
          privilegeId: 1,
          roleId: this.selRole
        }
        selParam.push(menuDtl);
      }
      if (e.isCreateChecked) {
        menuDtl = {
          createdOn: date,
          createdBy: this.commonDataService.user_ID,
          statusId: 3,
          menuId: e.id,
          privilegeId: 2,
          roleId: this.selRole
        }
        selParam.push(menuDtl);
      }
      if (e.isUpdateChecked) {
        menuDtl = {
          createdOn: date,
          createdBy: this.commonDataService.user_ID,
          statusId: 3,
          menuId: e.id,
          privilegeId: 3,
          roleId: this.selRole
        }
        selParam.push(menuDtl);
      }
      if (e.isReviewChecked) {
        menuDtl = {
          createdOn: date,
          createdBy: this.commonDataService.user_ID,
          statusId: 3,
          menuId: e.id,
          privilegeId: 4,
          roleId: this.selRole
        }
        selParam.push(menuDtl);
      }
      if (e.isApproveChecked) {
        menuDtl = {
          createdOn: date,
          createdBy: this.commonDataService.user_ID,
          statusId: 3,
          menuId: e.id,
          privilegeId: 5,
          roleId: this.selRole
        }
        selParam.push(menuDtl);
      }
      if (e.isDeleteChecked) {
        menuDtl = {
          createdOn: date,
          createdBy: this.commonDataService.user_ID,
          statusId: 3,
          menuId: e.id,
          privilegeId: 6,
          roleId: this.selRole
        }
        selParam.push(menuDtl);
      }
      if (e.isRejectChecked) {
        menuDtl = {
          createdOn: date,
          createdBy: this.commonDataService.user_ID,
          statusId: 3,
          menuId: e.id,
          privilegeId: 4,
          roleId: this.selRole
        }
        selParam.push(menuDtl);
      }
    });

    console.log(selParam);
    this.onRolesSaved(selParam);
  }


  getMenuDetailsAccess() {
    this.commonServiceCall.getResponsePromise(this.appConstant.getMenuDetailsAccessUrl).subscribe(data => {
      $('#dt-sample').DataTable().clear().destroy();
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("getMenuDetailsAccess", data.resp);
        this.menuMaster = res.result;
        console.log('Menu Master Array: ', this.menuMaster);
        this.menuMaster.forEach(el => {
          el.isViewChecked = false;
          el.isCreateChecked = false;
          el.isUpdateChecked = false;
          el.isReviewChecked = false;
          el.isApproveChecked = false;
          el.isDeleteChecked = false;
          el.isRejectChecked = false;

          el.viewValue = 0;
          el.createValue = 0;
          el.updateValue = 0;
          el.reviewValue = 0;
          el.approveValue = 0;
          el.deleteValue = 0;
          el.rejectValue = 0;
        });
      }
       else {
        this.commonMethod.hideLoader();
        this.showTable = false;
        this.errorCallBack(this.appConstant.getPSBAppMenu, res);
      }
    })
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
        this.roles = res.result;
      }
      else {
        this.errorCallBack(this.appConstant.getActiveRoles, res);
      }
    })
  }


  onRolesSelected(roleId) {
    this.showTable = false;
    this.finalSidemenuArr = [];
    var tempArr = [];
    var tempEl:Boolean;
    $("#viewCheckBox"). prop("checked", false);
    $("#createCheckBox"). prop("checked", false);
    $("#updateCheckBox"). prop("checked", false);
    $("#reviewCheckBox"). prop("checked", false);
    $("#approveCheckBox"). prop("checked", false);
    $("#deleteCheckBox"). prop("checked", false);
    $("#rejectCheckBox"). prop("checked", false);

    this.commonMethod.showLoader();
    var req = 'menu/getAccessRightsForRoleId/' + roleId;
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {

      this.commonMethod.destroyDataTable();
      var res = data.resp;
      if (res.responseCode == "200") {
       this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+'menu/getAccessRightsForRoleId/' + roleId+"\n"+"Params={}",'view')
        console.log("getAccessRightsForRoleId", res.result);
        let menuData = res.result;
        this.beforeParams = res.result;

        if (menuData != undefined && menuData.length != -1) {
          menuData.forEach(elm => {
            this.menuMaster.forEach(el => {
              if (el.id === elm.menuId) {
                switch (elm.privilegeId) {
                  case 1:
                    el.isViewChecked = true;
                    el.viewValue = elm.privilegeId;
                    break;
                  case 2:
                    el.isCreateChecked = true;
                    el.createValue = elm.privilegeId;
                    break;
                  case 3:
                    el.isUpdateChecked = true;
                    el.updateValue = elm.privilegeId;
                    break;
                  case 4:
                    el.isReviewChecked = true;
                    el.reviewValue = elm.privilegeId;
                    break;
                  case 5:
                    el.isApproveChecked = true;
                    el.approveValue = elm.privilegeId;
                    break;
                  case 6:
                    el.isDeleteChecked = true;
                    el.deleteValue = elm.privilegeId;
                    break;
                  case 7:
                    el.isRejectChecked = true;
                    el.rejectValue = elm.privilegeId;
                    break;
                }
              }
            });
          });

          var req = 'menu/findAllLeftMenu/' + roleId;
          this.commonServiceCall.getResponsePromise(req).subscribe((data) => {
            console.log('left menu data: ', data);
            if (data.status) {
              this.commonMethod.hideLoader();
              let sidemenudata = data.resp.result;
              console.log(sidemenudata)
              for(var i = 0 ;i<sidemenudata.length;i++)
              {
                var lengthSubMenu = sidemenudata[i].subMenuList.length
                console.log('length:', lengthSubMenu);
                for (var j = 0 ; j<lengthSubMenu ;j++)
                {
                   tempArr.push(sidemenudata[i].subMenuList[j]);
                }
              }
              console.log(tempArr);
              console.log(this.menuMaster);
              this.menuMaster.forEach(menuMasteEl => {
               tempEl = tempArr.some(x => x.id == menuMasteEl.id);
               if(tempEl) {
                 this.finalSidemenuArr.push(menuMasteEl);
               }
             });
             console.log('final submenu array: ',this.finalSidemenuArr);
             if(this.finalSidemenuArr) {
              this.showTable = true;
              this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
             }
            }
          })
        }
      }
      else if (res.responseCode == "202")  {
        /* This condition is to handle worst case scenario
        where even if mapping of role and priviledge ids
        will be deleted we can see all submenus with status active here.
        The page will not be blank for that particular role */
        this.getAllSubMenus();
      }
      else {
        this.commonMethod.hideLoader();
        this.showTable = false;
        this.errorCallBack(this.appConstant.getPSBAppMenu, res);
      }
    })
  }

  getAllSubMenus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getAllSubMenuListUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();

        console.log("getAccessRightsForRoleId", res.result);
        let menuData = res.result;
        if (menuData != undefined && menuData.length != -1) {
          menuData.forEach(elm => {
            this.menuMaster.forEach(el => {
              if (el.id === elm.menuId) {
                switch (elm.privilegeId) {
                  case 1:
                    el.isViewChecked = true;
                    el.viewValue = elm.privilegeId;
                    break;
                  case 2:
                    el.isCreateChecked = true;
                    el.createValue = elm.privilegeId;
                    break;
                  case 3:
                    el.isUpdateChecked = true;
                    el.updateValue = elm.privilegeId;
                    break;
                  case 4:
                    el.isReviewChecked = true;
                    el.reviewValue = elm.privilegeId;
                    break;
                  case 5:
                    el.isApproveChecked = true;
                    el.approveValue = elm.privilegeId;
                    break;
                  case 6:
                    el.isDeleteChecked = true;
                    el.deleteValue = elm.privilegeId;
                    break;
                  case 7:
                    el.isRejectChecked = true;
                    el.rejectValue = elm.privilegeId;
                    break;
                }
              }
            });
          });
        }
        this.showTable = true;
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getAllSubMenuListUrl, res);
      }
    });
  }

  /* This function indicates that this action is unavailable on the respective page */
  onDisabledCheckboxClicked() {
    showToastMessage('This Action Is Not Available On Page');
  }


  /**
   * This function is invoked whenever there is an error in the rest api
   * @param fld
   * @param res
   */
  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onRolesSaved(param) {
    this.commonMethod.showLoader();
    var req = 'menu/saveAccessRights';
    this.commonServiceCall.postResponsePromise(req, param).subscribe(data => {
      if (data.status) {
        this.commonMethod.hideLoader();
        console.log(data);
        //this.activityLog = data.resp;
        showToastMessage("Master Has Been Updated Successfully");
        this.getAllRoles();
        this.getMenuDetailsAccess();
        this.showTable = false;
         this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+req+"\n"+"Params="+JSON.stringify(param),'update')
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

}
