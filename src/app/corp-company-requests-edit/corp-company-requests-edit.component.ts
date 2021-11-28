import { Component, OnInit } from "@angular/core";
import { DatePipe, Location } from "@angular/common";
import { CorpCompanyRequestsEditService } from "./corp-company-requests-edit.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare function openTinyModel1(): any;
declare function closeTinyModel1(): any;
declare function openTinyModel3(): any;
declare function closeTinyModel3(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-corp-company-requests-edit",
  templateUrl: "./corp-company-requests-edit.component.html",
  styleUrls: ["./corp-company-requests-edit.component.css"],
})
export class CorpCompanyRequestsEditComponent implements OnInit {
  corpCompanyRequestsEditForm: FormGroup;
  // testForm: FormGroup;
  // testflag: boolean = false;
  remarkForm: FormGroup;
  selModel: any;
  displayImage: any;
  roleId: any;
  corpCompanyId: any;
  corpCompanyDetils: any;
  todayDate: any;
  approvRejectValue: any;
  selCorpCompanyRequest: any = [];d
  companyArr: any = [];
  remarkHistoryArr: any = [];
  corpCompanyMenuArr: any = [];
  corpCompanyAccountsArr: any = [];
  corpUsersArr: any = [];
  corpUsersAccountsArr: any = [];
  corpUsersMenusArr: any = [];

  /* these arrays are specially created as per requests parameters */
  corpCompanyrequMenuArr: any = [];
  corpCompanyrequAccountsArr: any = [];
  corpUsersReqArr: any = [];
  corpUsersReqMenuMapDataArr: any = [];
  corpUsersReqAccMapDataArr: any = [];

  documentsObj = {
    coi: '',
    moa: '',
    pancard: '',
    logo: '',
    otherdocs: ''
  }

  status = [];
  formErrors = {
    corpCompanyName: "",
    corpCompanyInfo: "",
    rrn: "",
    cif: "",
    establishmentOn: "",
    status: "",
    phoneNo: "",
    pancardNo: "",
    remark: "",
  };

  corpCompanyRequestsFields = {
    corpCompanyName: "",
    corpCompanyInfo: "",
    rrn: "",
    cif: "",
    establishmentOn: "",
    phoneNo: "",
    pancardNo: "",
    status: "",
  };
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe,
    private corpCompanyRequestsEditService: CorpCompanyRequestsEditService,
    public location: Location
  ) {}

  public buildForm() {
    this.corpCompanyRequestsEditForm = this.form.group({
      corpCompanyName: new FormControl("", [Validators.required]),
      corpCompanyInfo: new FormControl("", [Validators.required]),
      rrn: new FormControl("", [Validators.required]),
      cif: new FormControl("", [Validators.required]),
      pancardNo: new FormControl("", [Validators.required]),
      phoneNo: new FormControl("", [Validators.required]),
      establishmentOn: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
    });
    this.corpCompanyRequestsEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.corpCompanyRequestsEditForm,
        this.formErrors,
        true
      );
    });

    if (this.selModel == "remarkField") {
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
  }

  ngOnInit() {
    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/corpCompanyRequests');
      return;
    }

    this.commonServiceCall.pageName = "Corporate Company Requests Edit";
    this.corpCompanyDetils = this.location.getState();
    console.log(this.corpCompanyDetils);
    this.getCorpJs();
    this.getCorpCompanyRequestsById(this.corpCompanyDetils.id);
    this.buildForm();
    this.getStatus();
    this.getCorpCompanies();
  }

  // goToTestForm() {
  //   this.testflag = true;
  // }
  // onCancelClick(type) {
  //   this.testflag = false;
  // }

  getCorpJs() {
    /*=========Wizard Next Previous Script::=========*/

    $(document).ready(function () {
      var navListItems = $("div.setup-panel div a"),
        allWells = $(".setup-content"),
        allNextBtn = $(".nextBtn"),
        allprevBtn = $(".prevBtn");

      allWells.hide();

      navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr("href")),
          $item = $(this);

        if (!$item.hasClass("disabled")) {
          navListItems.removeClass("btn-primary").addClass("btn-default");
          $item.addClass("btn-primary");
          allWells.hide();
          $target.show();
          $target.find("input:eq(0)").focus();
        }
      });

      allNextBtn.click(function () {

        var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $(
            'div.setup-panel div a[href="#' + curStepBtn + '"]'
          )
            .parent()
            .next()
            .children("a"),
          isValid = true;

        if (isValid) {
          nextStepWizard.removeAttr("disabled").trigger("click");
        }
      });
      allprevBtn.click(function () {

        var curStep1 = $(this).closest(".setup-content"),
          curStepBtn1 = curStep1.attr("id"),
          prevStepWizard = $(
            'div.setup-panel div a[href="#' + curStepBtn1 + '"]'
          )
            .parent()
            .prev()
            .children("a"),
          curInputs1 = curStep1.find("input[type='text'],input[type='url']"),
          isValid = true;

        if (isValid) {
          prevStepWizard.removeAttr("disabled").trigger("click");
        }
      });

      $("div.setup-panel div a.btn-primary").trigger("click");

      $("body").on("click", ".setup-content .nextBtn", function () {
        var prevSteps = $(".stepwizard")
          .find(".btn-primary")
          .parent()
          .prevAll("div")
          .find("a");
        prevSteps.addClass("completed");
      });
    });

    /*=========Wizard Next Previous Script End Here::=========*/
  }

  onStpClicked() {
    $('#stp1').prop("disabled", true);
    $('#stp2').prop("disabled", true);
    $('#stp3').prop("disabled", true);
    $('#stp4').prop("disabled", true);
  }

  getCorpMenuAndAccountsByCompId(companyId) {
    $('#dt-sample1').DataTable().clear().destroy();
    $('#dt-sample2').DataTable().clear().destroy();
    $('#dt-sample3').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCorpMenuAndAccCompanyIdUrl, companyId).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.corpCompanyMenuArr = res.result.corpMenuList;
        console.log('Menus array: ', this.corpCompanyMenuArr);
        this.corpCompanyAccountsArr = res.result.corpAccList;
        console.log('Accounts array: ', this.corpCompanyAccountsArr);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else {
        this.errorCallBack(this.appConstants.getCorpMenuAndAccCompanyIdUrl, res);
      }
      $('#dt-sample1').DataTable().clear().destroy();
      $('#dt-sample2').DataTable().clear().destroy();
      this.commonMethod.hideLoader();
    });
  }

  onNextClick(type) {
    if(type == 'step1') {
      $('#stp1').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
    else if(type == 'step2') {
      $('#stp1').attr('disabled', 'disabled');
      $('#stp2').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
    else if(type == 'step3') {
      $('#stp1').attr('disabled', 'disabled');
      $('#stp2').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
    }
    else if(type == 'step2Back') {
      $('#stp2').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
    else if(type == 'step3Back') {
      $('#stp1').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
    else if(type == 'step4Back') {
      $('#stp1').attr('disabled', 'disabled');
      $('#stp2').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
    var param = this.corpCompanyRequestsEditService.getCorpCompanyIdCall(this.corpCompanyDetils.id);
    this.getCorpMenuAndAccountsByCompId(param);
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
          this.status = res.resp;
          console.log("response array: ", this.status);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  filterStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  getCorpCompanies() {
    this.commonMethod.showLoader();
    this.companyArr = [];
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log("response data: ", res);
          this.companyArr = res.result;
          this.companyArr.filter((f) => f.status == 3);
        } else {
          this.errorCallBack(this.appConstants.configMasterurl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  getCorpCompanyRequestsById(id) {
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getCorpCompRequestsByIdUrl;
    var param = this.corpCompanyRequestsEditService.getCorpCompanyReqDetailByIdCall(
      id
    );

    this.commonServiceCall
      .postResponsePromise(reqUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        this.selCorpCompanyRequest = res.result[0];
        console.log('updatable data response: ', this.selCorpCompanyRequest);

        this.documentsObj.coi = "data:image/jpg;base64," + this.selCorpCompanyRequest.coi;
        this.documentsObj.moa = "data:image/jpg;base64," + this.selCorpCompanyRequest.moa;
        this.documentsObj.logo = "data:image/jpg;base64," + this.selCorpCompanyRequest.logo;
        this.documentsObj.pancard =
          "data:image/jpg;base64," + this.selCorpCompanyRequest.pancardNo;
        this.documentsObj.otherdocs =
          "data:image/jpg;base64," + this.selCorpCompanyRequest.otherDoc;

        if (res.responseCode == "200") {
          if (res.result[0].userAction != null) {
            this.corpCompanyRequestsEditForm.patchValue({
              corpCompanyName: res.result[0].companyName,
              corpCompanyInfo: res.result[0].companyInfo,
              rrn: res.result[0].rrn,
              cif: res.result[0].cif,
              pancardNo: res.result[0].pancardNo,
              phoneNo: res.result[0].phoneNo,
              establishmentOn: this.datePipe.transform(
                this.selCorpCompanyRequest.establishmentOn,
                "yyyy-MM-dd"
              ),
              status: res.result[0].userAction,
            });
          } else {
            this.corpCompanyRequestsEditForm.patchValue({
              corpCompanyName: res.result[0].companyName,
              corpCompanyInfo: res.result[0].companyInfo,
              rrn: res.result[0].rrn,
              cif: res.result[0].cif,
              pancardNo: res.result[0].pancardNo,
              phoneNo: res.result[0].phoneNo,
              establishmentOn: this.datePipe.transform(
                this.selCorpCompanyRequest.establishmentOn,
                "yyyy-MM-dd"
              ),
              status: res.result[0].statusId,
            });
          }
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getCorpCompRequestsByIdUrl, res);
        }
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onCompanyChange(event) {
    console.log(event);
    this.corpCompanyId = event.target.value;
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/corpCompanyRequests") {
      this.router.navigateByUrl("/corpCompanyRequests");
    } else if (
      this.commonServiceCall.makerRequestEditUrl == "/corpMakerRequests"
    ) {
      this.router.navigateByUrl("/corpMakerRequests");
    } else {
      this.router.navigateByUrl("/corpCompanyRequests");
    }
  }

  verifyAccounts(type) {
    this.commonMethod.showLoader();
    var param = {
      "corpAccList": this.corpCompanyAccountsArr
    }
    this.commonServiceCall
      .postResponsePromise(this.appConstants.verifyAccountNumberUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);

        if (res.responseCode == "200") {

          if(type== 'step3') {
            $('#stp1').attr('disabled', 'disabled');
            $('#stp2').attr('disabled', 'disabled');
            $('#stp3').attr('disabled', 'disabled');
          }

           var nextStepWizard = $(
              'div.setup-panel div a[href="#step-3"]'
            )
              .parent()
              .next()
              .children("a")
            var isValid = true;

          if (isValid) nextStepWizard.removeAttr("disabled").trigger("click");

            var prevSteps = $(".stepwizard")
              .find(".btn-primary")
              .parent()
              .prevAll("div")
              .find("a");
            prevSteps.addClass("completed");
          console.log("response data: ", res);
          showToastMessage(res.responseMessage);
          var param = this.corpCompanyRequestsEditService.getCorpUserCall(this.corpCompanyDetils.id);
          this.getAllCorpUsersByCompanyId(param);
        } else if(res.responseCode == "202") {
          showToastMessage(res.responseMessage);
          this.cancel();
          this.commonMethod.hideLoader();
        } else {
          this.errorCallBack(this.appConstants.verifyAccountNumberUrl, res);
          this.commonMethod.hideLoader();
        }
      });
  }

  getAllCorpUsersByCompanyId(param) {
    $('#dt-sample1').DataTable().clear().destroy();
    $('#dt-sample2').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getAllCorpUsersByCompIdUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.corpUsersArr = res.result;
        console.log('corp users array: ', this.corpUsersArr);
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
      } else {
        this.errorCallBack(this.appConstants.getAllCorpUsersByCompIdUrl, res);
      }
      this.commonMethod.hideLoader();
      $('#dt-sample3').DataTable().clear().destroy();
    });
  }

  getAccountsMappedData(item) {
    var param = {
      "userReqId": item.id
    };
    this.selModel = "corpAccounts";
    openTinyModel3();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getAccountListByCorpUserIdUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.corpUsersAccountsArr = res.result;
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if (res.responseCode == "202"){
        setTimeout(function () {
          $('#dt-sample4').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
      } else {
        this.errorCallBack(this.appConstants.getAccountListByCorpUserIdUrl, res);
      }
      this.commonMethod.hideLoader();
      $('#dt-sample4').DataTable().clear().destroy();
    });
  }

  getMenusMappedData(item) {
    var param = {
      "userReqId": item.id
    };
    this.selModel = "corpMenus";
    openTinyModel();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getMenuListByCorpUserIdUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.corpUsersMenusArr = res.result;
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if (res.responseCode == "202"){
        setTimeout(function () {
          $('#dt-sample5').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
      } else {
        this.errorCallBack(this.appConstants.getMenuListByCorpUserIdUrl, res);
      }
      this.commonMethod.hideLoader();
      $('#dt-sample5').DataTable().clear().destroy();
    });
  }

  closeActionModel(type) {
    if(type == "corpAccounts") {
      $('#dt-sample4').DataTable().clear().destroy();
      closeTinyModel3();
    }
    else if(type == "corpMenus") {
      $('#dt-sample5').DataTable().clear().destroy();
      closeTinyModel();
    }
    else if(type == "remarkField") {
      this.corpCompanyRequestsEditForm.patchValue({
        corpCompanyName: this.corpCompanyRequestsFields.corpCompanyName,
        corpCompanyInfo: this.corpCompanyRequestsFields.corpCompanyInfo,
        cif: this.corpCompanyRequestsFields.cif,
        rrn: this.corpCompanyRequestsFields.rrn,
        pancardNo: this.corpCompanyRequestsFields.pancardNo,
        phoneNo: this.corpCompanyRequestsFields.phoneNo,
        establishmentOn: this.corpCompanyRequestsFields.establishmentOn,
        status: this.corpCompanyRequestsFields.status,
      });
      this.remarkForm.reset();
      closeTinyModel1();
    }
    else {
      closeTinyModel1();
    }
  }

  openActionModal(formdata, approveRejectVal) {
    this.approvRejectValue = approveRejectVal;
    openTinyModel1();
    this.selModel = "remarkField";
    this.buildForm();
    this.corpCompanyRequestsFields.corpCompanyName = formdata.corpCompanyName;
    this.corpCompanyRequestsFields.corpCompanyInfo = formdata.corpCompanyInfo;
    this.corpCompanyRequestsFields.cif = formdata.cif;
    this.corpCompanyRequestsFields.rrn = formdata.rrn;
    this.corpCompanyRequestsFields.pancardNo = formdata.pancardNo;
    this.corpCompanyRequestsFields.phoneNo = formdata.phoneNo;
    this.corpCompanyRequestsFields.establishmentOn = formdata.establishmentOn;
    this.corpCompanyRequestsFields.status = formdata.status;
  }

  onSubmitData(formdata) {
    if(this.remarkForm.valid) {
      closeTinyModel();
      this.corpCompanyrequMenuArr = [];
      this.corpCompanyrequAccountsArr = [];
      this.corpUsersReqArr = [];
      this.corpUsersReqMenuMapDataArr = [];
      this.corpUsersReqAccMapDataArr = [];

      /* Pushing data into new arrays which should be similar to requests params */
      this.corpCompanyMenuArr.forEach(element => {
        var param = {
          "corpReqId": element.corpReqId,
          "menuReqId": element.menuReqId,
          "updatedby": element.updatedby
        }
        this.corpCompanyrequMenuArr.push(param);
        console.log('corp menus array:', this.corpCompanyrequMenuArr);
      });

      this.corpCompanyAccountsArr.forEach(element => {
        var param = {
          "corpReqId": element.corpReqId,
          "accountNo": element.accountNo,
          "updatedby": element.updatedby
        }
        this.corpCompanyrequAccountsArr.push(param);
        console.log('corp accounts array:', this.corpCompanyrequAccountsArr);
      });

      this.corpUsersArr.forEach(element => {
        var param = {
          "userName": element.userName,
          "firstName": element.firstName,
          "lastName": element.lastName,
          "email": element.email,
          "mobile": element.mobile,
          "dob": element.dob,
          "pancardNo": element.pancardNo,
          "rrn": element.rrn,
          "corpRoleId": element.corpRoleId,
          "aadharCard": element.aadharCard,
          "passport": element.passport,
          "passportNo": element.passportNo,
          "token": element.token,
          "boardResolution": element.boardResolution,
          "userImage": element.userImage,
          "aadharCardNo": element.aadharCardNo,
          "otherDoc": element.otherDoc,
          "certificateIncorporation": element.certificateIncorporation,
          "designation": element.designation,
          "parentRrn": element.parentRrn,
          "updatedby": element.updatedby,
          "corpRoleName": element.corpRoleName,
          "companyName": element.companyName,
          "parentRoleId":element.parentRoleId,
          "parentRoleName":element.parentRoleName,
          "parentUserName":element.parentUserName
        }
        this.corpUsersReqArr.push(param);
        console.log('corp user data: ', this.corpUsersReqArr);
      });

      for(var i = 0; i< this.corpUsersArr.length; i++) {

        if(this.corpUsersArr[0].corpUserMenuData) {
          /* Extracted lenghts of user and account map data */
          var corpUserMenuDataLength = this.corpUsersArr[0].corpUserMenuData.length;

          for(var j = 0; j< corpUserMenuDataLength; j++) {
            if(this.corpUsersArr[i].id == this.corpUsersArr[0].corpUserMenuData[j].userReqId) {
              var param1 = {
                "corpCompId": this.corpUsersArr[0].corpUserMenuData[j].corpCompId,
                "corpMenuId": this.corpUsersArr[0].corpUserMenuData[j].menuReqId,
                "corpUserId": this.corpUsersArr[0].corpUserMenuData[j].userReqId,
                "userRrn": this.corpUsersArr[0].corpUserMenuData[j].userRrn,
              };

              this.corpUsersReqMenuMapDataArr.push(param1);
            }
          }
        }

        if(this.corpUsersArr[0].corpUserAccData) {
          var corpUserAccDataLength = this.corpUsersArr[0].corpUserAccData.length;
          for(var k = 0; k< corpUserAccDataLength; k++) {
            if(this.corpUsersArr[i].id == this.corpUsersArr[0].corpUserAccData[k].userReqId) {
              var param2 = {
                "corpCompId": this.corpUsersArr[0].corpUserAccData[k].corpCompId,
                "accountNo": this.corpUsersArr[0].corpUserAccData[k].accountNo,
                "corpUserId": this.corpUsersArr[0].corpUserAccData[k].userReqId,
                "userRrn": this.corpUsersArr[0].corpUserAccData[k].userRrn,
              };

              this.corpUsersReqAccMapDataArr.push(param2);
            }
          }
        }
      }
      console.log('corp user menu mapped data:', this.corpUsersReqMenuMapDataArr);
      console.log('corp user account mapped data:', this.corpUsersReqAccMapDataArr);

      var param = this.corpCompanyRequestsEditService.submitCorpCompanyRequest(this.corpCompanyDetils.id, this.corpCompanyRequestsFields, this.corpCompanyrequMenuArr, this.corpCompanyrequAccountsArr, this.corpUsersReqArr, this.corpUsersReqMenuMapDataArr, this.corpUsersReqAccMapDataArr, this.documentsObj, this.selCorpCompanyRequest, this.remarkForm.value, this.approvRejectValue);
      this.onApproveCorpCompany(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  onApproveCorpCompany(param) {
    console.log(param);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.saveAllCorpDataUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200" || res.responseCode == "202") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.cancel();
          showToastMessage(res.responseMessage);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.saveAllCorpDataUrl, res);
        }
      });
  }

  getLogoImage(item, type) {
    this.selModel = "Image";
    if(type == 'boardResolution') {
      if (item.boardResolution === null || item.boardResolution === "" || item.boardResolution === undefined) {
        showToastMessage("Board Resolution Image Not Available");
      }
      else {
        this.displayImage = item.boardResolution;
        openTinyModel1();
      }
    }
    else if(type == 'certificateIncorporation') {
      if (item.certificateIncorporation === null || item.certificateIncorporation === "" || item.certificateIncorporation === undefined) {
        showToastMessage("COI Image Not Available");
      }
      else {
        this.displayImage = item.certificateIncorporation;
        openTinyModel1();
      }
    }
    else if(type == 'passport') {
      if (item.passport === null || item.passport === "" || item.passport === undefined) {
        showToastMessage("Passport Image Not Available");
      }
      else {
        this.displayImage = item.passport;
        openTinyModel1();
      }
    }
    else if(type == 'aadharCard') {
      if (item.aadharCard === null || item.aadharCard === "" || item.aadharCard === undefined) {
        showToastMessage("Aadhar Card Image Not Available");
      }
      else {
        this.displayImage = item.aadharCard;
        openTinyModel1();
      }
    }
    else if(type == 'userImage') {
      if (item.userImage === null || item.userImage === "" || item.userImage === undefined) {
        showToastMessage("User Image Not Available");
      }
      else {
        this.displayImage = item.userImage;
        openTinyModel1();
      }
    }
    else if(type == 'otherDoc') {
      if (item.otherDoc === null || item.otherDoc === "" || item.otherDoc === undefined) {
        showToastMessage("Other Document Image Not Available");
      }
      else {
        this.displayImage = item.otherDoc;
        openTinyModel1();
      }
    }
  }
}
