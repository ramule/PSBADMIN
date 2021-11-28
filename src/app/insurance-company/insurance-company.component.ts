import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { InsuranceCompanyService } from './insurance-company.service';


declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-insurance-company',
  templateUrl: './insurance-company.component.html',
  styleUrls: ['./insurance-company.component.css']
})
export class InsuranceCompanyComponent implements OnInit {

  menuLink = "insuranceCompany";
  priviledgeDataArr: any = [];
  masterCompanyArr: any = [];
  selModel: any;
  displayImage: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private companyService: InsuranceCompanyService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Insurance Company";
    this.getLeftMenuId();
  }

   /* Insert tracking for user activities*/
   addAuditTrailAdaptor(URL, operation) {
    var param = this.companyService.addAuditTrailAdaptorParams(
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
          this.getCompanyMasterDetails();
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
    if (item.logo == null || item.logo == undefined || item.logo == "") {
      showToastMessage('Logo Image Not Available');
    }
    else {
      this.displayImage = item.logo;
      openTinyModel();
    }
  }

  closeActionModel() {
    closeTinyModel();
  }

  getCompanyMasterDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getAllComapnyMasterData)
      .subscribe((data) => {
        var res = data.resp;
        console.log("get Company Master data: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstant.apiURL.serviceURL_ESB +
              this.appConstant.getAllComapnyMasterData +
              "\n" +
              "Params={}",
            "view"
          );
          console.log(res);
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.masterCompanyArr = res.result;
          console.log("Company Master array: ", this.masterCompanyArr);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.getAllComapnyMasterData, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  gotoAddCompanyMaster() {
    this.commonDataShareService.submenuname = "insuranceCompanyAdd";
    this.router.navigateByUrl("/insuranceCompanyAdd");
  }

  gotoCompanyMasterEdit(item) {
    console.log(item);
    if (
      item.statusname === "ADMIN APPROVER PENDING" &&
      this.commonDataShareService.roleType ==
        this.commonDataShareService.makerRole
    ) {
      showToastMessage("You Cannot Perform This Action");
    } else {
      this.commonDataShareService.submenuname = "insuranceCompanyEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/insuranceCompanyEdit", {
        state: { id: item.id },
      });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


}
