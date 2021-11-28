import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterLocationService } from './master-location.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-location',
  templateUrl: './master-location.component.html',
  styleUrls: ['./master-location.component.css']
})
export class MasterLocationComponent implements OnInit {

  id= 20;
  menuLink = "masterLocation";
  isAddButtonClicked = false;
  showForm: boolean = false;
  configLocationForm: FormGroup;
  remarkForm:FormGroup;
  productTypes: any = [];
  selectedCountryId;
  selectedStateId;
  formErrors = {
    locType: '',
    displayName: '',
    emailId: '',
    mobile: '',
    address: '',
    branchCode: '',
    latitude: '',
    longitude: '',
    postCode: '',
    langCode: '',
    country: '',
    state: '',
    city: '',
    status: '',
    productType: '',
    remark:''
  }

  masterLocationFields={
    locType: '',
    displayName: '',
    emailId: '',
    mobile: '',
    address: '',
    branchCode: '',
    latitude: '',
    longitude: '',
    postCode: '',
    langCode: '',
    country: '',
    state: '',
    city: '',
    status: '',
    productType: ''
  }

  //page variables
  menuLocation: any = [];
  states: any = [];
  country: any = [];
  city: any = [];
  status: any = [];
  locationType: any = [];
  priviledgeDataArr: any = [];

  p: number = 1;

  roleId: any;
  selModel: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData : CommonDataShareService,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private masterLocationService: MasterLocationService,
    public location:Location
  ) { }

  public buildForm() {
    this.configLocationForm = this.form.group({
      locType: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      emailId: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]),
      mobile: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      address: new FormControl('', [Validators.required]),
      branchCode: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      latitude: new FormControl('', [Validators.required, Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/)]),
      longitude: new FormControl('', [Validators.required, Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/)]),
      postCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
      langCode: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
    });
    this.configLocationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.configLocationForm, this.formErrors, true)
    });

    if(this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit() {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.roleId = this.commonData.roleId;
    this.commonServiceCall.pageName = "Locations";
    this.buildForm();
    this.getCountryName();
    this.getStatus();
    this.getLocationsType();
    this.getLeftMenuId();
    this.getAppMasterList();
    this.configLocationForm.patchValue({
      status: 3
    });
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        this.commonData.submenuId = res.result[0].id;
        this.commonData.submenuname = res.result[0].menuLink;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
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

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getLocation();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.masterLocationService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }


  cancelClick(){
    this.commonMethod.cancel();
  }

  showHideForm() {
    this.commonServiceCall.pageName = "Add Location";
    this.showForm = !this.showForm;
    this.isAddButtonClicked = true;
    setTimeout(()=>{
      $('#sl_loctype').val('');
      $('#sl_country').val('');
      $('#sl_state').val('');
      $('#sl_city').val('');
      // $('#sl_status').val('');
      $('#sl_lang').val('');
    });
    this.configLocationForm.patchValue({
      status: 3
    });
  }

  addLocMaster() {
    console.log('add clicked');
    this.formValidation.markFormGroupTouched(this.configLocationForm);
    if (this.configLocationForm.valid) {
      var formData = this.configLocationForm.value;
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);
      var param = this.masterLocationService.addMasterLocationCall(formData);
      console.log(param);
      this.saveLocationMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.configLocationForm, this.formErrors, false)
    }
  }


  //functions on load
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

  onCityChange(event) {
    this.selectedStateId = event.target.value;
    this.configLocationForm.get('city').setValue('');
    console.log('selected state: ', this.selectedStateId);
    this.getCityName(this.selectedCountryId,this.selectedStateId);
    this.city = [];
  }

  getCityName(countryId, stateId) {
    this.commonMethod.showLoader();
    var paramUrl = this.appConstants.getCityNamesUrl + countryId + '/' +stateId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        // this.city = res.result;

        res.result.forEach(element => {
          if(element.statusId == 3) {
            this.city.push(element);
          }
        });
      }
      else {
        this.city = [];
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCityNamesUrl, res);
      }
    })
  }

  getCountryName() {
    this.country = [];
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCountryNamesUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        // this.country = res.result;

        res.result.forEach(element => {
          if(element.statusId == 3) {
            this.country.push(element);
          }
        });
        console.log('Country data: ', this.country);
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCountryNamesUrl, res);
      }
    })
  }

  onCountryChange(event) {
    this.configLocationForm.get('state').setValue('');
    this.configLocationForm.get('city').setValue('');
    this.selectedCountryId = event.target.value;
    console.log('selected country id: ', this.selectedCountryId);
    this.getStateName(this.selectedCountryId);
    this.city = [];
  }

  filterStatus()
  {
    return this.status.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  //on load functions
  getStatus(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.status = res.resp;
        console.log('response array: ', this.status);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  filterLocationType() {
    return this.locationType.filter(x => x.locationType == 'ALL' ||  x.locationType == 'ATM' ||  x.locationType == 'BRANCH' ||  x.locationType == 'KIOSK');
  }

  getLocationsType() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getLocationTypesUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.locationType = res.result;
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getLocationTypesUrl, res);
      }
    })
  }

  getLocation() {
    this.commonMethod.showLoader();
    $('#dt-sample').DataTable().clear().destroy();
    this.commonServiceCall.getResponsePromise(this.appConstants.getLocationListUrl).subscribe(data => {
      var res = data.resp;
      console.log(data);
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getLocationListUrl+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.menuLocation = res.result;
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getLocationListUrl, res);
      }
      $('#dt-sample').DataTable().clear().destroy();
    })
  }

  saveLocationMaster(param) {
    console.log('adding parameters: ', param);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addLocationDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addLocationDetailsUrl+"\n"+"Params="+JSON.stringify(param),'add')
        showToastMessage(res.responseMessage);
        console.log(res);
        this.getLocation();
        this.cancel();
      }
      else{
        this.configLocationForm.patchValue({
          locType :this.masterLocationFields.locType,
          displayName :this.masterLocationFields.displayName,
          emailId :this.masterLocationFields.emailId,
          mobile :this.masterLocationFields.mobile,
          address :this.masterLocationFields.address,
          branchCode :this.masterLocationFields.branchCode,
          latitude :this.masterLocationFields.latitude,
          longitude :this.masterLocationFields.longitude,
          postCode :this.masterLocationFields.postCode,
          langCode :this.masterLocationFields.langCode,
          country :this.masterLocationFields.country,
          state :this.masterLocationFields.state,
          city :this.masterLocationFields.city,
          status :this.masterLocationFields.status,
          productType :this.masterLocationFields.productType
        });
        showToastMessage(res.responseMessage);
      }
    })
  }

  gotoMasterLoc(item){
    console.log(item);
    if(item.statusName === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonData.masterLocation.countryId = item.countryId;
      this.commonData.masterLocation.stateId = item.stateId;
      this.commonData.masterLocation.cityId = item.cityId;
      this.commonData.masterLocation.locId  = item.id;
      this.router.navigateByUrl("/masterLocationEdit" ,{ state: { id: item.id } });
      this.commonData.submenuname = "masterLocationEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  cancel(){
    this.commonServiceCall.pageName = "Location";
    this.showForm = false;
    this.configLocationForm.reset();
    this.isAddButtonClicked = false;
    this.getLocation();
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.getLocationListUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.getCountryNamesUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.getStateNamesUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.getCityNamesUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.addLocationDetailsUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.getLocationTypesUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.masterStatusUrl) {
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
      this.masterLocationFields.productType = formdata.productType
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.configLocationForm, this.formErrors, false)
    }
  }

  addCalculatorFormulaWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterLocationService.addMasterLocationCallWithRemark(this.masterLocationFields, formData);
      this.saveLocationMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.configLocationForm.patchValue({
      locType :this.masterLocationFields.locType,
      displayName :this.masterLocationFields.displayName,
      emailId :this.masterLocationFields.emailId,
      mobile :this.masterLocationFields.mobile,
      address :this.masterLocationFields.address,
      branchCode :this.masterLocationFields.branchCode,
      latitude :this.masterLocationFields.latitude,
      longitude :this.masterLocationFields.longitude,
      postCode :this.masterLocationFields.postCode,
      langCode :this.masterLocationFields.langCode,
      country :this.masterLocationFields.country,
      state :this.masterLocationFields.state,
      city :this.masterLocationFields.city,
      status :this.masterLocationFields.status,
      productType :this.masterLocationFields.productType
    });
    closeTinyModel();
  }

}
