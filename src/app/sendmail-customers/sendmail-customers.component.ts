import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { FormValidationsService } from '../form-validations.service';
import { SendmailCustomersService } from './sendmail-customers.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-sendmail-customers',
  templateUrl: './sendmail-customers.component.html',
  styleUrls: ['./sendmail-customers.component.css']
})
export class SendmailCustomersComponent implements OnInit {

  MasterArr: any;
  MasterAPI: any;
  MasterParams: any;
  customerDetailsForm: FormGroup;
  custList: any = [];
  masterStatus = [];
  productTypes =[];
  notificatonsArr = [];
  selParam = [];
  selEmailsParam = [];
  newSelEmailsParam = [];
  customerEmailsForm: FormGroup;

  showCustomerDetails: boolean = false;
  formErrors = {
    searchBy: '',
    custId: '',
    customerName: '',
    mobileNo: '',
    fromDate: '',
    toDate: '',
    emailId: '',
  }
  todayDate: any;
  toDateValid: boolean = false;
  isToDateValidError: any;
  notificationDetail: any;
  type: any;
  isNextButtonClicked: boolean = false;
  templateType: any;
  notificationType: string = "Push";
  invalidEmail:boolean = true
  emailFormValid:boolean = true
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public datePipe: DatePipe,
    public location: Location,
    private sendMailCustomerService: SendmailCustomersService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.MasterArr = this.location.getState();
    console.log(this.MasterArr);
    this.MasterAPI = this.MasterArr.apiName;
    console.log('API Name: ', this.MasterAPI);
    this.MasterParams = this.MasterArr.Arr;
    console.log('Parameters: ', this.MasterParams);
    this.commonServiceCall.pageName = "Email Notification";
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  public buildForm() {
    $("textarea").on("input", () =>
    $("#txtEmail").val(
    $("textarea")
    .val()
    .split('\n')
    .map(e => `'${e}'`)));
    this.customerDetailsForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.customerDetailsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.customerDetailsForm, this.formErrors, true)
    });

    this.customerEmailsForm = this.form.group({
    emails: new FormControl(''),
    });
  }

  select() {
    if ($("#selCheckBox").is(":checked")) {
      this.selParam = [];
      this.custList.map(v => v.isCustNameChecked = true);
      this.custList.forEach(e => {
        if(e.isCustNameChecked){
          var menuDtl = {
            emailId: {email:e.email},
          }
          this.selParam.push(menuDtl);
        }
      });
    console.log('selected customers: ', this.selParam);
    } else {
      this.custList.map(v => v.isCustNameChecked = false);
    }
  }

  /**
   * To get Customer Record by Search Field
   * @param value
   */
  getSearchByCustomer(value) {
    console.log(value);
    this.type = value.searchBy;
    this.custList = [];
    this.showCustomerDetails = false;
    this.customerDetailsForm.removeControl('custId');
    this.customerDetailsForm.removeControl('customerName');
    this.customerDetailsForm.removeControl('emailId');
    this.customerDetailsForm.removeControl('mobileNo');
    this.customerDetailsForm.removeControl('fromDate');
    this.customerDetailsForm.removeControl('toDate');
    switch (this.type) {
      case 'custId':
        this.customerDetailsForm.addControl('custId', new FormControl('', [Validators.required]));
        break;

      case 'customerName':
        this.customerDetailsForm.addControl('customerName', new FormControl('', [Validators.required]));
        break;

      case 'email':
        this.customerDetailsForm.addControl('emailId', new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]));
        break;

      case 'mobileNo':
        this.customerDetailsForm.addControl('mobileNo', new FormControl('', [Validators.required, Validators.maxLength(10)]));
        break;

      case 'date':
        this.customerDetailsForm.addControl('fromDate', new FormControl(this.todayDate, [Validators.required]));
        this.customerDetailsForm.addControl('toDate', new FormControl(this.todayDate, [Validators.required]));
        break;
      default:
        break;
    }

  }

  getCustomerDetails() {
    this.showCustomerDetails = false;
    this.formValidation.markFormGroupTouched(this.customerDetailsForm);
    if (this.customerDetailsForm.valid) {
      if(this.toDateValid){ return; }
      var formData = this.customerDetailsForm.value;
      var _inputdata;
      if(this.type == 'custId'){
        _inputdata = {'id':formData.custId}
        this.getDtlByType(_inputdata);
      }else if(this.type == 'customerName'){
        _inputdata = {'customername':formData.customerName}
        this.getDtlByType(_inputdata);
      }else if(this.type == 'email'){
        _inputdata = {'email':formData.emailId}
        this.getDtlByType(_inputdata);
      }else if(this.type == 'mobileNo'){
        _inputdata = {'mobile':formData.mobileNo}
        this.getDtlByType(_inputdata);
      }else if(this.type == 'date'){
        _inputdata = {'fromdate':formData.fromDate,'todate':formData.toDate}
        this.getDtlByType(_inputdata);
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.customerDetailsForm, this.formErrors, false)
    }
  }

  onDateChange(value) {
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


  getDtlByType(param) {
    this.commonMethod.showLoader();
    this.showCustomerDetails = false;
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCustDetails, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        this.showCustomerDetails = true;
        this.commonMethod.hideLoader();
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.custList = res.result;
        this.custList.forEach(el => {
          el.isCustNameChecked = false;
        });
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustDetails, res);
      }
    });
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


  cancel() {
    this.router.navigateByUrl('/masterFacility');
  }

  onNextClick() {
    if(this.isAllUnChecked()){
      showToastMessage("Please Select The Customer");
      return;
    }
    else {
      this.selParam = [];
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);
      this.custList.forEach(e => {
        if(e.isCustNameChecked){
          var menuDtl = {
            emailId: {email:e.email},
          }
          this.selParam.push(menuDtl);
        }
      });
    console.log('selected customers: ', this.selParam);
    this.sendMail();
    }
    setTimeout(() => {
      $("#sl_template").val('');
    });
  }

  onBackClick() {
    this.isNextButtonClicked = false;
    this.getSearchByCustomer({ searchBy: "", custId: "" });
    setTimeout(() => {
      $("#sel_Cust").val('')
      this.commonMethod.hideLoader();
    }, 500);
    this.commonMethod.showLoader();
    this.customerDetailsForm.reset();
  }

  isAllUnChecked() {
    return this.custList.every(v => v.isCustNameChecked === false);
  }

  isOneChecked() {
    return this.custList.filter(x => x.isCustNameChecked === true);
  }

  //on load functions
  getAllNotificationDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getNotificationUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.notificatonsArr = res.result;
        console.log('Notifications array: ', this.notificatonsArr);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getNotificationUrl, res);
      }
    });
  }

  setNotificationType(type: string) {
    this.notificationType = type;
  }



  sendMail() {
    console.log('API Name: ', this.MasterAPI);
    console.log('Parameters: ', this.MasterParams);
    console.log('Emails Array: ', this.selParam);
    console.log('Emails Array: ', this.customerEmailsForm.valid);

    this.selEmailsParam =[]
    this.selEmailsParam = this.selParam
    this.emailFormValid = true
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailList = this.customerEmailsForm.value
    var emails = emailList.emails.replace(/\s/g,'').split(",");
    if(emails!="") {
    for (var i = 0; i < emails.length; i++) {
      if( emails[i] == "" || ! regex.test(emails[i])){
          this.emailFormValid = false;
          this.invalidEmail =false
        }
        else
        {
          var menuDtl = {
            emailId: {email:emails[i]},
          }
          this.invalidEmail =true
          this.selEmailsParam.push(menuDtl);
        }
      }
    }
    console.log('Emails entered: ', this.selEmailsParam);
    console.log('Emails validator: ', this.invalidEmail);

    ///api calling
    if(this.invalidEmail == true) {
      this.commonMethod.showLoader();
      this.selEmailsParam.forEach(element => {
        this.newSelEmailsParam.push(element.emailId.email);
      });
      console.log('Email Ids: ', this.newSelEmailsParam);
      var param = this.sendMailCustomerService.sendMailApiCall(this.MasterAPI, this.MasterParams, this.newSelEmailsParam);
      this.sendEmailToCustomers(param);
    }
  }

  sendEmailToCustomers(params) {
    this.commonMethod.showLoader();
    console.log(params);
    this.commonServiceCall.postResponsePromise(this.appConstants.sendEmailWithAttachmentUrl, params).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
      else {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
    });
  }
}
