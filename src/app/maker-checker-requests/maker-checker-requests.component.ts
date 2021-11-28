import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { MakerCheckerRequestsService } from "./maker-checker-requests.service";
import * as moment from "moment";
import { DatePipe } from "@angular/common";
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare function openTinyModel1(): any;
declare function closeTinyModel1(): any;
declare var $: any;
@Component({
  selector: "app-maker-checker-requests",
  templateUrl: "./maker-checker-requests.component.html",
  styleUrls: ["./maker-checker-requests.component.css"],
})
export class MakerCheckerRequestsComponent implements OnInit {
  remarkForm: FormGroup;
  formErrors = {
    remark: "",
  };
  makercheckerRequests: any = [];
  finalDataDynamic: any = [];
  finalarray: any = [];
  contentDataArr: any = [];
  approveReqItem: any;
  rejectReqItem: any;
  selModel: any = "";
  coldynamic: any = [];
  datadynamic: any = [];
  actionButton: any = "";

  singlerequestremark: boolean = true;
  allrequestremark: boolean = false;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private makerCheckerRequestService: MakerCheckerRequestsService,
    public datePipe: DatePipe
  ) {}

  buildForm() {
    this.remarkForm = this.form.group({
      remark: new FormControl("", [Validators.required]),
    });
    this.remarkForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Checker Requests";
    this.getmakercheckerRequests();
    this.buildForm();
    this.actionButton = "Approve All";
  }

  getmakercheckerRequests() {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAllDataForChecker)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          $("#approveCheckBox").attr("checked", false);
          $("#rejectCheckBox").attr("checked", false);
          console.log(res);
          var resData = res.result;
          resData.forEach(element => {
            if(element.statusName != 'ADMIN APPROVER PENDING')
            this.makercheckerRequests.push(element)
          });
          this.makercheckerRequests.forEach((el) => {
            el.isApproveChecked = false;
            el.isRejectChecked = false;
          });
          console.log(this.makercheckerRequests);
          //initiallize datatable
          this.commonMethod.setDataTableWithoutPagination(
            this.commonServiceCall.pageName
          );
        } else if(res.responseCode == '202') {
          $("#approveCheckBox").attr("checked", false);
          $("#rejectCheckBox").attr("checked", false);
          $("table.display").DataTable({
            "language": {
              "emptyTable": "No Data found",
            },
          });
        } else {
          this.errorCallBack(this.appConstants.getAdminUserActivityLogs, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick() {
    this.commonMethod.cancel();
    closeTinyModel();
  }

  showContentData(item) {
    console.log(item);
    this.showContentDataApiCall(item);
  }

  showContentDataApiCall(item) {
    this.contentDataArr = [];
    var url =
      this.appConstants.getRemarkHistoryDataUrl +
      item.activityRefNo +
      "/" +
      item.pageId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        // showToastMessage(res.responseMessage);
        res.result.forEach((element) => {
          if(element.content != "" || element.content != null || element.content != undefined) {
            this.contentDataArr.push(element.content);
          }
        });
        this.view(this.contentDataArr);
      } else {
        this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
      }
    });
  }

  view(content) {
    console.log("content: ", content);
    $("#remark").hide();
    this.datadynamic = [];
    this.coldynamic = [];
    this.finalDataDynamic = [];

    // var contentData = [JSON.parse(content)];
    var contentData = [];
    content.forEach((element) => {
      contentData.push(JSON.parse(element));
    });
    console.log("contentData: ", contentData);
    var col = [];
    var count: any = 0;
    var contentDataLength = contentData.length+1;

    for (var i = 0; i < contentData.length; i++) {
      delete contentData[i]["statusId"];
      delete contentData[i]["user_ID"];
      delete contentData[i]["role_ID"];
      delete contentData[i]["subMenu_ID"];
      delete contentData[i]["createdby"];
      delete contentData[i]["updatedby"];
      delete contentData[i]["userAction"];
      delete contentData[i]["activityRefNo"];
      delete contentData[i]["createdBy"];
      delete contentData[i]["updatedBy"];
      delete contentData[i]["id"];
      delete contentData[i]["appId"];
      delete contentData[i]["appid"];
      delete contentData[i]["isactive"];
      delete contentData[i]["Id"];
      delete contentData[i]["adapterChannel"];
      delete contentData[i]["calculatorId"];
      delete contentData[i]["statusid"];
      delete contentData[i]["base64ImageLarge"];
      delete contentData[i]["base64ImageSmall"];
      delete contentData[i]["salutation"];
      delete contentData[i]["mpin"];
      delete contentData[i]["userpassword"];
      delete contentData[i]["image"];
      delete contentData[i]["mobilelastloggedon"];
      delete contentData[i]["weblastloggenon"];
      delete contentData[i]["fingureunlockenabled"];
      delete contentData[i]["dob"];
      delete contentData[i]["gender"];
      delete contentData[i]["wrongattemptspwd"];
      delete contentData[i]["wrongattemptsmpin"];
      delete contentData[i]["base64image"];
      delete contentData[i]["frid"];
      delete contentData[i]["tpin"];
      delete contentData[i]["issmsenabled"];
      delete contentData[i]["isemailenabled"];
      delete contentData[i]["isPushNotificationEnabled"];
      delete contentData[i]["assignto"];
      delete contentData[i]["ssa_active"];
      delete contentData[i]["ssa_account_number"];
      delete contentData[i]["localtrflimits"];
      delete contentData[i]["utilitylimit"];
      delete contentData[i]["internationallimit"];
      delete contentData[i]["cardlimit"];
      delete contentData[i]["MOBREGSTATUS"];
      delete contentData[i]["IBREGSTATUS"];
      delete contentData[i]["referealcode"];
      delete contentData[i]["ibregstatus"];
      delete contentData[i]["mobregstatus"];
      delete contentData[i]["accountTypeId"];
      delete contentData[i]["corpUserTypeId"];
      delete contentData[i]["categoryId"];
      delete contentData[i]["customerId"];
      delete contentData[i]["createdDate"];
      delete contentData[i]["productName"];
      delete contentData[i]["activityName"];
      delete contentData[i]["deviceUUID"];
      delete contentData[i]["bioMetricSupport"];
      delete contentData[i]["imsi"];
      delete contentData[i]["os"];
      delete contentData[i]["macAddress"];
      delete contentData[i]["pushNotificationToken"];
      delete contentData[i]["countryId"];
      delete contentData[i]["countryId"];
      delete contentData[i]["stateId"];
      delete contentData[i]["locationTypeId"];
      delete contentData[i]["locationType"];
      delete contentData[i]["imgdescLarge"];
      delete contentData[i]["imgdescSmall"];
      delete contentData[i]["prodType"];
      delete contentData[i]["announcementDescription"];
      delete contentData[i]["ismpinlocked"];
      delete contentData[i]["resetLastMobileLoggedIn"];
      delete contentData[i]["compId"];
      delete contentData[i]["dBy"];
      delete contentData[i]["dOn"];
      delete contentData[i]["addressClob"];
      // delete contentData[i]["ismpinenabled"];
      // delete contentData[i]["istpinlocked"];
      // delete contentData[i]["resetLastMobileLoggedIn"];
      // delete contentData[i]["isbiometricenabled"];
    }

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
            key.toLowerCase().includes("updatedondate") ||
            key.toLowerCase().includes("fromdate") ||
            key.toLowerCase().includes("todate") ||
            key.toLowerCase().includes("holidaydate")
          ) {
            if (contentData[i][key] == "" || contentData[i][key] == null) {
              var tempdata = {
                data: "-",
                imgactive: false,
                dataactivr: true,
              };
              this.datadynamic.push(tempdata);
            } else {
              var tempdata = {
                data: this.datePipe.transform(
                  contentData[i][key],
                  "yyyy/MM/dd hh:mm:ss a"
                ),
                imgactive: false,
                dataactivr: true,
              };
              this.datadynamic.push(tempdata);
            }
          } else {
            if (contentData[i][key] == "" || contentData[i][key] == null) {
              var tempdata = {
                data: "-",
                imgactive: false,
                dataactivr: true,
              };
              this.datadynamic.push(tempdata);
            } else {
              if (
                key.toLowerCase().includes("baseimagelarge") ||
                key.toLowerCase().includes("baseimagesmall") ||
                key.toLowerCase().includes("productimg") ||
                key == "logo"
              ) {
                var img = "data:image/jpg;base64," + contentData[i][key];
                var tempdata = {
                  data: img,
                  imgactive: true,
                  dataactivr: false,
                };
                this.datadynamic.push(tempdata);
              } else {
                var tempdata = {
                  data: JSON.stringify(contentData[i][key]),
                  imgactive: false,
                  dataactivr: true,
                };
                this.datadynamic.push(tempdata);
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
    openTinyModel();

    this.selModel = "viewdata";
  }

  onApproveClicked(item) {
    console.log(item);
    if (item.statusName === "ADMIN APPROVER PENDING") {
      showToastMessage("You Cannot Perform This Action");
    } else {
      this.singlerequestremark = true;
      this.allrequestremark = false;
      this.buildForm();
      openTinyModel1();
      this.selModel = "approveRequest";
      this.approveReqItem = item;
    }
  }

  approveRequest(formdata) {
    if (this.remarkForm.valid) {
      closeTinyModel1();
      var formData = this.remarkForm.value;
      var param = this.makerCheckerRequestService.approveCall(
        this.approveReqItem,
        formData
      );
      this.approveRejectRequest(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  onRejectClicked(item) {
    console.log(item);
    if (item.statusName === "ADMIN APPROVER PENDING") {
      showToastMessage("You Cannot Perform This Action");
    } else {
      this.singlerequestremark = true;
      this.allrequestremark = false;
      this.buildForm();
      openTinyModel1();
      this.selModel = "rejectRequest";
      this.rejectReqItem = item;
    }
  }

  rejectRequest(formdata) {
    if (this.remarkForm.valid) {
      closeTinyModel1();
      var formData = this.remarkForm.value;
      var param = this.makerCheckerRequestService.rejectCall(
        this.rejectReqItem,
        formData
      );
      this.approveRejectRequest(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  approveRejectRequest(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.makerCheckerReqUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log(res.result);
          showToastMessage(res.responseMessage);
          this.getmakercheckerRequests();
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.makerCheckerReqUrl, res);
        }
      });
  }

  closeActionModel() {
    this.selModel = "";
    $("#remark").show();
    closeTinyModel();
    this.remarkForm.reset();
  }

  closeActionModel1() {
    this.selModel = "";
    $("#remark").show();
    closeTinyModel1();
    this.remarkForm.reset();
  }

  select(type) {
    console.log(type);
    switch (type) {
      case "approve":
        if ($("#approveCheckBox").is(":checked")) {
          this.makercheckerRequests.map((v) => (v.isApproveChecked = true));
          $("input.rejectall").attr("disabled", true);
          $("#rejectCheckBox").attr("disabled", true);
          this.actionButton = "Approve All";
          $(':input[type="submit"]').prop("disabled", false);
        } else {
          this.makercheckerRequests.map((v) => (v.isApproveChecked = false));
          $("input.rejectall").attr("disabled", false);
          $("#rejectCheckBox").attr("disabled", false);
          $(':input[type="submit"]').prop("disabled", true);
        }
        break;
      case "reject":
        if ($("#rejectCheckBox").is(":checked")) {
          this.makercheckerRequests.map((v) => (v.isRejectChecked = true));
          $("input.approveall").attr("disabled", true);
          $("#approveCheckBox").attr("disabled", true);
          this.actionButton = "Reject All";
          $(':input[type="submit"]').prop("disabled", false);
        } else {
          this.makercheckerRequests.map((v) => (v.isRejectChecked = false));
          $("input.approveall").attr("disabled", false);
          $("#approveCheckBox").attr("disabled", false);
          $(':input[type="submit"]').prop("disabled", true);
        }
        break;
    }
  }

  getdata() {
    this.singlerequestremark = false;
    this.allrequestremark = true;
    this.finalarray = [];
    if (this.actionButton == "Approve All") {
      var newarray = this.makercheckerRequests;
      this.finalarray = newarray.filter((f) => f.isApproveChecked == true);
      console.log('finalarray in getdata function: ', this.finalarray);
      this.finalarray.forEach((el) => {
        el.type = "APPROVED";
      });
      console.log(this.finalarray);
      this.buildForm();
      openTinyModel1();
      this.selModel = "approveall";
    } else {
      var newarray = this.makercheckerRequests;
      this.finalarray = newarray.filter((f) => f.isRejectChecked == true);
      this.finalarray.forEach((el) => {
        el.type = "REJECTED";
      });
      console.log(this.finalarray);
      this.buildForm();
      openTinyModel1();
      this.selModel = "rejectall";
    }
  }

  selectsingle(type, item) {
    console.log(type);
    switch (type) {
      case "approve":
        var objIndex = this.makercheckerRequests.findIndex(
          (obj) => obj.id == item.id
        );
        if (this.makercheckerRequests[objIndex].isApproveChecked == true) {
          this.makercheckerRequests[objIndex].isApproveChecked = false;
        } else {
          this.makercheckerRequests[objIndex].isApproveChecked = true;
        }
        if (
          this.makercheckerRequests.find((el) => el.isApproveChecked == true)
        ) {
          $("input.rejectall").attr("disabled", true);
          $("#rejectCheckBox").attr("disabled", true);
          this.actionButton = "Approve All";
          $(':input[type="submit"]').prop("disabled", false);
        } else {
          $("input.rejectall").attr("disabled", false);
          $("#rejectCheckBox").attr("disabled", false);
          this.actionButton = "Approve All";
          $(':input[type="submit"]').prop("disabled", true);
        }

        break;

      case "reject":
        var objIndex = this.makercheckerRequests.findIndex(
          (obj) => obj.id == item.id
        );
        if (this.makercheckerRequests[objIndex].isRejectChecked == true) {
          this.makercheckerRequests[objIndex].isRejectChecked = false;
        } else {
          this.makercheckerRequests[objIndex].isRejectChecked = true;
        }
        if (
          this.makercheckerRequests.find((el) => el.isRejectChecked == true)
        ) {
          $("input.approveall").attr("disabled", true);
          $("#approveCheckBox").attr("disabled", true);
          this.actionButton = "Reject All";
          $(':input[type="submit"]').prop("disabled", false);
        } else {
          $("input.approveall").attr("disabled", false);
          $("#approveCheckBox").attr("disabled", false);
          this.actionButton = "Reject All";
          $(':input[type="submit"]').prop("disabled", true);
        }

        break;
    }
  }

  approveall(formData) {
    console.log('finalarray: ', this.finalarray);
    if (this.finalarray.length > 0) {
      if (this.remarkForm.valid) {
        closeTinyModel1();
        var formData = this.remarkForm.value;
        this.finalarray.forEach((el) => {
          var itemData = JSON.parse(el.content);
          itemData.remark = formData.remark;
          itemData.createdByName = this.commonData.username;
          itemData.createdby = this.commonData.user_ID;
          itemData.roleName = this.commonData.roleType;
          el.remark = formData.remark;
          el.content = JSON.stringify(itemData);
          el.statusId = 7;
          el.createdBy = this.commonData.user_ID;
        });
        this.commonServiceCall
          .postResponsePromise(
            this.appConstants.updateStatusListByChecker,
            this.finalarray
          )
          .subscribe((data) => {
            var res = data.resp;
            if (res.responseCode == "200") {
              this.commonMethod.hideLoader();
              console.log(res.result);
              showToastMessage(res.responseMessage);
              this.getmakercheckerRequests();
            } else {
              this.commonMethod.hideLoader();
              this.errorCallBack(
                this.appConstants.updateStatusListByChecker,
                res
              );
            }
          });
      } else {
        this.formErrors = this.formValidation.validateForm(
          this.remarkForm,
          this.formErrors,
          false
        );
      }
    } else {
      showToastMessage("No Request Found");
    }
  }

  rejectall(formData) {
    console.log('finalarray: ', this.finalarray);
    if (this.finalarray.length > 0) {
      if (this.remarkForm.valid) {
        closeTinyModel1();
        var formData = this.remarkForm.value;
        this.finalarray.forEach((el) => {
          var itemData = JSON.parse(el.content);
          itemData.remark = formData.remark;
          itemData.createdByName = this.commonData.username;
          itemData.createdby = this.commonData.user_ID;
          itemData.roleName = this.commonData.roleType;
          el.remark = formData.remark;
          el.content = JSON.stringify(itemData);
          el.statusId = 6;
          el.createdBy = this.commonData.user_ID;
        });
        this.commonServiceCall
          .postResponsePromise(
            this.appConstants.updateStatusListByChecker,
            this.finalarray
          )
          .subscribe((data) => {
            var res = data.resp;
            if (res.responseCode == "200") {
              this.commonMethod.hideLoader();
              console.log(res.result);
              showToastMessage(res.responseMessage);
              this.getmakercheckerRequests();
            } else {
              this.commonMethod.hideLoader();
              this.errorCallBack(
                this.appConstants.updateStatusListByChecker,
                res
              );
            }
          });
      } else {
        this.formErrors = this.formValidation.validateForm(
          this.remarkForm,
          this.formErrors,
          false
        );
      }
    } else {
      showToastMessage("No Request Found");
    }
  }
}
