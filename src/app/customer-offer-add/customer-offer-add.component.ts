import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { CustomerOfferAddService } from './customer-offer-add.service';
import { DatePipe } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-customer-offer-add',
  templateUrl: './customer-offer-add.component.html',
  styleUrls: ['./customer-offer-add.component.css']
})
export class CustomerOfferAddComponent implements OnInit {

  customerOfferForm: FormGroup;
  remarkForm: FormGroup;
  images={
    smallImage:'',
    largeImage:''
  }
  formErrors = {
    smallImage: '',
    bigImage: '',
    officeCaption: '',
    productType: '',
    status: '',
    seqNo: '',
    lat: '',
    lon: '',
    webLink: '',
    serviceType: '',
    fromDate: '',
    toDate: '',
    remark: ''
  }

  customerOfferAddFields = {
    smallImage: '',
    bigImage: '',
    officeCaption: '',
    productType: '',
    status: '',
    seqNo: '',
    lat: '',
    lon: '',
    webLink: '',
    serviceType: '',
    fromDate: '',
    toDate: ''
  }

  roleId: any;
  selModel: any;
  smallImage: any;
  smallImageValue: File;
  bigImage: any;
  bigImageValue: File;
  formData: any;
  productType: any = [];
  status: any = [];
  userDtls: any;
  todayDate: any;
  uploadForm: FormGroup;

  isBigImgError: boolean = false;
  isSmallImgError: boolean = false;
  isValidSmallFileFormat: boolean = false;
  isValidSmallSizeFileFormat: boolean = false;
  isValidBigSizeFileFormat: boolean = false;
  isValidBigFileFormat: boolean = false;
  toDateValid: boolean = false;
  isToDateValidError: any = ""



  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private appConstant: AppConstants,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private offerService: CustomerOfferAddService,
    public datePipe: DatePipe
  ) { }

  //Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_ ]+$/)

  public buildForm() {
    this.customerOfferForm = this.form.group({
      smallImage: new FormControl(''),
      bigImage: new FormControl(''),
      officeCaption: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_\d\-_.,\s ]+$/)]),
      productType: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      seqNo: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.min(1), Validators.pattern(/^[a-zA-Z0-9_]*$/)]),//aplha umeric
      lat: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/)]),//no and  dot //Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)
      lon: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/)]),
      webLink: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      serviceType: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    });
    this.customerOfferForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.customerOfferForm, this.formErrors, true)
    });

    if (this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add New Offer";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getProductType();
    this.getStatus();
    this.commonMethod.hideLoader();
    this.customerOfferForm.patchValue({
      status: 3
    });
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.uploadForm = this.form.group({
      file1: [''],
      file2: [''],
    });
    this.userDtls = JSON.parse(this.commonServiceCall.userCredential);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.offerService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  onFileSelect(event, type) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (type == 'file1') {
        this.uploadForm.get('file1').setValue(file);
      }
      else if (type == 'file2') {
        this.uploadForm.get('file2').setValue(file);
      }
    }
  }

  openActionModel(action, formdata) {
    this.isBigImgError = false;
    this.isSmallImgError = false;
    this.isValidSmallFileFormat = false;
    this.isValidBigFileFormat = false;
    if (this.customerOfferForm.get('bigImage').value == "") { this.isBigImgError = true; }
    if (this.customerOfferForm.get('smallImage').value == "") { this.isSmallImgError = true; }
    if (this.customerOfferForm.valid) {
      if (this.isBigImgError == true || this.isSmallImgError == true) { return; }
      if (this.isValidSmallSizeFileFormat == true || this.isValidBigSizeFileFormat) { return; }
      if (this.toDateValid) { return; }
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.customerOfferAddFields.smallImage = formdata.smallImage;
      this.customerOfferAddFields.bigImage = formdata.bigImage;
      this.customerOfferAddFields.officeCaption = formdata.officeCaption;
      this.customerOfferAddFields.seqNo = formdata.seqNo;
      this.customerOfferAddFields.lat = formdata.lat;
      this.customerOfferAddFields.lon = formdata.lon;
      this.customerOfferAddFields.fromDate = formdata.fromDate;
      this.customerOfferAddFields.toDate = formdata.toDate;
      this.customerOfferAddFields.webLink = formdata.webLink;
      this.customerOfferAddFields.serviceType = formdata.serviceType;
      this.customerOfferAddFields.productType = formdata.productType;
      this.customerOfferAddFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.customerOfferForm, this.formErrors, false)
    }
  }


  closeActionMoel() {
    this.customerOfferForm.patchValue({
      smallImage: this.customerOfferAddFields.smallImage,
      bigImage: this.customerOfferAddFields.bigImage,
      officeCaption: this.customerOfferAddFields.officeCaption,
      seqNo: this.customerOfferAddFields.seqNo,
      lat: this.customerOfferAddFields.lat,
      lon: this.customerOfferAddFields.lon,
      fromDate: this.customerOfferAddFields.fromDate,
      toDate: this.customerOfferAddFields.toDate,
      webLink: this.customerOfferAddFields.webLink,
      serviceType: this.customerOfferAddFields.serviceType,
      productType: this.customerOfferAddFields.productType,
      status: this.customerOfferAddFields.status,
    });
    closeTinyModel();
  }

  addCustOfferMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      console.log('small img: ', this.images.smallImage);
      console.log('large img: ', this.images.largeImage);
      var param = this.offerService.getOfferAddParamWithRemark(this.customerOfferAddFields, this.images ,this.userDtls, this.remarkForm.value);
      this.uploadOffer(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  addCustOfferMaster() {
    this.isBigImgError = false;
    this.isSmallImgError = false;
    this.isValidSmallFileFormat = false;
    this.isValidBigFileFormat = false;
    if (this.customerOfferForm.get('bigImage').value == "") { this.isBigImgError = true; }
    if (this.customerOfferForm.get('smallImage').value == "") { this.isSmallImgError = true; }


    this.formValidation.markFormGroupTouched(this.customerOfferForm);
    if (this.customerOfferForm.valid) {
      if (this.isBigImgError == true || this.isSmallImgError == true) { return; }
      if (this.isValidSmallSizeFileFormat == true || this.isValidBigSizeFileFormat) { return; }
      if (this.toDateValid) { return; }
      this.formData = this.customerOfferForm.value;
      console.log(this.formData);

      console.log('small img: ', this.images.smallImage);
      console.log('large img: ', this.images.largeImage);
      var param = this.offerService.getOfferAddParam(this.customerOfferForm.value, this.images, this.userDtls);
      this.uploadOffer(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.customerOfferForm, this.formErrors, false)
    }
  }

  cancel() {
    this.customerOfferForm.reset();
    this.router.navigateByUrl("/customerOffer");
  }



  onDateChange(value) {
    if (value.fromDate != "" && value.toDate != "") {
      if (value.toDate < value.fromDate) {
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* Please enter valid date";
      }
      else {
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }

  addImage(event: any, type) {
    console.log("inside");
    console.log(event);
    // console.log(this.customerOfferForm.get('smallImage').value);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png") {

      }
      else {
        if (type == 'small') {
          this.isValidSmallFileFormat = true;
          this.isValidSmallSizeFileFormat = false;
        }
        else {
          this.isValidBigFileFormat = true;
          this.isValidBigSizeFileFormat = false;
        }
        return;
      }





      const reader = new FileReader();
      reader.onload = (e: any) => {
        var img = new Image();
        var me = this
        img.src = window.URL.createObjectURL(file);
        img.onload = function () {
          console.log(img);
          var width = img.naturalWidth, height = img.naturalHeight;
          if (type == 'small') {
            if (width > 128 || height > 80) {
              me.isValidSmallSizeFileFormat = true;
              me.isValidSmallFileFormat = false;
            }
            else {
              me.smallImage = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.smallImage = base64;
              });
              me.customerOfferForm.get('smallImage').setValue(file);
              me.isSmallImgError = false;
              me.isValidSmallSizeFileFormat = false;
              me.isValidSmallFileFormat = false;
            }
          }
          else {
            if (width > 380 || height > 180) {
              me.isValidBigSizeFileFormat = true;
              me.isValidBigFileFormat = false;
            }
            else {
              me.bigImage = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.largeImage = base64;
              });
              me.customerOfferForm.get('bigImage').setValue(file);
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

  uploadOffer(param) {
    this.commonMethod.showLoader();

    this.commonServiceCall.postResponsePromise(this.appConstants.addOfferDtls, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.addOfferDtls + "\n" + "Params=" + JSON.stringify(param), 'add')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl("/customerOffer");
      } else {
        if (this.commonData.roleType == this.commonData.makerRole) {
          this.customerOfferForm.patchValue({
            smallImage: this.customerOfferAddFields.smallImage,
            bigImage: this.customerOfferAddFields.bigImage,
            officeCaption: this.customerOfferAddFields.officeCaption,
            seqNo: this.customerOfferAddFields.seqNo,
            lat: this.customerOfferAddFields.lat,
            lon: this.customerOfferAddFields.lon,
            fromDate: this.customerOfferAddFields.fromDate,
            toDate: this.customerOfferAddFields.toDate,
            webLink: this.customerOfferAddFields.webLink,
            serviceType: this.customerOfferAddFields.serviceType,
            productType: this.customerOfferAddFields.productType,
            status: this.customerOfferAddFields.status,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustomerDetails, res);
      }
    })
  }

  addImage1(event: any, type) {
    console.log("insie add image 1");
  }

  filterProducts() {
    return this.productType.filter(x => x.shortName == "WALLET" || x.shortName == "MOBILE" || x.shortName == "DESKTOP");
  }

  //onload
  getProductType() {
    this.commonServiceCall.getResponsePromise(this.appConstant.masterListUrl).subscribe(data => {
      if (data.status) {
        console.log("roles", data.resp);
        this.productType = data.resp;
      }
      else {
        this.commonMethod.errorMessage(data);
      }

    })
  }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstant.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.status = [];
        data.resp.forEach(el => {
          if (el.id == 3 || el.id == 0) {
            this.status.push(el);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
