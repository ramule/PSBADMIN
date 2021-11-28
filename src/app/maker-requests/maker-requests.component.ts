import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { MakerRequestsService } from './maker-requests.service';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var $: any;
@Component({
  selector: 'app-maker-requests',
  templateUrl: './maker-requests.component.html',
  styleUrls: ['./maker-requests.component.css']
})
export class MakerRequestsComponent implements OnInit {

  makerRequests: any = [];
  selModel: any;
  closingRequestItem: any;
  remarkForm: FormGroup;
  formErrors = {
    remark: "",
  };
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private makerRequestService: MakerRequestsService,
    private location: Location
  ) { }

  buildForm() {
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

  ngOnInit() {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Maker Requests";
    this.getmakerRequests();
  }

  getmakerRequests() {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
    .getResponsePromise(this.appConstants.getAllDataForMaker)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.makerRequests = res.result;
        console.log('maker requests: ', this.makerRequests);
        if (this.makerRequests.length < 1) {
          showToastMessage("No Record Available");
        }
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllDataForMaker, res);
      }
    });
  }

  filterMakerRequest() {
    return this.makerRequests.filter(x => x.channelId !== 2);
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick() {
    this.commonMethod.cancel();
    closeTinyModel();
  }

  onEditClicked(item) {
    console.log(item);
    if(item.activityName === 'CUSTOMERRESETPASSWOEDEDIT' || item.statusName === 'ADMIN APPROVER PENDING') {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      switch(item.tableName){
        case "CALCULATORFORMULA_PRD":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "calculatorFormulaEdit";
        this.router.navigateByUrl("/calculatorFormulaEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CALCULATORMASTER_PRD":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.masterCalculator.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterCalculatorEdit";
        this.router.navigateByUrl("/masterCalculatorEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CUSTOMERS":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.customerAgent.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "customerAgentEdit";
        this.router.navigateByUrl("/customerAgentEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CONFIGURATIONMASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterConfigEdit";
        this.router.navigateByUrl("/masterConfigEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CUSTOMEROTHERINFO":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "customerInfoEdit";
        this.router.navigateByUrl("/customerInfoEdit",{ state: { id: item.activityRefNo} });
        break;

        case "DONATION_PRD":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.DonationData.createdOn = item.createdOn;
        this.commonData.DonationData.createdby = item.createdBy;
        this.commonData.submenuname = "masterDonationEdit";
        this.router.navigateByUrl("/masterDonationEdit",{ state: { id: item.activityRefNo} });
        break;

        case "ADAPTER_SRC_CHANNEL":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.adapterChannel.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "adapterSrcChannelEdit";
        this.router.navigateByUrl("/adapterSrcChannelEdit",{ state: { id: item.activityRefNo} });
        break;

        case "ADPATER_SRC_IP":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.adapterIp.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "adapterSrcIpEdit";
        this.router.navigateByUrl("/adapterSrcIpEdit",{ state: { id: item.activityRefNo} });
        break;

        case "WALLETPOINTSCONFIGURATION":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.adapterIp.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "adminWalletPointsEdit";
        this.router.navigateByUrl("/adminWalletPointsEdit",{ state: { id: item.activityRefNo} });
        break;

        case "LANGUAGEJSON":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.adapterIp.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterLanguageEdit";
        this.router.navigateByUrl("/masterLanguageEdit",{ state: { id: item.activityRefNo} });
        break;

        case "MASKINGRULES":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.adapterIp.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "maskingRulesEdit";
        this.router.navigateByUrl("/maskingRulesEdit",{ state: { id: item.activityRefNo} });
        break;

        case "SECURITYQUESTIONMASTER_PRD":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.securityQuestion.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "securityQuestionEdit";
        this.router.navigateByUrl("/securityQuestionEdit",{ state: { id: item.activityRefNo} });
        break;

        case "OFFERSDETAILS_PRD":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.offerData.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "customerOfferEdit";
        this.router.navigateByUrl("/customerOfferEdit",{ state: { id: item.activityRefNo} });
        break;

        case "ANNOUNCEMENTS":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.announcementData.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "announcementEdit";
        this.router.navigateByUrl("/announcementEdit",{ state: { id: item.activityRefNo} });
        break;

        case "THEMES":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "themeApplyEdit";
        this.router.navigateByUrl("/themeApplyEdit",{ state: { id: item.activityRefNo} });
        break;

        case "LOCATIONS":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.offerData.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterLocationEdit";
        this.router.navigateByUrl("/masterLocationEdit",{ state: { id: item.activityRefNo} });
        break;

        case "RMMASTER_PRD":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.offerData.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "rmMasterEdit";
        this.router.navigateByUrl("/rmMasterEdit",{ state: { id: item.activityRefNo} });
        break;

        case "MAIN_MENU":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.offerData.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterMenuEdit";
        this.router.navigateByUrl("/masterMenuEdit",{ state: { id: item.activityRefNo} });
        break;

        case "PRODUCTMASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.offerData.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterProductEdit";
        this.router.navigateByUrl("/masterProductEdit",{ state: { id: item.activityRefNo} });
        break;

        case "ACTIVITYMASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.offerData.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterFacilityEdit";
        this.router.navigateByUrl("/masterFacilityEdit",{ state: { id: item.activityRefNo} });
        break;

        case "USERDEVICESMASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.offerData.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "customerDeviceMasterEdit";
        this.router.navigateByUrl("/customerDeviceMasterEdit",{ state: { id: item.activityRefNo} });
        break;

        case "NOTIFICATIONCATEGORIESMASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.notificationCategories.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "notificationCategoriesEdit";
        this.router.navigateByUrl("/notificationCategoriesEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CORP_MENU":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.corpCompanyMenu.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "corporateMenuEdit";
        this.router.navigateByUrl("/corporateMenuEdit",{ state: { id: item.activityRefNo} });
        break;

        case "ACCOUNT_TYPE_MASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.accountType.createdon = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "accountTypeEdit";
        this.router.navigateByUrl("/accountTypeEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CORP_ACC_USER_TYPE":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.corpAccountUserTypeDetails.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "corpAccountUserTypeEdit";
        this.router.navigateByUrl("/corpAccountUserTypeEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CORP_COMPANY_MASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.corpCompanyDetails.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "corporateCompanyEdit";
        this.router.navigateByUrl("/corporateCompanyEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CORP_USER_TYPES":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.corpUserTypeDetails.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "corpUserTypeEdit";
        this.router.navigateByUrl("/corpUserTypeEdit",{ state: { id: item.activityRefNo} });
        break;


        case "CUSTNOTIFICATIONCATEGORIES":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.custNotificationCategories.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "custNotificationCategoriesEdit";
        this.router.navigateByUrl("/custNotificationCategoriesEdit",{ state: { id: item.activityRefNo} });
        break;


        case "CORP_COMP_MENU_MAPPING":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.custNotificationCategories.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "corporateCompanyMenuEdit";
        this.router.navigateByUrl("/corporateCompanyMenuEdit",{ state: { id: item.activityRefNo} });
        break;

        case "TICKETS_PRD":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "servicesDtl";
        this.router.navigateByUrl("/servicesDtl",{ state: { id: item.activityRefNo} });
        break;

        case "DOCUMENT_TYPES_MASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.documentType.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "documentTypeEdit";
        this.router.navigateByUrl("/documentTypeEdit",{ state: { id: item.activityRefNo} });
        break;

        case "HOLIDAYLIST":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.holidayList.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "holidayListEdit";
        this.router.navigateByUrl("/holidayListEdit",{ state: { id: item.activityRefNo} });
        break;

        case "INVESTMENT_PRODUCTS":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.investmentProduct.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "investmentProductEdit";
        this.router.navigateByUrl("/investmentProductEdit",{ state: { id: item.activityRefNo} });
        break;

        case "OMNIGLOBALLIMITMASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterLimitsEdit";
        this.router.navigateByUrl("/masterLimitsEdit",{ state: { id: item.activityRefNo} });
        break;

        case "MESSAGECODEMASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.messageCodeMaster.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "messageCodeMasterEdit";
        this.router.navigateByUrl("/messageCodeMasterEdit",{ state: { id: item.activityRefNo} });
        break;

        case "COUNTRYMASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.countryMaster.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterCountryEdit";
        this.router.navigateByUrl("/masterCountryEdit",{ state: { id: item.activityRefNo} });
        break;

        case "STATEMASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.stateMaster.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterStateEdit";
        this.router.navigateByUrl("/masterStateEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CITIESMASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.cityMaster.createdOn = item.createdOn;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "masterCityEdit";
        this.router.navigateByUrl("/masterCityEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CATEGORY_COMPANY_PRODUCTS":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "insuranceProductEdit";
        this.router.navigateByUrl("/insuranceProductEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CATEGORY_MASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "insuranceCategoryEdit";
        this.router.navigateByUrl("/insuranceCategoryEdit",{ state: { id: item.activityRefNo} });
        break;

        case "CATEGORY_COMP_MASTER":
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "insuranceCompanyEdit";
        this.router.navigateByUrl("/insuranceCompanyEdit",{ state: { id: item.activityRefNo} });
        break;

        case "BANKTOKEN":
        console.log('item data: ', item);
        var selectedChannel = "";
        if(item.statusName == 'ADMIN CHECKER PENDING') {
          selectedChannel = 'Retail';
        }
        else {
          selectedChannel = 'Corporate';
        }
        this.commonServiceCall.makerRequestEditUrl = this.router.url;
        this.commonData.submenuId = item.activityId;
        this.commonData.submenuname = "bankTokenEdit";
        this.router.navigateByUrl("/bankTokenEdit",{ state: { id: item.activityRefNo, channel: selectedChannel} });
        break;
      }
    }
  }

  closeActionModel() {
    closeTinyModel();
  }

  onCloseClicked(item) {
    this.buildForm();
    openTinyModel();
    this.selModel = "closeRequest";
    this.closingRequestItem = item;
  }

  closeRequest(formdata) {
    if(this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.makerRequestService.closeRequestCall(this.closingRequestItem, formData);
      this.closeMakerRequest(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeMakerRequest(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.makerReqUrl, param)
      .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.getmakerRequests();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.makerReqUrl, res);
      }
    });
  }

}
