import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { InsuranceCategoryAddService } from './insurance-category-add.service';

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-insurance-category-add',
  templateUrl: './insurance-category-add.component.html',
  styleUrls: ['./insurance-category-add.component.css']
})
export class InsuranceCategoryAddComponent implements OnInit {
  masterCategoryAddForm: FormGroup;
  remarkForm: FormGroup;

  country: any = [];
  states: any = [];
  status: any = [];
  selModel: any;
  selectedStateId: any;
  selectedCountryId: any;

  formErrors = {
    categoryName: "",
    remark: "",
  };

  masterCityAddFields = {
    categoryName: "",
  };

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public masterCategoryAddService: InsuranceCategoryAddService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Category";
    this.buildForm();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterCategoryAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.masterCategoryAddForm = this.form.group({
      categoryName: new FormControl("", [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
    });

    this.masterCategoryAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterCategoryAddForm,
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


  openActionModel(action, formdata) {
    if (this.masterCategoryAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterCityAddFields.categoryName = formdata.categoryName;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCategoryAddForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionModel() {
    this.masterCategoryAddForm.patchValue({
      categoryName: this.masterCityAddFields.categoryName,
    });
    closeTinyModel();
  }

  addCategoryMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.masterCategoryAddService.addCategoryWithRemarkCall(
        this.masterCityAddFields,
        this.remarkForm.value
      );
      this.addCategory(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  addCategoryMaster() {
    this.formValidation.markFormGroupTouched(this.masterCategoryAddForm);
    if (this.masterCategoryAddForm.valid) {
      var param = this.masterCategoryAddService.addCategoryCall(
        this.masterCategoryAddForm.value
      );
      this.addCategory(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCategoryAddForm,
        this.formErrors,
        false
      );
    }
  }

  addCategory(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.addCompCategoryMasterData, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add invProduct response: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.addCompCategoryMasterData +
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
            this.masterCategoryAddForm.patchValue({
              categoryName: this.masterCityAddFields.categoryName,
            });
          }
          this.errorCallBack(this.appConstants.addCompCategoryMasterData, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  cancel() {
    this.router.navigateByUrl("/insuranceCategory");
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
