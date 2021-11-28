import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { HolidayListAddService } from './holiday-list-add.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-holiday-list-add',
  templateUrl: './holiday-list-add.component.html',
  styleUrls: ['./holiday-list-add.component.css']
})
export class HolidayListAddComponent implements OnInit {

  holidayListAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    state: '',
    holidayDate: '',
    holidayName: '',
    remark: ''
  };

  holidayListFields = {
    state: '',
    holidayDate: '',
    holidayName: '',
  }
  roleId: any;
  countryId: any = 1;
  selModel: any;
  stateId: any;
  statesArr: any = [];
  tempStatesArr: any = [];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings :IDropdownSettings;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private holidayListAddService : HolidayListAddService,
  ) {

  }


  public buildForm() {
    this.holidayListAddForm = this.form.group({
      state: new FormControl('', [Validators.required]),
      holidayDate: new FormControl('', [Validators.required]),
      holidayName: new FormControl('', [Validators.required]),
    });
    this.holidayListAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.holidayListAddForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Holiday List Add";
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.getStates();
    console.log(this.roleId);

    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'stateId',
      textField: 'stateName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


  }

  onItemSelect(item: any) {
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getStates() {
    console.log('country id: ', this.countryId);
    this.commonMethod.showLoader();
    var paramUrl = this.appConstants.getStateNamesUrl + this.countryId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.statesArr = res.result;
      }
      else {
        this.statesArr = [];
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getStateNamesUrl, res);
      }
    })
  }

  filterStates() {
    return this.statesArr.filter(x => x.statusId == 3);
  }

  onStateChange(event) {
    this.stateId = event.target.value;
    console.log(this.stateId);
  }

     /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL,operation)
      {
          var param = this.holidayListAddService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
      }

  openActionModel(action, formdata) {
    if (this.holidayListAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();

      this.tempStatesArr = [];
      console.log(formdata);
      formdata.state.forEach(element => {
        var data = {
          stateId: element.stateId,
          stateName: element.stateName
        }
        this.tempStatesArr.push(data);
      });
      console.log('temp docType Array: ', this.tempStatesArr);

      this.selectedItems = this.tempStatesArr;

      console.log('selected items: ', this.selectedItems);

      this.holidayListFields.state = formdata.state;
      this.holidayListFields.holidayDate = formdata.holidayDate;
      this.holidayListFields.holidayName = formdata.holidayName;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.holidayListAddForm, this.formErrors, false)
    }
  }

  addHolidayWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.holidayListAddService.getholidayAddParamWithRemark(this.holidayListFields, formData);
      this.addHolidayApiCall(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.selectedItems = this.tempStatesArr;
    this.holidayListAddForm.patchValue({
      state: this.holidayListFields.state,
      holidayDate: this.holidayListFields.holidayDate,
      holidayName: this.holidayListFields.holidayName,
    });
    closeTinyModel();
  }

  addHoliday(){
    this.formValidation.markFormGroupTouched(this.holidayListAddForm);
    if (this.holidayListAddForm.valid) {
      var formData = this.holidayListAddForm.value;
      var param = this.holidayListAddService.getholidayAddParam(formData);
      console.log(param);
      this.addHolidayApiCall(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.holidayListAddForm, this.formErrors, false)
    }
  }

  cancel(){
    this.router.navigateByUrl("/holidayList");
  }

  addHolidayApiCall(param){
    this.commonServiceCall.postResponsePromise(this.appConstants.addHolidayDetailsUrl,param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addHolidayDetailsUrl+"\n"+"Params="+JSON.stringify(param),'add')
        this.router.navigateByUrl("/holidayList");
        this.commonMethod.hideLoader();
      } else {
        this.holidayListAddForm.patchValue({
          calculatorType: this.holidayListFields.state,
          calculatorFormula: this.holidayListFields.holidayDate,
          rateCharges: this.holidayListFields.holidayName,
        });
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addHolidayDetailsUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
