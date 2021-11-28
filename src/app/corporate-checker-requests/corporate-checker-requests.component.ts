import { DatePipe } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CorporateCheckerRequestsService } from './corporate-checker-requests.service';
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare function openTinyModel1(): any;
declare function closeTinyModel1(): any;
declare var $: any;
@Component({
  selector: "app-corporate-checker-requests",
  templateUrl: "./corporate-checker-requests.component.html",
  styleUrls: ["./corporate-checker-requests.component.css"],
})
export class CorporateCheckerRequestsComponent implements OnInit {
  remarkForm: FormGroup;
  formErrors = {
    remark: "",
  };
  corpCheckerRequests: any = [];
  contentDataArr: any = [];
  finalDataDynamic: any = [];
  finalarray: any = [];
  approveReqItem: any;
  rejectReqItem: any;
  selModel: any = "";
  coldynamic: any = [];
  datadynamic: any = [];
  menuarr: any = [];
  accarr: any = [];
  userarr: any = [];
  finaluserarr: any = [];
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
    private corpCheckerRequestService: CorporateCheckerRequestsService,
    public datePipe: DatePipe
  ) { }

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
    this.commonServiceCall.pageName = "Corporate Checker Requests";
    this.getCorporateCheckerRequests();
    this.buildForm();
    this.actionButton = "Approve All";
  }

  getCorporateCheckerRequests() {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAllDataForCorporateChecker)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          $("#approveCheckBox").attr("checked", false);
          $("#rejectCheckBox").attr("checked", false);
          console.log(res);
          var resData = res.result;
          resData.forEach(element => {
            if (element.statusName != 'CORP_APPROVER_PENDING')
              this.corpCheckerRequests.push(element)
          });

          this.corpCheckerRequests.forEach((el) => {
            el.isApproveChecked = false;
            el.isRejectChecked = false;
          });
          console.log(this.corpCheckerRequests);
          //initiallize datatable
          this.commonMethod.setDataTableWithoutPagination(
            this.commonServiceCall.pageName
          );
        }
        else if (res.responseCode == "202") {
          $("#approveCheckBox").attr("checked", false);
          $("#rejectCheckBox").attr("checked", false);
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          });
        }
        else {
          this.errorCallBack(this.appConstants.getAllDataForCorporateChecker, res);
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
        res.result.forEach((element) => {
          if (element.content != "" || element.content != null || element.content != undefined) {
            this.contentDataArr.push(element.content);
          }
        });
        this.view(item, this.contentDataArr);
      } else {
        this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
      }
    });
  }

  view(item, content) {

    if (item.activityName == "corpSetLimitAdd" || item.activityName == "corpSetLimitEdit") {
      var companyData = JSON.parse(item.content);
      this.router.navigateByUrl('/corpSetLimitCheckerView', { state: { id: item.id, accNum: companyData.accountNumber, companyId: companyData.corpCompId, transLimitId: 0 } });
    }
    else {
      console.log("content: ", content);
      $("#remark").hide();
      this.datadynamic = [];
      this.coldynamic = [];
      this.finalDataDynamic = [];
      var contentData = [];
      this.userarr = [];

      if(item.activityName == 'corpCompanyUserRequestsAdd' || item.activityName == 'corpCompanyUserRequestsEdit') {

        for(var i=0; i < content.length; i++) {
          var contentdt = content[i].split('~~')[1];
          console.log(contentdt);
          [contentdt].forEach((element) => {
            contentData.push(JSON.parse(element));
          });

          var menudata = JSON.parse(content[i].split('~~')[2]);
          this.menuarr = [];
          menudata.forEach(element => {
            this.menuarr.push(element.menuName);
          });

          var accountdata = JSON.parse(content[i].split('~~')[3]);
          this.accarr = [];
          accountdata.forEach(element => {
            this.accarr.push(element.accountNo);
          });

          var userdata = JSON.parse(content[i].split('~~')[4]);
          console.log('userdata: ', userdata);
          var userarrvar = [];
          userdata.forEach(element => {
            userarrvar.push(element);
          });
          this.userarr.push(userarrvar);
          console.log('users array: ', this.userarr);
        }

        for(var j=0; j<contentData.length; j++) {
          contentData[j]['Menus Mapped'] = this.menuarr.join();
          contentData[j]['Accounts Mapped'] = this.accarr.join();
          contentData[j]['Users Mapped'] = "?";
        }
      }
      else {
        content.forEach((element) => {
          contentData.push(JSON.parse(element));
        });
      }

      console.log("contentData: ", contentData);
      var col = [];
      var count: any = 0;
      var contentDataLength = contentData.length + 1;

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
        delete contentData[i]["companyCode"];
        delete contentData[i]["logo"];
        delete contentData[i]["makerLimit"];
        delete contentData[i]["checkerLimit"];
        delete contentData[i]["approvalLevel"];
        delete contentData[i]["status"];
        delete contentData[i]["corp_comp_id"];
        delete contentData[i]["user_name"];
        delete contentData[i]["user_pwd"];
        delete contentData[i]["lastLoginTime"];
        delete contentData[i]["user_type"];
        delete contentData[i]["country"];
        delete contentData[i]["nationalIdImg"];
        delete contentData[i]["passportImg"];
        delete contentData[i]["boardResolutionImg"];
        delete contentData[i]["userStringImage"];
        delete contentData[i]["passportNumber"];
        delete contentData[i]["nationalIdNumber"];
        delete contentData[i]["tpin_status"];
        delete contentData[i]["tpin_wrong_attempt"];
        delete contentData[i]["city"];
        delete contentData[i]["wrong_pwd_attempt"];
        delete contentData[i]["pwd_status"];
        delete contentData[i]["otherDocImg"];
        delete contentData[i]["certificateIncorporationImg"];
        delete contentData[i]["state"];
        delete contentData[i]["companyId"];
        delete contentData[i]["createdDate"];
        delete contentData[i]["hierarchyLevel"];
        delete contentData[i]["productName"];
        delete contentData[i]["activityName"];
        delete contentData[i]["menuSelected"];
      }

      for (var i = 0; i < contentData.length; i++) {
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
              key.toLowerCase().includes("establishmenton")
            ) {
              if (contentData[i][key] == "" || contentData[i][key] == null) {
                var tempdata = {
                  data: "-",
                  userActive: false,
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
                  userActive: false,
                  imgactive: false,
                  dataactivr: true,
                };
                this.datadynamic.push(tempdata);
              }
            } else {
              if (contentData[i][key] == "" || contentData[i][key] == null) {
                var tempdata = {
                  data: "-",
                  userActive: false,
                  imgactive: false,
                  dataactivr: true,
                };
                this.datadynamic.push(tempdata);
              } else if(contentData[i][key] == "?") {
                var tempdata = {
                  data: "",
                  userActive: true,
                  imgactive: false,
                  dataactivr: true,
                };
                this.datadynamic.push(tempdata);
              } else {
                if (
                  key.toLowerCase().includes("baseimagelarge") ||
                  key.toLowerCase().includes("baseimagesmall") ||
                  key.toLowerCase().includes("logoimage") ||
                  key.toLowerCase().includes("nationalid") ||
                  key.toLowerCase().includes("passport") ||
                  key.toLowerCase().includes("boardresolution") ||
                  key.toLowerCase().includes("user_image") ||
                  key.toLowerCase().includes("certificate_incorporation") ||
                  key.toLowerCase().includes("otherdoc") ||
                  key.toLowerCase().includes("coi") ||
                  key.toLowerCase().includes("moa") ||
                  key.toLowerCase().includes("logo")
                ) {
                  var img = "data:image/jpg;base64," + contentData[i][key];
                  var tempdata = {
                    data: img,
                    userActive: false,
                    imgactive: true,
                    dataactivr: false,
                  };
                  this.datadynamic.push(tempdata);
                } else {
                  var tempdata = {
                    data: JSON.stringify(contentData[i][key]),
                    userActive: false,
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
  }

  onUsersDataShow(indexx) {
    this.finaluserarr = [];
    this.userarr[indexx].forEach(element => {
      this.finaluserarr.push(element);
    });
    console.log('userarr: ', this.userarr[indexx]);
    console.log('finaluserarr: ', this.finaluserarr);

    setTimeout(() => {
      document.getElementById('dt-sample123').scrollIntoView({
        behavior: 'smooth'
      });
    }, 1000);
  }

  onApproveClicked(item) {
    console.log(item);
    if (item.statusName === "CORP_APPROVER_PENDING") {
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
      var param = this.corpCheckerRequestService.approveCall(
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
    if (item.statusName === "CORP_APPROVER_PENDING") {
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
      var param = this.corpCheckerRequestService.rejectCall(
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
      .postResponsePromise(this.appConstants.corpCheckerReqUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log(res.result);
          showToastMessage(res.responseMessage);
          this.getCorporateCheckerRequests();
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.corpCheckerReqUrl, res);
        }
      });
  }

  closeActionModel() {
    this.finaluserarr = [];
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
          this.corpCheckerRequests.map((v) => (v.isApproveChecked = true));
          $("input.rejectall").attr("disabled", true);
          $("#rejectCheckBox").attr("disabled", true);
          this.actionButton = "Approve All";
          $(':input[type="submit"]').prop("disabled", false);
        } else {
          this.corpCheckerRequests.map((v) => (v.isApproveChecked = false));
          $("input.rejectall").attr("disabled", false);
          $("#rejectCheckBox").attr("disabled", false);
          $(':input[type="submit"]').prop("disabled", true);
        }
        break;
      case "reject":
        if ($("#rejectCheckBox").is(":checked")) {
          this.corpCheckerRequests.map((v) => (v.isRejectChecked = true));
          $("input.approveall").attr("disabled", true);
          $("#approveCheckBox").attr("disabled", true);
          this.actionButton = "Reject All";
          $(':input[type="submit"]').prop("disabled", false);
        } else {
          this.corpCheckerRequests.map((v) => (v.isRejectChecked = false));
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
      var newarray = this.corpCheckerRequests;
      this.finalarray = newarray.filter((f) => f.isApproveChecked == true);
      this.finalarray.forEach((el) => {
        el.type = "APPROVED";
      });
      console.log(this.finalarray);
      this.buildForm();
      openTinyModel1();
      this.selModel = "approveall";
    } else {
      var newarray = this.corpCheckerRequests;
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
        var objIndex = this.corpCheckerRequests.findIndex(
          (obj) => obj.id == item.id
        );
        if (this.corpCheckerRequests[objIndex].isApproveChecked == true) {
          this.corpCheckerRequests[objIndex].isApproveChecked = false;
        } else {
          this.corpCheckerRequests[objIndex].isApproveChecked = true;
        }
        if (
          this.corpCheckerRequests.find((el) => el.isApproveChecked == true)
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
        var objIndex = this.corpCheckerRequests.findIndex(
          (obj) => obj.id == item.id
        );
        if (this.corpCheckerRequests[objIndex].isRejectChecked == true) {
          this.corpCheckerRequests[objIndex].isRejectChecked = false;
        } else {
          this.corpCheckerRequests[objIndex].isRejectChecked = true;
        }
        if (
          this.corpCheckerRequests.find((el) => el.isRejectChecked == true)
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

          if(this.finalarray.activityName == 'corpCompanyUserRequestsAdd' || this.finalarray.activityName == 'corpCompanyUserRequestsEdit') {
            console.log('old content data: ', el.content);
            console.log(JSON.parse(el.content.split('~~')[1]));
            var itemCompanyData = JSON.parse(el.content.split('~~')[1]);
            var itemMenuData = el.content.split('~~')[2];
            var itemAccountData = el.content.split('~~')[3];
            var itemUserData = el.content.split('~~')[4];

            console.log('item company data: ', itemCompanyData);
            console.log('item Menu data: ', itemMenuData);
            console.log('item account data: ', itemAccountData);
            console.log('item user data: ', itemUserData);

            itemCompanyData.remark = formData.remark;
            itemCompanyData.createdByName = this.commonData.username;
            itemCompanyData.createdby = this.commonData.user_ID;
            itemCompanyData.roleName = this.commonData.roleType;
            el.createdBy = this.commonData.user_ID;
            el.statusId = 7;
            el.remark = formData.remark;

            var newContentData = '~~'+JSON.stringify(itemCompanyData)+ '~~'+ itemMenuData+ '~~'+ itemAccountData+ '~~'+ itemUserData;
            console.log('new content data: ', newContentData);

            el.content = newContentData;
            console.log(itemCompanyData);
            console.log(JSON.stringify(itemCompanyData));

          }
          else {
            var itemData = JSON.parse(el.content);
            itemData.remark = formData.remark;
            itemData.createdByName = this.commonData.username;
            itemData.createdby = this.commonData.user_ID;
            itemData.roleName = this.commonData.roleType;
            el.createdBy = this.commonData.user_ID;
            el.statusId = 7;
            el.remark = formData.remark;
            el.content = JSON.stringify(itemData);
          }
        });
        this.commonServiceCall
          .postResponsePromise(
            this.appConstants.updateStatusListByCorpChecker,
            this.finalarray
          )
          .subscribe((data) => {
            var res = data.resp;
            if (res.responseCode == "200") {
              this.commonMethod.hideLoader();
              console.log(res.result);
              showToastMessage(res.responseMessage);
              this.getCorporateCheckerRequests();
            } else {
              this.commonMethod.hideLoader();
              this.errorCallBack(
                this.appConstants.updateStatusListByCorpChecker,
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
          el.createdBy = this.commonData.user_ID;
          el.statusId = 6;
          el.remark = formData.remark;
          el.content = JSON.stringify(itemData);
        });
        this.commonServiceCall
          .postResponsePromise(
            this.appConstants.updateStatusListByCorpChecker,
            this.finalarray
          )
          .subscribe((data) => {
            var res = data.resp;
            if (res.responseCode == "200") {
              this.commonMethod.hideLoader();
              console.log(res.result);
              showToastMessage(res.responseMessage);
              this.getCorporateCheckerRequests();
            } else {
              this.commonMethod.hideLoader();
              this.errorCallBack(
                this.appConstants.updateStatusListByCorpChecker,
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
