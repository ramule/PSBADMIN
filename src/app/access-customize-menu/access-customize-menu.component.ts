import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service'
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CommonServiceService } from '../common-service.service';
import { AccessCustomizeMenuService } from './access-customize-menu.service';
import { AdminAdministrationAddUserService } from '../admin-administration-add-user/admin-administration-add-user.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var $ :any;
declare var showToastMessage: any;
@Component({
  selector: 'app-access-customize-menu',
  templateUrl: './access-customize-menu.component.html',
  styleUrls: ['./access-customize-menu.component.css']
})
export class AccessCustomizeMenuComponent implements OnInit {

  //id = 28;
  menuLink = "accessCustomizeMenu";
  priviledgeDataArr: any = [];
  productType:any=[];
  allRoles:any = [];
  customizeMenu:any =[];
  showTable:boolean = false;
  productError:boolean = false;
  typeError:boolean = false;
  shoeRoles:boolean = false;
  menuIndex: any;
  menuId: any;
  roleId: any = 0;
  type:any = [];


  selProduct:any;
  selType:any;
  selRoles:any


  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData : CommonDataShareService,
    public commonMethod : CommonMethods,
    public appConstant : AppConstants,
    private commonService : CommonServiceService,
    public adminAddUser: AdminAdministrationAddUserService,
    public customizeService : AccessCustomizeMenuService
  ) { }

  ngOnInit(){
    this.commonServiceCall.pageName = "Customize Menu Rights";
    this.getProductType();
    this.getAllRoles();
    this.loadType();
    this.getLeftMenuId();
  }

    /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.customizeService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
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
    var url = this.appConstant.getPriviledgeDataUrl + id+"/"+this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(!this.priviledgeDataArr.viewChecked) {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }


  cancel(){
    this.commonMethod.cancel();
  }


  filterProduct()
  {
    return this.productType.filter(x => x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB" );
  }

  selectedValue(value,fld){
    if(fld == 'product'){
      this.selProduct = value;
    }
    else if(fld == 'type'){
      this.selType = value;
    }
    else if(fld == 'roles'){
      this.selRoles = value;
    }

    if((this.selProduct != undefined && this.selProduct != '') && (this.selType != undefined && this.selType != '')){
      if(this.selType == 0){
        this.loadMenuList(this.selProduct,this.selType);
      }
      else{
        this.customizeMenu =[];
        if(this.selRoles != undefined && this.selRoles != ''){
          this.loadMenuList(this.selProduct,this.selRoles);
        }
      }
    }
  }

  loadMenuList(product,type){
    this.commonMethod.destroyDataTable();
    this.commonMethod.showLoader();
    var url = this.appConstant.getCustomizationMenuByRoleIdAndAppIdUrl + this.roleId + '/' + product;
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200" || res.responseCode == "202") {
       this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+this.appConstant.getCustomizeMenuRightsByBankTypeAndAppId+'/'+product+'/'+type+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        this.customizeMenu = res.result;
        console.log(this.customizeMenu);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.customizeMenu.forEach(el => {
          if(el.isActive == 3){
            el.isChecked = true;
            el.value = 3
          }
          else{
            el.isChecked = false;
            el.value = 0
          }
      });
      this.showTable = true;
      }
      else if (res.responseCode == "204") {
        console.log(res);
        showToastMessage('You Need To Map Submenus For These Menus');
        this.commonMethod.hideLoader();
        this.customizeMenu= res.result;
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.customizeMenu.forEach(el => {
          if(el.isActive == 3){
            el.isChecked = false;
            el.value = 0
          }
          else{
            el.isChecked = true;
            el.value = 3
          }
        });
        this.showTable = true;
        console.log(this.customizeMenu)
      }
      else {
        this.showTable = false;
        this.customizeMenu = [];
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getCustomizationMenuByRoleIdAndAppIdUrl, res);
      }
    })
  }

  loadType(){
    this.type = [];
    this.type = [
      {
        id : "0",
        displayName: "Retail"
      },
      {
        id : "1",
        displayName: "Corporate"
      }
    ];
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  showPopup(menu, index){
    if(menu.isActive == 0){
      this.menuIndex = index;
      this.menuId = menu.custMenuId;
      openTinyModel();
    }
  }

  saveMenuDetails(){
    let selParam=[];
    console.log(this.customizeMenu);
    var userDetails = JSON.parse(this.commonServiceCall.userCredential);
    this.customizeMenu.forEach(e => {
      if(e.isChecked) {
        var menuDtl = {
          customizeMenuId: e.custMenuId.toString(),
          statusId: e.isChecked ? 3 : 0,
          appId: this.selProduct
        }
        selParam.push(menuDtl);
      }
    });

    console.log(selParam);
    this.commonMethod.showLoader();
    this.onMenuSaved(selParam);
  }

  onMenuSaved(param){
    this.commonServiceCall.postResponsePromise(this.appConstant.saveCustomizeMenuRights,param).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+this.appConstant.saveCustomizeMenuRights+"\n"+"Params="+JSON.stringify(param),'add')
        showToastMessage(res.responseMessage);
        this.getProductType();
        this.getAllRoles();
        this.loadType();
        this.showTable = false;
        this.commonMethod.hideLoader();
        this.customizeMenu = [];
        this.selProduct = '';
        this.selType = '';
        this.selRoles = '';
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getPSBAppMenu, res);
      }

    })
  }


  //onload
  getProductType(){
    this.commonServiceCall.getResponsePromise(this.appConstant.masterListUrl).subscribe(data => {
      if(data.status){
        console.log("roles",data.resp);
        this.productType = data.resp;
      }
      else{

      }

    })
  }

  getAllRoles(){
    this.commonMethod.showLoader();
    var param = this.adminAddUser.getRoleTypeIdCall();
    console.log('role type id param: ', param);
    this.commonServiceCall.postResponsePromise(this.appConstant.getActiveRoles, param).subscribe(data => {
      var res = data.resp;
      if(data.status){
        this.commonMethod.hideLoader();
        console.log("roles",data.resp);
        this.allRoles = res.result;
      }
      else{
        this.errorCallBack(this.appConstant.getActiveRoles, res);
      }

    })
  }

  closeActionModel(){
    if(this.customizeMenu[this.menuIndex].isChecked){
      this.customizeMenu[this.menuIndex].isChecked = false;
    }
    closeTinyModel();
  }

  goToSubmenuDetailsRoute(){
    this.commonData.customizeMenuRightDetailValue.menuId = this.menuId;
    this.commonData.customizeMenuRightDetailValue.productType = this.selType;
    this.commonData.customizeMenuRightDetailValue.appId = this.selProduct;
    this.router.navigateByUrl("/accessCustomizeMenuDetails", { state: { menuId: this.menuId, productType: this.selType, appId: this.selProduct, roleId: this.selRoles ? this.selRoles : this.selType } });
  }

  gotoCustomizeMenuDetails(menu){
    console.log(menu);
    if(!menu.isChecked) {
      showToastMessage("Please Check Access Rights To View Submenu");
    }
    else {
      console.log(menu);
      // console.log('this.selRole',this.selRole);
      this.commonData.customizeMenuRightDetailValue.menuId = menu.custMenuId;
      this.commonData.customizeMenuRightDetailValue.productType = this.selType;
      this.commonData.customizeMenuRightDetailValue.appId = this.selProduct;
      this.router.navigateByUrl("/accessCustomizeMenuDetails", { state: { menuId: menu.custMenuId, productType: this.selType, appId: this.selProduct, roleId: this.selRoles ? this.selRoles : this.selType } });
    }
  }

}
