import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CorporateCompanyUserRequestsAddService } from './corporate-company-user-requests-add.service';
import { element } from 'protractor';
import { async } from 'q';
import { METHODS } from 'http';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-company-user-requests-add',
  templateUrl: './corporate-company-user-requests-add.component.html',
  styleUrls: ['./corporate-company-user-requests-add.component.css']
})
export class CorporateCompanyUserRequestsAddComponent implements OnInit {

  corpCompanyRequestsAddForm: FormGroup;
  corpCompanyMenuAddForm: FormGroup;
  corpCompanyMenuForm: FormGroup;
  corpMenuAddFlag: any = false;
  isMenuAlreadyExistFlag: boolean = false;
  corporateMenuMasterArr: any = [];

  corpCompanyAccAddForm: FormGroup;
  corpAccAddFlag: any = false;
  isAccountAlreadyExistFlag: boolean = false;

  corpUserAccAddForm: FormGroup;
  corpUserAddFlag: any = false;
  corpUserAccEditForm: FormGroup;
  corpUserEditFlag: any = false;
  isUserAlreadyExistFlag: boolean = false;

  remarkForm: FormGroup;
  selModel: any;
  displayImage: any;
  roleId: any;
  corpCompanyId: any;
  corpCompanyDetils: any;
  todayDate: any;
  selCorpCompanyRequest: any = [];
  remarkHistoryArr: any = [];

  tempCorpCompanyMenuArr: any = [];
  corpCompanyMenuArr: any = [];
  tempCorpCompanyAccountsArr: any = [];
  corpCompanyAccountsArr: any = [];
  corpUsersArr: any = [];
  corpUsersAccountsArr: any = [];
  corpUsersMenusArr: any = [];

  /* these arrays are specially created as per requests parameters */
  corpCompanyrequMenuArr: any = [];
  corpCompanyrequAccountsArr: any = [];
  corpUsersReqArr: any = [];
  corpUsersReqMenuMapDataArr: any = [];
  corpUsersReqAccMapDataArr: any = [];

  tempSelectedItemsAddArr: any = [];
  selectedItemsAdd: any = [];
  selectedItemsEdit: any = [];

  selectedItemsAccountsAdd: any = [];
  selectedItemsAccountsEdit: any = [];

  coi: any;
  moa: any;
  otherdocs: any;
  logo: any;
  br:any;
  coii:any;
  ni:any;
  pass:any;
  ui:any;
  od:any;
  roleMaster:any=[]
  roleTempMaster:any=[]

  /* Document images related parameters */
  isCOIImgError: boolean = false;
  isValidCOISizeFileFormat: boolean = false;
  isValidCOIFileFormat: boolean = false;

  isMOAImgError: boolean = false;
  isValidMOASizeFileFormat: boolean = false;
  isValidMOAFileFormat: boolean = false;

  isLogoImgError: boolean = false;
  isValidLogoSizeFileFormat: boolean = false;
  isValidLogoFileFormat: boolean = false;

  isOtherdocsImgError: boolean = false;
  isValidOtherdocsSizeFileFormat: boolean = false;
  isValidOtherdocsFileFormat: boolean = false;

  isBRImgError: boolean = true;
  isValidBRSizeFileFormat: boolean = false;
  isValidBRFileFormat: boolean = false;

  isCOIIImgError: boolean = true;
  isValidCOIISizeFileFormat: boolean = false;
  isValidCOIIFileFormat: boolean = false;

  isNIImgError: boolean = true;
  isValidNISizeFileFormat: boolean = false;
  isValidNIFileFormat: boolean = false;

  isPASSImgError: boolean = true;
  isValidPASSSizeFileFormat: boolean = false;
  isValidPASSFileFormat: boolean = false;

  isUIImgError: boolean = false;
  isValidUISizeFileFormat: boolean = false;
  isValidUIFileFormat: boolean = false;

  isODImgError: boolean = false;
  isValidODSizeFileFormat: boolean = false;
  isValidODFileFormat: boolean = false;

  images={
    coi: '',
    moa: '',
    logo: '',
    otherdocs: '',
    br:'',
    coii:'',
    ni:'',
    pass:'',
    ui:'',
    od:''
  };

  pdf: any={
    coi: '',
    moa:'',
    otherdocs: '',
    ui:'',
    od:''

  }

  documentsObj = {
    coi: '',
    moa: '',
    pancard: '',
    logo: '',
    otherdocs: ''
  }

  status = [];
  formErrors = {
    corpCompanyName: "",
    corpCompanyInfo: "",
    rrn: "",
    cif: "",
    establishmentOn: "",
    status: "",
    phoneNo: "",
    pancardNo: "",
    remark: "",
    menuName: "",
    menuDesc: "",
    accNo: "",
    username: "",
    fName: "",
    lName: "",
    emailId: "",
    mobileNo: "",
    panNumber: "",
    menuMapped: "",
    accountsMapped: "",
    dob: "",
    passNumber: "",
    // nationalId: "",
    aadharCardNo: "",
    role: "",
    user: "",
    regulator:'',

  };

  corpCompanyRequestsFields = {
    corpCompanyName: "",
    corpCompanyInfo: "",
    rrn: "",
    cif: "",
    establishmentOn: "",
    phoneNo: "",
    pancardNo: "",
    status: "",
    coi: "",
    moa: "",
    logo: "",
    otherdocs: "",
    remark: ""
  };

  dropdownSettings :IDropdownSettings;
  dropdownSettingsAccounts :IDropdownSettings;
  isDropdownDisabled:boolean=false
  isEditDropdownDisabled:boolean=false;
  editableItem: any;
  showSuccess: boolean = false;
  showSuccessMOA: boolean = false;
  showSuccessOTHERDOCS: boolean = false;
  showSuccessOD: boolean = false;

  isUploadPdf: boolean = false;
  fileType: any;
  savedCorpCompId: any;

  editUserArray = []

  editmenuArray = []
  editAccountArray =[]

  isUserDisabled:boolean=true;

  emailExist:boolean;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe,
    private corporateCompanyUserRequestsAddService: CorporateCompanyUserRequestsAddService,
  ) {}

  public buildForm() {
    this.corpCompanyRequestsAddForm = this.form.group({
      corpCompanyName: new FormControl("", [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      corpCompanyInfo: new FormControl("", [Validators.required]),
      rrn: new FormControl("", [Validators.required,Validators.minLength(4),Validators.maxLength(10),Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      cif: new FormControl("", [Validators.required, Validators.minLength(6),Validators.maxLength(11)]),
      coi: new FormControl(''),
      moa: new FormControl(''),
      otherdocs: new FormControl(''),
      logo: new FormControl(''),
      pancardNo: new FormControl("", [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),Validators.minLength(10),Validators.maxLength(10)]),
      phoneNo: new FormControl("", [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[6-9]\d{9}$/)]),
      establishmentOn: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      remark: new FormControl(""),
    });
    this.corpCompanyRequestsAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.corpCompanyRequestsAddForm,
        this.formErrors,
        true
      );
    });

    if (this.selModel == "remarkFieldStp2") {
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

    this.corpCompanyMenuForm = this.form.group({
      remark: new FormControl("")
    });
    this.corpCompanyMenuForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.corpCompanyMenuForm,
        this.formErrors,
        true
      );
    });

    if (this.corpMenuAddFlag) {
      this.corpCompanyMenuAddForm = this.form.group({
        menuName: new FormControl("", [Validators.required]),
        menuDesc: new FormControl("", [Validators.required]),
      });
      this.corpCompanyMenuAddForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.corpCompanyMenuAddForm,
          this.formErrors,
          true
        );
      });
    }

    if (this.corpAccAddFlag) {
      this.corpCompanyAccAddForm = this.form.group({
        accNo: new FormControl("", [Validators.required, Validators.maxLength(18), Validators.minLength(9),Validators.pattern(/^[0-9]\d*$/)]),
      });
      this.corpCompanyAccAddForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.corpCompanyAccAddForm,
          this.formErrors,
          true
        );
      });
    }

    if (this.corpUserAddFlag) {
      this.corpUserAccAddForm = this.form.group({
        username: new FormControl("", [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
        fName: new FormControl("", [Validators.required]),
        lName: new FormControl("", [Validators.required]),
        emailId: new FormControl("", [Validators.required,Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]),
        mobileNo: new FormControl("", [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[6-9]\d{9}$/)]),
        panNumber: new FormControl("", [Validators.required,Validators.minLength(10),Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),Validators.maxLength(10)]),
        menuMapped: new FormControl(""),
        accountsMapped: new FormControl(""),
        dob: new FormControl("", [Validators.required]),
        passNumber: new FormControl("", [Validators.required,Validators.pattern(/^(?!^0+$)[a-zA-Z0-9]{6,9}$/),Validators.minLength(8),Validators.maxLength(8)]),
        // nationalId: new FormControl("", [Validators.required]),
        aadharCardNo: new FormControl("", [Validators.required, Validators.minLength(12),Validators.pattern(/^[1-9]{4}[1-9]{4}[1-9]{4}$/)]),
        br:new FormControl(""),
        coii:new FormControl(""),
        ni:new FormControl(""),
        pass:new FormControl(""),
        ui:new FormControl(""),
        od:new FormControl(""),
        role:new FormControl("", [Validators.required]),
        regulator:new FormControl(""),
        user:new FormControl(""),

      });
      this.corpUserAccAddForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.corpUserAccAddForm,
          this.formErrors,
          true
        );
      });
    }

    if (this.corpUserEditFlag) {
      this.corpUserAccEditForm = this.form.group({
        username: new FormControl("", [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
        fName: new FormControl("", [Validators.required]),
        lName: new FormControl("", [Validators.required]),
        emailId: new FormControl("", [Validators.required,Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]),
        mobileNo: new FormControl("", [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}$/)]),
        panNumber: new FormControl("", [Validators.required,Validators.minLength(10),Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),Validators.maxLength(10)]),
        menuMapped: new FormControl("", [Validators.required]),
        accountsMapped: new FormControl("", [Validators.required]),
        dob: new FormControl("", [Validators.required]),
        passNumber: new FormControl("", [Validators.required,Validators.pattern(/^(?!^0+$)[a-zA-Z0-9]{6,9}$/),Validators.minLength(8),Validators.maxLength(8)]),
        // nationalId: new FormControl("", [Validators.required]),
        aadharCardNo: new FormControl("", [Validators.required, Validators.minLength(12),Validators.pattern(/^[1-9]{4}[1-9]{4}[1-9]{4}$/)]),
        br:new FormControl(""),
        coii:new FormControl(""),
        ni:new FormControl(""),
        pass:new FormControl(""),
        ui:new FormControl(""),
        od:new FormControl(""),
        role:new FormControl("", [Validators.required]),
        user:new FormControl("", [Validators.required]),
      });
      this.corpUserAccEditForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.corpUserAccEditForm,
          this.formErrors,
          true
        );
      });
    }

  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Corporate Company Offline Registration Add";
    console.log(this.corpCompanyDetils);
    this.getCorpJs();
    this.buildForm();
    this.getStatus();
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.selectedItemsAdd = [];
    this.selectedItemsEdit = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'menuid',
      textField: 'menuName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownSettingsAccounts = {
      singleSelection: false,
      idField: 'accountNo',
      textField: 'accountNo',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    this.roleTempMaster = [{
      id:1,
      name:'Regulator'
      },
      {
        id:2,
        name:'Admin'
      },
      {
        id:3,
        name:'Maker'
      },
      {
        id:4,
        name:'Checker'
      }
    ];

    if(this.commonData.roleType == this.commonData.corpMakerRole) {

      $('#companyRemark').show();
      this.corpCompanyRequestsAddForm.controls["remark"].setValidators([Validators.required]);
      this.corpCompanyRequestsAddForm.controls["remark"].updateValueAndValidity();
    }
    else {

      $('#companyRemark').hide();
      this.corpCompanyRequestsAddForm.controls["remark"].setValidators([]);
      this.corpCompanyRequestsAddForm.controls["remark"].updateValueAndValidity();
    }

  }

  onItemSelectAdd(item: any) {
    console.log(this.selectedItemsAdd);
    console.log(this.selectedItemsAccountsAdd);
  }
  onSelectAllAdd(items: any) {
    console.log(items);
  }

  onItemSelectEdit(item: any) {
    console.log(this.selectedItemsEdit);
  }
  onSelectAllEdit(items: any) {
    console.log(items);
  }

  /* Method to get you on corp menu add form */
  goTocorpCompanyMenuAddForm() {
    $("#dttable").hide();
    this.corpMenuAddFlag = true;
    this.buildForm();
  }

  /* Method to get you on corp menu add form */
  goTocorpCompanyAccountAddForm() {



    $("#dttable1").hide();
    this.corpAccAddFlag = true;
    this.buildForm();
  }

  /* Method to get you on corp menu add form */
  goTocorpUserAccountAddForm() {

    this.coii = ""
    this.ni=""
    this.ui=""
    this.od=""
    this.pass=""
    this.br=""

    this.isDropdownDisabled = false

    this.isBRImgError = true;
    this.isValidBRSizeFileFormat = false;
    this.isValidBRFileFormat = false;

    this.isCOIIImgError = true;
    this.isValidCOIISizeFileFormat = false;
    this.isValidCOIIFileFormat = false;

    this.isNIImgError = true;
    this.isValidNISizeFileFormat = false;
    this.isValidNIFileFormat = false;

    this.isPASSImgError = true;
    this.isValidPASSSizeFileFormat = false;
    this.isValidPASSFileFormat = false;

    this.isUIImgError = true;
    this.isValidUISizeFileFormat = false;
    this.isValidUIFileFormat = false;

    this.isODImgError = true;
    this.isValidODSizeFileFormat = false;
    this.isValidODFileFormat = false;

    this.selectedItemsAdd = []
    this.selectedItemsAccountsAdd = []



    $("#dttable2").hide();
    this.corpUserAddFlag = true;
    this.buildForm();
    if(this.corpUsersArr.length>0)
    {
      this.corpUserAccAddForm.controls["regulator"].setValidators([]);
      this.corpUserAccAddForm.controls["regulator"].updateValueAndValidity();
    }
    else
    {
      this.corpUserAccAddForm.controls["regulator"].setValidators([Validators.required]);
      this.corpUserAccAddForm.controls["regulator"].updateValueAndValidity();
    }




  }

  /* Corporate Company menu add method in step-2 */
  onCorpMenuAdd(formdata) {
    var menuname = "";
    var menudata = []
    if(this.corpCompanyMenuAddForm.valid) {

      this.corporateMenuMasterArr.forEach(element => {
        if(formdata.menuName == element.id) {
          menuname = element.menuName
        }
      });

      this.corpCompanyMenuArr.forEach(element => {
        if(element.menuid == formdata.menuName) {
          this.isMenuAlreadyExistFlag = true;
          showToastMessage('Menu already exist');
        }
      });

      if(!this.isMenuAlreadyExistFlag) {
       /* New code added */
        // this.commonMethod.showLoader();
        var dataarray = []
        var array = {
          "corpReqId": 1,
          "menuReqId": formdata.menuName,
          "updatedby": this.commonData.user_ID
        }
        var param = {
          "menuid": formdata.menuName,
          "menuName": menuname,
          "menuDesc": formdata.menuDesc,
          "createdon": this.todayDate,
          "updatedby": this.commonData.user_ID
        }
        this.corpCompanyMenuArr.push(param);
        console.log('corp company menu array: ', this.corpCompanyMenuArr);
        this.tempCorpCompanyMenuArr = this.corpCompanyMenuArr;
        this.corpMenuAddFlag = false;
        $("#dttable").show();
        this.corpCompanyMenuAddForm.reset();

        if(this.corpUsersArr.length>0 && this.corpUsersArr[0].role == 1)
        {
          this.corpCompanyMenuArr.forEach(element=>{
            menudata.push(element.menuName)
          })
          this.corpUsersArr[0].menuMapped = menudata
        }
        // dataarray.push(array)
        // var param = this.corporateCompanyUserRequestsAddService.saveMenu(dataarray)
        // this.commonServiceCall.postResponsePromise(this.appConstants.saveToCorpMenuMap,param).subscribe((data) => {
        //   var res = data.resp;
        //   if (res.responseCode == "200") {
        //     this.commonMethod.hideLoader();


        //   } else {
        //     this.commonMethod.hideLoader();
        //    this.errorCallBack(this.appConstants.saveToCorpMenuMap, res);
        //   }

        // });
      }
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corpCompanyMenuAddForm, this.formErrors, false)
    }
    this.isMenuAlreadyExistFlag = false;

  }

  /* Corporate Company menu add method in step-2 */
  onCorpAccountAdd(formdata) {
    var accountdata =[]
    if(this.corpCompanyAccAddForm.valid) {

      this.corpCompanyAccountsArr.forEach(element => {
        if(element.accountNo == formdata.accNo) {
          this.isAccountAlreadyExistFlag = true;
          showToastMessage('Account Number Already Exist');
        }
      });

      if(!this.isAccountAlreadyExistFlag) {
        // this.commonMethod.showLoader();
        var dataarray = []
        var array = {
          "corpReqId": 1,
          "accountNo": formdata.accNo,
          "updatedby": this.commonData.user_ID
        }
        var param = {
          "accountNo": formdata.accNo,
          "createdon": this.todayDate,
          "updatedby": this.commonData.user_ID
        }
        this.corpCompanyAccountsArr.push(param);
        console.log('corp company accounts array: ', this.corpCompanyAccountsArr);
        this.tempCorpCompanyAccountsArr = this.corpCompanyAccountsArr;
        this.corpAccAddFlag = false;
        $("#dttable1").show();
        this.corpCompanyAccAddForm.reset();

        if(this.corpUsersArr.length>0 && this.corpUsersArr[0].role == 1)
        {
          this.corpCompanyAccountsArr.forEach(element=>
            {
              accountdata.push(element.accountNo)
            })
          this.corpUsersArr[0].accountsMapped = accountdata
        }
        // dataarray.push(array)
        // var param = this.corporateCompanyUserRequestsAddService.saveAccount(dataarray)
        // this.commonServiceCall.postResponsePromise(this.appConstants.saveToCorpAccMap,param).subscribe((data) => {
        //   var res = data.resp;
        //   if (res.responseCode == "200") {
        //     this.commonMethod.hideLoader();

        //   } else {
        //     this.commonMethod.hideLoader();
        //    this.errorCallBack(this.appConstants.saveToCorpAccMap, res);
        //   }

        // });

      }
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corpCompanyAccAddForm, this.formErrors, false)
    }
    this.isAccountAlreadyExistFlag = false;
  }
  

  /* Corporate Company user add method in step-2 */
  onCorpUserAdd(formdata) {
    var menuname = [];
    var accountNumbers = [];
    var param :any
    if(this.corpUserAccAddForm.valid) {

     if(localStorage.getItem('isregulator')=='Y')
     {
      if(formdata.role!="1")
      {


        if(this.corpUsersArr.length==0)
        {
          showToastMessage("Please Add Atleast One Regulator")
          return;
        }
        else
        {
          if(formdata.role=="3"||formdata.role=="4")
          {
            var  objIndex = this.corpUsersArr.findIndex((obj) => obj.role == "2");
            if(this.corpUsersArr.length==1 || this.corpUsersArr.length==2)
            {
              showToastMessage("Please Add Atleast Two Admin");
              return;
            }
          }


        }

        if(formdata.role == "2" || formdata.role == "3" || formdata.role == "4" )
        {
          console.log('selected items array: ', this.selectedItemsAdd);
          this.tempSelectedItemsAddArr = this.selectedItemsAdd;

          /* to get menu name from array */
          this.selectedItemsAdd.forEach(element => {
            menuname.push(element.menuName);
          });

          /* to get menu name from array */
          this.selectedItemsAccountsAdd.forEach(element => {
            accountNumbers.push(element.accountNo);
          });

          this.corpCompanyMenuArr.forEach(element => {
            if(formdata.menuMapped == element.menuid) {
              menuname = element.menuName;
            }
          });
        }
        else
        {
          // var  objIndex = this.corpUsersArr.findIndex((obj) => obj.userName == formdata.user);
          // menuname = this.corpUsersArr[objIndex].menuMapped
          // accountNumbers = this.corpUsersArr[objIndex].accountsMapped
        }
        this.corpCompanyAccountsArr = []
        this.corpCompanyMenuArr =[]
        this.corpCompanyAccountsArr = this.tempCorpCompanyAccountsArr
        this.corpCompanyMenuArr = this.tempCorpCompanyMenuArr

      }
      else
      {
        var  objIndexnew = this.corpUsersArr.findIndex((obj) => obj.role == "1");
        if(objIndexnew>=0)
        {
          showToastMessage("Regulator Already Exist")
          return;
        }
        this.corpCompanyMenuArr.forEach(element=>{
          menuname.push(element.menuName);
        })

        this.corpCompanyAccountsArr.forEach(element => {
          accountNumbers.push(element.accountNo)

        })
      }

      if(formdata.role == "1")
      {
        var userRole = "Regulator"
        var parentRole = ""
      }
      if(formdata.role == "2")
      {
        var userRole = "Admin"
        var parentRole = "Regulator"
      }
      if(formdata.role == "3")
      {
        var userRole = "Maker"
        var parentRole = "Admin"
      }
      if(formdata.role == "4")
      {
        var userRole = "Checker"
        var parentRole = "Admin"
      }

      if(formdata.role == "1" || formdata.role == "2")
      {
         param = {
          "userName": formdata.username,
          "firstName": formdata.fName,
          "lastName": formdata.lName,
          "email": formdata.emailId,
          "mobile": formdata.mobileNo,
          "pancardNo": formdata.panNumber,
          "menuMapped": menuname,
          "accountsMapped": accountNumbers,
          "dob":formdata.dob,
          "passNumber":formdata.passNumber,
          "aadharCardNo":formdata.aadharCardNo,
          "br":formdata.br,
          "coii":formdata.coii,
          "ni":formdata.ni,
          "pass":formdata.pass,
          "ui":formdata.ui,
          "od":formdata.od,
          "role":formdata.role,
          "user":"",
          "userRole":userRole,
          "parentRole":parentRole
        }
      }
      else
      {
         param = {
          "userName": formdata.username,
          "firstName": formdata.fName,
          "lastName": formdata.lName,
          "email": formdata.emailId,
          "mobile": formdata.mobileNo,
          "pancardNo": formdata.panNumber,
          "menuMapped": menuname,
          "accountsMapped": accountNumbers,
          "dob":formdata.dob,
          "passNumber":formdata.passNumber,
          "aadharCardNo":formdata.aadharCardNo,
          "br":formdata.br,
          "coii":formdata.coii,
          "ni":formdata.ni,
          "pass":formdata.pass,
          "ui":formdata.ui,
          "od":formdata.od,
          "role":formdata.role,
          "user":formdata.user,
          "userRole":userRole,
          "parentRole":parentRole
        }
      }

      if(this.corpUsersArr.length > 0) {
        var objUsernameIndex = this.corpUsersArr.findIndex((obj) => obj.userName == formdata.username);
        var objMobileIndex = this.corpUsersArr.findIndex((obj) => obj.mobile == formdata.mobileNo);
        var objEmailIndex = this.corpUsersArr.findIndex((obj) => obj.email == formdata.emailId);

        if(objUsernameIndex >= 0) {
          showToastMessage('Username Already Exist');
          return;
        }

        if(objMobileIndex >= 0) {
          showToastMessage('Mobile Number Already Exist');
          return;
        }

        if(objEmailIndex >= 0) {
          showToastMessage('Email Id Already Exist');
          return;
        }
      }

      this.corpUsersArr.push(param);
      console.log('corp users array: ', this.corpUsersArr);
      this.corpUserAddFlag = false;
      $("#dttable2").show();
      this.corpUserAccAddForm.reset();
    }
    else{

          console.log('selected items array: ', this.selectedItemsAdd);
          this.tempSelectedItemsAddArr = this.selectedItemsAdd;

          /* to get menu name from array */
          this.selectedItemsAdd.forEach(element => {
            menuname.push(element.menuName);
          });

          /* to get menu name from array */
          this.selectedItemsAccountsAdd.forEach(element => {
            accountNumbers.push(element.accountNo);
          });

          this.corpCompanyMenuArr.forEach(element => {
            if(formdata.menuMapped == element.menuid) {
              menuname = element.menuName;
            }
          });


        this.corpCompanyAccountsArr = []
        this.corpCompanyMenuArr =[]
        this.corpCompanyAccountsArr = this.tempCorpCompanyAccountsArr
        this.corpCompanyMenuArr = this.tempCorpCompanyMenuArr

      if(formdata.role == "2")
      {
        var userRole = "Admin"
        var parentRole = ""
      }
      if(formdata.role == "3")
      {
        var userRole = "Maker"
        var parentRole = "Admin"
      }
      if(formdata.role == "4")
      {
        var userRole = "Checker"
        var parentRole = "Admin"
      }



      if(formdata.role == "2")
      {
         param = {
          "userName": formdata.username,
          "firstName": formdata.fName,
          "lastName": formdata.lName,
          "email": formdata.emailId,
          "mobile": formdata.mobileNo,
          "pancardNo": formdata.panNumber,
          "menuMapped": menuname,
          "accountsMapped": accountNumbers,
          "dob":formdata.dob,
          "passNumber":formdata.passNumber,
          "aadharCardNo":formdata.aadharCardNo,
          "br":formdata.br,
          "coii":formdata.coii,
          "ni":formdata.ni,
          "pass":formdata.pass,
          "ui":formdata.ui,
          "od":formdata.od,
          "role":formdata.role,
          "user":"",
          "userRole":userRole,
          "parentRole":parentRole
        }
      }
      else
      {
         param = {
          "userName": formdata.username,
          "firstName": formdata.fName,
          "lastName": formdata.lName,
          "email": formdata.emailId,
          "mobile": formdata.mobileNo,
          "pancardNo": formdata.panNumber,
          "menuMapped": menuname,
          "accountsMapped": accountNumbers,
          "dob":formdata.dob,
          "passNumber":formdata.passNumber,
          "aadharCardNo":formdata.aadharCardNo,
          "br":formdata.br,
          "coii":formdata.coii,
          "ni":formdata.ni,
          "pass":formdata.pass,
          "ui":formdata.ui,
          "od":formdata.od,
          "role":formdata.role,
          "user":formdata.user,
          "userRole":userRole,
          "parentRole":parentRole

        }
      }

      if(this.corpUsersArr.length > 0) {
        var objUsernameIndex = this.corpUsersArr.findIndex((obj) => obj.userName == formdata.username);
        var objMobileIndex = this.corpUsersArr.findIndex((obj) => obj.mobile == formdata.mobileNo);
        var objEmailIndex = this.corpUsersArr.findIndex((obj) => obj.email == formdata.emailId);

        if(objUsernameIndex >= 0) {
          showToastMessage('Username Already Exist');
          return;
        }

        if(objMobileIndex >= 0) {
          showToastMessage('Mobile Number Already Exist');
          return;
        }

        if(objEmailIndex >= 0) {
          showToastMessage('Email Id Already Exist');
          return;
        }
      }

      if(formdata.role == "3" || formdata.role == "4")
      {
        if(this.corpUsersArr.length==0 || this.corpUsersArr.length==1)
        {
         showToastMessage("Please Add Atleast Two Admin")
         return
        }
        else
        {
          this.corpUsersArr.push(param);
          console.log('corp users array: ', this.corpUsersArr);
          this.corpUserAddFlag = false;
          $("#dttable2").show();
          this.corpUserAccAddForm.reset();
        }
      }
      else
      {
          this.corpUsersArr.push(param);
          console.log('corp users array: ', this.corpUsersArr);
          this.corpUserAddFlag = false;
          $("#dttable2").show();
          this.corpUserAccAddForm.reset();
      }


    }
   }
    else {
      this.formErrors = this.formValidation.validateForm(this.corpUserAccAddForm, this.formErrors, false)
    }

  }

  onCorpUserUpdate(formdata) {

    if(this.corpUserAccEditForm.valid) {
    this.selectedItemsEdit = [];
    this.selectedItemsAccountsEdit = [];
    var menuname = [];
    var accountNo = [];
    console.log('editable item: ', formdata);


    if(formdata.role!=1)
    {
      if(formdata.role==2 || formdata.role==3 || formdata.role==4)
      {
        formdata.menuMapped.forEach(element => {
          var data: any = {
            menuName: element.menuName,
            menuid: element.menuid
          };
          console.log('data: ', data);
          this.selectedItemsEdit.push(data);
          menuname.push(element.menuName);
        });


        formdata.accountsMapped.forEach(element => {
          var data: any = {
            accountNo: element.accountNo,
          };
          console.log('data: ', data);
          this.selectedItemsAccountsEdit.push(data);
          accountNo.push(element.accountNo);
        });
      }


      this.corpUsersArr.forEach(element => {
        if(element.userName == formdata.username) {
          element.firstName = formdata.fName,
          element.lastName = formdata.lName,
          element.email = formdata.emailId,
          element.mobile = formdata.mobileNo,
          element.pancardNo = formdata.panNumber,
          element.menuMapped = menuname,
          element.accountsMapped = accountNo,
          element.dob = formdata.dob,
          element.passNumber = formdata.passNumber,
          // element.nationalId = formdata.nationalId,
          element.aadharCardNo = formdata.aadharCardNo,
          element.br = formdata.br,
          element.coii = formdata.coii,
          element.ni = formdata.ni,
          element.pass = formdata.pass,
          element.ui = formdata.ui,
          element.od = formdata.od,
          element.user = formdata.user
        }

        this.selectedItemsEdit = formdata.menuMapped;
        // this.corpUsersArr.push(element);
      });



      console.log('corp user updated array: ', this.corpUsersArr);
      this.corpUserEditFlag = false;
      $("#dttable2").show();
      this.corpUserAccEditForm.reset();


    }
    else
    {
      this.corpUsersArr.forEach(element => {
        if(element.userName == formdata.username) {
          element.firstName = formdata.fName,
          element.lastName = formdata.lName,
          element.email = formdata.emailId,
          element.mobile = formdata.mobileNo,
          element.pancardNo = formdata.panNumber,
          element.dob = formdata.dob,
          element.passNumber = formdata.passNumber,
          // element.nationalId = formdata.nationalId,
          element.aadharCardNo = formdata.aadharCardNo,
          element.br = formdata.br,
          element.coii = formdata.coii,
          element.ni = formdata.ni,
          element.pass = formdata.pass,
          element.ui = formdata.ui,
          element.od = formdata.od

        }
        // this.corpUsersArr.push(element);
      });
      this.corpUserAccEditForm.addControl('menuMapped', new FormControl('', [Validators.required]));
      this.corpUserAccEditForm.addControl('accountsMapped', new FormControl('', [Validators.required]));

      $('#editmenu').show();
      $('#editacc').show();
      console.log('corp user updated array: ', this.corpUsersArr);
      this.corpUserEditFlag = false;
      $("#dttable2").show();
      this.corpUserAccEditForm.reset();
    }



  }
  else {
    this.formErrors = this.formValidation.validateForm(this.corpUserAccEditForm, this.formErrors, false)
  }
  }

  gotoCorpUsersEdit(item) {

    this.editableItem = item;
    console.log('editable item', this.editableItem);
    this.corpUserEditFlag = true;
    var originalTempMenuArray =[]
    var originalTempAccountArray =[]

    this.selectedItemsEdit = []
    this.selectedItemsAccountsEdit = []

    this.editUserArray = []


    $("#dttable2").hide();
    this.buildForm();
    console.log('item: ', item);

    this.corpUserAccEditForm.patchValue({
      username: item.userName,
      fName: item.firstName,
      lName: item.lastName,
      mobileNo: item.mobile,
      panNumber: item.pancardNo,
      emailId: item.email,
      dob: item.dob,
      passNumber: item.passNumber,
      aadharCardNo: item.aadharCardNo,
      // nationalId: item.nationalId,
      // br:item.br,
      // coii:item.coii,
      // ni:item.ni,
      // pass:item.pass,
      ui:item.ui,
      od:item.od,
      role:item.role,
      user:item.user,
    });

    // this.commonMethod.getBase64FromFile(item.br).subscribe((base64)=>{
    //   this.br = base64;
    // });

    // this.commonMethod.getBase64FromFile(item.coii).subscribe((base64)=>{
    //   this.coii = base64;
    // });

    // this.commonMethod.getBase64FromFile(item.ni).subscribe((base64)=>{
    //   this.ni = base64;
    // });

    // this.commonMethod.getBase64FromFile(item.pass).subscribe((base64)=>{
    //   this.pass = base64;
    // });


      if(item.role=="1")
      {
        this.corpUserAccEditForm.controls["menuMapped"].setValidators([]);
        this.corpUserAccEditForm.controls["accountsMapped"].setValidators([]);
        this.corpUserAccEditForm.controls["menuMapped"].updateValueAndValidity();
        this.corpUserAccEditForm.controls["accountsMapped"].updateValueAndValidity();
        this.corpUserAccEditForm.controls["user"].setValidators([]);
        this.corpUserAccEditForm.controls["user"].updateValueAndValidity();
        this.isUserDisabled = false
        this.isEditDropdownDisabled = true

        this.editAccountArray = []
        this.editmenuArray = []

        this.editAccountArray= this.tempCorpCompanyAccountsArr
        this.editmenuArray= this.tempCorpCompanyMenuArr
      }
      else if(item.role=="2")
      {
       // $('#editUser').hide();
       // this.corpUserAccEditForm.removeControl('user');

       this.corpUserAccEditForm.controls["menuMapped"].setValidators([Validators.required]);
        this.corpUserAccEditForm.controls["accountsMapped"].setValidators([Validators.required]);
        this.corpUserAccEditForm.controls["menuMapped"].updateValueAndValidity();
        this.corpUserAccEditForm.controls["accountsMapped"].updateValueAndValidity();
        this.corpUserAccEditForm.controls["user"].setValidators([]);
        this.corpUserAccEditForm.controls["user"].updateValueAndValidity();
        this.isUserDisabled = false
        this.isEditDropdownDisabled = false

        this.editAccountArray = []
        this.editmenuArray = []


        this.editAccountArray= this.tempCorpCompanyAccountsArr
        this.editmenuArray= this.tempCorpCompanyMenuArr

      }
      else if(item.role=="3" || item.role=="4")
      {
        // $('#editmenu').hide();
        // $('#editacc').hide();
        // $('#editUser').show();
        // this.corpUserAccEditForm.removeControl('menuMapped');
        // this.corpUserAccEditForm.removeControl('accountsMapped');
        // this.corpUserAccEditForm.addControl('user', new FormControl('', [Validators.required]));

        this.isEditDropdownDisabled = false
        this.corpUserAccEditForm.controls["menuMapped"].setValidators([Validators.required]);
        this.corpUserAccEditForm.controls["accountsMapped"].setValidators([Validators.required]);
        this.corpUserAccEditForm.controls["menuMapped"].updateValueAndValidity();
        this.corpUserAccEditForm.controls["accountsMapped"].updateValueAndValidity();

        this.corpUserAccEditForm.controls["user"].setValidators([Validators.required]);
        this.corpUserAccEditForm.controls["user"].updateValueAndValidity();
        this.isUserDisabled = true

        this.editUserArray = []
        var filterUser = this.corpUsersArr
        var data = filterUser.filter(x => x.role == "2")
        this.editUserArray = data

        this.corpUserAccEditForm.patchValue({
          user:item.user
        })

        var objIndex = this.corpUsersArr.findIndex((obj) => obj.userName == item.userName);
        var menuData =  this.corpUsersArr[objIndex].menuMapped
        var accountData = this.corpUsersArr[objIndex].accountsMapped

        this.editAccountArray = []
        this.editmenuArray = []

        originalTempAccountArray = this.tempCorpCompanyAccountsArr
        originalTempMenuArray = this.tempCorpCompanyMenuArr

        console.log('menuData: ', menuData);
        menuData.forEach(element=>
          {
            var objIndex = originalTempMenuArray.findIndex((obj) => obj.menuName == element);
            var param = {
              "menuid": originalTempMenuArray[objIndex].menuid,
              "menuName": originalTempMenuArray[objIndex].menuName,
              "menuDesc": originalTempMenuArray[objIndex].menuDesc,
              "createdon": this.todayDate,
              "updatedby": this.commonData.user_ID
            }
            this.editmenuArray.push(param);
          })

          accountData.forEach(element=>
            {
              var objIndex = originalTempAccountArray.findIndex((obj) => obj.accountNo == element);
              var param = {
                "accountNo": originalTempAccountArray[objIndex].accountNo,
                "createdon": this.todayDate,
                "updatedby": this.commonData.user_ID
              }
              this.editAccountArray.push(param);
            })

      }

      console.log('corp users array: ', this.corpUsersArr);
      console.log('temp corp compnay menu arr: ', this.editmenuArray);
      for(var i=0; i< item.menuMapped.length; i++) {
       var  objIndex1 = this.editmenuArray.findIndex((obj) => obj.menuName.toLowerCase() == item.menuMapped[i].toLowerCase());
        console.log('objIndex value: ', objIndex1);
        if(objIndex1>=0)
        {
          var objMenuId = this.editmenuArray[objIndex1].menuid;
          var objMenuName = this.editmenuArray[objIndex1].menuName;
          var data: any = {
            menuName: objMenuName,
            menuid: objMenuId
          };
          console.log('data: ', data);
          this.selectedItemsEdit.push(data);
        }

      }

      for(var i=0; i< item.accountsMapped.length; i++) {
       var  objIndex2 = this.editAccountArray.findIndex((obj) => obj.accountNo == item.accountsMapped[i]);
        console.log('objIndex value: ', objIndex2);
        if(objIndex2>=0)
        {
          var accountNo = this.editAccountArray[objIndex2].accountNo;
          var data: any = {
            accountNo: accountNo
          };
          console.log('data: ', data);
          this.selectedItemsAccountsEdit.push(data);
        }

      }


      // this.commonMethod.getBase64FromFile(item.ui).subscribe((base64)=>{
      //   this.ui = base64;
      // });

      // this.commonMethod.getBase64FromFile(item.od).subscribe((base64)=>{
      //   this.od = base64;
      // });

      if(item.ui!="" && item.od!="")
      {
        this.commonMethod.getBase64FromFile(item.ui).subscribe((base64)=>{
          this.ui = base64;
       });
       this.commonMethod.getBase64FromFile(item.od).subscribe((base64)=>{
          this.od = base64;
       });
      }
      else if(item.ui!="" && item.od=="") {
        this.commonMethod.getBase64FromFile(item.ui).subscribe((base64)=>{
          this.ui = base64;
       });
       this.od=""
      }
      else if(item.ui=="" && item.od!="") {
        this.commonMethod.getBase64FromFile(item.ui).subscribe((base64)=>{
          this.od = base64;
       });
       this.ui = ""
      }
      else
      {
        this.ui = ""
        this.od=""
      }

  }

  onCancelClick(type) {
    if(type == 'step2') {
      this.corpMenuAddFlag = false;
      this.corpCompanyMenuAddForm.reset();
      $("#dttable").show();
      $('#stp1').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
    else if(type == 'step3') {
      this.corpAccAddFlag = false;
      this.corpCompanyAccAddForm.reset();
      $("#dttable1").show();
      $('#stp1').attr('disabled', 'disabled');
      $('#stp2').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
    else if(type == 'step4CorpUserAdd') {
      this.corpUserAddFlag = false;
      this.corpUserAccAddForm.reset();
      $("#dttable2").show();
      $('#stp1').attr('disabled', 'disabled');
      $('#stp2').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
    }
    else if(type == 'step4CorpUserEdit') {
      this.corpUserEditFlag = false;
      this.selectedItemsEdit = [];
      this.selectedItemsAccountsEdit = [];
      this.corpUserAccEditForm.reset();
      $("#dttable2").show();
      $('#stp1').attr('disabled', 'disabled');
      $('#stp2').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
    }
  }

  /* Method to delete corp company menu in step-2 */
  onCompanyMenuDelete(item) {
    console.log('menuid: ', item.menuid);
    console.log('corp menu master array: ', this.corporateMenuMasterArr);

    this.corporateMenuMasterArr.forEach(element => {
      if(element.id == item.menuid) {
        var objIndex = this.corpCompanyMenuArr.findIndex((obj) => obj.menuid == element.id);
        console.log('index: ', objIndex);
        this.corpCompanyMenuArr.splice(objIndex, 1);
      }
    });

    if(this.corpUsersArr.length>0)
    {
      for(var i = 0 ; i<this.corpUsersArr.length ; i++)
      {
        var menuarray = []
        var finalmenuarray = []
        menuarray = this.corpUsersArr[i].menuMapped

        menuarray.forEach(element=>{
          var objIndex = this.corpCompanyMenuArr.findIndex((obj) => obj.menuName == element);
          if(objIndex>=0)
          {
            finalmenuarray.push(element)
          }
        })

        this.corpUsersArr[i].menuMapped = finalmenuarray


      }
    }
  }

  /* Method to delete corp company account in step-3 */
  onCompanyAccountDelete(item) {
    console.log('account no: ', item.accountNo);

    this.corpCompanyAccountsArr.forEach(element => {
      if(element.accountNo == item.accountNo) {
        var objIndex = this.corpCompanyAccountsArr.findIndex((obj) => obj.accountNo == element.accountNo);
        console.log('index: ', objIndex);
        this.corpCompanyAccountsArr.splice(objIndex, 1);
      }
    });

    if(this.corpUsersArr.length>0)
    {
      for(var i = 0 ; i<this.corpUsersArr.length ; i++)
      {
        var accountarray = []
        var finalaccountarray = []
        accountarray = this.corpUsersArr[i].accountsMapped

        accountarray.forEach(element=>{
          var objIndex = this.corpCompanyAccountsArr.findIndex((obj) => obj.accountNo == element);
          if(objIndex>=0)
          {
            finalaccountarray.push(element)
          }
        })

        this.corpUsersArr[i].accountsMapped = finalaccountarray


      }
    }
  }

  /* Method to delete corp user in step-3 */
  onCorpUserDelete(item) {
    console.log('deletable item: ', item);

    this.corpUsersArr.forEach(element => {
      if(element.userName == item.userName) {
        var objIndex = this.corpUsersArr.findIndex((obj) => obj.userName == element.userName);
        console.log('index: ', objIndex);
        this.corpUsersArr.splice(objIndex, 1);
      }
    });
  }

  /* JS to work step-wizard form in this page which calls on page load */
  getCorpJs() {
    /*=========Wizard Next Previous Script::=========*/

    $(document).ready(function () {
      var navListItems = $("div.setup-panel div a"),
        allWells = $(".setup-content"),
        allNextBtn = $(".nextBtn"),
        allprevBtn = $(".prevBtn");

      allWells.hide();

      navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr("href")),
          $item = $(this);

        if (!$item.hasClass("disabled")) {
          navListItems.removeClass("btn-primary").addClass("btn-default");
          $item.addClass("btn-primary");
          allWells.hide();
          $target.show();
          $target.find("input:eq(0)").focus();
        }
      });

      allNextBtn.click(function () {

        var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $(
            'div.setup-panel div a[href="#' + curStepBtn + '"]'
          )
            .parent()
            .next()
            .children("a"),
          isValid = true;

        if (isValid) {
          nextStepWizard.removeAttr("disabled").trigger("click");
        }
      });
      allprevBtn.click(function () {

        var curStep1 = $(this).closest(".setup-content"),
          curStepBtn1 = curStep1.attr("id"),
          prevStepWizard = $(
            'div.setup-panel div a[href="#' + curStepBtn1 + '"]'
          )
            .parent()
            .prev()
            .children("a"),
          curInputs1 = curStep1.find("input[type='text'],input[type='url']"),
          isValid = true;

        if (isValid) {
          prevStepWizard.removeAttr("disabled").trigger("click");
        }
      });

      $("div.setup-panel div a.btn-primary").trigger("click");

      $("body").on("click", ".setup-content .nextBtn", function () {
        var prevSteps = $(".stepwizard")
          .find(".btn-primary")
          .parent()
          .prevAll("div")
          .find("a");
        prevSteps.addClass("completed");
      });
    });

    /*=========Wizard Next Previous Script End Here::=========*/
  }

  /* Getting dropdown values for corporate company menus */
  getCorporateMenuDetails()
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCorpMenus).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.corporateMenuMasterArr = res.result;
        console.log('Corporate Menu Master array: ', this.corporateMenuMasterArr);
      } else {
        this.commonMethod.hideLoader();
       this.errorCallBack(this.appConstants.getAllCorpMenus, res);
      }

    });
  }

  onStpClicked() {
    $('#stp1').prop("disabled", true);
    $('#stp2').prop("disabled", true);
    $('#stp3').prop("disabled", true);
    $('#stp4').prop("disabled", true);
  }

  /* Method on next button click in each step in step-wizard */
  onNextClick(type) {
    if(type == 'step1') {

        this.isCOIImgError = false;
        this.isMOAImgError = false;
        this.isLogoImgError = false;
        this.isOtherdocsImgError = false;
        this.isValidCOIFileFormat = false;
        this.isValidMOAFileFormat = false;
        this.isValidLogoFileFormat = false;
        this.isValidOtherdocsFileFormat = false;

        // //if(this.corpCompanyRequestsAddForm.get('coi').value == ""){ this.isCOIImgError = true; }
        // if(this.corpCompanyRequestsAddForm.get('moa').value == ""){ this.isMOAImgError = true;}
        // if(this.corpCompanyRequestsAddForm.get('logo').value == ""){ this.isLogoImgError = true;}
        // if(this.corpCompanyRequestsAddForm.get('otherdocs').value == ""){ this.isOtherdocsImgError = true;}

        this.fillObject();
        if(this.corpCompanyRequestsAddForm.valid) {

        //if (this.isMOAImgError == true || this.isLogoImgError == true || this.isCOIImgError == true || this.isOtherdocsImgError == true) { return; }
        if (this.isValidCOIFileFormat || this.isValidMOAFileFormat || this.isValidLogoFileFormat || this.isValidOtherdocsFileFormat) { return; }

        /* New code added */

        if(this.savedCorpCompId == null || this.savedCorpCompId == "" || this.savedCorpCompId == undefined) {
          var param = this.corporateCompanyUserRequestsAddService.saveCompany(this.corpCompanyRequestsAddForm.value,this.images, this.pdf)
          this.commonMethod.showLoader();//this.appConstants.saveToCorpCompMasterData
          this.commonServiceCall.postResponsePromise("OfflineCorpUser/AddCorpMasData",param).subscribe((data) => {
            var res = data.resp;
            if (res.responseCode == "200") {

              this.savedCorpCompId = res.result;
              localStorage.setItem("compId",res.result);
              $('#stp1').attr('disabled', 'disabled');
              $('#stp3').attr('disabled', 'disabled');
              $('#stp4').attr('disabled', 'disabled');
              showToastMessage(res.responseMessage);
              this.commonData.corpUserAddCifValue = this.corpCompanyRequestsAddForm.value.cif
              this.getCorporateMenuDetails();
            } else {
              this.commonMethod.hideLoader();
            this.errorCallBack("OfflineCorpUser/AddCorpMasData", res);
            }
          });
        }
        else {
          var param2 = this.corporateCompanyUserRequestsAddService.updateCompany(this.corpCompanyRequestsAddForm.value,this.images, this.pdf, this.savedCorpCompId)
          this.commonMethod.showLoader();
          this.commonServiceCall.postResponsePromise(this.appConstants.updateCorpCompDataUrl,param2).subscribe((data) => {
            var res = data.resp;
            if (res.responseCode == "200") {
              $('#stp1').attr('disabled', 'disabled');
              $('#stp3').attr('disabled', 'disabled');
              $('#stp4').attr('disabled', 'disabled');
              showToastMessage(res.responseMessage);
              this.getCorporateMenuDetails();
            } else {
              this.commonMethod.hideLoader();
            this.errorCallBack(this.appConstants.updateCorpCompDataUrl, res);
            }
          });
        }
      }
      else {
        this.formErrors = this.formValidation.validateForm(this.corpCompanyRequestsAddForm, this.formErrors, false)
      }
    }
    else if(type == 'step2') {
      var dataarray = []
      var menuarray = []

      dataarray = this.corpCompanyMenuArr;

      console.log('dataarray: ', dataarray);

      dataarray.forEach(element => {
        var array = {
          "corpReqId": 1,
          "menuReqId": element.menuid,
          "menuName": element.menuName,
          "updatedby": this.commonData.user_ID,
          "role_ID": this.commonData.roleTypeId,
          "user_ID": this.commonData.user_ID,
          "subMenu_ID": this.commonData.submenuId,
          "activityName": this.commonData.submenuname,
        }
        menuarray.push(array)
      });
      var params = this.corporateCompanyUserRequestsAddService.saveMenu(menuarray);

      this.commonServiceCall.postResponsePromise(this.appConstants.saveToCorpMenuMap,params).subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          $('#stp1').attr('disabled', 'disabled');
          $('#stp2').attr('disabled', 'disabled');
          $('#stp4').attr('disabled', 'disabled');
          showToastMessage(res.responseMessage);
        } else {
          this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.saveToCorpMenuMap, res);
        }
      });
    }
    else if(type == 'step3') {
      var dataarray = []
      var menuarray = []

      dataarray = this.corpCompanyAccountsArr
      dataarray.forEach(element => {
        var array = {
        "corpReqId": 1,
        "accountNo": element.accountNo,
        "createdon": element.createdon,
        "updatedby": this.commonData.user_ID,
        "role_ID": this.commonData.roleTypeId,
        "user_ID": this.commonData.user_ID,
        "subMenu_ID": this.commonData.submenuId,
        "activityName": this.commonData.submenuname,
        }
        menuarray.push(array)
      });
      var param1 = this.corporateCompanyUserRequestsAddService.saveAccount(menuarray)
      this.commonServiceCall.postResponsePromise(this.appConstants.saveToCorpAccMap,param1).subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          showToastMessage(res.responseMessage);
          $('#stp1').attr('disabled', 'disabled');
          $('#stp2').attr('disabled', 'disabled');
          $('#stp3').attr('disabled', 'disabled');
        } else {
          this.commonMethod.hideLoader();
         this.errorCallBack(this.appConstants.saveToCorpAccMap, res);
        }

    })
  }

    else if(type == 'step2Back') {
      this.corpCompanyMenuForm.reset();
      this.patchForm();
      $('#stp2').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
    else if(type == 'step3Back') {
      this.corpCompanyMenuForm.reset();
      $('#stp1').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
    else if(type == 'step4Back') {
      $('#stp1').attr('disabled', 'disabled');
      $('#stp2').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
  }

  fillObject() {
    this.corpCompanyRequestsFields.corpCompanyName = this.corpCompanyRequestsAddForm.value.corpCompanyName;
    this.corpCompanyRequestsFields.corpCompanyInfo = this.corpCompanyRequestsAddForm.value.corpCompanyInfo;
    this.corpCompanyRequestsFields.cif = this.corpCompanyRequestsAddForm.value.cif;
    this.corpCompanyRequestsFields.rrn = this.corpCompanyRequestsAddForm.value.rrn;
    this.corpCompanyRequestsFields.pancardNo = this.corpCompanyRequestsAddForm.value.pancardNo;
    this.corpCompanyRequestsFields.phoneNo = this.corpCompanyRequestsAddForm.value.phoneNo;
    this.corpCompanyRequestsFields.establishmentOn = this.corpCompanyRequestsAddForm.value.establishmentOn;
    this.corpCompanyRequestsFields.status = this.corpCompanyRequestsAddForm.value.status;
    this.corpCompanyRequestsFields.coi = this.corpCompanyRequestsAddForm.value.coi;
    this.corpCompanyRequestsFields.moa = this.corpCompanyRequestsAddForm.value.moa;
    this.corpCompanyRequestsFields.otherdocs = this.corpCompanyRequestsAddForm.value.otherdocs;
    this.corpCompanyRequestsFields.logo = this.corpCompanyRequestsAddForm.value.logo;
    this.corpCompanyRequestsFields.remark = this.corpCompanyRequestsAddForm.value.remark;
  }

  patchForm() {
    this.corpCompanyRequestsAddForm.patchValue({
      corpCompanyName: this.corpCompanyRequestsFields.corpCompanyName,
      corpCompanyInfo: this.corpCompanyRequestsFields.corpCompanyInfo,
      cif: this.corpCompanyRequestsFields.cif,
      rrn: this.corpCompanyRequestsFields.rrn,
      pancardNo: this.corpCompanyRequestsFields.pancardNo,
      phoneNo: this.corpCompanyRequestsFields.phoneNo,
      establishmentOn: this.corpCompanyRequestsFields.establishmentOn,
      status: this.corpCompanyRequestsFields.status,
      coi: this.corpCompanyRequestsFields.coi,
      moa: this.corpCompanyRequestsFields.moa,
      logo: this.corpCompanyRequestsFields.logo,
      otherdocs: this.corpCompanyRequestsFields.otherdocs,
      remark: this.corpCompanyRequestsFields.remark,
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

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onCompanyChange(event) {
    console.log(event);
    this.corpCompanyId = event.target.value;
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/corpCompanyUserRequests") {
      this.router.navigateByUrl("/corpCompanyUserRequests");
    } else if (
      this.commonServiceCall.makerRequestEditUrl == "/corpMakerRequests"
    ) {
      this.router.navigateByUrl("/corpMakerRequests");
    } else {
      this.router.navigateByUrl("/corpCompanyUserRequests");
    }
  }



  getAccountsMappedData(item) {
    var param = {
      "userReqId": item.id
    };
    this.selModel = "corpAccounts";
    openTinyModel();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getAccountListByCorpUserIdUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.corpUsersAccountsArr = res.result;
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if (res.responseCode == "202"){
        setTimeout(function () {
          $('#dt-sample4').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
      } else {
        this.errorCallBack(this.appConstants.getAccountListByCorpUserIdUrl, res);
      }
      this.commonMethod.hideLoader();
      $('#dt-sample4').DataTable().clear().destroy();
    });
  }

  getMenusMappedData(item) {
    var param = {
      "userReqId": item.id
    };
    this.selModel = "corpMenus";
    openTinyModel();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getMenuListByCorpUserIdUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.corpUsersMenusArr = res.result;
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if (res.responseCode == "202"){
        setTimeout(function () {
          $('#dt-sample5').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
      } else {
        this.errorCallBack(this.appConstants.getMenuListByCorpUserIdUrl, res);
      }
      this.commonMethod.hideLoader();
      $('#dt-sample5').DataTable().clear().destroy();
    });
  }

  closeActionModel(type) {
    if(type == "corpAccounts") {
      $('#dt-sample4').DataTable().clear().destroy();
      closeTinyModel();
    }
    else if(type == "corpMenus") {
      $('#dt-sample5').DataTable().clear().destroy();
      closeTinyModel();
    }
    else if(type == "remarkFieldStp2") {
      this.remarkForm.reset();
      closeTinyModel();
      $('#stp1').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
      $('#stp4').attr('disabled', 'disabled');
    }
    else if(type == "remarkField") {
      this.corpCompanyRequestsAddForm.patchValue({
        corpCompanyName: this.corpCompanyRequestsFields.corpCompanyName,
        corpCompanyInfo: this.corpCompanyRequestsFields.corpCompanyInfo,
        cif: this.corpCompanyRequestsFields.cif,
        rrn: this.corpCompanyRequestsFields.rrn,
        pancardNo: this.corpCompanyRequestsFields.pancardNo,
        phoneNo: this.corpCompanyRequestsFields.phoneNo,
        establishmentOn: this.corpCompanyRequestsFields.establishmentOn,
        status: this.corpCompanyRequestsFields.status,
        coi: this.corpCompanyRequestsFields.coi,
        moa: this.corpCompanyRequestsFields.moa,
        logo: this.corpCompanyRequestsFields.logo,
        otherdocs: this.corpCompanyRequestsFields.otherdocs,
      });
      this.remarkForm.reset();
      closeTinyModel();
    }
    else {
      closeTinyModel();
    }
  }

  openActionModal(formdata) {

    console.log(this.corpCompanyRequestsAddForm.value)
    console.log(this.corpCompanyRequestsFields)
    this.corpUsersReqArr = []

    console.log('corp company menu array final: ', this.corpCompanyMenuArr);
    console.log("iasd",this.images)

    console.log('user',this.corpUsersArr)
    console.log("account",this.corpCompanyAccountsArr)
    // openTinyModel();
    // this.selModel = "remarkField";
    // this.buildForm()
    var accountFinal =[]
    var menuFinal =[]
    var param1 : any

    var ui="";
    var od="";
    this.corpUsersArr.forEach(element => {

      ui="";
      od="";
      var uidata =""
      var oddata = ""
      var usermenuMappedFinal =[]

      element.menuMapped.forEach(elementnew =>{

        var objIndex = this.corpCompanyMenuArr.findIndex((obj) => obj.menuName == elementnew);
        if(objIndex >=0)
        usermenuMappedFinal.push(this.corpCompanyMenuArr[objIndex].menuid)
      })

      if(usermenuMappedFinal.length == 0 || element.accountsMapped.length == 0)
      {
       showToastMessage("Accounts and Menus Mapped For Particular User Can Not Be Null")
       return
      }
      param1 ={
        "companyName": this.corpCompanyRequestsFields.corpCompanyName,
        "companyInfo": this.corpCompanyRequestsFields.corpCompanyInfo,
        "establishmentOn": this.corpCompanyRequestsFields.establishmentOn,
        "companyCode":this.corpCompanyRequestsFields.rrn,
        "logo": this.images.logo.split(',')[1],
        "coi": this.images.coi.split(',')[1],
        "moa": this.images.moa.split(',')[1],
        "otherDoc": this.images.otherdocs.split(',')[1],
        "corporateType": "Limited",
        "cif": this.corpCompanyRequestsFields.cif,
        "updatedBy": this.commonData.user_ID,
        "phoneNo":this.corpCompanyRequestsFields.phoneNo,
        "pancardNo":this.corpCompanyRequestsFields.pancardNo
      }

      if(element.ui!="" && element.od!="")
      {
        this.commonMethod.getBase64FromFile(element.ui).subscribe((base64)=>{
               uidata =  base64
               ui = uidata.split(',')[1];
        })
        this.commonMethod.getBase64FromFile(element.od).subscribe( (base64)=>{
          oddata =  base64
          od = oddata.split(',')[1];

          var param = {
            "userName": element.userName,
            "firstName": element.firstName,
            "lastName": element.lastName,
            "email": element.email,
            "mobile": element.mobile,
            "dob": element.dob,
            "pancardNo": element.pancardNo,
            "corpRoleId": element.role,
            "userRole": element.userRole,
            "parentRole": element.parentRole,
            "passportNo": element.passNumber,
            // "nationalIdNo": element.nationalId,
            "aadharCardNo": element.aadharCardNo,
            "designation": 10,
            "updatedby": this.commonData.user_ID,
            "nationalId":null,
            "passport":null,
            "boardResolution":null,
            "userImage":ui,
            "otherDoc":od,
            "certificateIncorporation":null,
            "menuName": element.menuMapped.join(),
            "menuList":usermenuMappedFinal.join(),
            "accountList":element.accountsMapped.join(),
            "parentUserName":element.user,
            "role_ID": this.commonData.roleTypeId,
            "user_ID": this.commonData.user_ID,
            "subMenu_ID": this.commonData.submenuId,
            "activityName": this.commonData.submenuname

          }
          this.corpUsersReqArr.push(param);
          console.log('corp user data: ', this.corpUsersReqArr);

          if(this.corpUsersArr.length == this.corpUsersReqArr.length)
          {
            this.corpUsersReqArr.sort((a, b)=> a.corpRoleId - b.corpRoleId)
            this.corpCompanyAccountsArr.forEach(element => {
              var param = {
                "accountNo": element.accountNo,
                "updatedby":this.commonData.user_ID,
              }
              accountFinal.push(param)
            })

            this.corpCompanyMenuArr.forEach(element => {
              var param = {
                "menuReqId": element.menuid,
                "updatedby": this.commonData.user_ID,
              }
              menuFinal.push(param)

            })
            /*new code added */
         //  var paramFinal = this.corporateCompanyUserRequestsAddService.save(param1, menuFinal, accountFinal, this.corpUsersReqArr);
         var paramFinal = this.corporateCompanyUserRequestsAddService.saveUser( this.corpUsersReqArr);
         /*new code added */
            console.log(paramFinal)
            this.onSaveCompanyMasterData(paramFinal)
          }
        })
      }
      else if(element.ui=="" && element.od=="")
      {
        od=""
        ui=""
        var param = {
          "userName": element.userName,
          "firstName": element.firstName,
          "lastName": element.lastName,
          "email": element.email,
          "mobile": element.mobile,
          "dob": element.dob,
          "pancardNo": element.pancardNo,
          "corpRoleId": element.role,
          "userRole": element.userRole,
          "parentRole": element.parentRole,
          "passportNo": element.passNumber,
          // "nationalIdNo": element.nationalId,
          "aadharCardNo": element.aadharCardNo,
          "designation": 10,
          "updatedby": this.commonData.user_ID,
          // "nationalId":null,
          "aadharCard":null,
          "passport":null,
          "boardResolution":null,
          "userImage":ui,
          "otherDoc":od,
          "certificateIncorporation":null,
          "menuName": element.menuMapped.join(),
          "menuList":usermenuMappedFinal.join(),
          "accountList":element.accountsMapped.join(),
          "parentUserName":element.user,
          "role_ID": this.commonData.roleTypeId,
          "user_ID": this.commonData.user_ID,
          "subMenu_ID": this.commonData.submenuId,
          "activityName": this.commonData.submenuname
        }
        this.corpUsersReqArr.push(param);
        console.log('corp user data: ', this.corpUsersReqArr);

        if(this.corpUsersArr.length == this.corpUsersReqArr.length)
        {
          this.corpUsersReqArr.sort((a, b)=> a.corpRoleId - b.corpRoleId)
          this.corpCompanyAccountsArr.forEach(element => {
            var param = {
              "accountNo": element.accountNo,
              "updatedby":this.commonData.user_ID,
            }
            accountFinal.push(param)

          })

          this.corpCompanyMenuArr.forEach(element => {
            var param = {
              "menuReqId": element.menuid,
              "updatedby": this.commonData.user_ID,
            }
            menuFinal.push(param)

          })

           /*new code added */
         //  var paramFinal = this.corporateCompanyUserRequestsAddService.save(param1, menuFinal, accountFinal, this.corpUsersReqArr);
         var paramFinal = this.corporateCompanyUserRequestsAddService.saveUser( this.corpUsersReqArr);
            /*new code added */
          console.log(paramFinal)
          this.onSaveCompanyMasterData(paramFinal)
        }
      }
      else if(element.ui!="" && element.od=="")
      {
        od=""
        this.commonMethod.getBase64FromFile(element.ui).subscribe((base64)=>{
          uidata = base64
          ui = uidata.split(',')[1];

          var param = {
            "userName": element.userName,
            "firstName": element.firstName,
            "lastName": element.lastName,
            "email": element.email,
            "mobile": element.mobile,
            "dob": element.dob,
            "pancardNo": element.pancardNo,
            "corpRoleId": element.role,
            "userRole": element.userRole,
            "parentRole": element.parentRole,
            "passportNo": element.passNumber,
            // "nationalIdNo": element.nationalId,
            "aadharCardNo": element.aadharCardNo,
            "designation": 10,
            "updatedby": this.commonData.user_ID,
            // "nationalId":null,
            "aadharCard":null,
            "passport":null,
            "boardResolution":null,
            "userImage":ui,
            "otherDoc":od,
            "certificateIncorporation":null,
            "menuName": element.menuMapped.join(),
            "menuList":usermenuMappedFinal.join(),
            "accountList":element.accountsMapped.join(),
            "parentUserName":element.user,
            "role_ID": this.commonData.roleTypeId,
            "user_ID": this.commonData.user_ID,
            "subMenu_ID": this.commonData.submenuId,
            "activityName": this.commonData.submenuname
          }
          this.corpUsersReqArr.push(param);
          console.log('corp user data: ', this.corpUsersReqArr);

          if(this.corpUsersArr.length == this.corpUsersReqArr.length)
          {
            this.corpUsersReqArr.sort((a, b)=> a.corpRoleId - b.corpRoleId)
            this.corpCompanyAccountsArr.forEach(element => {
              var param = {
                "accountNo": element.accountNo,
                "updatedby":this.commonData.user_ID,
              }
              accountFinal.push(param)

            })

            this.corpCompanyMenuArr.forEach(element => {
              var param = {
                "menuReqId": element.menuid,
                "updatedby": this.commonData.user_ID,
              }
              menuFinal.push(param)

            })
             /*new code added */
         //  var paramFinal = this.corporateCompanyUserRequestsAddService.save(param1, menuFinal, accountFinal, this.corpUsersReqArr);
         var paramFinal = this.corporateCompanyUserRequestsAddService.saveUser( this.corpUsersReqArr);
         /*new code added */
            console.log(paramFinal)
            this.onSaveCompanyMasterData(paramFinal)
          }
        })
      }
      else if(element.ui=="" && element.od!="")
      {
        ui =""
        this.commonMethod.getBase64FromFile(element.od).subscribe((base64)=>{
          oddata = base64
          od = oddata.split(',')[1];

          var param = {
            "userName": element.userName,
            "firstName": element.firstName,
            "lastName": element.lastName,
            "email": element.email,
            "mobile": element.mobile,
            "dob": element.dob,
            "pancardNo": element.pancardNo,
            "corpRoleId": element.role,
            "userRole": element.userRole,
            "parentRole": element.parentRole,
            "passportNo": element.passNumber,
            // "nationalIdNo": element.nationalId,
            "aadharCardNo": element.aadharCardNo,
            "designation": 10,
            "updatedby": this.commonData.user_ID,
            // "nationalId":null,
            "aadharCard":null,
            "passport":null,
            "boardResolution":null,
            "userImage":ui,
            "otherDoc":od,
            "certificateIncorporation":null,
            "menuName": element.menuMapped.join(),
            "menuList":usermenuMappedFinal.join(),
            "accountList":element.accountsMapped.join(),
            "parentUserName":element.user,
            "role_ID": this.commonData.roleTypeId,
            "user_ID": this.commonData.user_ID,
            "subMenu_ID": this.commonData.submenuId,
            "activityName": this.commonData.submenuname
          }
          this.corpUsersReqArr.push(param);
          console.log('corp user data: ', this.corpUsersReqArr);

          if(this.corpUsersArr.length == this.corpUsersReqArr.length)
          {
            this.corpUsersReqArr.sort((a, b)=> a.corpRoleId - b.corpRoleId)
            this.corpCompanyAccountsArr.forEach(element => {
              var param = {
                "accountNo": element.accountNo,
                "updatedby":this.commonData.user_ID,
              }
              accountFinal.push(param)

            })

            this.corpCompanyMenuArr.forEach(element => {
              var param = {
                "menuReqId": element.menuid,
                "updatedby": this.commonData.user_ID,
              }
              menuFinal.push(param)

            })
             /*new code added */
         //  var paramFinal = this.corporateCompanyUserRequestsAddService.save(param1, menuFinal, accountFinal, this.corpUsersReqArr);
         var paramFinal = this.corporateCompanyUserRequestsAddService.saveUser( this.corpUsersReqArr);
         /*new code added */
            console.log(paramFinal)
            this.onSaveCompanyMasterData(paramFinal)
          }
        })
      }
    });
  }

  fetchAccountList(){
    var param = this.corporateCompanyUserRequestsAddService.getAccountsByCif();
    this.accountListUsingCIF(param);
  }

  accountListUsingCIF(param){
    console.log(param);
    var accountdata =[]
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.getAccountsByCif, param)
      .subscribe((data) => {
        var res = data.resp;
        
        var tempdata = res.result.result
        var newdata:any = JSON.parse(tempdata)
        var cbsAccounts:any = newdata.set.records

        if (res.responseCode == "200") {
          this.commonMethod.hideLoader()
          cbsAccounts.forEach(cbselement => {
            

            var objIndex = this.corpCompanyAccountsArr.findIndex(x => x.accountNo == cbselement.accountNo);
            if(objIndex>=0)
            this.isAccountAlreadyExistFlag = true;
            else
            this.isAccountAlreadyExistFlag = false;

      
            if(!this.isAccountAlreadyExistFlag) {
              // this.commonMethod.showLoader();
              var dataarray = []
              var array = {
                "corpReqId": 1,
                "accountNo": cbselement.accountNo,
                "updatedby": this.commonData.user_ID
              }
              var param = {
                "accountNo": cbselement.accountNo,
                "createdon": this.todayDate,
                "updatedby": this.commonData.user_ID
              }
              this.corpCompanyAccountsArr.push(param);
              console.log('corp company accounts array: ', this.corpCompanyAccountsArr);
              this.tempCorpCompanyAccountsArr = this.corpCompanyAccountsArr;
              this.corpAccAddFlag = false;
              $("#dttable1").show();
             // this.corpCompanyAccAddForm.reset();
      
              if(this.corpUsersArr.length>0 && this.corpUsersArr[0].role == 1)
              {
                this.corpCompanyAccountsArr.forEach(element=>
                  {
                    accountdata.push(element.accountNo)
                  })
                this.corpUsersArr[0].accountsMapped = accountdata
              }
            
      
            }
          });
     
    
          
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.saveAllCorpDataUrl, res);
        }
      });
  }

  onSubmitData(formdata) {
    alert(this.corpCompanyRequestsAddForm.value.cif)
    this.commonData.corpUserAddCifValue =  this.corpCompanyRequestsAddForm.value.cif;
    if(this.remarkForm.valid) {
      closeTinyModel();
      this.corpCompanyrequMenuArr = [];
      this.corpCompanyrequAccountsArr = [];
      this.corpUsersReqArr = [];
      this.corpUsersReqMenuMapDataArr = [];
      this.corpUsersReqAccMapDataArr = [];

      /* Pushing data into new arrays which should be similar to requests params */
      this.corpCompanyMenuArr.forEach(element => {
        var param = {
          "corpReqId": element.corpReqId,
          "menuReqId": element.menuReqId,
          "updatedby": element.updatedby
        }
        this.corpCompanyrequMenuArr.push(param);
        console.log('corp menus array:', this.corpCompanyrequMenuArr);
      });

      this.corpCompanyAccountsArr.forEach(element => {
        var param = {
          "corpReqId": element.corpReqId,
          "accountNo": element.accountNo,
          "updatedby": element.updatedby
        }
        this.corpCompanyrequAccountsArr.push(param);
        console.log('corp accounts array:', this.corpCompanyrequAccountsArr);
      });

      this.corpUsersArr.forEach(element => {
        var param = {
          "userName": element.userName,
          "firstName": element.firstName,
          "lastName": element.lastName,
          "email": element.email,
          "mobile": element.mobile,
          "dob": element.dob,
          "pancardNo": element.pancardNo,
          "rrn": element.rrn,
          "corpRoleId": element.corpRoleId,
          // "nationalId": element.nationalId,
          "aadharCard": element.aadharCard,
          "passport": element.passport,
          "passportNo": element.passportNo,
          "boardResolution": element.boardResolution,
          "userImage": element.userImage,
          "aadharCardNo": element.aadharCardNo,
          "otherDoc": element.otherDoc,
          "certificateIncorporation": element.certificateIncorporation,
          "designation": element.designation,
          "parentRrn": element.parentRrn,
          "updatedby": element.updatedby
        }
        this.corpUsersReqArr.push(param);
        console.log('corp user data: ', this.corpUsersReqArr);
      });

      for(var i = 0; i< this.corpUsersArr.length; i++) {

        if(this.corpUsersArr[0].corpUserMenuData) {
          /* Extracted lenghts of user and account map data */
          var corpUserMenuDataLength = this.corpUsersArr[0].corpUserMenuData.length;

          for(var j = 0; j< corpUserMenuDataLength; j++) {
            if(this.corpUsersArr[i].id == this.corpUsersArr[0].corpUserMenuData[j].userReqId) {
              var param1 = {
                "corpCompId": this.corpUsersArr[0].corpUserMenuData[j].corpCompId,
                "corpMenuId": this.corpUsersArr[0].corpUserMenuData[j].menuReqId,
                "corpUserId": this.corpUsersArr[0].corpUserMenuData[j].userReqId,
                "userRrn": this.corpUsersArr[0].corpUserMenuData[j].userRrn,
              };

              this.corpUsersReqMenuMapDataArr.push(param1);
            }
          }
        }

        if(this.corpUsersArr[0].corpUserAccData) {
          var corpUserAccDataLength = this.corpUsersArr[0].corpUserAccData.length;
          for(var k = 0; k< corpUserAccDataLength; k++) {
            if(this.corpUsersArr[i].id == this.corpUsersArr[0].corpUserAccData[k].userReqId) {
              var param2 = {
                "corpCompId": this.corpUsersArr[0].corpUserAccData[k].corpCompId,
                "accountNo": this.corpUsersArr[0].corpUserAccData[k].accountNo,
                "corpUserId": this.corpUsersArr[0].corpUserAccData[k].userReqId,
                "userRrn": this.corpUsersArr[0].corpUserAccData[k].userRrn,
              };

              this.corpUsersReqAccMapDataArr.push(param2);
            }
          }
        }
      }
      console.log('corp user menu mapped data:', this.corpUsersReqMenuMapDataArr);
      console.log('corp user account mapped data:', this.corpUsersReqAccMapDataArr);

      var param = this.corporateCompanyUserRequestsAddService.submitCorpCompanyRequest(this.corpCompanyDetils.id, this.corpCompanyRequestsFields, this.corpCompanyrequMenuArr, this.corpCompanyrequAccountsArr, this.corpUsersReqArr, this.corpUsersReqMenuMapDataArr, this.corpUsersReqAccMapDataArr, this.documentsObj, this.selCorpCompanyRequest, this.remarkForm.value);
      this.onApproveCorpCompany(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  onApproveCorpCompany(param) {
    console.log(param);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.saveAllCorpDataUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200" || res.responseCode == "202") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.cancel();
          showToastMessage(res.responseMessage);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.saveAllCorpDataUrl, res);
        }
      });
  }

  onSaveCompanyMasterData(param) {
    console.log(param);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.saveOfflineCorpUserMasterData, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200" || res.responseCode == "202") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.cancel();
          showToastMessage(res.responseMessage);
        } else {
          showToastMessage(res.responseMessage);
          this.commonMethod.hideLoader();
        }
      });
  }

  getLogoImage(item, type) {
    this.selModel = "Image";
    if(type == 'boardResolution') {
      if (item.br === null || item.br === "" || item.br === undefined) {
        showToastMessage("Board Resolution Image Not Available");
      }
      else {
        this.commonMethod.getBase64FromFile(item.br).subscribe((base64)=>{
          this.displayImage = base64;
          openTinyModel();
        });

      }
    }
    else if(type == 'certificateIncorporation') {
      if (item.coii === null || item.coii === "" || item.coii === undefined) {
        showToastMessage("COI Image Not Available");
      }
      else {
        this.commonMethod.getBase64FromFile(item.coii).subscribe((base64)=>{
          this.displayImage = base64;
          openTinyModel();
      });
    }
    }
    else if(type == 'passport') {
      if (item.pass === null || item.pass === "" || item.pass === undefined) {
        showToastMessage("Passport Image Not Available");
      }
      else {
        this.commonMethod.getBase64FromFile(item.pass).subscribe((base64)=>{
          this.displayImage = base64;
          openTinyModel();
      });
      }
    }
    else if(type == 'aadharCardNo') {
      if (item.ni === null || item.ni === "" || item.ni === undefined) {
        showToastMessage("National ID Image Not Available");
      }
      else {
        this.commonMethod.getBase64FromFile(item.ni).subscribe((base64)=>{
          this.displayImage = base64;
          openTinyModel();
      });
      }
    }
    else if(type == 'userImage') {
      if (item.ui === null || item.ui === "" || item.ui === undefined) {
        showToastMessage("User Image Not Available");
      }
      else {
        this.commonMethod.getBase64FromFile(item.ui).subscribe((base64)=>{
          this.displayImage = base64;
          openTinyModel();
      });
      }
    }
    else if(type == 'otherDoc') {
      if (item.od === null || item.od === "" || item.od === undefined) {
        showToastMessage("Other Document Image Not Available");
      }
      else {
        this.commonMethod.getBase64FromFile(item.od).subscribe((base64)=>{
          this.displayImage = base64;
          openTinyModel();
      });
      }
    }
  }

  addImage(event, type){
    console.log(type);
    console.log(event);
   // this.showSuccess = false;

    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        console.log(file);
        if(event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png" ){
          // this.fileType = 'image';
          console.log('fileType: ', this.fileType);
          const reader = new FileReader();
          reader.onload = (e:any) => {
          var img = new Image();
          var me = this
          img.src = window.URL.createObjectURL( file );
          img.onload = function() {
              console.log(img);
              var width = img.naturalWidth, height = img.naturalHeight;
              // if(width > 380 || height > 180){
              //   if(type == "coi") {
              //     me.isValidCOISizeFileFormat = true;
              //     me.isValidCOIFileFormat = false;
              //   }
              //   else if(type == "moa") {
              //     me.isValidMOASizeFileFormat = true;
              //     me.isValidMOAFileFormat = false;
              //   }
              //   else if(type == "logo") {
              //     me.isValidLogoSizeFileFormat = true;
              //     me.isValidLogoFileFormat = false;
              //   }
              //   else if(type == "otherdocs") {
              //     me.isValidOtherdocsSizeFileFormat = true;
              //     me.isValidOtherdocsFileFormat = false;
              //   }
              //   else if(type == "br") {
              //     me.isValidBRSizeFileFormat = true;
              //     me.isValidBRFileFormat = false;
              //   }
              //   else if(type == "coii") {
              //     me.isValidCOIISizeFileFormat = true;
              //     me.isValidCOIIFileFormat = false;
              //   }
              //   else if(type == "ni") {
              //     me.isValidNISizeFileFormat = true;
              //     me.isValidNIFileFormat = false;
              //   }
              //   else if(type == "pass") {
              //     me.isValidPASSSizeFileFormat = true;
              //     me.isValidPASSFileFormat = false;
              //   }
              //   else if(type == "ui") {
              //     me.isValidUISizeFileFormat = true;
              //     me.isValidUIFileFormat = false;
              //   }
              //   else if(type == "od") {
              //     me.isValidODSizeFileFormat = true;
              //     me.isValidODFileFormat = false;
              //   }
              // }
              // else{
              //   if(type == "coi") {
              //     me.pdf.coi = "";
              //     console.log('coi');
              //     me.coi = e.target.result;
              //     me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
              //       me.images.coi = base64;
              //     });
              //     me.corpCompanyRequestsAddForm.get('coi').setValue(file);
              //     me.isCOIImgError = false;
              //     me.isValidCOISizeFileFormat = false;
              //     me.isValidCOIFileFormat = false;
              //   }
              //   else if(type == "moa") {
              //     me.pdf.moa = "";
              //     console.log('moa');
              //     me.moa = e.target.result;
              //     me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
              //       me.images.moa = base64;
              //     });
              //     me.corpCompanyRequestsAddForm.get('moa').setValue(file);
              //     me.isMOAImgError = false;
              //     me.isValidMOASizeFileFormat = false;
              //     me.isValidMOAFileFormat = false;
              //   }
              //   else if(type == "logo") {
              //     console.log('logo');
              //     me.logo = e.target.result;
              //     me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
              //       me.images.logo = base64;
              //     });
              //     me.corpCompanyRequestsAddForm.get('logo').setValue(file);
              //     me.isLogoImgError = false;
              //     me.isValidLogoSizeFileFormat = false;
              //     me.isValidLogoFileFormat = false;
              //   }
              //   else if(type == "otherdocs") {
              //     me.pdf.otherdocs = "";
              //     console.log('otherdocs');
              //     me.otherdocs = e.target.result;
              //     me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
              //       me.images.otherdocs = base64;
              //     });
              //     me.corpCompanyRequestsAddForm.get('otherdocs').setValue(file);
              //     me.isOtherdocsImgError = false;
              //     me.isValidOtherdocsSizeFileFormat = false;
              //     me.isValidOtherdocsFileFormat = false;
              //   }
              //   else if(type == "br") {
              //     console.log('br');
              //     me.br = e.target.result;
              //     me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
              //       me.images.br = base64;
              //     me.isBRImgError = false;
              //     me.isValidBRSizeFileFormat = false;
              //     me.isValidBRFileFormat = false;
              //     me.corpUserAccAddForm.get('br').setValue(file);
              //     me.corpUserAccEditForm.get('br').setValue(file);
              //     });

              //   }
              //   else if(type == "coii") {
              //     console.log('coii');
              //     me.coii = e.target.result;
              //     me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
              //       me.images.coii = base64;
              //       me.isCOIIImgError = false;
              //       me.isValidCOIISizeFileFormat = false;
              //       me.isValidCOIIFileFormat = false;
              //       me.corpUserAccAddForm.get('coii').setValue(file);
              //       me.corpUserAccEditForm.get('coii').setValue(file);
              //     });

              //   }
              //   else if(type == "ni") {
              //     console.log('ni');
              //     me.ni = e.target.result;
              //     me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
              //       me.images.ni = base64;
              //       me.isNIImgError = false;
              //       me.isValidNISizeFileFormat = false;
              //       me.isValidNIFileFormat = false;
              //       me.corpUserAccAddForm.get('ni').setValue(file);
              //       me.corpUserAccEditForm.get('ni').setValue(file);
              //     });

              //   }
              //   else if(type == "pass") {
              //     console.log('pass');
              //     me.pass = e.target.result;
              //     me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
              //       me.images.pass = base64;
              //       me.isPASSImgError = false;
              //       me.isValidPASSSizeFileFormat = false;
              //       me.isValidPASSFileFormat = false;
              //       me.corpUserAccAddForm.get('pass').setValue(file);
              //       me.corpUserAccEditForm.get('pass').setValue(file);
              //     });

              //   }
              //   else if(type == "ui") {
              //     if(me.corpUserAddFlag) {
              //       console.log("ui");
              //       me.ui = e.target.result;
              //       me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
              //         me.images.ui = base64;
              //       });
              //       me.corpUserAccAddForm.get("ui").setValue(file);
              //       me.isUIImgError = false;
              //       me.isValidUISizeFileFormat = false;
              //       me.isValidUIFileFormat = false;
              //     }
              //     else {
              //       console.log("ui");
              //       me.ui = e.target.result;
              //       me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
              //         me.images.ui = base64;
              //       });
              //       me.corpUserAccEditForm.get("ui").setValue(file);
              //       me.isUIImgError = false;
              //       me.isValidUISizeFileFormat = false;
              //       me.isValidUIFileFormat = false;
              //     }

              //   }
              //   else if(type == "od") {
              //     if(me.corpUserAddFlag) {
              //       console.log("od");
              //       me.od = e.target.result;
              //       me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
              //         me.images.od = base64;
              //       });
              //       me.corpUserAccAddForm.get("od").setValue(file);
              //       me.isODImgError = false;
              //       me.isValidODSizeFileFormat = false;
              //       me.isValidODFileFormat = false;
              //     }
              //     else {
              //       console.log("od");
              //       me.od = e.target.result;
              //       me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
              //         me.images.od = base64;
              //       });
              //       me.corpUserAccEditForm.get("od").setValue(file);
              //       me.isODImgError = false;
              //       me.isValidODSizeFileFormat = false;
              //       me.isValidODFileFormat = false;
              //     }

              //   }
              // }
              if(type == "coi") {
                    me.pdf.coi = "";
                    console.log('coi');
                    me.coi = e.target.result;
                    me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                      me.images.coi = base64;
                    });
                    me.corpCompanyRequestsAddForm.get('coi').setValue(file);
                    me.isCOIImgError = false;
                    me.isValidCOISizeFileFormat = false;
                    me.isValidCOIFileFormat = false;
                    me.showSuccess = false
                  }
              else if(type == "moa") {
                        me.pdf.moa = "";
                        console.log('moa');
                        me.moa = e.target.result;
                        me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                          me.images.moa = base64;
                        });
                        me.corpCompanyRequestsAddForm.get('moa').setValue(file);
                        me.isMOAImgError = false;
                        me.isValidMOASizeFileFormat = false;
                        me.isValidMOAFileFormat = false;
                        me.showSuccessMOA = false
                      }
              else if(type == "logo") {
                if(width > 380 || height > 180){
                  me.isValidLogoSizeFileFormat = true;
                  me.isValidLogoFileFormat = false;
                }
                else
                {
                  console.log('logo');
                  me.logo = e.target.result;
                  me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                    me.images.logo = base64;
                  });
                  me.corpCompanyRequestsAddForm.get('logo').setValue(file);
                  me.isLogoImgError = false;
                  me.isValidLogoSizeFileFormat = false;
                  me.isValidLogoFileFormat = false;
                }
                        
                      }
              else if(type == "otherdocs") {
                            me.pdf.otherdocs = "";
                            console.log('otherdocs');
                            me.otherdocs = e.target.result;
                            me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                              me.images.otherdocs = base64;
                            });
                            me.corpCompanyRequestsAddForm.get('otherdocs').setValue(file);
                            me.isOtherdocsImgError = false;
                            me.isValidOtherdocsSizeFileFormat = false;
                            me.isValidOtherdocsFileFormat = false;
                            me.showSuccessOTHERDOCS = false
                          }
                          else if(type == "od") {
                            me.pdf.od = "";
                            console.log('od');
                            me.od = e.target.result;
                            me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                              me.images.od = base64;
                            });
                            me.corpUserAccAddForm.get('od').setValue(file);
                            me.isODImgError = false;
                            me.isValidODSizeFileFormat = false;
                            me.isValidODFileFormat = false;
                            me.showSuccessOD = false
                          }
                          else if(type == "ui") {
                            if(width > 380 || height > 180){
                              me.isValidUISizeFileFormat = true;
                              me.isValidUIFileFormat = false;
                            }
                            else
                            {
                              console.log('ui');
                              me.ui = e.target.result;
                              me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
                                me.images.ui = base64;
                              });
                              me.corpUserAccAddForm.get('ui').setValue(file);
                              me.isUIImgError = false;
                              me.isValidUISizeFileFormat = false;
                              me.isValidUIFileFormat = false;
                            }
                                    
                                  }

            };
          };
          reader.readAsDataURL(file);
        }
        else if(event.target.files[0].type == "application/pdf") {
          // this.fileType = 'pdf';
          if(event.target.files[0].size / 1024 / 1024 >= 10)
          {
            showToastMessage("This file is to large to upload. The maximum supported file size is 10 MB")
            return
          }
          console.log('fileType: ', this.fileType);
          if (event.target.files.length > 0) {
            if(type=='coi')
            {
              this.isValidCOIFileFormat = false;
              this.isUploadPdf = false;
              this.isCOIImgError = false;

            }
           
            if(type=='moa')
            {
              this.isValidMOAFileFormat = false;
              this.isUploadPdf = false;
              this.isMOAImgError = false
            }
            if(type=='otherdocs')
            {
              this.isValidOtherdocsFileFormat = false;
              this.isUploadPdf = false;
              this.isOtherdocsImgError = false
            }
            if(type=='od')
            {
              this.isValidODFileFormat = false;
              this.isUploadPdf = false;
              this.isODImgError = false
            }

            
            
            console.log(event);
            if (event.target.files && event.target.files[0]) {
              const file = event.target.files[0];
              if (event.target.files[0].name.indexOf(".pdf") == -1) {
                if(type=='coi')
                {
                  this.showSuccess = false;
                  this.isValidCOIFileFormat = true;
                  this.isCOIImgError = true;
                }
                else if(type=='moa')
                {
                  this.showSuccessMOA = false;
                  this.isValidMOAFileFormat = true;
                  this.isMOAImgError = true
                }
                else if(type=='otherdocs')
                {
                  this.showSuccessOTHERDOCS = false;
                  this.isValidOtherdocsFileFormat = true;
                  this.isOtherdocsImgError = true
                }
                if(type=='od')
                {
                  this.showSuccessOD = false;
                  this.isValidODFileFormat = true;
                  this.isODImgError = true
                }
                
                return;
              }
              if(type=='coi')
              this.showSuccess = true;
              if(type=='moa')
              this.showSuccessMOA = true;
              if(type=='otherdocs')
              this.showSuccessOTHERDOCS = true;
              if(type=='od')
              this.showSuccessOD = true;
              const reader = new FileReader();
              reader.onload = (e: any) => {
                var me = this
                const data = reader.result;

                if(type == 'coi') {
                  me.images.coi = "";
                  me.coi = event.target.files[0].name;
                  me.corpCompanyRequestsAddForm.get("coi").setValue(file);
                  me.pdf.coi = reader.result;
                  console.log('me.pdf.coi: ', me.pdf.coi);
                }
                if(type == 'moa') {
                  me.images.moa = "";
                  me.moa = event.target.files[0].name;
                  me.corpCompanyRequestsAddForm.get("moa").setValue(file);
                  me.pdf.moa = reader.result;
                  console.log('me.pdf.moa: ', me.pdf.moa);
                }
                if(type == 'otherdocs') {
                  me.images.otherdocs = "";
                  me.otherdocs = event.target.files[0].name;
                  me.corpCompanyRequestsAddForm.get("otherdocs").setValue(file);
                  me.pdf.otherdocs = reader.result;
                  console.log('me.pdf.otherdocs: ', me.pdf.otherdocs);
                }
                if(type == 'od') {
                  me.images.od = "";
                  me.od = event.target.files[0].name;
                  me.corpUserAccAddForm.get("od").setValue(file);
                  me.pdf.od = reader.result;
                  console.log('me.pdf.od: ', me.pdf.od);
                }
              };
              reader.readAsDataURL(file);
              console.log(this.corpCompanyRequestsAddForm.get('coi').value);
            }
          }
        }
        else if(event.target.files[0].type == "application/zip") {
          // this.fileType = 'pdf';
          if(event.target.files[0].size / 1024 / 1024 >= 10)
          {
            showToastMessage("This file is to large to upload. The maximum supported file size is 10 MB")
            return
          }
          console.log('fileType: ', this.fileType);
          if (event.target.files.length > 0) {
            if(type=='coi')
            {
              this.isValidCOIFileFormat = false;
              this.isUploadPdf = false;
              this.isCOIImgError = false;

            }
           
            if(type=='moa')
            {
              this.isValidMOAFileFormat = false;
              this.isUploadPdf = false;
              this.isMOAImgError = false
            }
            if(type=='otherdocs')
            {
              this.isValidOtherdocsFileFormat = false;
              this.isUploadPdf = false;
              this.isOtherdocsImgError = false
            }
            if(type=='od')
            {
              this.isValidODFileFormat = false;
              this.isUploadPdf = false;
              this.isODImgError = false
            }
            
            
            console.log(event);
            if (event.target.files && event.target.files[0]) {
              const file = event.target.files[0];
              if (event.target.files[0].name.indexOf(".zip") == -1) {
                if(type=='coi')
                {
                  this.showSuccess = false;
                  this.isValidCOIFileFormat = true;
                  this.isCOIImgError = true;
                }
                else if(type=='moa')
                {
                  this.showSuccessMOA = false;
                  this.isValidMOAFileFormat = true;
                  this.isMOAImgError = true
                }
                else if(type=='otherdocs')
                {
                  this.showSuccessOTHERDOCS = false;
                  this.isValidOtherdocsFileFormat = true;
                  this.isOtherdocsImgError = true
                }
                else if(type=='od')
                {
                  this.showSuccessOD = false;
                  this.isValidODFileFormat = true;
                  this.isODImgError = true
                }
                
                return;
              }
              if(type=='coi')
              this.showSuccess = true;
              if(type=='moa')
              this.showSuccessMOA = true;
              if(type=='otherdocs')
              this.showSuccessOTHERDOCS = true;
              if(type=='od')
              this.showSuccessOD = true;
              const reader = new FileReader();
              reader.onload = (e: any) => {
                var me = this
                const data = reader.result;

                if(type == 'coi') {
                  me.images.coi = "";
                  me.coi = event.target.files[0].name;
                  me.corpCompanyRequestsAddForm.get("coi").setValue(file);
                  me.pdf.coi = reader.result;
                  console.log('me.pdf.coi: ', me.pdf.coi);
                }
                if(type == 'moa') {
                  me.images.moa = "";
                  me.moa = event.target.files[0].name;
                  me.corpCompanyRequestsAddForm.get("moa").setValue(file);
                  me.pdf.moa = reader.result;
                  console.log('me.pdf.moa: ', me.pdf.moa);
                }
                if(type == 'otherdocs') {
                  me.images.otherdocs = "";
                  me.otherdocs = event.target.files[0].name;
                  me.corpCompanyRequestsAddForm.get("otherdocs").setValue(file);
                  me.pdf.otherdocs = reader.result;
                  console.log('me.pdf.otherdocs: ', me.pdf.otherdocs);
                }
                if(type == 'od') {
                  me.images.od = "";
                  me.od = event.target.files[0].name;
                  me.corpUserAccAddForm.get("od").setValue(file);
                  me.pdf.od = reader.result;
                  console.log('me.pdf.od: ', me.pdf.od);
                }
              };
              reader.readAsDataURL(file);
              console.log(this.corpCompanyRequestsAddForm.get('coi').value);
            }
          }
        }
        else{
          if(type == "coi") {
            this.isCOIImgError = true
            this.isValidCOIFileFormat = true;
            this.isValidCOISizeFileFormat = false;
            this.showSuccess = false
          }
          else if(type == "moa") {
            this.isMOAImgError = true
            this.isValidMOAFileFormat = true;
            this.isValidMOASizeFileFormat = false;
            this.showSuccessMOA = false
          }
          else if(type == "logo") {
            this.isLogoImgError = true
            this.isValidLogoFileFormat = true;
            this.isValidLogoSizeFileFormat = false;
          }
          else if(type == "otherdocs") {
            this.isOtherdocsImgError = true
            this.isValidOtherdocsFileFormat = true;
            this.isValidOtherdocsSizeFileFormat = false;
            this.showSuccessOTHERDOCS = false
          }
          else if(type == "br") {
            this.isValidBRFileFormat = true;
            this.isValidBRSizeFileFormat = false;
          }
          else if(type == "coii") {
            this.isValidCOIIFileFormat = true;
            this.isValidCOIISizeFileFormat = false;
          }
          else if(type == "ni") {
            this.isValidNIFileFormat = true;
            this.isValidNISizeFileFormat = false;
          }
          else if(type == "pass") {
            this.isValidPASSFileFormat = true;
            this.isValidPASSSizeFileFormat = false;
          }
          else if(type == "ui") {
            this.isUIImgError = true
            this.isValidUIFileFormat = true;
            this.isValidUISizeFileFormat = false;
          }
          else if(type == "od") {
            this.isODImgError = true
            this.isValidODFileFormat = true;
            this.isValidODSizeFileFormat = false;
            this.showSuccessOD = false
          }
          return;
        }
    }
  }

  addPdfFile(event, type) {
    console.log(event);
    if (event.target.files.length > 0) {
      this.isValidCOIFileFormat = false;
      this.isUploadPdf = false;
      console.log(event);
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (event.target.files[0].name.indexOf(".pdf") == -1) {
          this.showSuccess = false;
          this.isValidCOIFileFormat = true;
          return;
        }
        this.showSuccess = true;
        this.coi = event.target.files[0].name;
        this.corpCompanyRequestsAddForm.get("coi").setValue(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          let workBook = null;
          let jsonData = null;
          const data = reader.result;
          console.log('data: ', data);
          // workBook = XLSX.read(data, { type: "binary" });
          // jsonData = workBook.SheetNames.reduce((initial, name) => {
          //   const sheet = workBook.Sheets[name];
          //   initial[name] = XLSX.utils.sheet_to_json(sheet);
          //   return initial;
          // }, {});
        };
        reader.readAsDataURL(file);
        console.log(this.corpCompanyRequestsAddForm.get('coi').value);
      }
    }
  }

  onRoleChange(value)
  {
    switch(value) {
      case "1":
          this.isDropdownDisabled = true
          $('#addUser').hide()
          this.corpUserAccAddForm.controls["user"].setValidators([]);
          this.corpUserAccAddForm.controls["user"].updateValueAndValidity();
          this.selectedItemsAdd = []
          this.selectedItemsAccountsAdd = []
          this.corpUserAccAddForm.controls["menuMapped"].setValidators([]);
          this.corpUserAccAddForm.controls["accountsMapped"].setValidators([]);
          this.corpUserAccAddForm.controls["menuMapped"].updateValueAndValidity();
          this.corpUserAccAddForm.controls["accountsMapped"].updateValueAndValidity();
          console.log(this.corpUserAccAddForm)
      break;
      case "2":
          this.corpCompanyAccountsArr = []
          this.corpCompanyMenuArr =[]
          this.selectedItemsAdd = []
          this.selectedItemsAccountsAdd = []
          this.corpCompanyAccountsArr = this.tempCorpCompanyAccountsArr
          this.corpCompanyMenuArr = this.tempCorpCompanyMenuArr
          this.isDropdownDisabled = false
          this.corpUserAccAddForm.controls["menuMapped"].setValidators([Validators.required]);
          this.corpUserAccAddForm.controls["accountsMapped"].setValidators([Validators.required]);
          this.corpUserAccAddForm.controls["menuMapped"].updateValueAndValidity();
          this.corpUserAccAddForm.controls["accountsMapped"].updateValueAndValidity();
          $('#addUser').hide()
          this.corpUserAccAddForm.controls["user"].setValidators([]);
          this.corpUserAccAddForm.controls["user"].updateValueAndValidity();
          console.log(this.corpUserAccAddForm)

      break;
      case "3":
      case "4":
          this.selectedItemsAdd = []
          this.selectedItemsAccountsAdd = []
        if(localStorage.getItem('isregulator') == "N")
        {
           if(this.corpUsersArr.length==0)
          {
           showToastMessage("Please Add Atleast Two Admin")
           return
          }
          else if(this.corpUsersArr.length==1)
          {
           showToastMessage("Please Add Atleast Two Admin")
           return
          }

          else
          {

           this.isDropdownDisabled = true
           this.corpUserAccAddForm.controls["menuMapped"].setValidators([]);
           this.corpUserAccAddForm.controls["accountsMapped"].setValidators([]);
           this.corpUserAccAddForm.controls["menuMapped"].updateValueAndValidity();
           this.corpUserAccAddForm.controls["accountsMapped"].updateValueAndValidity();

           this.corpUserAccAddForm.controls["user"].setValidators([Validators.required]);
           this.corpUserAccAddForm.controls["user"].updateValueAndValidity();
           $('#addUser').show()
          }
        }
        else
        {
          if(this.corpUsersArr.length==0)
          {
           showToastMessage("Please Add Atleast One Regulator")
           return
          }
          else if(this.corpUsersArr.length==1)
          {
           showToastMessage("Please Add Atleast Two Admin")
           return
          }
          else if(this.corpUsersArr.length==2)
          {
           showToastMessage("Please Add Atleast Two Admin")
           return
          }

          else
          {

           this.isDropdownDisabled = true
           this.corpUserAccAddForm.controls["menuMapped"].setValidators([]);
           this.corpUserAccAddForm.controls["accountsMapped"].setValidators([]);
           this.corpUserAccAddForm.controls["menuMapped"].updateValueAndValidity();
           this.corpUserAccAddForm.controls["accountsMapped"].updateValueAndValidity();

           this.corpUserAccAddForm.controls["user"].setValidators([Validators.required]);
           this.corpUserAccAddForm.controls["user"].updateValueAndValidity();
           $('#addUser').show()
          }
        }

         break;
    }
  }

  filterUser()
  {
    var filterUser = this.corpUsersArr
    return filterUser.filter(x => x.role == "2")
  }

  filterRole()
  {
    return this.roleMaster
  }

  onRegulatorChange(value)
  {
    this.selectedItemsAdd = []
    this.selectedItemsAccountsAdd = []
    switch(value) {
      case "Y":
      this.roleMaster = []
      this.roleMaster = this.roleTempMaster
      localStorage.setItem('isregulator','Y')

      this.corpUserAccAddForm.patchValue({
        role:'1'
      })

      this.isDropdownDisabled = true
      $('#addUser').hide()
      this.corpUserAccAddForm.controls["user"].setValidators([]);
      this.corpUserAccAddForm.controls["user"].updateValueAndValidity();
      this.selectedItemsAdd = this.corpCompanyMenuArr;
      this.selectedItemsAccountsAdd = this.corpCompanyAccountsArr;
      this.corpUserAccAddForm.controls["menuMapped"].setValidators([]);
      this.corpUserAccAddForm.controls["accountsMapped"].setValidators([]);
      this.corpUserAccAddForm.controls["menuMapped"].updateValueAndValidity();
      this.corpUserAccAddForm.controls["accountsMapped"].updateValueAndValidity();
      console.log(this.corpUserAccAddForm)


      break;
      case "N":
      localStorage.setItem('isregulator','N')
       this.roleMaster = []
       var data = this.roleTempMaster
       data.forEach(element=>{
         if(element.id!="1")
         {
          this.roleMaster.push(element)
         }
       })
       this.corpUserAccAddForm.patchValue({
        role:'2'
      })
          this.corpCompanyAccountsArr = []
          this.corpCompanyMenuArr =[]
          this.corpCompanyAccountsArr = this.tempCorpCompanyAccountsArr
          this.corpCompanyMenuArr = this.tempCorpCompanyMenuArr
          this.isDropdownDisabled = false
          this.corpUserAccAddForm.controls["menuMapped"].setValidators([Validators.required]);
          this.corpUserAccAddForm.controls["accountsMapped"].setValidators([Validators.required]);
          this.corpUserAccAddForm.controls["menuMapped"].updateValueAndValidity();
          this.corpUserAccAddForm.controls["accountsMapped"].updateValueAndValidity();
          $('#addUser').hide()
          this.corpUserAccAddForm.controls["user"].setValidators([]);
          this.corpUserAccAddForm.controls["user"].updateValueAndValidity();
      break;
    }
  }

  onUserChange(value)
  {
    this.corpCompanyAccountsArr = []
    this.corpCompanyMenuArr =[]
    this.selectedItemsAdd = []
    this.selectedItemsAccountsAdd = []
    this.selectedItemsEdit = []
    this.selectedItemsAccountsEdit =[]
    this.editmenuArray = []
    this.editAccountArray =[]
    this.isDropdownDisabled = false
    this.corpUserAccAddForm.controls["menuMapped"].setValidators([Validators.required]);
    this.corpUserAccAddForm.controls["accountsMapped"].setValidators([Validators.required]);
    this.corpUserAccAddForm.controls["menuMapped"].updateValueAndValidity();
    this.corpUserAccAddForm.controls["accountsMapped"].updateValueAndValidity();

    var objIndex = this.corpUsersArr.findIndex((obj) => obj.userName == value);
    var menuData =  this.corpUsersArr[objIndex].menuMapped
    var accountData = this.corpUsersArr[objIndex].accountsMapped

    console.log('menuData: ', menuData);
    console.log('accountData: ', accountData);
    console.log('tempCorpCompanyMenuArr: ', this.tempCorpCompanyMenuArr);
    menuData.forEach(element=>
    {
      var objIndex = this.tempCorpCompanyMenuArr.findIndex((obj) => obj.menuName == element);
      var param = {
        "menuid": this.tempCorpCompanyMenuArr[objIndex].menuid,
        "menuName": this.tempCorpCompanyMenuArr[objIndex].menuName,
        "menuDesc": this.tempCorpCompanyMenuArr[objIndex].menuDesc,
        "createdon": this.todayDate,
        "updatedby": this.commonData.user_ID
      }
      this.corpCompanyMenuArr.push(param);
      this.editmenuArray.push(param);
    })

    accountData.forEach(element=>
      {
        var objIndex = this.tempCorpCompanyAccountsArr.findIndex((obj) => obj.accountNo == element);
        var param = {
          "accountNo": this.tempCorpCompanyAccountsArr[objIndex].accountNo,
          "createdon": this.todayDate,
          "updatedby": this.commonData.user_ID
        }
        this.corpCompanyAccountsArr.push(param);
        this.editAccountArray.push(param);
      })


  }

  onMenuChange(value)
  {
    var objIndex = this.corporateMenuMasterArr.findIndex((obj) => obj.id == value);
    var desc = this.corporateMenuMasterArr[objIndex].menuName
    this.corpCompanyMenuAddForm.patchValue({
      menuDesc: desc
    })
  }

  onImgDelete(type, formType) {

    if(type == 'ui') {
      this.ui = "";
      this.images.ui = "";


      if(formType == 'addForm') {
        this.corpUserAccAddForm.get('ui').reset();
      }
      else {
        var  objIndex = this.corpUsersArr.findIndex((obj) => obj.userName == this.editableItem.userName);
        if(objIndex >= 0) {
          this.corpUsersArr[objIndex].ui = "";
        }
        console.log('Corporate Users Array after delete ui: ', this.corpUsersArr);
      }

      // this.corpUsersArr.forEach(element => {
      //   if(element.userName == this.editableItem.userName) {
      //   }
      // });

      // for(var i = 0; i< this.corpUsersArr.length; i++) {
      //   if(this.corpUsersArr[i].userName == this.editableItem.username) {
      //     this.corpUsersArr[i].ui = "";
      //   }
      // }
    }
    else {
      this.od = "";
      this.images.od = "";
      var  objIndex = this.corpUsersArr.findIndex((obj) => obj.userName == this.editableItem.userName);
      if(objIndex >= 0) {
        this.corpUsersArr[objIndex].od = "";
      }
      console.log('Corporate Users Array after delete od: ', this.corpUsersArr);
      // this.corpUsersArr.forEach(element => {
      //   if(element.userName == this.editableItem.userName) {
      //     element.od = "";
      //   }
      // });

      // for(var i = 0; i< this.corpUsersArr.length; i++) {
      //   if(this.corpUsersArr[i].userName == this.editableItem.username) {
      //     this.corpUsersArr[i].od = "";
      //   }
      // }
      // if(formType == 'addForm') {
      //   this.corpUserAccAddForm.get('od').reset();
      // }
      // else {
      //   this.corpUserAccEditForm.get('od').reset();
      // }
    }
  }

  checkEmail()
  {
    
    if(this.corpUserAccAddForm.get('emailId').valid)
    {
      var Email = this.corpUserAccAddForm.value.emailId
      var param = this.corporateCompanyUserRequestsAddService.checkEmail(Email)
      this.commonServiceCall
      .postResponsePromise("corporate/checkEmailExist", param)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
         this.emailExist = true
        } else {
          this.emailExist = false
          this.commonMethod.hideLoader();
         // this.errorCallBack("corporate/checkEmailExist", res);
        }
      });
    }
  }
}
