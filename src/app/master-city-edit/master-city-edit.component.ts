import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from "@angular/common";
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MasterCityEditService } from './master-city-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-city-edit',
  templateUrl: './master-city-edit.component.html',
  styleUrls: ['./master-city-edit.component.css']
})
export class MasterCityEditComponent implements OnInit {

  masterCityEditForm: FormGroup;
  remarkForm: FormGroup;

  country: any = [];
  states: any = [];
  status: any = [];
  masterCityData: any = [];
  remarkHistoryArr: any = [];
  selModel: any;
  selectedStateId: any;
  cityData: any;
  selectedCountryId: any;

  formErrors = {
    countryName: "",
    statusId: "",
    stateName: "",
    cityName: "",
    remark: "",
  };

  masterCityEditFields = {
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
    public masterCityEditService: MasterCityEditService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterCity');
      return;
    }

    this.commonServiceCall.pageName = "Edit City Master";
    this.cityData = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getCountryName();

    this.getRemarkHistoryData(this.cityData.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterCityEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.masterCityEditForm = this.form.group({
      countryName: new FormControl("", [Validators.required]),
      stateName: new FormControl("", [Validators.required]),
      cityName: new FormControl("", [Validators.required]),
      statusId: new FormControl("", [Validators.required]),
    });

    this.masterCityEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterCityEditForm,
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

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .getResponsePromise(
        this.appConstants.getRemarkHistoryDataUrl +
          id +
          "/" +
          this.commonDataShareService.submenuId
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
          console.log("Country data: ", this.country);
          this.getCityMasterById(this.cityData.id);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getCountryNamesUrl, res);
        }
      });
  }

  onCountryChange(event) {
    this.masterCityEditForm.get('stateName').setValue('');
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
        this.errorCallBack(this.appConstants.getStateNamesUrl, res);
      }
      setTimeout(() => {
        this.commonMethod.hideLoader();
      }, 3000);
    })
  }

  onStateChange(event) {
    this.selectedStateId = event.target.value;
    console.log('selected state: ', this.selectedStateId);
  }

  getCityMasterById(id){
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCitiesDetailsByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.masterCityData = res.result[0];
        this.getStateName(this.masterCityData.countryId);

        console.log(res);
        if(res.result[0].userAction !=null) {
          this.masterCityEditForm.patchValue({
            countryName: res.result[0].countryId,
            stateName: res.result[0].stateId,
            cityName: res.result[0].cityName,
            statusId: res.result[0].userAction,
          })
        }else{
          this.masterCityEditForm.patchValue({
            countryName: res.result[0].countryId,
            stateName: res.result[0].stateId,
            cityName: res.result[0].cityName,
            statusId: res.result[0].statusId,
          })
        }
      }
      else {
        this.errorCallBack(this.appConstants.getCitiesDetailsByIdUrl, res);
      }
      setTimeout(() => {
        this.commonMethod.hideLoader();
      }, 3000);
    })
  }

  openActionModel(action, formdata) {
    if (this.masterCityEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterCityEditFields.countryName = formdata.countryName;
      this.masterCityEditFields.statusId = formdata.statusId;
      this.masterCityEditFields.stateName = formdata.stateName;
      this.masterCityEditFields.cityName = formdata.cityName;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCityEditForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionModel() {
    this.masterCityEditForm.patchValue({
      messageCodeName: this.masterCityEditFields.countryName,
      statusId: this.masterCityEditFields.statusId,
      stateName: this.masterCityEditFields.stateName,
      cityName: this.masterCityEditFields.cityName,
    });
    closeTinyModel();
  }

  editCityMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.masterCityEditService.editCityWithRemarkCall(
        this.masterCityEditFields,
        this.masterCityData,
        this.remarkForm.value
      );
      this.updateCity(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  editCityMaster() {
    this.formValidation.markFormGroupTouched(this.masterCityEditForm);
    if (this.masterCityEditForm.valid) {
      var param = this.masterCityEditService.editCityCall(
        this.masterCityEditForm.value,
        this.masterCityData
      );
      this.updateCity(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCityEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateCity(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateCitiesDetailsUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add invProduct response: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateConfigMasterUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.masterCityData), 'update')
          console.log(res);
          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          if (
            this.commonDataShareService.roleType ==
            this.commonDataShareService.makerRole
          ) {
            this.masterCityEditForm.patchValue({
              countryName: this.masterCityEditFields.countryName,
              statusId: this.masterCityEditFields.statusId,
              stateName: this.masterCityEditFields.stateName,
              cityName: this.masterCityEditFields.cityName,
            });
          }
          this.errorCallBack(this.appConstants.updateCitiesDetailsUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/masterCity") {
      this.router.navigateByUrl("/masterCity");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/masterCity");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
