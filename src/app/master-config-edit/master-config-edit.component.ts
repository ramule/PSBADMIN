import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Location } from '@angular/common';

import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterConfigEditService } from './master-config-edit.service';
import { browserRefresh } from '../app.component';

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-config-edit',
  templateUrl: './master-config-edit.component.html',
  styleUrls: ['./master-config-edit.component.css']
})
export class MasterConfigEditComponent implements OnInit {

  beforeParam: any = []
  configMasterForm: FormGroup;
  remarkForm: FormGroup;
  productTypes = [];
  remarkHistoryArr : any=[];


  configMasterFields = {
    configKey: '',
    configValue: '',
    description: '',
    status: '',
    productType: ''
  }

  formErrors = {
    configKey: '',
    configValue: '',
    description: '',
    status: '',
    productName: '',
    remark: ''
  }

  //feild parameter
  masterStatus = [];
  selectedConfig: any;
  masterConfig: any;
  selModel: any;
  roleId: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterConfigEditService: MasterConfigEditService,

  ) { }

  public buildForm() {
    this.configMasterForm = this.form.group({
      configKey: new FormControl('', [Validators.required]),
      configValue: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
    });
    this.configMasterForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.configMasterForm, this.formErrors, true)
    });

    if (this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterConfig');
      return;
    }

    this.roleId = this.commonData.roleId;
    this.commonServiceCall.pageName = "Edit Config Master";
    this.masterConfig = this.location.getState();
    this.buildForm();
    this.getStatus();
    // this.getAppMasterList();
    this.getConfigById(this.masterConfig.id);
    this.getRemarkHistoryData(this.masterConfig.id);
  }

  /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL, operation)     {
            var  param  =  this.masterConfigEditService.addAuditTrailAdaptorParams(URL, operation);
            console.log(param)
            this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit,  param).subscribe(data  =>  {
            })
      }

  filterStatus() {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }

  filterProduct() {
    return this.commonData.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "UPIDESKTOP" || x.shortName == "UPIMOBILE" || x.shortName == "ALL");
  }

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.masterStatus = res.resp;
        console.log('response array: ', this.masterStatus);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  /*
  getAppMasterList() {
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
  */

  getConfigById(id) {

    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.configMasterByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.selectedConfig = res.result[0];
        this.beforeParam = res.result[0];
        if (res.result[0].userAction != null) {
          this.configMasterForm.patchValue({
            configKey: res.result[0].configKey,
            configValue: res.result[0].configValue,
            description: res.result[0].description,
            status: res.result[0].userAction,
            productName: res.result[0].appId,

          })
        } else {

          this.configMasterForm.patchValue({
            configKey: res.result[0].configKey,
            configValue: res.result[0].configValue,
            description: res.result[0].description,
            status: res.result[0].statusId,
            productName: res.result[0].appId,

          })
        }
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
    })
  }

  update() {
    this.formValidation.markFormGroupTouched(this.configMasterForm);
    if (this.configMasterForm.valid) {
      var formData = this.configMasterForm.value;
      var param = this.masterConfigEditService.updateConfigMasterById(this.configMasterForm.value, this.selectedConfig)
      this.updateConfigMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.configMasterForm, this.formErrors, false)
    }
  }


  updateConfigMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateConfigMasterUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateConfigMasterUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParam), 'update')
        showToastMessage(res.responseMessage);
      //  this.router.navigateByUrl("/masterConfig");
      if(this.commonServiceCall.makerRequestEditUrl == '/masterConfig') {
        this.router.navigateByUrl("/masterConfig");
      }
      else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
        this.router.navigateByUrl("/makerRequests");
      }
      else {
        this.router.navigateByUrl("/masterConfig");
      }
      }
      else {
        if(this.commonData.roleType == this.commonData.makerRole) {
          this.configMasterForm.patchValue({
            configKey: this.configMasterFields.configKey,
            configValue: this.configMasterFields.configValue,
            description: this.configMasterFields.description,
            status: this.configMasterFields.status,
            productType: this.configMasterFields.productType
          });
        }
        showToastMessage("Master Update Error");
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateConfigMasterUrl, res);
    })
  }
  gotoConfigMaster() {
   // this.router.navigateByUrl("/masterConfig");
   if(this.commonServiceCall.makerRequestEditUrl == '/masterConfig') {
    this.router.navigateByUrl("/masterConfig");
  }
  else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
    this.router.navigateByUrl("/makerRequests");
  }
  else {
    this.router.navigateByUrl("/masterConfig");
  }
  }

  callBackFunction() {
    this.router.navigateByUrl("/masterConfig");
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.masterStatusUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.configMasterByIdUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.updateConfigMasterUrl) {
      this.commonMethod.errorMessage(res);
    }
  }



  openActionModel(action, formdata) {
    if (this.configMasterForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.configMasterFields.configKey = formdata.configKey;
      this.configMasterFields.configValue = formdata.configValue;
      this.configMasterFields.description = formdata.description;
      this.configMasterFields.status = formdata.status;
      this.configMasterFields.productType = formdata.productName;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.configMasterForm, this.formErrors, false)
    }
  }

  updateConfigMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterConfigEditService.updateConfigMasterDataWithRemarks(this.configMasterFields, this.selectedConfig, formData);
      this.updateConfigMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }


  closeActionMoel() {
    this.configMasterForm.patchValue({
      configKey: this.configMasterFields.configKey,
      configValue: this.configMasterFields.configValue,
      description: this.configMasterFields.description,
      status: this.configMasterFields.status,
      productName: this.configMasterFields.productType
    });
    closeTinyModel();
  }
  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/"+ this.commonData.submenuId ).subscribe((data) => {
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


  //https://infrabotsdev.infrasofttech.com/UploadOffer/offersdetails/getConfigById/1501
  //{"id":1501,"createdby":3,"appid":4,"statusid":3,"createdon":1575956978000,"description":"Agent transaction limit","config_KEY":"AGENT_TXN_LIMIT","config_VALUE":"1000000","shortname":"MOBILE","statusname":"ACTIVE"}

  //https://infrabotsdev.infrasofttech.com/UploadOffer/offersdetails/updateConfigMaster/3

}
