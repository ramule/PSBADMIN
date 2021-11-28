import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAdministrationAddUserService } from '../admin-administration-add-user/admin-administration-add-user.service';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { CommonServiceService } from '../common-service.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MasterCustomizeMenuService } from './master-customize-menu.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-customize-menu',
  templateUrl: './master-customize-menu.component.html',
  styleUrls: ['./master-customize-menu.component.css']
})
export class MasterCustomizeMenuComponent implements OnInit {

  menuLink = "masterCustomizeMenu";
  priviledgeDataArr: any = [];
  productTypes: any = [];
  // private productType:any=[];
  allRoles:any = [];
  customizeMenu:any =[];
  showTable:boolean = false;
  productError:boolean = false;
  typeError:boolean = false;
  shoeRoles:boolean = false;
  displayImage: any;
  selModel: any;
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
    public masterCustomizeMenuService : MasterCustomizeMenuService,
    public adminAddUser: AdminAdministrationAddUserService,
  ) { }

  ngOnInit(){
    this.commonServiceCall.pageName = "Customize Menu Master";
    // this.getProductType();
    this.getAllRoles();
    this.loadType();
    this.getAppMasterList();
    this.getLeftMenuId();
  }

    /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.masterCustomizeMenuService.addAuditTrailAdaptorParams(URL,operation);
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
    return this.commonData.productTypes.filter(x => x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "UPIDESKTOP" || x.shortName == "UPIMOBILE" || x.shortName == "ALL" );
  }

  //on load functions
  getAppMasterList(){
    this.commonServiceCall.getResponsePromise(this.appConstant.masterListUrl).subscribe((data) => {
      var res = data;
      console.log('response data: ', res);
      if (res.status) {
        console.log('response data: ', res);
        this.productTypes = res.resp;
        console.log('response array: ', this.productTypes);
      } else {
        this.errorCallBack(this.appConstant.masterListUrl, res);
      }
    });
  }

  selectedValue(value,fld){
    console.log(value);
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
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    var url = this.appConstant.getPSBAppMenu+'/'+product+'/'+type;
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
       this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+this.appConstant.getPSBAppMenu+'/'+product+'/'+type+"\n"+"Params={}",'view')
       this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
        this.customizeMenu = res.result;
        this.customizeMenu.forEach(el => {
          if(el.statusId == 3){
            el.isChecked = true;
            el.value = 3
          }
          else{
            el.isChecked = false;
            el.value = 50
          }
      });
      this.showTable = true;
      } else {
        this.showTable = false;
        this.customizeMenu = [];
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getPSBAppMenu, res);
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

  viewImage(menu) {
    this.selModel = "Image"
    if(menu.menuImageString == "" || menu.menuImageString == null || menu.menuImageString == undefined) {
      showToastMessage("Image Not Available");
    }
    else {
      this.displayImage = menu.menuImageString;
      openTinyModel();
    }
  }

  closeActionModel(){
    closeTinyModel();
  }


  /*
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
  */

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
      else {
        this.errorCallBack(this.appConstant.getActiveRoles, res);
      }
    })
  }

  gotoCustomizeMasterMenuDetails(item) {
    console.log(item);
    if(item.statusname === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonData.submenuname = "masterCustomizeMenuEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/masterCustomizeMenuEdit",{ state: { id: item.id} });
    }
  }

  // viewCustomizeMasterSubMenu(menuMaster){
  //   console.log('id: ',menuMaster.id);
  //   this.commonData.masterMenuId = menuMaster.id;
  //   this.router.navigateByUrl("/masterCustomizeSubmenu");
  // }


  onMenuSelected(roleId){

  }

  gotoAddMenu(){
    this.router.navigateByUrl("/masterCustomizeMenuAdd");
  }
}
