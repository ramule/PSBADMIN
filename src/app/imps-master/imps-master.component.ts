import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsMasterService } from './imps-master.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-master',
  templateUrl: './imps-master.component.html',
  styleUrls: ['./imps-master.component.css']
})
export class ImpsMasterComponent implements OnInit {

  impsMasterForm: FormGroup;
  impsMasterArr: any = [];
  priviledgeDataArr: any = [];
  statesArr: any = [];
  districtArr: any = [];
  citiesArr: any = [];
  selectedState: any = "";
  selectedDistrict: any = "";
  selectedCity: any = "";
  menuLink = "impsMaster";
  type: any;
  formErrors = {
    searchBy: '',
    state: '',
    city: '',
    district: '',
    ifscCode: ''
  }

  constructor(
    private form: FormBuilder,
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private formValidation: FormValidationsService,
    public impsMasterService: ImpsMasterService

  ) { }

  ngOnInit(): void {
    this.commonMethod.hideLoader();
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "IMPS Master";
    this.getLeftMenuId();
    this.buildForm();
    // this.getImpsMaster();
  }

  public buildForm() {
    this.impsMasterForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.impsMasterForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsMasterForm, this.formErrors, true)
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsMasterService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataShareService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          // this.getImpsMaster();
          // this.getStates();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  getStates() {
    this.commonMethod.showLoader();
    this.statesArr = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getImpsMasterStateUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.statesArr = res.result;
        console.log('States array: ', this.statesArr);
      } else {
        this.errorCallBack(this.appConstants.getImpsMasterStateUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  onStateChange(event) {
    this.impsMasterForm.get('district').setValue('');
    this.impsMasterForm.get('city').setValue('');
    console.log(event.target.value);
    this.selectedState = event.target.value;
    this.getDistrict(this.selectedState);
    this.citiesArr = [];
  }

  getDistrict(stateParam) {
    this.commonMethod.showLoader();
    var param = {
      "state": stateParam
    }
    this.districtArr = [];
    this.commonServiceCall.postResponsePromise(this.appConstants.getImpsMasterDistrictByStateUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.districtArr = res.result;
        console.log('District array: ', this.districtArr);
      } else {
        this.errorCallBack(this.appConstants.getImpsMasterDistrictByStateUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  onDistrictChange(event) {
    console.log(event.target.value);
    this.selectedDistrict = event.target.value;
    this.getCity(this.selectedDistrict);
  }

  getCity(districtParam) {
    this.commonMethod.showLoader();
    var param = {
      "district": districtParam
    }
    this.citiesArr = [];
    this.commonServiceCall.postResponsePromise(this.appConstants.getImpsMasterCityByDistrictUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.citiesArr = res.result;
        console.log('Cities array: ', this.citiesArr);
      } else {
        this.errorCallBack(this.appConstants.getImpsMasterCityByDistrictUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  onCityChange(event) {
    console.log(event.target.value);
    this.selectedCity = event.target.value;
  }

  getSearchByBranchIfsc(value) {
    console.log(value);
    this.type = value.searchBy;
    this.impsMasterArr = [];
    this.impsMasterForm.removeControl('state');
    this.impsMasterForm.removeControl('district');
    this.impsMasterForm.removeControl('city');
    this.impsMasterForm.removeControl('ifscCode');

    if (this.type == 'statecitydistrict') {
      this.impsMasterForm.addControl('state', new FormControl('', [Validators.required]));
      this.impsMasterForm.addControl('district', new FormControl('', [Validators.required]));
      this.impsMasterForm.addControl('city', new FormControl('', [Validators.required]));
      this.getStates();
    }
    else {
      this.impsMasterForm.addControl('ifscCode', new FormControl('', [Validators.required, Validators.minLength(12), Validators.pattern(/^[A-Z0-9 ]+$/)]));
    }
  }

  onSearchImpsMaster() {
    this.formValidation.markFormGroupTouched(this.impsMasterForm);

    if (this.impsMasterForm.valid) {
      var formData = this.impsMasterForm.value;
      if (this.type == 'statecitydistrict') {
        var inputdata = this.impsMasterService.getDetailsByStateDistrictCityCall(formData);
        this.getImpsMasterByStateDistrictCity(inputdata);
      }
      else {
        var _inputdata = this.impsMasterService.getDetailsByIfscCall(formData)
        this.getImpsMasterByIfscCode(_inputdata);
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsMasterForm, this.formErrors, false)
    }
  }

  getImpsMasterByStateDistrictCity(params) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.postResponsePromise(this.appConstants.getImpsMasterDataByCityUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.impsMasterArr = res.result;
        console.log('IMPS Master array: ', this.impsMasterArr);
        //initiallize datatable
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getImpsMasterDataByCityUrl + "\n" + "Params={}", 'view')
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.errorCallBack(this.appConstants.getImpsMasterDataByCityUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  getImpsMasterByIfscCode(params) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.postResponsePromise(this.appConstants.getImpsMasterDataByIFSCUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.impsMasterArr = res.result;
        console.log('IMPS Master array: ', this.impsMasterArr);
        //initiallize datatable
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getImpsMasterDataByIFSCUrl + "\n" + "Params={}", 'view')
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.errorCallBack(this.appConstants.getImpsMasterDataByIFSCUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  editImpsMaster(item) {
    console.log(item);
    this.commonDataShareService.submenuname = "impsMasterEdit";
    this.commonDataShareService.getById = item.id;
    this.commonMethod.showLoader();
    this.router.navigateByUrl("/impsMasterEdit", { state: { id: item.id } });
  }


  gotoAddImpsMaster() {
    this.commonDataShareService.submenuname = "impsMasterAdd";
    this.router.navigateByUrl("/impsMasterAdd");
  }
  cancelClick() {
    this.commonMethod.cancel();
  }

}
