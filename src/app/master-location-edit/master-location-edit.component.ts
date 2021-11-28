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
import { AppConstants } from "../app-constants";
import { CommonMethods } from "../common-methods";
import { MasterLocationEditService } from "./master-location-edit.service";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-master-location-edit",
  templateUrl: "./master-location-edit.component.html",
  styleUrls: ["./master-location-edit.component.css"],
})
export class MasterLocationEditComponent implements OnInit {
  beforeParam: any = [];
  productTypes: any = [];
  configLocationForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    locType: "",
    displayName: "",
    emailId: "",
    mobile: "",
    address: "",
    branchCode: "",
    latitude: "",
    longitude: "",
    postCode: "",
    langCode: "",
    country: "",
    state: "",
    city: "",
    status: "",
    remark: "",
    productType: ''
  };

  masterLocationFields = {
    locType: "",
    displayName: "",
    emailId: "",
    mobile: "",
    address: "",
    branchCode: "",
    latitude: "",
    longitude: "",
    postCode: "",
    langCode: "",
    country: "",
    state: "",
    city: "",
    status: "",
    productType: ''
  };

  roleId: any;
  selModel: any;
  states: any = [];
  country: any = [];
  city: any = [];
  status: any = [];
  locationType: any = [];
  selectedLoc: any;
  masterLocation: any;
  selectedCountryId;
  selectedStateId;
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
    private masterLocationEditService: MasterLocationEditService
  ) {}

  public buildForm() {
    this.configLocationForm = this.form.group({
      locType: new FormControl("", [Validators.required]),
      displayName: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/),
      ]),
      emailId: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
        Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/),
      ]),
      mobile: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      address: new FormControl("", [Validators.required]),
      branchCode: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      latitude: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/),
      ]),
      longitude: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/),
      ]),
      postCode: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      langCode: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      productType: new FormControl('', [Validators.required]),
    });
    this.configLocationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.configLocationForm,
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
      this.router.navigateByUrl('/masterLocation');
      return;
    }

    this.roleId = this.commonData.roleId;
    this.commonServiceCall.pageName = "Edit Location";
    this.masterLocation = this.location.getState();
    this.getLocationDtlById(this.masterLocation.id);
    this.buildForm();
    this.getStateNameOnPageLoad();
    this.getCityNameOnPageLoad();
    this.getCountryName();
    this.getStatus();
    this.getLocationsType();
    this.getAppMasterList();
    this.getRemarkHistoryData(this.masterLocation.id);
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterLocationEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  //on load functions
  getAppMasterList(){
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
  }

  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP");
  }

  getStateNameOnPageLoad() {
    this.states = [];
    console.log("country id: ", this.commonData.masterLocation.countryId);
    this.commonMethod.showLoader();
    var paramUrl =
      this.appConstants.getStateNamesUrl +
      this.commonData.masterLocation.countryId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        // this.states = res.result;

        res.result.forEach(element => {
          if(element.statusId == 3) {
            this.states.push(element);
          }
        });
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getStateNamesUrl, res);
      }
    });
  }

  getCityNameOnPageLoad() {
    this.city = [];
    this.commonMethod.showLoader();
    var paramUrl =
      this.appConstants.getCityNamesUrl +
      this.commonData.masterLocation.countryId +
      "/" +
      this.commonData.masterLocation.stateId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        // this.city = res.result;

        res.result.forEach(element => {
          if(element.statusId == 3) {
            this.city.push(element);
          }
        });
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCityNamesUrl, res);
      }
    });
  }

  getStateName(countryId) {
    console.log("country id: ", countryId);
    this.commonMethod.showLoader();
    var paramUrl = this.appConstants.getStateNamesUrl + countryId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        this.states = res.result;
      } else {
        this.states = [];
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getStateNamesUrl, res);
      }
    });
  }

  getCityName(countryId, stateId) {
    this.commonMethod.showLoader();
    var paramUrl =
      this.appConstants.getCityNamesUrl + countryId + "/" + stateId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        this.city = res.result;
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCityNamesUrl, res);
      }
    });
  }

  onCityChange(event) {
    this.selectedStateId = event.target.value;
    this.configLocationForm.get('city').setValue('');
    console.log("selected state: ", this.selectedStateId);
    this.getCityName(this.selectedCountryId, this.selectedStateId);
    this.city = [];
  }

  getCountryName() {
    this.country = [];
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getCountryNamesUrl)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          // this.country = res.result;

          res.result.forEach(element => {
            if(element.statusId == 3) {
              this.country.push(element);
            }
          });
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getCountryNamesUrl, res);
        }
      });
  }

  onCountryChange(event) {
    this.selectedCountryId = event.target.value;
    this.configLocationForm.get('state').setValue('');
    this.configLocationForm.get('city').setValue('');
    console.log("selected country id: ", this.selectedCountryId);
    this.getStateName(this.selectedCountryId);
    this.city = [];
  }

  filterStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
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
          this.status = res.resp;
          console.log("response array: ", this.status);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  filterLocationType() {
    return this.locationType.filter(
      (x) =>
        x.locationType == "ALL" ||
        x.locationType == "ATM" ||
        x.locationType == "BRANCH" ||
        x.locationType == "KIOSK"
    );
  }

  getLocationsType() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getLocationTypesUrl)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.locationType = res.result;
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getLocationTypesUrl, res);
        }
      });
  }

  getLocationDtlById(locId) {
    console.log("editable id: ", locId);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getLocationDetailsByIdUrl + locId;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.beforeParam = res.result[0];
        this.selectedLoc = res.result[0];
        console.log("selected location: ", this.selectedLoc);
        if (
          res.result[0].userAction != null
        ) {
          this.configLocationForm.patchValue({
            locType: res.result[0].locationTypeId,
            displayName: res.result[0].displayName,
            emailId: res.result[0].emailAddress,
            mobile: res.result[0].phoneNumber,
            address: res.result[0].address,
            branchCode: res.result[0].branchCode,
            latitude: res.result[0].latitude,
            longitude: res.result[0].longitude,
            postCode: res.result[0].postCode,
            langCode: res.result[0].languageCode,
            country: res.result[0].countryId,
            productType: res.result[0].appId,
            state: res.result[0].stateId,
            city: res.result[0].cityId,
            status: res.result[0].userAction,
          });
        } else {
          this.configLocationForm.patchValue({
            locType: res.result[0].locationTypeId,
            displayName: res.result[0].displayName,
            emailId: res.result[0].emailAddress,
            mobile: res.result[0].phoneNumber,
            address: res.result[0].address,
            branchCode: res.result[0].branchCode,
            latitude: res.result[0].latitude,
            longitude: res.result[0].longitude,
            postCode: res.result[0].postCode,
            langCode: res.result[0].languageCode,
            country: res.result[0].countryId,
            productType: res.result[0].appId,
            state: res.result[0].stateId,
            city: res.result[0].cityId,
            status: res.result[0].statusId,
          });
        }
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getLocationDetailsByIdUrl, res);
      }
    });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.configLocationForm);
    if (this.configLocationForm.valid) {
      var formData = this.configLocationForm.value;
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);
      var param = this.masterLocationEditService.updateLocationCall(formData, this.selectedLoc);
      this.updateLocation(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.configLocationForm,
        this.formErrors,
        false
      );
    }
  }

  gotoMasterLoc() {
    if (this.commonServiceCall.makerRequestEditUrl == "/masterLocation") {
      this.router.navigateByUrl("/masterLocation");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/masterLocation");
    }
  }

  callBackFunction() {
    this.router.navigateByUrl("/masterLocation");
  }

  updateLocation(param) {
    console.log("updatable data: ", param);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateLocationDetailsUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.updateLocationDetailsUrl +
              "\n" +
              "Params=" +
              JSON.stringify(param) +
              "\n" +
              "Before Update Params=" +
              JSON.stringify(this.beforeParam),
            "update"
          );
          showToastMessage(res.responseMessage);
          this.gotoMasterLoc();
        } else {
          if(this.commonData.roleType == this.commonData.makerRole) {
            this.configLocationForm.patchValue({
              locType: this.masterLocationFields.locType,
              displayName: this.masterLocationFields.displayName,
              emailId: this.masterLocationFields.emailId,
              mobile: this.masterLocationFields.mobile,
              address: this.masterLocationFields.address,
              branchCode: this.masterLocationFields.branchCode,
              latitude: this.masterLocationFields.latitude,
              longitude: this.masterLocationFields.longitude,
              postCode: this.masterLocationFields.postCode,
              langCode: this.masterLocationFields.langCode,
              country: this.masterLocationFields.country,
              state: this.masterLocationFields.state,
              city: this.masterLocationFields.city,
              status: this.masterLocationFields.status,
              productType: this.masterLocationFields.productType
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.updateLocationDetailsUrl, res);
        }
      });
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.masterStatusUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.configMasterByIdUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.updateLocationDetailsUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.getStateNamesUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.getCityNamesUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.getCountryNamesUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.getLocationTypesUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  openActionModel(action, formdata) {
    if (this.configLocationForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterLocationFields.locType = formdata.locType;
      this.masterLocationFields.displayName = formdata.displayName;
      this.masterLocationFields.emailId = formdata.emailId;
      this.masterLocationFields.mobile = formdata.mobile;
      this.masterLocationFields.address = formdata.address;
      this.masterLocationFields.branchCode = formdata.branchCode;
      this.masterLocationFields.latitude = formdata.latitude;
      this.masterLocationFields.longitude = formdata.longitude;
      this.masterLocationFields.postCode = formdata.postCode;
      this.masterLocationFields.langCode = formdata.langCode;
      this.masterLocationFields.country = formdata.country;
      this.masterLocationFields.state = formdata.state;
      this.masterLocationFields.city = formdata.city;
      this.masterLocationFields.status = formdata.status;
      this.masterLocationFields.productType = formdata.productType;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.configLocationForm,
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
      var param = this.masterLocationEditService.updateLocationCallWithRemark(
        this.masterLocationFields,
        this.selectedLoc,
        formdata
      );
      this.updateLocation(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.configLocationForm.patchValue({
      locType: this.masterLocationFields.locType,
      displayName: this.masterLocationFields.displayName,
      emailId: this.masterLocationFields.emailId,
      mobile: this.masterLocationFields.mobile,
      address: this.masterLocationFields.address,
      branchCode: this.masterLocationFields.branchCode,
      latitude: this.masterLocationFields.latitude,
      longitude: this.masterLocationFields.longitude,
      postCode: this.masterLocationFields.postCode,
      langCode: this.masterLocationFields.langCode,
      country: this.masterLocationFields.country,
      state: this.masterLocationFields.state,
      city: this.masterLocationFields.city,
      status: this.masterLocationFields.status,
      productType: this.masterLocationFields.productType
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
