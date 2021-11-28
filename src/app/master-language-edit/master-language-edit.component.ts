import { Component, OnInit } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";
import { Location } from "@angular/common";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { MasterLanguageEditService } from "./master-language-edit.service";
import { EncryptDecryptService } from "../encrypt-decrypt-service.service";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-master-language-edit",
  templateUrl: "./master-language-edit.component.html",
  styleUrls: ["./master-language-edit.component.css"],
})
export class MasterLanguageEditComponent implements OnInit {
  configLanguageForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    englishText: "",
    languagecode: "",
    languageText: "",
    isActive: "",
    productType: "",
    remark: "",
  };

  masterLocationFields = {
    englishText: "",
    languagecode: "",
    languageDesc: "",
    languageText: "",
    isActive: "",
  };

  roleId: any;
  selModel: any;
  languageArray: any = [];
  masterStatus:any=[]
  productTypes = [];
  selectedLanguage: any;
  masterLanguage: any;
  beforeParam: any = [];
  remarkHistoryArr: any = [];
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterLangEditService: MasterLanguageEditService,
    private encryptDecryptService: EncryptDecryptService
  ) {
    this.getLanguage();
  }

  public buildForm() {
    this.configLanguageForm = this.form.group({
      englishText: new FormControl("", [
        Validators.required,
        Validators.maxLength(80),
        Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_ ]+$/),
      ]),
      languagecode: new FormControl("", [Validators.required]),
      languageText: new FormControl("", [
        Validators.required,
        Validators.maxLength(80),
      ]),
      isActive: new FormControl("", [Validators.required]),
      // productType: new FormControl('', [Validators.required]),
      /* languageText validation removed */
      // Validators.pattern(/^[^<>!~`@#$%^&*-/*+]+$/)
      // productType: new FormControl('', [Validators.required]),
    });
    this.configLanguageForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.configLanguageForm,
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
      this.router.navigateByUrl('/masterLanguage');
      return;
    }

    this.commonServiceCall.pageName = "Edit Language";
    this.roleId = this.commonData.roleId;
    this.masterLanguage = this.location.getState();
    this.buildForm();
    this.getStatus();
    // this.getAppMasterList();
    this.getLanguageJsonById(this.masterLanguage.id);
    this.getRemarkHistoryData(this.masterLanguage.id);
  }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.masterStatus = [];
        data.resp.forEach(el => {
          if(el.id== 3 || el.id == 0){
            this.masterStatus.push(el);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  /*filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB"  || x.shortName == "IVR"  || x.shortName == "ALEXA"  || x.shortName == "WHATSAPP");
  }*/

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
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterLangEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  filterProducts() {
    return this.productTypes.filter(
      (x) =>
        x.shortName == "WALLET" ||
        x.shortName == "MOBILE" ||
        x.shortName == "DESKTOP" ||
        x.shortName == "CORPORATE"
    );
  }
  //on load functions
  /*getAppMasterList(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      console.log('response data: ', res);
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.productTypes = res.resp;
        console.log('response array: ', this.productTypes);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }*/

  getLanguageJsonById(langId) {
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getLanguageJSONByIdUrl + langId;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe((data) => {
      var res = data.resp;
      if (res) {
        this.commonMethod.hideLoader();
        this.selectedLanguage = res[0];
        this.beforeParam = res[0];
        // var decryptedLangText = this.encryptDecryptService.decryptText(res[0].languagetext, this.appConstants.languageKey);
        //   console.log('decryptedLangText: ', decryptedLangText);
        console.log(res);
        console.log(res[0].shortname);
        if (res[0].userAction != null) {
          this.configLanguageForm.patchValue({
            englishText: res[0].englishtext,
            languagecode: res[0].languagecode + "-" + res[0].languagecodedesc,
            languageText: res[0].languagetext,
            isActive: res[0].userAction,
            productType: res[0].appid,
          });
        }
        else {
          this.configLanguageForm.patchValue({
            englishText: res[0].englishtext,
            languagecode: res[0].languagecode + "-" + res[0].languagecodedesc,
            languageText: res[0].languagetext,
            isActive: res[0].statusid,
            productType: res[0].appid,
          });
        }
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getLanguageJSONByIdUrl, res);
      }
    });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.configLanguageForm);
    if (this.configLanguageForm.valid) {
      var formData = this.configLanguageForm.value;
      var param = this.masterLangEditService.updateLanguageJSON(
        this.configLanguageForm.value
      );
      this.updateLanguageJson(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.configLanguageForm,
        this.formErrors,
        false
      );
    }
  }

  gotoLangPage() {
    //  this.router.navigateByUrl("/masterLanguage");
    if (this.commonServiceCall.makerRequestEditUrl == "/masterLanguage") {
      this.router.navigateByUrl("/masterLanguage");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/masterLanguage");
    }
  }

  callBackFunction() {
    this.router.navigateByUrl("/masterLanguage");
  }

  updateLanguageJson(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateLanguageJSONUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.updateLanguageJSONUrl +
              "\n" +
              "Params=" +
              JSON.stringify(param) +
              "\n" +
              "Before Update Params=" +
              JSON.stringify(this.beforeParam),
            "update"
          );
          showToastMessage(res.responseMessage);
          this.gotoLangPage();
        } else {
          if (this.commonData.roleType == this.commonData.makerRole) {
            this.configLanguageForm.patchValue({
              englishText: this.masterLocationFields.englishText,
              languagecode: this.masterLocationFields.languagecode,
              languageText: this.masterLocationFields.languageText,
              isActive: this.masterLocationFields.isActive,
            });
          }
          this.errorCallBack(this.appConstants.updateLanguageJSONUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    console.log('formdata: ', formdata);
    if (this.configLanguageForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterLocationFields.englishText = formdata.englishText;
      this.masterLocationFields.languagecode = formdata.languagecode;
      this.masterLocationFields.languageText = formdata.languageText;
      this.masterLocationFields.isActive = formdata.isActive;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.configLanguageForm,
        this.formErrors,
        false
      );
    }
    console.log(this.masterLocationFields);
  }

  updateMasterLocationWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterLangEditService.updateLanguageJSONWithRemark(
        this.masterLocationFields,
        formdata
      );
      this.updateLanguageJson(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.configLanguageForm.patchValue({
      englishText: this.masterLocationFields.englishText,
      languagecode: this.masterLocationFields.languagecode,
      languageText: this.masterLocationFields.languageText,
      isActive: this.masterLocationFields.isActive,
    });
    closeTinyModel();
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
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
        } else if (res.responseCode == "202") {
          setTimeout(function () {
            $("table.display").DataTable({
              language: {
                emptyTable: "No Data found",
              },
            });
          });
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
        }
      });
  }
}
