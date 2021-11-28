import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CustomerNotificationCategoriesAddService } from './customer-notification-categories-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-customer-notification-categories-add',
  templateUrl: './customer-notification-categories-add.component.html',
  styleUrls: ['./customer-notification-categories-add.component.css']
})
export class CustomerNotificationCategoriesAddComponent implements OnInit {

  editCustNotificationCategoriesForm: FormGroup;
  custNotificationCategoriesForm: FormGroup;
  remarkForm: FormGroup;
  custList: any = [];
  masterStatus = [];
  productTypes = [];
  notificatonsArr = [];
  CategoriesArr = [];

  showCustomerDetails: boolean = false;
  formErrors = {
    searchBy: "",
    custId: "",
    customerName: "",
    mobileNo: "",
    fromDate: "",
    toDate: "",
    emailId: "",
    remark: "",
  };

  formErrorsNot = {
    categoryName: "",
    fromTime: "",
    toTime: "",
    status: "",
    productType: "",
  };

  custNotCatAddFields = {
    custName: '',
    custCIFNo: '',
    categoryName: '',
    fromTime: '',
    toTime: '',
    productType: '',
    status: '',
  };

  roleId: any;
  selModel: any;
  todayDate: any;
  toDateValid: boolean = false;
  isToDateValidError: any;
  notificationDetail: any;
  type: any;
  isNextButtonClicked: boolean = false;
  templateType: any;
  addingItem: any;
  notificationType: string = "Push";
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public datePipe: DatePipe,
    public location: Location,
    public custNotificationCategoriesAddService: CustomerNotificationCategoriesAddService
  ) { }
  ngOnInit(): void {
    this.roleId = this.commonDataService.roleId;
    this.buildForm();
    this.notificationDetail = this.location.getState();
    this.commonServiceCall.pageName = "Add Customer Notification Categories";
    this.todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.getStatus();
    this.getAppMasterList();
    this.getAllNotificationCategories();
    this.editCustNotificationCategoriesForm.patchValue({
      status: 3,
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.custNotificationCategoriesAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getAllNotificationCategories() {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getNotificationCategoriesUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        res.result.forEach(element => {
          if (element.statusName == 'ACTIVE') {
            this.CategoriesArr.push(element);
          }
        });

        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getNotificationCategoriesUrl, res);
      }
    });
  }

  public buildForm() {
    this.custNotificationCategoriesForm = this.form.group({
      searchBy: new FormControl("", [Validators.required]),
    });
    this.custNotificationCategoriesForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.custNotificationCategoriesForm,
        this.formErrors,
        true
      );
    });

    this.editCustNotificationCategoriesForm = this.form.group({
      custName: new FormControl(""),
      custCIFNo: new FormControl(""),
      categoryName: new FormControl("", [Validators.required]),
      fromTime: new FormControl("", [Validators.required,]),
      toTime: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      productType: new FormControl("", [Validators.required]),
    });
    this.editCustNotificationCategoriesForm.valueChanges.subscribe((data) => {
      this.formErrorsNot = this.formValidation.validateForm(
        this.editCustNotificationCategoriesForm,
        this.formErrorsNot,
        true
      );
    });

    if (this.selModel == "remarkField") {
      this.remarkForm = this.form.group({
        remark: new FormControl("", [Validators.required]),
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.remarkForm,
          this.formErrors,
          true
        );
      });
    }
  }

  /* Insert tracking for user activities*/
  // addAuditTrailAdaptor(URL, operation) {
  //   var param = this.customerAddService.addAuditTrailAdaptorParams(
  //     URL,
  //     operation
  //   );
  //   console.log(param);
  //   this.commonServiceCall
  //     .postResponseAuditTracking(this.appConstants.insertAudit, param)
  //     .subscribe((data) => {});
  // }

  select() {
    if ($("#custNameCheckBox").is(":checked")) {
      this.custList.map((v) => (v.isCustNameChecked = true));
    } else {
      this.custList.map((v) => (v.isCustNameChecked = false));
    }
  }

  /**
   * To get Customer Record by Search Field
   * @param value
   */
  getSearchByCustomer(value) {
    this.toDateValid = false;
    console.log(value);
    this.type = value.searchBy;
    this.custList = [];
    this.showCustomerDetails = false;
    this.custNotificationCategoriesForm.removeControl("custId");
    this.custNotificationCategoriesForm.removeControl("customerName");
    this.custNotificationCategoriesForm.removeControl("emailId");
    this.custNotificationCategoriesForm.removeControl("mobileNo");
    this.custNotificationCategoriesForm.removeControl("fromDate");
    this.custNotificationCategoriesForm.removeControl("toDate");
    switch (this.type) {
      case "custId":
        this.custNotificationCategoriesForm.addControl(
          "custId",
          new FormControl("", [Validators.required])
        );
        break;

      case "customerName":
        this.custNotificationCategoriesForm.addControl(
          "customerName",
          new FormControl("", [Validators.required])
        );
        break;

      case "email":
        this.custNotificationCategoriesForm.addControl(
          "emailId",
          new FormControl("", [
            Validators.required,
            Validators.email,
            Validators.maxLength(40),
            Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/),
          ])
        );
        break;

      case "mobileNo":
        this.custNotificationCategoriesForm.addControl(
          "mobileNo",
          new FormControl("", [Validators.required, Validators.maxLength(10)])
        );
        break;

      case "date":
        this.custNotificationCategoriesForm.addControl(
          "fromDate",
          new FormControl("", [Validators.required])
        );
        this.custNotificationCategoriesForm.addControl(
          "toDate",
          new FormControl("", [Validators.required])
        );
        break;
      default:
        break;
    }
  }

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        var res = data;
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.masterStatus = res.resp;
          console.log("response array: ", this.masterStatus);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  //on load functions
  getAppMasterList() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterListUrl)
      .subscribe((data) => {
        var res = data;
        console.log("response data: ", res);
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.productTypes = res.resp;
          console.log("response array: ", this.productTypes);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterListUrl, res);
        }
      });
  }

  getCustomerDetails() {
    console.log(this.custNotificationCategoriesForm);
    this.showCustomerDetails = false;
    this.formValidation.markFormGroupTouched(this.custNotificationCategoriesForm);
    if (this.custNotificationCategoriesForm.valid) {
      if (this.toDateValid) {
        return;
      }
      var formData = this.custNotificationCategoriesForm.value;
      var _inputdata;
      if (this.type == "custId") {
        _inputdata = { id: formData.custId };
        this.getDtlByType(_inputdata);
      } else if (this.type == "customerName") {
        _inputdata = { customername: formData.customerName };
        this.getDtlByType(_inputdata);
      } else if (this.type == "email") {
        _inputdata = { email: formData.emailId };
        this.getDtlByType(_inputdata);
      } else if (this.type == "mobileNo") {
        _inputdata = { mobile: formData.mobileNo };
        this.getDtlByType(_inputdata);
      } else if (this.type == "date") {
        _inputdata = { fromdate: formData.fromDate, todate: formData.toDate };
        this.getDtlByType(_inputdata);
      }
    } else {
      this.custList = [];
      this.formErrors = this.formValidation.validateForm(
        this.custNotificationCategoriesForm,
        this.formErrors,
        false
      );
    }
  }

  onDateChange(value) {
    if (value.fromDate != "" && value.toDate != "") {
      if (value.toDate < value.fromDate) {
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* From date can't be greater than to date";
      } else {
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }

  getDtlByType(param) {
    this.commonMethod.showLoader();
    this.showCustomerDetails = false;
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.getCustDetails, param)
      .subscribe((data) => {
        console.log(data);
        var res = data.resp;
        if (res.responseCode == "200") {
          this.showCustomerDetails = true;
          this.commonMethod.hideLoader();
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.custList = res.result;
          this.custList.forEach((el) => {
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
    this.router.navigateByUrl("/custNotificationCategories");
  }

  openActionModel(action, formdata) {
    if (this.editCustNotificationCategoriesForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.custNotCatAddFields.custName = formdata.custName;
      this.custNotCatAddFields.custCIFNo = formdata.custCIFNo;
      this.custNotCatAddFields.categoryName = formdata.categoryName;
      this.custNotCatAddFields.fromTime = formdata.fromTime;
      this.custNotCatAddFields.toTime = formdata.toTime;
      this.custNotCatAddFields.productType = formdata.productType;
      this.custNotCatAddFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.editCustNotificationCategoriesForm, this.formErrors, false)
    }
  }

  saveCustomerInfo() {
    var clientId = this.custList.filter(
      (cust) => cust.isCustNameChecked == true
    );
    console.log(clientId);
    console.log(this.editCustNotificationCategoriesForm.value);

    this.formValidation.markFormGroupTouched(this.editCustNotificationCategoriesForm);
    if (this.editCustNotificationCategoriesForm.valid) {
      var formData = this.editCustNotificationCategoriesForm.value;
      var params = this.custNotificationCategoriesAddService.setCustNotificationCategoriesCall(
        formData,
        clientId,
        this.addingItem
      );
      console.log("Customer Notification Categories Save Params ", params);
      this.saveRecord(params);
    } else {
      this.formErrorsNot = this.formValidation.validateForm(
        this.editCustNotificationCategoriesForm,
        this.formErrorsNot,
        false
      );
    }
  }

  saveCustomerInfoWithRemark(formdata) {
    var clientId = this.custList.filter(
      (cust) => cust.isCustNameChecked == true
    );
    console.log(clientId);
    console.log(this.editCustNotificationCategoriesForm.value);

    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      var formData = this.remarkForm.value;
      var params = this.custNotificationCategoriesAddService.setCustNotificationCategoriesWithRemarkCall(
        this.custNotCatAddFields,
        clientId,
        formData,
        this.addingItem
      );
      console.log("Customer Notification Categories Save Params ", params);
      this.saveRecord(params);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.remarkForm.reset();
    this.editCustNotificationCategoriesForm.patchValue({
      custName: this.custNotCatAddFields.custName,
      custCIFNo: this.custNotCatAddFields.custCIFNo,
      categoryName: this.custNotCatAddFields.categoryName,
      fromTime: this.custNotCatAddFields.fromTime,
      toTime: this.custNotCatAddFields.toTime,
      productType: this.custNotCatAddFields.productType,
      status: this.custNotCatAddFields.status,
    });
    closeTinyModel();
  }

  filterStatus() {
    return this.masterStatus.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  filterProduct() {
    return this.productTypes.filter(
      (x) =>
        x.shortName == "WALLET" ||
        x.shortName == "MOBILE" ||
        x.shortName == "DESKTOP" ||
        x.shortName == "TAB" ||
        x.shortName == "IVR" ||
        x.shortName == "ALEXA" ||
        x.shortName == "WHATSAPP"
    );
  }

  saveRecord(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.saveCustNotificationCategoriesUrl, param)
      .subscribe((data) => {
        console.log(data);
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          // this.addAuditTrailAdaptor(
          //   "Request:" +
          //     this.appConstants.apiURL.serviceURL_ESB +
          //     this.appConstants.saveCustOtherInfo +
          //     "\n" +
          //     "Params=" +
          //     JSON.stringify(param),
          //   "add"
          // );
          this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.saveCustNotificationCategoriesUrl + "\n" + "Params=" + JSON.stringify(param), 'add')
          this.commonMethod.hideLoader();
          showToastMessage(res.responseMessage);
          this.router.navigateByUrl("/custNotificationCategories");
        } else {
          if (this.commonDataService.roleType == this.commonDataService.makerRole) {
            this.editCustNotificationCategoriesForm.patchValue({
              custName: this.custNotCatAddFields.custName,
              custCIFNo: this.custNotCatAddFields.custCIFNo,
              categoryName: this.custNotCatAddFields.categoryName,
              fromTime: this.custNotCatAddFields.fromTime,
              toTime: this.custNotCatAddFields.toTime,
              productType: this.custNotCatAddFields.productType,
              status: this.custNotCatAddFields.status,
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.saveCustNotificationCategoriesUrl, res);
        }
      });
  }

  onNextClick() {
    if (this.isAllUnChecked()) {
      showToastMessage("Please Select The Customer Name");
      return;
    }
    if (this.isOneChecked().length != 1) {
      showToastMessage("Only One Customer Is Allowed");
      return;
    }

    var item = this.isOneChecked()[0];
    console.log("item", item);
    this.getCustomerInformationById(item);
    //this.getAllNotificationDetails();
    setTimeout(() => {
      $("#sl_template").val("");
    });
  }

  onBackClick() {
    this.isNextButtonClicked = false;
    this.getSearchByCustomer({ searchBy: "", custId: "" });
    this.editCustNotificationCategoriesForm.reset();
    setTimeout(() => {
      $("#sel_Cust").val("");
      this.commonMethod.hideLoader();
    }, 500);
    this.commonMethod.showLoader();
    this.custNotificationCategoriesForm.reset();
  }

  isAllUnChecked() {
    return this.custList.every((v) => v.isCustNameChecked === false);
  }

  isOneChecked() {
    return this.custList.filter((x) => x.isCustNameChecked === true);
  }

  getTemplateType(value) {
    console.log("getTemplateType ", value);

    this.templateType = value.template;
    if (this.templateType == "manualTemplate") {
      this.editCustNotificationCategoriesForm.addControl(
        "manualTemplate",
        new FormControl("", [Validators.required])
      );
    } else {
      this.editCustNotificationCategoriesForm.removeControl("manualTemplate");
    }
  }

  //on load functions
  getAllNotificationDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getNotificationUrl)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          this.notificatonsArr = res.result;
          console.log("Notifications array: ", this.notificatonsArr);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getNotificationUrl, res);
        }
      });
  }

  setNotificationType(type: string) {
    this.notificationType = type;
  }

  getCustomerInformationById(item) {
    console.log(item);
    this.addingItem = item;
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(
        this.appConstants.getCustomerInfoByCustId + "/" + item.id
      )
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.isNextButtonClicked = true;
          this.editCustNotificationCategoriesForm.patchValue({
            custName: item.customername,
            custCIFNo: item.cif,
            status: 3
          });
        } else {
          this.errorCallBack(this.appConstants.getCustomerInfoByCustId, res);
        }
        this.commonMethod.hideLoader();
      });
  }


}
