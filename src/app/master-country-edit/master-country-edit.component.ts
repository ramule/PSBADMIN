import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { MasterCountryEditService } from "./master-country-edit.service";
import { Location } from "@angular/common";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-master-country-edit",
  templateUrl: "./master-country-edit.component.html",
  styleUrls: ["./master-country-edit.component.css"],
})
export class MasterCountryEditComponent implements OnInit {
  status: any = [];
  remarkHistoryArr: any = [];
  beforeParam: any = [];
  selectedCountry: any = [];
  productTypes: any = [];
  selModel: any;
  masterCountryData: any;
  masterCountryEditForm: FormGroup;
  remarkForm: FormGroup;

  formErrors = {
    countryName: "",
    statusId: "",
    productType: "",
    remark: "",
  };

  masterCountryAddFields = {
    countryName: "",
    statusId: "",
    productType: "",
  };

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public masterCountryEditService: MasterCountryEditService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterCountry');
      return;
    }

    this.commonServiceCall.pageName = "Edit Country Master";
    this.masterCountryData = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    this.getCountryMasterById(this.masterCountryData.id);
    this.getRemarkHistoryData(this.masterCountryData.id);
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
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterCountryEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/"+ this.commonDataShareService.submenuId ).subscribe((data) => {
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

  getCountryMasterById(id){
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCountryDetailsByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.beforeParam =  res.result[0];
        this.selectedCountry = res.result[0];

        console.log(res);
        if(res.result[0].userAction !=null) {
          this.masterCountryEditForm.patchValue({
            countryName: res.result[0].name,
            statusId: res.result[0].userAction,
            productType: res.result[0].appId,
          })
        }else{
          this.masterCountryEditForm.patchValue({
            countryName: res.result[0].name,
            statusId: res.result[0].statusId,
            productType: res.result[0].appId,
          })
        }
        this.commonMethod.hideLoader();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCountryDetailsByIdUrl, res);
      }

    })
  }

  public buildForm() {
    this.masterCountryEditForm = this.form.group({
      countryName: new FormControl("", [Validators.required]),
      productType: new FormControl("", []),
      statusId: new FormControl("", [Validators.required]),
    });

    this.masterCountryEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterCountryEditForm,
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

  getStatus() {
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        if (data.status) {
          console.log("Data resp: ", data.resp);
          this.status = data.resp;
        } else {
          this.commonMethod.errorMessage(data);
        }
      });
  }

  filterStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  filterProduct() {
    return this.commonDataShareService.productTypes.filter(
      (x) =>
        x.shortName == "WALLET" ||
        x.shortName == "MOBILE" ||
        x.shortName == "DESKTOP" ||
        x.shortName == "UPIDESKTOP" ||
        x.shortName == "UPIMOBILE" ||
        x.shortName == "ALL"
    );
  }

  openActionModel(action, formdata) {
    if (this.masterCountryEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterCountryAddFields.countryName = formdata.countryName;
      this.masterCountryAddFields.statusId = formdata.statusId;
      this.masterCountryAddFields.productType = formdata.productType;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCountryEditForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionModel() {
    this.masterCountryEditForm.patchValue({
      messageCodeName: this.masterCountryAddFields.countryName,
      statusId: this.masterCountryAddFields.statusId,
      productType: this.masterCountryAddFields.productType,
    });
    closeTinyModel();
  }

  editCountryMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.masterCountryEditService.editCountryWithRemarkCall(
        this.masterCountryAddFields,
        this.selectedCountry,
        this.remarkForm.value
      );
      this.updateCountry(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  editCountryMaster() {
    this.formValidation.markFormGroupTouched(this.masterCountryEditForm);
    if (this.masterCountryEditForm.valid) {
      var param = this.masterCountryEditService.editCountryCall(
        this.masterCountryEditForm.value,
        this.selectedCountry
      );
      this.updateCountry(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCountryEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateCountry(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateCountryDetailsUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add invProduct response: ", res);
        if (res.responseCode == "200") {

          this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateConfigMasterUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParam), 'update')
          console.log(res);
          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          if (
            this.commonDataShareService.roleType ==
            this.commonDataShareService.makerRole
          ) {
            this.masterCountryEditForm.patchValue({
              countryName: this.masterCountryAddFields.countryName,
              statusId: this.masterCountryAddFields.statusId,
              productType: this.masterCountryAddFields.productType,
            });
          }
          this.errorCallBack(this.appConstants.updateCountryDetailsUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/masterCountry") {
      this.router.navigateByUrl("/masterCountry");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/masterCountry");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
