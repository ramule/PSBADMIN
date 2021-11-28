import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterConfigService } from './master-config.service';
import { extend } from 'webdriver-js-extender';
import { Location } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-config',
  templateUrl: './master-config.component.html',
  styleUrls: ['./master-config.component.css']
})
export class MasterConfigComponent implements OnInit {

  id= 2;
  menuLink = "masterConfig";
  showForm:boolean = false;
  configMasterForm: FormGroup;
  remarkForm :FormGroup;
  isAddButtonClicked = false;


  configMasterFields = {
    configKey: '',
    configValue: '',
    description: '',
    status: '',
    productType: ''
  }

  formErrors = {
    configKey:'',
    configValue: '',
    description:'',
    status:'',
    productType:'',
    remark:''
  }


  //feild parameter
  masterStatus = [];
  productTypes = [];
  configMasters = [];
  newConfigMasters = [];
  priviledgeDataArr: any = [];
  p: number = 1;
  selModel: any;
  roleId: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public masterConfigService: MasterConfigService,
    public location :Location
  ) { }

  public buildForm() {
    this.configMasterForm = this.form.group({
      configKey: new FormControl('', [Validators.required,Validators.maxLength(40)]),
      configValue: new FormControl('', [Validators.required,Validators.maxLength(40)]),
      description: new FormControl('', [Validators.required,Validators.maxLength(100)]),
      status: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
    });
    this.configMasterForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.configMasterForm, this.formErrors, true)
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

  ngOnInit(){
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.roleId = this.commonData.roleId;
    this.commonServiceCall.pageName = "Config Master";
    this.buildForm();
    this.getStatus();
    // this.getAppMasterList();
    //this.getPriviledgeData();
    this.getLeftMenuId()
    this.configMasterForm.patchValue({
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
        this.commonData.submenuname =res.result[0].menuLink;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.masterConfigService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
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
          this.getAllConfigDetails();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  showHideForm(){
    this.commonServiceCall.pageName = "Add Config Master";
    this.showForm = !this.showForm

    this.isAddButtonClicked = true;
    setTimeout(()=>{
      // $('#sl_Status').val('');
      $("#sl_Product").val('');
    });
    this.configMasterForm.patchValue({
      status: 3
    });
  }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  filterProduct()
  {
    return this.commonData.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "UPIDESKTOP" || x.shortName == "UPIMOBILE" || x.shortName == "ALL");
  }

  addMaster(){
    this.formValidation.markFormGroupTouched(this.configMasterForm);
    if (this.configMasterForm.valid) {
      var formData = this.configMasterForm.value;
      var param = this.masterConfigService.addConfigMasterData(this.configMasterForm.value);
      console.log('request parameters: ', param);
      this.saveConfigMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.configMasterForm, this.formErrors, false)
    }
  }

    //called on adding of Master
  saveConfigMaster(param) {

    //"{"configKey" : "TEST_SARF", "configValue" : "1000", "description" : "Test by sarfaraj", "statusId" : "3", "appId" : "5" }"
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addConfigMasterUrl, param).subscribe(data => {
      console.log(data);
      if(data.status){
        this.getStatus()
        // this.getAppMasterList();
        this.getAllConfigDetails();
        this.cancel();
        showToastMessage(data.resp.responseMessage);
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addConfigMasterUrl+"\n"+"Params="+JSON.stringify(param),'add')
      }
      else{
        if(this.commonData.roleType == this.commonData.makerRole) {
          this.configMasterForm.patchValue({
            configKey: this.configMasterFields.configKey ,
            configValue: this.configMasterFields.configValue,
            description: this.configMasterFields.description,
            status: this.configMasterFields.status,
            productType : this.configMasterFields.productType
          });
        }
        showToastMessage("Master Add Error");
      }
    });
  }

  cancel(){
    this.commonServiceCall.pageName = "Config Master";
    this.showForm = !this.showForm;
    this.configMasterForm.reset();
    this.isAddButtonClicked = false;
    this.getAllConfigDetails();
  }

  //on load functions
  getStatus(){
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
  */

  //on load functions
  getAllConfigDetails(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.configMasterurl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
          this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.configMasterurl+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.configMasters = res.result;
        console.log('ConfigMasters array: ', this.configMasters);
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
      this.destroyDataTable();
    });
  }




  // wordDownload(filename='abc',element='newtb')
  // {
  //   var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  //   var postHtml = "</body></html>";
  //   var html = preHtml+document.getElementById(element).innerHTML+postHtml;

  //   var blob = new Blob(['\ufeff', html], {
  //       type: 'application/msword'
  //   });

  //   // Specify link url
  //   var url = 'data:application/vnd.ms-word;charset=utf-8,' + html;

  //   // Specify file name
  //   filename = filename?filename+'.doc':'document.doc';

  //   // Create download link element
  //   var downloadLink = document.createElement("a");

  //   document.body.appendChild(downloadLink);

  //   if(navigator.msSaveOrOpenBlob ){
  //       navigator.msSaveOrOpenBlob(blob, filename);
  //   }else{
  //       // Create a link to the file
  //       downloadLink.href = url;

  //       // Setting the file name
  //       downloadLink.download = filename;

  //       //triggering the function
  //       downloadLink.click();
  //   }

  //   document.body.removeChild(downloadLink);
  // }

  destroyDataTable() {
    console.log('destroy datatable called...');
    $('#dt-sample').DataTable().clear().destroy();
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.addConfigMasterUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.configMasterurl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.masterListUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.masterStatusUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.masterStatusUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  cancelClick(){
    this.commonMethod.cancel();
  }



  /*updateOfferStatus(){
    var req = 'offersdetails/updateOfferStatus';
    var param = {
      "id" : 'id',
      "isactive" : 'isActive'
    }
    this.commonServiceCall.postResponsePromise(req,param).subscribe(data => {
      if(data.status){
        console.log(data.resp);
      }
      else{

      }

    })
  }

  updateConfigmaster(){
    var req = 'offersdetails/updateConfigMaster';
    var param = {
      "id" : "id",
      "configValue" : "configvalue",
      "configType" : "configtype",
      "description" : "description"
    }
    this.commonServiceCall.postResponsePromise(req,param).subscribe(data => {
      if(data.status){
        console.log(data.resp);
      }
      else{

      }

    })
  }*/

  gotoMasterConfigDetails(item){
    console.log(item);
    if(item.statusname === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonData.submenuname = "masterConfigEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.commonData.masterConfig.id = item.id
      this.router.navigateByUrl("/masterConfigEdit",{ state: { id: item.id} });
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
      this.configMasterFields.productType = formdata.productType;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.configMasterForm, this.formErrors, false)
    }
  }



  addConfigMasterWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterConfigService.addConfigMasterDataWithRemarks(this.configMasterFields, formData);
      this.saveConfigMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }


  closeActionMoel() {
    this.configMasterForm.patchValue({
      configKey: this.configMasterFields.configKey ,
      configValue: this.configMasterFields.configValue,
      description: this.configMasterFields.description,
      status: this.configMasterFields.status,
      productType : this.configMasterFields.productType
    });
    closeTinyModel();
  }

  //url
  //var loadUrl = sessionStorage.rootOfferUploadUrl + "offersdetails/getConfigMaster";
  //var loadUrl = sessionStorage.rootOfferUploadUrl + "offersdetails/addConfigMaster";
  //var loadUrl = sessionStorage.rootOfferUploadUrl + "message/getStatus";
  //var loadUrl = sessionStorage.rootOfferUploadUrl + "message/getShortname";
  //var loadUrl = sessionStorage.rootOfferUploadUrl + "offersdetails/updateOfferStatus";
  //var loadUrl = sessionStorage.rootOfferUploadUrl + "offersdetails/updateConfigMaster";
}
