import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Location } from '@angular/common';
import { NotificationCategoriesEditService } from './notification-categories-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-notification-categories-edit',
  templateUrl: './notification-categories-edit.component.html',
  styleUrls: ['./notification-categories-edit.component.css']
})
export class NotificationCategoriesEditComponent implements OnInit {

  notificationCategoryEditForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    categoryName: '',
    statusId: '',
    appId: '',
    remark: ''
  };

  notificationCategoriesEditFields = {
    categoryName: '',
    statusId: '',
    appId: '',
  };
  roleId: any;
  selModel: any;

  remarkHistoryArr: any = [];
  masterStatus:any =[];
  productTypes:any=[];
  selUserDtl:any
  notificationCategoryId:any;

  beforeParams:any;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private notificationCategoriesEditService: NotificationCategoriesEditService,
    private location: Location,
  ) { }


  public buildForm() {
    this.notificationCategoryEditForm = this.form.group({
      categoryName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      statusId: new FormControl('', [Validators.required]),
      appId: new FormControl('', [Validators.required])
    });
    this.notificationCategoryEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.notificationCategoryEditForm, this.formErrors, true)
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

  ngOnInit(): void {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/notificationCategories');
      return;
    }

    this.commonServiceCall.pageName = "Edit Notification Category";
    this.roleId = this.commonDataShareService.roleId;
    console.log('Role ID: ',this.roleId);
    this.buildForm();
    this.notificationCategoryId = this.location.getState();
    this.getProductType();
    this.getStatus();
    console.log(this.notificationCategoryId);
    console.log(this.notificationCategoryId.id);
    this.getNotificationCategoryById(this.notificationCategoryId.id);
    this.getRemarkHistoryData(this.notificationCategoryId.id);
  }


     /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL,operation)
      {
          var param = this.notificationCategoriesEditService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
      }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/"+ this.commonDataShareService.submenuId ).subscribe((data) => {
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


  getNotificationCategoryById(id){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getNotificationCategoriesByIdUrl+id).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result[0]);
        this.selUserDtl = res.result[0];
        this.beforeParams = res.result[0];
        if(res.result[0].userAction !=null) {
          this.notificationCategoryEditForm.patchValue({
            categoryName: res.result[0].categoryName,
            statusId: res.result[0].userAction,
            appId: res.result[0].appId
          })
        }
        else {
          this.notificationCategoryEditForm.patchValue({
            categoryName: res.result[0].categoryName,
            statusId: res.result[0].statusId,
            appId: res.result[0].appId
          })
        }
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getNotificationCategoriesByIdUrl, res);
      }
    });
  }

  updateNotificationCategory(){
    this.formValidation.markFormGroupTouched(this.notificationCategoryEditForm);
    if (this.notificationCategoryEditForm.valid) {
      var formData = this.notificationCategoryEditForm.value;
      var param = this.notificationCategoriesEditService.getNotificationCategoriesEditCall(formData,this.selUserDtl);
      this.updateNotificationCategoryMaster(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.notificationCategoryEditForm, this.formErrors, false)
    }
  }

  updateNotificationCategoryWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.notificationCategoriesEditService.getNotificationCategoriesWithRemarkCall(this.notificationCategoriesEditFields, this.selUserDtl, formdata);
      this.updateNotificationCategoryMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  cancel(){
    if(this.commonServiceCall.makerRequestEditUrl == '/notificationCategories') {
      this.router.navigateByUrl("/notificationCategories");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/notificationCategories");
    }
  }

  updateNotificationCategoryMaster(param){
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateNotificationCategoriesUrl,param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateNotificationCategoriesUrl+"\n"+"Params="+JSON.stringify(param)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParams),'update')
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.cancel();
        this.commonMethod.hideLoader();
      } else {
        if(this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.notificationCategoryEditForm.patchValue({
            categoryName: this.notificationCategoriesEditFields.categoryName,
            statusId: this.notificationCategoriesEditFields.statusId,
            appId: this.notificationCategoriesEditFields.appId,
          });
        }
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateNotificationCategoriesUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.masterStatus = [];
        data.resp.forEach(el => {
          if(el.id== 3 || el.id == 0){
            this.masterStatus.push(el);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  getProductType(){
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe(data => {
      if(data.status){
        console.log("roles",data.resp);
        this.productTypes = data.resp;
      }
      else{
        this.commonMethod.errorMessage(data);
      }

    })
  }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP");
  }

  openActionModel(action, formdata) {
    if (this.notificationCategoryEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.notificationCategoriesEditFields.categoryName = formdata.categoryName;
      this.notificationCategoriesEditFields.statusId = formdata.statusId;
      this.notificationCategoriesEditFields.appId = formdata.appId;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.notificationCategoryEditForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.notificationCategoryEditForm.patchValue({
      categoryName: this.notificationCategoriesEditFields.categoryName,
      statusId: this.notificationCategoriesEditFields.statusId,
      appId: this.notificationCategoriesEditFields.appId,
    });
    closeTinyModel();
  }

}
