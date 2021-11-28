import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
declare var showToastMessage: any;

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {

  bulkOfferForm: FormGroup;
  isUploadExcel: boolean = false;
  isValidFileFormat: boolean = false;
  formErrors = {
    bulkCustomerFile: ''
  }
  filename: any = "";

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private appConstant: AppConstants,
    private commonMethod: CommonMethods
  ) { }

  public buildForm() {
    this.bulkOfferForm = this.form.group({
      bulkCustomerFile: new FormControl('')
    });
    this.bulkOfferForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.bulkOfferForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.buildForm();
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

  uploadExcelFile() {

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
    this.commonServiceCall.postResponsePromiseFileUplaod(this.appConstant.bulkUpload, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.filename = "";
        this.bulkOfferForm.get('bulkCustomerFile').setValue("");
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.bulkUpload, res);
      }
    })
  }

  cancel() {
    this.filename = "";
    this.bulkOfferForm.get('bulkCustomerFile').setValue("");
    this.router.navigateByUrl("/dashboard");
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
