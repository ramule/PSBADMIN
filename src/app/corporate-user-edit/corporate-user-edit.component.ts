import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorporateUserEditService } from './corporate-user-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-user-edit',
  templateUrl: './corporate-user-edit.component.html',
  styleUrls: ['./corporate-user-edit.component.css']
})
export class CorporateUserEditComponent implements OnInit {

  corporateUser: any = [];
  status: any = [];
  remarkHistoryArr: any = [];
  corporateUserType: any = [];
  allCorporateUserType: any = [];
  corpCompanyRolesArr = [];
  country: any = [];
  states: any = [];
  city: any = [];
  selUserDtl: any;
  corpCompanyLevel: any;
  roleId: any;
  selModel: any;
  corpUser: any;
  nationalid: any;
  Passport: any;
  boardresolutionImg: any;
  userimage: any;
  certofincorpImg: any;
  otherdocsImg: any;
  corporateUserEditForm: FormGroup;
  remarkForm: FormGroup;

  images={
    nationalid: '',
    Passport: '',
    boardresolutionImg: '',
    userimage: '',
    certofincorpImg: '',
    otherdocsImg: '',
  }

  formErrors = {
    userDisplayName: '',
    companyName: '',
    firstName: '',
    lastName: '',
    emailId: '',
    mobileNo: '',
    workPhoneNumber: '',
    country: '',
    state: '',
    city: '',
    userType: '',
    designation: '',
    tempUserName: '',
    statusId: '',
    remark: '',
    panCardNo: ''
  }

  corpCompDetails = {
    corpCompanyId: '',
    countryId: '',
    stateId: '',
    designationId: '',
    cityId: ''
  }

  corpComDropdownData = {
    cityName: '',
    stateName: '',
    countryName: '',
    companyName: '',
    userTypeName: '',
    designationName: '',
  }

  corpUserEditFields = {
    userDisplayName: '',
    companyName: '',
    firstName: '',
    lastName: '',
    emailId: '',
    nationalid: '',
    Passport: '',
    boardresolution: '',
    userimage: '',
    certofincorp: '',
    otherdocs: '',
    mobileNo: '',
    workPhoneNumber: '',
    country: '',
    state: '',
    city: '',
    userType: '',
    designation: '',
    tempUserName: '',
    statusId: '',
    remark: '',
    panCardNo: ''
  }

  isNationalImgError: boolean = false;
  isValidNationalSizeFileFormat: boolean = false;
  isValidNationalFileFormat: boolean = false;

  isPassportImgError: boolean = false;
  isValidPassportSizeFileFormat: boolean = false;
  isValidPassportFileFormat: boolean = false;

  isBoardResImgError: boolean = false;
  isValidBoardResSizeFileFormat: boolean = false;
  isValidBoardResFileFormat: boolean = false;

  isUserImgError: boolean = false;
  isValidUserSizeFileFormat: boolean = false;
  isValidUserFileFormat: boolean = false;

  isCertOfIcorpImgError: boolean = false;
  isValidCertOfIcorpSizeFileFormat: boolean = false;
  isValidCertOfIcorpFileFormat: boolean = false;

  isOtherDocsImgError: boolean = false;
  isValidOtherDocsSizeFileFormat: boolean = false;
  isValidOtherDocsFileFormat: boolean = false;

  beforeParams: any = ""

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private corporateUserEditService: CorporateUserEditService,
  ) { }


  public buildForm() {
    this.corporateUserEditForm = this.form.group({
      nationalid: new FormControl(''),
      Passport: new FormControl(''),
      boardresolution: new FormControl(''),
      userimage: new FormControl(''),
      certofincorp: new FormControl(''),
      otherdocs: new FormControl(''),
      userDisplayName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
      workPhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
      tempUserName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      panCardNo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      designation: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
    });
    this.corporateUserEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateUserEditForm, this.formErrors, true)
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
      this.router.navigateByUrl('/corporateUser');
      return;
    }

    this.commonServiceCall.pageName = "Edit Corporate User";
    this.roleId = this.commonDataShareService.roleId;
    console.log('Role ID: ', this.roleId);
    this.corpUser = this.location.getState();
    this.getCorpUserById(this.corpUser.id);
    this.getRemarkHistoryData(this.corpUser.id);
    this.getAllCorpUserTypeDetails();
    this.getStateNameOnPageLoad();
    this.getCityNameOnPageLoad();
    this.buildForm();
    this.getStatus();
    this.getCountryName();
  }

  getStateNameOnPageLoad() {
    console.log("country id: ", this.commonDataShareService.corpUserLocation.countryId);
    this.commonMethod.showLoader();
    var paramUrl =
      this.appConstants.getStateNamesUrl +
      this.commonDataShareService.corpUserLocation.countryId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        this.states = res.result;
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getStateNamesUrl, res);
      }
    });
  }

  getCityNameOnPageLoad() {
    this.commonMethod.showLoader();
    var paramUrl =
      this.appConstants.getCityNamesUrl +
      this.commonDataShareService.corpUserLocation.countryId +
      "/" +
      this.commonDataShareService.corpUserLocation.stateId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        this.city = res.result;
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCityNamesUrl, res);
      }
    });
  }

  getCountryName() {
    this.country = [];
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCountryNamesUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        // this.country = res.result;

        res.result.forEach(element => {
          if(element.statusId == 3) {
            this.country.push(element);
          }
        });
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCountryNamesUrl, res);
      }
    })
  }

  //functions on load
  getStateName(countryId) {
    this.states = [];
    console.log('country id: ', countryId);
    this.commonMethod.showLoader();
    var paramUrl = this.appConstants.getStateNamesUrl + countryId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        // this.states = res.result;

        res.result.forEach(element => {
          if(element.statusId == 3) {
            this.states.push(element);
          }
        });
      }
      else {
        this.states = [];
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getStateNamesUrl, res);
      }
    })
  }


  getCityName(countryId, stateId) {
    this.city = [];
    this.commonMethod.showLoader();
    var paramUrl = this.appConstants.getCityNamesUrl + countryId + '/' + stateId;
    this.commonServiceCall.getResponsePromise(paramUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        // this.city = res.result;

        res.result.forEach(element => {
          if(element.statusId == 3) {
            this.city.push(element);
          }
        });
      }
      else {
        this.city = [];
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCityNamesUrl, res);
      }
    })
  }

  onCountryChange(event) {
    console.log(event);
    this.corporateUserEditForm.get('state').setValue('');
    this.corporateUserEditForm.get('city').setValue('');
    this.corpCompDetails.countryId = event.target.value;
    this.country.forEach(element => {
      if (element.countryId == this.corpCompDetails.countryId) {
        console.log(element.countryName);
        this.corpComDropdownData.countryName = element.countryName
      }
    });
    console.log('country id: ', this.corpCompDetails.countryId);
    this.getStateName(this.corpCompDetails.countryId);
    this.city = [];
  }

  onStateChange(event) {
    this.corpCompDetails.stateId = event.target.value;

    this.corporateUserEditForm.get('city').setValue('');
    console.log('selected state id : ', this.corpCompDetails.stateId);
    this.states.forEach(element => {
      if (element.stateId == this.corpCompDetails.stateId) {
        console.log(element.stateName);
        this.corpComDropdownData.stateName = element.stateName
      }
    });
    this.getCityName(this.corpCompDetails.stateId, this.corpCompDetails.stateId);
    this.city = [];
  }

  onCityChange(event) {
    this.corpCompDetails.cityId = event.target.value;
    this.city.forEach(element => {
      if (element.cityId == this.corpCompDetails.cityId) {
        console.log(element.cityName);
        this.corpComDropdownData.cityName = element.cityName
      }
    });
    console.log('selected city id : ', this.corpCompDetails.cityId);
  }

  getAllCorpCompanyRoles(companyId) {
    console.log('roles called...');
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getDesignationHierarchyByCompIdUrl + companyId).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.corporateUserEditForm.patchValue({
          designation: this.selUserDtl.designationId
        });
        console.log('Roles data: ', res);
        this.corpCompanyRolesArr = res.result;
        console.log('Corp User Types array: ', this.corpCompanyRolesArr);

        this.corporateUserEditForm.patchValue({
          designation: this.selUserDtl.designation
        })
        this.getAllCorpUserTypeDetailsNyCompIdAndDesignationId(companyId, this.selUserDtl.designation);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getDesignationHierarchyByCompIdUrl, res);
      }
    });
  }

  onDesignationChange(event) {
    console.log('id', event.target.value);
    console.log(this.corpCompanyRolesArr);

    this.corpCompDetails.designationId = event.target.value;
    this.getAllCorpUserTypeDetailsNyCompIdAndDesignationId(this.corpCompDetails.corpCompanyId, this.corpCompDetails.designationId);

    this.corpCompanyRolesArr.forEach(element => {
      if (element.id == event.target.value) {
        this.corpCompanyLevel = element.hierarchyLevel;
        console.log('hierarchy level: ', this.corpCompanyLevel);
        this.corpComDropdownData.designationName = element.designationName;
      }
    });
  }

  //on load functions
  getAllCorpUserTypeDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpUserTypesUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.allCorporateUserType = res.result;
        console.log('All Corp User Types array: ', this.allCorporateUserType);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpUserTypesUrl + "\n" + "Params={}", 'view')
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpUserTypesUrl, res);
      }
    });
  }

  //on load functions
  getAllCorpUserTypeDetailsNyCompIdAndDesignationId(companyId, designationId){
    var param = {
      "id": designationId,
      "companyId": companyId
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getAuthTypeByCompIdAndDesignationIdUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.corporateUserType = [];
        this.commonMethod.hideLoader();
        console.log('response data: ', res);

        var corpusertypetemparr = [];
        corpusertypetemparr = res.result[0].authType.split(',');
        console.log('length: ', corpusertypetemparr);

        for(var i=0; i<corpusertypetemparr.length; i++) {
          var objIndex = this.allCorporateUserType.findIndex((obj) => obj.description.toLowerCase() == corpusertypetemparr[i].toLowerCase());
          console.log('objIndex value: ', objIndex);
          var objId = this.allCorporateUserType[objIndex].id;
          var objCorpRoleName = this.allCorporateUserType[objIndex].description;
          var data: any = {
            description: objCorpRoleName,
            id: objId
          }
          this.corporateUserType.push(data);
        }

        console.log('Corp User Types array: ', this.corporateUserType);
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getAuthTypeByCompIdAndDesignationIdUrl+"\n"+"Params={}",'view')
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAuthTypeByCompIdAndDesignationIdUrl, res);
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corporateUserEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
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
      this.commonMethod.destroyDataTable();
    });
  }


  onUserTypeChange(event) {
    console.log(event.target.value);
    this.corporateUserType.forEach(element => {
      if (element.id == event.target.value) {
        console.log(element.description);
        this.corpComDropdownData.userTypeName = element.description
      }
    });
  }

  getCorpUserById(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpUserByIdUrl + id).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result[0]);
        this.selUserDtl = res.result[0];
        this.beforeParams = res.result[0];
        this.corpCompanyLevel = this.selUserDtl.hierarchyLevel;

        this.nationalid = 'data:image/jpg;base64,'+this.selUserDtl.nationalId;
        this.images.nationalid = 'data:image/jpg;base64,'+this.selUserDtl.nationalId;

        this.Passport = 'data:image/jpg;base64,'+this.selUserDtl.passport;
        this.images.Passport = 'data:image/jpg;base64,'+this.selUserDtl.passport;

        this.certofincorpImg = 'data:image/jpg;base64,'+this.selUserDtl.certificate_incorporation;
        this.images.certofincorpImg = 'data:image/jpg;base64,'+this.selUserDtl.certificate_incorporation;

        this.boardresolutionImg = 'data:image/jpg;base64,'+this.selUserDtl.boardResolution;
        this.images.boardresolutionImg = 'data:image/jpg;base64,'+this.selUserDtl.boardResolution;

        this.userimage = 'data:image/jpg;base64,'+this.selUserDtl.user_image;
        this.images.userimage = 'data:image/jpg;base64,'+this.selUserDtl.user_image;

        this.otherdocsImg = 'data:image/jpg;base64,'+this.selUserDtl.otherDoc;
        this.images.otherdocsImg = 'data:image/jpg;base64,'+this.selUserDtl.otherDoc;

        this.getAllCorpCompanyRoles(this.selUserDtl.corp_comp_id);
        this.corpCompDetails.corpCompanyId = this.selUserDtl.corp_comp_id;
        this.corpComDropdownData.companyName = res.result[0].companyName;
        this.corpComDropdownData.cityName = res.result[0].cityName;
        this.corpComDropdownData.stateName = res.result[0].stateName;
        this.corpComDropdownData.countryName = res.result[0].countryName;
        this.corpComDropdownData.userTypeName = res.result[0].userType;
        this.corpComDropdownData.designationName = res.result[0].designation;
        console.log(this.selUserDtl);
        if (res.result[0].userAction != null) {
          this.corporateUserEditForm.patchValue({
            userDisplayName: res.result[0].user_disp_name,
            companyName: res.result[0].companyName,
            firstName: res.result[0].first_name,
            lastName: res.result[0].last_name,
            country: res.result[0].country,
            state: res.result[0].state,
            city: res.result[0].city,
            emailId: res.result[0].email_id,
            statusId: res.result[0].userAction,
            mobileNo: res.result[0].personal_Phone,
            workPhoneNumber: res.result[0].work_phone,
            tempUserName: res.result[0].user_disp_name,
            userType: res.result[0].user_type,
            designation: res.result[0].designation,
            userimage: this.userimage,
            certofincorp: this.certofincorpImg,
            otherdocs: this.otherdocsImg,
            boardresolution: this.boardresolutionImg,
            Passport: this.Passport,
            nationalid: this.nationalid,
            panCardNo: res.result[0].pancardNumber
          })
        }
        else {
          this.corporateUserEditForm.patchValue({
            userDisplayName: res.result[0].user_disp_name,
            companyName: res.result[0].companyName,
            firstName: res.result[0].first_name,
            lastName: res.result[0].last_name,
            country: res.result[0].country,
            state: res.result[0].state,
            city: res.result[0].city,
            emailId: res.result[0].email_id,
            mobileNo: res.result[0].personal_Phone,
            workPhoneNumber: res.result[0].work_phone,
            tempUserName: res.result[0].user_disp_name,
            userType: res.result[0].user_type,
            designation: res.result[0].designation,
            userimage: this.userimage,
            certofincorp: this.certofincorpImg,
            otherdocs: this.otherdocsImg,
            boardresolution: this.boardresolutionImg,
            Passport: this.Passport,
            nationalid: this.nationalid,
            statusId: res.result[0].statusid,
            panCardNo: res.result[0].pancardNumber
          })
        }
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpUserByIdUrl, res);
      }
    });
  }

  openActionModel(action, formdata) {

    this.isNationalImgError = false;
    this.isPassportImgError = false;
    this.isBoardResImgError = false;
    this.isUserImgError = false;
    this.isCertOfIcorpImgError = false;
    this.isOtherDocsImgError = false;

    this.isValidNationalFileFormat = false;
    this.isValidPassportFileFormat = false;
    this.isValidBoardResFileFormat = false;
    this.isValidUserFileFormat = false;
    this.isValidCertOfIcorpFileFormat = false;
    this.isValidOtherDocsFileFormat = false;


    if (this.corporateUserEditForm.get('nationalid').value == "") { this.isNationalImgError = true; }
    if (this.corporateUserEditForm.get('Passport').value == "") { this.isPassportImgError = true; }
    if (this.corporateUserEditForm.get('boardresolution').value == "") { this.isBoardResImgError = true; }
    if (this.corporateUserEditForm.get('userimage').value == "") { this.isUserImgError = true; }
    if (this.corporateUserEditForm.get('certofincorp').value == "") { this.isCertOfIcorpImgError = true; }
    if (this.corporateUserEditForm.get('otherdocs').value == "") { this.isOtherDocsImgError = true; }

    if (this.corporateUserEditForm.valid) {
      if (
        this.isNationalImgError == true ||
        this.isPassportImgError == true ||
        this.isBoardResImgError == true ||
        this.isUserImgError == true ||
        this.isCertOfIcorpImgError == true ||
        this.isOtherDocsImgError == true
      ) { return; }

      if (
        this.isValidNationalSizeFileFormat == true ||
        this.isValidPassportSizeFileFormat == true ||
        this.isValidBoardResSizeFileFormat == true ||
        this.isValidUserSizeFileFormat == true ||
        this.isValidCertOfIcorpSizeFileFormat == true ||
        this.isValidOtherDocsSizeFileFormat == true
      ) { return; }

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.corpUserEditFields.userDisplayName = formdata.userDisplayName;
      this.corpUserEditFields.companyName = formdata.companyName;
      this.corpUserEditFields.userType = formdata.userType;
      this.corpUserEditFields.firstName = formdata.firstName;
      this.corpUserEditFields.lastName = formdata.lastName;
      this.corpUserEditFields.emailId = formdata.emailId;
      this.corpUserEditFields.country = formdata.country;
      this.corpUserEditFields.state = formdata.state;
      this.corpUserEditFields.city = formdata.city;
      this.corpUserEditFields.mobileNo = formdata.mobileNo;
      this.corpUserEditFields.workPhoneNumber = formdata.workPhoneNumber;
      this.corpUserEditFields.nationalid = formdata.nationalid;
      this.corpUserEditFields.Passport = formdata.Passport;
      this.corpUserEditFields.boardresolution = formdata.boardresolution;
      this.corpUserEditFields.certofincorp = formdata.certofincorp;
      this.corpUserEditFields.userimage = formdata.userimage;
      this.corpUserEditFields.otherdocs = formdata.otherdocs;
      this.corpUserEditFields.tempUserName = formdata.tempUserName;
      this.corpUserEditFields.statusId = formdata.statusId;
      this.corpUserEditFields.designation = formdata.designation;
      this.corpUserEditFields.panCardNo = formdata.panCardNo;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateUserEditForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.corporateUserEditForm.patchValue({
      userDisplayName: this.corpUserEditFields.userDisplayName,
      companyName: this.corpUserEditFields.companyName,
      userType: this.corpUserEditFields.userType,
      firstName: this.corpUserEditFields.firstName,
      lastName: this.corpUserEditFields.lastName,
      emailId: this.corpUserEditFields.emailId,
      country: this.corpUserEditFields.country,
      state: this.corpUserEditFields.state,
      city: this.corpUserEditFields.city,
      mobileNo: this.corpUserEditFields.mobileNo,
      workPhoneNumber: this.corpUserEditFields.workPhoneNumber,
      nationalid: this.corpUserEditFields.nationalid,
      Passport: this.corpUserEditFields.Passport,
      boardresolution: this.corpUserEditFields.boardresolution,
      certofincorp: this.corpUserEditFields.certofincorp,
      userimage: this.corpUserEditFields.userimage,
      otherdocs: this.corpUserEditFields.otherdocs,
      tempUserName: this.corpUserEditFields.tempUserName,
      statusId: this.corpUserEditFields.statusId,
      designation: this.corpUserEditFields.designation,
      panCardNo: this.corpUserEditFields.panCardNo,
    });
    closeTinyModel();
  }

  editCorporateUser() {
    this.isNationalImgError = false;
    this.isPassportImgError = false;
    this.isBoardResImgError = false;
    this.isUserImgError = false;
    this.isCertOfIcorpImgError = false;
    this.isOtherDocsImgError = false;

    this.isValidNationalFileFormat = false;
    this.isValidPassportFileFormat = false;
    this.isValidBoardResFileFormat = false;
    this.isValidUserFileFormat = false;
    this.isValidCertOfIcorpFileFormat = false;
    this.isValidOtherDocsFileFormat = false;

    if (this.corporateUserEditForm.get('nationalid').value == "") { this.isNationalImgError = true; }
    if (this.corporateUserEditForm.get('Passport').value == "") { this.isPassportImgError = true; }
    if (this.corporateUserEditForm.get('boardresolution').value == "") { this.isBoardResImgError = true; }
    if (this.corporateUserEditForm.get('userimage').value == "") { this.isUserImgError = true; }
    if (this.corporateUserEditForm.get('certofincorp').value == "") { this.isCertOfIcorpImgError = true; }
    if (this.corporateUserEditForm.get('otherdocs').value == "") { this.isOtherDocsImgError = true; }

    this.formValidation.markFormGroupTouched(this.corporateUserEditForm);
    if (this.corporateUserEditForm.valid) {

      if (
        this.isNationalImgError == true ||
        this.isPassportImgError == true ||
        this.isBoardResImgError == true ||
        this.isUserImgError == true ||
        this.isCertOfIcorpImgError == true ||
        this.isOtherDocsImgError == true
      ) { return; }

      if (
        this.isValidNationalSizeFileFormat == true ||
        this.isValidPassportSizeFileFormat == true ||
        this.isValidBoardResSizeFileFormat == true ||
        this.isValidUserSizeFileFormat == true ||
        this.isValidCertOfIcorpSizeFileFormat == true ||
        this.isValidOtherDocsSizeFileFormat == true
      ) { return; }

      var param = this.corporateUserEditService.editCorpUserCall(this.corporateUserEditForm.value,this.selUserDtl, this.corpComDropdownData, this.corpUser.id,  this.images);
      this.updateCorpUser(param);

    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateUserEditForm, this.formErrors, false)
    }
  }

  editCorporateUserWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.corporateUserEditService.editCorpUserWithRemarkCall(this.corpUserEditFields, this.selUserDtl, this.corpComDropdownData, this.corpUser.id, this.remarkForm.value,  this.images);
      this.updateCorpUser(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  updateCorpUser(param) {
    console.log(param);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCorpUserUrl, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCorpUserUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        this.cancel();
        this.commonMethod.hideLoader();
      } else {
        if (this.commonDataShareService.roleType == 'Corporate Maker') {
          this.corporateUserEditForm.patchValue({
            userDisplayName: this.corpUserEditFields.userDisplayName,
            companyName: this.corpUserEditFields.companyName,
            userType: this.corpUserEditFields.userType,
            firstName: this.corpUserEditFields.firstName,
            lastName: this.corpUserEditFields.lastName,
            emailId: this.corpUserEditFields.emailId,
            country: this.corpUserEditFields.country,
            state: this.corpUserEditFields.state,
            city: this.corpUserEditFields.city,
            mobileNo: this.corpUserEditFields.mobileNo,
            workPhoneNumber: this.corpUserEditFields.workPhoneNumber,
            nationalid: this.corpUserEditFields.nationalid,
            Passport: this.corpUserEditFields.Passport,
            boardresolution: this.corpUserEditFields.boardresolution,
            certofincorp: this.corpUserEditFields.certofincorp,
            userimage: this.corpUserEditFields.userimage,
            otherdocs: this.corpUserEditFields.otherdocs,
            tempUserName: this.corpUserEditFields.tempUserName,
            statusId: this.corpUserEditFields.statusId,
            designation: this.corpUserEditFields.designation,
            panCardNo: this.corpUserEditFields.panCardNo,
          });
        }
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateCorpUserUrl, res);
      }
    });
  }

  addImage(event, type) {
    console.log(type);
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png") {

      }
      else {
        if (type == "nationalid") {
          this.isValidNationalFileFormat = true;
          this.isValidNationalSizeFileFormat = false;
        }
        else if (type == "Passport") {
          this.isValidPassportFileFormat = true;
          this.isValidPassportSizeFileFormat = false;
        }
        else if (type == "boardresolution") {
          this.isValidBoardResFileFormat = true;
          this.isValidBoardResSizeFileFormat = false;
        }
        else if (type == "userimage") {
          this.isValidUserFileFormat = true;
          this.isValidUserSizeFileFormat = false;
        }
        else if (type == "certofincorp") {
          this.isValidCertOfIcorpFileFormat = true;
          this.isValidCertOfIcorpSizeFileFormat = false;
        }
        else if (type == "otherdocs") {
          this.isValidOtherDocsFileFormat = true;
          this.isValidOtherDocsSizeFileFormat = false;
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
          if (width > 380 || height > 180) {
            if (type == "nationalid") {
              me.isValidNationalSizeFileFormat = true;
              me.isValidNationalFileFormat = false;
            }
            else if (type == "Passport") {
              me.isValidPassportSizeFileFormat = true;
              me.isValidPassportFileFormat = false;
            }
            else if (type == "boardresolution") {
              me.isValidBoardResSizeFileFormat = true;
              me.isValidBoardResFileFormat = false;
            }
            else if (type == "userimage") {
              me.isValidUserSizeFileFormat = true;
              me.isValidUserFileFormat = false;
            }
            else if (type == "certofincorp") {
              me.isValidCertOfIcorpSizeFileFormat = true;
              me.isValidCertOfIcorpFileFormat = false;
            }
            else if (type == "otherdocs") {
              me.isValidOtherDocsSizeFileFormat = true;
              me.isValidOtherDocsFileFormat = false;
            }
          }
          else {
            if (type == "nationalid") {
              console.log('nationalid');
              me.nationalid = e.target.result;
              me.corporateUserEditForm.get('nationalid').setValue(file);
              me.isNationalImgError = false;
              me.isValidNationalSizeFileFormat = false;
              me.isValidNationalFileFormat = false;
            }
            else if (type == "Passport") {
              console.log('Passport');
              me.Passport = e.target.result;
              me.corporateUserEditForm.get('Passport').setValue(file);
              me.isPassportImgError = false;
              me.isValidPassportSizeFileFormat = false;
              me.isValidPassportFileFormat = false;
            }
            else if (type == "boardresolution") {
              console.log('boardresolution');
              me.boardresolutionImg = e.target.result;
              me.corporateUserEditForm.get('boardresolution').setValue(file);
              me.isBoardResImgError = false;
              me.isValidBoardResSizeFileFormat = false;
              me.isValidBoardResFileFormat = false;
            }
            else if (type == "userimage") {
              console.log('userimage');
              me.userimage = e.target.result;
              me.corporateUserEditForm.get('userimage').setValue(file);
              me.isUserImgError = false;
              me.isValidUserSizeFileFormat = false;
              me.isValidUserFileFormat = false;
            }
            else if (type == "certofincorp") {
              console.log('certofincorp');
              me.certofincorpImg = e.target.result;
              me.corporateUserEditForm.get('certofincorp').setValue(file);
              me.isCertOfIcorpImgError = false;
              me.isValidCertOfIcorpSizeFileFormat = false;
              me.isValidCertOfIcorpFileFormat = false;
            }
            else if (type == "otherdocs") {
              console.log('otherdocs');
              me.otherdocsImg = e.target.result;
              me.corporateUserEditForm.get('otherdocs').setValue(file);
              me.isOtherDocsImgError = false;
              me.isValidOtherDocsSizeFileFormat = false;
              me.isValidOtherDocsFileFormat = false;
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

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.status = data.resp;
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  filterStatus() {
    return this.status.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == '/corporateUser') {
      this.router.navigateByUrl("/corporateUser");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests') {
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/corporateUser");
    }
  }

}
