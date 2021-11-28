import { Component, OnInit } from "@angular/core";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { DatePipe, Location } from "@angular/common";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonDataShareService } from "../common-data-share.service";
import { CustomerInformationAddService } from "./customer-information-add.service";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-customer-information-add",
  templateUrl: "./customer-information-add.component.html",
  styleUrls: ["./customer-information-add.component.css"],
})
export class CustomerInformationAddComponent implements OnInit {
  editCustomerInfoForm: FormGroup;
  customerDetailsForm: FormGroup;
  remarkForm: FormGroup;
  custList: any = [];
  masterStatus = [];
  productTypes = [];
  notificatonsArr = [];

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
    employeerName: "",
    employeerNumber: "",
    employeerAddress: "",
    gstNo: "",
    status: "",
    productType: "",
  };

  custInfoFields = {
    custName: '',
    custCIFNo: '',
    employeerName: '',
    employeerNumber: '',
    employeerAddress: '',
    gstNo: '',
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
    public customerAddService: CustomerInformationAddService
  ) { }
  ngOnInit(): void {
    this.roleId = this.commonDataService.roleId;
    this.buildForm();
    this.notificationDetail = this.location.getState();
    this.commonServiceCall.pageName = "Add Customer Information";
    this.todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.getStatus();
    this.getAppMasterList();
    this.editCustomerInfoForm.patchValue({
      status: 3,
    });
  }

  public buildForm() {
    this.customerDetailsForm = this.form.group({
      searchBy: new FormControl("", [Validators.required]),
    });
    this.customerDetailsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.customerDetailsForm,
        this.formErrors,
        true
      );
    });

    this.editCustomerInfoForm = this.form.group({
      custName: new FormControl(""),
      custCIFNo: new FormControl(""),
      employeerName: new FormControl("", [Validators.required]),
      employeerNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      employeerAddress: new FormControl("", [Validators.required]),
      gstNo: new FormControl("", [
        Validators.required,
        Validators.minLength(15),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      status: new FormControl("", [Validators.required]),
      productType: new FormControl("", [Validators.required]),
    });
    this.editCustomerInfoForm.valueChanges.subscribe((data) => {
      this.formErrorsNot = this.formValidation.validateForm(
        this.editCustomerInfoForm,
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
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.customerAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

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
    this.customerDetailsForm.removeControl("custId");
    this.customerDetailsForm.removeControl("customerName");
    this.customerDetailsForm.removeControl("emailId");
    this.customerDetailsForm.removeControl("mobileNo");
    this.customerDetailsForm.removeControl("fromDate");
    this.customerDetailsForm.removeControl("toDate");
    switch (this.type) {
      case "custId":
        this.customerDetailsForm.addControl(
          "custId",
          new FormControl("", [Validators.required])
        );
        break;

      case "customerName":
        this.customerDetailsForm.addControl(
          "customerName",
          new FormControl("", [Validators.required])
        );
        break;

      case "email":
        this.customerDetailsForm.addControl(
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
        this.customerDetailsForm.addControl(
          "mobileNo",
          new FormControl("", [Validators.required, Validators.maxLength(10)])
        );
        break;

      case "date":
        this.customerDetailsForm.addControl(
          "fromDate",
          new FormControl('', [Validators.required])
        );
        this.customerDetailsForm.addControl(
          "toDate",
          new FormControl('', [Validators.required])
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
    console.log(this.customerDetailsForm);
    this.showCustomerDetails = false;
    this.formValidation.markFormGroupTouched(this.customerDetailsForm);
    if (this.customerDetailsForm.valid) {
      if (this.toDateValid) {
        return;
      }
      var formData = this.customerDetailsForm.value;
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
        this.customerDetailsForm,
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
    this.router.navigateByUrl("/customerInfo");
  }

  openActionModel(action, formdata) {
    if (this.editCustomerInfoForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.custInfoFields.custName = formdata.custName;
      this.custInfoFields.custCIFNo = formdata.custCIFNo;
      this.custInfoFields.employeerName = formdata.employeerName;
      this.custInfoFields.employeerNumber = formdata.employeerNumber;
      this.custInfoFields.employeerAddress = formdata.employeerAddress;
      this.custInfoFields.gstNo = formdata.gstNo;
      this.custInfoFields.productType = formdata.productType;
      this.custInfoFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.editCustomerInfoForm, this.formErrors, false)
    }
  }

  saveCustomerInfo() {
    var clientId = this.custList.filter(
      (cust) => cust.isCustNameChecked == true
    );
    console.log(clientId);
    console.log(this.editCustomerInfoForm.value);

    this.formValidation.markFormGroupTouched(this.editCustomerInfoForm);
    if (this.editCustomerInfoForm.valid) {
      var formData = this.editCustomerInfoForm.value;
      var params = this.customerAddService.setCustomerInfoParams(
        formData,
        clientId,
        this.addingItem
      );
      console.log("Customer Informtion Save Params ", params);
      this.saveRecord(params);
    } else {
      this.formErrorsNot = this.formValidation.validateForm(
        this.editCustomerInfoForm,
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
    console.log(this.editCustomerInfoForm.value);

    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      var formData = this.remarkForm.value;
      var params = this.customerAddService.setCustomerInfoParamsWithRemark(
        this.custInfoFields,
        clientId,
        formData,
        this.addingItem
      );
      console.log("Customer Informtion Save Params ", params);
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
    this.editCustomerInfoForm.patchValue({
      custName: this.custInfoFields.custName,
      custCIFNo: this.custInfoFields.custCIFNo,
      employeerName: this.custInfoFields.employeerName,
      employeerNumber: this.custInfoFields.employeerNumber,
      employeerAddress: this.custInfoFields.employeerAddress,
      gstNo: this.custInfoFields.gstNo,
      productType: this.custInfoFields.productType,
      status: this.custInfoFields.status,
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
      .postResponsePromise(this.appConstants.saveCustOtherInfo, param)
      .subscribe((data) => {
        console.log(data);
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.saveCustOtherInfo +
            "\n" +
            "Params=" +
            JSON.stringify(param),
            "add"
          );
          this.commonMethod.hideLoader();
          showToastMessage(res.responseMessage);
          this.router.navigateByUrl("/customerInfo");
        } else {
          if (this.commonDataService.roleType == this.commonDataService.makerRole) {
            this.editCustomerInfoForm.patchValue({
              custName: this.custInfoFields.custName,
              custCIFNo: this.custInfoFields.custCIFNo,
              employeerName: this.custInfoFields.employeerName,
              employeerNumber: this.custInfoFields.employeerNumber,
              employeerAddress: this.custInfoFields.employeerAddress,
              gstNo: this.custInfoFields.gstNo,
              productType: this.custInfoFields.productType,
              status: this.custInfoFields.status,
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.saveCustOtherInfo, res);
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
    setTimeout(() => {
      $("#sl_template").val("");
    });
  }

  onBackClick() {
    this.isNextButtonClicked = false;
    this.getSearchByCustomer({ searchBy: "", custId: "" });
    this.editCustomerInfoForm.reset();
    setTimeout(() => {
      $("#sel_Cust").val("");
      this.commonMethod.hideLoader();
    }, 500);
    this.commonMethod.showLoader();
    this.customerDetailsForm.reset();
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
      this.editCustomerInfoForm.addControl(
        "manualTemplate",
        new FormControl("", [Validators.required])
      );
    } else {
      this.editCustomerInfoForm.removeControl("manualTemplate");
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
          this.commonDataService.customerInfo.mobile = item.mobile;
          this.commonDataService.submenuname = "customerInfoEdit";
          this.router.navigateByUrl("/customerInfoEdit", {
            state: { id: res.result[0].id },
          });
          this.commonMethod.hideLoader();
        } else {
          this.isNextButtonClicked = true;
          this.editCustomerInfoForm.patchValue({
            custName: item.customername,
            custCIFNo: item.cif,
          });
          this.commonMethod.hideLoader();
        }
      });
  }
}
