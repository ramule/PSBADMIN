import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { MasterDonationsEditService } from "./master-donations-edit.service";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-master-donations-edit",
  templateUrl: "./master-donations-edit.component.html",
  styleUrls: ["./master-donations-edit.component.css"],
})
export class MasterDonationsEditComponent implements OnInit {
  beforeParam: any = [];
  masterEditDonationForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    companyName: "",
    accNo: "",
    type: "",
    status: "",
    remark: "",
    category: "",
  };

  masterDonationFields = {
    companyName: "",
    accNo: "",
    type: "",
    status: "",
    category: "",
  };

  status = [];
  remarkHistoryArr: any = [];
  donationDtl: any;
  donationId: any;

  roleId: any;
  selModel: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterDonationEditService: MasterDonationsEditService
  ) {}

  public buildForm() {
    this.masterEditDonationForm = this.form.group({
      companyName: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9_\d\-_.,\s ]+$/),
      ]),
      accNo: new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(18),
        Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9]+$/),
      ]),
      type: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9_\d\-_.,\s ]+$/)]),
      status: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
    });
    this.masterEditDonationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterEditDonationForm,
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

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterDonation');
      return;
    }


    this.commonServiceCall.pageName = "Edit Donation";
    this.roleId = this.commonData.roleId;
    this.donationId = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getDonationById(this.donationId.id);
    this.getRemarkHistoryData(this.donationId.id);
  }

  filterStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
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
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterDonationEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  getDonationById(id) {
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getDonationDetailsByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.donationDtl = res.result;
        this.beforeParam = res.result[0];
        if (
          res.result[0].userAction != null
        ) {
          this.masterEditDonationForm.patchValue({
            companyName: res.result[0].name,
            accNo: res.result[0].accountNumber,
            type: res.result[0].bankingType,
            status: res.result[0].userAction,
            category: res.result[0].category
          });
        } else {
          this.masterEditDonationForm.patchValue({
            companyName: res.result[0].name,
            accNo: res.result[0].accountNumber,
            type: res.result[0].bankingType,
            status: res.result[0].statusId,
            category: res.result[0].category
          });
        }
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getDonationDetailsByIdUrl, res);
      }
    });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.masterEditDonationForm);
    if (this.masterEditDonationForm.valid) {
      var formData = this.masterEditDonationForm.value;
      var param = this.masterDonationEditService.updateDonationMasterCall(
        formData
      );
      this.updateDonationMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterEditDonationForm,
        this.formErrors,
        false
      );
    }
  }

  gotoDonation() {
    if (this.commonServiceCall.makerRequestEditUrl == "/masterDonation") {
      this.router.navigateByUrl("/masterDonation");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/masterDonation");
    }
  }

  updateDonationMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateDonationDetailsUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.updateDonationDetailsUrl +
              "\n" +
              "Params=" +
              JSON.stringify(param) +
              "\n" +
              "Before Update Params=" +
              JSON.stringify(this.beforeParam),
            "update"
          );

          showToastMessage(res.responseMessage);
          if (this.commonServiceCall.makerRequestEditUrl == "/masterDonation") {
            this.router.navigateByUrl("/masterDonation");
          } else if (
            this.commonServiceCall.makerRequestEditUrl == "/makerRequests"
          ) {
            this.router.navigateByUrl("/makerRequests");
          } else {
            this.router.navigateByUrl("/masterDonation");
          }
        } else {
          if(this.commonData.roleType == this.commonData.makerRole) {
            this.masterEditDonationForm.patchValue({
              companyName: this.masterDonationFields.companyName,
              accNo: this.masterDonationFields.accNo,
              type: this.masterDonationFields.type,
              status: this.masterDonationFields.status,
              category: this.masterDonationFields.category
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.updateDonationDetailsUrl, res);
        }
      });
  }

  callBackFunction() {}

  errorCallBack(fld, res) {
    if (fld == this.appConstants.getDonationDetailsByIdUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.updateDonationDetailsUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.masterStatusUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  openActionModel(action, formdata) {
    if (this.masterEditDonationForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterDonationFields.companyName = formdata.companyName;
      this.masterDonationFields.accNo = formdata.accNo;
      this.masterDonationFields.type = formdata.type;
      this.masterDonationFields.status = formdata.status;
      this.masterDonationFields.category = formdata.category;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterEditDonationForm,
        this.formErrors,
        false
      );
    }
  }

  updateMasterDonationWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterDonationEditService.updateDonationMasterCallWithRemark(
        this.masterDonationFields,
        formData
      );
      this.updateDonationMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.masterEditDonationForm.patchValue({
      companyName: this.masterDonationFields.companyName,
      accNo: this.masterDonationFields.accNo,
      type: this.masterDonationFields.type,
      status: this.masterDonationFields.status,
      category: this.masterDonationFields.category
    });
    closeTinyModel();
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .getResponsePromise(
        this.appConstants.getRemarkHistoryDataUrl +
          id +
          "/" +
          this.commonData.submenuId
      )
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.remarkHistoryArr = res.result;
          //initiallize datatable
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.commonMethod.hideLoader();
        } else if (res.responseCode == "202"){
          setTimeout(function () {
            $('table.display').DataTable({
              "language": {
                "emptyTable" : "No Data found"
              }})});
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
        }
      });
  }

  //https://infrabotsdev.infrasofttech.com/UploadOffer/donation/updateDonationDetails
  //{ "id" : "3", "companyName" : "GreenHeart Foundation", "accountNumber" : "000188200001", "type" : "DONATION", "statusId" : "3"}
}
