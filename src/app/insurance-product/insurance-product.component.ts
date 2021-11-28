import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { InsuranceProductService } from './insurance-product.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-insurance-product',
  templateUrl: './insurance-product.component.html',
  styleUrls: ['./insurance-product.component.css']
})
export class InsuranceProductComponent implements OnInit {

  menuLink = "insuranceProduct";
  selModel: any;
  displayImage: any;
  priviledgeDataArr: any = [];
  insuranceProductArr: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private insuranceProductAddService: InsuranceProductService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Insurance Product";
    this.getLeftMenuId();
  }

   /* Insert tracking for user activities*/
   addAuditTrailAdaptor(URL, operation) {
    var param = this.insuranceProductAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstant.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        id = res.result[0].id;
        this.commonDataShareService.submenuId = res.result[0].id;
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  getPriviledgeData(id) {
    var url =
      this.appConstant.getPriviledgeDataUrl +
      id +
      "/" +
      this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getProductMasterDetails();
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  cancel() {
    this.commonMethod.cancel();
  }

  getImage(item) {
    this.selModel = "Image"
    if (item.productImg == null || item.productImg == undefined || item.productImg == "") {
      showToastMessage('Product Image Not Available');
    }
    else {
      this.displayImage = item.productImg;
      openTinyModel();
    }
  }

  closeActionModel() {
    closeTinyModel();
  }

  getProductMasterDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getAllProductMasterDataUrl)
      .subscribe((data) => {
        var res = data.resp;
        console.log("get state master data: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstant.apiURL.serviceURL_ESB +
              this.appConstant.getAllProductMasterDataUrl +
              "\n" +
              "Params={}",
            "view"
          );
          console.log(res);
          this.commonMethod.setDataTable(this.commonServiceCall.pageName);
          this.insuranceProductArr = res.result;
          console.log("Product Master array: ", this.insuranceProductArr);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.getAllProductMasterDataUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  gotoProductMasterAdd() {
    this.commonDataShareService.submenuname = "insuranceProductAdd";
    this.router.navigateByUrl("/insuranceProductAdd");
  }

  gotoProductMasterEdit(item) {
    console.log(item);
    if (
      item.statusname === "ADMIN APPROVER PENDING" &&
      this.commonDataShareService.roleType ==
        this.commonDataShareService.makerRole
    ) {
      showToastMessage("You Cannot Perform This Action");
    } else {
      this.commonDataShareService.submenuname = "insuranceProductEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/insuranceProductEdit", {
        state: { id: item.id },
      });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
