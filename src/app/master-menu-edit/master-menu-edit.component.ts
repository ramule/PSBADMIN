import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { Location } from "@angular/common";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { MasterMenuEditService } from "./master-menu-edit.service";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-master-menu-edit",
  templateUrl: "./master-menu-edit.component.html",
  styleUrls: ["./master-menu-edit.component.css"],
})
export class MasterMenuEditComponent implements OnInit {
  beforeParam: any = [];
  masterMenuEdit;
  statusArr: any = [];
  masterMenuEditForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    menuName: "",
    status: "",
    logoPath: "",
    remark: "",
  };
  menuMasterFields = {
    menuName: "",
    status: "",
    logoPath: "",
  };
  actualResult: any;
  remarkHistoryArr: any = [];
  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterMenuEditService: MasterMenuEditService
  ) {}

  public buildForm() {
    this.masterMenuEditForm = this.form.group({
      menuName: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      logoPath: new FormControl("", [
        Validators.required,
       // Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpe?g|.png)$/i),
      ]),
    });
    this.masterMenuEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterMenuEditForm,
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
      this.router.navigateByUrl('/masterMenu');
      return;
    }

    this.commonServiceCall.pageName = "Menu Master Edit";
    this.roleId = this.commonData.roleId;
    this.masterMenuEdit = this.location.getState();
    this.getStatus();
    this.buildForm();
    this.getMastreMenuById(this.masterMenuEdit.id);
    this.getRemarkHistoryData(this.masterMenuEdit.id);
  }

  gotoMenuMaster() {
    if (this.commonServiceCall.makerRequestEditUrl == "/masterMenu") {
      this.router.navigateByUrl("/masterMenu");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/masterMenu");
    }
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterMenuEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.statusArr = data.resp;
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  filterStatus()
  {
    return this.statusArr.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  getMastreMenuById(id) {
    console.log("editable id: ", id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getMasterMenuByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.beforeParam = res.result;
        this.commonMethod.hideLoader();
        var result = res.result[0];
        this.actualResult = result;
        console.log("menu: ", result);
        if (
          res.result[0].userAction != null
        ) {
          this.masterMenuEditForm.patchValue({
            menuName: result.menuname,
            status: result.userAction,
            logoPath: result.menuLogo != null ? result.menuLogo : "-",
          });
        } else {
          this.masterMenuEditForm.patchValue({
            menuName: result.menuname,
            status: result.statusId,
            logoPath: result.menuLogo != null ? result.menuLogo : "-",
          });
        }

        if (
          this.actualResult.menuname == "Master" &&
          this.actualResult.id == 50
        ) {
          this.masterMenuEditForm.get("status").disable();
        }
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getMasterMenuByIdUrl, res);
      }
    });
  }

  showMsg() {
    if (this.actualResult.menuname == "Master" && this.actualResult.id == 50) {
      showToastMessage("You Cannot Perform This Action");
    }
  }

  update() {
    this.formValidation.markFormGroupTouched(this.masterMenuEditForm);
    if (this.masterMenuEditForm.valid) {
      var formData = this.masterMenuEditForm.value;
      var param = this.masterMenuEditService.updateMasterMenuCall(
        this.masterMenuEditForm.value,
        this.actualResult
      );
      this.updateMenuMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterMenuEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateMenuMaster(param) {
    this.commonMethod.showLoader();
    console.log("request parameters: ", param);
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateMasterMenuUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.updateMasterMenuUrl +
              "\n" +
              "Params=" +
              JSON.stringify(param) +
              "\n" +
              "Before Update Params=" +
              JSON.stringify(this.beforeParam),
            "update"
          );
          showToastMessage(res.responseMessage);
          this.gotoMenuMaster();
        } else {
          this.masterMenuEditForm.patchValue({
            menuName: this.menuMasterFields.menuName,
            status: this.menuMasterFields.status,
            logoPath: this.menuMasterFields.logoPath,
          });
          showToastMessage("Master Update Error");
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateMasterMenuUrl, res);
      });
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.updateMasterMenuUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.getMasterMenuByIdUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  openActionModel(action, formdata) {
    if (this.masterMenuEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.menuMasterFields.menuName = formdata.menuName;
      this.menuMasterFields.status = formdata.status;
      this.menuMasterFields.logoPath = formdata.logoPath;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterMenuEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateMenuMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterMenuEditService.updateMasterMenuCallWithRemark(
        this.menuMasterFields,
        this.actualResult,
        formdata
      );
      this.updateMenuMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.masterMenuEditForm.patchValue({
      menuName: this.menuMasterFields.menuName,
      status: this.menuMasterFields.status,
      logoPath: this.menuMasterFields.logoPath,
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
        } else if (res.responseCode == "202"){
          // showToastMessage("No Record Available");
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
