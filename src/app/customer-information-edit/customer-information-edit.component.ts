import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { DatePipe, Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonDataShareService } from '../common-data-share.service';
import { CustomerInformationEditService } from './customer-information-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-customer-information-edit',
  templateUrl: './customer-information-edit.component.html',
  styleUrls: ['./customer-information-edit.component.css']
})
export class CustomerInformationEditComponent implements OnInit {
  beforeUpdate: any = [];
  remarkForm: FormGroup;
  customerInfoEditForm: FormGroup;
  formErrors = {
    employeerName: '',
    employeerNo: '',
    employeerAddress: '',
    gstNumber: '',
    status: '',
    remark: ''
  };

  custInfoEditFields = {
    custName: '',
    custCIFNo: '',
    employeerName: '',
    employeerNo: '',
    employeerAddress: '',
    gstNumber: '',
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
    private custEditService: CustomerInformationEditService,
    public datePipe: DatePipe
  ) { }

  public buildForm() {
    this.customerInfoEditForm = this.form.group({
      custName: new FormControl('', [Validators.required]),
      employeerName: new FormControl('', [Validators.required]),
      custCIFNo: new FormControl('', [Validators.required]),
      employeerNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
      employeerAddress: new FormControl('', [Validators.required]),
      gstNumber: new FormControl('', [Validators.required, Validators.minLength(15), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      status: new FormControl('', [Validators.required])
    });
    this.customerInfoEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.customerInfoEditForm, this.formErrors, true)
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
      this.router.navigateByUrl('/customerInfo');
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
    var param = this.custEditService.addAuditTrailAdaptorParams(URL, operation);
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
    this.commonServiceCall.getResponsePromise(this.appConstants.getCustomerInfoById + "/" + id).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.userInfoDtls = res.result[0];
        this.beforeUpdate = res.result[0];
        if (res.result[0].userAction != null) {
          this.customerInfoEditForm.patchValue({
            custName: res.result[0].customername,
            custCIFNo: res.result[0].cif,
            employeerName: res.result[0].employerName,
            employeerNo: res.result[0].employerNumber,
            employeerAddress: res.result[0].employerAddress,
            gstNumber: res.result[0].gstNumber,
            status: res.result[0].userAction,
          })
        }
        else {
          this.customerInfoEditForm.patchValue({
            custName: res.result[0].customername,
            custCIFNo: res.result[0].cif,
            employeerName: res.result[0].employerName,
            employeerNo: res.result[0].employerNumber,
            employeerAddress: res.result[0].employerAddress,
            gstNumber: res.result[0].gstNumber,
            status: res.result[0].statusId
          })
        }

        this.commonMethod.hideLoader();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustomerInfoById, data.resp);
      }

    })
  }

  updateCustomerInfo() {
    console.log('update called');
    var userDetails = this.commonServiceCall.userCredential;
    this.formValidation.markFormGroupTouched(this.customerInfoEditForm);
    if (this.customerInfoEditForm.valid) {
      var formData = this.customerInfoEditForm.value;
      var inputData = this.custEditService.getEditParam(formData, userDetails, this.userInfoDtls);
      console.log(inputData);
      this.updateCustDetails(inputData);
    } else {
      this.formErrors = this.formValidation.validateForm(this.customerInfoEditForm, this.formErrors, false)
    }
  }

  updateCustomerInfoWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    var userDetails = this.commonServiceCall.userCredential;
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.custEditService.getEditParamWithRemark(this.custInfoEditFields, userDetails, this.userInfoDtls, formData);
      this.updateCustDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }


  updateCustDetails(param) {
    console.log('req params', param);
    this.commonMethod.showLoader(); /*** Loader is called */
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCustomerInfo, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCustomerInfo + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeUpdate), 'update')
        showToastMessage(res.responseMessage);
        /*** navigate to previous page*/
        this.cancel();
        this.commonMethod.hideLoader();
      }
      else {
        if (this.commonData.roleType == this.commonData.makerRole) {
          this.customerInfoEditForm.patchValue({
            custName: this.custInfoEditFields.custName,
            custCIFNo: this.custInfoEditFields.custCIFNo,
            employeerName: this.custInfoEditFields.employeerName,
            employeerNo: this.custInfoEditFields.employeerNo,
            employeerAddress: this.custInfoEditFields.employeerAddress,
            gstNumber: this.custInfoEditFields.gstNumber,
            status: this.custInfoEditFields.status
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateCustomerInfo, data.resp);
      }

    })
  }

  cancel() {

    if (this.commonServiceCall.makerRequestEditUrl == '/customerInfo') {
      this.router.navigateByUrl("/customerInfo");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/customerInfo");
    }

  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    if (this.customerInfoEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.custInfoEditFields.custName = formdata.custName;
      this.custInfoEditFields.custCIFNo = formdata.custCIFNo;
      this.custInfoEditFields.employeerName = formdata.employeerName;
      this.custInfoEditFields.employeerNo = formdata.employeerNo;
      this.custInfoEditFields.employeerAddress = formdata.employeerAddress,
        this.custInfoEditFields.gstNumber = formdata.gstNumber,
        this.custInfoEditFields.status = formdata.status
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.customerInfoEditForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.customerInfoEditForm.patchValue({
      custName: this.custInfoEditFields.custName,
      custCIFNo: this.custInfoEditFields.custCIFNo,
      employeerName: this.custInfoEditFields.employeerName,
      employeerNo: this.custInfoEditFields.employeerNo,
      employeerAddress: this.custInfoEditFields.employeerAddress,
      gstNumber: this.custInfoEditFields.gstNumber,
      status: this.custInfoEditFields.status
    });
    closeTinyModel();
  }

}
