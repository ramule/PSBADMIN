import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { NotificationEditService } from './notification-edit.service';
import { browserRefresh } from '../app.component';
declare var showToastMessage: any;
@Component({
  selector: 'app-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.css']
})
export class NotificationEditComponent implements OnInit {

  notificationEditForm: FormGroup;
  masterStatus = [];
  productTypes = [];
  notificationTypes = [];
  languageArray: any = [];
  notification;
  selectedNotification;
  formErrors = {
    shortname:'',
    status:'',
    productType:'',
    notificationId:'',
    langCode:'',
    targettitle1:'',
    targetaction1:'',
    targettitle2:'',
    targetaction2:'',
    targettitle3:'',
    targetaction3:'',
    targettitle4: '',
    targetaction4: '',
    contents:'',
  }
  beforeParams:any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private notificationEditService: NotificationEditService
  ) { }

  public buildForm() {
    this.notificationEditForm = this.form.group({
      shortname: new FormControl('', [Validators.required,Validators.maxLength(20)]),
      status: new FormControl('', [Validators.required]),
      langCode: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
      notificationId: new FormControl('', [Validators.required,]),
      targettitle1:new FormControl(''),
      targetaction1:new FormControl(''),
      targettitle2:new FormControl(''),
      targetaction2:new FormControl(''),
      targettitle3:new FormControl(''),
      targetaction3:new FormControl(''),
      targettitle4:new FormControl(''),
      targetaction4:new FormControl(''),
      contents:new FormControl(''),
    });
    this.notificationEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.notificationEditForm, this.formErrors, true)
    });
  }

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/notification');
      return;
    }


    this.commonServiceCall.pageName = "Edit Notification"
    this.notification = this.location.getState();
    console.log('received notification id:', this.notification);
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    this.getNotificationId();
    this.getLanguage();
    this.getNotificationById(this.notification.id);
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.notificationEditService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }


  /* It brings dynamic languages*/
  getLanguage() {
    var url = this.appConstants.getDistinctLanguageJsonCode;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.languageArray = res.result;
      } else {
        showToastMessage(res.responseMessage);
      }
    });
  }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
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

  //on load functions
  getAppMasterList(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getChannelListUrl).subscribe((data) => {
      var res = data.resp;
      console.log('response data: ', res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.productTypes = res.result;
        console.log('response array: ', this.productTypes);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getChannelListUrl, res);
      }
    });
  }

  //on load functions -- to get notifications id
  getNotificationId()
  {
    this.commonServiceCall.getResponsePromise(this.appConstants.getNotificationMasterList).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.notificationTypes = res.result;
        console.log('response array: ', this.notificationTypes);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  getNotificationById(id){
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getNotificationByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
        this.beforeParams = res.result[0];
        this.commonMethod.hideLoader();
        this.selectedNotification = res.result[0];
        this.notificationEditForm.patchValue({
          productType: res.result[0].channelId,
          notificationId: res.result[0].notificationId,
          shortname: res.result[0].shortName,
          contents: res.result[0].contents,
          targettitle1: res.result[0].targetTitle1,
          targetaction1: res.result[0].targetAction1,
          targettitle2: res.result[0].targetTitle2,
          targetaction2: res.result[0].targetAction2,
          targettitle3: res.result[0].targetTitle3,
          targetaction3: res.result[0].targetAction3,
          targettitle4: res.result[0].targetTitle4,
          targetaction4: res.result[0].targetAction4,
          status: res.result[0].statusId,
          langCode: res.result[0].languagecode
        })
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
    })
  }

  gotoNotification() {
    this.router.navigateByUrl('/notification');
  }

  update() {
    this.formValidation.markFormGroupTouched(this.notificationEditForm);
    if (this.notificationEditForm.valid) {
      var formData = this.notificationEditForm.value;
      var param = this.notificationEditService.updateNotificationCall(formData);
      this.updateNotification(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.notificationEditForm, this.formErrors, false)
    }
  }

  updateNotification(params) {
    console.log('updating params: ', params);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateNotificationUrl, params).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateNotificationUrl+"\n"+"Params="+JSON.stringify(params)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParams),'update')
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/notification");
      }
      else {
        showToastMessage("Notification Update Error");
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateNotificationUrl, res);
    })
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.addConfigMasterUrl) {
      this.commonMethod.errorMessage(res);
    }
  }


}
