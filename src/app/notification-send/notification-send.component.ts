import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { DatePipe, Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonDataShareService } from '../common-data-share.service';
import { NotificationSendService } from './notification-send.service';
declare var showToastMessage: any;
declare var $ :any;

@Component({
  selector: 'app-notification-send',
  templateUrl: './notification-send.component.html',
  styleUrls: ['./notification-send.component.css']
})
export class NotificationSendComponent implements OnInit {
  sendNotificationForm: FormGroup;
  customerDetailsForm: FormGroup;
  custList: any = [];
  masterStatus = [];
  notificatonsArr = [];
  notificationTypes = [];

  showCustomerDetails:boolean = false;
  formErrors = {
    searchBy: '',
    custId: '',
    customerName: '',
    mobileNo: '',
    fromDate: '',
    toDate: '',
    emailId: '',
    productType: ''
  }

  formErrorsNot={
    template:'',
    manualTemplate:'',
    message:''
  }
  todayDate: any;
  toDateValid: boolean = false;
  isToDateValidError: any;
  notificationDetail: any;
  type: any;
  isNextButtonClicked:boolean = false;
  templateType:any;
  notificationType:string="Push";
  selectedNotification:string="";
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
    public notificationSendService:NotificationSendService
  ) { }
  ngOnInit(): void {
    this.buildForm();
    this.getNotificationId();
    this.notificationDetail = this.location.getState();
    this.commonServiceCall.pageName = "Send Notification";
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    
    
  }

   /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL,operation)
      {
          var param = this.notificationSendService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
      }


  //on load functions -- to get notifications id
  getNotificationId() {
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getNotificationMasterList)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == 200) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.notificationTypes = res.result;
          console.log("response array: ", this.notificationTypes);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  public buildForm() {
    this.customerDetailsForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.customerDetailsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.customerDetailsForm, this.formErrors, true)
    });

    this.sendNotificationForm = this.form.group({
      template: new FormControl('', [Validators.required]),
      message :new FormControl('', [Validators.required]),
      notificationId :new FormControl('', [Validators.required]),
    });
    this.sendNotificationForm.valueChanges.subscribe((data) => {
      this.formErrorsNot = this.formValidation.validateForm(this.sendNotificationForm, this.formErrorsNot, true)
    });
  }

  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        this.commonMethod.hideLoader();
        console.log('Data resp: ', data.resp);
        this.masterStatus = [];
        data.resp.forEach(el => {
          if (el.id == 3 || el.id == 0) {
            this.masterStatus.push(el);
          }
        });
      } else {
        this.commonMethod.hideLoader();
        this.commonMethod.errorMessage(data);
      }
    });
  }


  select(){
    if ($("#custNameCheckBox").is(":checked")) {
      this.custList.map(v => v.isCustNameChecked = true);
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
        this.customerDetailsForm.addControl('fromDate', new FormControl("", [Validators.required]));
        this.customerDetailsForm.addControl('toDate', new FormControl("", [Validators.required]));
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
    this.commonServiceCall.postResponsePromise(this.appConstants.getCustDetails,param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        this.showCustomerDetails = true;
        this.commonMethod.hideLoader();
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.custList = res.result;
        this.custList.forEach(el => {
          el.isCustNameChecked = false;});
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
    this.router.navigateByUrl('/notificationDetails');
  }

  saveSendNotificationDetails() {
    this.formValidation.markFormGroupTouched(this.sendNotificationForm);
    if (this.sendNotificationForm.valid) {
      var formData = this.sendNotificationForm.value;
      var params = this.notificationSendService.setSendNotificationParams(formData,this.custList);
      console.log('Send Notification Params ',params);
      this.saveRecord(params)
    } else {
      this.formErrorsNot = this.formValidation.validateForm(this.sendNotificationForm, this.formErrorsNot, false)
    }
  }



  saveRecord(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addNotificationDetails, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addNotificationDetails+"\n"+"Params="+JSON.stringify(param),'add')
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl('/notificationDetails');
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addNotificationDetails, res);
      }
    })
  }

  onNextClick(){
    if(this.isAllUnChecked()){
      showToastMessage("Please Select The Customer");
      return;
    }
    this.isNextButtonClicked = true;
    this.getAllNotificationDetails();
    setTimeout(()=>{
      $("#sl_template").val('');
    })
  }

  onBackClick(){
    this.isNextButtonClicked = false;
    this.getSearchByCustomer({searchBy: "", custId: ""});
    this.sendNotificationForm.reset();
    setTimeout(()=>{
      $("#sel_Cust").val('')
      this.commonMethod.hideLoader();
    },500);
    this.commonMethod.showLoader();
    this.customerDetailsForm.reset();
  }

  isAllUnChecked(){
    return this.custList.every( v => v.isCustNameChecked === false);
  }

  getTemplateType(obj){
    console.log('getTemplateType ',obj.template);

    // this.templateType = value.template;
    // if(this.templateType == 'manualTemplate'){
    //   this.sendNotificationForm.addControl('manualTemplate', new FormControl('', [Validators.required]));
    // }else{
    //   this.sendNotificationForm.removeControl('manualTemplate');
    // }
    if(obj.template != 'manualTemplate'){
      this.getNotificationById(obj.template);
    }else{
      this.sendNotificationForm.patchValue({
        message: '',
      })
    }

  }

  getNotificationById(id){
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getNotificationByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
        this.commonMethod.hideLoader();
        this.selectedNotification = res.result[0];
        this.sendNotificationForm.patchValue({
          message: res.result[0].contents,
        })
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
    })
  }


    //on load functions
    getAllNotificationDetails(){
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

    setNotificationType(type:string){
      this.notificationType = type;
    }

}
