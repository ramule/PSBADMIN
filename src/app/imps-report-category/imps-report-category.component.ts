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
import { ImpsReportCategoryService } from "./imps-report-category.service";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-report-category",
  templateUrl: "./imps-report-category.component.html",
  styleUrls: ["./imps-report-category.component.css"],
})
export class ImpsReportCategoryComponent implements OnInit {
  impsCategoryMaster: any = [];
  priviledgeDataArr: any = [];
  menuLink = "impsReportCategory";
  selModel: any;
  selCategoryDelete: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsCategoryService: ImpsReportCategoryService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Report Category";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsCategoryService.addAuditTrailAdaptorParams(
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
          this.getCategoryMaster();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  getCategoryMaster() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstants.getReportCategoryUrl)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsCategoryMaster = res.result;
        console.log("IMPS Category Master: ", this.impsCategoryMaster);
        // this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getReportCategoryUrl + "\n" + "Params={}", 'view')
      } else if(res.responseCode ="202") {
        this.commonMethod.hideLoader();
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.commonMethod.hideLoader();
      }
      this.commonMethod.destroyDataTable();
    });
  }

  addTask() {
    this.router.navigateByUrl("/impsReportCategoryAdd");
  }

  gotoEdit(item) {
    this.router.navigateByUrl("/impsReportCategoryEdit", {
      state: { id: item.id },
    });
  }

  deleteCategory() {
    closeTinyModel();
    console.log("deletable item: ", this.selCategoryDelete);
    this.commonMethod.showLoader();
    var url = this.appConstants.deleteReportCategoryUrl;
    var param = this.impsCategoryService.deleteCategory(this.selCategoryDelete);
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.deleteReportCategoryUrl +
            param +
            "\n" +
            "Params=" +
            JSON.stringify(param),
          "delete"
        );
        this.getCategoryMaster();
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  openModelToDeleteCategory(item) {
    this.selModel = "deleteCategory";
    this.selCategoryDelete = item;
    openTinyModel();
  }

  closeActionModel() {
    closeTinyModel();
  }

  cancel() {
    this.commonMethod.cancel();
  }
}
