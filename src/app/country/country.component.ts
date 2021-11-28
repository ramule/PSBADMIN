import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CountryService } from './country.service';
import { CommonDataShareService } from '../common-data-share.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countryData: any = {
    countryId: '',
    countryStatusId: ''
  };
  menuLink = "country";
  priviledgeDataArr: any = [];
  counter = 1;
  countryForm: FormGroup;
  countryArr = [];
  public selectedFilterValue = '';
  updatedStatusId;
  p: number = 1;
  selModel: any;
  globalIndex: any;
  isFormValid = false;
  formErrors = {
    filterVal: '',
    searchVal: '',
  }
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    public commonDatashareService: CommonDataShareService,
    private formValidation: FormValidationsService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public countryService: CountryService
  ) { }

  public buildForm() {
    this.countryForm = this.form.group({
      filterVal: new FormControl('', [Validators.required]),
      searchVal: new FormControl('', [Validators.required])
    });
    this.countryForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.countryForm, this.formErrors, true);
      console.log(this.formErrors);
    });
    console.log(this.formErrors);
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Country Restrictions";
    console.log('country data: ', this.commonDatashareService.countryData);
    this.buildForm();

    this.getLeftMenuId();
    this.commonMethod.hideLoader();
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
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDatashareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (!this.priviledgeDataArr.viewChecked) {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.countryService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }


  onSelectedValueChange(event) {
    this.selectedFilterValue = event.target.value;
    this.countryArr = [];
    console.log(this.selectedFilterValue);
    this.countryForm.patchValue({
      searchVal: ""
    });
    this.formErrors.searchVal = "";
  }



  closeActionModel() {
    console.log(this.globalIndex);

    if (this.countryArr[this.globalIndex].isStatusChecked == true) {
      this.countryArr[this.globalIndex].isStatusChecked = false;

    }
    else {
      this.countryArr[this.globalIndex].isStatusChecked = true;

    }
    closeTinyModel();
  }

  openActionModel(index, id, statusid) {
    this.globalIndex = index;
    this.selModel = "changeCountryStatus"
    this.countryData.countryId = id;
    this.countryData.countryStatusId = statusid;
    openTinyModel();
  }

  toggleToBlockUnblock() {
    closeTinyModel();
    this.commonDatashareService.countryData.id = this.countryData.countryId
    console.log('id: ', this.countryData.countryId);
    console.log('status id: ', this.countryData.countryStatusId);
    if (this.countryData.countryStatusId == 3) {
      this.updatedStatusId = 50;
      for (var i in this.countryArr) {
        if (this.countryArr[i].id == this.countryData.countryId) {
          this.countryArr[i].statusid = 50;
        }
      }
      this.commonDatashareService.countryData.updatedStatusId = this.updatedStatusId;
    }
    else {
      this.updatedStatusId = 3
      for (var i in this.countryArr) {
        if (this.countryArr[i].id == this.countryData.countryId) {
          this.countryArr[i].statusid = 3;
        }
      }
      this.commonDatashareService.countryData.updatedStatusId = this.updatedStatusId;
    }
    var params = this.countryService.updateCountryRestrictionStatus(this.countryData.countryId, this.updatedStatusId);
    this.apiCallCountryRestrictionStatus(params);
  }

  countryFormSubmit(data) {
    if (this.countryForm.valid) {
      this.isFormValid = true;
      console.log('country form success');
      console.log(this.countryForm.value);
      var param = this.countryService.getCountryDetails(this.countryForm.value, this.selectedFilterValue);
      this.apiCallCountry(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.countryForm, this.formErrors, false);
    }
  }

  apiCallCountry(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.countryUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.countryUrl + "\n" + "Params=" + JSON.stringify(param), 'view')
        this.commonMethod.hideLoader();
        this.countryArr = res.result;
        this.countryArr.forEach(el => {
          el.isStatusChecked = false;
        })
        for (var i = 0; i < this.countryArr.length; i++) {
          if (this.countryArr[i].statusid == 3) {
            this.countryArr[i].isStatusChecked = true;
          }
          else {
            this.countryArr[i].isStatusChecked = false;
          }
        }
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        console.log('response array: ', this.countryArr);
      }
      else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          });
        })
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.countryUrl, res);
      }
      this.destroyDataTable();
    });
  }

  destroyDataTable() {
    console.log('destroy datatable called...');
    $('#dt-sample').DataTable().clear().destroy();
  }

  apiCallCountryRestrictionStatus(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.countryRestrictionUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        showToastMessage(res.responseMessage);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.countryRestrictionUrl, res);
      }
    });
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.countryUrl) {
      this.commonMethod.errorMessage(res);
    }
  }
}
