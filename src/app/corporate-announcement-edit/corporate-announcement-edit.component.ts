import { Location, DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { browserRefresh } from "../app.component";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CorporateAnnouncementEditService } from "./corporate-announcement-edit.service";
declare var showToastMessage: any;
declare var $: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var moment: any;
@Component({
  selector: "app-corporate-announcement-edit",
  templateUrl: "./corporate-announcement-edit.component.html",
  styleUrls: ["./corporate-announcement-edit.component.css"],
})
export class CorporateAnnouncementEditComponent implements OnInit {
  beforeParam: any = [];
  announcementEditForm: FormGroup;
  remarkForm: FormGroup;
  smallImgDefault: any;
  bigImgDefault: any;
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
  annoucementEditFields = {
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
  remarkHistoryArr: any = [];
  smallImage: any;
  smallImageValue: File;
  bigImage: any;
  bigImageValue: File;
  formData: any;
  productType: any = [];
  masterStatus: any = [];
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
  announcementDetail;
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
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    public announcementEditService: CorporateAnnouncementEditService
  ) { }

  public buildForm() {
    this.announcementEditForm = this.form.group({
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
    this.announcementEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.announcementEditForm,
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
      this.router.navigateByUrl('/corporateAnnouncement');
      return;
    }

    this.buildForm();
    this.commonServiceCall.pageName = "Announcement Details";
    this.roleId = this.commonData.roleId;
    this.announcementDetail = this.location.getState();
    this.getAnnouncementDetailsById(this.announcementDetail.id);
    this.getStatus();
    this.getAnnouncementType();
    this.getProductType();
    this.userDtls = JSON.parse(this.commonServiceCall.userCredential);
    console.log(this.userDtls);
    this.todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.getRemarkHistoryData(this.announcementDetail.id);
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .getResponsePromise(
        this.appConstant.getRemarkHistoryDataUrl +
        id +
        "/" +
        this.commonData.submenuId
      )
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.remarkHistoryArr = res.result;
          //initiallize datatable
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.commonMethod.hideLoader();
        } else if (res.responseCode == "202") {
          setTimeout(function () {
            $("table.display").DataTable({
              language: {
                emptyTable: "No Data found",
              },
            });
          });
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.getRemarkHistoryDataUrl, res);
        }
      });
  } /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.announcementEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => { });
  }

  getAnnouncementDetailsById(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getAnnouncementsById + id)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.beforeParam = res.result[0];
          var result = res.result[0];

          this.smallImage = "data:image/jpg;base64," + result.baseImageSmall;
          this.images.smallImage = "data:image/jpg;base64," + result.baseImageSmall;

          this.bigImage = "data:image/jpg;base64," + result.baseImageLarge;
          this.images.largeImage = "data:image/jpg;base64," + result.baseImageLarge;

          this.smallImgDefault = result.baseImageSmall;
          this.bigImgDefault = result.baseImageLarge;
          console.log(this.smallImage);
          if (res.result[0].userAction != null) {
            this.announcementEditForm.patchValue({
              smallImage: this.smallImage,
              bigImage: this.bigImage,
              announcementHeaderName: result.announcementHeader,
              seqNo: result.seqNumber,
              productType: result.appId,
              lat: result.latitude,
              lon: result.longitude,
              webLink: result.weblink,
              announcementType: result.type,
              status: result.userAction,
              caption: result.imagecaption,
              fromDate:
                result.validFrom != null
                  ? this.datePipe.transform(result.validFrom, "yyyy-MM-dd")
                  : "-",
              toDate:
                result.validTo != null
                  ? this.datePipe.transform(result.validTo, "yyyy-MM-dd")
                  : "-",
            });
          } else {
            this.announcementEditForm.patchValue({
              smallImage: this.smallImage,
              bigImage: this.bigImage,
              announcementHeaderName: result.announcementHeader,
              seqNo: result.seqNumber,
              productType: result.appId,
              lat: result.latitude,
              lon: result.longitude,
              webLink: result.weblink,
              announcementType: result.type,
              status: result.statusId,
              caption: result.imagecaption,
              fromDate:
                result.validFrom != null
                  ? this.datePipe.transform(result.validFrom, "yyyy-MM-dd")
                  : "-",
              toDate:
                result.validTo != null
                  ? this.datePipe.transform(result.validTo, "yyyy-MM-dd")
                  : "-",
            });
          }
          this.commonMethod.hideLoader();
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.getAnnouncementsById, res);
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

  filterProducts() {
    return this.productType.filter((x) => x.shortName == "CORPORATE");
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

  getStatus() {
    this.commonServiceCall
      .getResponsePromise(this.appConstant.masterStatusUrl)
      .subscribe((data) => {
        if (data.status) {
          console.log("Data resp: ", data.resp);
          this.masterStatus = [];
          data.resp.forEach((el) => {
            if (el.id == 3 || el.id == 0) {
              this.masterStatus.push(el);
            }
          });
        } else {
          this.commonMethod.errorMessage(data);
        }
      });
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
        console.log("img.src", img.src);
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
              me.announcementEditForm.get("smallImage").setValue(file);
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
              me.announcementEditForm.get("bigImage").setValue(file);
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

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    this.isBigImgError = false;
    this.isSmallImgError = false;
    this.isValidSmallFileFormat = false;
    this.isValidBigFileFormat = false;
    if (this.announcementEditForm.get("bigImage").value == "") {
      this.isBigImgError = true;
    }
    if (this.announcementEditForm.get("smallImage").value == "") {
      this.isSmallImgError = true;
    }
    if (this.announcementEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.annoucementEditFields.smallImage = formdata.smallImage;
      this.annoucementEditFields.bigImage = formdata.bigImage;
      this.annoucementEditFields.announcementHeaderName =
        formdata.announcementHeaderName;
      this.annoucementEditFields.productType = formdata.productType;
      this.annoucementEditFields.webLink = formdata.webLink;
      this.annoucementEditFields.lat = formdata.lat;
      this.annoucementEditFields.lon = formdata.lon;
      this.annoucementEditFields.fromDate = formdata.fromDate;
      this.annoucementEditFields.toDate = formdata.toDate;
      this.annoucementEditFields.caption = formdata.caption;
      this.annoucementEditFields.status = formdata.status;
      this.annoucementEditFields.seqNo = formdata.seqNo;
      this.annoucementEditFields.announcementType = formdata.announcementType;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.announcementEditForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.announcementEditForm.patchValue({
      smallImage: this.annoucementEditFields.smallImage,
      bigImage: this.annoucementEditFields.bigImage,
      announcementHeaderName: this.annoucementEditFields.announcementHeaderName,
      productType: this.annoucementEditFields.productType,
      webLink: this.annoucementEditFields.webLink,
      lat: this.annoucementEditFields.lat,
      lon: this.annoucementEditFields.lon,
      fromDate: this.annoucementEditFields.fromDate,
      toDate: this.annoucementEditFields.toDate,
      caption: this.annoucementEditFields.caption,
      status: this.annoucementEditFields.status,
      seqNo: this.annoucementEditFields.seqNo,
      announcementType: this.annoucementEditFields.announcementType,
    });
    closeTinyModel();
  }

  updateCustomerOfferWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.announcementEditService.updateAnnouncementWithRemarkCall(
        this.annoucementEditFields,
        this.images,
        this.userDtls,
        this.announcementDetail.id,
        this.remarkForm.value
      );
      this.updateAnnouncementDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  updateAnnouncement() {
    console.log("updateSurveyDetails");
    this.isBigImgError = false;
    this.isSmallImgError = false;
    this.isValidSmallFileFormat = false;
    this.isValidBigFileFormat = false;
    if (this.announcementEditForm.get("bigImage").value == "") {
      this.isBigImgError = true;
    }
    if (this.announcementEditForm.get("smallImage").value == "") {
      this.isSmallImgError = true;
    }
    this.formValidation.markFormGroupTouched(this.announcementEditForm);
    if (this.announcementEditForm.valid) {
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

      var param = this.announcementEditService.updateAnnouncementCall(
        this.announcementEditForm.value,
        this.images,
        this.userDtls,
        this.announcementDetail.id
      );
      this.updateAnnouncementDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.announcementEditForm,
        this.formErrors,
        false
      );
    }
  }

  cancel() {
    if (
      this.commonServiceCall.makerRequestEditUrl == "/corporateAnnouncement"
    ) {
      this.router.navigateByUrl("/corporateAnnouncement");
    } else if (
      this.commonServiceCall.makerRequestEditUrl == "/corpMakerRequests"
    ) {
      this.router.navigateByUrl("/corpMakerRequests");
    } else {
      this.router.navigateByUrl("/corporateAnnouncement");
    }
  }

  updateAnnouncementDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstant.updateAnnouncementsDetails, param)
      .subscribe((data) => {
        console.log(data);
        var res = data.resp;
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.updateAnnouncementsDetails +
            "\n" +
            "Params=" +
            JSON.stringify(param) +
            "\n" +
            "Before Update Params=" +
            JSON.stringify(this.beforeParam),
            "update"
          );
          showToastMessage(res.responseMessage);
          this.commonMethod.hideLoader();
          this.cancel();
        } else {
          if (this.commonData.roleType == "Corporate Maker") {
            this.announcementEditForm.patchValue({
              smallImage: this.annoucementEditFields.smallImage,
              bigImage: this.annoucementEditFields.bigImage,
              announcementHeaderName: this.annoucementEditFields
                .announcementHeaderName,
              productType: this.annoucementEditFields.productType,
              webLink: this.annoucementEditFields.webLink,
              lat: this.annoucementEditFields.lat,
              lon: this.annoucementEditFields.lon,
              fromDate: this.annoucementEditFields.fromDate,
              toDate: this.annoucementEditFields.toDate,
              caption: this.annoucementEditFields.caption,
              status: this.annoucementEditFields.status,
              seqNo: this.annoucementEditFields.seqNo,
              announcementType: this.annoucementEditFields.announcementType,
            });
          }
          closeTinyModel();
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.updateSurveMasterDetails, res);
        }
      });
  }
}
