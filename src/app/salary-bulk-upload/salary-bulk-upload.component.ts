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
import { SalaryBulkUploadService } from "./salary-bulk-upload.service";
import { ThemeSettingComponent } from "../theme-setting/theme-setting.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-salary-bulk-upload",
  templateUrl: "./salary-bulk-upload.component.html",
  styleUrls: ["./salary-bulk-upload.component.css"],
})
export class SalaryBulkUploadComponent implements OnInit {
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
    company: "",
    remark: "",
  };
  filename: any = "";
  showButton: boolean = false;
  menuLink = "salaryBulkUpload";
  masterCompany: any = [];
  companyId: any = "";
  priviledgeDataArr: any = [];
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
    private salaryService: SalaryBulkUploadService
  ) {}

  ngOnInit(): void {
    this.roleId = this.commonDataService.roleId;
    this.commonServiceCall.pageName = "Salary Bulk Upload";
    this.buildForm();
    this.getLeftMenuId();
    this.getCompanyList();
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.salaryService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.bulkOfferForm = this.form.group({
      bulkCustomerFile: new FormControl(""),
      company: new FormControl(""),
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
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  getPriviledgeData(id) {
    var url =
      this.appConstants.getPriviledgeDataUrl +
      id +
      "/" +
      this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          // this.getCalculatorFormula();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  getCompanyList() {
    this.commonMethod.showLoader();
    this.masterCompany = [];
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log("response data: ", res);
          //   res.result.forEach(element => {
          //   if(element.statusname == 'ACTIVE') {
          //   this.masterCompany.push(element)
          //   }
          // })
          var data = res.result;
          this.masterCompany = data.filter((f) => f.statusName == "ACTIVE");
          console.log("response data: ", this.masterCompany);
        } else {
          this.errorCallBack(this.appConstants.getCorpCompanyDetailsUrl, res);
        }
        this.commonMethod.hideLoader();
        this.commonMethod.destroyDataTable();
      });
  }

  /* This function calls when an error occurs */
  errorCallBack(fld, res) {
    if (fld == this.appConstants.addConfigMasterUrl) {
      this.commonMethod.errorMessage(res);
    }
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
          this.isValidFileFormat = true;
          this.showSuccess = false;
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
          console.log(this.tempData);
        };
        reader.readAsBinaryString(file);
      }
    }
  }

  upload() {
    this.customerDetails = [];
    if (
      this.bulkOfferForm.get("bulkCustomerFile").value == "" ||
      this.bulkOfferForm.get("company").value == ""
    ) {
      if (this.bulkOfferForm.get("company").value == "") {
        this.formBulkErrors.company = "* This field is required";
      }

      if(this.bulkOfferForm.get('bulkCustomerFile').value == "") {
        this.isUploadExcel = true;
      }
      return;
    } else {
      this.showButton = true;
      this.customerDetails = this.tempData;
      this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      this.formBulkErrors.company = "";
      this.isUploadExcel = false;
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
    // this.finalarray = newarray.filter((f) => f.isChecked == true);
    this.finalarray = newarray;

    if(
      this.customerDetails[0].activityCode &&
      this.customerDetails[0].payeeName &&
      this.customerDetails[0].payeeAccountNumber &&
      this.customerDetails[0].amount &&
      this.customerDetails[0].currency &&
      this.customerDetails[0].remarks
    ) {
      this.finalarray.forEach((element) => {
        (element.role_ID = this.commonDataService.roleTypeId),
          (element.user_ID = this.commonDataService.user_ID),
          (element.subMenu_ID = this.commonDataService.submenuId),
          (element.remark = ""),
          (element.activityName = "salaryBulkUpload");
        element.createdby = this.commonDataService.user_ID;
        element.statusId = 3;
        element.appId = "";
      });
      console.log(this.finalarray);
      this.commonMethod.showLoader();
      this.commonServiceCall
        .postResponsePromise(this.appConstants.bulkSalaryUpload, this.finalarray)
        .subscribe((data) => {
          var res = data.resp;
          if (res.responseCode == "200") {
            this.addAuditTrailAdaptor(
              "Request:" +
                this.appConstants.apiURL.serviceURL_ESB +
                this.appConstants.bulkSalaryUpload +
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
            this.bulkOfferForm.get("company").setValue("");
            $("#company_dropdown").val("");
            this.router.navigateByUrl("/dashboard");
          } else {
            this.commonMethod.hideLoader();
            // this.errorCallBack(this.appConstants.updateStatusListByChecker, res);
          }
        });
    }
    else {
      showToastMessage("Please Select a Valid File");
    }
  }

  openActionModel(action) {

    if(
      this.customerDetails[0].activityCode &&
      this.customerDetails[0].payeeName &&
      this.customerDetails[0].payeeAccountNumber &&
      this.customerDetails[0].amount &&
      this.customerDetails[0].currency &&
      this.customerDetails[0].remarks
    ) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
    }
    else {
      showToastMessage("Please select a valid file");
    }
  }

  closeActionMoel() {
    closeTinyModel();
    this.selModel = "";
    this.remarkForm.reset();
  }

  bulkCustomerUploadWithRemark(formdata) {
    if (this.remarkForm.valid) {
      this.finalarray = [];
      var newarray = [];
      newarray = this.customerDetails;
      // this.finalarray = newarray.filter((f) => f.isChecked == true);
      this.finalarray = newarray;
      this.finalarray.forEach((element) => {
        (element.role_ID = this.commonDataService.roleTypeId),
          (element.user_ID = this.commonDataService.user_ID),
          (element.subMenu_ID = this.commonDataService.submenuId),
          (element.remark = formdata.remark),
          (element.activityName = "salaryBulkUpload");
        element.createdby = this.commonDataService.user_ID;
        element.statusId = 3;
        element.appId = "";
      });
      console.log(this.finalarray);
      this.commonMethod.showLoader();
      this.commonServiceCall
        .postResponsePromise(
          this.appConstants.bulkSalaryUpload,
          this.finalarray
        )
        .subscribe((data) => {
          var res = data.resp;
          if (res.responseCode == "200") {
            this.addAuditTrailAdaptor(
              "Request:" +
                this.appConstants.apiURL.serviceURL_ESB +
                this.appConstants.bulkSalaryUpload +
                "\n" +
                "Params=" +
                JSON.stringify(this.finalarray),
              "add"
            );
            closeTinyModel();
            this.commonMethod.hideLoader();
            console.log(res.result);
            showToastMessage(res.responseMessage);

            this.customerDetails = [];
            this.showButton = false;
            this.bulkOfferForm.patchValue({
              bulkCustomerFile: "",
            });
            this.bulkOfferForm.get("company").setValue("");
            $("#company_dropdown").val("");
            this.router.navigateByUrl("/dashboard");
          } else {
            this.commonMethod.hideLoader();
            // this.errorCallBack(this.appConstants.updateStatusListByChecker, res);
          }
        });
    } else {
      this.formBulkErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formBulkErrors,
        false
      );
    }
  }

  onCompanySelected(companyId) {
    this.companyId = companyId;
    if (this.companyId) {
      this.bulkOfferForm.get("company").setValue(companyId);
      this.formBulkErrors.company = "";
    } else {
      this.bulkOfferForm.get("company").setValue("");
    }
  }
}
