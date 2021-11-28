import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MasterCountryService } from './master-country.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-country',
  templateUrl: './master-country.component.html',
  styleUrls: ['./master-country.component.css']
})
export class MasterCountryComponent implements OnInit {

  menuLink = "masterCountry";
  priviledgeDataArr: any = [];
  masterCountryArr: any = [];
  selModel: any;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService : CommonDataShareService,
    public commonMethod : CommonMethods,
    public appConstant : AppConstants,
    private masterCountryService: MasterCountryService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Country Master";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = this.masterCountryService.addAuditTrailAdaptorParams(URL,operation);
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
        this.commonDataShareService.submenuId = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstant.getPriviledgeDataUrl + id+"/"+this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getCountryMasterDetails();
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  cancel(){
    this.commonMethod.cancel();
  }

  getCountryMasterDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getAllCountryDetailsUrl).subscribe(data => {
      var res = data.resp;
      console.log('get country master data: ', res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+this.appConstant.getAllCountryDetailsUrl+"\n"+"Params={}",'view')
        console.log(res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.masterCountryArr = res.result;
        console.log('Country Master array: ', this.masterCountryArr);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getAllCountryDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  gotoAddCountryMaster() {
    this.commonDataShareService.submenuname = "masterCountryAdd";
    this.router.navigateByUrl("/masterCountryAdd");
  }

  gotoCountryMasterEdit(item) {
    console.log(item);
    if(item.statusname === 'ADMIN APPROVER PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.submenuname = "masterCountryEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/masterCountryEdit",{ state: { id: item.id} });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
