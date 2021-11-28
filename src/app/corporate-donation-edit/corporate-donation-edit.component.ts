import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CorporateDonationEditService } from './corporate-donation-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-donation-edit',
  templateUrl: './corporate-donation-edit.component.html',
  styleUrls: ['./corporate-donation-edit.component.css']
})
export class CorporateDonationEditComponent implements OnInit {

  beforeParam: any = [];
  corpEditDonationForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    companyName: "",
    accNo: "",
    type: "",
    status: "",
    remark: "",
  };

  corpDonationFields = {
    companyName: "",
    accNo: "",
    type: "",
    status: "",
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
    private corpDonationEditService: CorporateDonationEditService
  ) { }

  public buildForm() {
    this.corpEditDonationForm = this.form.group({
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
    });
    this.corpEditDonationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.corpEditDonationForm,
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
      this.router.navigateByUrl('/corporateDonation');
      return;
    }

    this.commonServiceCall.pageName = "Corporate Donation Edit";
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
    var param = this.corpDonationEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

  getDonationById(id) {
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getCorpDonationDetailsByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.donationDtl = res.result;
        this.beforeParam = res.result[0];
        if (
          res.result[0].userAction != null
        ) {
          this.corpEditDonationForm.patchValue({
            companyName: res.result[0].name,
            accNo: res.result[0].accountNumber,
            type: res.result[0].bankingType,
            status: res.result[0].userAction,
          });
        } else {
          this.corpEditDonationForm.patchValue({
            companyName: res.result[0].name,
            accNo: res.result[0].accountNumber,
            type: res.result[0].bankingType,
            status: res.result[0].statusId,
          });
        }
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpDonationDetailsByIdUrl, res);
      }
    });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.corpEditDonationForm);
    if (this.corpEditDonationForm.valid) {
      var formData = this.corpEditDonationForm.value;
      var param = this.corpDonationEditService.updateDonationMasterCall(
        formData
      );
      this.updateDonationMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.corpEditDonationForm,
        this.formErrors,
        false
      );
    }
  }

  gotoDonation() {
    if (this.commonServiceCall.makerRequestEditUrl == "/corporateDonation") {
      this.router.navigateByUrl("/corporateDonation");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/corpMakerRequests") {
      this.router.navigateByUrl("/corpMakerRequests");
    } else {
      this.router.navigateByUrl("/corporateDonation");
    }
  }

  updateDonationMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateCorpDonationDetailsUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.updateCorpDonationDetailsUrl +
            "\n" +
            "Params=" +
            JSON.stringify(param) +
            "\n" +
            "Before Update Params=" +
            JSON.stringify(this.beforeParam),
            "update"
          );

          showToastMessage(res.responseMessage);
          this.gotoDonation();
        } else {
          if (this.commonData.roleType == this.commonData.corpMakerRole) {
            this.corpEditDonationForm.patchValue({
              companyName: this.corpDonationFields.companyName,
              accNo: this.corpDonationFields.accNo,
              type: this.corpDonationFields.type,
              status: this.corpDonationFields.status,
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.updateCorpDonationDetailsUrl, res);
        }
      });
  }

  callBackFunction() { }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    if (this.corpEditDonationForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.corpDonationFields.companyName = formdata.companyName;
      this.corpDonationFields.accNo = formdata.accNo;
      this.corpDonationFields.type = formdata.type;
      this.corpDonationFields.status = formdata.status;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.corpEditDonationForm,
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
      var param = this.corpDonationEditService.updateDonationMasterCallWithRemark(
        this.corpDonationFields,
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
    this.corpEditDonationForm.patchValue({
      companyName: this.corpDonationFields.companyName,
      accNo: this.corpDonationFields.accNo,
      type: this.corpDonationFields.type,
      status: this.corpDonationFields.status,
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

}
