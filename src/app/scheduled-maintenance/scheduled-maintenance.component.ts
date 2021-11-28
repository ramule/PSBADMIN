import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CKEditorComponent } from 'ng2-ckeditor';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ScheduledMaintenanceService } from './scheduled-maintenance.service';
declare var showToastMessage: any;
declare var $: any;
declare var CKEDITOR: any;
@Component({
  selector: 'app-scheduled-maintenance',
  templateUrl: './scheduled-maintenance.component.html',
  styleUrls: ['./scheduled-maintenance.component.css']
})
export class ScheduledMaintenanceComponent implements OnInit {

  menuLink = "scheduledMaintenance";
  scheduledMaintenanceForm: FormGroup;
  custList: any = [];
  masterStatus = [];
  productTypes =[];
  notificatonsArr = [];
  selParam = [];
  selEmailsParam = [];
  newSelEmailsParam = [];
  priviledgeDataArr: any = [];
  customerEmailsForm: FormGroup;
  isAllCustSelected: boolean = false;

  showCustomerDetails: boolean = false;
  formErrors = {
    searchBy: '',
    custId: '',
    customerName: '',
    mobileNo: '',
    fromDate: '',
    toDate: '',
    emailId: '',
    emails: '',
    msgBody: '',
  };
  priveledge: any;
  todayDate: any;
  toDateValid: boolean = false;
  isToDateValidError: any;
  type: any = "";
  templateType: any;
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
    private scheduledMaintenanceService: ScheduledMaintenanceService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.commonServiceCall.pageName = "Scheduled Maintenance";
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.commonMethod.hideLoader();
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
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
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
  addAuditTrailAdaptor(URL, operation) {
    var param = this.scheduledMaintenanceService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  public buildForm() {
    $("textarea").on("input", () =>
    $("#txtEmail").val(
    $("textarea")
    .val()
    .split('\n')
    .map(e => `'${e}'`)));
    this.scheduledMaintenanceForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.scheduledMaintenanceForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.scheduledMaintenanceForm, this.formErrors, true)
    });

    this.buildCustEmailForm();
  }

  buildCustEmailForm() {
    this.customerEmailsForm = this.form.group({
      msgBody: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
    });
    this.customerEmailsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.customerEmailsForm, this.formErrors, true)
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
    this.scheduledMaintenanceForm.removeControl('custId');
    this.scheduledMaintenanceForm.removeControl('customerName');
    this.scheduledMaintenanceForm.removeControl('emailId');
    this.scheduledMaintenanceForm.removeControl('mobileNo');
    this.scheduledMaintenanceForm.removeControl('fromDate');
    this.scheduledMaintenanceForm.removeControl('toDate');
    this.customerEmailsForm.removeControl('emails');

    switch (this.type) {
      case 'all':
        this.isAllCustSelected = true;
        break;
      case 'custId':
        this.isAllCustSelected = false;
        this.scheduledMaintenanceForm.addControl('custId', new FormControl('', [Validators.required]));
        break;

      case 'customerName':
        this.isAllCustSelected = false;
        this.scheduledMaintenanceForm.addControl('customerName', new FormControl('', [Validators.required]));
        break;

      case 'email':
        this.isAllCustSelected = false;
        this.scheduledMaintenanceForm.addControl('emailId', new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]));
        break;

      case 'mobileNo':
        this.isAllCustSelected = false;
        this.scheduledMaintenanceForm.addControl('mobileNo', new FormControl('', [Validators.required, Validators.maxLength(10)]));
        break;

      case 'manual_email':
        this.isAllCustSelected = false;
        this.customerEmailsForm.addControl('emails', new FormControl('', [Validators.required]));
      break;

      case 'date':
        this.isAllCustSelected = false;
        this.scheduledMaintenanceForm.addControl('fromDate', new FormControl(this.todayDate, [Validators.required]));
        this.scheduledMaintenanceForm.addControl('toDate', new FormControl(this.todayDate, [Validators.required]));
        break;
      default:
        break;
    }
    console.log(this.isAllCustSelected);

  }

  getCustomerDetails() {
    this.showCustomerDetails = false;
    this.formValidation.markFormGroupTouched(this.scheduledMaintenanceForm);
    if (this.scheduledMaintenanceForm.valid) {
      if(this.toDateValid){ return; }
      var formData = this.scheduledMaintenanceForm.value;
      var _inputdata;
      console.log('type: ', this.type);
      if(this.type == 'all'){
        this.getAllCustomers();
      }
      else if(this.type == 'custId'){
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
      this.formErrors = this.formValidation.validateForm(this.scheduledMaintenanceForm, this.formErrors, false)
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

  getAllCustomers() {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCustomersDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.showCustomerDetails = true;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.custList = res.result;
        this.custList.forEach(el => {
          el.isCustNameChecked = false;
        });
      } else {

        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.errorCallBack(this.appConstants.getAllCustomersDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    });
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
    this.commonMethod.cancel();
  }

  onSendClick() {
    if(this.customerEmailsForm.valid) {
      if(this.type != 'manual_email' && !this.isAllCustSelected) {
        if(this.isAllUnChecked()){
          showToastMessage("Please Select The Customer");
          return;
        }
      }
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
      setTimeout(() => {
        $("#sl_template").val('');
      });
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.customerEmailsForm, this.formErrors, false)
    }
  }

  isAllUnChecked() {
    return this.custList.every(v => v.isCustNameChecked === false);
  }

  isOneChecked() {
    return this.custList.filter(x => x.isCustNameChecked === true);
  }

  sendMail() {
    this.newSelEmailsParam = [];
    console.log('Emails Array: ', this.selParam);
    console.log('Emails Array: ', this.customerEmailsForm.valid);

    this.selEmailsParam =[]
    this.selEmailsParam = this.selParam
    this.emailFormValid = true
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.type == 'manual_email') {
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
      var messageBodyParam = this.customerEmailsForm.get('msgBody').value;
      var param = this.scheduledMaintenanceService.sendMailApiCall(messageBodyParam, this.newSelEmailsParam);
      this.sendEmailToCustomers(param);
    }
  }

  sendEmailToCustomers(params) {
    this.commonMethod.showLoader();
    console.log(params);
    this.commonServiceCall.postResponsePromise(this.appConstants.sendCustomizeEmailToBulkUsersUrl, params).subscribe((data) => {
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
