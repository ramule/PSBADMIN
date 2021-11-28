import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  Form,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { MasterSecurityQuestionEditService } from "./master-security-question-edit.service";
import { Location } from "@angular/common";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-master-security-question-edit",
  templateUrl: "./master-security-question-edit.component.html",
  styleUrls: ["./master-security-question-edit.component.css"],
})
export class MasterSecurityQuestionEditComponent implements OnInit {
  beforeParam: any = [];
  masterSecurityQuestionForm: FormGroup;
  secQuestionsData: any;
  remarkForm: FormGroup;
  masterStatus = [];
  appList = [];
  masterSecQuestion: any;
  remarkHistoryArr: any = [];

  formErrors = {
    question: "",
    appId: "",
    status: "",
    remark: "",
  };

  masterSecurityFields = {
    question: "",
    status: "",
    appId: "",
  };

  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private masterSecurityQuestionEditService: MasterSecurityQuestionEditService
  ) {}

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

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/securityQuestion');
      return;
    }

    this.masterSecQuestion = this.location.getState();
    this.commonServiceCall.pageName = "Edit Security Question";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getAppMasterList();
    this.getStatus();
    console.log(this.masterSecQuestion);
    this.getRemarkHistoryData(this.masterSecQuestion.id);
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
          this.getAllSecurityQuestionDetailsById(
            this.location.getState()["id"]
          );
          console.log("response data: ", res);
          this.appList = res.resp;
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterListUrl, res);
        }
      });
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterSecurityQuestionEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  getAllSecurityQuestionDetailsById(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getSecurityQuestionById + id)
      .subscribe((data) => {
       // $("#dt-sample").DataTable().clear().destroy();
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.beforeParam = res.result[0];
          this.commonMethod.hideLoader();
          var result = res.result[0];
          this.secQuestionsData = res.result[0];
          console.log("menu: ", res.result);
          if (
            res.result[0].userAction != null
          ) {
            this.masterSecurityQuestionForm.patchValue({
              question: result.question,
              status: result.userAction,
              appId: result.appid,
            });
          } else {
            this.masterSecurityQuestionForm.patchValue({
              question: result.question,
              status: result.statusid,
              appId: result.appid,
            });
          }

          console.log("response data: ", res);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getSecurityQuestionById, res);
        }
      });
  }

  updateSecurityQuestion() {
    this.formValidation.markFormGroupTouched(this.masterSecurityQuestionForm);
    if (this.masterSecurityQuestionForm.valid) {
      var formData = this.masterSecurityQuestionForm.value;
      var param = this.masterSecurityQuestionEditService.updateMasterProductCall(
        this.masterSecurityQuestionForm.value,
        this.location.getState()["id"],
        this.secQuestionsData
      );
      console.log("request parameters: ", param);
      this.updateMasterSecurityQuesDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterSecurityQuestionForm,
        this.formErrors,
        false
      );
    }
  }

  updateMasterSecurityQuesDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateSecurityQuestions, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.updateSecurityQuestions +
              "\n" +
              "Params=" +
              JSON.stringify(param) +
              "\n" +
              "Before Update Params=" +
              JSON.stringify(this.beforeParam),
            "update"
          );

          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          if(this.commonData.roleType == this.commonData.makerRole) {
            this.masterSecurityQuestionForm.patchValue({
              question: this.masterSecurityFields.question,
              status: this.masterSecurityFields.status,
              appId: this.masterSecurityFields.appId,
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.updateSecurityQuestions, res);
        }
      });
  }

  cancel() {
    //  this.router.navigateByUrl('/securityQuestion');
    if (this.commonServiceCall.makerRequestEditUrl == "/securityQuestion") {
      this.router.navigateByUrl("/securityQuestion");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/securityQuestion");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  filterStatus() {
    return this.masterStatus.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  filterProduct() {
    return this.appList.filter(
      (x) =>
        x.shortName == "WALLET" ||
        x.shortName == "MOBILE" ||
        x.shortName == "DESKTOP" ||
        x.shortName == "TAB"
    );
  }

  openActionModel(action, formdata) {
    if (this.masterSecurityQuestionForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterSecurityFields.question = formdata.question;
      this.masterSecurityFields.status = formdata.status;
      this.masterSecurityFields.appId = formdata.appId;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterSecurityQuestionForm,
        this.formErrors,
        false
      );
    }
  }

  updateMasterSecurityWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterSecurityQuestionEditService.updateMasterProductCallWithRemark(
        this.masterSecurityFields,
        this.location.getState()["id"],
        this.secQuestionsData,
        formdata
      );
      this.updateMasterSecurityQuesDetails(param);
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
      question: this.masterSecurityFields.question,
      status: this.masterSecurityFields.status,
      appId: this.masterSecurityFields.appId,
    });
    closeTinyModel();
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();

    this.commonServiceCall
      .getResponsePromise(
        this.appConstants.getRemarkHistoryDataUrl +
          id +
          "/" +
          this.commonData.submenuId
      )
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.remarkHistoryArr = res.result;
          //initiallize datatable
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.commonMethod.hideLoader();
        } else if (res.responseCode == "202"){
          setTimeout(function () {
            $('table.display').DataTable({
              "language": {
                "emptyTable" : "No Data found"
              }})});
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
        }
      });
  }
}
