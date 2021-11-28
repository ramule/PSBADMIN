import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { MasterCityAddService } from "./master-city-add.service";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-master-city-add",
  templateUrl: "./master-city-add.component.html",
  styleUrls: ["./master-city-add.component.css"],
})
export class MasterCityAddComponent implements OnInit {
  masterCityAddForm: FormGroup;
  remarkForm: FormGroup;

  country: any = [];
  states: any = [];
  status: any = [];
  selModel: any;
  selectedStateId: any;
  selectedCountryId: any;

  formErrors = {
    countryName: "",
    statusId: "",
    stateName: "",
    cityName: "",
    remark: "",
  };

  masterCityAddFields = {
    countryName: "",
    statusId: "",
    stateName: "",
    cityName: "",
  };

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public masterCityAddService: MasterCityAddService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add City Master";
    this.buildForm();
    this.getStatus();
    this.getCountryName();
    this.masterCityAddForm.patchValue({
      statusId: 3
    })
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterCityAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.masterCityAddForm = this.form.group({
      countryName: new FormControl("", [Validators.required]),
      stateName: new FormControl("", [Validators.required]),
      cityName: new FormControl("", [Validators.required]),
      statusId: new FormControl("", [Validators.required]),
    });

    this.masterCityAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterCityAddForm,
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
          this.country.sort();
          console.log("Country data: ", this.country);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getCountryNamesUrl, res);
        }
      });
  }

  onCountryChange(event) {
    this.masterCityAddForm.get('stateName').setValue('');
    this.selectedCountryId = event.target.value;
    console.log('selected country id: ', this.selectedCountryId);
    this.getStateName(this.selectedCountryId);
  }

  getStateName(countryId) {
    this.states = [];
    console.log('country id: ', countryId);
    this.commonMethod.showLoader();
    var paramUrl = this.appConstants.getStateNamesUrl + countryId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        // this.states = res.result;

        res.result.forEach(element => {
          if(element.statusId == 3) {
            this.states.push(element);
          }
        });
      }
      else {
        this.states = [];
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getStateNamesUrl, res);
      }
    })
  }

  onStateChange(event) {
    this.selectedStateId = event.target.value;
    console.log('selected state: ', this.selectedStateId);
  }

  openActionModel(action, formdata) {
    if (this.masterCityAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterCityAddFields.countryName = formdata.countryName;
      this.masterCityAddFields.statusId = formdata.statusId;
      this.masterCityAddFields.stateName = formdata.stateName;
      this.masterCityAddFields.cityName = formdata.cityName;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCityAddForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionModel() {
    this.masterCityAddForm.patchValue({
      messageCodeName: this.masterCityAddFields.countryName,
      statusId: this.masterCityAddFields.statusId,
      stateName: this.masterCityAddFields.stateName,
      cityName: this.masterCityAddFields.cityName,
    });
    closeTinyModel();
  }

  addCityMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.masterCityAddService.addCityWithRemarkCall(
        this.masterCityAddFields,
        this.remarkForm.value
      );
      this.addCity(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  addCityMaster() {
    this.formValidation.markFormGroupTouched(this.masterCityAddForm);
    if (this.masterCityAddForm.valid) {
      var param = this.masterCityAddService.addCityCall(
        this.masterCityAddForm.value
      );
      this.addCity(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCityAddForm,
        this.formErrors,
        false
      );
    }
  }

  addCity(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.addCitiesDetailsUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add invProduct response: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.addCitiesDetailsUrl +
              "\n" +
              "Params=" +
              JSON.stringify(param),
            "add"
          );
          console.log(res);
          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          if (
            this.commonDataShareService.roleType ==
            this.commonDataShareService.makerRole
          ) {
            this.masterCityAddForm.patchValue({
              countryName: this.masterCityAddFields.countryName,
              statusId: this.masterCityAddFields.statusId,
              stateName: this.masterCityAddFields.stateName,
              cityName: this.masterCityAddFields.cityName,
            });
          }
          this.errorCallBack(this.appConstants.addCitiesDetailsUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  cancel() {
    this.router.navigateByUrl("/masterCity");
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
