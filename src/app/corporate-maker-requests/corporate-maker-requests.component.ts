import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CorporateMakerRequestsService } from './corporate-maker-requests.service';
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var $: any;
@Component({
  selector: 'app-corporate-maker-requests',
  templateUrl: './corporate-maker-requests.component.html',
  styleUrls: ['./corporate-maker-requests.component.css']
})
export class CorporateMakerRequestsComponent implements OnInit {
  corpMakerRequests: any = [];
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
    private corpMakerRequestService: CorporateMakerRequestsService,
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
    this.commonServiceCall.pageName = "Corporate Maker Requests";
    this.getCorpMakerRequests();
  }

  getCorpMakerRequests() {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAllDataForCorporateMaker)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.corpMakerRequests = res.result;
          console.log('corp maker requests', this.corpMakerRequests);
          if (this.corpMakerRequests.length < 1) {
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
          this.errorCallBack(this.appConstants.getAllDataForCorporateMaker, res);
        }
      });
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
    if (item.activityName === 'CUSTOMERRESETPASSWOEDEDIT' || item.statusName === 'CORP_APPROVER_PENDING') {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      switch (item.tableName) {
        case "CORP_MENU":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.corpCompanyMenu.createdOn = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corporateMenuEdit";
          this.router.navigateByUrl("/corporateMenuEdit", { state: { id: item.activityRefNo } });
          break;

        case "ACCOUNT_TYPE_MASTER":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.accountType.createdon = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "accountTypeEdit";
          this.router.navigateByUrl("/accountTypeEdit", { state: { id: item.activityRefNo } });
          break;

        case "CORP_ACC_USER_TYPE":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.corpAccountUserTypeDetails.createdOn = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corpAccountUserTypeEdit";
          this.router.navigateByUrl("/corpAccountUserTypeEdit", { state: { id: item.activityRefNo } });
          break;

        case "CORP_COMPANY_MASTER":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.corpCompanyDetails.createdOn = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corporateCompanyEdit";
          this.router.navigateByUrl("/corporateCompanyEdit", { state: { id: item.activityRefNo } });
          break;

        case "CORP_USER_TYPES":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.corpUserTypeDetails.createdOn = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corpUserTypeEdit";
          this.router.navigateByUrl("/corpUserTypeEdit", { state: { id: item.activityRefNo } });
          break;

        case "CUSTNOTIFICATIONCATEGORIES":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.custNotificationCategories.createdOn = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "custNotificationCategoriesEdit";
          this.router.navigateByUrl("/custNotificationCategoriesEdit", { state: { id: item.activityRefNo } });
          break;

        case "CUSTNOTIFICATIONCATEGORIES":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.custNotificationCategories.createdOn = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "custNotificationCategoriesEdit";
          this.router.navigateByUrl("/custNotificationCategoriesEdit", { state: { id: item.activityRefNo } });
          break;

        case "CORP_USERS":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.corporateUser.createdOn = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corporateUserEdit";
          this.router.navigateByUrl("/corporateUserEdit", { state: { id: item.activityRefNo } });
          break;

        case "DESIGNATION_HIERARCHY_MASTER":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.corpDesignationLevelData.createdOn = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corpdDesignationLevelMappingEdit";
          this.router.navigateByUrl("/corpdDesignationLevelMappingEdit", { state: { id: item.activityRefNo } });
          break;

        case "DONATION_PRD":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.submenuId = item.activityId;
          this.commonData.corpDonationData.createdOn = item.createdOn;
          this.commonData.corpDonationData.createdby = item.createdBy;
          this.commonData.submenuname = "corporateDonationEdit";
          this.router.navigateByUrl("/corporateDonationEdit", { state: { id: item.activityRefNo } });
          break;

        case "OFFERSDETAILS_PRD":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.offerData.createdon = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corporateOffersEdit";
          this.router.navigateByUrl("/corporateOffersEdit", { state: { id: item.activityRefNo } });
          break;

        case "ANNOUNCEMENTS":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.announcementData.createdon = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corporateAnnouncementEdit";
          this.router.navigateByUrl("/corporateAnnouncementEdit", { state: { id: item.activityRefNo } });
          break;

        case "TICKETS":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corporateServiceEdit";
          this.router.navigateByUrl("/corporateServiceEdit", { state: { id: item.activityRefNo } });
          break;

        case "SECURITYQUESTIONMASTER_PRD":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.securityQuestion.createdon = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corporateSecurityQuestionEdit";
          this.router.navigateByUrl("/corporateSecurityQuestionEdit", { state: { id: item.activityRefNo } });
          break;

        case "CORP_COMP_MENU_MAPPING":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corporateCompanyMenuEdit";
          this.router.navigateByUrl("/corporateCompanyMenuEdit", { state: { id: item.activityRefNo } });
          break;

        case "CORP_TEMP_SAL_PROCESS":
          showToastMessage('Request Cannot be Edited');

        case "PRODUCTMASTER":
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.corpProductData.createdon = item.createdOn;
          this.commonData.submenuId = item.activityId;
          this.commonData.submenuname = "corporateProductEditMaster";
          this.router.navigateByUrl("/corporateProductEditMaster", { state: { id: item.activityRefNo } });
          break;

        default:
          this.commonServiceCall.makerRequestEditUrl = this.router.url;
          this.commonData.setCorpLimits.createdOn = item.createdOn;
          this.commonData.corpDonationData.createdby = item.createdby;
          this.commonData.submenuname = "corpSetLimitEdit";
          var companyData = JSON.parse(item.content);
          console.log('company data: ', companyData);
          console.log('min amount: ', companyData.corpLimitData[0].minAmount);
          console.log('max amount: ', companyData.corpLimitData[0].maxAmount);
          if (companyData.corpLimitData[0].minAmount == 0 && companyData.corpLimitData[0].maxAmount == 0) {
            this.router.navigateByUrl("/corpSetLimitEdit", { state: { id: item.id, companyId: companyData.corpCompId, accNum: companyData.accountNumber, transLimitId: 0, isDefaultTrans: true } });
          }
          else {
            this.router.navigateByUrl("/corpSetLimitEdit", { state: { id: item.id, accNum: companyData.accountNumber, companyId: companyData.corpCompId, transLimitId: 0, isDefaultTrans: false } });
          }
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
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corpMakerRequestService.closeRequestCall(this.closingRequestItem, formData);
      this.closeCorpMakerRequest(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeCorpMakerRequest(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.corpMakerReqUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log(res.result);
          showToastMessage(res.responseMessage);
          this.getCorpMakerRequests();
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.corpMakerReqUrl, res);
        }
      });
  }


}
