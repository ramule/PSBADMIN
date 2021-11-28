import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CorpMenuRightsService } from './corp-menu-rights.service';
declare var showToastMessage: any;
@Component({
  selector: 'app-corp-menu-rights',
  templateUrl: './corp-menu-rights.component.html',
  styleUrls: ['./corp-menu-rights.component.css']
})
export class CorpMenuRightsComponent implements OnInit {

  private productType: any = [];
  allRoles: any = [];
  allCorporateUserType: any = [];
  corporateUserType: any = [];
  corporateMenuRight: any = [];
  showTable: boolean = false;
  productError: boolean = false;
  typeError: boolean = false;
  shoeRoles: boolean = false;

  type: any = [];


  selProduct: any;
  selType: any;
  selRoles: any
  beforeParam: any
  menuLink = "corpMenuRight"
  priviledgeDataArr: any = [];

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstant: AppConstants,
    public corpMenuService: CorpMenuRightsService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Corporate Menu Right";
    this.getProductType();
    this.getLeftMenuId();
    this.getAllCorpUserTypeDetails();
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstant.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataShareService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstant.getPriviledgeDataUrl + id + "/" + this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        console.log('viewChecked status: ', this.priviledgeDataArr.viewChecked);
        if (this.priviledgeDataArr.viewChecked) {
          // this.getCalculatorFormula();
          this.loadType();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }


  cancel() {
    this.commonMethod.cancel();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpMenuService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
    })
  }


  filterProduct() {
    return this.productType.filter(x => x.shortName == "MOBILE" || x.shortName == "DESKTOP" || x.shortName == "TAB");
  }

  selectedValue(value) {
    this.selType = value;
    this.getAllRoles(this.selType);
    this.corporateMenuRight = [];
  }

  selectedValueRoles(value) {
    this.selRoles = value
    this.corporateMenuRight = [];
    this.loadMenuList(this.selType, this.selRoles);
  }

  loadMenuList(type, role) {
    this.commonMethod.showLoader();
    var url = this.appConstant.getCorpCompanyMenuListAndMappingUrl + '/' + type + '/' + role;
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
        this.corporateMenuRight = res.result;
        console.log(this.corporateMenuRight);
        this.corporateMenuRight.forEach(el => {
          if (el.statusId == 3) {
            el.isChecked = true;
            el.value = 3
          }
          else {
            el.isChecked = false;
            el.value = 0
          }
        });
        this.showTable = true;
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.getCorpCompanyMenuListAndMappingUrl + '/' + type + '/' + role + "\n" + "Params={}", 'view')

        this.beforeParam = this.corporateMenuRight
      } else {
        this.showTable = false;
        this.corporateMenuRight = [];
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getPSBAppMenu, res);
      }

    })
  }

  loadType() {
    this.commonMethod.showLoader();
    this.type = [];
    this.commonServiceCall.getResponsePromise(this.appConstant.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);

        res.result.forEach(element => {
          if (element.statusId == 3) {
            this.type.push(element);
          }
        });
      } else {
        this.errorCallBack(this.appConstant.configMasterurl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onCheckBoxChange(val) {
    this.corporateMenuRight.forEach(e => {
      if (val.id == e.id) {
        if (val.value == 3) {
          e.isChecked = false;
          e.value = 0;
          e.statusId = 0;
        }
        else {
          e.isChecked = true;
          e.value = 3;
          e.statusId = 3;
        }
      }
    });
  }

  saveMenuDetails() {
    let selParam = [];
    console.log(this.corporateMenuRight);
    this.corporateMenuRight.forEach(e => {
      var menuDtl = {
        id: e.id,
        menuId: e.corpMenuId,
        statusId: e.statusId,
        roleid: this.selRoles,
        createdby: e.createdby,
        updatedby: e.updatedby,
        corporatecompid: e.companyId
      }
      selParam.push(menuDtl);
    });

    console.log(selParam);
    this.commonMethod.showLoader();
    this.onMenuSaved(selParam);
  }

  onMenuSaved(param) {
    this.commonServiceCall.postResponsePromise(this.appConstant.saveCorpMenuRightsUrl, param).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.getProductType();
        //this.getAllRoles();
        this.loadType();
        this.showTable = false;
        this.commonMethod.hideLoader();
        this.corporateMenuRight = [];
        this.allRoles = [];
        this.corporateUserType = [];
        this.selType = '';
        this.selRoles = '';
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.saveCorpMenuRightsUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParam), 'update')
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.saveCorpMenuRightsUrl, res);
      }

    })
  }


  //onload
  getProductType() {
    this.commonServiceCall.getResponsePromise(this.appConstant.masterListUrl).subscribe(data => {
      if (data.status) {
        console.log("roles", data.resp);
        this.productType = data.resp;
      }
      else {

      }

    })
  }

  //on load functions
  getAllCorpUserTypeDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getCorpUserTypesUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.allCorporateUserType = res.result;
        console.log('All Corp User Types array: ', this.allCorporateUserType);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getCorpUserTypesUrl, res);
      }
    });
  }

  getAllRoles(companyId) {
    this.corporateUserType = [];
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getDynamicRolesByCompId + companyId).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("roles", data.resp);
        // this.allRoles = res.result;

        var corpusertypetemparr = [];
        var newCorpusertypetemparr = [];
        var corproleTempArr = [];
        var count = 0;
        var start = false;

        for(var i=0; i<res.result.length; i++) {
          corpusertypetemparr = res.result[i].user_TYPE.split(',');

          corpusertypetemparr.forEach(element => {
            newCorpusertypetemparr.push(element);
          });

          corpusertypetemparr = [];
        }
        console.log('corp user type temp array: ', newCorpusertypetemparr);

        for (var j = 0; j < newCorpusertypetemparr.length; j++) {
          for (var k = 0; k < corproleTempArr.length; k++) {
              if ( newCorpusertypetemparr[j] == corproleTempArr[k] ) {
                  start = true;
              }
          }
          count++;
          if (count == 1 && start == false) {
            corproleTempArr.push(newCorpusertypetemparr[j]);
          }
          start = false;
          count = 0;
        }

        console.log('corp role temp array: ', corproleTempArr);


        for(var m=0; m<corproleTempArr.length; m++) {
          var objIndex = this.allCorporateUserType.findIndex((obj) => obj.user_TYPE.toLowerCase() == corproleTempArr[m].toLowerCase());
          console.log('objIndex value: ', objIndex);
          var objId = this.allCorporateUserType[objIndex].id;
          var objCorpRoleName = this.allCorporateUserType[objIndex].user_TYPE;
          var data: any = {
            description: objCorpRoleName,
            id: objId
          }
          this.corporateUserType.push(data);
        }

        console.log('Corp User Types array: ', this.corporateUserType);
      }
      else {
        this.corporateUserType = [];
        this.errorCallBack(this.appConstant.getDynamicRolesByCompId, res);
      }
      this.commonMethod.hideLoader();
    })
  }


  onMenuSelected(roleId) {

  }

}
