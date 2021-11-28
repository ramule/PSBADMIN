import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { CustomerNotificationCategoriesEditService } from './customer-notification-categories-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-customer-notification-categories-edit',
  templateUrl: './customer-notification-categories-edit.component.html',
  styleUrls: ['./customer-notification-categories-edit.component.css']
})
export class CustomerNotificationCategoriesEditComponent implements OnInit {
  beforeUpdate: any = [];
  remarkForm: FormGroup;
  custNotificationCategoriesEditForm: FormGroup;
  formErrors = {
    categoryName: "",
    fromTime: "",
    toTime: "",
    status: "",
    productType: "",
    remark: ''
  };

  custNotificationCategoriesEditFields = {
    custName: '',
    custCIFNo: '',
    categoryName: '',
    fromTime: '',
    toTime: "",
    productType: '',
    status: '',
  };
  roleId: any;
  remarkHistoryArr: any = [];
  selModel: any;
  userstatus: any = [];
  customerDtls: any;
  userInfoDtls: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstants: AppConstants,
    private commonMethod: CommonMethods,
    private custNotificationCategoriesEditService: CustomerNotificationCategoriesEditService,
    public datePipe: DatePipe
  ) { }

  public buildForm() {
    this.custNotificationCategoriesEditForm = this.form.group({
      custName: new FormControl('', [Validators.required]),
      categoryName: new FormControl('', [Validators.required]),
      custCIFNo: new FormControl('', [Validators.required]),
      fromTime: new FormControl('', [Validators.required]),
      toTime: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
    this.custNotificationCategoriesEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.custNotificationCategoriesEditForm, this.formErrors, true)
    });

    if (this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/custNotificationCategories');
      return;
    }

    this.roleId = this.commonData.roleId;
    this.commonServiceCall.pageName = "Edit Customer Info";
    this.customerDtls = this.location.getState();
    console.log(this.customerDtls);
    this.buildForm();
    this.getStatus();
    this.getCustomerDtlById(this.customerDtls.id);
    this.getRemarkHistoryData(this.customerDtls.id);
  }


  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.custNotificationCategoriesEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.userstatus = res.resp;
        console.log('response array: ', this.userstatus);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  filterStatus() {
    return this.userstatus.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/" + this.commonData.submenuId).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.remarkHistoryArr = res.result;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
      }
    });
  }
  getCustomerDtlById(id) {
    this.commonMethod.showLoader(); /*** Loader is called */
    this.commonServiceCall.getResponsePromise(this.appConstants.getCustNotificationCategoriesByIdUrl + id).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.userInfoDtls = res.result[0];
        console.log(this.userInfoDtls);
        this.beforeUpdate = res.result[0];
        if (res.result[0].userAction != null) {
          this.custNotificationCategoriesEditForm.patchValue({
            custName: res.result[0].customerName,
            custCIFNo: res.result[0].cif,
            categoryName: res.result[0].categoryName,
            fromTime: res.result[0].fromTime,
            toTime: res.result[0].toTime,
            productType: res.result[0].appName,
            status: res.result[0].userAction,
          })
        }
        else {
          this.custNotificationCategoriesEditForm.patchValue({
            custName: res.result[0].customerName,
            custCIFNo: res.result[0].cif,
            categoryName: res.result[0].categoryName,
            fromTime: res.result[0].fromTime,
            toTime: res.result[0].toTime,
            productType: res.result[0].appName,
            status: res.result[0].statusId,
          })
        }

        this.commonMethod.hideLoader();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustNotificationCategoriesByIdUrl, data.resp);
      }

    })
  }

  updateCustomerInfo() {
    console.log('update called');
    var userDetails = this.commonData.user_ID;
    this.formValidation.markFormGroupTouched(this.custNotificationCategoriesEditForm);
    if (this.custNotificationCategoriesEditForm.valid) {
      var formData = this.custNotificationCategoriesEditForm.value;
      var inputData = this.custNotificationCategoriesEditService.setCustNotificationCategoriesCall(formData, userDetails, this.userInfoDtls);
      console.log(inputData);
      this.updateCustDetails(inputData);
    } else {
      this.formErrors = this.formValidation.validateForm(this.custNotificationCategoriesEditForm, this.formErrors, false)
    }
  }

  updateCustomerInfoWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    var userDetails = this.commonData.user_ID;
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.custNotificationCategoriesEditService.setCustNotificationCategoriesWithRemarkCall(this.custNotificationCategoriesEditFields, userDetails, this.userInfoDtls, formData);
      this.updateCustDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }


  updateCustDetails(param) {
    console.log('req params', param);
    this.commonMethod.showLoader(); /*** Loader is called */
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCustNotificationCategoriesUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCustNotificationCategoriesUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeUpdate), 'update')
        showToastMessage(res.responseMessage);
        /*** navigate to previous page*/
        this.cancel();
        this.commonMethod.hideLoader();
      }
      else {
        if (this.commonData.roleType == this.commonData.makerRole) {
          this.custNotificationCategoriesEditForm.patchValue({
            custName: this.custNotificationCategoriesEditFields.custName,
            custCIFNo: this.custNotificationCategoriesEditFields.custCIFNo,
            categoryName: this.custNotificationCategoriesEditFields.categoryName,
            productType: this.custNotificationCategoriesEditFields.productType,
            fromTime: this.custNotificationCategoriesEditFields.fromTime,
            toTime: this.custNotificationCategoriesEditFields.toTime,
            status: this.custNotificationCategoriesEditFields.status
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateCustNotificationCategoriesUrl, data.resp);
      }

    })
  }

  cancel() {

    if (this.commonServiceCall.makerRequestEditUrl == '/custNotificationCategories') {
      this.router.navigateByUrl("/custNotificationCategories");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/custNotificationCategories");
    }

  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    if (this.custNotificationCategoriesEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.custNotificationCategoriesEditFields.custName = formdata.custName;
      this.custNotificationCategoriesEditFields.custCIFNo = formdata.custCIFNo;
      this.custNotificationCategoriesEditFields.categoryName = formdata.categoryName;
      this.custNotificationCategoriesEditFields.productType = formdata.productType;
      this.custNotificationCategoriesEditFields.fromTime = formdata.fromTime,
        this.custNotificationCategoriesEditFields.toTime = formdata.toTime,
        this.custNotificationCategoriesEditFields.status = formdata.status
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.custNotificationCategoriesEditForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.custNotificationCategoriesEditForm.patchValue({
      custName: this.custNotificationCategoriesEditFields.custName,
      custCIFNo: this.custNotificationCategoriesEditFields.custCIFNo,
      categoryName: this.custNotificationCategoriesEditFields.categoryName,
      productType: this.custNotificationCategoriesEditFields.productType,
      fromTime: this.custNotificationCategoriesEditFields.fromTime,
      toTime: this.custNotificationCategoriesEditFields.toTime,
      status: this.custNotificationCategoriesEditFields.status
    });
    closeTinyModel();
  }


}
