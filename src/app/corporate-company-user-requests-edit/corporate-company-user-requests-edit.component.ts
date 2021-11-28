import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { DatePipe, Location } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { CorporateCompanyUserRequestsEditService } from "./corporate-company-user-requests-edit.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare function openTinyModel1(): any;
declare function closeTinyModel1(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-corporate-company-user-requests-edit",
  templateUrl: "./corporate-company-user-requests-edit.component.html",
  styleUrls: ["./corporate-company-user-requests-edit.component.css"],
})
export class CorporateCompanyUserRequestsEditComponent implements OnInit {

  corpCompanyRequestsEditForm: FormGroup;
  corpCompanyMenuAddForm: FormGroup;
  deleteUserForm: FormGroup;
  corpMenuAddFlag: any = false;
  remarkForm: FormGroup;
  selModel: any;
  displayImage: any;
  selectedCorpUserToEdit: any;
  selectedUserToDelete: any;
  roleId: any;
  selectedRoleData: any = {
    selectedRoleId: "",
    selectedRoleName: ""
  };

  selectedUserParentData: any = {
    parentId: "",
    parentRoleId: "",
    parentRrn: "",
    designation: "",
  }

  corpCompanyId: any;
  corpCompanyDetils: any;
  todayDate: any;
  isUserDisabled:boolean=true;
  approvRejectValue: any;
  selCorpCompanyRequest: any = [];
  remarkHistoryArr: any = [];
  corpCompanyMenuArr: any = [];
  corpCompanyAccountsArr: any = [];
  corpUsersArr: any = [];
  corpUsersDeleteDropdownArr: any = [];
  corpUsersAccountsArr: any = [];
  corpUsersMenusArr: any = [];
  corporateMenuMasterArr: any = [];

  isMenuAlreadyExistFlag: boolean = false;
  tempCorpCompanyMenuArr: any = [];
  tempCorpCompanyAccountsArr: any = [];

  corpCompanyAccAddForm: FormGroup;
  corpAccAddFlag: any = false;
  isAccountAlreadyExistFlag: boolean = false;

  corpUserAccAddForm: FormGroup;
  corpUserAddFlag: any = false;
  corpUserAccEditForm: FormGroup;
  corpUserEditFlag: any = false;
  isUserAlreadyExistFlag: boolean = false;

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
  roleMaster:any=[];
  roleTempMaster:any=[];

  /* these arrays are specially created as per requests parameters */
  corpCompanyrequMenuArr: any = [];
  corpCompanyrequAccountsArr: any = [];
  corpUsersReqArr: any = [];
  corpUsersReqMenuMapDataArr: any = [];
  corpUsersReqAccMapDataArr: any = [];

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

  isUIImgError: boolean = true;
  isValidUISizeFileFormat: boolean = false;
  isValidUIFileFormat: boolean = false;

  isODImgError: boolean = true;
  isValidODSizeFileFormat: boolean = false;
  isValidODFileFormat: boolean = false;

  selectedItemsEdit: any = [];
  selectedItemsAccountsEdit: any = [];
  editmenuArray = [];
  editAccountArray =[];
  editUserArray = [];
  selectedItemsAdd: any = [];
  selectedItemsAccountsAdd: any = [];
  tempSelectedItemsAddArr: any = [];

  images = {
    coi: "",
    moa: "",
    logo: "",
    otherdocs: "",
    br:'',
    coii:'',
    ni:'',
    pass:'',
    ui:'',
    od:''
  };

  documentsObj = {
    coi: "",
    moa: "",
    pancard: "",
    logo: "",
    otherdocs: "",
  };

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
    regulator: "",
    selAdmin: "",
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
    remark: "",
  };

  dropdownSettings: IDropdownSettings;
  dropdownSettingsAccounts: IDropdownSettings;
  isDropdownDisabled: boolean = false;
  isEditDropdownDisabled: boolean = false;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe,
    private corporateCompanyUserRequestsEditService: CorporateCompanyUserRequestsEditService,
    public location: Location
  ) {}

  /* Method used for form validations */
  public buildForm() {
    this.corpCompanyRequestsEditForm = this.form.group({
      corpCompanyName: new FormControl("", [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      corpCompanyInfo: new FormControl("", [Validators.required]),
      rrn: new FormControl("", [Validators.required]),
      cif: new FormControl("", [Validators.required]),
      coi: new FormControl(""),
      moa: new FormControl(""),
      otherdocs: new FormControl(""),
      logo: new FormControl(""),
      pancardNo: new FormControl("", [Validators.required]),
      phoneNo: new FormControl("", [Validators.required]),
      establishmentOn: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      remark: new FormControl(""),
    });
    this.corpCompanyRequestsEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.corpCompanyRequestsEditForm,
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

    if (this.selModel == "adminDelete") {
      this.deleteUserForm = this.form.group({
        selAdmin: new FormControl("", [Validators.required]),
      });
      this.deleteUserForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.deleteUserForm,
          this.formErrors,
          true
        );
      });
    }

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
        accNo: new FormControl("", [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(18),
          Validators.pattern(/^[1-9]\d*$/)
        ]),
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
        username: new FormControl("", [
          Validators.required,
          Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/),
        ]),
        fName: new FormControl("", [
          Validators.required
        ]),
        lName: new FormControl("", [
          Validators.required
        ]),
        emailId: new FormControl("", [
          Validators.required,
          Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/),
        ]),
        mobileNo: new FormControl("", [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[6-9]\d{9}$/)
        ]),
        panNumber: new FormControl("", [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
          Validators.maxLength(10),
        ]),
        menuMapped: new FormControl(""),
        accountsMapped: new FormControl(""),
        dob: new FormControl("", [Validators.required]),
        passNumber: new FormControl("", [
          Validators.required,
          Validators.pattern(/^(?!^0+$)[a-zA-Z0-9]{6,9}$/),
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
        // nationalId: new FormControl("", [Validators.required]),
        aadharCardNo: new FormControl("", [Validators.required, Validators.minLength(12)]),
        br: new FormControl(""),
        coii: new FormControl(""),
        ni: new FormControl(""),
        pass: new FormControl(""),
        ui: new FormControl(""),
        od: new FormControl(""),
        role: new FormControl("", [Validators.required]),
        regulator: new FormControl(""),
        user: new FormControl(""),
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
        username: new FormControl("", [
          Validators.required,
          Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/),
        ]),
        fName: new FormControl("", [
          Validators.required
        ]),
        lName: new FormControl("", [
          Validators.required
        ]),
        emailId: new FormControl("", [
          Validators.required,
          Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/),
        ]),
        mobileNo: new FormControl("", [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[6-9]\d{9}$/)
        ]),
        panNumber: new FormControl("", [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
          Validators.maxLength(10),
        ]),
        menuMapped: new FormControl("", [Validators.required]),
        accountsMapped: new FormControl("", [Validators.required]),
        dob: new FormControl("", [Validators.required]),
        passNumber: new FormControl("", [
          Validators.required,
          Validators.pattern(/^(?!^0+$)[a-zA-Z0-9]{6,9}$/),
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
        // nationalId: new FormControl("", [Validators.required]),
        aadharCardNo: new FormControl("", [Validators.required, Validators.minLength(12)]),
        br: new FormControl(""),
        coii: new FormControl(""),
        ni: new FormControl(""),
        pass: new FormControl(""),
        ui: new FormControl(""),
        od: new FormControl(""),
        role: new FormControl("", [Validators.required]),
        user: new FormControl("", [Validators.required]),
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

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/corpCompanyUserRequests');
      return;
    }

    this.commonServiceCall.pageName = "Corporate Company Offline Registration Edit";
    this.corpCompanyDetils = this.location.getState();
    console.log(this.corpCompanyDetils);
    this.getCorpJs();
    this.getCorpCompanyRequestsById(this.corpCompanyDetils.id);
    this.getRemarkHistoryData(this.corpCompanyDetils.id)
    this.buildForm();
    this.getStatus();
    this.todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");

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


  this.roleTempMaster = [
      {
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
      this.corpCompanyRequestsEditForm.controls["remark"].setValidators([Validators.required]);
      this.corpCompanyRequestsEditForm.controls["remark"].updateValueAndValidity();
    }
    else {

      $('#companyRemark').hide();
      this.corpCompanyRequestsEditForm.controls["remark"].setValidators([]);
      this.corpCompanyRequestsEditForm.controls["remark"].updateValueAndValidity();
    }
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/" + this.commonData.submenuId).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.remarkHistoryArr = res.result;
        this.commonMethod.hideLoader();
      } else if(res.responseCode == "202") {
        showToastMessage('No Remark History Found');
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
      }
    });
  }

  /* Method related to corporate company menu add form */
  goToCorpCompanyMenuAddForm() {
    $("#dttable").hide();
    this.corpMenuAddFlag = true;
    this.buildForm();
  }

  /* Method called on cancel click of the page */
  onCancelClick(type) {
    if (type == "step2") {
      this.corpMenuAddFlag = false;
      this.corpCompanyMenuAddForm.reset();
      $("#dttable").show();
      $("#stp1").attr("disabled", "disabled");
      $("#stp3").attr("disabled", "disabled");
      $("#stp4").attr("disabled", "disabled");
    } else if (type == "step3") {
      this.corpAccAddFlag = false;
      this.corpCompanyAccAddForm.reset();
      $("#dttable1").show();
      $("#stp1").attr("disabled", "disabled");
      $("#stp2").attr("disabled", "disabled");
      $("#stp4").attr("disabled", "disabled");
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
      // this.corpUserAccEditForm.get('ui').setValue("");
      // this.corpUserAccEditForm.get('od').setValue("");
      $("#dttable2").show();
      $('#stp1').attr('disabled', 'disabled');
      $('#stp2').attr('disabled', 'disabled');
      $('#stp3').attr('disabled', 'disabled');
      var param = this.corporateCompanyUserRequestsEditService.getCorpCompanyIdCall(
        this.corpCompanyDetils.id
      );
      this.getCorpMenuAndAccountsByCompId(param);
    }
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

  /* On load functions */
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

  /* get corporate company request data by id. It call on page load */
  getCorpCompanyRequestsById(id) {
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getOfflineCorpCompDataByIdUrl;
    var param = this.corporateCompanyUserRequestsEditService.getCorpCompanyReqDetailByIdCall(
      id
    );

    this.commonServiceCall
      .postResponsePromise(reqUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        this.selCorpCompanyRequest = res.result[0];
        console.log("updatable data response: ", this.selCorpCompanyRequest);

        this.coi = "data:image/jpg;base64," + this.selCorpCompanyRequest.coi;
        this.images.coi =
          "data:image/jpg;base64," + this.selCorpCompanyRequest.coi;

        this.moa = "data:image/jpg;base64," + this.selCorpCompanyRequest.moa;
        this.images.moa =
          "data:image/jpg;base64," + this.selCorpCompanyRequest.moa;

        this.logo = "data:image/jpg;base64," + this.selCorpCompanyRequest.logo;
        this.images.logo =
          "data:image/jpg;base64," + this.selCorpCompanyRequest.logo;

        this.otherdocs =
          "data:image/jpg;base64," + this.selCorpCompanyRequest.otherDoc;
        this.images.otherdocs =
          "data:image/jpg;base64," + this.selCorpCompanyRequest.otherDoc;

        if (res.responseCode == "200") {
          if (res.result[0].userAction != null) {
            this.corpCompanyRequestsEditForm.patchValue({
              corpCompanyName: res.result[0].companyName,
              corpCompanyInfo: res.result[0].companyInfo,
              rrn: res.result[0].companyCode,
              cif: res.result[0].cif,
              coi: this.coi,
              moa: this.moa,
              logo: this.logo,
              otherdocs: this.otherdocs,
              pancardNo: res.result[0].pancardNo,
              phoneNo: res.result[0].phoneNo,
              establishmentOn: this.datePipe.transform(
                this.selCorpCompanyRequest.establishmentOn,
                "yyyy-MM-dd"
              ),
              status: res.result[0].userAction,
            });
          } else {
            this.corpCompanyRequestsEditForm.patchValue({
              corpCompanyName: res.result[0].companyName,
              corpCompanyInfo: res.result[0].companyInfo,
              rrn: res.result[0].companyCode,
              cif: res.result[0].cif,
              coi: res.result[0].coi,
              moa: res.result[0].moa,
              logo: res.result[0].logo,
              otherdocs: res.result[0].otherDoc,
              pancardNo: res.result[0].pancardNo,
              phoneNo: res.result[0].phoneNo,
              establishmentOn: this.datePipe.transform(
                this.selCorpCompanyRequest.establishmentOn,
                "yyyy-MM-dd"
              ),
              status: res.result[0].statusId,
            });
          }
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(
            this.appConstants.getOfflineCorpCompDataByIdUrl,
            res
          );
        }
      });
  }

  /* Method to update corp company details in step-1 */
  updateCorporateCompanyDetails(param) {
    console.log(this.corpCompanyRequestsEditForm);
    console.log(param);

    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateCorpCompDataUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          $("#stp1").attr("disabled", "disabled");
          $("#stp3").attr("disabled", "disabled");
          $("#stp4").attr("disabled", "disabled");
          console.log(res);
          showToastMessage(res.responseMessage);

          var param = this.corporateCompanyUserRequestsEditService.getCorpCompanyIdCall(
            this.corpCompanyDetils.id
          );
          this.getCorpMenuAndAccountsByCompId(param);

          this.getCorporateMenuDetails();
        } else {
          showToastMessage(res.responseMessage);
        }
        this.commonMethod.hideLoader();
      });
  }

  /* Method on next button click in each step in step-wizard */
  onNextClick(type) {
    if (type == "step1") {
      console.log('corpCompanyRequestsEditForm: ', this.corpCompanyRequestsEditForm);
      if (this.corpCompanyRequestsEditForm.valid) {
        this.isCOIImgError = false;
        this.isMOAImgError = false;
        this.isLogoImgError = false;
        this.isOtherdocsImgError = false;
        this.isValidCOIFileFormat = false;
        this.isValidMOAFileFormat = false;
        this.isValidLogoFileFormat = false;
        this.isValidOtherdocsFileFormat = false;

        if (this.corpCompanyRequestsEditForm.get("coi").value == "") {
          this.isCOIImgError = true;
        }
        if (this.corpCompanyRequestsEditForm.get("moa").value == "") {
          this.isMOAImgError = true;
        }
        if (this.corpCompanyRequestsEditForm.get("logo").value == "") {
          this.isLogoImgError = true;
        }
        if (this.corpCompanyRequestsEditForm.get("otherdocs").value == "") {
          this.isOtherdocsImgError = true;
        }
        this.fillObject();

        var param1 = this.corporateCompanyUserRequestsEditService.getCorpCompanyEditCall(
          this.corpCompanyDetils.id,
          this.images,
          this.corpCompanyRequestsEditForm.value,
          this.selCorpCompanyRequest
        );
        this.updateCorporateCompanyDetails(param1);
      } else {
        this.formErrors = this.formValidation.validateForm(
          this.corpCompanyRequestsEditForm,
          this.formErrors,
          false
        );
      }
    } else if (type == "step2") {
      this.corpCompanyrequMenuArr = [];
      this.corpMenuAddFlag = "";
      $("#stp1").attr("disabled", "disabled");
      $("#stp2").attr("disabled", "disabled");
      $("#stp4").attr("disabled", "disabled");

      /* Pushing data into new menu arrays which should be similar to requests params */
      this.corpCompanyMenuArr.forEach((element) => {
        var param = {
          corpId: element.corpId,
          corpMenuId: element.menuid,
          statusId: element.statusId,
          updatedby: element.updatedby,
          role_ID: this.commonData.roleTypeId,
          user_ID: this.commonData.user_ID,
          subMenu_ID: this.commonData.submenuId,
          activityName: this.commonData.submenuname,
        };
        this.corpCompanyrequMenuArr.push(param);
        console.log("corp menus array:", this.corpCompanyrequMenuArr);
      });

      var param2 = this.corporateCompanyUserRequestsEditService.getCorpCompanyMenuEditCall(
        this.corpCompanyrequMenuArr
      );
      this.updateCorporateCompanyMenuDetails(param2);
    } else if (type == "step3") {
      this.corpCompanyrequAccountsArr = [];
      $("#stp1").attr("disabled", "disabled");
      $("#stp2").attr("disabled", "disabled");
      $("#stp3").attr("disabled", "disabled");

      /* Pushing data into new menu arrays which should be similar to requests params */
      this.corpCompanyAccountsArr.forEach((element) => {
        var param = {
          corpId: element.corpId,
          accountNo: element.accountNo,
          statusId: element.statusId,
          updatedby: element.updatedby,
          role_ID: this.commonData.roleTypeId,
          user_ID: this.commonData.user_ID,
          subMenu_ID: this.commonData.submenuId,
          activityName: this.commonData.submenuname,
        };
        this.corpCompanyrequAccountsArr.push(param);
        console.log("corp accounts array:", this.corpCompanyrequAccountsArr);
      });

      var params = this.corporateCompanyUserRequestsEditService.getCorpCompanyAccountEditCall(
        this.corpCompanyrequAccountsArr
      );
      this.updateCorporateCompanyAccountDetails(params);
    } else if (type == "step2Back") {
      this.patchForm();
      this.corpMenuAddFlag = "";
      $("#stp2").attr("disabled", "disabled");
      $("#stp3").attr("disabled", "disabled");
      $("#stp4").attr("disabled", "disabled");
    } else if (type == "step3Back") {
      $("#stp1").attr("disabled", "disabled");
      $("#stp3").attr("disabled", "disabled");
      $("#stp4").attr("disabled", "disabled");
    } else if (type == "step4Back") {
      $("#stp1").attr("disabled", "disabled");
      $("#stp2").attr("disabled", "disabled");
      $("#stp4").attr("disabled", "disabled");
    }
  }

  /* Method to save formdata of step-1 into the object */
  fillObject() {
    this.corpCompanyRequestsFields.corpCompanyName = this.corpCompanyRequestsEditForm.value.corpCompanyName;
    this.corpCompanyRequestsFields.corpCompanyInfo = this.corpCompanyRequestsEditForm.value.corpCompanyInfo;
    this.corpCompanyRequestsFields.cif = this.corpCompanyRequestsEditForm.value.cif;
    this.corpCompanyRequestsFields.rrn = this.corpCompanyRequestsEditForm.value.rrn;
    this.corpCompanyRequestsFields.pancardNo = this.corpCompanyRequestsEditForm.value.pancardNo;
    this.corpCompanyRequestsFields.phoneNo = this.corpCompanyRequestsEditForm.value.phoneNo;
    this.corpCompanyRequestsFields.establishmentOn = this.corpCompanyRequestsEditForm.value.establishmentOn;
    this.corpCompanyRequestsFields.status = this.corpCompanyRequestsEditForm.value.status;
    this.corpCompanyRequestsFields.coi = this.corpCompanyRequestsEditForm.value.coi;
    this.corpCompanyRequestsFields.moa = this.corpCompanyRequestsEditForm.value.moa;
    this.corpCompanyRequestsFields.otherdocs = this.corpCompanyRequestsEditForm.value.otherdocs;
    this.corpCompanyRequestsFields.logo = this.corpCompanyRequestsEditForm.value.logo;
    this.corpCompanyRequestsFields.remark = this.corpCompanyRequestsEditForm.value.remark;
  }

  /* Method to patch values of step-1 form fields from object */
  patchForm() {
    this.corpCompanyRequestsEditForm.patchValue({
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
      remark: this.corpCompanyRequestsFields.remark
    });
  }

  /* Getting dropdown values for corporate company menus */
  getCorporateMenuDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAllCorpMenus)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.corporateMenuMasterArr = res.result;
          console.log(
            "Corporate Menu Master array: ",
            this.corporateMenuMasterArr
          );
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getAllCorpMenus, res);
        }
      });
  }

  /* getting corporate company related menus and accounts */
  getCorpMenuAndAccountsByCompId(companyId) {
    this.corpCompanyMenuArr = [];
    this.corpCompanyAccountsArr = [];
    this.corpUsersMenusArr = [];
    this.corpUsersAccountsArr = [];
    // $('#dt-sample1').DataTable().clear().destroy();
    // $('#dt-sample2').DataTable().clear().destroy();
    // $('#dt-sample3').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(
        this.appConstants.getOfflineMenuAndAccByCompanyIdUrl,
        companyId
      )
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          // this.corpCompanyMenuArr = res.result.corpMenuList;

          res.result.corpMenuList.forEach(element => {
            var param = {
              menuid: element.corpMenuId,
              menuName: element.menuName,
              menuDesc: "",
              createdon: this.todayDate,
              updatedby: this.commonData.user_ID,
            };
            this.corpUsersMenusArr.push(param);
          });

          res.result.corpMenuList.forEach(element => {
            var param = {
              corpId: element.corpId,
              menuid: element.corpMenuId,
              menuName: element.menuName,
              createdon: element.createdon,
              updatedby: this.commonData.user_ID,
              statusId: element.statusId,
            };
            this.corpCompanyMenuArr.push(param);
          });

          console.log("Menus array: ", this.corpCompanyMenuArr);
          console.log("corp users menus array: ", this.corpUsersMenusArr);
          this.corpCompanyAccountsArr = res.result.corpAccList;

          res.result.corpAccList.forEach(element => {
            var param = {
              accountNo: element.accountNo,
              createdon: this.todayDate,
              updatedby: this.commonData.user_ID,
            };
            this.corpUsersAccountsArr.push(param);
          });
          console.log("Accounts array: ", this.corpCompanyAccountsArr);
          console.log("corp users accounts array: ", this.corpUsersAccountsArr);
          // this.commonMethod.setDataTable1(this.commonServiceCall.pageName);

          if(this.tempCorpCompanyMenuArr.length == 0) {

            this.corpCompanyMenuArr.forEach(element => {
              var param = {
                corpId: element.corpId,
                menuid: element.menuid,
                menuName: element.menuName,
                createdon: element.createdon,
                updatedby: this.commonData.user_ID,
                statusId: element.statusId,
              };
              this.tempCorpCompanyMenuArr.push(param);
            });
          }

          if(this.tempCorpCompanyAccountsArr.length == 0) {

            this.corpCompanyAccountsArr.forEach(element => {
              var param = {
                corpId: element.corpId,
                accountNo: element.accountNo,
                createdon: element.createdon,
                statusId: element.statusId,
                updatedby: this.commonData.user_ID,
              };
              this.tempCorpCompanyAccountsArr.push(param);
            });
          }

          console.log('tempCorpCompanyMenuArr', this.tempCorpCompanyMenuArr);
          console.log('tempCorpCompanyAccountsArr', this.tempCorpCompanyAccountsArr);

        } else {
          this.errorCallBack(
            this.appConstants.getOfflineMenuAndAccByCompanyIdUrl,
            res
          );
        }
        // $('#dt-sample1').DataTable().clear().destroy();
        // $('#dt-sample2').DataTable().clear().destroy();
        this.commonMethod.hideLoader();
      });
  }

  /* Method to bind menu description as per menu name in step-2 */
  onMenuChange(value) {
    var objIndex = this.corporateMenuMasterArr.findIndex(
      (obj) => obj.id == value
    );
    var desc = this.corporateMenuMasterArr[objIndex].menuName;
    this.corpCompanyMenuAddForm.patchValue({
      menuDesc: desc,
    });
  }

  /* Corporate Company menu add method in step-2 */
  onCorpMenuAdd(formdata) {
    var menudata = [];
    var menuname = "";
    if (this.corpCompanyMenuAddForm.valid) {
      this.corporateMenuMasterArr.forEach((element) => {
        if (formdata.menuName == element.id) {
          menuname = element.menuName;
        }
      });

      this.corpCompanyMenuArr.forEach((element) => {
        if (element.menuid == formdata.menuName) {
          this.isMenuAlreadyExistFlag = true;
          showToastMessage("Menu already exist");
        }
      });

      if (!this.isMenuAlreadyExistFlag) {
        var param = {
          corpId: this.corpCompanyDetils.id,
          menuid: formdata.menuName,
          menuName: menuname,
          createdon: this.todayDate,
          updatedby: this.commonData.user_ID,
          statusId: 3,
        };
        this.corpCompanyMenuArr.push(param);
        console.log("corp company menu array: ", this.corpCompanyMenuArr);
        this.tempCorpCompanyMenuArr.push(param);
        this.corpMenuAddFlag = false;
        $("#dttable").show();
        this.corpCompanyMenuAddForm.reset();
      }

      if(this.corpUsersArr.length>0 && this.corpUsersArr[0].role == 1)
      {
        this.corpCompanyMenuArr.forEach(element=>{
          menudata.push(element.menuName)
        })
        this.corpUsersArr[0].corpUserMenuData = menudata
      }
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.corpCompanyMenuAddForm,
        this.formErrors,
        false
      );
    }
    this.isMenuAlreadyExistFlag = false;
  }

  /* Method to delete corp company menu in step-2 */
  onCompanyMenuDelete(item) {
    console.log("menuid: ", item.menuid);
    console.log("corpMenu: ", item);
    console.log("corp menu master array: ", this.corporateMenuMasterArr);

    this.corporateMenuMasterArr.forEach((element) => {
      if (element.id == item.menuid) {
        var objIndex = this.corpCompanyMenuArr.findIndex(
          (obj) => obj.menuid == element.id
        );
        console.log("index: ", objIndex);
        this.corpCompanyMenuArr.splice(objIndex, 1);
      }
    });
  }

  /* Method to update corp company menu in step-2 */
  updateCorporateCompanyMenuDetails(params) {
    console.log(params);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(
        this.appConstants.updateOfflineCorpMenuMapDataUrl,
        params
      )
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          console.log("response data: ", res);
          showToastMessage(res.responseMessage);
          var param = this.corporateCompanyUserRequestsEditService.getCorpCompanyIdCall(
            this.corpCompanyDetils.id
          );
          this.getCorpMenuAndAccountsByCompId(param);
        } else {
          this.errorCallBack(
            this.appConstants.updateOfflineCorpMenuMapDataUrl,
            res
          );
        }
        this.commonMethod.hideLoader();
      });
  }

  /* Method to get you on corp menu add form */
  goTocorpCompanyAccountAddForm() {
    $("#dttable1").hide();
    this.corpAccAddFlag = true;
    this.buildForm();
  }

  /* Method to delete corp company account in step-3 */
  onCompanyAccountDelete(item) {
    console.log("account no: ", item.accountNo);

    this.corpCompanyAccountsArr.forEach((element) => {
      if (element.accountNo == item.accountNo) {
        var objIndex = this.corpCompanyAccountsArr.findIndex(
          (obj) => obj.accountNo == element.accountNo
        );
        console.log("index: ", objIndex);
        this.corpCompanyAccountsArr.splice(objIndex, 1);
      }
    });
  }

  /* Corporate Company menu add method in step-3 */
  onCorpAccountAdd(formdata) {
    var accountdata = [];
    if (this.corpCompanyAccAddForm.valid) {
      this.corpCompanyAccountsArr.forEach((element) => {
        if (element.accountNo == formdata.accNo) {
          this.isAccountAlreadyExistFlag = true;
          showToastMessage("Account Number Already Exist");
        }
      });

      if (!this.isAccountAlreadyExistFlag) {
        var param = {
          corpId: this.corpCompanyDetils.id,
          accountNo: formdata.accNo,
          createdon: this.todayDate,
          statusId: 3,
          updatedby: this.commonData.user_ID,
        };
        this.corpCompanyAccountsArr.push(param);
        console.log(
          "corp company accounts array: ",
          this.corpCompanyAccountsArr
        );
        this.tempCorpCompanyAccountsArr.push(param);
        this.corpAccAddFlag = false;
        $("#dttable1").show();
        this.corpCompanyAccAddForm.reset();
      }

      if(this.corpUsersArr.length>0 && this.corpUsersArr[0].role == 1)
      {
        this.corpCompanyAccountsArr.forEach(element=>
          {
            accountdata.push(element.accountNo)
          })
        this.corpUsersArr[0].corpUserAccData = accountdata
      }
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.corpCompanyAccAddForm,
        this.formErrors,
        false
      );
    }
    this.isAccountAlreadyExistFlag = false;
  }

  /* Method to update corp company account in step-3 */
  updateCorporateCompanyAccountDetails(params) {
    console.log(params);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(
        this.appConstants.updateOfflineCorpAccMapDataUrl,
        params
      )
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          console.log("response data: ", res);
          showToastMessage(res.responseMessage);
          var param = this.corporateCompanyUserRequestsEditService.getCorpUserCall(
            this.corpCompanyDetils.id
          );
          this.getAllCorpUsersByCompanyId(param);
        } else {
          this.errorCallBack(
            this.appConstants.updateOfflineCorpAccMapDataUrl,
            res
          );
          this.commonMethod.hideLoader();
        }
      });
  }

  /* Function call in step-4 on load to get corporate users for selected corp company */
  getAllCorpUsersByCompanyId(param) {
    // $('#dt-sample1').DataTable().clear().destroy();
    // $('#dt-sample2').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(
        this.appConstants.getCorpUsersMenuAccByCompIdUrl,
        param
      )
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.corpUsersArr = res.result;
          console.log("corp users array: ", this.corpUsersArr);

          // this.corpUsersArr.forEach(element => {
          //   if(element.corpRoleId == 1) {
          //     localStorage.setItem('isregulator','Y')
          //   }
          //   else {
          //     localStorage.setItem('isregulator','N')
          //   }
          // });

          var objIndex = this.corpUsersArr.findIndex((obj) => obj.corpRoleId == "1");
          if(objIndex >= 0) {
            localStorage.setItem('isregulator','Y')
          }
          else {
            localStorage.setItem('isregulator','N')
          }

          if(localStorage.getItem('isregulator') != 'Y'){
            this.roleMaster = []
            var data = this.roleTempMaster
            data.forEach(element=>{
              if(element.id!="1")
              {
                this.roleMaster.push(element)
              }
            });
          }
          else {
            this.roleMaster = [];
            this.roleMaster = this.roleTempMaster;
          }

          var param = this.corporateCompanyUserRequestsEditService.getCorpCompanyIdCall(
            this.corpCompanyDetils.id
          );
          this.getCorpMenuAndAccountsByCompId(param);
          // this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        } else {
          this.errorCallBack(
            this.appConstants.getCorpUsersMenuAccByCompIdUrl,
            res
          );
          this.commonMethod.hideLoader();
        }
        // $('#dt-sample3').DataTable().clear().destroy();
      });
  }

  /* Method to see which accounts are mapped to a particular user in step-4 */
  getAccountsMappedData(item, type) {
    var tempAccArr = [];
    this.corpUsersAccountsArr = [];
    if(type == 'ui') {
      var param = {
        "corpUserId": item.id
      };
      this.selModel = "corpAccounts";
      openTinyModel1();
    }
    else {
      var param = {
        "corpUserId": item.parentId
      };
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getUserAccountListByCorpUserIdUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);

        res.result.forEach(element => {
          var param = {
            accountNo: element.accountNo,
            createdon: this.todayDate,
            updatedby: this.commonData.user_ID,
          };
          tempAccArr.push(param);
        });
        this.corpUsersAccountsArr = tempAccArr;
        console.log('tempAccArr', tempAccArr);
        console.log('corpUsersAccountsArr', this.corpUsersAccountsArr);
      }
      else {
        this.errorCallBack(this.appConstants.getUserAccountListByCorpUserIdUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  /* Method to see which menus are mapped to a particular user in step-4 */
  getMenusMappedData(item, type) {
    var tempMnarr = [];
    this.corpUsersMenusArr = [];
    if(type == 'ui') {
      var param = {
        "corpUserId": item.id
      };
      this.selModel = "corpMenus";
      openTinyModel1();
    }
    else {
      var param = {
        "corpUserId": item.parentId
      };
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getUserMenuListByCorpUserIdUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);

        res.result.forEach(element => {
          var param = {
            menuid: element.corpMenuId,
            menuName: element.menuName,
            menuDesc: "",
            createdon: this.todayDate,
            updatedby: this.commonData.user_ID,
          };
          tempMnarr.push(param);
        });
        this.corpUsersMenusArr = tempMnarr;
        console.log('tempMnarr', tempMnarr);
        console.log('corpUsersMenusArr', this.corpUsersMenusArr);
      }
      else {
        this.errorCallBack(this.appConstants.getUserMenuListByCorpUserIdUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  /* Corporate Company user add method in step-4 */
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
            var  objIndex = this.corpUsersArr.findIndex((obj) => obj.corpRoleId == "2");
            if(this.corpUsersArr.length==1 || this.corpUsersArr.length==2)
            {
              showToastMessage("Please Add Atleast Two Admin")
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
        var  objIndexnew = this.corpUsersArr.findIndex((obj) => obj.corpRoleId == "1");
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
        var userRole = "Maker"
        var parentRole = "Admin"
      }

      // if(formdata.role == "1" || formdata.role == "2")
      // {
      //    param = {
      //     "userName": formdata.username,
      //     "firstName": formdata.fName,
      //     "lastName": formdata.lName,
      //     "email": formdata.emailId,
      //     "mobile": formdata.mobileNo,
      //     "pancardNo": formdata.panNumber,
      //     "menuMapped": menuname,
      //     "accountsMapped": accountNumbers,
      //     "dob":formdata.dob,
      //     "passNumber":formdata.passNumber,
      //     "aadharCardNo":formdata.aadharCardNo,
      //     "br":formdata.br,
      //     "coii":formdata.coii,
      //     "ni":formdata.ni,
      //     "pass":formdata.pass,
      //     "ui":formdata.ui,
      //     "od":formdata.od,
      //     "role":formdata.role,
      //     "user":"",
      //     "userRole":userRole,
      //     "parentRole":parentRole
      //   }
      // }
      // else
      // {
      //    param = {
      //     "userName": formdata.username,
      //     "firstName": formdata.fName,
      //     "lastName": formdata.lName,
      //     "email": formdata.emailId,
      //     "mobile": formdata.mobileNo,
      //     "pancardNo": formdata.panNumber,
      //     "menuMapped": menuname,
      //     "accountsMapped": accountNumbers,
      //     "dob":formdata.dob,
      //     "passNumber":formdata.passNumber,
      //     "aadharCardNo":formdata.aadharCardNo,
      //     "br":formdata.br,
      //     "coii":formdata.coii,
      //     "ni":formdata.ni,
      //     "pass":formdata.pass,
      //     "ui":formdata.ui,
      //     "od":formdata.od,
      //     "role":formdata.role,
      //     "user":formdata.user,
      //     "userRole":userRole,
      //     "parentRole":parentRole
      //   }
      // }


      // this.corpUsersArr.push(param);
      // console.log('corp users array: ', this.corpUsersArr);

      if(this.corpUsersArr.length==1 || this.corpUsersArr.length==2)
      {
        if(formdata.role == 3 || formdata.role == 4) {
          showToastMessage("Please Add Atleast Two Admin")
          return;
        }
        else {
          var params = this.corporateCompanyUserRequestsEditService.addCorpUserCall(this.corpCompanyDetils.id, this.images, formdata, this.selectedRoleData, this.selectedUserParentData, this.corpCompanyMenuArr, this.corpUsersAccountsArr);
          this.corpUserDataAdd(params);
          this.corpUserAddFlag = false;
          $("#dttable2").show();
          this.corpUserAccAddForm.reset();
        }
      }
      else
      {
        var params = this.corporateCompanyUserRequestsEditService.addCorpUserCall(this.corpCompanyDetils.id, this.images, formdata, this.selectedRoleData, this.selectedUserParentData, this.corpCompanyMenuArr, this.corpUsersAccountsArr);
        this.corpUserDataAdd(params);
        this.corpUserAddFlag = false;
        $("#dttable2").show();
        this.corpUserAccAddForm.reset();
      }

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
        var parentRole = "Regulator"
      }
      if(formdata.role == "3")
      {
        var userRole = "Maker"
        var parentRole = "Admin"
      }
      if(formdata.role == "4")
      {
        var userRole = "Maker"
        var parentRole = "Admin"
      }

      // if(formdata.role == "2")
      // {
      //    param = {
      //     "userName": formdata.username,
      //     "firstName": formdata.fName,
      //     "lastName": formdata.lName,
      //     "email": formdata.emailId,
      //     "mobile": formdata.mobileNo,
      //     "pancardNo": formdata.panNumber,
      //     "menuMapped": menuname,
      //     "accountsMapped": accountNumbers,
      //     "dob":formdata.dob,
      //     "passNumber":formdata.passNumber,
      //     // "nationalId":formdata.nationalId,
      //     "aadharCardNo":formdata.aadharCardNo,
      //     "br":formdata.br,
      //     "coii":formdata.coii,
      //     "ni":formdata.ni,
      //     "pass":formdata.pass,
      //     "ui":formdata.ui,
      //     "od":formdata.od,
      //     "role":formdata.role,
      //     "user":"",
      //     "userRole":userRole,
      //     "parentRole":parentRole
      //   }
      // }
      // else
      // {
      //    param = {
      //     "userName": formdata.username,
      //     "firstName": formdata.fName,
      //     "lastName": formdata.lName,
      //     "email": formdata.emailId,
      //     "mobile": formdata.mobileNo,
      //     "pancardNo": formdata.panNumber,
      //     "menuMapped": menuname,
      //     "accountsMapped": accountNumbers,
      //     "dob":formdata.dob,
      //     "passNumber":formdata.passNumber,
      //     // "nationalId":formdata.nationalId,
      //     "aadharCardNo":formdata.aadharCardNo,
      //     "br":formdata.br,
      //     "coii":formdata.coii,
      //     "ni":formdata.ni,
      //     "pass":formdata.pass,
      //     "ui":formdata.ui,
      //     "od":formdata.od,
      //     "role":formdata.role,
      //     "user":formdata.user,
      //     "userRole":userRole,
      //     "parentRole":parentRole

      //   }
      // }

      if(formdata.role == "3" || formdata.role == "4")
      {
        if(this.corpUsersArr.length==0 || this.corpUsersArr.length==1)
        {
         showToastMessage("Please Add Atleast Two Admin")
         return
        }
        else
        {
          // this.corpUsersArr.push(param);
          // console.log('corp users array: ', this.corpUsersArr);
          var params = this.corporateCompanyUserRequestsEditService.addCorpUserCall(this.corpCompanyDetils.id, this.images, formdata, this.selectedRoleData, this.selectedUserParentData, this.corpCompanyMenuArr, this.corpUsersAccountsArr);
          this.corpUserDataAdd(params);
          this.corpUserAddFlag = false;
          $("#dttable2").show();
          this.corpUserAccAddForm.reset();
        }
      }
      else
      {
          // this.corpUsersArr.push(param);
          // console.log('corp users array: ', this.corpUsersArr);
          var params = this.corporateCompanyUserRequestsEditService.addCorpUserCall(this.corpCompanyDetils.id, this.images, formdata, this.selectedRoleData, this.selectedUserParentData, this.corpCompanyMenuArr, this.corpUsersAccountsArr);
          this.corpUserDataAdd(params);
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

  /* API call to add corp user in step-4 */
  corpUserDataAdd(params) {
    console.log(params);

    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addOfflineCorpUserDataUrl, params).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        showToastMessage(res.responseMessage);
        var param = this.corporateCompanyUserRequestsEditService.getCorpUserCall(
          this.corpCompanyDetils.id
        );
        this.getAllCorpUsersByCompanyId(param);
        this.corpUserAddFlag = false;
        this.corpUserAccAddForm.reset();
        $("#dttable2").show();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addOfflineCorpUserDataUrl, res);
      }
    })
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

  /* Function call in step-4 to go to corp user edit form */
  gotoCorpUsersEdit(item) {

    var uidata = "";
    var oddata = "";
    console.log('corp users array: ', this.corpUsersArr);
    var originalTempMenuArray = [];
    var originalTempAccountArray = [];

    this.selectedItemsEdit = [];
    this.selectedItemsAccountsEdit = [];
    this.selectedCorpUserToEdit = item;

    this.corpUserEditFlag = true;
    $("#dttable2").hide();
    this.buildForm();
    console.log("editable data: ", item);

    if(item.userImage == null || item.userImage == "" || item.userImage == undefined) {
      this.ui = "";
    }
    else {
      this.ui = 'data:image/jpg;base64,'+item.userImage;
      this.images.ui = 'data:image/jpg;base64,'+item.userImage;
    }

    if(item.otherDoc == null || item.otherDoc == "" || item.otherDoc == undefined) {
      this.od = "";
    }
    else {
      this.od = 'data:image/jpg;base64,'+item.otherDoc;
      this.images.od = 'data:image/jpg;base64,'+item.otherDoc;
    }
    console.log('ui', this.ui);
    console.log('od', this.od);

    this.corpUserAccEditForm.patchValue({
      username: item.userName,
      fName: item.firstName,
      lName: item.lastName,
      mobileNo: item.mobile,
      panNumber: item.pancardNo,
      emailId: item.email,
      dob: item.dob,
      // ui: this.ui,
      // od: this.od,
      passNumber: item.passportNo,
      // nationalId: item.nationalIdNo,
      aadharCardNo: item.aadharCardNo,
      role: item.corpRoleId,
      user: item.parentUserName,
    });

    if (item.corpRoleId == "1") {
      this.corpUserAccEditForm.controls["menuMapped"].setValidators([]);
      this.corpUserAccEditForm.controls["accountsMapped"].setValidators([]);
      this.corpUserAccEditForm.controls["menuMapped"].updateValueAndValidity();
      this.corpUserAccEditForm.controls[
        "accountsMapped"
      ].updateValueAndValidity();
      this.corpUserAccEditForm.controls["user"].setValidators([]);
      this.corpUserAccEditForm.controls["user"].updateValueAndValidity();
      $("#editUser").hide();
      this.isEditDropdownDisabled = true;
      this.isUserDisabled = false;
      this.editAccountArray = [];
      this.editmenuArray = [];

      this.editAccountArray = this.tempCorpCompanyAccountsArr;
      this.editmenuArray = this.tempCorpCompanyMenuArr;

    } else if (item.corpRoleId == "2") {

      this.corpUserAccEditForm.controls["menuMapped"].setValidators([
        Validators.required,
      ]);
      this.corpUserAccEditForm.controls["accountsMapped"].setValidators([
        Validators.required,
      ]);
      this.corpUserAccEditForm.controls["menuMapped"].updateValueAndValidity();
      this.corpUserAccEditForm.controls[
        "accountsMapped"
      ].updateValueAndValidity();
      this.corpUserAccEditForm.controls["user"].setValidators([]);
      this.corpUserAccEditForm.controls["user"].updateValueAndValidity();
      $("#editUser").hide();
      this.isEditDropdownDisabled = false;
      this.isUserDisabled = false;
      this.editAccountArray = [];
      this.editmenuArray = [];

      // this.editAccountArray = this.tempCorpCompanyAccountsArr;
      // this.editmenuArray = this.tempCorpCompanyMenuArr;


      /* added */

      var objIndex = this.corpUsersArr.findIndex(
        (obj) => obj.userName == item.userName
      );
      var menuData = this.corpUsersArr[objIndex].corpUserMenuData;
      var accountData = this.corpUsersArr[objIndex].corpUserAccData;

      originalTempAccountArray = this.tempCorpCompanyAccountsArr;
      originalTempMenuArray = this.tempCorpCompanyMenuArr;

      console.log('originalTempMenuArray: ', originalTempMenuArray);

      console.log('menuData: ', menuData);
      console.log('accountData: ', accountData);
      console.log('tempCorpCompanyMenuArr: ', this.tempCorpCompanyMenuArr);
      console.log('tempCorpCompanyAccountsArr: ', this.tempCorpCompanyAccountsArr);

      menuData.forEach((element) => {
        var objIndex = originalTempMenuArray.findIndex(
          (obj) => obj.menuName == element.menuName
        );
        var param = {
          menuid: originalTempMenuArray[objIndex].menuid,
          menuName: originalTempMenuArray[objIndex].menuName,
          menuDesc: originalTempMenuArray[objIndex].menuDesc,
          createdon: this.todayDate,
          updatedby: this.commonData.user_ID,
        };
        this.editmenuArray.push(param);
      });

      accountData.forEach((element) => {
        var objIndex = originalTempAccountArray.findIndex(
          (obj) => obj.accountNo == element.accountNo
        );
        var param = {
          accountNo: originalTempAccountArray[objIndex].accountNo,
          createdon: this.todayDate,
          updatedby: this.commonData.user_ID,
        };
        this.editAccountArray.push(param);
      });

      // var param = this.corporateCompanyUserRequestsEditService.getCorpCompanyIdCall(
      //   this.corpCompanyDetils.id
      // );
      // this.getCorpMenuAndAccountsByCompId(param);

      /* to get values of accounts and menus dropdown for maker checker */

      this.getMenusMappedData(item, 'ts');
      this.getAccountsMappedData(item, 'ts');

    } else if (item.corpRoleId == "3" || item.corpRoleId == "4") {

      this.isEditDropdownDisabled = false;
      this.isUserDisabled = true;
      this.corpUserAccEditForm.controls["menuMapped"].setValidators([
        Validators.required,
      ]);
      this.corpUserAccEditForm.controls["accountsMapped"].setValidators([
        Validators.required,
      ]);
      this.corpUserAccEditForm.controls["menuMapped"].updateValueAndValidity();
      this.corpUserAccEditForm.controls[
        "accountsMapped"
      ].updateValueAndValidity();

      this.corpUserAccEditForm.controls["user"].setValidators([
        Validators.required,
      ]);
      this.corpUserAccEditForm.controls["user"].updateValueAndValidity();
      $("#editUser").show();

      this.editUserArray = [];
      var filterUser = this.corpUsersArr;
      var data = filterUser.filter((x) => x.corpRoleId == "2");
      this.editUserArray = data;

      var objIndex = this.corpUsersArr.findIndex(
        (obj) => obj.userName == item.userName
      );
      var menuData = this.corpUsersArr[objIndex].corpUserMenuData;
      var accountData = this.corpUsersArr[objIndex].corpUserAccData;

      this.editAccountArray = [];
      this.editmenuArray = [];

      originalTempAccountArray = this.tempCorpCompanyAccountsArr;
      originalTempMenuArray = this.tempCorpCompanyMenuArr;

      console.log('originalTempMenuArray: ', originalTempMenuArray);

      console.log('menuData: ', menuData);
      console.log('accountData: ', accountData);
      console.log('tempCorpCompanyMenuArr: ', this.tempCorpCompanyMenuArr);
      console.log('tempCorpCompanyAccountsArr: ', this.tempCorpCompanyAccountsArr);

      menuData.forEach((element) => {
        var objIndex = originalTempMenuArray.findIndex(
          (obj) => obj.menuName == element.menuName
        );
        var param = {
          menuid: originalTempMenuArray[objIndex].menuid,
          menuName: originalTempMenuArray[objIndex].menuName,
          menuDesc: originalTempMenuArray[objIndex].menuDesc,
          createdon: this.todayDate,
          updatedby: this.commonData.user_ID,
        };
        this.editmenuArray.push(param);
      });

      accountData.forEach((element) => {
        var objIndex = originalTempAccountArray.findIndex(
          (obj) => obj.accountNo == element.accountNo
        );
        var param = {
          accountNo: originalTempAccountArray[objIndex].accountNo,
          createdon: this.todayDate,
          updatedby: this.commonData.user_ID,
        };
        this.editAccountArray.push(param);
      });

      /* to get values of accounts and menus dropdown for maker checker */

      this.getMenusMappedData(item, 'ts');
      this.getAccountsMappedData(item, 'ts');
    }

    console.log("corp users array: ", this.corpUsersArr);
    console.log("temp corp compnay menu arr: ", this.editmenuArray);
    for (var i = 0; i < item.corpUserMenuData.length; i++) {
      var objIndex1 = this.editmenuArray.findIndex(
        (obj) => obj.menuName.toLowerCase() == item.corpUserMenuData[i].menuName.toLowerCase()
      );
      console.log("objIndex value: ", objIndex1);
      if (objIndex1 >= 0) {
        var objMenuId = this.editmenuArray[objIndex1].menuid;
        var objMenuName = this.editmenuArray[objIndex1].menuName;
        var data: any = {
          menuName: objMenuName,
          menuid: objMenuId,
        };
        console.log("data: ", data);
        this.selectedItemsEdit.push(data);
      }
    }

    console.log('selectedItemsEdit', this.selectedItemsEdit);

    for (var i = 0; i < item.corpUserAccData.length; i++) {
      var objIndex2 = this.editAccountArray.findIndex(
        (obj) => obj.accountNo == item.corpUserAccData[i].accountNo
      );
      console.log("objIndex value: ", objIndex2);
      if (objIndex2 >= 0) {
        var accountNo = this.editAccountArray[objIndex2].accountNo;
        var data: any = {
          accountNo: accountNo,
        };
        console.log("data: ", data);
        this.selectedItemsAccountsEdit.push(data);
      }
    }

    console.log('selectedItemsAccountsEdit', this.selectedItemsAccountsEdit);

    console.log('formdata: ', this.corpUserAccEditForm);
  }

  /* Method to delete corp user in step-4 */
  onCorpUserDelete(item) {
    this.corpUsersDeleteDropdownArr = [];
    console.log('deletable item: ', item);

    if(item.corpRoleName.toLowerCase() == 'regulator') {
      showToastMessage('You cannot delete regulator');
    }
    else if(item.corpRoleName.toLowerCase() == 'admin') {

      this.corpUsersArr.forEach(element => {
        if(element.userName != item.userName && element.corpRoleId == 2) {
          this.corpUsersDeleteDropdownArr.push(element);
        }
      });
      console.log('corpUsersDeleteDropdownArr: ', this.corpUsersDeleteDropdownArr);
      this.selModel = 'adminDelete';
      this.buildForm();
      openTinyModel();
    }
    else {
      this.selModel = 'userDelete';
      this.selectedUserToDelete = item;
      openTinyModel1();
    }
  }

  /* API call to delete user */
  corpUserDelete() {
    var params = this.corporateCompanyUserRequestsEditService.deleteCorpUserCall(this.selectedUserToDelete);
    console.log(params);
    closeTinyModel1();
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(
        this.appConstants.deleteCorpUserDataUrl,
        params
      )
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          console.log("response data: ", res);
          showToastMessage(res.responseMessage);
          var param = this.corporateCompanyUserRequestsEditService.getCorpUserCall(
            this.corpCompanyDetils.id
          );
          this.getAllCorpUsersByCompanyId(param);
        } else {
          this.errorCallBack(
            this.appConstants.deleteCorpUserDataUrl,
            res
          );
        }
        this.commonMethod.hideLoader();
      });
  }

  /* API call to delete corp user in step-4 */
  onCorpUserDeleteClick() {
    if(this.deleteUserForm.valid) {

    }
    else {
      this.formErrors = this.formValidation.validateForm(
        this.deleteUserForm,
        this.formErrors,
        false
      );
    }
  }

  /* Method call for regulator change value in step-4 */
  onRegulatorChange(value){
    this.selectedItemsAdd = []
    this.selectedItemsAccountsAdd = []
    switch(value) {
      case "Y":
      this.roleMaster = []
      this.roleMaster = this.roleTempMaster
      localStorage.setItem('isregulator','Y');

      this.roleTempMaster.forEach(element => {
        if(element.id == 1) {
          this.selectedRoleData.selectedRoleName = element.name;
          this.selectedRoleData.selectedRoleId = element.id;
        }
      });
      console.log('selectedRoleData', this.selectedRoleData);

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
      localStorage.setItem('isregulator','N');

      this.roleTempMaster.forEach(element => {
        if(element.id == 2) {
          this.selectedRoleData.selectedRoleName = element.name;
          this.selectedRoleData.selectedRoleId = element.id;
        }
      });
      console.log('selectedRoleData', this.selectedRoleData);

       this.roleMaster = []
       var data = this.roleTempMaster
       data.forEach(element=>{
         if(element.id!="1")
         {
          this.roleMaster.push(element)
         }
       });
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

  /* Method called on role changes and set up validators accordingly */
  onRoleChange(value)
  {
    console.log('selected role id: ', value);
    this.roleTempMaster.forEach(element => {
      if(element.id == value) {
        this.selectedRoleData.selectedRoleName = element.name;
        this.selectedRoleData.selectedRoleId = element.id;
      }
    });
    console.log('selectedRoleData', this.selectedRoleData);
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
          console.log(this.corpUserAccAddForm);

          /* if role is admin then it will call it's parent regulator */
          this.corpUsersArr.forEach(element => {
            if(element.corpRoleName.toLowerCase() == 'regulator') {
              var param = {
                "id": element.id
              };
              this.getCorpUserById(param);
            }
          });

      break;
      case "3":
      case "4":
         // if modo 3 is selected do something.
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
          this.corpUserAccAddForm.get('user').setValue("");
          $('#addUser').show()
         }
         break;
    }
  }

  filterUser()
  {
    var filterUser = this.corpUsersArr;
    return filterUser.filter(x => x.corpRoleId == "2")
  }

  filterRole()
  {
    return this.roleMaster
  }

  /* API call to get values of parent */
  getCorpUserById(id) {
    console.log(id);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.getOfflineCorpUserByIdUrl, id)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res.result);
          this.selectedUserParentData.parentId = res.result[0].id;
          this.selectedUserParentData.parentRrn = res.result[0].rrn;
          this.selectedUserParentData.parentRoleId = res.result[0].corpRoleId;
          this.selectedUserParentData.designation = res.result[0].designation;
          console.log('selected user parent data: ', this.selectedUserParentData);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getOfflineCorpUserByIdUrl, res);
        }
      });
  }

  onUserChange(value)
  {
    /* to get data of paren user like parent RRN, parent id, etc */

    this.corpUsersArr.forEach(element => {
      if(element.userName == value) {
        var param = {
          "id": element.id
        };
        this.getCorpUserById(param);
      }
    });

    this.corpCompanyAccountsArr = []
    this.corpCompanyMenuArr =[]
    this.selectedItemsAdd = []
    this.selectedItemsAccountsAdd = []
    this.selectedItemsEdit = []
    this.selectedItemsAccountsEdit =[]
    this.editmenuArray = []
    this.editAccountArray =[]
    this.corpUsersMenusArr =[]
    this.corpUsersAccountsArr =[]
    this.isDropdownDisabled = false;

    if(this.corpUserAddFlag) {
      this.corpUserAccAddForm.controls["menuMapped"].setValidators([Validators.required]);
      this.corpUserAccAddForm.controls["accountsMapped"].setValidators([Validators.required]);
      this.corpUserAccAddForm.controls["menuMapped"].updateValueAndValidity();
      this.corpUserAccAddForm.controls["accountsMapped"].updateValueAndValidity();
    }
    else if(this.corpUserEditFlag) {
      this.corpUserAccEditForm.controls["menuMapped"].setValidators([Validators.required]);
      this.corpUserAccEditForm.controls["accountsMapped"].setValidators([Validators.required]);
      this.corpUserAccEditForm.controls["menuMapped"].updateValueAndValidity();
      this.corpUserAccEditForm.controls["accountsMapped"].updateValueAndValidity();
    }

    var objIndex = this.corpUsersArr.findIndex((obj) => obj.userName == value);
    var menuData =  this.corpUsersArr[objIndex].corpUserMenuData
    var accountData = this.corpUsersArr[objIndex].corpUserAccData

    console.log('menuData: ', menuData);
    console.log('accountData: ', accountData);
    console.log('tempCorpCompanyMenuArr: ', this.tempCorpCompanyMenuArr);

    menuData.forEach(element=> {
      var objIndex = this.tempCorpCompanyMenuArr.findIndex((obj) => obj.menuName == element.menuName);
      var param = {
        "menuid": this.tempCorpCompanyMenuArr[objIndex].menuid,
        "menuName": this.tempCorpCompanyMenuArr[objIndex].menuName,
        "menuDesc": this.tempCorpCompanyMenuArr[objIndex].menuDesc,
        "createdon": this.todayDate,
        "updatedby": this.commonData.user_ID
      }
      this.corpCompanyMenuArr.push(param);
      this.editmenuArray.push(param);
      this.corpUsersMenusArr.push(param);
    });

    console.log('corpCompanyMenuArr: ', this.corpCompanyMenuArr);
    console.log('tempCorpCompanyAccountsArr: ', this.tempCorpCompanyAccountsArr);
    accountData.forEach(element=> {
      var objIndex = this.tempCorpCompanyAccountsArr.findIndex((obj) => obj.accountNo == element.accountNo);
      var param = {
        "accountNo": this.tempCorpCompanyAccountsArr[objIndex].accountNo,
        "createdon": this.todayDate,
        "updatedby": this.commonData.user_ID
      }
      this.corpCompanyAccountsArr.push(param);
      this.editAccountArray.push(param);
      this.corpUsersAccountsArr.push(param);
    })
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

  /* Method called in step-4 on update button click to update values of corp users */
  onCorpUserUpdate(formdata) {

    if(this.corpUserAccEditForm.valid) {
      this.selectedItemsEdit = [];
      this.selectedItemsAccountsEdit = [];
      var menuname = [];
      var accountNo = [];
      console.log('editable item: ', formdata);


      if(formdata.role!=1) {
        if(formdata.role==2 || formdata.role==3 || formdata.role==4) {
          formdata.menuMapped.forEach(element => {
            console.log(element);
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
            element.od = formdata.od
          }

          this.selectedItemsEdit = formdata.menuMapped;
          console.log('selected items edit: ', this.selectedItemsEdit);
          // this.corpUsersArr.push(element);
        });

        var param = this.corporateCompanyUserRequestsEditService.updateCorpUserCall(this.corpCompanyDetils.id, this.images, formdata, this.selectedCorpUserToEdit);
        this.updateCorpUserData(param);

        console.log('corp user updated array: ', this.corpUsersArr);
        this.corpUserEditFlag = false;
        $("#dttable2").show();
        this.corpUserAccEditForm.reset();
      } else {
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

        var param = this.corporateCompanyUserRequestsEditService.updateCorpUserCall(this.corpCompanyDetils.id, this.images, formdata, this.selectedCorpUserToEdit);
        this.updateCorpUserData(param);

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

  /* API call of update corporate user data in step-4 */
  updateCorpUserData(params) {
    console.log(params);

    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updatOfflineCorpUserDataUrl, params).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        showToastMessage(res.responseMessage);
        var param = this.corporateCompanyUserRequestsEditService.getCorpUserCall(
          this.corpCompanyDetils.id
        );
        this.getAllCorpUsersByCompanyId(param);
        this.corpUserEditFlag = false;
        this.corpUserAccEditForm.reset();
        $("#dttable2").show();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updatOfflineCorpUserDataUrl, res);
      }
    })
  }

  /* Route from step-4 to main page */
  onFinishClicked() {
    this.router.navigateByUrl('/corpCompanyUserRequests');
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

  /* Method calls to see document images for corp user in step-4 */
  getLogoImage(item, type) {
    this.selModel = "Image";
    if (type == "boardResolution") {
      if (
        item.boardResolution === null ||
        item.boardResolution === "" ||
        item.boardResolution === undefined
      ) {
        showToastMessage("Board Resolution Image Not Available");
      } else {
        this.displayImage = item.boardResolution;
        openTinyModel1();
      }
    } else if (type == "certificateIncorporation") {
      if (
        item.certificateIncorporation === null ||
        item.certificateIncorporation === "" ||
        item.certificateIncorporation === undefined
      ) {
        showToastMessage("COI Image Not Available");
      } else {
        this.displayImage = item.certificateIncorporation;
        openTinyModel1();
      }
    } else if (type == "passport") {
      if (
        item.passport === null ||
        item.passport === "" ||
        item.passport === undefined
      ) {
        showToastMessage("Passport Image Not Available");
      } else {
        this.displayImage = item.passport;
        openTinyModel1();
      }
    } else if (type == "aadharCardNo") {
      if (
        item.aadharCardNo === null ||
        item.aadharCardNo === "" ||
        item.aadharCardNo === undefined
      ) {
        showToastMessage("Aadhar Card Image Not Available");
      } else {
        this.displayImage = item.aadharCardNo;
        openTinyModel1();
      }
    } else if (type == "userImage") {
      if (
        item.userImage === null ||
        item.userImage === "" ||
        item.userImage === undefined
      ) {
        showToastMessage("User Image Not Available");
      } else {
        this.displayImage = item.userImage;
        openTinyModel1();
      }
    } else if (type == "otherDoc") {
      if (
        item.otherDoc === null ||
        item.otherDoc === "" ||
        item.otherDoc === undefined
      ) {
        showToastMessage("Other Document Image Not Available");
      } else {
        this.displayImage = item.otherDoc;
        openTinyModel1();
      }
    }
  }

  /* Method responsible to upload corporate company documents image data */
  addImage(event, type) {
    console.log(type);
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (
        event.target.files[0].type == "image/jpeg" ||
        event.target.files[0].type == "image/png"
      ) {
      } else {
        if (type == "coi") {
          this.isValidCOIFileFormat = true;
          this.isValidCOISizeFileFormat = false;
        } else if (type == "moa") {
          this.isValidMOAFileFormat = true;
          this.isValidMOASizeFileFormat = false;
        } else if (type == "logo") {
          this.isValidLogoFileFormat = true;
          this.isValidLogoSizeFileFormat = false;
        } else if (type == "otherdocs") {
          this.isValidOtherdocsFileFormat = true;
          this.isValidOtherdocsSizeFileFormat = false;
        } else if (type == "ui") {
          this.isValidUIFileFormat = true;
          this.isValidUISizeFileFormat = false;
        } else if (type == "od") {
          this.isValidODFileFormat = true;
          this.isValidODSizeFileFormat = false;
        }
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
            if (type == "coi") {
              me.isValidCOISizeFileFormat = true;
              me.isValidCOIFileFormat = false;
            } else if (type == "moa") {
              me.isValidMOASizeFileFormat = true;
              me.isValidMOAFileFormat = false;
            } else if (type == "logo") {
              me.isValidLogoSizeFileFormat = true;
              me.isValidLogoFileFormat = false;
            } else if (type == "otherdocs") {
              me.isValidOtherdocsSizeFileFormat = true;
              me.isValidOtherdocsFileFormat = false;
            } else if (type == "ui") {
              me.isValidUISizeFileFormat = true;
              me.isValidUIFileFormat = false;
            } else if (type == "od") {
              me.isValidODSizeFileFormat = true;
              me.isValidODFileFormat = false;
            }
          } else {
            if (type == "coi") {
              console.log("coi");
              me.coi = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.coi = base64;
              });
              me.corpCompanyRequestsEditForm.get("coi").setValue(file);
              me.isCOIImgError = false;
              me.isValidCOISizeFileFormat = false;
              me.isValidCOIFileFormat = false;
            } else if (type == "moa") {
              console.log("moa");
              me.moa = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.moa = base64;
              });
              me.corpCompanyRequestsEditForm.get("moa").setValue(file);
              me.isMOAImgError = false;
              me.isValidMOASizeFileFormat = false;
              me.isValidMOAFileFormat = false;
            } else if (type == "logo") {
              console.log("logo");
              me.logo = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.logo = base64;
              });
              me.corpCompanyRequestsEditForm.get("logo").setValue(file);
              me.isLogoImgError = false;
              me.isValidLogoSizeFileFormat = false;
              me.isValidLogoFileFormat = false;
            } else if (type == "otherdocs") {
              console.log("otherdocs");
              me.otherdocs = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.otherdocs = base64;
              });
              me.corpCompanyRequestsEditForm.get("otherdocs").setValue(file);
              me.isOtherdocsImgError = false;
              me.isValidOtherdocsSizeFileFormat = false;
              me.isValidOtherdocsFileFormat = false;
            }
            else if (type == "ui") {

              if(me.corpUserAddFlag) {
                console.log("ui");
                me.ui = e.target.result;
                me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                  me.images.ui = base64;
                });
                // me.corpUserAccAddForm.get("ui").setValue(file);
                me.isUIImgError = false;
                me.isValidUISizeFileFormat = false;
                me.isValidUIFileFormat = false;
              }
              else {
                console.log("ui");
                me.ui = e.target.result;
                me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                  me.images.ui = base64;
                });
                // me.corpUserAccEditForm.get("ui").setValue(file);
                me.isUIImgError = false;
                me.isValidUISizeFileFormat = false;
                me.isValidUIFileFormat = false;
              }
            }
            else if (type == "od") {
              if(me.corpUserAddFlag) {
                console.log("od");
                me.od = e.target.result;
                me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                  me.images.od = base64;
                });
                // me.corpUserAccAddForm.get("od").setValue(file);
                me.isODImgError = false;
                me.isValidODSizeFileFormat = false;
                me.isValidODFileFormat = false;
              }
              else {
                console.log("od");
                me.od = e.target.result;
                me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                  me.images.od = base64;
                });
                // me.corpUserAccEditForm.get("od").setValue(file);
                me.isODImgError = false;
                me.isValidODSizeFileFormat = false;
                me.isValidODFileFormat = false;
              }
            }
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  /* Method calls on tinymodel open */
  openActionModal(formdata, approveRejectVal) {
    this.approvRejectValue = approveRejectVal;
    openTinyModel1();
    this.selModel = "remarkField";
    this.buildForm();
    this.corpCompanyRequestsFields.corpCompanyName = formdata.corpCompanyName;
    this.corpCompanyRequestsFields.corpCompanyInfo = formdata.corpCompanyInfo;
    this.corpCompanyRequestsFields.cif = formdata.cif;
    this.corpCompanyRequestsFields.rrn = formdata.rrn;
    this.corpCompanyRequestsFields.pancardNo = formdata.pancardNo;
    this.corpCompanyRequestsFields.phoneNo = formdata.phoneNo;
    this.corpCompanyRequestsFields.establishmentOn = formdata.establishmentOn;
    this.corpCompanyRequestsFields.status = formdata.status;
  }

  /* Method calls on tinymodel close */
  closeActionModel(type) {
    if (type == "corpAccounts" || type == "corpMenus" || type == "Image" || type == "deleteUser") {
      closeTinyModel1();
    }
    else if (type == "remarkField") {
      this.corpCompanyRequestsEditForm.patchValue({
        corpCompanyName: this.corpCompanyRequestsFields.corpCompanyName,
        corpCompanyInfo: this.corpCompanyRequestsFields.corpCompanyInfo,
        cif: this.corpCompanyRequestsFields.cif,
        rrn: this.corpCompanyRequestsFields.rrn,
        pancardNo: this.corpCompanyRequestsFields.pancardNo,
        phoneNo: this.corpCompanyRequestsFields.phoneNo,
        establishmentOn: this.corpCompanyRequestsFields.establishmentOn,
        status: this.corpCompanyRequestsFields.status,
      });
      this.remarkForm.reset();
      closeTinyModel1();
    } else {
      closeTinyModel();
    }
  }

  cancel() {
    if (
      this.commonServiceCall.makerRequestEditUrl == "/corpCompanyUserRequests"
    ) {
      this.router.navigateByUrl("/corpCompanyUserRequests");
    } else if (
      this.commonServiceCall.makerRequestEditUrl == "/corpMakerRequests"
    ) {
      this.router.navigateByUrl("/corpMakerRequests");
    } else {
      this.router.navigateByUrl("/corpCompanyUserRequests");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onImgDelete(type, formType) {

    if(type == 'ui') {
      this.ui = "";
      this.images.ui = "";
      if(formType == 'addForm') {
        this.corpUserAccAddForm.get('ui').reset();
      }
      else {
        this.corpUserAccEditForm.get('ui').reset();
      }
    }
    else {
      this.od = "";
      this.images.od = "";
      if(formType == 'addForm') {
        this.corpUserAccAddForm.get('od').reset();
      }
      else {
        this.corpUserAccEditForm.get('od').reset();
      }
    }
  }
}
