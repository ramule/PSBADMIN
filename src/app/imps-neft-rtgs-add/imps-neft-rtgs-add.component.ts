import { Component, OnInit } from "@angular/core";
import { AppConstants } from "../app-constants";
import {FormBuilder,FormGroup,FormControl,Validators,} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { Router } from "@angular/router";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonMethods } from "../common-methods";
import { DatePipe } from "@angular/common";
import { CommonDataShareService } from "../common-data-share.service";
import * as XLSX from "xlsx";
import { ImpsNeftRtgsAddService } from './imps-neft-rtgs-add.service';


declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-neft-rtgs-add',
  templateUrl: './imps-neft-rtgs-add.component.html',
  styleUrls: ['./imps-neft-rtgs-add.component.css']
})
export class ImpsNeftRtgsAddComponent implements OnInit {
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
    public neftAddService: ImpsNeftRtgsAddService
  ) {}

  ngOnInit(): void {
    this.roleId = this.commonDataService.roleId;
    this.commonServiceCall.pageName = "NEFT-RTGS Transaction Process Add";
    this.buildForm();
  } /* Insert tracking for user activities*/


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
      // this.showButton = true;
      // this.customerDetails = this.tempData;
      // this.customerDetails.forEach((element) => {
      //   element.isChecked = false;
      // });
      // this.commonMethod.setDataTable(this.commonServiceCall.pageName);
      alert("done")
      this.router.navigateByUrl('/impsNEFT')
    }
  }

  cancelClick() {
    this.commonMethod.cancel();
  }
}
