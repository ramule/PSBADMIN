import { Component, OnInit } from "@angular/core";
import { AppConstants } from "../app-constants";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { Router } from "@angular/router";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonMethods } from "../common-methods";
import { DatePipe } from "@angular/common";
import { DynamicReportsGridService } from "./dynamic-reports-grid.service";
declare var $: any;
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var jQuery: any;
import * as moment from "moment";
import { CommonDataShareService } from "../common-data-share.service";

@Component({
  selector: "app-dynamic-reports-grid",
  templateUrl: "./dynamic-reports-grid.component.html",
  styleUrls: ["./dynamic-reports-grid.component.css"],
})
export class DynamicReportsGridComponent implements OnInit {
  // id = 69;
  menuLink = "adapterAuditLog";
  priviledgeDataArr: any = [];
  dynamicResultsSummaryForm: FormGroup;
  formErrors = {
    fromDate: "",
    toDate: "",
    report: "",
  };

  showForm: boolean = false;
  toDateValid: boolean = false;
  isToDateValidError: any;
  todayDate: any;
  productTypes = [];
  reportsArr: any = [];
  datadynamic: any = [];
  finalDataDynamic: any = [];
  coldynamic: any = [];
  status: any = [];
  p: number = 1;
  message = "";
  reportMaster: any = [];

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstants: AppConstants,
    public datePipe: DatePipe,
    public dynamicReportGridService: DynamicReportsGridService,
    public commonData: CommonDataShareService
  ) {}

  public buildForm() {
    this.dynamicResultsSummaryForm = this.form.group({
      fromDate: new FormControl("", [Validators.required]),
      toDate: new FormControl("", [Validators.required]),
      report: new FormControl("", [Validators.required]),
    });
    this.dynamicResultsSummaryForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.dynamicResultsSummaryForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit() {
    this.buildForm();
    this.todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.getAllReports();
    this.commonServiceCall.pageName = "Report Summary";
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.dynamicReportGridService.addAuditTrailAdaptorParams(
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
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  getAllReports() {
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAllReportDetails)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == 200) {
          console.log("response data: ", res);
          this.reportMaster = res.result;
          console.log("reports array: ", this.reportMaster);
          console.log("response array: ", this.priviledgeDataArr);
        } else {
          this.formErrors = this.formValidation.validateForm(
            this.dynamicResultsSummaryForm,
            this.formErrors,
            true
          );
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
        if (!this.priviledgeDataArr.viewChecked) {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  onDateChange(value) {
    if (value.fromDate != "" && value.toDate != "") {
      if (value.toDate < value.fromDate) {
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* Please enter valid date";
      } else {
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }

  cancel() {
    this.commonMethod.cancel();
  }

  // showHideForm(){
  //   this.showForm = !this.showForm
  // }

  getSelectedReport() {
    this.formValidation.markFormGroupTouched(this.dynamicResultsSummaryForm);
    if (this.dynamicResultsSummaryForm.valid) {
      if (this.toDateValid) {
        return;
      }

      var param = this.dynamicReportGridService.getDynamicReportCall(
        this.dynamicResultsSummaryForm.value
      );
      this.getReportData(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.dynamicResultsSummaryForm,
        this.formErrors,
        false
      );
    }
  }

  getReportData(param) {
    this.datadynamic = [];
    this.coldynamic = [];
    this.reportsArr = [];
    this.finalDataDynamic = [];
    this.commonMethod.destroyDataTable();
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.getDynamicReportsUrl, param)
      .subscribe((data) => {
        console.log(data);
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.reportsArr = res.result;
          this.commonMethod.setDataTable(this.commonServiceCall.pageName);
          console.log(this.reportsArr);
          this.getDynamicCall(this.reportsArr);
          //   this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getAdapterAuditLogByDate+"\n"+"Params="+JSON.stringify(param),'view')
        } else if (res.responseCode == "202") {
          showToastMessage(res.responseMessage);
        } else {
          this.errorCallBack(this.appConstants.getDynamicReportsUrl, res);
        }
        this.commonMethod.hideLoader();
        this.commonMethod.destroyDataTable();
      });
  }

  onReportChange(event) {
    console.log(event.target.value);
  //  this.dynamicResultsSummaryForm.get('fromDate').reset();
   // this.dynamicResultsSummaryForm.get('toDate').reset();
  }

  getDynamicCall(repArray) {
    this.datadynamic = [];
    this.coldynamic = [];

    var contentData: any = [];
    contentData = repArray;
    console.log("content data: ", contentData);
    var col = [];
    var count: any = 0;
    var contentDataLength = contentData.length;

    for (var i = 0; i <= contentDataLength; i++) {
      for (var key in contentData[i]) {
        if (col.indexOf(key) === -1) {
          if (i == 0) {
            this.coldynamic.push(key);
          }
          if (i > count) {
            count++;
            this.finalDataDynamic.push(this.datadynamic);
            this.datadynamic = [];
          }
          if (
            key.toLowerCase().includes("createdon") ||
            key.toLowerCase().includes("updatedon") ||
            key.toLowerCase().includes("validfrom") ||
            key.toLowerCase().includes("validto") ||
            key.toLowerCase().includes("createdondate") ||
            key.toLowerCase().includes("updatedondate")
          ) {
            if (contentData[i][key] == "" || contentData[i][key] == null) {
              this.datadynamic.push("-");
            } else {
              this.datadynamic.push(
                this.datePipe.transform(
                  contentData[i][key],
                  "yyyy/MM/dd hh:mm:ss a"
                )
              );
            }
          } else {
            if (contentData[i][key] == "" || contentData[i][key] == null) {
              this.datadynamic.push("-");
            } else {
              if (
                key.toLowerCase().includes("baseimagelarge") ||
                key.toLowerCase().includes("baseimagesmall")
              ) {
                var img = "data:image/jpg;base64," + contentData[i][key];
                this.datadynamic.push(img);
              } else {
                this.datadynamic.push(contentData[i][key]);
              }
            }
          }
        }
      }
    }
    this.finalDataDynamic.push(this.datadynamic);
    console.log("colDynamic: ", this.coldynamic);
    console.log("dataDynamic: ", this.datadynamic);
    console.log("finalDataDynamic: ", this.finalDataDynamic);
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openPopup(item) {
    console.log(item);
    this.message = item.message1;
    openTinyModel();
  }

  closeActionModel() {
    closeTinyModel();
  }
}
