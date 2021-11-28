import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonServiceService } from "../common-service.service";
import { KycDocumentListService } from "./kyc-document-list.service";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var $: any;
declare var showToastMessage: any;
@Component({
  selector: "app-kyc-document-list",
  templateUrl: "./kyc-document-list.component.html",
  styleUrls: ["./kyc-document-list.component.css"],
})
export class KycDocumentListComponent implements OnInit {
  leftMenuArr = [];
  menuLink = "accessMenuRight";
  listForm: FormGroup;
  priviledgeDataArr: any = [];
  showTable: boolean = false;
  formErrors = {
    selectedFolder: "",
  };
  menuIndex = 0;
  folderId: any;
  fileListArray: any = [];
  allFolders: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private commonService: CommonServiceService,
    public menuRightsService: KycDocumentListService
  ) {}

  /**
   * This function is used for initialisation
   */
  ngOnInit() {
    this.commonServiceCall.pageName = "KYC Document List";
    this.getAllRoles();
    this.buildForm();
    this.getLeftMenuId();
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.menuRightsService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }
  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstant.getLeftMenuByMenuLinkUrl + this.menuLink;
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

  getPriviledgeData(id) {
    var url =
      this.appConstant.getPriviledgeDataUrl + id + "/" + this.commonData.roleTypeId;
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

  /**
   * This function is used to build the form for validations
   */
  public buildForm() {
    this.listForm = this.form.group({
      selectedFolder: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
    this.listForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.listForm,
        this.formErrors,
        true
      );
    });
  }

  /**
   * This function is used to go to the dashboard if on the current page
   */
  cancel() {
    this.commonMethod.cancel();
  }

  /**
   * This function is used to get all roles and bind in the dropdown
   */
  getAllRoles() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getFolderListUrl)
      .subscribe((data) => {
        var res = data.resp;
        if (data.status) {
          this.commonMethod.hideLoader();
          console.log("roles", data.resp);
          this.allFolders = res.result;
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.getFolderListUrl, res);
        }
      });
  }

  /**
   * This function is used to get the records from the selected value
   * @param roleid
   * @param fld
   */
  selectedValue(roleid) {
    $("#dt-sample").DataTable().clear().destroy();
    this.showTable = true;
    this.folderId = roleid;
    this.getDocumentsByFolderId(this.folderId);
  }

  getDocumentsByFolderId(folderId) {
    this.commonMethod.destroyDataTable();
    this.commonMethod.showLoader();
    var url = this.appConstant.getDocumentListByFolderIdUrl + folderId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.fileListArray = res.result;
        //  this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+this.appConstant.getMenuRightsForRoleId+ roleid+"\n"+"Params={}",'view')
        console.log(res);
      } else {
        this.showTable = false;
        this.errorCallBack(this.appConstant.getDocumentListByFolderIdUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  /**
   * This function is invoked whenever there is an error in the rest api
   * @param fld
   * @param res
   */
  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  addDocument() {
    this.router.navigateByUrl("/KYCDocumentAdd");
  }
}
