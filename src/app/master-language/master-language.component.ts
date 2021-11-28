import { Component, OnInit } from "@angular/core";
import * as CryptoJS from 'crypto-js';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";

import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { MasterLanguageService } from "./master-language.service";
import { Location } from "@angular/common";
import { EncryptDecryptService } from "../encrypt-decrypt-service.service";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-master-language",
  templateUrl: "./master-language.component.html",
  styleUrls: ["./master-language.component.css"],
})
export class MasterLanguageComponent implements OnInit {
  id = 14;
  menuLink = "masterLanguage";
  configLanguageForm: FormGroup;
  remarkForm: FormGroup;
  languageArray: any = [];
  formErrors = {
    englishText: "",
    // languageCode: '',
    // languageText:'',
    // isActive:'',
    remark: "",
  };

  masterLocationFields = {
    englishText: "",
    // languageCode: '',
    // languageText: '',
    // isActive: '',
  };

  roleId: any;
  selModel: any;

  //feild parameter
  menuLanguage: any = [];
  menuLanguageFinal: any = [];
  priviledgeDataArr: any = [];
  newMenuLanguage: any = [];
  productTypes = [];
  p: number = 1;
  selectedLanguage: any = "";

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterLanguageService: MasterLanguageService,
    private location: Location,
    private encryptDecryptService: EncryptDecryptService
  ) {}

  ngOnInit() {
    this.commonServiceCall.pageName = "Language";
    this.roleId = this.commonData.roleId;
    history.pushState(
      {},
      "self",
      this.location.prepareExternalUrl(this.router.url)
    );
    this.getLanguage();
    this.getLeftMenuId();
  }

  addLangFormGroup(): FormGroup {
    return this.form.group({
      languageCode: ["", Validators.required],
      languageText: ["", Validators.required],
    });
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

  // onLanguageSelect(event) {
  //   console.log(event.target.value);
  //   var params = this.masterLanguageService.getLanguageParamsCall(
  //     event.target.value
  //   );
  //   this.getLanguageJsonDataByLangCode(params);
  // }

  getLanguageJsonDataByLangCode(param) {
    this.commonMethod.destroyDataTable();
    console.log(param);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(
        this.appConstants.getLanguageJsonByLangCodeUrl,
        param
      )
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          console.log(res);
          this.menuLanguage = res.result;
          console.log('menuLanguage: ', this.menuLanguage);
          this.menuLanguage.forEach(element => {
            // var decryptedLangText = this.encryptDecryptService.decryptText(element.languagetext, this.appConstants.languageKey);
            // console.log('decryptedLangText: ', decryptedLangText);

            var param = {
              "id": element.id,
              "englishtext": element.englishtext,
              "languagecode": element.languagecode,
              "languagecodedesc": element.languagecodedesc,
              "languagetext": element.languagetext,
              "statusId": element.statusId,
              "statusName": element.statusName,
              "createdon": element.createdon,
              "createdby": element.createdby,
              "createdByName": element.createdByName
            }

            this.menuLanguageFinal.push(param);
          });
          console.log('menuLanguageFinal', this.menuLanguageFinal);
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          console.log("menu language: ", this.menuLanguage);
        } else if (res.responseCode == "202") {
          setTimeout(function () {
            $("table.display").DataTable({
              language: {
                emptyTable: "No Data found",
              },
            });
          });
        } else {
          this.errorCallBack(
            this.appConstants.getLanguageJsonByLangCodeUrl,
            res
          );
        }
        this.commonMethod.hideLoader();
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
          var param = this.masterLanguageService.getLanguageParamsCall('en');
          this.getLanguageJsonDataByLangCode(param);
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterLanguageService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  showHideForm() {
    this.router.navigateByUrl("masterLanguageAdd");
  }

  cancelClick() {
    this.commonMethod.cancel();
    (this.configLanguageForm.controls["credentials"] as FormArray).clear();
  }

  destroyDataTable() {
    console.log("destroy datatable called...");
    $("#dt-sample").DataTable().clear().destroy();
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

  gotoMasterLang(item) {
    console.log(item);
    if (
      item.statusName === "ADMIN APPROVER PENDING" &&
      this.commonData.roleType == this.commonData.makerRole
    ) {
      showToastMessage("You Cannot Perform This Action");
    } else {
      this.commonData.masterLanguage.langId = item.id;
      this.router.navigateByUrl("/masterLanguageEdit", {
        state: { id: item.id },
      });
      this.commonData.submenuname = "masterLanguageEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  gotoMasterKey(item)
  {
    this.router.navigateByUrl("/languageKey", {
      state: { text: item.englishtext},
    });
  }
}
