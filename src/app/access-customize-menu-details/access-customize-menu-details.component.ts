import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { browserRefresh } from '../app.component';
declare var $: any;
declare var showToastMessage: any;
@Component({
  selector: 'app-access-customize-menu-details',
  templateUrl: './access-customize-menu-details.component.html',
  styleUrls: ['./access-customize-menu-details.component.css']
})
export class AccessCustomizeMenuDetailsComponent implements OnInit {

  menuRightList: any = [];
  menuRightDetailValue: any;
  mainMenuName: any = "";
  mainMenuId: any = "";
  appId: any = "";
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
      this.router.navigateByUrl('/accessCustomizeMenu');
      return;
    }

    this.commonServiceCall.pageName = "Customize Sub Menu Rights";
    this.mainMenuName = "";
    this.appId = "";
    this.mainMenuId = "";
    this.menuRightDetailValue = this.location.getState();
    console.log(this.menuRightDetailValue);
    console.log(this.commonData.customizeMenuRightDetailValue);
    this.getSubMenu(this.commonData.customizeMenuRightDetailValue);
  }

  /**
   * Get submenu Lists by menuId and roleid
   */
  getSubMenu(menudata) {
    var subMenuUrl = this.appConstant.getCustomizationSubMenuByMenuIdUrl + menudata.menuId + '/' + menudata.appId;
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(subMenuUrl).subscribe(data => {
      var res = data.resp;
      if (data.resp.responseCode == "200") {
        this.commonMethod.hideLoader();

        this.menuRightList = data.resp.result;
        console.log(this.menuRightList);
        this.menuRightList.forEach(el => {
          el.isChecked = el.isActive == "3" ? true : false;
          el.value = 0;
        });

      } else if (res.responseCode == "204") {
        console.log(res);
        this.commonMethod.hideLoader();
        this.menuRightList = [];
        this.mainMenuName = res.result[0].menuName;
        this.mainMenuId = res.result[0].custMenuId;
        this.appId = res.result[0].appId;
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getCustomizationSubMenuByMenuIdUrl, res);
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
   * This function is used to save the submenu using api call
   * @param param
   */
  saveSubMenu(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.saveCustomizationMenuSubMenuMappingUrl, param).subscribe(data => {
      this.commonMethod.hideLoader();
      if (data.resp.responseCode == "200") {
        console.log("on saved", data.resp);
        showToastMessage(data.resp.responseMessage);
        this.router.navigateByUrl("/accessCustomizeMenu");
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.saveCustomizationMenuSubMenuMappingUrl, data.resp);
      }

    })
  }

  /**
   * This function is used to setDetails & invoke the save function
   */
  setDetails() {
    if (this.isAllUnChecked()) {
      this.showErrorMsg = true;
      showToastMessage('Please select at least one submenu');
    } else {
      this.showErrorMsg = false;
      let selParam = [];
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);
      this.menuRightList.forEach(e => {
        var menuDtl = {
          customizeSubmenuId: e.custSubmenuId.toString(),
          isActive: e.isChecked ? 3 : 0,
          appId: this.commonData.customizeMenuRightDetailValue.appId,
        }
        selParam.push(menuDtl);
      });
      console.log(selParam);
      this.saveSubMenu(selParam);
    }

  }

  gotoAddAccessCustomizeSubmenu() {
    if (this.mainMenuId == "" && this.appId == "" && this.mainMenuName == "") {
      if (this.menuRightList[0]) {
        this.mainMenuName = this.menuRightList[0].menuName;
        this.mainMenuId = this.menuRightList[0].custMenuId;
        this.appId = this.menuRightList[0].appId;
      }
    }
    this.router.navigateByUrl('/accessCustomizeMenuAdd', { state: { menuName: this.mainMenuName, menuId: this.mainMenuId, appId: this.appId } });
  }

  isAllUnChecked() {
    return this.menuRightList.every(v => v.isChecked === false);
  }

  showMsg(menu) {
    if (menu.submenuName == 'Menu Rights' && menu.submenuId == 200) {
      showToastMessage("You Cannot Perform This Action")
      return false;
    }
  }
  /**
   * Cancels menu details
   */
  cancelMenuDetails() {
    this.router.navigateByUrl("/accessCustomizeMenu");
  }

}
