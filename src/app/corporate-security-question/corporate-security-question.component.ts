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
import { CorporateSecurityQuestionService } from "./corporate-security-question.service";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-corporate-security-question",
  templateUrl: "./corporate-security-question.component.html",
  styleUrls: ["./corporate-security-question.component.css"],
})
export class CorporateSecurityQuestionComponent implements OnInit {
  id = 1400;
  menuLink = "corporateSecurityQuestion";
  masterSecurityQuestionForm: FormGroup;
  remarkForm: FormGroup;
  showForm: boolean = false;
  isAddButtonClicked = false;
  priviledgeDataArr: any = [];
  securityQuesArr = [];
  masterStatus = [];
  appList = [];

  formErrors = {
    question: "",
    appId: "",
    status: "",
    remark: "",
  };

  roleId: any;
  selModel: any;

  securityQuestionFields = {
    question: "",
    appId: "",
    status: "",
  };
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterSecurityQuestionService: CorporateSecurityQuestionService,
    public location: Location
  ) { }

  public buildForm() {
    this.masterSecurityQuestionForm = this.form.group({
      question: new FormControl("", [Validators.required]),
      appId: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
    });
    this.masterSecurityQuestionForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterSecurityQuestionForm,
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
    history.pushState(
      {},
      "self",
      this.location.prepareExternalUrl(this.router.url)
    );
    this.commonServiceCall.pageName = "Add Corporate Security Question";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getAppMasterList();
    this.getStatus();
    this.getLeftMenuId();
    this.masterSecurityQuestionForm.patchValue({
      status: 3,
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
        id = res.result[0].id;
        this.commonData.submenuId = res.result[0].id;
        this.commonData.submenuname = res.result[0].menuLink;
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
          this.getAllSecurityQuestionDetails();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterSecurityQuestionService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        if (data.status) {
          this.commonMethod.hideLoader();
          console.log("Data resp: ", data.resp);
          this.masterStatus = [];
          data.resp.forEach((el) => {
            if (el.id == 3 || el.id == 0) {
              this.masterStatus.push(el);
            }
          });
        } else {
          this.commonMethod.hideLoader();
          this.commonMethod.errorMessage(data);
        }
      });
  }

  getAppMasterList() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterListUrl)
      .subscribe((data) => {
        var res = data;
        console.log("response data: ", res);
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.appList = res.resp;
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterListUrl, res);
        }
      });
  }

  cancel() {
    this.showForm = !this.showForm;
    this.masterSecurityQuestionForm.reset();
    this.isAddButtonClicked = false;
    this.getAllSecurityQuestionDetails();
  }

  getAllSecurityQuestionDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getSecurityQuestions)
      .subscribe((data) => {
        $("#dt-sample").DataTable().clear().destroy();
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.getSecurityQuestions +
            "\n" +
            "Params={}",
            "view"
          );
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.securityQuesArr = res.result;
          // this.securityQuesArr.filter(x=>x.appname=="CORPORATE")
        } else {
          setTimeout(function () {
            $("table.display").DataTable({
              language: {
                emptyTable: "No Data found",
              },
            });
          });
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getSubMenuBymenuId, res);
        }
      });
  }

  addSecurityQuestion() {
    this.formValidation.markFormGroupTouched(this.masterSecurityQuestionForm);
    if (this.masterSecurityQuestionForm.valid) {
      var param = this.masterSecurityQuestionService.addSecurityQuestionCall(
        this.masterSecurityQuestionForm.value
      );
      console.log("request parameters: ", param);
      this.saveMasterSecurityQuestionDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterSecurityQuestionForm,
        this.formErrors,
        false
      );
    }
  }

  saveMasterSecurityQuestionDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.addSecurityQuestions, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.addSecurityQuestions +
            "\n" +
            "Params=" +
            JSON.stringify(param),
            "add"
          );

          this.getAllSecurityQuestionDetails();
          this.cancel();
          showToastMessage(res.responseMessage);
        } else {
          if (this.commonData.roleType == this.commonData.corpMakerRole) {
            this.masterSecurityQuestionForm.patchValue({
              question: this.securityQuestionFields.question,
              appId: this.securityQuestionFields.appId,
              status: this.securityQuestionFields.status,
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.addSecurityQuestions, res);
        }
      });
  }

  filterStatus() {
    return this.masterStatus.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  filterProduct() {
    return this.appList.filter((x) => x.shortName == "CORPORATE");
  }

  cancelClick() {
    this.router.navigateByUrl("/dashboard");
  }

  showHideForm() {
    this.showForm = !this.showForm;
    this.isAddButtonClicked = true;
    setTimeout(() => {
      // $('#sl_prdt').val('');
      $("#sl_appId").val("");
    });
    this.masterSecurityQuestionForm.patchValue({
      status: 3,
    });
  }

  gotoSecurityQuestionDetails(item) {
    console.log(item);
    if (
      item.statusname === "CORP_APPROVER_PENDING" &&
      this.commonData.roleType == this.commonData.corpMakerRole
    ) {
      showToastMessage("You Cannot Perform This Action");
    } else {
      this.commonData.submenuname = "corporateSecurityQuestionEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/corporateSecurityQuestionEdit", {
        state: { id: item.id },
      });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    if (this.masterSecurityQuestionForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.securityQuestionFields.question = formdata.question;
      this.securityQuestionFields.appId = formdata.appId;
      this.securityQuestionFields.status = formdata.status;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterSecurityQuestionForm,
        this.formErrors,
        false
      );
    }
  }

  addSecurityQuestionWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterSecurityQuestionService.addSecurityQuestionCallWithRemark(
        this.securityQuestionFields,
        formData
      );
      this.saveMasterSecurityQuestionDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.masterSecurityQuestionForm.patchValue({
      question: this.securityQuestionFields.question,
      appId: this.securityQuestionFields.appId,
      status: this.securityQuestionFields.status,
    });
    closeTinyModel();
  }
}
