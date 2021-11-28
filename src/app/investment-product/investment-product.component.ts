import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { InvestmentProductService } from './investment-product.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-investment-product',
  templateUrl: './investment-product.component.html',
  styleUrls: ['./investment-product.component.css']
})
export class InvestmentProductComponent implements OnInit {

  menuLink = "investmentProduct";
  priviledgeDataArr: any = [];
  invProductArr: any = [];
  selModel: any;
  displayImage: any;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService : CommonDataShareService,
    public commonMethod : CommonMethods,
    public appConstant : AppConstants,
    private investmentProductService: InvestmentProductService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Investment Product";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = this.investmentProductService.addAuditTrailAdaptorParams(URL,operation);
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
        // this.commonDataShareService.submenuname = res.result[0].menuLink;
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
          this.getInvestmentProducts();
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  cancel(){
    this.commonMethod.cancel();
  }

  getInvestmentProducts() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getInvestmentProductUrl).subscribe(data => {
      var res = data.resp;
      console.log('get inv prd data: ', res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+this.appConstant.getInvestmentProductUrl+"\n"+"Params={}",'view')
        console.log(res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.invProductArr = res.result;
        console.log('Investment product array: ', this.invProductArr);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getInvestmentProductUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  viewImage(item) {
    this.selModel = "Image"
    if(item.logo == "" || item.logo == null || item.logo == undefined) {
      showToastMessage("Image Not Available");
    }
    else {
      this.displayImage = item.logo;
      openTinyModel();
    }
  }

  closeActionModel(){
    closeTinyModel();
  }

  gotoAddInvProduct() {
    this.commonDataShareService.submenuname = "investmentProductAdd";
    this.router.navigateByUrl("/investmentProductAdd");
  }

  gotoInvestmentProductEdit(item) {
    console.log(item);
    if(item.statusname === 'ADMIN APPROVER PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.submenuname = "investmentProductEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/investmentProductEdit",{ state: { id: item.id} });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
