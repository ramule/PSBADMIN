import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { BankTokenGenerationService } from './bank-token-generation.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-bank-token-generation',
  templateUrl: './bank-token-generation.component.html',
  styleUrls: ['./bank-token-generation.component.css']
})
export class BankTokenGenerationComponent implements OnInit {

  bankTokenGenerationForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    searchBy: '',
    mobileNo: '',
    remarkDelete: '',
    remark: ''
    //type: ''
  }
  p: number = 1;
  customerDetails: any = [];
  toDateValid: boolean = false;
  isToDateValidError:any = "";
  todayDate:any;
  displayImage:any;
  selUserToResetPass:any;
  selModel:any;
  selectAccountToUnfreeze: any;
  type:any;
  roleId: any;

  // upload form
  bulkOfferForm: FormGroup;
  isUploadExcel:boolean = false;
  isValidFileFormat:boolean = false;
  formBulkErrors = {
    bulkCustomerFile: ''
  }
  filename:any = "";
  priviledgeDataArr: any = [];
  id = "9";
  menuLink = "bankTokenGeneration";
  priveledge:any;


  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private commonDataService: CommonDataShareService,
    private bankTokenGenerationService: BankTokenGenerationService
  ) { }

  public buildForm() {
    this.bankTokenGenerationForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
      // fromDate: new FormControl('', [Validators.required]),
      // toDate: new FormControl('', [Validators.required]),
      //type: new FormControl('', [Validators.required])
    });
    this.bankTokenGenerationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.bankTokenGenerationForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Bank Token Generation";
    this.roleId = this.commonDataService.roleId;
    this.buildForm();
    //this.getPriviledgeData()
    this.getLeftMenuId();
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataService.submenuId = res.result[0].id;
        this.commonDataService.submenuname = res.result[0].menuLink;
        console.log(this.commonDataService.submenuname);
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.priveledge = true
        }
        else {
          this.priveledge = false
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        this.priveledge = false
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

 /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = this.bankTokenGenerationService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }


  getSearchByCustomer(value){
    console.log(value);
    this.type = value.searchBy;
    this.customerDetails = [];
    this.bankTokenGenerationForm.removeControl('mobileNo');

    if(this.type == 'mobileNo'){
      this.bankTokenGenerationForm.addControl('mobileNo', new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]));
    }
  }

  cancel(){
    this.commonMethod.cancel();
  }

  getCustomerDetails() {
    this.formValidation.markFormGroupTouched(this.bankTokenGenerationForm);

    if (this.bankTokenGenerationForm.valid) {
      var formData = this.bankTokenGenerationForm.value;
      var _inputdata = this.bankTokenGenerationService.getCustomerDetailsByType(formData);
      if(this.priveledge == true)
      this.getDtlByType(_inputdata);
      else
      showToastMessage('You Dont Have Priviledge To View The Data');
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.bankTokenGenerationForm, this.formErrors, false)
    }
  }

  openActionModel(item) {
    this.selModel = 'bankTokenGeneration';
    this.selectAccountToUnfreeze = item;
    openTinyModel();
  }

  openActionModelWithRemark(action, item) {
    openTinyModel();
    this.selModel = action;
    this.selectAccountToUnfreeze = item;
    this.buildForm();
  }

  generateToken(){
    closeTinyModel();
    console.log(this.selectAccountToUnfreeze);
    var param = this.bankTokenGenerationService.generateBankTokenCall(this.selectAccountToUnfreeze);
    this.generateTokenForCustomer(param);
  }

  generateTokenWithRemark(formData) {
    console.log(this.selectAccountToUnfreeze);
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var param = this.bankTokenGenerationService.generateBankTokenWithRemarkCall(this.selectAccountToUnfreeze, formData);
      this.generateTokenForCustomer(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  generateTokenForCustomer(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.generateCustomerTokenUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        //initiallize datatable
        //   this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getCustByCifMobileName+"\n"+"Params="+JSON.stringify(param),'view')
        showToastMessage(res.responseMessage);
      } else {
        this.errorCallBack(this.appConstants.generateCustomerTokenUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  getDtlByType(param){
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCustByCifMobileName, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        //initiallize datatable
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getCustByCifMobileName+"\n"+"Params="+JSON.stringify(param),'view')
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.customerDetails = res.result;
        if(this.customerDetails.length < 1){
          showToastMessage("No Record Available");
        }
        this.commonMethod.hideLoader();
      } else {

        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustomerDetails, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  closeActionModel(){
    this.bankTokenGenerationForm.patchValue({
      mobileNo: 'mobileNo'
    })
    if(this.selModel == 'remarkField') {
      this.remarkForm.reset();
    }
    closeTinyModel();
  }
}
