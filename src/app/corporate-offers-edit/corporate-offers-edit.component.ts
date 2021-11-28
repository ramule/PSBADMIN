import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { CorporateOffersEditService } from './corporate-offers-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-offers-edit',
  templateUrl: './corporate-offers-edit.component.html',
  styleUrls: ['./corporate-offers-edit.component.css']
})
export class CorporateOffersEditComponent implements OnInit {

  userDtl: any;
  beforeParam: any = []
  customerOfferForm: FormGroup;
  remarkForm: FormGroup;
  smallImgDefault: any;
  bigImgDefault: any;
  formErrors = {
    smallImage: '',
    bigImage: '',
    offerCaption: '',
    status: '',
    seqNo: '',
    lat: '',
    long: '',
    webLink: '',
    serviceType: '',
    fromDate: '',
    toDate: '',
    productType: '',
    remark: ''
  };

  custOfferEditFields = {
    smallImage: '',
    bigImage: '',
    offerCaption: '',
    status: '',
    seqNo: '',
    lat: '',
    long: '',
    webLink: '',
    serviceType: '',
    fromDate: '',
    toDate: '',
    productType: ''
  }

  roleId: any;
  selModel: any;
  remarkHistoryArr: any = [];
  smallImage: any;
  smallImageValue: File;
  bigImage: any;
  bigImageValue: File;
  formData: any;
  masterStatus: any = [];
  userDtls: any;
  uploadForm: FormGroup;
  announcementTypeList = [];
  isBigImgError: boolean = false;
  isSmallImgError: boolean = false;
  isValidSmallFileFormat: boolean = false;
  isValidSmallSizeFileFormat: boolean = false;
  isValidBigSizeFileFormat: boolean = false;
  isValidBigFileFormat: boolean = false;
  announcementDetail;
  images = {
    smallImage: '',
    largeImage: ''
  }

  selectedRole: any;
  status: any;
  userstatus: any = [];
  productType: any = [];
  toDateValid: boolean = false;
  isValidLatitude: boolean = false;
  isValidLongitude: boolean = false;
  isToDateValidError: any = "";
  todayDate: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstants: AppConstants,
    private commonMethod: CommonMethods,
    public datePipe: DatePipe,
    private corpOfferEditService: CorporateOffersEditService
  ) { }

  public buildForm() {
    this.customerOfferForm = this.form.group({
      smallImage: new FormControl(''),
      bigImage: new FormControl(''),
      offerCaption: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_\d\-_.,\s ]+$/)]),
      status: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      seqNo: new FormControl('', [Validators.required, Validators.min(1)]),
      lat: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/)]),
      long: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/)]),
      webLink: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      serviceType: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required])

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

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/corporateOffers');
      return;
    }

    this.commonServiceCall.pageName = "Edit Offer";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    console.log(this.commonServiceCall.userCredential.userid);
    this.userDtl = this.location.getState();
    this.getProductType();
    this.getStatus();
    this.userDtls = JSON.parse(this.commonServiceCall.userCredential);
    console.log(this.userDtls);
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getRemarkHistoryData(this.userDtl.id);
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/" + this.commonData.submenuId).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.remarkHistoryArr = res.result;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpOfferEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }


  filterProducts() {
    return this.productType.filter(x => x.shortName == "CORPORATE");
  }

  addImage(event: any, type) {
    console.log("inside");
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png") {
        this.commonMethod.getBase64FromFile(file);
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
        console.log('img.src', img.src);
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
              me.customerOfferForm.get('bigImage').setValue(file);
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.largeImage = base64;
              });
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

  openActionModel(action, formdata) {
    console.log(this.customerOfferForm.valid);
    console.log(this.customerOfferForm.value);
    this.isBigImgError = false;
    this.isSmallImgError = false;
    this.isValidSmallFileFormat = false;
    this.isValidBigFileFormat = false;
    if (this.customerOfferForm.get('bigImage').value == "") { this.isBigImgError = true; }
    if (this.customerOfferForm.get('smallImage').value == "") { this.isSmallImgError = true; }
    if (this.customerOfferForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.custOfferEditFields.smallImage = formdata.smallImage;
      this.custOfferEditFields.bigImage = formdata.bigImage;
      this.custOfferEditFields.offerCaption = formdata.offerCaption;
      this.custOfferEditFields.seqNo = formdata.seqNo;
      this.custOfferEditFields.lat = formdata.lat;
      this.custOfferEditFields.long = formdata.long;
      this.custOfferEditFields.fromDate = formdata.fromDate;
      this.custOfferEditFields.toDate = formdata.toDate;
      this.custOfferEditFields.webLink = formdata.webLink;
      this.custOfferEditFields.serviceType = formdata.serviceType;
      this.custOfferEditFields.productType = formdata.productType;
      this.custOfferEditFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.customerOfferForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.customerOfferForm.patchValue({
      smallImage: this.custOfferEditFields.smallImage,
      bigImage: this.custOfferEditFields.bigImage,
      offerCaption: this.custOfferEditFields.offerCaption,
      seqNo: this.custOfferEditFields.seqNo,
      lat: this.custOfferEditFields.lat,
      long: this.custOfferEditFields.long,
      fromDate: this.custOfferEditFields.fromDate,
      toDate: this.custOfferEditFields.toDate,
      webLink: this.custOfferEditFields.webLink,
      serviceType: this.custOfferEditFields.serviceType,
      productType: this.custOfferEditFields.productType,
      status: this.custOfferEditFields.status,
    });
    closeTinyModel();
  }

  updateCustomerOfferWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.corpOfferEditService.updateOfferWithRemarkCall(this.custOfferEditFields, this.images, this.userDtls.user_ID, this.userDtl.id, this.remarkForm.value);
      this.updateOfferMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false)
    }
  }

  update() {
    console.log(this.customerOfferForm.valid);
    console.log(this.customerOfferForm.value);
    this.isBigImgError = false;
    this.isSmallImgError = false;
    this.isValidSmallFileFormat = false;
    this.isValidBigFileFormat = false;
    if (this.customerOfferForm.get('bigImage').value == "") { this.isBigImgError = true; }
    if (this.customerOfferForm.get('smallImage').value == "") { this.isSmallImgError = true; }
    this.formValidation.markFormGroupTouched(this.customerOfferForm);
    if (this.customerOfferForm.valid) {
      var param = this.corpOfferEditService.updateOfferCall(this.customerOfferForm.value, this.images, this.userDtls.user_ID, this.userDtl.id);
      this.updateOfferMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.customerOfferForm, this.formErrors, false)
    }
  }

  updateOfferMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateOfferDetails, param).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateOfferDetails + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParam), 'update')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();

        this.commonMethod.hideLoader();
      } else {
        if (this.commonData.roleType == this.commonData.corpMakerRole) {
          this.customerOfferForm.patchValue({
            smallImage: this.custOfferEditFields.smallImage,
            bigImage: this.custOfferEditFields.bigImage,
            offerCaption: this.custOfferEditFields.offerCaption,
            seqNo: this.custOfferEditFields.seqNo,
            lat: this.custOfferEditFields.lat,
            long: this.custOfferEditFields.long,
            fromDate: this.custOfferEditFields.fromDate,
            toDate: this.custOfferEditFields.toDate,
            webLink: this.custOfferEditFields.webLink,
            serviceType: this.custOfferEditFields.serviceType,
            productType: this.custOfferEditFields.productType,
            status: this.custOfferEditFields.status,
          });
        }

        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
      closeTinyModel();
    })
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


  //onload
  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.userstatus = [];
        data.resp.forEach(el => {
          if (el.id == 3 || el.id == 0) {
            this.userstatus.push(el);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }

      this.getOfferDetails(this.userDtl.id);
    });
  }
  getOfferDetails(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getOfferDtlsById + "/" + id).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.beforeParam = res.result[0];
        var result = res.result[0];

        this.smallImage = 'data:image/jpg;base64,'+result.baseImageSmall;
        this.images.smallImage = 'data:image/jpg;base64,'+result.baseImageSmall;

        this.bigImage = 'data:image/jpg;base64,'+result.baseImageLarge;
        this.images.largeImage = 'data:image/jpg;base64,'+result.baseImageLarge;

        this.smallImgDefault = result.baseImageSmall;
        this.bigImgDefault = result.baseImageLarge;
        console.log(res);
        this.selectedRole = data.resp[0];
        console.log(this.selectedRole);
        if (res.result[0].userAction != null) {
          this.customerOfferForm.patchValue({
            smallImage: this.smallImage,
            bigImage: this.bigImage,
            offerCaption: res.result[0].imgcaption,
            status: res.result[0].userAction,
            seqNo: res.result[0].seqNumber,
            lat: res.result[0].latitude,
            long: res.result[0].longitude,
            webLink: res.result[0].weblink,
            serviceType: res.result[0].serviceType,
            fromDate: this.datePipe.transform(res.result[0].validFrom, 'yyyy-MM-dd'),
            toDate: this.datePipe.transform(res.result[0].validTo, 'yyyy-MM-dd'),
            productType: res.result[0].appId
          })
        } else {
          this.customerOfferForm.patchValue({
            smallImage: this.smallImage,
            bigImage: this.bigImage,
            offerCaption: res.result[0].imgcaption,
            status: res.result[0].statusId,
            seqNo: res.result[0].seqNumber,
            lat: res.result[0].latitude,
            long: res.result[0].longitude,
            webLink: res.result[0].weblink,
            serviceType: res.result[0].serviceType,
            fromDate: this.datePipe.transform(res.result[0].validFrom, 'yyyy-MM-dd'),
            toDate: this.datePipe.transform(res.result[0].validTo, 'yyyy-MM-dd'),
            productType: res.result[0].appId
          })
        }

        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustomerDetails, res);
      }

    })
  }
  getProductType() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe(data => {
      if (data.status) {
        console.log("roles", data.resp);
        this.productType = data.resp;
      }
      else {
        this.commonMethod.errorMessage(data);
      }

    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == '/corporateOffers') {
      this.router.navigateByUrl("/corporateOffers");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests') {
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/corporateOffers");
    }
  }

}
