import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CorpDesignationLevelMappingAddService } from './corp-designation-level-mapping-add.service';
import { Location } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corp-designation-level-mapping-add',
  templateUrl: './corp-designation-level-mapping-add.component.html',
  styleUrls: ['./corp-designation-level-mapping-add.component.css']
})
export class CorpDesignationLevelMappingAddComponent implements OnInit {

  dropdownSettings :IDropdownSettings;
  corpDesignationLevelMappingAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    companyName: '',
    designationName: '',
    designationCode: '',
    hierarchyLevel: '',
    remark: '',
    corpRoles: ''
  }

  corporateDonationFields = {
    companyName: '',
    designationName: '',
    designationCode: '',
    hierarchyLevel: '',
    corpRoles: ''
  }

  //feild parameter
  masterDonation: any = [];
  corporateUserType: any = [];
  corpCompanyLevelsArr: any = [];
  priviledgeDataArr: any = [];
  status = [];
  companyArr: any = [];
  selectedItems: any = [];
  tempRolesArr: any = [];
  p: number = 1;
  corpCompanyId: any;
  selModel: any;
  roleId: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private corpDesignationLevelMappingAddService: CorpDesignationLevelMappingAddService,
    public location: Location
  ) { }

  public buildForm() {
    this.corpDesignationLevelMappingAddForm = this.form.group({
      companyName: new FormControl('', [Validators.required]),
      designationName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      designationCode: new FormControl('', [Validators.required]),
      hierarchyLevel: new FormControl('', [Validators.required]),
      corpRoles: new FormControl('', [Validators.required]),
    });
    this.corpDesignationLevelMappingAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corpDesignationLevelMappingAddForm, this.formErrors, true)
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
  ngOnInit() {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Designation Level Mapping Add";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getCorpCompanies();
    this.getAllCorpCompanyLevels();
    this.getAllCorpUserTypeDetails();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'user_TYPE',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    //         var param = this.mastreDonationService.addAuditTrailAdaptorParams(URL,operation);
    //         console.log(param)
    //         this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    //         })
  }

  //on load functions
  getAllCorpUserTypeDetails(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpUserTypesUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.corporateUserType = res.result;
        console.log('Corp User Types array: ', this.corporateUserType);
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getCorpUserTypesUrl+"\n"+"Params={}",'view')
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpUserTypesUrl, res);
      }
    });
  }

  filterCorpUserType() {
    return this.corporateUserType.filter(x => x.statusname == 'ACTIVE');
  }

  onItemSelect(item: any) {
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getCorpCompanies() {
    this.commonMethod.showLoader();
    this.companyArr = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.companyArr = res.result;
        this.companyArr.filter(f => f.status == 3)
      } else {
        this.errorCallBack(this.appConstants.getCorpCompanyDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  getAllCorpCompanyLevels() {
    this.commonMethod.showLoader();
    this.companyArr = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCorpLevelsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.corpCompanyLevelsArr = res.result;
      } else {
        this.errorCallBack(this.appConstants.getAllCorpLevelsUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  filterCorpCompanyLevels() {
    return this.corpCompanyLevelsArr.filter(f => f.id <= 3);
  }

  onCompanyChange(event) {
    console.log(event);
    this.corpCompanyId = event.target.value;
  }

  addCorpDesignationLevelMapping() {
    this.formValidation.markFormGroupTouched(this.corpDesignationLevelMappingAddForm);
    if (this.corpDesignationLevelMappingAddForm.valid) {
      var formData = this.corpDesignationLevelMappingAddForm.value;
      var param = this.corpDesignationLevelMappingAddService.addCorpDesignationLevelMappingCall(formData);
      this.addCorpDesignationLevel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.corpDesignationLevelMappingAddForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl('/corpdDesignationLevelMapping');
  }

  addCorpDesignationLevel(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addDesignationHierarchyUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        //    this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveDonationDetailsUrl+"\n"+"Params="+JSON.stringify(param),'add')

        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.cancel();
        showToastMessage(res.responseMessage);
      }
      else {
        if (this.commonData.roleType == this.commonData.corpMakerRole) {
          this.corpDesignationLevelMappingAddForm.patchValue({
            companyName: this.corporateDonationFields.companyName,
            designationCode: this.corporateDonationFields.designationCode,
            designationName: this.corporateDonationFields.designationName,
            hierarchyLevel: this.corporateDonationFields.hierarchyLevel,
            corpRoles: this.corporateDonationFields.corpRoles,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addDesignationHierarchyUrl, res);
      }
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    if (this.corpDesignationLevelMappingAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();

      this.tempRolesArr = [];

      formdata.corpRoles.forEach(element => {
        var data = {
          id: element.id,
          user_TYPE: element.user_TYPE
        }
        this.tempRolesArr.push(data);
      });

      console.log('temp docType Array: ', this.tempRolesArr);

      this.selectedItems = this.tempRolesArr;

      console.log('selected items: ', this.selectedItems);

      this.corporateDonationFields.companyName = formdata.companyName;
      this.corporateDonationFields.corpRoles = formdata.corpRoles;
      this.corporateDonationFields.designationCode = formdata.designationCode;
      this.corporateDonationFields.designationName = formdata.designationName;
      this.corporateDonationFields.hierarchyLevel = formdata.hierarchyLevel;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corpDesignationLevelMappingAddForm, this.formErrors, false)
    }
  }

  addCorpDesignationLevelWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corpDesignationLevelMappingAddService.addCorpDesignationLevelMappingWithRemarkCall(this.corporateDonationFields, formData, this.tempRolesArr);
      this.addCorpDesignationLevel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.selectedItems = this.tempRolesArr;
    this.corpDesignationLevelMappingAddForm.patchValue({
      companyName: this.corporateDonationFields.companyName,
      designationCode: this.corporateDonationFields.designationCode,
      designationName: this.corporateDonationFields.designationName,
      hierarchyLevel: this.corporateDonationFields.hierarchyLevel,
      corpRoles: this.corporateDonationFields.corpRoles,
    });
    closeTinyModel();
  }

}
