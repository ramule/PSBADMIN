import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
declare var showToastMessage: any;
@Component({
  selector: 'app-master-transactions-limits',
  templateUrl: './master-transactions-limits.component.html',
  styleUrls: ['./master-transactions-limits.component.css']
})
export class MasterTransactionsLimitsComponent implements OnInit {

  masterTransactionForm: FormGroup;
  menuLink = "masterTransLimit";
  LowerLimit;
  UpperLimit;
  customerTypeArr = [];
  transactionTypeArr = [];
  priviledgeDataArr: any = [];
  formErrors = {
    customerType: '',
    transactionType: '',
    lowerLimit: '',
    upperLimit: ''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
  ) { }

  public buildForm() {
    this.masterTransactionForm = this.form.group({
      customerType: new FormControl('', [Validators.required,Validators.maxLength(40)]),
      transactionType: new FormControl('', [Validators.required,Validators.maxLength(40)]),
      lowerLimit: new FormControl('', [Validators.required,Validators.maxLength(40)]),
      upperLimit: new FormControl('', [Validators.required,Validators.maxLength(40)]),
    });
    this.masterTransactionForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.masterTransactionForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Transaction Limits";
    this.buildForm();
    this.getCustomerType();
    this.getTransactionType();
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
          // this.getAllMasterProductDetails();
          console.log('success');
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/dashboard');
  }

  //on load functions
  getCustomerType(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCustomerTypeUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == 200) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.customerTypeArr = res.result;
        console.log('response array: ', this.customerTypeArr);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustomerTypeUrl, res);
      }
    });
  }

  //on load functions
  getTransactionType(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getTransactionTypeUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == 200) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.transactionTypeArr = res.result;
        console.log('response array: ', this.transactionTypeArr);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getTransactionTypeUrl, res);
      }
    });
  }

  save() {
    this.LowerLimit = Number(this.masterTransactionForm.value.lowerLimit);
    this.UpperLimit = Number(this.masterTransactionForm.value.upperLimit);
    this.formValidation.markFormGroupTouched(this.masterTransactionForm);
    console.log(this.masterTransactionForm);
    if(this.masterTransactionForm.valid) {
      if(this.LowerLimit < this.UpperLimit && this.LowerLimit >= 100000 && this.UpperLimit <= 5000000) {
          showToastMessage('form success');
      }
      else {
        showToastMessage('Please Enter Valid Range Of Limits...');
      }
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.masterTransactionForm, this.formErrors, false)
    }
  }


  errorCallBack(fld, res) {
    if (fld == this.appConstants.addConfigMasterUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

}
