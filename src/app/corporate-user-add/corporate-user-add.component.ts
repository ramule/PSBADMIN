import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CorporateUserAddService } from './corporate-user-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-user-add',
  templateUrl: './corporate-user-add.component.html',
  styleUrls: ['./corporate-user-add.component.css']
})
export class CorporateUserAddComponent implements OnInit {

  corporateUser: any = [];
  corporateUserType: any = [];
  allCorporateUserType: any = [];
  corpCompanyLevel: any;
  status: any = [];
  companyArr: any = [];
  corpCompanyRolesArr = [];
  corporateUserAddForm: FormGroup;
  uploadForm: FormGroup;
  remarkForm: FormGroup;

  nationalid: any;
  Passport: any;
  boardresolutionImg: any;
  userimage: any;
  certofincorpImg: any;
  otherdocsImg: any;
  selModel: any;
  roleId: any;
  country: any = [];
  states: any = [];
  city: any = [];

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

  images={
    nationalid: '',
    Passport: '',
    boardresolutionImg: '',
    userimage: '',
    certofincorpImg: '',
    otherdocsImg: '',
  }

  corpCompDetails = {
    corpCompanyId: '',
    designationId: '',
    countryId: '',
    stateId: '',
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

  formErrors = {
    companyName: '',
    userDisplayName: '',
    userType: '',
    firstName: '',
    lastName: '',
    emailId: '',
    country: '',
    personalPhoneNumber: '',
    workPhoneNumber: '',
    tempUserName: '',
    statusId: '',
    state: '',
    city: '',
    designation: '',
    remark: '',
    panCardNo: ''
  }

  corpUserAddFields = {
    companyName: '',
    userDisplayName: '',
    userType: '',
    firstName: '',
    lastName: '',
    nationalid: '',
    Passport: '',
    boardresolution: '',
    userimage: '',
    certofincorp: '',
    otherdocs: '',
    emailId: '',
    country: '',
    personalPhoneNumber: '',
    workPhoneNumber: '',
    tempUserName: '',
    designation: '',
    statusId: '',
    state: '',
    city: '',
    remark: '',
    panCardNo: ''
  }

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private corporateUserAddService: CorporateUserAddService
  ) { }

  public buildForm() {
    this.corporateUserAddForm = this.form.group({
      nationalid: new FormControl(''),
      Passport: new FormControl(''),
      boardresolution: new FormControl(''),
      userimage: new FormControl(''),
      certofincorp: new FormControl(''),
      otherdocs: new FormControl(''),
      companyName: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
      userDisplayName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      emailId: new FormControl('', [Validators.required, Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      personalPhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
      workPhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
      tempUserName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      panCardNo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      designation: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required])
    });
    this.corporateUserAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateUserAddForm, this.formErrors, true)
    });

    if(this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Corporate User";
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.getStatus();
    this.loadType();
    this.getCountryName();
    this.getAllCorpUserTypeDetails();
    this.corporateUserAddForm.patchValue({
      statusId: 3
    })
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
          var objIndex = this.allCorporateUserType.findIndex((obj) => obj.user_TYPE.toLowerCase() == corpusertypetemparr[i].toLowerCase());
          console.log('objIndex value: ', objIndex);
          var objId = this.allCorporateUserType[objIndex].id;
          var objCorpRoleName = this.allCorporateUserType[objIndex].user_TYPE;
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

  getAllCorpCompanyDesignation(companyId) {
    console.log('roles called...');
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getDesignationHierarchyByCompIdUrl + companyId).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('Roles data: ', res);
        this.corpCompanyRolesArr = res.result;
        console.log('Corp User Types array: ', this.corpCompanyRolesArr);
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getCorpUserTypesUrl+"\n"+"Params={}",'view')
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getDesignationHierarchyByCompIdUrl, res);
      }
    });
  }

  onDesignationChange(event) {
    console.log(event.target.value);
    this.corpCompDetails.designationId = event.target.value;
    this.getAllCorpUserTypeDetailsNyCompIdAndDesignationId(this.corpCompDetails.corpCompanyId, this.corpCompDetails.designationId);
    // this.corpCompanyLevel = this.corpCompanyRolesArr.filter(x => x.hierarchyLevel == event.target.value);
    this.corpCompanyRolesArr.forEach(element => {
      if(element.id == event.target.value) {
        this.corpCompanyLevel = element.hierarchyLevel;
        this.corpComDropdownData.designationName = element.designationName;
      }
    });
  }

  loadType(){
    this.commonMethod.showLoader();
    this.companyArr = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('companies data: ', res);
        this.companyArr = res.result;
      } else {
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  filterActiveCompanies() {
    return this.companyArr.filter(f => f.statusId == 3)
  }

    /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.corporateUserAddService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
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
    var paramUrl = this.appConstants.getCityNamesUrl + countryId + '/' +stateId;
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

  selectedValue(event) {
    console.log(event);
    this.corpCompDetails.corpCompanyId = event.target.value;
    console.log('corp comp id: ', this.corpCompDetails.corpCompanyId);
    this.getAllCorpCompanyDesignation(this.corpCompDetails.corpCompanyId);
    this.companyArr.forEach(element => {
      if(element.id == this.corpCompDetails.corpCompanyId) {
        console.log(element.companyName);
        this.corpComDropdownData.companyName = element.companyName
      }
    });
  }

  onUserTypeChange(event) {
    console.log(event);

    this.corporateUserType.forEach(element => {
      if(element.id == event.target.value) {
        console.log(element.description);
        this.corpComDropdownData.userTypeName = element.description
      }
    });
  }

  onCountryChange(event) {
    console.log(event);
    // $("#sl_state").val('');
    // $("#sl_city").val('');
    this.corporateUserAddForm.get('state').setValue('');
    this.corporateUserAddForm.get('city').setValue('');
    this.corpCompDetails.countryId = event.target.value;
    this.country.forEach(element => {
      if(element.countryId == this.corpCompDetails.countryId) {
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
    // $("#sl_city").val('');
    this.corporateUserAddForm.get('city').setValue('');
    console.log('selected state id : ', this.corpCompDetails.stateId);
    this.states.forEach(element => {
      if(element.stateId == this.corpCompDetails.stateId) {
        console.log(element.stateName);
        this.corpComDropdownData.stateName = element.stateName
      }
    });
    this.getCityName(this.corpCompDetails.countryId, this.corpCompDetails.stateId);
    this.city = [];
  }

  onCityChange(event) {
    this.corpCompDetails.cityId = event.target.value;
    this.city.forEach(element => {
      if(element.cityId == this.corpCompDetails.cityId) {
        console.log(element.cityName);
        this.corpComDropdownData.cityName = element.cityName
      }
    });
    console.log('selected city id : ', this.corpCompDetails.cityId);
  }

  gotoAddCorporateUser() {
    this.router.navigateByUrl("/corporateUserAdd");
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


    if(this.corporateUserAddForm.get('nationalid').value == ""){ this.isNationalImgError = true; }
    if(this.corporateUserAddForm.get('Passport').value == ""){ this.isPassportImgError = true;}
    if(this.corporateUserAddForm.get('boardresolution').value == ""){ this.isBoardResImgError = true;}
    if(this.corporateUserAddForm.get('userimage').value == ""){ this.isUserImgError = true;}
    if(this.corporateUserAddForm.get('certofincorp').value == ""){ this.isCertOfIcorpImgError = true;}
    if(this.corporateUserAddForm.get('otherdocs').value == ""){ this.isOtherDocsImgError = true;}

    if (this.corporateUserAddForm.valid) {
      if(
        this.isNationalImgError == true ||
        this.isPassportImgError == true ||
        this.isBoardResImgError == true ||
        this.isUserImgError == true ||
        this.isCertOfIcorpImgError == true ||
        this.isOtherDocsImgError == true
        )
      { return;}

      if(
        this.isValidNationalSizeFileFormat == true ||
        this.isValidPassportSizeFileFormat == true ||
        this.isValidBoardResSizeFileFormat == true ||
        this.isValidUserSizeFileFormat == true ||
        this.isValidCertOfIcorpSizeFileFormat == true ||
        this.isValidOtherDocsSizeFileFormat == true
        )
      { return;}

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log('dropdown names data: ', this.corpComDropdownData);
      this.corpUserAddFields.userDisplayName = formdata.userDisplayName;
      this.corpUserAddFields.companyName = formdata.companyName;
      this.corpUserAddFields.userType = formdata.userType;
      this.corpUserAddFields.firstName = formdata.firstName;
      this.corpUserAddFields.lastName = formdata.lastName;
      this.corpUserAddFields.emailId = formdata.emailId;
      this.corpUserAddFields.country = formdata.country;
      this.corpUserAddFields.state = formdata.state;
      this.corpUserAddFields.city = formdata.city;
      this.corpUserAddFields.personalPhoneNumber = formdata.personalPhoneNumber;
      this.corpUserAddFields.workPhoneNumber = formdata.workPhoneNumber;
      this.corpUserAddFields.nationalid = formdata.nationalid;
      this.corpUserAddFields.Passport = formdata.Passport;
      this.corpUserAddFields.boardresolution = formdata.boardresolution;
      this.corpUserAddFields.certofincorp = formdata.certofincorp;
      this.corpUserAddFields.userimage = formdata.userimage;
      this.corpUserAddFields.otherdocs = formdata.otherdocs;
      this.corpUserAddFields.tempUserName = formdata.tempUserName;
      this.corpUserAddFields.statusId = formdata.statusId;
      this.corpUserAddFields.designation = formdata.designation;
      this.corpUserAddFields.panCardNo = formdata.panCardNo;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateUserAddForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.corporateUserAddForm.patchValue({
      userDisplayName: this.corpUserAddFields.userDisplayName,
      companyName: this.corpUserAddFields.companyName,
      userType: this.corpUserAddFields.userType,
      firstName: this.corpUserAddFields.firstName,
      lastName: this.corpUserAddFields.lastName,
      emailId : this.corpUserAddFields.emailId,
      country : this.corpUserAddFields.country,
      state : this.corpUserAddFields.state,
      city : this.corpUserAddFields.city,
      personalPhoneNumber : this.corpUserAddFields.personalPhoneNumber,
      workPhoneNumber : this.corpUserAddFields.workPhoneNumber,
      nationalid : this.corpUserAddFields.nationalid,
      Passport : this.corpUserAddFields.Passport,
      boardresolution : this.corpUserAddFields.boardresolution,
      certofincorp : this.corpUserAddFields.certofincorp,
      userimage : this.corpUserAddFields.userimage,
      otherdocs : this.corpUserAddFields.otherdocs,
      tempUserName : this.corpUserAddFields.tempUserName,
      statusId : this.corpUserAddFields.statusId,
      designation : this.corpUserAddFields.designation,
      panCardNo : this.corpUserAddFields.panCardNo,
    });
    closeTinyModel();
  }

  addCorporateUser() {
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

    if(this.corporateUserAddForm.get('nationalid').value == ""){ this.isNationalImgError = true; }
    if(this.corporateUserAddForm.get('Passport').value == ""){ this.isPassportImgError = true;}
    if(this.corporateUserAddForm.get('boardresolution').value == ""){ this.isBoardResImgError = true;}
    if(this.corporateUserAddForm.get('userimage').value == ""){ this.isUserImgError = true;}
    if(this.corporateUserAddForm.get('certofincorp').value == ""){ this.isCertOfIcorpImgError = true;}
    if(this.corporateUserAddForm.get('otherdocs').value == ""){ this.isOtherDocsImgError = true;}

    if (this.corporateUserAddForm.valid) {
      if(
        this.isNationalImgError == true ||
        this.isPassportImgError == true ||
        this.isBoardResImgError == true ||
        this.isUserImgError == true ||
        this.isCertOfIcorpImgError == true ||
        this.isOtherDocsImgError == true
        )
      { return;}

      if(
        this.isValidNationalSizeFileFormat == true ||
        this.isValidPassportSizeFileFormat == true ||
        this.isValidBoardResSizeFileFormat == true ||
        this.isValidUserSizeFileFormat == true ||
        this.isValidCertOfIcorpSizeFileFormat == true ||
        this.isValidOtherDocsSizeFileFormat == true
        )
      { return;}

     var param = this.corporateUserAddService.addCorporateUserCall(this.corporateUserAddForm.value, this.images, this.corpCompDetails, this.corpComDropdownData);
     this.addCorpUser(param);

    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateUserAddForm, this.formErrors, false)
    }
  }

  addCorporateUserWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.corporateUserAddService.addCorporateUserWithRemarkCall(this.corpUserAddFields, this.images, this.corpCompDetails, this.corpComDropdownData, this.remarkForm.value);
      this.addCorpUser(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  addCorpUser(param) {
    console.log(param);
    this.commonMethod.showLoader();
    // var req = 'offersdetails/updateRegistrationDetails';
    this.commonServiceCall.postResponsePromise(this.appConstants.addCorpUserUrl, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addCorpUserUrl+"\n"+"Params="+JSON.stringify(param),'add')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl("/corporateUser");
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addCorpUserUrl, res);
      }
    })
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

  cancel(){
    this.router.navigateByUrl('/corporateUser');
  }

  addImage(event, type){
    console.log(type);
    console.log(event);

    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        console.log(file);
        if(event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png" ){

        }
        else{
          if(type == "nationalid") {
            this.isValidNationalFileFormat = true;
            this.isValidNationalSizeFileFormat = false;
          }
          else if(type == "Passport") {
            this.isValidPassportFileFormat = true;
            this.isValidPassportSizeFileFormat = false;
          }
          else if(type == "boardresolution") {
            this.isValidBoardResFileFormat = true;
            this.isValidBoardResSizeFileFormat = false;
          }
          else if(type == "userimage") {
            this.isValidUserFileFormat = true;
            this.isValidUserSizeFileFormat = false;
          }
          else if(type == "certofincorp") {
            this.isValidCertOfIcorpFileFormat = true;
            this.isValidCertOfIcorpSizeFileFormat = false;
          }
          else if(type == "otherdocs") {
            this.isValidOtherDocsFileFormat = true;
            this.isValidOtherDocsSizeFileFormat = false;
          }
          return;
        }
        const reader = new FileReader();
        reader.onload = (e:any) => {
        var img = new Image();
        var me = this
        img.src = window.URL.createObjectURL( file );
        img.onload = function() {
            console.log(img);
            var width = img.naturalWidth, height = img.naturalHeight;
            if(width > 380 || height > 180){
              if(type == "nationalid") {
                me.isValidNationalSizeFileFormat = true;
                me.isValidNationalFileFormat = false;
              }
              else if(type == "Passport") {
                me.isValidPassportSizeFileFormat = true;
                me.isValidPassportFileFormat = false;
              }
              else if(type == "boardresolution") {
                me.isValidBoardResSizeFileFormat = true;
                me.isValidBoardResFileFormat = false;
              }
              else if(type == "userimage") {
                me.isValidUserSizeFileFormat = true;
                me.isValidUserFileFormat = false;
              }
              else if(type == "certofincorp") {
                me.isValidCertOfIcorpSizeFileFormat = true;
                me.isValidCertOfIcorpFileFormat = false;
              }
              else if(type == "otherdocs") {
                me.isValidOtherDocsSizeFileFormat = true;
                me.isValidOtherDocsFileFormat = false;
              }
            }
            else{
              if(type == "nationalid") {
                console.log('nationalid');
                me.nationalid = e.target.result;
                me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                  me.images.nationalid = base64;
                });
                me.corporateUserAddForm.get('nationalid').setValue(file);
                me.isNationalImgError = false;
                me.isValidNationalSizeFileFormat = false;
                me.isValidNationalFileFormat = false;
              }
              else if(type == "Passport") {
                console.log('Passport');
                me.Passport = e.target.result;
                me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                  me.images.Passport = base64;
                });
                me.corporateUserAddForm.get('Passport').setValue(file);
                me.isPassportImgError = false;
                me.isValidPassportSizeFileFormat = false;
                me.isValidPassportFileFormat = false;
              }
              else if(type == "boardresolution") {
                console.log('boardresolution');
                me.boardresolutionImg = e.target.result;
                me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                  me.images.boardresolutionImg = base64;
                });
                me.corporateUserAddForm.get('boardresolution').setValue(file);
                me.isBoardResImgError = false;
                me.isValidBoardResSizeFileFormat = false;
                me.isValidBoardResFileFormat = false;
              }
              else if(type == "userimage") {
                console.log('userimage');
                me.userimage = e.target.result;
                me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                  me.images.userimage = base64;
                });
                me.corporateUserAddForm.get('userimage').setValue(file);
                me.isUserImgError = false;
                me.isValidUserSizeFileFormat = false;
                me.isValidUserFileFormat = false;
              }
              else if(type == "certofincorp") {
                console.log('certofincorp');
                me.certofincorpImg = e.target.result;
                me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                  me.images.certofincorpImg = base64;
                });
                me.corporateUserAddForm.get('certofincorp').setValue(file);
                me.isCertOfIcorpImgError = false;
                me.isValidCertOfIcorpSizeFileFormat = false;
                me.isValidCertOfIcorpFileFormat = false;
              }
              else if(type == "otherdocs") {
                console.log('otherdocs');
                me.otherdocsImg = e.target.result;
                me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                  me.images.otherdocsImg = base64;
                });
                me.corporateUserAddForm.get('otherdocs').setValue(file);
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

}
