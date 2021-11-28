import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { ImpsScheduleService } from "./imps-schedule.service";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-schedule",
  templateUrl: "./imps-schedule.component.html",
  styleUrls: ["./imps-schedule.component.css"],
})
export class ImpsScheduleComponent implements OnInit {
  impsScheduleMaster: any = [];

  priviledgeDataArr: any = [];
  menuLink = "impsSchedule";
  selModel: any;
  selScheduleDelete: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private impsScheduleService: ImpsScheduleService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Schedule";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsScheduleService.addAuditTrailAdaptorParams(
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
          this.getScheduleMaster();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  getScheduleMaster() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getScheduleDataUrl)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log("response data: ", res);
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.impsScheduleMaster = res.result;
          console.log("IMPS Schedule data: ", this.impsScheduleMaster);
          this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpUserTypesUrl + "\n" + "Params={}", 'view')
        } else if(res.responseCode == "202") {
          setTimeout(function () {
            $('table.display').DataTable({
              "language": {
                "emptyTable": "No Data found"
              }
            })
          });
        } else {
          this.errorCallBack(this.appConstants.getPermissionByNameUrl, res);
        }
        this.commonMethod.hideLoader();
        this.commonMethod.destroyDataTable();
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  addSchedule() {
    this.router.navigateByUrl("/impsScheduleAdd");
  }

  gotoEdit(item) {
    this.router.navigateByUrl("/impsScheduleEdit", {
      state: { id: item.id },
    });
  }

  deleteSchedule() {
    closeTinyModel();
    console.log("deletable item: ", this.selScheduleDelete);
    this.commonMethod.showLoader();
    var url = this.appConstants.deleteScheduleDataUrl;
    var param = this.impsScheduleService.deleteSchedule(this.selScheduleDelete);
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.deleteScheduleDataUrl +
            param +
            "\n" +
            "Params=" +
            JSON.stringify(param),
          "delete"
        );
        this.getScheduleMaster();
      } else {
        this.errorCallBack(this.appConstants.deleteScheduleDataUrl, res);
        this.commonMethod.hideLoader();
      }
    });
  }

  openModelToDeleteSchedule(item) {
    this.selModel = "deleteSchedule";
    this.selScheduleDelete = item;
    openTinyModel();
  }

  closeActionModel() {
    closeTinyModel();
  }
}
