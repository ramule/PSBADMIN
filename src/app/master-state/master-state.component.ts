import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { MasterStateService } from "./master-state.service";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-master-state",
  templateUrl: "./master-state.component.html",
  styleUrls: ["./master-state.component.css"],
})
export class MasterStateComponent implements OnInit {
  menuLink = "masterState";
  priviledgeDataArr: any = [];
  masterStatesArr: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private masterStateService: MasterStateService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "State Master";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterStateService.addAuditTrailAdaptorParams(
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
          this.getCountryMasterDetails();
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  cancel() {
    this.commonMethod.cancel();
  }

  getCountryMasterDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getAllStateDetailsUrl)
      .subscribe((data) => {
        var res = data.resp;
        console.log("get state master data: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstant.apiURL.serviceURL_ESB +
              this.appConstant.getAllStateDetailsUrl +
              "\n" +
              "Params={}",
            "view"
          );
          console.log(res);
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.masterStatesArr = res.result;
          console.log("State Master array: ", this.masterStatesArr);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.getAllStateDetailsUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  gotoAddCountryMaster() {
    this.commonDataShareService.submenuname = "masterStateAdd";
    this.router.navigateByUrl("/masterStateAdd");
  }

  gotoCountryMasterEdit(item) {
    console.log(item);
    if (
      item.statusname === "ADMIN APPROVER PENDING" &&
      this.commonDataShareService.roleType ==
        this.commonDataShareService.makerRole
    ) {
      showToastMessage("You Cannot Perform This Action");
    } else {
      this.commonDataShareService.submenuname = "masterStateEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/masterStateEdit", {
        state: { id: item.id },
      });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
