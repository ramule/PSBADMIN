import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { ThemeApplyService } from './theme-apply.service';
import { Location } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-theme-apply',
  templateUrl: './theme-apply.component.html',
  styleUrls: ['./theme-apply.component.css']
})
export class ThemeApplyComponent implements OnInit {

  menuLink="themeApply"
  themeApplyForm: FormGroup;
  themeNamesForm: FormGroup;
  themeColorsForm: FormGroup;
  themeBgColorsForm: FormGroup;
  themeMenuOptionsForm: FormGroup;
  remarkForm: FormGroup;
  todayDate: any;
  selModel: any;
  selEditModel: any;
  status: any;
  statuaChanged: boolean = false;
  toDateValid: boolean = false;
  isToDateValidError: any;
  formErrors = {
    themeName:'',
    themeColor:'',
    themeBgColor: '',
    themeMenuOption: '',
    fromDate:'',
    toDate: '',
    status: '',
    themeNameDetails: '',
    themeNameDesc: '',
    themeColorDetails: '',
    themeColorDesc: '',
    themeBgColorDetails: '',
    themeBgColorDesc: '',
    themeMenuOptDetails: '',
    themeMenuOptDesc: '',
    remark: ''
  };
  themeApplyFields = {
    themeName:'',
    themeColor:'',
    themeBgColor: '',
    themeMenuOption: '',
    fromDate:'',
    toDate: '',
    status: '',
  }
  roleId: any;
  updatedStatusIdThemeName: any;
  updatedStatusIdThemeColor: any;
  updatedStatusIdThemeBgColor: any;
  updatedStatusIdThemeMenuOptions: any;
  themesArr = [];
  themeNamesArr = [];
  themeColorsArr = [];
  themeBgColorsArr = [];
  themeMenuOptionsArr = [];
  masterStatus = [];
  priviledgeDataArr: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe,
    private location: Location,
    private themeApplyService: ThemeApplyService,
  ) { }

  public buildForm() {
    this.themeApplyForm = this.form.group({
      themeName: new FormControl('', [Validators.required]),
      themeColor: new FormControl('', [Validators.required]),
      themeBgColor: new FormControl('', [Validators.required]),
      themeMenuOption: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
    this.themeApplyForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.themeApplyForm, this.formErrors, true);
    });
    if(this.selModel == 'themeName') {
      this.themeNamesForm = this.form.group({
        themeNameDetails: new FormControl('', [Validators.required]),
        themeNameDesc: new FormControl('', [Validators.required])
      });
      this.themeNamesForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.themeNamesForm, this.formErrors, true);
      });
    }
    if(this.selModel == 'themeColor') {
      this.themeColorsForm = this.form.group({
        themeColorDetails: new FormControl('', [Validators.required]),
        themeColorDesc: new FormControl('', [Validators.required])
      });
      this.themeColorsForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.themeColorsForm, this.formErrors, true);
      });
    }
    if(this.selModel == 'themeBgColor') {
      this.themeBgColorsForm = this.form.group({
        themeBgColorDetails: new FormControl('', [Validators.required]),
        themeBgColorDesc: new FormControl('', [Validators.required])
      });
      this.themeBgColorsForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.themeBgColorsForm, this.formErrors, true);
      });
    }
    if(this.selModel == 'menuOptions') {
      this.themeMenuOptionsForm = this.form.group({
        themeMenuOptDetails: new FormControl('', [Validators.required]),
        themeMenuOptDesc: new FormControl('', [Validators.required])
      });
      this.themeMenuOptionsForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.themeMenuOptionsForm, this.formErrors, true);
      });
    }
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
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.commonServiceCall.pageName = "Theme Apply";
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getLeftMenuId()
    this.themeApplyForm.patchValue({
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
        this.commonDataShareService.submenuId = res.result[0].id;
        this.commonDataShareService.submenuname = res.result[0].menuLink;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          /* APIs related to get dropdown values */
          this.getAllThemeNames();
          this.getAllThemeColors();
          this.getAllThemeBgColors();
          this.getAllMenuOptions();
          this.getStatus();
          /* API related to get all themes in grid */
          this.getAllThemes();
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
    var param = this.themeApplyService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  cancel() {
    this.commonMethod.cancel();
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

  /* API related to get themes data in grid */
  getAllThemes() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllThemesUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getAllThemesUrl+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.themesArr = res.result;
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        console.log('response array: ', this.themesArr);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllThemeMenuOptions, res);
      }
      this.commonMethod.destroyDataTable();
    });
  }

  closeActionModel() {
    closeTinyModel();
  }

  openModalAction(action) {
    this.selEditModel = "";
    openTinyModel();
    this.selModel = action;
    this.buildForm();
  }

  openEditModalAction(action) {
    this.selModel = "";
    openTinyModel();
    this.selEditModel = action;
  }

  cancelClick() {
    closeTinyModel();
    if(this.selModel == 'themeName') {
      this.themeNamesForm.reset();
    }
    else if(this.selModel == 'themeColor') {
      this.themeColorsForm.reset();
    }
    else if(this.selModel == 'themeBgColor') {
      this.themeBgColorsForm.reset();
    }
    else if(this.selModel == 'menuOptions') {
      this.themeMenuOptionsForm.reset();
    }
  }

  /* method to change status of theme name on toggle */
  onThemeNameStatusChange(theme) {
    this.commonDataShareService.themeName.id = theme.id
    console.log('id: ', theme.id);
    console.log('status id: ', theme.statusid);
    if(theme.statusid == 3) {
      this.updatedStatusIdThemeName = 0;
      for(var i in this.themeNamesArr) {
        if(this.themeNamesArr[i].id == theme.id) {
          this.themeNamesArr[i].statusid = 0;
        }
      }
      this.commonDataShareService.themeName.updatedStatusId = this.updatedStatusIdThemeName;
    }
    else {
      this.updatedStatusIdThemeName = 3
      for(var i in this.themeNamesArr) {
        if(this.themeNamesArr[i].id == theme.id) {
          this.themeNamesArr[i].statusid = 3;
        }
      }
      this.commonDataShareService.themeName.updatedStatusId = this.updatedStatusIdThemeName;
    }
    var params = this.themeApplyService.updateThemeNameStatusCall(theme,this.updatedStatusIdThemeName);
    this.updateThemeName(params);
  }

  /* API call to change theme name status */
  updateThemeName(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateThemeNameUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateThemeNameUrl+"\n"+"Params="+JSON.stringify(params),'update')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.closeActionModel();
        showToastMessage(res.responseMessage);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateThemeNameUrl, res);
      }
    });
  }

  /* method to change status of theme color on toggle */
  onThemeColorStatusChange(theme) {
    this.commonDataShareService.themeColor.id = theme.id
    console.log('id: ', theme.id);
    console.log('status id: ', theme.statusid);
    if(theme.statusid == 3) {
      this.updatedStatusIdThemeColor = 0;
      for(var i in this.themeColorsArr) {
        if(this.themeColorsArr[i].id == theme.id) {
          this.themeColorsArr[i].statusid = 0;
        }
      }
      this.commonDataShareService.themeColor.updatedStatusId = this.updatedStatusIdThemeColor;
    }
    else {
      this.updatedStatusIdThemeColor = 3
      for(var i in this.themeColorsArr) {
        if(this.themeColorsArr[i].id == theme.id) {
          this.themeColorsArr[i].statusid = 3;
        }
      }
      this.commonDataShareService.themeColor.updatedStatusId = this.updatedStatusIdThemeColor;
    }
    var params = this.themeApplyService.updateThemeColorStatusCall(theme,this.updatedStatusIdThemeColor);
    this.updateThemeColor(params);
  }

  /* API call to change theme color status */
  updateThemeColor(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateThemeColorUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateThemeColorUrl+"\n"+"Params="+JSON.stringify(params),'update')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.closeActionModel();
        showToastMessage(res.responseMessage);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateThemeColorUrl, res);
      }
    });
  }

  /* method to change status of theme bg color on toggle */
  onThemeBgColorStatusChange(theme) {
    this.commonDataShareService.themeBgColor.id = theme.id
    console.log('id: ', theme.id);
    console.log('status id: ', theme.statusid);
    if(theme.statusid == 3) {
      this.updatedStatusIdThemeBgColor = 0;
      for(var i in this.themeBgColorsArr) {
        if(this.themeBgColorsArr[i].id == theme.id) {
          this.themeBgColorsArr[i].statusid = 0;
        }
      }
      this.commonDataShareService.themeBgColor.updatedStatusId = this.updatedStatusIdThemeBgColor;
    }
    else {
      this.updatedStatusIdThemeBgColor = 3
      for(var i in this.themeBgColorsArr) {
        if(this.themeBgColorsArr[i].id == theme.id) {
          this.themeBgColorsArr[i].statusid = 3;
        }
      }
      this.commonDataShareService.themeBgColor.updatedStatusId = this.updatedStatusIdThemeBgColor;
    }
    var params = this.themeApplyService.updateThemeBgColorStatusCall(theme,this.updatedStatusIdThemeBgColor);
    this.updateThemeBgColor(params);
  }

  /* API call to change theme bg color status */
  updateThemeBgColor(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateThemeBgColorUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateThemeBgColorUrl+"\n"+"Params="+JSON.stringify(params),'update')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.closeActionModel();
        showToastMessage(res.responseMessage);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateThemeBgColorUrl, res);
      }
    });
  }

  /* method to change status of theme menu option on toggle */
  onThemeMenuOptionStatusChange(theme) {
    this.commonDataShareService.themeMenuOptions.id = theme.id
    console.log('id: ', theme.id);
    console.log('status id: ', theme.statusid);
    if(theme.statusid == 3) {
      this.updatedStatusIdThemeMenuOptions = 0;
      for(var i in this.themeMenuOptionsArr) {
        if(this.themeMenuOptionsArr[i].id == theme.id) {
          this.themeMenuOptionsArr[i].statusid = 0;
        }
      }
      this.commonDataShareService.themeMenuOptions.updatedStatusId = this.updatedStatusIdThemeMenuOptions;
    }
    else {
      this.updatedStatusIdThemeMenuOptions = 3
      for(var i in this.themeMenuOptionsArr) {
        if(this.themeMenuOptionsArr[i].id == theme.id) {
          this.themeMenuOptionsArr[i].statusid = 3;
        }
      }
      this.commonDataShareService.themeMenuOptions.updatedStatusId = this.updatedStatusIdThemeMenuOptions;
    }
    var params = this.themeApplyService.updateThemeMenuOptionStatusCall(theme,this.updatedStatusIdThemeMenuOptions);
    this.updateThemeMenuOption(params);
  }

  /* API call to change theme menu option status */
  updateThemeMenuOption(params) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateThemeMenuOptionUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateThemeMenuOptionUrl+"\n"+"Params="+JSON.stringify(params),'update')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.closeActionModel();
        showToastMessage(res.responseMessage);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateThemeMenuOptionUrl, res);
      }
    });
  }

  /* method to save theme name*/
  onThemeNamesSave(formData) {
    if(this.themeNamesForm.valid) {
      var formData = this.themeNamesForm.value;
      var param = this.themeApplyService.saveThemeNameCall(formData);
      console.log('request parameters: ', param);
      this.saveThemeName(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.themeNamesForm, this.formErrors, false);
    }
  }

  /* API call for saving theme name*/
  saveThemeName(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveThemeNameUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(data);
      if(res.responseCode == 200){
        this.commonMethod.hideLoader();
        this.cancelClick();
        this.getAllThemeNames();
        this.getAllThemeColors();
        this.getAllThemeBgColors();
        this.getAllMenuOptions();
        this.getStatus();
        showToastMessage(res.responseMessage);
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveThemeNameUrl+"\n"+"Params="+JSON.stringify(param),'add')
        this.themeApplyForm.reset();
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.saveThemeNameUrl, res);
      }
    });
  }

  /* method to save theme color*/
  onThemeColorSave(formData) {
    if(this.themeColorsForm.valid) {
      var formData = this.themeColorsForm.value;
      var param = this.themeApplyService.saveThemeColorCall(formData);
      console.log('request parameters: ', param);
      this.saveThemeColor(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.themeColorsForm, this.formErrors, false);
    }
  }

  /* API call for saving theme color*/
  saveThemeColor(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveThemeColorUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(data);
      if(res.responseCode == 200){
        this.commonMethod.hideLoader();
        this.cancelClick();
        this.getAllThemeNames();
        this.getAllThemeColors();
        this.getAllThemeBgColors();
        this.getAllMenuOptions();
        this.getStatus();
        showToastMessage(res.responseMessage);
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveThemeColorUrl+"\n"+"Params="+JSON.stringify(param),'add')
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.saveThemeColorUrl, res);
      }
    });
  }

  /* method to save theme bg color*/
  onThemeBgColorSave(formData) {
    if(this.themeBgColorsForm.valid) {
      var formData = this.themeBgColorsForm.value;
      var param = this.themeApplyService.saveThemeBgColorCall(formData);
      console.log('request parameters: ', param);
      this.saveThemeBgColor(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.themeBgColorsForm, this.formErrors, false);
    }
  }

  /* API call for saving theme bg color*/
  saveThemeBgColor(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveThemeBgColorUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(data);
      if(res.responseCode == 200){
        this.commonMethod.hideLoader();
        this.cancelClick();
        this.getAllThemeNames();
        this.getAllThemeColors();
        this.getAllThemeBgColors();
        this.getAllMenuOptions();
        this.getStatus();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveThemeBgColorUrl+"\n"+"Params="+JSON.stringify(param),'add')
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.saveThemeBgColorUrl, res);
      }
    });
  }

  /* method to save theme menu option*/
  onMenuOptionSave(formData) {
    if(this.themeMenuOptionsForm.valid) {
      var formData = this.themeMenuOptionsForm.value;
      var param = this.themeApplyService.saveMenuOptionCall(formData);
      console.log('request parameters: ', param);
      this.saveMenuOption(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.themeMenuOptionsForm, this.formErrors, false);
    }
  }

  /* API call for saving theme menu option*/
  saveMenuOption(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveMenuOptionUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(data);
      if(res.responseCode == 200){
        this.commonMethod.hideLoader();
        this.cancelClick();
        this.getAllThemeNames();
        this.getAllThemeColors();
        this.getAllThemeBgColors();
        this.getAllMenuOptions();
        this.getStatus();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveMenuOptionUrl+"\n"+"Params="+JSON.stringify(param),'add')
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.saveMenuOptionUrl, res);
      }
    });
  }

  /* Tiny modal popup while saving theme for maker checker */
  openActionModel(action, formdata) {
    if (this.themeApplyForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.themeApplyFields.themeName = formdata.themeName;
      this.themeApplyFields.themeColor = formdata.themeColor;
      this.themeApplyFields.themeBgColor = formdata.themeBgColor;
      this.themeApplyFields.themeMenuOption = formdata.themeMenuOption;
      this.themeApplyFields.fromDate = formdata.fromDate;
      this.themeApplyFields.toDate = formdata.toDate;
      this.themeApplyFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.themeApplyForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.themeApplyForm.patchValue({
      themeName: this.themeApplyFields.themeName,
      themeColor: this.themeApplyFields.themeColor,
      themeBgColor: this.themeApplyFields.themeBgColor,
      themeMenuOption: this.themeApplyFields.themeMenuOption,
      fromDate: this.themeApplyFields.fromDate,
      toDate: this.themeApplyFields.toDate,
      status : this.themeApplyFields.status
    });
    closeTinyModel();
  }

  /* method to save final theme without maker checker request*/
  onThemeApply() {
    if(this.themeApplyForm.valid) {
      if(this.toDateValid){ return; }
      var formData = this.themeApplyForm.value;
      var param = this.themeApplyService.saveApplyThemeCall(formData, this.status);
      console.log('request parameters: ', param);
      this.saveThemeApply(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.themeApplyForm, this.formErrors, false);
    }
  }

  /* method to save final theme for maker checker request*/
  onThemeApplyWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.themeApplyService.saveApplyThemeWithRemarkCall(this.themeApplyFields, this.status, formData);
      this.saveThemeApply(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  /* API call to save final theme */
  saveThemeApply(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveThemeUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(data);
      if(res.responseCode == 200){
        this.commonMethod.hideLoader();
        this.getAllThemeNames();
        this.getAllThemeColors();
        this.getAllThemeBgColors();
        this.getAllMenuOptions();
        this.getStatus();
        this.getAllThemes();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveThemeUrl+"\n"+"Params="+JSON.stringify(param),'add')
      }
      else{
        if(this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.themeApplyForm.patchValue({
            themeName: this.themeApplyFields.themeName,
            themeColor: this.themeApplyFields.themeColor,
            themeBgColor: this.themeApplyFields.themeBgColor,
            themeMenuOption: this.themeApplyFields.themeMenuOption,
            fromDate: this.themeApplyFields.fromDate,
            toDate: this.themeApplyFields.toDate,
            status : this.themeApplyFields.status
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.saveThemeUrl, res);
      }
    });
  }

  gotoEditTheme(theme) {
    console.log(theme);
    if(theme.statusName === 'ADMIN APPROVER PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.submenuname = "themeApplyEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.commonDataShareService.themeApply.createdon = theme.createdon
      this.router.navigateByUrl("/themeApplyEdit",{ state: { id: theme.id} });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


}
