import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { FormValidationsService } from "../form-validations.service";
import { ImpsSmsTemplatesService } from "./imps-sms-templates.service";

declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-sms-templates",
  templateUrl: "./imps-sms-templates.component.html",
  styleUrls: ["./imps-sms-templates.component.css"],
})
export class ImpsSmsTemplatesComponent implements OnInit {
  menuLink = "impsSMS";
  priviledgeDataArr: any = [];
  impsSMSMaster: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstant: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsSMSService: ImpsSmsTemplatesService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "SMS Templates";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsSMSService.addAuditTrailAdaptorParams(
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
          this.getSystemLogs();
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  getSystemLogs() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstant.getSmsTemplatesUrl)
    .subscribe((data) => {
      var res = data.resp;
      console.log("get IMPS SMS Template data: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.getSmsTemplatesUrl +
            "\n" +
            "Params={}",
          "view"
        );
        console.log(res);
        this.impsSMSMaster = res.result;
        console.log("IMPS SMS Template array: ", this.impsSMSMaster);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $("table.display").DataTable({
            language: {
              emptyTable: "No Data found",
            },
          });
        });
      } else {
        this.errorCallBack(this.appConstant.getSmsTemplatesUrl, res);
      }
      this.commonMethod.destroyDataTable();
      setTimeout(() => {
        this.commonMethod.hideLoader();
      }, 3000);
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  gotoEdit(item) {
    this.commonDataShareService.submenuname = "impsSMSEdit";
    this.router.navigateByUrl("/impsSMSEdit", {
      state: { id: item.id },
    });
  }

  cancel() {
    this.commonMethod.cancel();
  }
}
