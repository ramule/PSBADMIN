import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { InsuranceCompanyAddService } from './insurance-company-add.service';


declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-insurance-company-add',
  templateUrl: './insurance-company-add.component.html',
  styleUrls: ['./insurance-company-add.component.css']
})
export class InsuranceCompanyAddComponent implements OnInit {
  masterCompanyAddForm: FormGroup;
  remarkForm: FormGroup;

  country: any = [];
  states: any = [];
  status: any = [];
  selModel: any;
  selectedStateId: any;
  selectedCountryId: any;

  formErrors = {
    companyName: "",
    info: "",
    logo:"",
    categoryId:'',
    remark: "",
  };

  masterCompanyAddFields = {
    companyName: "",
    info: "",
    logo:"",
    categoryId:''
  };

  images = {
    logo:''
  }
  logo:any
  isCompanyImgError:boolean = false
  isValidCompanyFileFormat:boolean  = false;
  isValidCompanySizeFileFormat:boolean  = false;
  categoryMaster:any=[]
  categoryData:any
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public masterCompanyAddService: InsuranceCompanyAddService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Company";
    this.getCategoryMasterDetails()
    this.buildForm();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterCompanyAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.masterCompanyAddForm = this.form.group({
      companyName: new FormControl("", [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      info: new FormControl("", [Validators.required]),
      logo: new FormControl("", [Validators.required]),
      categoryId: new FormControl("", [Validators.required]),
    });

    this.masterCompanyAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterCompanyAddForm,
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

  getCategoryMasterDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAllCategoriesMaster)
      .subscribe((data) => {
        var res = data.resp;
        console.log("get state master data: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.getAllCategoriesMaster +
              "\n" +
              "Params={}",
            "view"
          );
          console.log(res);
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.categoryMaster = res.result;
          console.log("Category Master array: ", this.categoryMaster);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getAllCategoriesMaster, res);
        }
        this.commonMethod.hideLoader();
      });
  }


  openActionModel(action, formdata) {
    if(this.masterCompanyAddForm.get('logo').value == ""){ this.isCompanyImgError = true; }
    if (this.masterCompanyAddForm.valid) {

      if(this.isCompanyImgError == true) { return; }
      if(this.isValidCompanySizeFileFormat == true) { return; }

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterCompanyAddFields.companyName = formdata.companyName;
      this.masterCompanyAddFields.categoryId = formdata.categoryId;
      this.masterCompanyAddFields.logo = formdata.logo
      this.masterCompanyAddFields.info = formdata.info
      this.images.logo = this.logo

    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCompanyAddForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionModel() {
    this.masterCompanyAddForm.patchValue({
      companyName: this.masterCompanyAddFields.companyName,
      categoryId: this.masterCompanyAddFields.categoryId,
      info:this.masterCompanyAddFields.info,
    });
    this.masterCompanyAddForm.get('logo').setValue(this.masterCompanyAddFields.logo)
    this.logo = this.images.logo
    closeTinyModel();
  }

  addCompanyMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.masterCompanyAddService.addCompanyWithRemarkCall(
        this.masterCompanyAddFields,this.categoryData,this.images,
        this.remarkForm.value
      );
      this.addCompany(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  addCompanyMaster() {
    this.isCompanyImgError = false;
    this.isValidCompanyFileFormat = false;
    if(this.masterCompanyAddForm.get('logo').value == ""){ this.isCompanyImgError = true; }
    this.formValidation.markFormGroupTouched(this.masterCompanyAddForm);
    if (this.masterCompanyAddForm.valid) {

      if(this.isCompanyImgError == true) { return; }
      if(this.isValidCompanySizeFileFormat == true) { return; }

      var param = this.masterCompanyAddService.addCompanyCall(
        this.masterCompanyAddForm.value,this.categoryData,this.images
      );
      this.addCompany(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCompanyAddForm,
        this.formErrors,
        false
      );
    }
  }

  addCompany(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.addComapnyMasterData, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add invProduct response: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.addComapnyMasterData +
              "\n" +
              "Params=" +
              JSON.stringify(param),
            "add"
          );
          console.log(res);
          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          if (
            this.commonDataShareService.roleType ==
            this.commonDataShareService.makerRole
          ) {
            this.masterCompanyAddForm.patchValue({
              companyName: this.masterCompanyAddFields.companyName,
              categoryId: this.masterCompanyAddFields.categoryId,
            });
          }
          this.errorCallBack(this.appConstants.addComapnyMasterData, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  cancel() {
    this.router.navigateByUrl("/insuranceCompany");
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  addImage(event: any) {
    console.log("inside");
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png") {

      }
      else {
          this.isValidCompanyFileFormat = true;
          this.isValidCompanySizeFileFormat = false;
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
              me.isValidCompanySizeFileFormat = true;
              me.isValidCompanyFileFormat = false;
            }
            else {
              me.logo = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.logo = base64;
              });
              me.masterCompanyAddForm.get('logo').setValue(file);
              me.isCompanyImgError = false;
              me.isValidCompanySizeFileFormat = false;
              me.isValidCompanyFileFormat = false;
            }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  onCategoryChange(event)
  {
    this.categoryData=""
    var data:any
    var id = event.target.value
    var masterData = this.categoryMaster
    var data = masterData.filter(x => x.id == id);
    this.categoryData = data

  }



}
