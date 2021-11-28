import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { InsuranceProductAddService } from './insurance-product-add.service';

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-insurance-product-add',
  templateUrl: './insurance-product-add.component.html',
  styleUrls: ['./insurance-product-add.component.css']
})
export class InsuranceProductAddComponent implements OnInit {

  insuranceProductAddForm: FormGroup;
  remarkForm: FormGroup;
  roleid: any;
  roleType: any;
  selectedCategory: any;
  formErrors = {
    company: "",
    category: "",
    productName: "",
    productDesctiption: "",
    productUrl: "",
    bigImage: "",
    remark: "",
  };

  insuranceProductAddFields = {
    company: "",
    category: "",
    productName: "",
    productDesctiption: "",
    productUrl: "",
    bigImage: "",
  };

  selModel: any;
  companyArr: any = [];
  categoriesArr: any = [];

  isBigImgError: boolean = false;
  isValidBigFileFormat: boolean = false;
  isValidBigSizeFileFormat: boolean = false;
  bigImage: any;
  smallImageValue: File;
  images = {
    bigImage: ""
  };
  formData: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public insuranceProductAddService: InsuranceProductAddService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods
  ) { }

  public buildForm() {
    this.insuranceProductAddForm = this.form.group({
      company: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      productDesctiption: new FormControl("", [Validators.required]),
      productUrl: new FormControl("", [Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]),
      productName: new FormControl("", [
        Validators.required,
      ]),
      bigImage: new FormControl("", [Validators.required]),
    });
    this.insuranceProductAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.insuranceProductAddForm,
        this.formErrors,
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

  ngOnInit() {
    this.commonServiceCall.pageName = "Add Insurance Product";
    this.buildForm();
    this.getCategories();
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.insuranceProductAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

  onCategoryChange(event) {
    console.log(event.target.value);
    this.selectedCategory = event.target.value;
    this.getCompanies(this.selectedCategory);
  }

  //on load functions to get company dorpdown values
  getCompanies(categoryId) {

    var param = {
      "categoryId": categoryId
    };

    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.getComapnyMasterDataByCategoryIdUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      this.commonMethod.hideLoader();
      if (res.responseCode == "200") {
        console.log("companies: ", res);
        this.companyArr = res.result;
      } else {
        this.errorCallBack(this.appConstants.getComapnyMasterDataByCategoryIdUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  //on load functions to get categories dropdown values
  getCategories() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstants.getAllCategoriesMasterUrl)
    .subscribe((data) => {
      var res = data.resp;
      this.commonMethod.hideLoader();
      if (res.responseCode == "200") {
        console.log("categories: ", res);
        this.categoriesArr = res.result;
      } else {
        this.errorCallBack(this.appConstants.getAllCategoriesMasterUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  onRoleChange(event) {
    this.roleid = event.target.value;
    console.log(this.roleid);
  }

  openActionModel(action, formdata) {
    if(this.insuranceProductAddForm.get('bigImage').value == ""){ this.isBigImgError = true; }
    if (this.insuranceProductAddForm.valid) {

      if(this.isBigImgError == true) { return; }
      if(this.isValidBigSizeFileFormat == true) { return; }

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.insuranceProductAddFields.company = formdata.company;
      this.insuranceProductAddFields.category = formdata.category;
      this.insuranceProductAddFields.productDesctiption = formdata.productDesctiption;
      this.insuranceProductAddFields.productName = formdata.productName;
      this.insuranceProductAddFields.productUrl = formdata.productUrl;
      this.insuranceProductAddFields.bigImage = formdata.bigImage;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.insuranceProductAddForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionModel() {
    this.insuranceProductAddForm.patchValue({
      category: this.insuranceProductAddFields.category,
      company: this.insuranceProductAddFields.company,
      productDesctiption: this.insuranceProductAddFields.productDesctiption,
      productName: this.insuranceProductAddFields.productName,
      productUrl: this.insuranceProductAddFields.productUrl,
      bigImage: this.insuranceProductAddFields.bigImage,
    });
    closeTinyModel();
  }

  add() {
    this.isBigImgError = false;
    this.isValidBigFileFormat = false;
    if (this.insuranceProductAddForm.get("bigImage").value == "") {
      this.isBigImgError = true;
    }
    this.formValidation.markFormGroupTouched(this.insuranceProductAddForm);
    if (this.insuranceProductAddForm.valid) {
      var formData = this.insuranceProductAddForm.value;
      if (this.isValidBigSizeFileFormat == true) {
        return;
      }

      this.formData = this.insuranceProductAddForm.value;

      var inputData = this.insuranceProductAddService.getAddInsuranceProductCall(
        this.insuranceProductAddForm.value,
        this.images
      );
      this.addInsuranceProduct(inputData);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.insuranceProductAddForm,
        this.formErrors,
        false
      );
    }
  }

  addProductWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.insuranceProductAddService.getAddInsuranceProductWithRemarkCall(
        this.insuranceProductAddFields,
        this.images,
        this.remarkForm.value
      );
      this.addInsuranceProduct(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  cancel() {
    this.router.navigateByUrl("/insuranceProduct");
  }

  addInsuranceProduct(param) {
    console.log("adding user: ", param);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.addProductMasterDataUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add user response: ", res);
        if (res.responseCode == "200") {
          console.log(res);
          this.commonMethod.hideLoader();
          showToastMessage(res.responseMessage);
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.addProductMasterDataUrl +
            "\n" +
            "Params=" +
            JSON.stringify(param),
            "add"
          );
          this.router.navigateByUrl("/insuranceProduct");
        } else {
          if (
            this.commonData.roleType ==
            this.commonData.makerRole
          ) {
            this.insuranceProductAddForm.patchValue({
              category: this.insuranceProductAddFields.category,
              company: this.insuranceProductAddFields.company,
              productDesctiption: this.insuranceProductAddFields.productDesctiption,
              productName: this.insuranceProductAddFields.productName,
              productUrl: this.insuranceProductAddFields.productUrl,
              bigImage: this.insuranceProductAddFields.bigImage,
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.addProductMasterDataUrl, res);
        }
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  addImage(event: any, type) {
    console.log("inside");
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (
        event.target.files[0].type == "image/jpeg" ||
        event.target.files[0].type == "image/png"
      ) {
        this.commonMethod.getBase64FromFile(file);
      } else {
        if (type == "big") {
          this.isValidBigFileFormat = true;
          this.isValidBigSizeFileFormat = false;
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        var img = new Image();
        var me = this;
        img.src = window.URL.createObjectURL(file);
        img.onload = function () {
          console.log(img);
          var width = img.naturalWidth,
            height = img.naturalHeight;
          if (type == "big") {
            if (width > 380 || height > 180) {
              me.isValidBigSizeFileFormat = true;
              me.isValidBigFileFormat = false;
            } else {
              me.bigImage = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.bigImage = base64;
              });
              me.insuranceProductAddForm.get("bigImage").setValue(file);
              me.isBigImgError = false;
              me.isValidBigSizeFileFormat = false;
              me.isValidBigFileFormat = false;
            }
          }
        };
      };

      reader.readAsDataURL(file);
    }
  }

}
