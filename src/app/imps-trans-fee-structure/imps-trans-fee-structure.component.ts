import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { ImpsTransFeeStructureService } from "./imps-trans-fee-structure.service";
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-trans-fee-structure",
  templateUrl: "./imps-trans-fee-structure.component.html",
  styleUrls: ["./imps-trans-fee-structure.component.css"],
})
export class ImpsTransFeeStructureComponent implements OnInit {
  impsTranFeeMaster: any = [];
  priviledgeDataArr: any = [];
  menuLink = "impsTransFee";
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private impsTransFeeService: ImpsTransFeeStructureService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Transaction Fee Structures";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsTransFeeService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonDataShareService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  getPriviledgeData(id) {
    var url =
      this.appConstants.getPriviledgeDataUrl +
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
          this.getTransactionFee();
        // this.impsTranFeeMaster = [
        //   {
        //     "transaction_type": "1",
        //     "transaction_direction": "2",
        //     "apply_fee": "3",
        //     "description": "ksdfhkhfd"
        //   }
        // ];
        // this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  getTransactionFee() {
    this.commonMethod.showLoader();
    var param = this.impsTransFeeService.getTransFee();
    this.commonServiceCall
    .postResponsePromise(
      this.appConstants.getTransFeeSetupByApplyFeeAndTransType,
      param
    )
    .subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.getTransFeeSetupByApplyFeeAndTransType +
            "\n" +
            "Params={}",
          "view"
        );
        console.log(res);

        this.impsTranFeeMaster = res.result;
        console.log("IMPS Trans Fee: ", this.impsTranFeeMaster);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.errorCallBack(this.appConstants.getTransFeeSetupByApplyFeeAndTransType, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.commonMethod.cancel();
  }

  addTransFee() {
    this.router.navigateByUrl("/impsTransFeeAdd");
  }

  gotoEdit() {
    this.router.navigateByUrl("/impsTransFeeEdit");
  }
}
