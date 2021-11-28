import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterFacilityService } from './master-facility.service';
import { Location } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-facility',
  templateUrl: './master-facility.component.html',
  styleUrls: ['./master-facility.component.css']
})
export class MasterFacilityComponent implements OnInit {

  id= 1350;
  menuLink = "masterFacility";
  sendMailAPI: any;
  MasterArray: any = [
  'displayname',
  'limits',
  'ft_NFT',
  'status',
  'encryptiontype',
  'createdon',
  'shortname'
  ]

  showForm:boolean = false;
  isAddButtonClicked = false;
  masterStatus = [];
  productTypes = [];
  facilityMasters = [];
  newFacilityMasters = [];
  priviledgeDataArr: any = [];
  formErrors = {
    displayName:'',
    limits: '',
    ftNft:'',
    activitycode:'',
    encryptionType:'',
    status: '',
    productType: '',
    remark:''
  }

  masterFacilityField={
    displayName: '',
    limits:'',
    ftNft: '',
    activitycode: '',
    encryptionType: '',
    status: '',
    productType: '',
  }
  facilityMasterForm: FormGroup;
  remarkForm: FormGroup;
  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterFacilityService: MasterFacilityService,
    public location:Location
  ) { }

  public buildForm() {
    this.facilityMasterForm = this.form.group({
      displayName: new FormControl('', [Validators.required,Validators.maxLength(40), Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      limits: new FormControl('', [Validators.required,Validators.maxLength(40), Validators.min(1)]),
      ftNft: new FormControl('', [Validators.required]),
      activitycode: new FormControl('', [Validators.required,Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      encryptionType: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
    });
    this.facilityMasterForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.facilityMasterForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Facility Master"
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    this.getLeftMenuId();
    this.facilityMasterForm.patchValue({
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

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getAllFacilityDetails();
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
          var param = this.masterFacilityService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
      }

  showHideForm(){
    this.commonServiceCall.pageName = "Facility Master Add"
    this.showForm = !this.showForm
    this.isAddButtonClicked = true;
    setTimeout(()=>{
      // $('#sl_Status').val('');
      $('#sl_Product').val('');
      $('#sl_FTNFT').val('');
      $('#sl_encryption').val('');
    });
    this.facilityMasterForm.patchValue({
      status: 3
    });
  }

  sendMail() {
    var self = this;
    self.sendMailAPI = this.appConstants.getMasterFacilityDetailsUrl;
    this.router.navigateByUrl("/sendMailToCustomers",{ state: { apiName: self.sendMailAPI, Arr: this.MasterArray} });
  }

  addMaster(){
    this.formValidation.markFormGroupTouched(this.facilityMasterForm);
    if (this.facilityMasterForm.valid) {
      var formData = this.facilityMasterForm.value;
      var param = this.masterFacilityService.addFacilityMasterCall(this.facilityMasterForm.value);
      console.log('request parameters: ', param);
      this.saveConfigMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.facilityMasterForm, this.formErrors, false)
    }
  }

    //called on adding of Master
  saveConfigMaster(param) {
    console.log('adding parameters: ', param);
    //"{"configKey" : "TEST_SARF", "configValue" : "1000", "description" : "Test by sarfaraj", "statusId" : "3", "appId" : "5" }"
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveMasterFacilityDetailsUrl, param).subscribe(data => {
      console.log(data);
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveMasterFacilityDetailsUrl+"\n"+"Params="+JSON.stringify(param),'add')
      if(data.status){
        this.getStatus()
        this.getAppMasterList();
        this.getAllFacilityDetails();
        this.cancel();
        showToastMessage(data.resp.responseMessage);
      }
      else{
        if(this.commonData.roleType == this.commonData.makerRole) {
          this.facilityMasterForm.patchValue({
            displayName: this.masterFacilityField,
            limits: this.masterFacilityField,
            ftNft: this.masterFacilityField.ftNft,
            activitycode: this.masterFacilityField,
            encryptionType: this.masterFacilityField.encryptionType,
            status: this.masterFacilityField.status,
            productType: this.masterFacilityField.productType,
          });
        }
        showToastMessage("Failed To Add Master");
      }
    });
  }

  cancel(){
    this.showForm = !this.showForm;
    this.facilityMasterForm.reset();
    this.isAddButtonClicked = false;
    this.getAllFacilityDetails();
    this.commonServiceCall.pageName = "Facility Master"
  }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB"  || x.shortName == "IVR"  || x.shortName == "ALEXA"  || x.shortName == "WHATSAPP" || x.shortName == "BOTS");
  }

  //on load functions
  getStatus(){
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        console.log('response data: ', res);
        this.masterStatus = res.resp;
        console.log('response array: ', this.masterStatus);
      } else {
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  //on load functions
  getAppMasterList(){
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      console.log('response data: ', res);
      if (res.status) {
        console.log('response data: ', res);
        this.productTypes = res.resp;
        console.log('response array: ', this.productTypes);
      } else {
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  //on load functions
  getAllFacilityDetails(){
    this.newFacilityMasters = [];
      this.commonMethod.showLoader();
      $('#dt-sample').DataTable().clear().destroy();
      this.commonServiceCall.getResponsePromise(this.appConstants.getMasterFacilityDetailsUrl).subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
             this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getMasterFacilityDetailsUrl+"\n"+"Params={}",'view')
          this.commonMethod.hideLoader();
          console.log('response data: ', res);
          this.commonMethod.setDataTable(this.commonServiceCall.pageName);
          this.facilityMasters = res.result;
          this.facilityMasters.forEach(element => {
        //  element.createdon = this.formatDate(element.createdon);
            this.newFacilityMasters.push(element);
          });
          console.log('newConfigMasters array: ', this.newFacilityMasters);
        }
        else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getMasterFacilityDetailsUrl, res);
        }
        $('#dt-sample').DataTable().clear().destroy();
      });
  }

  formatDate(inputDate) {
    if(inputDate!=null || inputDate!= undefined || inputDate!= '') {
      var newDate = new Date(inputDate);
      return newDate.getDate()+'/'+(newDate.getMonth() + 1)+'/'+newDate.getFullYear();
    } else {
      return "";
    }
  }

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


  gotoMasterFacilityDetails(item){
    console.log(item);
    if(item.status === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonData.masterConfig.id = item.id
      this.router.navigateByUrl("/masterFacilityEdit",{ state: { id: item.id} });
      this.commonData.submenuname = "masterFacilityEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  openActionModel(action, formdata) {
    if (this.facilityMasterForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterFacilityField.displayName = formdata.displayName;
      this.masterFacilityField.limits = formdata.limits;
      this.masterFacilityField.ftNft = formdata.ftNft;
      this.masterFacilityField.activitycode = formdata.activitycode;
      this.masterFacilityField.encryptionType = formdata.encryptionType;
      this.masterFacilityField.status = formdata.status;
      this.masterFacilityField.productType = formdata.productType;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.facilityMasterForm, this.formErrors, false)
    }
  }

  addFacilityMasterWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterFacilityService.addFacilityMasterCallWithRemark(this.masterFacilityField, formData);
      this.saveConfigMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.facilityMasterForm.patchValue({
      displayName: this.masterFacilityField.displayName,
      limits: this.masterFacilityField.limits,
      ftNft: this.masterFacilityField.ftNft,
      activitycode: this.masterFacilityField.activitycode,
      encryptionType: this.masterFacilityField.encryptionType,
      status: this.masterFacilityField.status,
      productType: this.masterFacilityField.productType,
    });
    closeTinyModel();
  }
}
