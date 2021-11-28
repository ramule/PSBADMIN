import { Component, OnInit, ViewChild } from "@angular/core";

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
import { NotificationService } from "src/app/notification/notification.service";
declare var showToastMessage: any;
declare var $: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
})
export class NotificationComponent implements OnInit {
  showForm: boolean = false;
  notificationForm: FormGroup;
  isAddButtonClicked = false;
  selModel: any;
  menuLink = "notification";
  selNotificationToDelete: any;
  formErrors = {
    shortname: "",
    status: "",
    productType: "",
    notificationId: "",
    langCode: "",
    targettitle1: "",
    targetaction1: "",
    targettitle2: "",
    targetaction2: "",
    targettitle3: "",
    targetaction3: "",
    targettitle4: "",
    targetaction4: "",
    contents: "",
  };

  priviledgeDataArr: any = [];
  masterStatus = [];
  productTypes = [];
  notificationTypes = [];
  notificatonsArr = [];
  languageArray: any = [];
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public notificationService: NotificationService
  ) {}

  public buildForm() {
    this.notificationForm = this.form.group({
      shortname: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      ]),
      status: new FormControl("", [Validators.required]),
      langCode: new FormControl("", [Validators.required]),
      productType: new FormControl("", [Validators.required]),
      notificationId: new FormControl("", [Validators.required]),
      targettitle1: new FormControl(""),
      targetaction1: new FormControl(""),
      targettitle2: new FormControl(""),
      targetaction2: new FormControl(""),
      targettitle3: new FormControl(""),
      targetaction3: new FormControl(""),
      targettitle4: new FormControl(""),
      targetaction4: new FormControl(""),
      contents: new FormControl(""),
    });
    this.notificationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.notificationForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Notification Template";
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    this.getNotificationId();
    this.getLeftMenuId();
    this.getLanguage();
    this.notificationForm.patchValue({
      status: 3,
    });
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.notificationService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  /* It brings dynamic languages*/
  getLanguage() {
    var url = this.appConstants.getDistinctLanguageJsonCode;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.languageArray = res.result;
      } else {
        showToastMessage(res.responseMessage);
      }
    });
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
        this.commonData.submenuname = res.result[0].menuLink;
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
          this.getAllNotificationDetails();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  closeActionModel() {
    closeTinyModel();
  }

  showHideForm() {
    this.commonServiceCall.pageName = "Add Notification Template";
    this.showForm = !this.showForm;
    this.isAddButtonClicked = true;
    setTimeout(() => {
      $("#sl_Status").val("");
      $("#sl_Product").val("");
      $("#sl_lang").val("");
      $("#sl_notificationType").val("");
    });
    this.notificationForm.patchValue({
      status: 3,
    });
  }

  //save notification
  addNotification() {
    this.formValidation.markFormGroupTouched(this.notificationForm);
    if (this.notificationForm.valid) {
      var formData = this.notificationForm.value;
      var param = this.notificationService.addNotificationData(
        this.notificationForm.value
      );
      console.log("request parameters: ", formData);
      this.saveNotification(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.notificationForm,
        this.formErrors,
        false
      );
    }
  }

  //called on adding of Notification
  saveNotification(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.saveNotificationUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log(data);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.saveNotificationUrl +
              "\n" +
              "Params=" +
              JSON.stringify(param),
            "add"
          );
          this.getStatus();
          this.getAppMasterList();
          this.getAllNotificationDetails();
          this.cancel();
          showToastMessage(res.responseMessage);
        } else {
          this.errorCallBack(this.appConstants.getNotificationCategoriesUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  //on load functions -- to get notifications id
  getNotificationId() {
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getNotificationMasterList)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == 200) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.notificationTypes = res.result;
          console.log("response array: ", this.notificationTypes);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  cancel() {
    this.commonServiceCall.pageName = "Notification Template";
    this.showForm = !this.showForm;
    this.notificationForm.reset();
    this.isAddButtonClicked = false;
    this.getAllNotificationDetails();
  }

  filterStatus() {
    return this.masterStatus.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        var res = data;
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.masterStatus = res.resp;
          console.log("response array: ", this.masterStatus);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  //on load functions
  getAppMasterList() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getChannelListUrl)
      .subscribe((data) => {
        var res = data.resp;
        console.log("response data: ", res);
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.productTypes = res.result;
          console.log("response array: ", this.productTypes);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getChannelListUrl, res);
        }
      });
  }

  //on load functions
  getAllNotificationDetails() {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getNotificationUrl)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.getNotificationUrl +
              "\n" +
              "Params={}",
            "view"
          );
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.commonMethod.setDataTable(this.commonServiceCall.pageName);
          this.notificatonsArr = res.result;
          console.log("Notifications array: ", this.notificatonsArr);
        } else {
          setTimeout(function () {
            $("table.display").DataTable({
              language: {
                emptyTable: "No Data found",
              },
            });
          });
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getNotificationUrl, res);
        }
        this.commonMethod.destroyDataTable();
      });
  }

  openModelToDeleteNotification(item) {
    this.selNotificationToDelete = item;
    this.selModel = "deleteNotification";
    openTinyModel();
  }

  deleteNotification() {
    closeTinyModel();
    console.log("deleting item: ", this.selNotificationToDelete);
    var url =
      this.appConstants.deleteNotificationUrl + this.selNotificationToDelete.id;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      console.log("delete response: ", res);
      if (res.responseCode == 200) {
        this.commonMethod.hideLoader();
        showToastMessage("Notification Deleted Successfully");
        this.getAllNotificationDetails();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.deleteNotificationUrl, res);
      }
    });
  }

  excelDownload() {
    $(".buttons-excel").click();
  }

  pdfDownload() {
    $(".buttons-pdf").click();
  }

  csvDownload() {
    $(".buttons-csv").click();
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  gotoNotificationDetails(item) {
    this.commonData.notificationTemplate.createdon = item.createdon;
    this.router.navigateByUrl("/notificationEdit", { state: { id: item.id } });
  }
}
