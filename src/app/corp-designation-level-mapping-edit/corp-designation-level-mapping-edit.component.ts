import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CorpDesignationLevelMappingEditService } from './corp-designation-level-mapping-edit.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corp-designation-level-mapping-edit',
  templateUrl: './corp-designation-level-mapping-edit.component.html',
  styleUrls: ['./corp-designation-level-mapping-edit.component.css']
})
export class CorpDesignationLevelMappingEditComponent implements OnInit {

  dropdownSettings :IDropdownSettings;
  corpDesignationLevelMappinEditForm: FormGroup;
  remarkForm: FormGroup;
  selModel: any;
  roleId: any;
  corpCompanyId: any;
  designationDetils: any;
  selCorpDesLevelMapping: any = [];
  corpRoleNamesArr: any = [];
  corporateUserType: any = [];
  companyArr: any = [];
  remarkHistoryArr: any = [];
  selectedItems: any = [];
  tempRolesArr: any = [];
  status = [];
  formErrors = {
    companyName: '',
    designationName: '',
    designationCode: '',
    hierarchyLevel: '',
    status: '',
    remark: '',
    corpRoles: ''
  }

  corporateDonationFields = {
    companyName: '',
    designationName: '',
    designationCode: '',
    hierarchyLevel: '',
    status: '',
    corpRoles: ''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private corpDesignationLevelMappingEditService: CorpDesignationLevelMappingEditService,
    public location: Location
  ) { }

  public buildForm() {
    this.corpDesignationLevelMappinEditForm = this.form.group({
      companyName: new FormControl('', [Validators.required]),
      designationName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      designationCode: new FormControl('', [Validators.required]),
      hierarchyLevel: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      corpRoles: new FormControl('', [Validators.required]),
    });
    this.corpDesignationLevelMappinEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corpDesignationLevelMappinEditForm, this.formErrors, true)
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

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/corpdDesignationLevelMapping');
      return;
    }

    this.commonServiceCall.pageName = "Designation Level Mapping Edit";
    this.roleId = this.commonData.roleId;
    this.designationDetils = this.location.getState();
    console.log(this.designationDetils);
    this.getAllCorpUserTypeDetails();
    this.getDesignationLevelById(this.designationDetils.id);
    this.getRemarkHistoryData(this.designationDetils.id);
    this.buildForm();
    this.getStatus();
    this.getCorpCompanies();

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

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        var res = data;
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.status = res.resp;
          console.log("response array: ", this.status);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  filterStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
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
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  getDesignationLevelById(id) {
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getDesignationHierarchyByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe((data) => {
      var res = data.resp;
      console.log('result: ', res);
      this.selCorpDesLevelMapping = res.result[0];
      if (res.responseCode == "200") {
        if (res.result[0].userAction != null) {
          this.corpDesignationLevelMappinEditForm.patchValue({
            companyName: res.result[0].companyId,
            designationName: res.result[0].designationName,
            designationCode: res.result[0].designationCode,
            hierarchyLevel: res.result[0].hierarchyLevel,
            status: res.result[0].userAction,
          });
        }
        else {
          this.corpDesignationLevelMappinEditForm.patchValue({
            companyName: res.result[0].companyId,
            designationName: res.result[0].designationName,
            designationCode: res.result[0].designationCode,
            hierarchyLevel: res.result[0].hierarchyLevel,
            status: res.result[0].statusId,
          });
        };

        var corpRolesMainArray = [];
        this.corpRoleNamesArr = res.result[0].authType.split(',');

        // corp roles dropdown values call
        // this.getAllCorpUserTypeDetails();

        for(var i = 0; i < this.corpRoleNamesArr.length; i++) {
          var objIndex = this.corporateUserType.findIndex((obj) => obj.user_TYPE.toLowerCase() == this.corpRoleNamesArr[i].toLowerCase());
          console.log('objIndex value: ', objIndex);
          var objId = this.corporateUserType[objIndex].id;
          var objCorpRoleName = this.corporateUserType[objIndex].user_TYPE;
          var data: any = {
            user_TYPE: objCorpRoleName,
            id: objId
          }
          corpRolesMainArray.push(data);
        }

        this.selectedItems = corpRolesMainArray;
        console.log(corpRolesMainArray);

      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getDesignationHierarchyByIdUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onCompanyChange(event) {
    console.log(event);
    this.corpCompanyId = event.target.value;
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == '/corpdDesignationLevelMapping') {
      this.router.navigateByUrl("/corpdDesignationLevelMapping");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests') {
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/corpdDesignationLevelMapping");
    }
  }

  closeActionMoel() {
    this.selectedItems = this.tempRolesArr;
    this.corpDesignationLevelMappinEditForm.patchValue({
      companyName: this.corporateDonationFields.companyName,
      designationCode: this.corporateDonationFields.designationCode,
      designationName: this.corporateDonationFields.designationName,
      hierarchyLevel: this.corporateDonationFields.hierarchyLevel,
      status: this.corporateDonationFields.status,
      corpRoles: this.corporateDonationFields.corpRoles,
    });
    closeTinyModel();
  }

  openActionModel(action, formdata) {
    if (this.corpDesignationLevelMappinEditForm.valid) {
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
      this.corporateDonationFields.designationCode = formdata.designationCode;
      this.corporateDonationFields.designationName = formdata.designationName;
      this.corporateDonationFields.hierarchyLevel = formdata.hierarchyLevel;
      this.corporateDonationFields.status = formdata.status;
      this.corporateDonationFields.corpRoles = formdata.corpRoles;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corpDesignationLevelMappinEditForm, this.formErrors, false)
    }
  }

  updateCorpDesignationLevelMapping() {
    this.formValidation.markFormGroupTouched(this.corpDesignationLevelMappinEditForm);
    if (this.corpDesignationLevelMappinEditForm.valid) {
      var formData = this.corpDesignationLevelMappinEditForm.value;
      var param = this.corpDesignationLevelMappingEditService.updateCorpDesignationLevelMappingCall(this.designationDetils.id, formData, this.selCorpDesLevelMapping);
      this.updateCorpDesignationLevel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.corpDesignationLevelMappinEditForm, this.formErrors, false)
    }
  }

  updateCorpDesignationLevelWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corpDesignationLevelMappingEditService.updateCorpDesignationLevelMappingWithRemarkCall(this.designationDetils.id, this.corporateDonationFields, this.selCorpDesLevelMapping, formData, this.tempRolesArr);
      this.updateCorpDesignationLevel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  updateCorpDesignationLevel(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateDesignationHierarchyUrl, param).subscribe(data => {
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
          this.corpDesignationLevelMappinEditForm.patchValue({
            companyName: this.corporateDonationFields.companyName,
            designationCode: this.corporateDonationFields.designationCode,
            designationName: this.corporateDonationFields.designationName,
            hierarchyLevel: this.corporateDonationFields.hierarchyLevel,
            status: this.corporateDonationFields.status,
            corpRoles: this.corporateDonationFields.corpRoles
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateDesignationHierarchyUrl, res);
      }
    })
  }

}
