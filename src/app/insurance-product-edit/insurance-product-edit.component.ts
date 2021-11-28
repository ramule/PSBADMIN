import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from "@angular/common";
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { InsuranceProductEditService } from './insurance-product-edit.service';
import { browserRefresh } from '../app.component';

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-insurance-product-edit',
  templateUrl: './insurance-product-edit.component.html',
  styleUrls: ['./insurance-product-edit.component.css']
})
export class InsuranceProductEditComponent implements OnInit {

  insuranceProductEditForm: FormGroup;
  remarkForm: FormGroup;
  roleid: any;
  roleType: any;
  selectedCategory: any;
  insuranceProductDataArr: any = [];
  status: any = [];
  productData: any;
  formErrors = {
    company: "",
    category: "",
    productName: "",
    productDesctiption: "",
    productUrl: "",
    bigImage: "",
    remark: "",
    statusId: "",
  };

  insuranceProductAddFields = {
    company: "",
    category: "",
    productName: "",
    productDesctiption: "",
    productUrl: "",
    bigImage: "",
    statusId: "",
  };

  selModel: any;
  companyArr: any = [];
  categoriesArr: any = [];
  remarkHistoryArr: any = [];

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
    public insuranceProductEditService: InsuranceProductEditService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods,
    private location: Location
  ) { }

  public buildForm() {

    this.insuranceProductEditForm = this.form.group({
      company: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      productDesctiption: new FormControl("", [Validators.required]),
      productUrl: new FormControl("", [Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]),
      productName: new FormControl("", [
        Validators.required,
      ]),
      bigImage: new FormControl("", [Validators.required]),
      statusId: new FormControl("", [Validators.required]),
    });
    this.insuranceProductEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.insuranceProductEditForm,
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
    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/insuranceProduct');
      return;
    }
    this.commonServiceCall.pageName = "Edit Insurance Product";
    this.productData = this.location.getState();
    this.buildForm();
    this.getCategories();
    this.getStatus();
    this.getProductMasterById(this.productData.id);
    this.getRemarkHistoryData(this.productData.id);
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.insuranceProductEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

  getStatus() {
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        if (data.status) {
          console.log("Data resp: ", data.resp);
          this.status = data.resp;
        } else {
          this.commonMethod.errorMessage(data);
        }
      });
  }

  filterStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
    .getResponsePromise(
      this.appConstants.getRemarkHistoryDataUrl +
        id +
        "/" +
        this.commonData.submenuId
    )
    .subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        console.log(res);
        this.remarkHistoryArr = res.result;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
      } else if (res.responseCode == "202"){
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
      }
    });
  }

  getProductMasterById(id){
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getProductMasterDataByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.insuranceProductDataArr = res.result[0];

        this.bigImage = 'data:image/jpg;base64,'+ this.insuranceProductDataArr.productImg;
        this.images.bigImage = 'data:image/jpg;base64,'+ this.insuranceProductDataArr.productImg;

        console.log(res);
        if(res.result[0].userAction !=null) {
          this.insuranceProductEditForm.patchValue({
            category: res.result[0].categoryId,
            company: res.result[0].compId,
            productName: res.result[0].productName,
            productDesctiption: res.result[0].productDescription,
            productUrl: res.result[0].productUrl,
            bigImage: this.bigImage,
            statusId: res.result[0].userAction,
          })
        }else{
          this.insuranceProductEditForm.patchValue({
            category: res.result[0].categoryId,
            company: res.result[0].compId,
            productName: res.result[0].productName,
            productDesctiption: res.result[0].productDescription,
            productUrl: res.result[0].productUrl,
            bigImage: this.bigImage,
            statusId: res.result[0].statusId,
          })
        }
        this.getCompanies(res.result[0].categoryId, 'onLoad');
      }
      else {
        this.errorCallBack(this.appConstants.getProductMasterDataByIdUrl, res);
      }
      setTimeout(() => {
        this.commonMethod.hideLoader();
      }, 3000);
    })
  }

  onCategoryChange(event) {
    console.log(event.target.value);
    this.selectedCategory = event.target.value;
    this.getCompanies(this.selectedCategory, 'onChange');
  }

  //on load functions to get company dorpdown values
  getCompanies(categoryId, type) {
    this.companyArr = [];
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

        if(type == "onChange") {
          this.insuranceProductEditForm.get('company').setValue("");
        }
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
    if(this.insuranceProductEditForm.get('bigImage').value == ""){ this.isBigImgError = true; }
    if (this.insuranceProductEditForm.valid) {

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
      this.insuranceProductAddFields.statusId = formdata.statusId;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.insuranceProductEditForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionModel() {
    this.insuranceProductEditForm.patchValue({
      category: this.insuranceProductAddFields.category,
      company: this.insuranceProductAddFields.company,
      productDesctiption: this.insuranceProductAddFields.productDesctiption,
      productName: this.insuranceProductAddFields.productName,
      productUrl: this.insuranceProductAddFields.productUrl,
      bigImage: this.insuranceProductAddFields.bigImage,
      statusId: this.insuranceProductAddFields.statusId,
    });
    closeTinyModel();
  }

  edit() {
    this.isBigImgError = false;
    this.isValidBigFileFormat = false;
    if (this.insuranceProductEditForm.get("bigImage").value == "") {
      this.isBigImgError = true;
    }
    this.formValidation.markFormGroupTouched(this.insuranceProductEditForm);
    if (this.insuranceProductEditForm.valid) {
      var formData = this.insuranceProductEditForm.value;
      if (this.isValidBigSizeFileFormat == true) {
        return;
      }

      this.formData = this.insuranceProductEditForm.value;

      var inputData = this.insuranceProductEditService.getEditInsuranceProductCall(
        this.productData.id,
        this.insuranceProductEditForm.value,
        this.images,
        this.insuranceProductDataArr
      );
      this.updateInsuranceProduct(inputData);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.insuranceProductEditForm,
        this.formErrors,
        false
      );
    }
  }

  editProductWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.insuranceProductEditService.getEditInsuranceProductWithRemarkCall(
        this.productData.id,
        this.insuranceProductAddFields,
        this.images,
        this.insuranceProductDataArr,
        this.remarkForm.value
      );
      this.updateInsuranceProduct(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/insuranceProduct") {
      this.router.navigateByUrl("/insuranceProduct");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/insuranceProduct");
    }
  }

  updateInsuranceProduct(param) {
    console.log("adding user: ", param);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateProductMasterDataUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add user response: ", res);
        if (res.responseCode == "200") {
          console.log(res);
          showToastMessage(res.responseMessage);
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.updateProductMasterDataUrl +
            "\n" +
            "Params=" +
            JSON.stringify(param),
            "add"
          );
          this.cancel();
        } else {
          if (
            this.commonData.roleType ==
            this.commonData.makerRole
          ) {
            this.insuranceProductEditForm.patchValue({
              category: this.insuranceProductAddFields.category,
              company: this.insuranceProductAddFields.company,
              productDesctiption: this.insuranceProductAddFields.productDesctiption,
              productName: this.insuranceProductAddFields.productName,
              productUrl: this.insuranceProductAddFields.productUrl,
              bigImage: this.insuranceProductAddFields.bigImage,
              statusId: this.insuranceProductAddFields.statusId,
            });
          }
          this.errorCallBack(this.appConstants.updateProductMasterDataUrl, res);
        }
        this.commonMethod.hideLoader();
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
              me.insuranceProductEditForm.get("bigImage").setValue(file);
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
