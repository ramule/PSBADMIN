import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { HolidayListBulkAddService } from "./holiday-list-bulk-add.service";
import * as XLSX from "xlsx";
import * as moment from "moment";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-holiday-list-bulk-add",
  templateUrl: "./holiday-list-bulk-add.component.html",
  styleUrls: ["./holiday-list-bulk-add.component.css"],
})
export class HolidayListBulkAddComponent implements OnInit {
  roleId: any;
  selModel: any;
  tempData: any = [];
  holidayDetails: any = [];
  priviledgeDataArr: any = [];
  bulkHolidayForm: FormGroup;
  counter: number = 1;
  remarkForm: FormGroup;
  isUploadExcel: boolean = false;
  isValidFileFormat: boolean = false;
  showSuccess: boolean = false;
  formBulkErrors = {
    bulkCustomerFile: "",
    remark: "",
  };
  filename: any = "";
  showButton: boolean = false;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe,
    public commonDataService: CommonDataShareService,
    public holidayListBulkAddService: HolidayListBulkAddService
  ) {}

  ngOnInit(): void {
    this.roleId = this.commonDataService.roleId;
    this.commonServiceCall.pageName = "Holiday List Bulk Add";
    this.buildForm();
    this.commonMethod.hideLoader();
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.holidayListBulkAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.bulkHolidayForm = this.form.group({
      bulkHolidayFile: new FormControl(""),
    });
    this.bulkHolidayForm.valueChanges.subscribe((data) => {
      this.formBulkErrors = this.formValidation.validateForm(
        this.bulkHolidayForm,
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

  addExcelFile(event: any) {
    console.log(event);
    if (event.target.files.length > 0) {
      this.holidayDetails = [];
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
        this.filename = event.target.files[0].name;
        this.bulkHolidayForm.get("bulkHolidayFile").setValue(file);
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
        };
        reader.readAsBinaryString(file);
        this.showSuccess = true;
      }
    }
  }

  upload() {
    this.holidayDetails = [];
    this.commonMethod.destroyDataTable();
    if (this.bulkHolidayForm.get("bulkHolidayFile").value == "") {
      this.isUploadExcel = true;
      return;
    } else {
      this.showButton = true;
      this.holidayDetails = this.tempData;
      this.holidayDetails.forEach((element) => {
        element.isChecked = false;
      });
      this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
    }
  }

  cancelClick() {
    this.router.navigateByUrl("/holidayListAdd");
  }

  bulkHolidayUpload() {
    var newarray = [];
    newarray = this.holidayDetails;
    console.log(this.holidayDetails);
    if (
      this.holidayDetails[0].name &&
      this.holidayDetails[0].holidayDate &&
      this.holidayDetails[0].stateName
    ) {
      newarray.forEach((element) => {
        (element.role_ID = this.commonDataService.roleTypeId),
          (element.user_ID = this.commonDataService.user_ID),
          (element.createdBy = this.commonDataService.user_ID),
          (element.updatedBy = this.commonDataService.user_ID),
          (element.statusId = 3);
        if (moment(element.holidayDate, "yyyy-MM-DD", true).isValid() == false)
          (element.holidayDate = this.datePipe.transform(
            new Date((element.holidayDate - (25567 + 1)) * 86400 * 1000),
            "yyyy-MM-dd"
          )),
            (element.subMenu_ID = this.commonDataService.submenuId),
            (element.remark = ""),
            (element.activityName = "holidayListBulkAdd");
      });
      console.log(newarray);

      this.commonServiceCall
        .postResponsePromise(this.appConstants.saveBulkHoliday, newarray)
        .subscribe((data) => {
          var res = data.resp;
          if (res.responseCode == "200") {
            this.addAuditTrailAdaptor(
              "Request:" +
                this.appConstants.apiURL.serviceURL_ESB +
                this.appConstants.saveBulkHoliday +
                "\n" +
                "Params=" +
                JSON.stringify(newarray),
              "add"
            );
            this.commonMethod.hideLoader();
            console.log(res.result);
            showToastMessage(res.responseMessage);
            this.router.navigateByUrl("/holidayList");
            this.holidayDetails = [];
            this.showButton = false;
            this.bulkHolidayForm.patchValue({
              bulkHolidayFile: "",
            });
          } else {
            this.commonMethod.hideLoader();
            // this.errorCallBack(this.appConstants.saveBulkHoliday, res);
            showToastMessage(res.responseMessage);
          }
        });
    } else {
      showToastMessage("Please Select a Valid File");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action) {
    if (
      this.holidayDetails[0].name &&
      this.holidayDetails[0].holidayDate &&
      this.holidayDetails[0].stateName
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
    this.counter++;
    console.log(this.counter);
    closeTinyModel();
    this.selModel = "";
    this.remarkForm.reset();
  }

  bulkCustomerUploadWithRemark(formdata) {
    if (this.remarkForm.valid) {
      var newarray = [];
      newarray = this.holidayDetails;

      if (this.counter == 1) {
        newarray.forEach((element) => {
          (element.role_ID = this.commonDataService.roleTypeId),
            (element.user_ID = this.commonDataService.user_ID),
            (element.createdBy = this.commonDataService.user_ID),
            (element.subMenu_ID = this.commonDataService.submenuId),
            (element.statusId = 3),
            (element.holidayDate = element.holidayDate),
            (element.remark = formdata.remark),
            (element.activityName = "holidayListBulkAdd");
        });
      } else {
        newarray.forEach((element) => {
          (element.role_ID = this.commonDataService.roleTypeId),
            (element.user_ID = this.commonDataService.user_ID),
            (element.createdBy = this.commonDataService.user_ID),
            (element.subMenu_ID = this.commonDataService.submenuId),
            (element.statusId = 3),
            (element.holidayDate = this.datePipe.transform(
              new Date((element.holidayDate - (25567 + 1)) * 86400 * 1000),
              "yyyy-MM-dd"
            )),
            (element.remark = formdata.remark),
            (element.activityName = "holidayListBulkAdd");
        });
      }
      console.log(newarray);

      this.commonServiceCall
        .postResponsePromise(this.appConstants.saveBulkHoliday, newarray)
        .subscribe((data) => {
          var res = data.resp;
          if (res.responseCode == "200") {
            // this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveBulkHoliday+"\n"+"Params="+JSON.stringify(this.finalarray),'add')
            closeTinyModel();
            this.commonMethod.hideLoader();
            console.log(res.result);
            showToastMessage(res.responseMessage);
            this.holidayDetails = [];
            this.showButton = false;
            this.bulkHolidayForm.patchValue({
              bulkHolidayFile: "",
            });
            this.router.navigateByUrl("/holidayList");
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
}
