import { Component, OnInit } from "@angular/core";
import { DatePipe, Location } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { CorporateAnnouncementAddService } from "./corporate-announcement-add.service";
import { CommonMethods } from "../common-methods";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-corporate-announcement-add",
  templateUrl: "./corporate-announcement-add.component.html",
  styleUrls: ["./corporate-announcement-add.component.css"],
})
export class CorporateAnnouncementAddComponent implements OnInit {
  announcementAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    smallImage: "",
    bigImage: "",
    announcementHeaderName: "",
    productType: "",
    status: "",
    seqNo: "",
    lat: "",
    lon: "",
    webLink: "",
    announcementType: "",
    fromDate: "",
    toDate: "",
    caption: "",
    remark: "",
  };

  announcementAddFields = {
    smallImage: "",
    bigImage: "",
    announcementHeaderName: "",
    productType: "",
    status: "",
    seqNo: "",
    lat: "",
    lon: "",
    webLink: "",
    announcementType: "",
    fromDate: "",
    toDate: "",
    caption: "",
  };

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
  announcementTypeList = [];
  isBigImgError: boolean = false;
  isSmallImgError: boolean = false;
  isValidSmallFileFormat: boolean = false;
  isValidSmallSizeFileFormat: boolean = false;
  isValidBigSizeFileFormat: boolean = false;
  isValidBigFileFormat: boolean = false;
  toDateValid: boolean = false;
  isToDateValidError: any = "";
  images = {
    smallImage: "",
    largeImage: "",
  };

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
    private annoucmentAddService: CorporateAnnouncementAddService,
    public datePipe: DatePipe
  ) { }

  public buildForm() {
    this.announcementAddForm = this.form.group({
      smallImage: new FormControl(""),
      bigImage: new FormControl(""),
      caption: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/),
      ]),
      announcementHeaderName: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/),
      ]),
      productType: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      seqNo: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.min(1),
      ]), //aplha umeric
      lat: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/),
      ]), //no and  dot //Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)
      lon: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/),
      ]),
      webLink: new FormControl("", [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(
          "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
        ),
      ]),
      announcementType: new FormControl("", [Validators.required]),
      fromDate: new FormControl("", [Validators.required]),
      toDate: new FormControl("", [Validators.required]),
    });
    this.announcementAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.announcementAddForm,
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

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add New Announcement";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getProductType();
    this.getStatus();
    this.getAnnouncementType();
    console.log(this.userDtls);
    this.announcementAddForm.patchValue({
      status: 3,
    });
    this.todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.uploadForm = this.form.group({
      file1: [""],
      file2: [""],
    });
    this.userDtls = JSON.parse(this.commonServiceCall.userCredential);
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.annoucmentAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

  onFileSelect(event, type) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (type == "file1") {
        this.uploadForm.get("file1").setValue(file);
      } else if (type == "file2") {
        this.uploadForm.get("file2").setValue(file);
      }
    }
  }

  openActionModel(action, formdata) {
    this.isBigImgError = false;
    this.isSmallImgError = false;
    this.isValidSmallFileFormat = false;
    this.isValidBigFileFormat = false;
    if (this.announcementAddForm.get("bigImage").value == "") {
      this.isBigImgError = true;
    }
    if (this.announcementAddForm.get("smallImage").value == "") {
      this.isSmallImgError = true;
    }
    if (this.announcementAddForm.valid) {
      if (this.isBigImgError == true || this.isSmallImgError == true) {
        return;
      }
      if (
        this.isValidSmallSizeFileFormat == true ||
        this.isValidBigSizeFileFormat
      ) {
        return;
      }
      if (this.toDateValid) {
        return;
      }
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.announcementAddFields.smallImage = formdata.smallImage;
      this.announcementAddFields.bigImage = formdata.bigImage;
      this.announcementAddFields.announcementHeaderName =
        formdata.announcementHeaderName;
      this.announcementAddFields.productType = formdata.productType;
      this.announcementAddFields.webLink = formdata.webLink;
      this.announcementAddFields.lat = formdata.lat;
      this.announcementAddFields.lon = formdata.lon;
      this.announcementAddFields.fromDate = formdata.fromDate;
      this.announcementAddFields.toDate = formdata.toDate;
      this.announcementAddFields.caption = formdata.caption;
      this.announcementAddFields.status = formdata.status;
      this.announcementAddFields.seqNo = formdata.seqNo;
      this.announcementAddFields.announcementType = formdata.announcementType;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.announcementAddForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.announcementAddForm.patchValue({
      smallImage: this.announcementAddFields.smallImage,
      bigImage: this.announcementAddFields.bigImage,
      announcementHeaderName: this.announcementAddFields.announcementHeaderName,
      productType: this.announcementAddFields.productType,
      webLink: this.announcementAddFields.webLink,
      lat: this.announcementAddFields.lat,
      lon: this.announcementAddFields.lon,
      fromDate: this.announcementAddFields.fromDate,
      toDate: this.announcementAddFields.toDate,
      caption: this.announcementAddFields.caption,
      status: this.announcementAddFields.status,
      seqNo: this.announcementAddFields.seqNo,
      announcementType: this.announcementAddFields.announcementType,
    });
    closeTinyModel();
  }

  addAnnouncementWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.annoucmentAddService.getAnnouncementParamsWithRemark(
        this.announcementAddFields,
        this.images,
        this.userDtls,
        this.remarkForm.value
      );
      this.saveAnnouncementDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  addAnnouncement() {
    this.isBigImgError = false;
    this.isSmallImgError = false;
    this.isValidSmallFileFormat = false;
    this.isValidBigFileFormat = false;
    if (this.announcementAddForm.get("bigImage").value == "") {
      this.isBigImgError = true;
    }
    if (this.announcementAddForm.get("smallImage").value == "") {
      this.isSmallImgError = true;
    }

    this.formValidation.markFormGroupTouched(this.announcementAddForm);
    if (this.announcementAddForm.valid) {
      if (this.isBigImgError == true || this.isSmallImgError == true) {
        return;
      }
      if (
        this.isValidSmallSizeFileFormat == true ||
        this.isValidBigSizeFileFormat
      ) {
        return;
      }
      if (this.toDateValid) {
        return;
      }
      this.formData = this.announcementAddForm.value;

      var param = this.annoucmentAddService.getAnnouncementParams(
        this.announcementAddForm.value,
        this.images,
        this.userDtls
      );
      this.saveAnnouncementDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.announcementAddForm,
        this.formErrors,
        false
      );
    }
  }

  cancel() {
    this.announcementAddForm.reset();
    this.router.navigateByUrl("/corporateAnnouncement");
  }

  onDateChange(value) {
    if (value.fromDate != "" && value.toDate != "") {
      if (value.toDate < value.fromDate) {
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* Please enter valid date";
      } else {
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
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
        if (type == "small") {
          this.isValidSmallFileFormat = true;
          this.isValidSmallSizeFileFormat = false;
        } else {
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
          if (type == "small") {
            if (width > 128 || height > 80) {
              me.isValidSmallSizeFileFormat = true;
              me.isValidSmallFileFormat = false;
            } else {
              me.smallImage = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.smallImage = base64;
              });
              me.announcementAddForm.get("smallImage").setValue(file);
              me.isSmallImgError = false;
              me.isValidSmallSizeFileFormat = false;
              me.isValidSmallFileFormat = false;
            }
          } else {
            if (width > 380 || height > 180) {
              me.isValidBigSizeFileFormat = true;
              me.isValidBigFileFormat = false;
            } else {
              me.bigImage = e.target.result;
              me.announcementAddForm.get("bigImage").setValue(file);
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

  saveAnnouncementDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.saveAnnouncementsDetais, param)
      .subscribe((data) => {
        console.log(data);
        var res = data.resp;
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.saveAnnouncementsDetais +
            "\n" +
            "Params=" +
            JSON.stringify(param),
            "add"
          );
          showToastMessage(res.responseMessage);
          this.commonMethod.hideLoader();
          this.router.navigateByUrl("/corporateAnnouncement");
        } else {
          if (this.commonData.roleType == "Corporate Maker") {
            this.announcementAddForm.patchValue({
              smallImage: this.announcementAddFields.smallImage,
              bigImage: this.announcementAddFields.bigImage,
              announcementHeaderName: this.announcementAddFields
                .announcementHeaderName,
              productType: this.announcementAddFields.productType,
              webLink: this.announcementAddFields.webLink,
              lat: this.announcementAddFields.lat,
              lon: this.announcementAddFields.lon,
              fromDate: this.announcementAddFields.fromDate,
              toDate: this.announcementAddFields.toDate,
              caption: this.announcementAddFields.caption,
              status: this.announcementAddFields.status,
              seqNo: this.announcementAddFields.seqNo,
              announcementType: this.announcementAddFields.announcementType,
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getCustomerDetails, res);
        }
      });
  }

  addImage1(event: any, type) {
    console.log("insie add image 1");
  }

  //onload
  getProductType() {
    this.commonServiceCall
      .getResponsePromise(this.appConstant.masterListUrl)
      .subscribe((data) => {
        if (data.status) {
          console.log("roles", data.resp);
          this.productType = data.resp;
        } else {
          this.commonMethod.errorMessage(data);
        }
      });
  }

  getAnnouncementType() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getAnnouncementType)
      .subscribe((data) => {
        if (data.resp.responseCode == "200") {
          console.log("getAnnouncementType", data.resp.result);
          this.commonMethod.hideLoader();
          this.announcementTypeList = data.resp.result;
        } else {
          this.commonMethod.hideLoader();
          this.commonMethod.errorMessage(data);
        }
      });
  }

  getStatus() {
    this.commonServiceCall
      .getResponsePromise(this.appConstant.masterStatusUrl)
      .subscribe((data) => {
        if (data.status) {
          console.log("Data resp: ", data.resp);
          this.status = [];
          data.resp.forEach((el) => {
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
    if (fld == this.appConstants.getCustomerDetails) {
      this.commonMethod.errorMessage(res);
    }
  }
}
