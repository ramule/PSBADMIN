import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { CorporateCompanyAddService } from "./corporate-company-add.service";
import { DatePipe } from "@angular/common";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-corporate-company-add",
  templateUrl: "./corporate-company-add.component.html",
  styleUrls: ["./corporate-company-add.component.css"],
})
export class CorporateCompanyAddComponent implements OnInit {
  status: any = [];
  isLogoImgError: boolean = false;
  isValidLogoFileFormat: boolean = false;
  isValidLogoSizeFileFormat: boolean = false;
  logoImage: any;
  userDtls: any;
  todayDate: any;
  images = {
    logoImage: "",
  };
  corporateCompanyAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    companyName: "",
    companyCode: "",
    CompanyInfo: "",
    establishmentOn: "",
    shortName: "",
    cif: "",
    approval: "",
    status,
    remark: "",
  };

  corpCompanyFields = {
    companyName: "",
    companyCode: "",
    CompanyInfo: "",
    establishmentOn: "",
    shortName: "",
    cif: "",
    approval: "",
    logoImage: "",
    status,
  };

  fileRespWithRemark;
  roleId: any;
  selModel: any;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe,
    private corporateCompanyAddService: CorporateCompanyAddService
  ) {}

  public buildForm() {
    this.corporateCompanyAddForm = this.form.group({
      companyName: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/),
      ]),
      companyCode: new FormControl("", [Validators.required]),
      CompanyInfo: new FormControl("", [Validators.required]),
      establishmentOn: new FormControl("", [Validators.required]),
      shortName: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/),
      ]),
      cif: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(11),
      ]),
      logoImage: new FormControl(""),
      status: new FormControl("", [Validators.required]),
      approval: new FormControl("", [Validators.required]),
    });
    this.corporateCompanyAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.corporateCompanyAddForm,
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
    this.buildForm();
    this.getStatus();
    this.commonMethod.hideLoader();
    this.commonServiceCall.pageName = "Add Corporate Company";
    this.roleId = this.commonDataShareService.roleId;
    this.todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.userDtls = JSON.parse(this.commonServiceCall.userCredential);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corporateCompanyAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  cancel() {
    this.router.navigateByUrl("/corporateCompany");
  }

  //on load functions
  getStatus() {
    this.commonServiceCall
    .getResponsePromise(this.appConstants.masterStatusUrl)
    .subscribe((data) => {
      var res = data;
      if (res.status) {
        console.log("response data: ", res);
        this.status = res.resp;
        console.log("response array: ", this.status);
        this.corporateCompanyAddForm.patchValue({
          status: 3,
        });
      } else {
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  filterStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  addImage(event: any) {
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
        this.isValidLogoFileFormat = true;
        this.isValidLogoSizeFileFormat = false;
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
          if (width > 380 || height > 180) {
            me.isValidLogoSizeFileFormat = true;
            me.isValidLogoFileFormat = false;
          } else {
            me.logoImage = e.target.result;
            me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
              me.images.logoImage = base64;
            });
            me.corporateCompanyAddForm.get("logoImage").setValue(file);
            me.isLogoImgError = false;
            me.isValidLogoSizeFileFormat = false;
            me.isValidLogoFileFormat = false;
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  addCorporateCompany() {
    this.isLogoImgError = false;
    this.isValidLogoFileFormat = false;
    if (this.corporateCompanyAddForm.get("logoImage").value == "") {
      this.isLogoImgError = true;
    }
    this.formValidation.markFormGroupTouched(this.corporateCompanyAddForm);
    if (this.corporateCompanyAddForm.valid) {
      if (this.isLogoImgError == true) {
        return;
      }
      if (this.isValidLogoSizeFileFormat == true) {
        return;
      }

      var param = this.corporateCompanyAddService.addCorporateCompanyDetailsCall(
        this.corporateCompanyAddForm.value,
        this.images,
        this.userDtls
      );
      this.saveCorporateCompanyDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.corporateCompanyAddForm,
        this.formErrors,
        false
      );
    }
  }

  saveCorporateCompanyDetails(params) {
    this.commonMethod.showLoader();
    console.log("saving parameters: ", params);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.addCorpCompanyDetailsUrl, params)
      .subscribe((data) => {
        var res = data.resp;
        console.log(data);
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          showToastMessage(res.responseMessage);
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.addCorpCompanyDetailsUrl +
              "\n" +
              "Params=" +
              JSON.stringify(params),
            "add"
          );
          this.cancel();
        } else {
          if (
            this.commonDataShareService.roleType ==
            this.commonDataShareService.corpMakerRole
          ) {
            this.corporateCompanyAddForm.patchValue({
              companyName: this.corpCompanyFields.companyName,
              companyCode: this.corpCompanyFields.companyCode,
              CompanyInfo: this.corpCompanyFields.CompanyInfo,
              establishmentOn: this.corpCompanyFields.establishmentOn,
              shortName: this.corpCompanyFields.shortName,
              cif: this.corpCompanyFields.cif,
              // makerLimit: this.corpCompanyFields.makerLimit,
              // checkerLimit: this.corpCompanyFields.checkerLimit,
              approval: this.corpCompanyFields.approval,
              logoImage: this.corpCompanyFields.logoImage,
              status: this.corpCompanyFields.status,
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.addCorpCompanyDetailsUrl, res);
        }
      });
  }

  /* This function calls when an error occurs */
  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    this.isLogoImgError = false;
    this.isValidLogoFileFormat = false;
    this.formValidation.markFormGroupTouched(this.corporateCompanyAddForm);
    if (this.corporateCompanyAddForm.get("logoImage").value == "") {
      this.isLogoImgError = true;
    }
    if (
      this.corporateCompanyAddForm.valid &&
      this.isLogoImgError == false &&
      this.isValidLogoSizeFileFormat == false
    ) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();

      (this.corpCompanyFields.companyName = formdata.companyName),
        (this.corpCompanyFields.companyCode = formdata.companyCode),
        (this.corpCompanyFields.CompanyInfo = formdata.CompanyInfo),
        (this.corpCompanyFields.establishmentOn = formdata.establishmentOn),
        (this.corpCompanyFields.shortName = formdata.shortName),
        (this.corpCompanyFields.cif = formdata.cif),
        (this.corpCompanyFields.logoImage = formdata.logoImage),
        (this.corpCompanyFields.status = formdata.status);
      this.corpCompanyFields.approval = formdata.approval;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.corporateCompanyAddForm,
        this.formErrors,
        false
      );
    }
  }

  addCompanyWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corporateCompanyAddService.addCorporateCompanyDetailsCallWithRemark(
        this.corpCompanyFields,
        this.images,
        this.userDtls,
        formData
      );
      this.saveCorporateCompanyDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.corporateCompanyAddForm.patchValue({
      companyName: this.corpCompanyFields.companyName,
      companyCode: this.corpCompanyFields.companyCode,
      CompanyInfo: this.corpCompanyFields.CompanyInfo,
      establishmentOn: this.corpCompanyFields.establishmentOn,
      shortName: this.corpCompanyFields.shortName,
      cif: this.corpCompanyFields.cif,
      logoImage: this.corpCompanyFields.logoImage,
      status: this.corpCompanyFields.status,
      approval: this.corpCompanyFields.approval,
    });
    closeTinyModel();
  }
}
