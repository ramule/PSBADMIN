import { Component, OnInit } from "@angular/core";
import { AppConstants } from "../app-constants";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { Router } from "@angular/router";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonMethods } from "../common-methods";
import { DatePipe } from "@angular/common";
import { CommonDataShareService } from "../common-data-share.service";
import * as XLSX from "xlsx";
import { CustomerBulkRegistrationService } from "./customer-bulk-registration.service";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-customer-bulk-registration",
  templateUrl: "./customer-bulk-registration.component.html",
  styleUrls: ["./customer-bulk-registration.component.css"],
})
export class CustomerBulkRegistrationComponent implements OnInit {
  roleId: any;
  selModel: any;
  tempData: any = [];
  finalarray: any = [];
  customerDetails: any = [];
  bulkOfferForm: FormGroup;
  remarkForm: FormGroup;
  isUploadExcel: boolean = false;
  isValidFileFormat: boolean = false;
  formBulkErrors = {
    bulkCustomerFile: "",
    remark: "",
  };
  filename: any = "";
  showButton: boolean = false;
  menuLink = "customerBulkRegistration";
  showSuccess: boolean = false;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe,
    public commonDataService: CommonDataShareService,
    public customerService: CustomerBulkRegistrationService
  ) {}

  ngOnInit(): void {
    this.roleId = this.commonDataService.roleId;
    this.commonServiceCall.pageName = "Customers Bulk Registration";
    this.buildForm();
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.customerService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.bulkOfferForm = this.form.group({
      bulkCustomerFile: new FormControl(""),
    });
    this.bulkOfferForm.valueChanges.subscribe((data) => {
      this.formBulkErrors = this.formValidation.validateForm(
        this.bulkOfferForm,
        this.formBulkErrors,
        true
      );
    });

    if (this.selModel == "remarkField") {
      this.remarkForm = this.form.group({
        remark: new FormControl("", [Validators.required]),
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formBulkErrors = this.formValidation.validateForm(
          this.remarkForm,
          this.formBulkErrors,
          true
        );
      });
    }
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonDataService.submenuId = res.result[0].id;
        this.commonDataService.submenuname = res.result[0].menuLink;
        id = res.result[0].id;
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  addExcelFile(event: any) {
    console.log(event);
    if (event.target.files.length > 0) {
      this.customerDetails = [];
      this.isValidFileFormat = false;
      this.isUploadExcel = false;
      console.log(event);
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (event.target.files[0].name.indexOf(".xls") == -1) {
          this.showSuccess = false;
          this.isValidFileFormat = true;
          return;
        }
        this.showSuccess = true;
        this.filename = event.target.files[0].name;
        this.bulkOfferForm.get("bulkCustomerFile").setValue(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          let workBook = null;
          let jsonData = null;
          const data = reader.result;
          workBook = XLSX.read(data, { type: "binary" });
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = XLSX.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          this.tempData = jsonData.Sheet1;
          console.log("tempData: ", this.tempData);
        };
        reader.readAsBinaryString(file);
      }
    }
  }

  upload() {
    this.customerDetails = [];
    if (this.bulkOfferForm.get("bulkCustomerFile").value == "") {
      this.isUploadExcel = true;
      return;
    } else {
      this.showButton = true;
      this.customerDetails = this.tempData;
      this.customerDetails.forEach((element) => {
        element.isChecked = false;
      });
      this.commonMethod.setDataTable(this.commonServiceCall.pageName);
    }
  }

  select(item) {
    if ($("#approveCheckBox").is(":checked")) {
      this.customerDetails.map((v) => (v.isChecked = true));
    } else {
      this.customerDetails.map((v) => (v.isChecked = false));
    }
  }

  selectsingle(item) {
    var objIndex = this.customerDetails.findIndex((obj) => obj.cif == item.cif);
    if (this.customerDetails[objIndex].isChecked == true) {
      this.customerDetails[objIndex].isChecked = false;
    } else {
      this.customerDetails[objIndex].isChecked = true;
    }
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  bulkCustomerUpload() {
    this.finalarray = [];
    var newarray = [];
    newarray = this.customerDetails;

    if (
      this.customerDetails[0].cif &&
      this.customerDetails[0].customername &&
      this.customerDetails[0].username &&
      this.customerDetails[0].email &&
      this.customerDetails[0].mobile &&
      this.customerDetails[0].dob &&
      this.customerDetails[0].IBREGSTATUS &&
      this.customerDetails[0].MOBREGSTATUS &&
      this.customerDetails[0].ismobileenabled &&
      this.customerDetails[0].iswebenabled &&
      this.customerDetails[0].mpin &&
      this.customerDetails[0].salutation &&
      this.customerDetails[0].preferedlanguage
    ) {
      this.finalarray = newarray.filter((f) => f.isChecked == true);
      if (this.finalarray.length > 0) {
        this.finalarray.forEach((element) => {
          (element.role_ID = this.commonDataService.roleTypeId),
            (element.user_ID = this.commonDataService.user_ID),
            (element.subMenu_ID = this.commonDataService.submenuId),
            (element.remark = ""),
            (element.activityName = "CUSTOMERBULKREGISTRATION");
        });
        console.log(this.finalarray);

        this.commonServiceCall
          .postResponsePromise(
            this.appConstants.saveBulkCustomers,
            this.finalarray
          )
          .subscribe((data) => {
            var res = data.resp;
            if (res.responseCode == "200") {
              this.addAuditTrailAdaptor(
                "Request:" +
                  this.appConstants.apiURL.serviceURL_ESB +
                  this.appConstants.saveBulkCustomers +
                  "\n" +
                  "Params=" +
                  JSON.stringify(this.finalarray),
                "add"
              );
              this.commonMethod.hideLoader();
              console.log(res.result);
              showToastMessage(res.responseMessage);
              this.customerDetails = [];
              this.showButton = false;
              this.bulkOfferForm.patchValue({
                bulkCustomerFile: "",
              });
              this.router.navigateByUrl("/dashboard");
            } else {
              this.commonMethod.hideLoader();
            }
          });
      } else {
        showToastMessage("Please Select Customer");
      }
    } else {
      showToastMessage("Please Select a Valid File");
    }
  }

  openActionModel(action) {
    this.finalarray = [];
    var newarray = [];
    newarray = this.customerDetails;
    this.finalarray = newarray.filter((f) => f.isChecked == true);
    if (
      this.customerDetails[0].cif &&
      this.customerDetails[0].customername &&
      this.customerDetails[0].username &&
      this.customerDetails[0].email &&
      this.customerDetails[0].mobile &&
      this.customerDetails[0].dob &&
      this.customerDetails[0].IBREGSTATUS &&
      this.customerDetails[0].MOBREGSTATUS &&
      this.customerDetails[0].ismobileenabled &&
      this.customerDetails[0].iswebenabled &&
      this.customerDetails[0].mpin &&
      this.customerDetails[0].salutation &&
      this.customerDetails[0].preferedlanguage
    ) {
      if (this.finalarray.length > 0) {
        openTinyModel();
        this.selModel = action;
        this.buildForm();
      } else {
        showToastMessage("Please Select Customer");
      }
    } else {
      showToastMessage("Please Select a Valid File");
    }
  }

  closeActionMoel() {
    closeTinyModel();
    this.selModel = "";
    this.remarkForm.reset();
  }

  bulkCustomerUploadWithRemark(formdata) {
    this.commonMethod.showLoader();
    if (this.remarkForm.valid) {
      closeTinyModel();
      this.finalarray.forEach((element) => {
        (element.role_ID = this.commonDataService.roleTypeId),
          (element.user_ID = this.commonDataService.user_ID),
          (element.subMenu_ID = this.commonDataService.submenuId),
          (element.remark = formdata.remark),
          (element.activityName = "CUSTOMERBULKREGISTRATION");
      });
      console.log(this.finalarray);

      this.commonServiceCall
        .postResponsePromise(
          this.appConstants.saveBulkCustomers,
          this.finalarray
        )
        .subscribe((data) => {
          var res = data.resp;
          if (res.responseCode == "200") {
            this.addAuditTrailAdaptor(
              "Request:" +
                this.appConstants.apiURL.serviceURL_ESB +
                this.appConstants.saveBulkCustomers +
                "\n" +
                "Params=" +
                JSON.stringify(this.finalarray),
              "add"
            );
            console.log(res.result);
            showToastMessage(res.responseMessage);
            this.customerDetails = [];
            this.showButton = false;
            this.bulkOfferForm.patchValue({
              bulkCustomerFile: "",
            });
            this.router.navigateByUrl("/dashboard");
          } else {
            this.errorCallBack(
              this.appConstants.updateStatusListByChecker,
              res
            );
          }
          this.commonMethod.hideLoader();
          closeTinyModel();
        });
    } else {
      this.formBulkErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formBulkErrors,
        false
      );
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
