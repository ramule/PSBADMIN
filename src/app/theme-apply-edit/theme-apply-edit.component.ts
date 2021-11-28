import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe, Location } from '@angular/common';
import { ThemeApplyEditService } from './theme-apply-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-theme-apply-edit',
  templateUrl: './theme-apply-edit.component.html',
  styleUrls: ['./theme-apply-edit.component.css']
})
export class ThemeApplyEditComponent implements OnInit {
 beforeParam:any=[]
  themeApplyEditForm: FormGroup;
  remarkForm: FormGroup;
  todayDate: any;
  roleId: any;
  selModel: any;
  toDateValid: boolean = false;
  isToDateValidError: any;
  status: any;
  selectedTheme:any;
  statuaChanged: boolean;
  theme: any;
  formErrors = {
    themeName:'',
    themeColor:'',
    themeBgColor: '',
    themeMenuOption: '',
    fromDate:'',
    toDate: '',
    status: '',
    remark: ''
  };
  themeApplyEditFields = {
    themeName:'',
    themeColor:'',
    themeBgColor: '',
    themeMenuOption: '',
    fromDate:'',
    toDate: '',
    status: '',
    forceToAll: ''
  };
  themesArr = [];
  themeNamesArr = [];
  themeColorsArr = [];
  themeBgColorsArr = [];
  themeMenuOptionsArr = [];
  masterStatus = [];
  remarkHistoryArr: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    public datePipe: DatePipe,
    private themeApplyEditService: ThemeApplyEditService
  ) { }

  public buildForm() {
    this.themeApplyEditForm = this.form.group({
      themeName: new FormControl('', [Validators.required]),
      themeColor: new FormControl('', [Validators.required]),
      themeBgColor: new FormControl('', [Validators.required]),
      themeMenuOption: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
    this.themeApplyEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.themeApplyEditForm, this.formErrors, true);
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

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/themeApply');
      return;
    }

    this.theme = this.location.getState();
    this.roleId = this.commonDataShareService.roleId;
    this.commonServiceCall.pageName = "Theme Apply Edit";
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.buildForm();
    this.getStatus();
    this.getAllThemeNames();
    this.getAllThemeColors();
    this.getAllThemeBgColors();
    this.getAllMenuOptions();
    this.getThemeById(this.theme.id);
    this.getRemarkHistoryData(this.theme.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation)
  {
      var param = this.themeApplyEditService.addAuditTrailAdaptorParams(URL,operation);
      console.log(param)
      this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
      })
  }

  /* on load function to get status */
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

  /* on page load function and get values for dropdown*/
  getAllThemeNames() {
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllThemeNamesUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.themeNamesArr = res.result;
        console.log('response array: ', this.themeNamesArr);
      } else {
        this.errorCallBack(this.appConstants.getAllThemeNamesUrl, res);
      }
    });
  }

  /* on page load function and get values for dropdown*/
  getAllThemeColors() {
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllThemeColorsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.themeColorsArr = res.result;
        console.log('response array: ', this.themeColorsArr);
      } else {
        this.errorCallBack(this.appConstants.getAllThemeColorsUrl, res);
      }
    });
  }

  /* on page load function and get values for dropdown*/
  getAllThemeBgColors() {
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllThemeBgColorsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.themeBgColorsArr = res.result;
        console.log('response array: ', this.themeBgColorsArr);
      } else {
        this.errorCallBack(this.appConstants.getAllThemeBgColorsUrl, res);
      }
    });
  }

  /* on page load function and get values for dropdown*/
  getAllMenuOptions() {
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllThemeMenuOptions).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.themeMenuOptionsArr = res.result;
        console.log('response array: ', this.themeMenuOptionsArr);
      } else {
        this.errorCallBack(this.appConstants.getAllThemeMenuOptions, res);
      }
    });
  }

  /* on page load function and get values for dropdown*/
  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/"+ this.commonDataShareService.submenuId).subscribe((data) => {
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

  getThemeById(id){
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getThemeByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
        this.beforeParam = res.result[0];
        this.commonMethod.hideLoader();
        this.selectedTheme = res.result[0];
        this.status = res.result[0].forcedToAll;
        if(this.status == 'Y') {
          this.statuaChanged = true;
        }
        else {
          this.statuaChanged = false;
        }
        if(res.result[0].userAction !=null) {
          this.themeApplyEditForm.patchValue({
            themeName: res.result[0].themeName,
            themeColor: res.result[0].themeSideBarColor,
            themeBgColor: res.result[0].themeSideBarBackground,
            themeMenuOption: res.result[0].themeMenuOptions,
            fromDate: res.result[0].fromDate != null ? this.datePipe.transform(res.result[0].fromDate, 'yyyy-MM-dd'):'-',
            toDate: res.result[0].toDate != null ? this.datePipe.transform(res.result[0].toDate, 'yyyy-MM-dd'):'-',
            status: res.result[0].userAction,
          })
        }
        else {
          this.themeApplyEditForm.patchValue({
            themeName: res.result[0].themeName,
            themeColor: res.result[0].themeSideBarColor,
            themeBgColor: res.result[0].themeSideBarBackground,
            themeMenuOption: res.result[0].themeMenuOptions,
            fromDate: res.result[0].fromDate != null ? this.datePipe.transform(res.result[0].fromDate, 'yyyy-MM-dd'):'-',
            toDate: res.result[0].toDate != null ? this.datePipe.transform(res.result[0].toDate, 'yyyy-MM-dd'):'-',
            status: res.result[0].statusid,
          })
        }
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getThemeByIdUrl, res);
      }
    })
  }

  openActionModel(action, formdata) {
    if (this.themeApplyEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.themeApplyEditFields.themeName = formdata.themeName;
      this.themeApplyEditFields.themeColor = formdata.themeColor;
      this.themeApplyEditFields.themeBgColor = formdata.themeBgColor;
      this.themeApplyEditFields.themeMenuOption = formdata.themeMenuOption;
      this.themeApplyEditFields.fromDate = formdata.fromDate;
      this.themeApplyEditFields.toDate = formdata.toDate;
      this.themeApplyEditFields.status = formdata.status;
      this.themeApplyEditFields.forceToAll = this.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.themeApplyEditForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.themeApplyEditForm.patchValue({
      themeName: this.themeApplyEditFields.themeName,
      themeColor: this.themeApplyEditFields.themeColor,
      themeBgColor: this.themeApplyEditFields.themeBgColor,
      themeMenuOption: this.themeApplyEditFields.themeMenuOption,
      fromDate : this.themeApplyEditFields.fromDate,
      toDate : this.themeApplyEditFields.toDate,
      status : this.themeApplyEditFields.status
    });
    this.status = this.themeApplyEditFields.forceToAll;
    closeTinyModel();
  }

  onThemeUpdate() {
    this.formValidation.markFormGroupTouched(this.themeApplyEditForm);
    if (this.themeApplyEditForm.valid) {
      var formData = this.themeApplyEditForm.value;
      var param = this.themeApplyEditService.updateThemeCall(formData, this.theme.id, this.status, this.selectedTheme);
      this.updateTheme(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.themeApplyEditForm, this.formErrors, false)
    }
  }

  onThemeUpdateWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.themeApplyEditService.updateThemeWithRemarkCall(this.themeApplyEditFields, this.theme.id, this.status, this.selectedTheme, formData);
      this.updateTheme(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  updateTheme(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateThemeUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
          this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateThemeUrl+"\n"+"Params="+JSON.stringify(param)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParam),'update')
        showToastMessage(res.responseMessage);
        if(this.commonServiceCall.makerRequestEditUrl == '/themeApply') {
          this.router.navigateByUrl("/themeApply");
        }
        else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
          this.router.navigateByUrl("/makerRequests");
        }
        else {
          this.router.navigateByUrl("/themeApply");
        }
      }
      else {
        if(this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.themeApplyEditForm.patchValue({
            themeName: this.themeApplyEditFields.themeName,
            themeColor: this.themeApplyEditFields.themeColor,
            themeBgColor: this.themeApplyEditFields.themeBgColor,
            themeMenuOption: this.themeApplyEditFields.themeMenuOption,
            fromDate : this.themeApplyEditFields.fromDate,
            toDate : this.themeApplyEditFields.toDate,
            status : this.themeApplyEditFields.status
          });
        }
        this.status = this.themeApplyEditFields.forceToAll;
        closeTinyModel();
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateThemeUrl, res);
    })
  }

  onDateChange(value) {
    console.log(value);
    if (value.fromDate != "" && value.toDate != "") {
      if (value.toDate < value.fromDate) {
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* Please enter valid date";
      }
      else {
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }

  onStatusChange(event) {
    this.statuaChanged = !this.statuaChanged;
    if(this.statuaChanged) {
      this.status = 'Y';
    }
    else {
      this.status = 'N';
    }
  }

  cancel() {
    if(this.commonServiceCall.makerRequestEditUrl == '/themeApply') {
      this.router.navigateByUrl("/themeApply");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/themeApply");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


}
