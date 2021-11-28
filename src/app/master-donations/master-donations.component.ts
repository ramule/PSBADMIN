import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';

import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterDonationsService } from './master-donations.service';
import { Location } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-donations',
  templateUrl: './master-donations.component.html',
  styleUrls: ['./master-donations.component.css']
})
export class MasterDonationsComponent implements OnInit {

  id= 25;
  menuLink = "masterDonation";
  showForm:boolean = false;
  isAddButtonClicked = false;
  masterDonationForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    companyName:'',
    accNo: '',
    type:'',
    status:'',
    remark:'',
    category: ''
  }

  masterDonationFields={
    companyName:'',
    accNo: '',
    type: '',
    status:'',
    category: ''
  }

  //feild parameter
  masterDonation:any =[];
  priviledgeDataArr: any = [];
  status = [];
  p: number = 1;

  selModel:any;
  roleId: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData : CommonDataShareService,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private mastreDonationService: MasterDonationsService,
    public location: Location
  ) { }

  public buildForm() {
    this.masterDonationForm = this.form.group({
      companyName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9_\d\-_.,\s ]+$/)]),
      accNo: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(18), Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9]+$/)]),
      type: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9_\d\-_.,\s ]+$/)]),
      status: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });
    this.masterDonationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.masterDonationForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Donation";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getStatus();
    this.getLeftMenuId();
    this.masterDonationForm.patchValue({
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
          this.getDonation();
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
        var param = this.mastreDonationService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  showHideForm(){
    this.commonServiceCall.pageName = "Add Donation";
    this.showForm = !this.showForm;
    this.isAddButtonClicked = true;
    setTimeout(()=>{
      // $('#sl_Status').val('');
    });
    this.masterDonationForm.patchValue({
      status: 3
    });
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

  getDonation(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getDonationsDetailsUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getDonationsDetailsUrl+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        this.masterDonation = res.result;
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      }
      else{
        $('table.display').DataTable({
          "language": {
            "emptyTable" : "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getDonationsDetailsUrl, res);
      }
      this.destroyDataTable();
    })
  }

  destroyDataTable() {
    console.log('destroy datatable called...');
    $('#dt-sample').DataTable().clear().destroy();
  }

  addMaster(){
    var userDetails = JSON.parse(this.commonServiceCall.userCredential);
    this.formValidation.markFormGroupTouched(this.masterDonationForm);
    if (this.masterDonationForm.valid) {
      var formData = this.masterDonationForm.value;
      var param = this.mastreDonationService.getMasterDonationsDetailsCall(formData);
      this.addDonationMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.masterDonationForm, this.formErrors, false)
    }
  }

  cancel(){
    this.commonServiceCall.pageName = "Donation";
    this.showForm = false;
    this.masterDonationForm.reset();
    this.isAddButtonClicked = false;
    this.getDonation();
  }

  gotoEditDonationMaster(value){
    console.log(value);
    if(value.statusName === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonData.submenuname = "masterDonationEdit";
      this.commonData.DonationData.createdOn = value.createdon;
      this.commonData.DonationData.createdby = value.createdby;
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/masterDonationEdit",{ state: { id: value.id } });
    }
  }

  addDonationMaster(param){
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveDonationDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveDonationDetailsUrl+"\n"+"Params="+JSON.stringify(param),'add')

        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.getStatus();
        this.getDonation();
        this.cancel();
        showToastMessage(res.responseMessage);
      }
      else{
        if(this.commonData.roleType == this.commonData.makerRole) {
          this.masterDonationForm.patchValue({
            companyName: this.masterDonationFields.companyName,
            accNo: this.masterDonationFields.accNo,
            type: this.masterDonationFields.type,
            status : this.masterDonationFields.status,
            category : this.masterDonationFields.category,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.saveDonationDetailsUrl, res);
      }
    })
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.getDonationsDetailsUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.saveDonationDetailsUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.masterStatusUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  openActionModel(action, formdata) {
    if (this.masterDonationForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.masterDonationFields.companyName = formdata.companyName;
      this.masterDonationFields.accNo = formdata.accNo;
      this.masterDonationFields.type = formdata. type;
      this.masterDonationFields.status = formdata.status;
      this.masterDonationFields.category = formdata.category;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.masterDonationForm, this.formErrors, false)
    }
  }

  addDonationWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.mastreDonationService.getMasterDonationsDetailsCallWithRemark(this.masterDonationFields, formData);
      this.addDonationMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.masterDonationForm.patchValue({
      companyName: this.masterDonationFields.companyName,
      accNo: this.masterDonationFields.accNo,
      type: this.masterDonationFields.type,
      status : this.masterDonationFields.status,
      category : this.masterDonationFields.category,
    });
    closeTinyModel();
  }


  //https://infrabotsdev.infrasofttech.com/UploadOffer/message/getStatus
  //https://infrabotsdev.infrasofttech.com/UploadOffer/donation/getDonations
  //https://infrabotsdev.infrasofttech.com/UploadOffer/donation/saveDonationDetails
  //{ "companyName" : "INFRASOFT", "accountNumber" : "000188200001", "type" : "DONATION", "createdby" : "3", "statusId" : "3"}
}
