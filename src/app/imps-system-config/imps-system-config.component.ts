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
import { ImpsSystemConfigService } from "./imps-system-config.service";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-imps-system-config",
  templateUrl: "./imps-system-config.component.html",
  styleUrls: ["./imps-system-config.component.css"],
})
export class ImpsSystemConfigComponent implements OnInit {
  menuLink = "impsSystemConfig";
  selModel: any = "";
  itemToDelete: any;
  priviledgeDataArr: any = [];
  impsSysConfigMaster: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstant: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsSysConfigService: ImpsSystemConfigService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "System Configuration";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsSysConfigService.addAuditTrailAdaptorParams(
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
          this.getSystemConfiguration();
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  cancel() {
    this.commonMethod.cancel();
  }

  getSystemConfiguration() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getAllSysConfigDataUrl)
      .subscribe((data) => {
        var res = data.resp;
        console.log("get System Configuration data: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstant.apiURL.serviceURL_ESB +
              this.appConstant.getAllSysConfigDataUrl +
              "\n" +
              "Params={}",
            "view"
          );
          console.log(res);
          this.impsSysConfigMaster = res.result;
          console.log("System Configuration array: ", this.impsSysConfigMaster);
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
          this.errorCallBack(this.appConstant.getAllSysConfigDataUrl, res);
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

  addSystemConfig() {
    this.router.navigateByUrl("/impsSystemConfigAdd");
  }

  gotoEdit(item) {
    this.commonDataShareService.submenuname = "impsSystemConfigEdit";
    this.router.navigateByUrl("/impsSystemConfigEdit", {
      state: { id: item.id },
    });
  }

  gotoDelete(item) {
    console.log(item);
    this.selModel = "deleteSysConfig";
    this.itemToDelete = item;
    openTinyModel();
  }

  closeActionModel() {
    closeTinyModel();
  }

  deleteConfig() {
    closeTinyModel();
    var param = {
      id: this.itemToDelete.id,
    };

    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstant.deleteSysConfigDataUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          showToastMessage(res.responseMessage);
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstant.apiURL.serviceURL_ESB +
              this.appConstant.deleteSysConfigDataUrl +
              "\n" +
              "Params={}" +
              JSON.stringify(param),
            "Delete"
          );
          console.log(res);
          this.getSystemConfiguration();
        } else {
          this.errorCallBack(this.appConstant.deleteSysConfigDataUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }
}
