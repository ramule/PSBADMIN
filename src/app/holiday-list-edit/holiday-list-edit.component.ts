import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { DatePipe, Location } from '@angular/common';
import { HolidayListEditService } from './holiday-list-edit.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-holiday-list-edit',
  templateUrl: './holiday-list-edit.component.html',
  styleUrls: ['./holiday-list-edit.component.css']
})
export class HolidayListEditComponent implements OnInit {

  holidayListEditForm: FormGroup;
  statesArr: any = [];
  selectedItems = [];
  masterStatus: any = [];
  holidayListData: any = [];
  beforeParams: any = [];
  tempStatesArr: any = [];
  countryId: any = 1;
  stateId: any;
  holidayList: any;
  remarkForm: FormGroup;
  formErrors = {
    state: '',
    holidayDate: '',
    holidayName: '',
    statusId: '',
    remark: ''
  };
  holidayListFields = {
    state: '',
    holidayDate: '',
    holidayName: '',
    statusId: ''
  }
  roleId: any;
  selModel: any;

  remarkHistoryArr: any = [];
  dropdownSettings :IDropdownSettings;;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private holidayListEditService : HolidayListEditService,
    private location: Location,
    private datePipe: DatePipe
  ) { }


  public buildForm() {
    this.holidayListEditForm = this.form.group({
      state: new FormControl('', [Validators.required]),
      holidayDate: new FormControl('', [Validators.required]),
      holidayName: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
    });
    this.holidayListEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.holidayListEditForm, this.formErrors, true)
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

  ngOnInit(): void {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/holidayList');
      return;
    }

    this.commonServiceCall.pageName = "Edit Holiday List";
    this.roleId = this.commonDataShareService.roleId;
    console.log('Role ID: ',this.roleId);
    this.buildForm();
    this.holidayList = this.location.getState();
    this.getStatus();
    this.getStates();

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

    console.log(this.holidayList);
    console.log(this.holidayList.id);

  }

  getStates() {
    console.log('country id: ', this.countryId);
    this.commonMethod.showLoader();
    var paramUrl = this.appConstants.getStateNamesUrl + this.countryId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe(data => {
      var tempStateArr = []
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        // this.statesArr = res.result;

        for(var i=0; i< res.result.length; i++) {
          if(res.result[i].statusId == 3) {
            var data: any = {
              stateName: res.result[i].stateName,
              stateId: i
            }
            tempStateArr.push(data);
          }
        }
        this.statesArr = tempStateArr
        console.log(this.statesArr);
        this.getHolidayDetailsById(this.holidayList.id);
        this.getRemarkHistoryData(this.holidayList.id);
      }
      else {
        this.statesArr = [];
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getStateNamesUrl, res);
      }
    })
  }

  // filterStates() {
  //   return this.statesArr.filter(x => x.statusId == 3);
  // }

  onStateChange(event) {
    this.stateId = event.target.value;
    console.log(this.stateId);
  }

  onItemSelect(item: any) {
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.holidayListEditService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  getHolidayDetailsById(id){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getHolidayListByIdUrl+id).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result[0]);
        this.holidayListData = res.result[0];
        this.beforeParams = res.result[0];
        if(res.result[0].userAction !=null) {
          this.holidayListEditForm.patchValue({
            holidayDate: res.result[0].holidayDate != null ? this.datePipe.transform(res.result[0].holidayDate, 'yyyy-MM-dd'):'-',
            holidayName: res.result[0].name,
            statusId: res.result[0].userAction,
          })
        }
        else {
          this.holidayListEditForm.patchValue({
            holidayDate: res.result[0].holidayDate != null ? this.datePipe.transform(res.result[0].holidayDate, 'yyyy-MM-dd'):'-',
            holidayName: res.result[0].name,
            statusId: res.result[0].statusId,
          })
        }
        var statesMainArray = [];
        var stateNameArr = res.result[0].stateName.split(',');

        for(var i = 0; i < stateNameArr.length; i++) {
          var objIndex = this.statesArr.findIndex((obj) => obj.stateName.toLowerCase() == stateNameArr[i].toLowerCase());
          console.log('objIndex value: ', objIndex);
          var objStateId = this.statesArr[objIndex].stateId;
          var objStateName = this.statesArr[objIndex].stateName;
          var data: any = {
            stateName: objStateName,
            stateId: objStateId
          }
          statesMainArray.push(data);
        }

        this.selectedItems = statesMainArray;
        console.log(statesMainArray);
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getHolidayListByIdUrl, res);
      }
    });
  }

  updateHolidayList(){
    this.formValidation.markFormGroupTouched(this.holidayListEditForm);
    if (this.holidayListEditForm.valid) {
      var formData = this.holidayListEditForm.value;
      var param = this.holidayListEditService.getHolidayListEditParam(formData, this.holidayListData);
      this.updateHoliday(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.holidayListEditForm, this.formErrors, false)
    }
  }

  updateHolidayListWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.holidayListEditService.getHolidayListEditParamWithRemark(this.holidayListFields, this.holidayListData, this.tempStatesArr, formdata);
      this.updateHoliday(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  cancel(){
    if(this.commonServiceCall.makerRequestEditUrl == '/holidayList') {
      this.router.navigateByUrl("/holidayList");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/holidayList");
    }
  }

  updateHoliday(param){
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateHolidayDetailsUrl,param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateCalculatorFormula+"\n"+"Params="+JSON.stringify(param)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParams),'update')
        this.cancel();
      } else {
        this.holidayListEditForm.patchValue({
          state: this.holidayListFields.state,
          holidayDate: this.holidayListFields.holidayDate,
          holidayName: this.holidayListFields.holidayName,
          statusId: this.holidayListFields.statusId,
        });
        this.errorCallBack(this.appConstants.updateHolidayDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    if (this.holidayListEditForm.valid) {
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

      console.log(formdata.calculatorType);
      this.holidayListFields.state = formdata.state;
      this.holidayListFields.holidayName = formdata.holidayName;
      this.holidayListFields.holidayDate = formdata.holidayDate;
      this.holidayListFields.statusId = formdata.statusId;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.holidayListEditForm, this.formErrors, false)
    }
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

  closeActionMoel() {
    this.selectedItems = this.tempStatesArr;
    this.holidayListEditForm.patchValue({
      state: this.holidayListFields.state,
      holidayName: this.holidayListFields.holidayName,
      holidayDate: this.holidayListFields.holidayDate,
      statusId : this.holidayListFields.statusId
    });
    closeTinyModel();
  }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.masterStatus = [];
        data.resp.forEach(el => {
          if(el.id== 3 || el.id == 0){
            this.masterStatus.push(el);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

}
