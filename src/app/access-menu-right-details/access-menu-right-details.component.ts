import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Location } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { browserRefresh } from '../app.component';
declare var $: any;
declare var showToastMessage: any;
@Component({
  selector: 'app-access-menu-right-details',
  templateUrl: './access-menu-right-details.component.html',
  styleUrls: ['./access-menu-right-details.component.css']
})
export class AccessMenuRightDetailsComponent implements OnInit {

  menuRightList: any = [];
  menuRightDetailValue: any;
  showErrorMsg = false;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    private location: Location,
    public appConstant: AppConstants,
    public commonMethod: CommonMethods
  ) { }

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.router.navigateByUrl('/accessMenuRight');
      return;
    }

    this.commonServiceCall.pageName = "Sub Menu Rights";
    this.menuRightDetailValue = this.location.getState();
    this.getSubMenu();
  }

  /**
   * Get submenu Lists by menuId and roleid
   */
  getSubMenu() {
    var subMenuUrl = this.appConstant.getSubMenuRightsForMenuId + "/" + this.menuRightDetailValue.menuId + "/" + this.menuRightDetailValue.roleId;
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(subMenuUrl).subscribe(data => {
      var res = data.resp;
      if (data.resp.responseCode == "200") {
        this.commonMethod.hideLoader();

        this.menuRightList = data.resp.result;
        this.menuRightList.forEach(el => {
          el.isChecked = el.isActive == "3" ? true : false;
          el.value = 0;
        });
      }
      else if (res.responseCode == "202") {
        console.log(res);
        this.commonMethod.hideLoader();
        if(res.result) {
          this.menuRightList = res.result;
          this.menuRightList.forEach(el => {
            el.isChecked = el.isActive == "3" ? true : false;
            el.value = 0;
          });
        }
      }
      else {
        this.commonMethod.hideLoader();
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

  getMenuFromId(menuId, roleId) {
    var url = 'menu/getSubMenuRightsForMenuId/' + menuId + '/' + roleId
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      if (data.status) {
        console.log("menu", data.resp);
        let menuData = data.resp
        if (menuData != undefined && menuData.length != -1) {
          menuData.forEach(elm => {
            elm.menuId.id
            this.menuRightList.forEach(el => {
              if (el.id === elm.menuId.id) {
                el.isChecked = true;
                el.value = elm.menuId.status;
              }
            });
          });
        }
      }
      else {

      }

    })
  }

  /**
   * This function is used to save the submenu using api call
   * @param param
   */
  saveSubMenu(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.saveSubMenuRights, param).subscribe(data => {
      this.commonMethod.hideLoader();
      if (data.resp.responseCode == "200") {
        console.log("on saved", data.resp);
        showToastMessage("Data Has Been Updated Successfully");
        this.router.navigateByUrl("/accessMenuRight");
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.saveSubMenuRights, data.resp);
      }

    })
  }

  /**
   * This function is used to setDetails & invoke the save function
   */
  setDetails() {
    if (this.isAllUnChecked()) {
      this.showErrorMsg = true;

    } else {
      this.showErrorMsg = false;
      let selParam = [];
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);
      this.menuRightList.forEach(e => {
        if (e.isChecked) {
          var menuDtl = {
            submenuId: { id: e.submenuId.toString() },
            menuId: { id: this.menuRightDetailValue.menuId.toString() },
            statusId: { id: e.isChecked ? "3" : "0" },
            createdby: userDetails.user_ID.toString(),
            roleid: this.menuRightDetailValue.roleId
          }
          selParam.push(menuDtl);
        }
      });
      console.log(selParam);
      this.saveSubMenu(selParam);
    }

  }

  isAllUnChecked() {
    return this.menuRightList.every(v => v.isChecked === false);
  }

  showMsg(menu) {
    if (menu.submenuName == 'Menu Rights') {
      showToastMessage("You Cannot Perform This Action")
      return false;
    }
  }
  /**
   * Cancels menu details
   */
  cancelMenuDetails() {
    this.router.navigateByUrl("/accessMenuRight");
  }


}
