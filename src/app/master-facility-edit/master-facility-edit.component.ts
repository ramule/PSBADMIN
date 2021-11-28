import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { Location } from "@angular/common";
import { MasterFacilityEditService } from "./master-facility-edit.service";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-master-facility-edit",
  templateUrl: "./master-facility-edit.component.html",
  styleUrls: ["./master-facility-edit.component.css"],
})
export class MasterFacilityEditComponent implements OnInit {
  beforeParam: any = [];
  formErrors = {
    displayName: "",
    limits: "",
    ftNft: "",
    activitycode: "",
    encryptionType: "",
    status: "",
    productType: "",
    remark: "",
  };

  masterFacilityFilelds = {
    displayName: "",
    limits: "",
    ftNft: "",
    activitycode: "",
    encryptionType: "",
    status: "",
    productType: "",
  };
  masterStatus = [];
  productTypes = [];
  masterFacility;
  selectedFacility;
  masterFacilityEditForm: FormGroup;
  remarkForm: FormGroup;

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
    private masterFacilityEditService: MasterFacilityEditService
  ) {}

  public buildForm() {
    this.masterFacilityEditForm = this.form.group({
      displayName: new FormControl("", [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/),
      ]),
      limits: new FormControl("", [
        Validators.required,
        Validators.maxLength(40),
        Validators.min(1),
      ]),
      ftNft: new FormControl("", [Validators.required]),
      activitycode: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      encryptionType: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      productType: new FormControl("", [Validators.required]),
    });
    this.masterFacilityEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterFacilityEditForm,
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
      this.router.navigateByUrl('/masterFacility');
      return;
    }

    this.commonServiceCall.pageName = "Edit Facility";
    this.roleId = this.commonData.roleId;
    this.masterFacility = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    this.getMasterById(this.masterFacility.id);
    this.getRemarkHistoryData(this.masterFacility.id);
  }

  filterStatus() {
    return this.masterStatus.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  filterProduct() {
    return this.productTypes.filter(
      (x) =>
        x.shortName == "WALLET" ||
        x.shortName == "MOBILE" ||
        x.shortName == "DESKTOP" ||
        x.shortName == "TAB" ||
        x.shortName == "IVR" ||
        x.shortName == "ALEXA" ||
        x.shortName == "WHATSAPP" ||
        x.shortName == "BOTS"
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
    var param = this.masterFacilityEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  getMasterById(id) {
    console.log("editable id: ", id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getMasterFacilityDetailsByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.beforeParam = res.result[0];
        this.selectedFacility = res.result[0];
        if (
          res.result[0].userAction != null
        ) {
          this.masterFacilityEditForm.patchValue({
            displayName: res.result[0].displayname,
            limits: res.result[0].limits,
            ftNft: res.result[0].ft_NFT,
            activitycode: res.result[0].activitycode,
            encryptionType: res.result[0].encryptiontype,
            status: res.result[0].userAction,
            productType: res.result[0].appid,
          });
        } else {
          this.masterFacilityEditForm.patchValue({
            displayName: res.result[0].displayname,
            limits: res.result[0].limits,
            ftNft: res.result[0].ft_NFT,
            activitycode: res.result[0].activitycode,
            encryptionType: res.result[0].encryptiontype,
            status: res.result[0].statusid,
            productType: res.result[0].appid,
          });
        }
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(
          this.appConstants.getMasterFacilityDetailsByIdUrl,
          res
        );
      }
    });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.masterFacilityEditForm);
    if (this.masterFacilityEditForm.valid) {
      var formData = this.masterFacilityEditForm.value;
      var param = this.masterFacilityEditService.masterFacilityUpdateCall(
        formData,
        this.selectedFacility
      );
      this.updateConfigMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterFacilityEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateConfigMaster(param) {
    console.log("upadting parameters: ", param);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(
        this.appConstants.updateMasterFacilityDetailsUrl,
        param
      )
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.updateMasterFacilityDetailsUrl +
              "\n" +
              "Params=" +
              JSON.stringify(param) +
              "\n" +
              "Before Update Params=" +
              JSON.stringify(this.beforeParam),
            "update"
          );
          showToastMessage(res.responseMessage);
          // this.router.navigateByUrl("/masterFacility");
          if (this.commonServiceCall.makerRequestEditUrl == "/masterFacility") {
            this.router.navigateByUrl("/masterFacility");
          } else if (
            this.commonServiceCall.makerRequestEditUrl == "/makerRequests"
          ) {
            this.router.navigateByUrl("/makerRequests");
          } else {
            this.router.navigateByUrl("/masterFacility");
          }
        } else {
          if(this.commonData.roleType == this.commonData.makerRole) {
            this.masterFacilityEditForm.patchValue({
              displayName: this.masterFacilityFilelds.displayName,
              limits: this.masterFacilityFilelds.limits,
              ftNft: this.masterFacilityFilelds.ftNft,
              activitycode: this.masterFacilityFilelds.activitycode,
              encryptionType: this.masterFacilityFilelds.encryptionType,
              status: this.masterFacilityFilelds.status,
              productType: this.masterFacilityFilelds.productType,
            });
          }
          showToastMessage("Master Update Error");
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(
          this.appConstants.updateMasterFacilityDetailsUrl,
          res
        );
      });
  }

  gotoFacilityMaster() {
    // this.router.navigateByUrl('/masterFacility');

    if (this.commonServiceCall.makerRequestEditUrl == "/masterFacility") {
      this.router.navigateByUrl("/masterFacility");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/masterFacility");
    }
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.addConfigMasterUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.configMasterurl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.masterListUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.masterStatusUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.masterStatusUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  openActionModel(action, formdata) {
    if (this.masterFacilityEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterFacilityFilelds.displayName = formdata.displayName;
      this.masterFacilityFilelds.limits = formdata.limits;
      this.masterFacilityFilelds.ftNft = formdata.ftNft;
      this.masterFacilityFilelds.activitycode = formdata.activitycode;
      this.masterFacilityFilelds.encryptionType = formdata.encryptionType;
      this.masterFacilityFilelds.status = formdata.status;
      this.masterFacilityFilelds.productType = formdata.productType;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterFacilityEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateMasterFacilityWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterFacilityEditService.masterFacilityUpdateCallWithRemark(
        this.masterFacilityFilelds,
        this.selectedFacility,
        formdata
      );
      this.updateConfigMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.masterFacilityEditForm.patchValue({
      displayName: this.masterFacilityFilelds.displayName,
      limits: this.masterFacilityFilelds.limits,
      ftNft: this.masterFacilityFilelds.ftNft,
      activitycode: this.masterFacilityFilelds.activitycode,
      encryptionType: this.masterFacilityFilelds.encryptionType,
      status: this.masterFacilityFilelds.status,
      productType: this.masterFacilityFilelds.productType,
    });
    closeTinyModel();
  }
  remarkHistoryArr: any = [];

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
