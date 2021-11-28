import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe, Location } from '@angular/common';
import { CorporateCompanyEditService } from './corporate-company-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-company-edit',
  templateUrl: './corporate-company-edit.component.html',
  styleUrls: ['./corporate-company-edit.component.css']
})
export class CorporateCompanyEditComponent implements OnInit {

  status: any = [];
  isLogoImgError: boolean = false;
  isValidLogoFileFormat: boolean = false;
  isValidLogoSizeFileFormat: boolean = false;
  logoImage: any;
  corporateCompanyEditForm: FormGroup;
  remarkForm: FormGroup
  corpCompanyDtl: any;
  userDtls: any;
  formErrors = {
    companyName: '',
    companyCode: '',
    CompanyInfo: '',
    establishmentOn: '',
    shortName: '',
    cif: '',
    approval: '',
    status: '',
    remark: ''
  };
  todayDate: any;
  images = {
    logoImage: '',
  };
  logoImgDefault: any;

  roleId: any;
  selModel: any;

  corpCompanyFields = {
    logoImage: '',
    companyName: '',
    companyCode: '',
    CompanyInfo: '',
    shortName: '',
    cif: '',
    approval: '',
    status: '',
    establishmentOn: '',
  }

  remarkHistoryArr: any = []
  beforeParams: any

  fileRespWithRemark
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe,
    private location: Location,
    private corpCompanyEditService: CorporateCompanyEditService
  ) { }

  public buildForm() {
    this.corporateCompanyEditForm = this.form.group({
      companyName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      companyCode: new FormControl('', [Validators.required]),
      CompanyInfo: new FormControl('', [Validators.required]),
      establishmentOn: new FormControl('', [Validators.required]),
      shortName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      cif: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(11)]),
      logoImage: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      approval: new FormControl('', [Validators.required]),
    });
    this.corporateCompanyEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateCompanyEditForm, this.formErrors, true)
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

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/corporateCompany');
      return;
    }

    this.buildForm();
    this.corpCompanyDtl = this.location.getState();
    this.roleId = this.commonDataShareService.roleId;
    console.log(this.corpCompanyDtl);
    this.commonServiceCall.pageName = "Edit Corporate Company";
    this.getStatus();
    this.getAnnouncementDetailsById(this.corpCompanyDtl.id);
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.userDtls = JSON.parse(this.commonServiceCall.userCredential);
    console.log(this.userDtls);
    this.getRemarkHistoryData(this.corpCompanyDtl.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpCompanyEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/" + this.commonDataShareService.submenuId).subscribe((data) => {
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

  filterStatus() {
    return this.status.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.status = res.resp;
        console.log('response array: ', this.status);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }


  addImage(event: any) {
    console.log("inside");
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png") {
        this.commonMethod.getBase64FromFile(file);
      }
      else {
        this.isValidLogoFileFormat = true;
        this.isValidLogoSizeFileFormat = false
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
          if (width > 380 || height > 180) {
            me.isValidLogoSizeFileFormat = true;
            me.isValidLogoFileFormat = false;
          }
          else {
            me.logoImage = e.target.result;
            me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
              me.images.logoImage = base64;
            });
            me.corporateCompanyEditForm.get('logoImage').setValue(file);
            me.isLogoImgError = false;
            me.isValidLogoSizeFileFormat = false;
            me.isValidLogoFileFormat = false;
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  getAnnouncementDetailsById(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompanyDetailByIdsUrl + id).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        var result = res.result[0];
        this.beforeParams = res.result[0];

        this.logoImage = 'data:image/jpg;base64,' + result.logoImage;
        this.images.logoImage = 'data:image/jpg;base64,' + result.logoImage;

        this.logoImgDefault = result.logoImage;
        console.log(this.logoImage);
        if (result.userAction != null) {
          this.corporateCompanyEditForm.patchValue({
            logoImage: this.logoImage,
            companyName: result.companyName,
            companyCode: result.companyCode,
            CompanyInfo: result.companyInfo,
            shortName: result.shortName,
            cif: result.cif,
            approval: result.approvalLevel,
            // makerLimit: result.makerLimit,
            // checkerLimit: result.checkerLimit,
            status: result.userAction,
            establishmentOn: result.establishmentOn != null ? this.datePipe.transform(result.establishmentOn, 'yyyy-MM-dd') : '-',
          });
        }
        else {
          this.corporateCompanyEditForm.patchValue({
            logoImage: this.logoImage,
            companyName: result.companyName,
            companyCode: result.companyCode,
            CompanyInfo: result.companyInfo,
            shortName: result.shortName,
            cif: result.cif,
            // makerLimit: result.makerLimit,
            // checkerLimit: result.checkerLimit,
            approval: result.approvalLevel,
            status: result.statusId,
            establishmentOn: result.establishmentOn != null ? this.datePipe.transform(result.establishmentOn, 'yyyy-MM-dd') : '-',
          });
        }
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpCompanyDetailByIdsUrl, res);
      }
    });
  }

  EditCorporateCompany() {
    console.log("updateSurveyDetails");
    this.isLogoImgError = false;
    this.isValidLogoFileFormat = false;
    if (this.corporateCompanyEditForm.get('logoImage').value == "") { this.isLogoImgError = true; }
    this.formValidation.markFormGroupTouched(this.corporateCompanyEditForm);
    if (this.corporateCompanyEditForm.valid) {
      if (this.isLogoImgError == true) { return; }
      if (this.isValidLogoSizeFileFormat == true) { return; }

      var param = this.corpCompanyEditService.updateCorpDetailsCall(this.corporateCompanyEditForm.value, this.images, this.userDtls, this.corpCompanyDtl.id, this.beforeParams);
        this.updateCorporateDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateCompanyEditForm, this.formErrors, false)
    }

  }

  updateCorporateDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCorpCompanyDetailsUrl, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCorpCompanyDetailsUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        this.cancel()
      } else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
          this.corporateCompanyEditForm.patchValue({
            logoImage: this.corpCompanyFields.logoImage,
            companyName: this.corpCompanyFields.companyName,
            companyCode: this.corpCompanyFields.companyCode,
            CompanyInfo: this.corpCompanyFields.CompanyInfo,
            shortName: this.corpCompanyFields.shortName,
            cif: this.corpCompanyFields.cif,
            approval: this.corpCompanyFields.approval,
            status: this.corpCompanyFields.status,
            establishmentOn: this.corpCompanyFields.establishmentOn,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateSurveMasterDetails, res);
      }

    })
  }

  /*
  dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  */


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == '/corporateCompany') {
      this.router.navigateByUrl("/corporateCompany");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests') {
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/corporateCompany");
    }
  }

  openActionModel(action, formdata) {
    this.isLogoImgError = false;
    this.isValidLogoFileFormat = false;
    if (this.corporateCompanyEditForm.get('logoImage').value == "") { this.isLogoImgError = true; }
    if (this.corporateCompanyEditForm.valid && this.isLogoImgError == false && this.isValidLogoSizeFileFormat == false) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.corpCompanyFields.logoImage = formdata.logoImage;
      this.corpCompanyFields.companyName = formdata.companyName;
      this.corpCompanyFields.companyCode = formdata.companyCode;
      this.corpCompanyFields.CompanyInfo = formdata.CompanyInfo;
      this.corpCompanyFields.shortName = formdata.shortName
      this.corpCompanyFields.cif = formdata.cif;
      this.corpCompanyFields.approval = formdata.approval;
      this.corpCompanyFields.status = formdata.status;
      this.corpCompanyFields.establishmentOn = formdata.establishmentOn

    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateCompanyEditForm, this.formErrors, false)
    }
  }

  updateCorpCompanyWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corpCompanyEditService.updateCorpDetailsCallWithRemark(this.corpCompanyFields, this.images, this.userDtls, this.corpCompanyDtl.id, this.beforeParams, formdata);
      this.updateCorporateDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.corporateCompanyEditForm.patchValue({
      logoImage: this.corpCompanyFields.logoImage,
      companyName: this.corpCompanyFields.companyName,
      companyCode: this.corpCompanyFields.companyCode,
      CompanyInfo: this.corpCompanyFields.CompanyInfo,
      shortName: this.corpCompanyFields.shortName,
      cif: this.corpCompanyFields.cif,
      approval: this.corpCompanyFields.approval,
      status: this.corpCompanyFields.status,
      establishmentOn: this.corpCompanyFields.establishmentOn,
    });
    closeTinyModel();
  }

}
