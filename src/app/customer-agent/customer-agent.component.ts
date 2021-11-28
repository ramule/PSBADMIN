import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
import { CustomerAgentService } from './customer-agent.service';
import { DatePipe } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare function openTinyModel1(): any;
declare function closeTinyModel1(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-customer-agent',
  templateUrl: './customer-agent.component.html',
  styleUrls: ['./customer-agent.component.css']
})
export class CustomerAgentComponent implements OnInit {

  customerDetailsForm: FormGroup;
  remarkDeleteForm: FormGroup;
  formErrors = {
    searchBy: '',
    cifNo: '',
    customerName: '',
    mobileNo: '',
    fromDate: '',
    toDate: '',
    remarkDelete: ''
    //type: ''
  }
  p: number = 1;
  customerDetails: any = [];
  toDateValid: boolean = false;
  isToDateValidError: any = "";
  todayDate: any;
  displayImage: any;
  selUserToResetPass: any;
  selModel: any;
  type: any;
  roleId: any;

  // upload form
  bulkOfferForm: FormGroup;
  isUploadExcel: boolean = false;
  isValidFileFormat: boolean = false;
  formBulkErrors = {
    bulkCustomerFile: ''
  }
  filename: any = "";
  priviledgeDataArr: any = [];
  id = "9";
  menuLink = "customerAgent";
  priveledge: any;
  deviceMaster:any=[]

  customerIdMaster:any=""
  deviceStatusId:any=""


  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private customerAgentService: CustomerAgentService,
    public datePipe: DatePipe,
    public commonDataService: CommonDataShareService
  ) { }

  public buildForm() {
    this.customerDetailsForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.customerDetailsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.customerDetailsForm, this.formErrors, true)
    });


    this.bulkOfferForm = this.form.group({
      bulkCustomerFile: new FormControl('')
    });
    this.bulkOfferForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.bulkOfferForm, this.formErrors, true)
    });

    if (this.selModel == 'resetPassWithRemark' || this.selModel == 'devicewithremark') {
      this.remarkDeleteForm = this.form.group({
        remarkDelete: new FormControl('', [Validators.required])
      });
      this.remarkDeleteForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkDeleteForm, this.formErrors, true)
      });
    }

  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Customers Details";
    this.roleId = this.commonDataService.roleId;
    this.buildForm();
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
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
    var param = this.customerAgentService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }


  getSearchByCustomer(value) {
    this.toDateValid = false;
    console.log(value);
    this.type = value.searchBy;
    this.customerDetails = [];
    this.customerDetailsForm.removeControl('cifNo');
    this.customerDetailsForm.removeControl('customerName');
    this.customerDetailsForm.removeControl('mobileNo');
    this.customerDetailsForm.removeControl('fromDate');
    this.customerDetailsForm.removeControl('toDate');

    if (this.type == 'cifNo') {
      this.customerDetailsForm.addControl('cifNo', new FormControl('', [Validators.required, Validators.maxLength(11)]));
    }
    else if (this.type == 'customerName') {
      this.customerDetailsForm.addControl('customerName', new FormControl('', [Validators.required]));
    }
    else if (this.type == 'mobileNo') {
      this.customerDetailsForm.addControl('mobileNo', new FormControl('', [Validators.required, Validators.maxLength(10)]));
    }
    else if (this.type == 'date') {
      this.customerDetailsForm.addControl('fromDate', new FormControl('', [Validators.required]));
      this.customerDetailsForm.addControl('toDate', new FormControl('', [Validators.required]));
    }
  }




  cancel() {
    this.commonMethod.cancel();
  }

  onDateChange(value) {
    if (value.fromDate != "" && value.toDate != "") {
      if (value.toDate < value.fromDate) {
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* From date can't be greater than to date";
      }
      else {
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }

  getCustomerDetails() {
    this.formValidation.markFormGroupTouched(this.customerDetailsForm);

    if (this.customerDetailsForm.valid) {
      if (this.toDateValid) { return; }
      var formData = this.customerDetailsForm.value;
      if (this.type == 'date') {
        var inputdata = this.customerAgentService.getCustomerDetails(formData);

        if (this.priveledge == true)
          this.getRegDtl(inputdata);
        else
          showToastMessage('You Dont Have Priviledge To View The Data');
      }
      else if (this.type == 'all') {
        if (this.priveledge == true)
          this.getAllCustomerDetails();
        else
          showToastMessage('You Dont Have Priviledge To View The Data');
      }
      else {
        var _inputdata = this.customerAgentService.getCustomerDetailsByType(formData);
        if (this.priveledge == true)
          this.getDtlByType(_inputdata);
        else
          showToastMessage('You Dont Have Priviledge To View The Data');
      }

    } else {
      this.formErrors = this.formValidation.validateForm(this.customerDetailsForm, this.formErrors, false)
    }
  }

  getAllCustomerDetails() {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCustomersDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllCustomersDetailsUrl + "\n" + "Params={}", 'view')
        //initiallize datatable
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.customerDetails = res.result;
        if (this.customerDetails.length < 1) {
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
        this.errorCallBack(this.appConstants.getAllCustomersDetailsUrl, res);
      }
    });
  }


  gotoAgentDetails(item) {
    console.log(item);
    if (item.statusname === 'ADMIN APPROVER PENDING' && this.commonDataService.roleType == this.commonDataService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataService.submenuname = 'customerAgentEdit';
      this.commonDataService.customerAgent.createdon = item.createdon;
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/customerAgentEdit", { state: { id: item.id } });
    }
  }

  getDtlByType(param) {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCustByCifMobileName, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        //initiallize datatable
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCustByCifMobileName + "\n" + "Params=" + JSON.stringify(param), 'view')
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.customerDetails = res.result;
        if (this.customerDetails.length < 1) {
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

  getRegDtl(param) {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCustomerDetails, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCustomerDetails + "\n" + "Params=" + JSON.stringify(param), 'view')
        //initiallize datatable
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.customerDetails = res.result;
        if (this.customerDetails.length < 1) {
          showToastMessage("No Record Available");
        }
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustomerDetails, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }



  getKycImage(item) {
    var id = item.id;
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getKycImage + "/" + id).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.displayImage = res.result[0].baseimage;
        this.selModel = "kycImage";
        openTinyModel1();
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getKycImage, res);
      }
    });
  }

  geCustomerImg(item) {
    var id = item.id;
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getKycImage + "/" + id).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.displayImage = res.result[0].baseimage;
        openTinyModel();
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getKycImage, res);
      }
    });
  }

  openModelToResetPwd(item) {
    this.selUserToResetPass = item;
    this.commonDataService.customerAgent.createdon = item.createdon;
    this.selModel = "passwordReset";
    openTinyModel1();
  }

  openModelToResetPwdWithRemark(action, item) {
    openTinyModel1();
    this.selModel = action;
    this.buildForm();
    console.log(action);
    this.selUserToResetPass = item;
    this.commonDataService.customerAgent.createdon = item.createdon;
  }

  resetPassword() {
    closeTinyModel1();
    console.log('Reset password item: ', this.selUserToResetPass);
    var formData = this.selUserToResetPass;
    var param = this.customerAgentService.getResetPasswordParam(formData);
    this.resetPasswordCust(param);
  }

  resetPasswordWithRemark(remarkData) {
    console.log('Reset password item: ', this.selUserToResetPass);
    this.formValidation.markFormGroupTouched(this.remarkDeleteForm);
    if (this.remarkDeleteForm.valid) {
      closeTinyModel1();
      var formData = this.selUserToResetPass;
      var param = this.customerAgentService.getResetPasswordWithRemarkParam(formData, remarkData);
      this.resetPasswordCust(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.remarkDeleteForm, this.formErrors, false);
    }
  }

  resetPasswordCust(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.custResetPassword, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.custResetPassword + "\n" + "Params=" + JSON.stringify(param), 'update')
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.deleteUserUrl, res);
      }
    })
  }

  closeActionModel1() {
    if (this.selModel == 'resetPassWithRemark') {
      this.remarkDeleteForm.reset();
    }
    closeTinyModel1();
  }

  closeActionModel() {
    closeTinyModel();
  }

  upload() {
    if (this.bulkOfferForm.get('bulkCustomerFile').value == "") {
      this.isUploadExcel = true;
      return;
    }

    const formData = new FormData();
    formData.append('BulkCustomerFile', this.bulkOfferForm.get('bulkCustomerFile').value);
    console.log(formData);
    this.uploadExcel(formData);
  }

  uploadExcel(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromiseFileUplaod(this.appConstants.bulkUpload, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.filename = "";
        this.bulkOfferForm.get('bulkCustomerFile').setValue("");
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.bulkUpload, res);
      }
    })
  }

  addExcelFile(event: any) {
    this.isValidFileFormat = false;
    this.isUploadExcel = false;
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (event.target.files[0].name.indexOf(".xls") == -1) {
        this.isValidFileFormat = true;
        return;
      }
      this.filename = event.target.files[0].name;
      this.bulkOfferForm.get('bulkCustomerFile').setValue(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e);
      };
      reader.readAsDataURL(file);
    }
  }

  getDeviceData(item) {
    this.commonMethod.showLoader();
    this.customerIdMaster = item.id;
    var param = {"customerId": this.customerIdMaster}

    this.deviceMaster = []
    this.commonServiceCall.postResponsePromise(this.appConstants.getDeviceMasterDetailsByCustId,param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.deviceMaster = res.result;
        $('#tiny-modal1').show()
        this.selModel = "deviceMaster";
        openTinyModel();
      } else {
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
    });
  }

  activate(type,item)
  {
    if(type=='withremark')
    {
      this.selModel = "devicewithremark"
      this.deviceStatusId = 3;
      this.customerIdMaster=item.id;
      this.buildForm()
      openTinyModel()
    }
    else
    {
      var param = this.customerAgentService.getDeviceMasterParam(item.id,3);
      this.updateDeviceMaster(param)
    }

  }


  deactivate(type,item)
  {
    if(type=='withremark')
    {
      this.selModel = "devicewithremark"
      this.deviceStatusId = 0;
      this.customerIdMaster=item.id;
      this.buildForm()
      openTinyModel()
    }
    else
    {
      var param = this.customerAgentService.getDeviceMasterParam(item.id,0);
      this.updateDeviceMaster(param)
    }

  }

  closeActionModelDevice()
  {
   if (this.selModel == 'devicewithremark') {
      this.remarkDeleteForm.reset();
      this.selModel = "deviceMaster";
      this.commonMethod.setDataTable(this.commonServiceCall.pageName);
      openTinyModel()
      $('.tinymodal-1').show()
    }
  }

  updateDeviceWithRemark(remarkData)
  {
    console.log('Reset password item: ', this.selUserToResetPass);
    this.formValidation.markFormGroupTouched(this.remarkDeleteForm);
    if (this.remarkDeleteForm.valid) {
      closeTinyModel();
      var formData = this.selUserToResetPass;
      var param = this.customerAgentService.getDeviceMasterParamWithRemark(this.customerIdMaster, this.deviceStatusId,remarkData);
      this.updateDeviceMaster(param);
      this.remarkDeleteForm.reset();
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.remarkDeleteForm, this.formErrors, false);
    }
  }

  updateDeviceMaster(param)
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateDeviceDetails, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
       // this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.custResetPassword + "\n" + "Params=" + JSON.stringify(param), 'update')
        this.commonMethod.hideLoader();
        closeTinyModel()
        showToastMessage(res.responseMessage);
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.deleteUserUrl, res);
      }
    })
  }


}
