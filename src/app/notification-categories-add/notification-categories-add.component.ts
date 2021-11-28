import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { NotificationCategoriesAddService } from './notification-categories-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-notification-categories-add',
  templateUrl: './notification-categories-add.component.html',
  styleUrls: ['./notification-categories-add.component.css']
})
export class NotificationCategoriesAddComponent implements OnInit {

  notificationCategoriesAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    categoryName: '',
    statusId: '',
    appId: '',
    remark: ''
  };

  notificationCategoryFields = {
    categoryName: '',
    statusId: '',
    appId: '',
  }
  roleId: any;
  selModel: any;
  masterStatus:any =[];
  productTypes:any=[];
  calculatorName:any = [];

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private notificationCategoriesAddService: NotificationCategoriesAddService
  ) { }


  public buildForm() {
    this.notificationCategoriesAddForm = this.form.group({
      categoryName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      statusId: new FormControl('', [Validators.required]),
      appId: new FormControl('', [Validators.required])
    });
    this.notificationCategoriesAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.notificationCategoriesAddForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Add Notification Category";
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    console.log(this.roleId);
    console.log(this.commonDataShareService.roleId);
    this.getProductType();
    this.getStatus();
    this.notificationCategoriesAddForm.patchValue({
      statusId : 3
    });
    this.commonMethod.hideLoader();
  }


     /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL,operation)
      {
          var param = this.notificationCategoriesAddService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
      }

  openActionModel(action, formdata) {
    if (this.notificationCategoriesAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.notificationCategoryFields.categoryName = formdata.categoryName;
      this.notificationCategoryFields.statusId = formdata.statusId;
      this.notificationCategoryFields.appId = formdata.appId;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.notificationCategoriesAddForm, this.formErrors, false)
    }
  }

  addCalculatorFormulaWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.notificationCategoriesAddService.getNotificationCategoriesWithRemarkCall(this.notificationCategoryFields, formData);
      this.saveNotificationCategories(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.notificationCategoriesAddForm.patchValue({
      categoryName: this.notificationCategoryFields.categoryName,
      statusId: this.notificationCategoryFields.statusId,
      appId: this.notificationCategoryFields.appId,
    });
    closeTinyModel();
  }

  addCalculatorFormula(){
    this.formValidation.markFormGroupTouched(this.notificationCategoriesAddForm);
    if (this.notificationCategoriesAddForm.valid) {
      var formData = this.notificationCategoriesAddForm.value;
      var param = this.notificationCategoriesAddService.getNotificationCategoriesAddCall(formData);
      this.saveNotificationCategories(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.notificationCategoriesAddForm, this.formErrors, false)
    }
  }

  cancel(){
    this.router.navigateByUrl("/notificationCategories");
  }

  saveNotificationCategories(param){
    this.commonServiceCall.postResponsePromise(this.appConstants.saveNotificationCategoriesUrl,param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveNotificationCategoriesUrl+"\n"+"Params="+JSON.stringify(param),'add')
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/notificationCategories");
        this.commonMethod.hideLoader();
      } else {
        if(this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.notificationCategoriesAddForm.patchValue({
            categoryName: this.notificationCategoryFields.categoryName,
            statusId: this.notificationCategoryFields.statusId,
            appId: this.notificationCategoryFields.appId,
          });
        }
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.saveNotificationCategoriesUrl, res);
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

}
