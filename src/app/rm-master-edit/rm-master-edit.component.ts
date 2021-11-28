import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { Location } from "@angular/common";
import { RmMasterEditService } from "./rm-master-edit.service";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-rm-master-edit",
  templateUrl: "./rm-master-edit.component.html",
  styleUrls: ["./rm-master-edit.component.css"],
})
export class RmMasterEditComponent implements OnInit {
  beforeParam: any = [];
  rmMasterEditForm: FormGroup;
  remarkForm: FormGroup;
  selectedRmMaster;
  rmMaster;
  masterStatus = [];
  productTypes = [];
  remarkHistoryArr: any = [];
  formErrors = {
    rmName: "",
    status: "",
    productType: "",
    rmId: "",
    remark: "",
  };

  RMMasterFields = {
    rmName: "",
    rmId: "",
    status: "",
    productType: "",
  };

  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private rmMasterEditService: RmMasterEditService
  ) {}

  public buildForm() {
    this.rmMasterEditForm = this.form.group({
      rmName: new FormControl("", [
        Validators.required,
        Validators.maxLength(40),
      ]),
      status: new FormControl("", [Validators.required]),
      rmId: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      productType: new FormControl("", [Validators.required]),
    });
    this.rmMasterEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.rmMasterEditForm,
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
      this.router.navigateByUrl('/rmMaster');
      return;
    }

    this.commonServiceCall.pageName = "Edit RM Master";
    this.roleId = this.commonData.roleId;
    this.rmMaster = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    this.getRmMasterById(this.rmMaster.id);
    this.getRemarkHistoryData(this.rmMaster.id);
  }

  filterStatus() {
    return this.masterStatus.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE" || x.shortName == "DELETED"
    );
  }

  filterProduct() {
    return this.productTypes.filter(
      (x) =>
        x.shortName == "WALLET" ||
        x.shortName == "MOBILE" ||
        x.shortName == "DESKTOP"
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
      .getResponsePromise(this.appConstants.masterListUrl)
      .subscribe((data) => {
        var res = data;
        console.log("response data: ", res);
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.productTypes = res.resp;
          console.log("response array: ", this.productTypes);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterListUrl, res);
        }
      });
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.rmMasterEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  getRmMasterById(id) {
    console.log("editable id: ", id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getRmMasterByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.beforeParam = res.result[0];
        this.selectedRmMaster = res.result[0];
        if (
          res.result[0].userAction != null
        ) {
          this.rmMasterEditForm.patchValue({
            rmName: res.result[0].rmName,
            rmId: res.result[0].rmId,
            status: res.result[0].userAction,
            productType: res.result[0].appId,
          });
        } else {
          this.rmMasterEditForm.patchValue({
            rmName: res.result[0].rmName,
            rmId: res.result[0].rmId,
            status: res.result[0].statusId,
            productType: res.result[0].appId,
          });
        }
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getRmMasterByIdUrl, res);
      }
    });
  }

  gotoConfigMaster() {
    if (this.commonServiceCall.makerRequestEditUrl == "/rmMaster") {
      this.router.navigateByUrl("/rmMaster");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/rmMaster");
    }
  }

  update() {
    this.formValidation.markFormGroupTouched(this.rmMasterEditForm);
    if (this.rmMasterEditForm.valid) {
      var formData = this.rmMasterEditForm.value;
      var param = this.rmMasterEditService.updateRmMastercall(
        formData,
        this.selectedRmMaster
      );
      this.updateRMMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.rmMasterEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateRMMaster(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateRmMasterUrl, params)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.updateRmMasterUrl +
              "\n" +
              "Params=" +
              JSON.stringify(params) +
              "\n" +
              "Before Update Params=" +
              JSON.stringify(this.beforeParam),
            "update"
          );
          showToastMessage(res.responseMessage);
          this.gotoConfigMaster();
        } else {
          this.rmMasterEditForm.patchValue({
            rmName: this.RMMasterFields.rmName,
            rmId: this.RMMasterFields.rmId,
            status: this.RMMasterFields.status,
            productType: this.RMMasterFields.productType,
          });
          showToastMessage("Master Update Error");
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateRmMasterUrl, res);
      });
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.addConfigMasterUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  openActionModel(action, formdata) {
    if (this.rmMasterEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.RMMasterFields.rmName = formdata.rmName;
      this.RMMasterFields.rmId = formdata.rmId;
      this.RMMasterFields.status = formdata.status;
      this.RMMasterFields.productType = formdata.productType;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.rmMasterEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateCalculatorFormulaWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.rmMasterEditService.updateRmMastercallWithRemark(
        this.RMMasterFields,
        this.selectedRmMaster,
        formdata
      );
      this.updateRMMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.rmMasterEditForm.patchValue({
      rmName: this.RMMasterFields.rmName,
      rmId: this.RMMasterFields.rmId,
      status: this.RMMasterFields.status,
      productType: this.RMMasterFields.productType,
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
