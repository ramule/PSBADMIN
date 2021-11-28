import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { Location } from "@angular/common";
import { MasterLimitsService } from "./master-limits.service";
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-master-limits",
  templateUrl: "./master-limits.component.html",
  styleUrls: ["./master-limits.component.css"],
})
export class MasterLimitsComponent implements OnInit {
  masterLimitsList = [];
  priviledgeDataArr: any = [];
  id = "48";
  menuLink = "masterLimits";
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public commonDataService: CommonDataShareService,
    private location: Location,
    public masterlimitsService: MasterLimitsService
  ) {}

  ngOnInit(): void {
    history.pushState(
      {},
      "self",
      this.location.prepareExternalUrl(this.router.url)
    );
    this.commonServiceCall.pageName = "Limits Master";
    this.getLeftMenuId();
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonData.submenuId = res.result[0].id;
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
      this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getLimitsMasterList();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterlimitsService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  getLimitsMasterList() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAllOmniLimitMaster)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.getAllOmniLimitMaster +
              "\n" +
              "Params={}",
            "view"
          );
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.masterLimitsList = res.result;
          console.log(this.masterLimitsList);
        } else {
          setTimeout(function () {
            $("table.display").DataTable({
              language: {
                emptyTable: "No Data found",
              },
            });
          });
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getAllOmniLimitMaster, res);
        }
        this.destroyDataTable();
      });
  }

  destroyDataTable() {
    console.log("destroy datatable called...");
    $("#dt-sample").DataTable().clear().destroy();
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  masterLimitsEdit(item) {
    console.log(item);
    if (
      item.statusname === "ADMIN APPROVER PENDING" &&
      this.commonData.roleType == this.commonData.makerRole
    ) {
      showToastMessage("You Cannot Perform This Action");
    } else {
      this.commonData.submenuname = "masterLimitsEdit";
      this.commonData.masterLimits.createdOn = item.createdOn;
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/masterLimitsEdit", {
        state: { id: item.id },
      });
    }
  }

  AddLimits() {
    this.commonData.submenuname = "masterLimitsAdd";
    this.router.navigateByUrl("/masterLimitsAdd");
  }
}
