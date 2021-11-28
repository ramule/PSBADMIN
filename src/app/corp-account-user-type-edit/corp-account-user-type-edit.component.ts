import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CorpAccountUserTypeEditService } from './corp-account-user-type-edit.service';
import { Location } from '@angular/common';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corp-account-user-type-edit',
  templateUrl: './corp-account-user-type-edit.component.html',
  styleUrls: ['./corp-account-user-type-edit.component.css']
})
export class CorpAccountUserTypeEditComponent implements OnInit {
  status: any = [];
  remarkHistoryArr: any = []
  selectedCorpUserType: any;
  corpAccountUserType: any;
  corporateAccountUserEditForm: FormGroup;
  remarkForm: FormGroup
  formErrors = {
    userType: '',
    accountType: '',
    statusId: '',
    remark: ''
  }
  corpAccountUserFields = {
    userType: '',
    statusId: '',
    accountType: '',
  }
  roleId: any;
  selModel: any;
  beforeParams: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private corpAccountUserTypeEditService: CorpAccountUserTypeEditService,
    private location: Location,
  ) { }

  public buildForm() {
    this.corporateAccountUserEditForm = this.form.group({
      userType: new FormControl('', [Validators.required]),
      accountType: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
    });
    this.corporateAccountUserEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateAccountUserEditForm, this.formErrors, true)
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
      this.router.navigateByUrl('/corpAccountUserType');
      return;
    }

    this.commonServiceCall.pageName = "Edit Corporate Account User Type";
    this.roleId = this.commonDataShareService.roleId;
    console.log(this.commonServiceCall.makerRequestEditUrl);
    this.corpAccountUserType = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getCorpUserTypeAccountById(this.corpAccountUserType.id);
    this.getRemarkHistoryData(this.corpAccountUserType.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpAccountUserTypeEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
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


  getCorpUserTypeAccountById(id) {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getCorpUserTypeAccountById + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.selectedCorpUserType = res.result[0];
        this.beforeParams = res.result[0];
        this.commonDataShareService.corpAccountUserTypeDetails.accountTypeId = res.result[0].accountTypeId
        this.commonDataShareService.corpAccountUserTypeDetails.corpUserTypeId = res.result[0].corpUserTypeId
        if (res.result[0].userAction != null) {
          this.corporateAccountUserEditForm.patchValue({
            userType: res.result[0].userType,
            statusId: res.result[0].userAction,
            accountType: res.result[0].accountType,
          })
        }
        else {
          this.corporateAccountUserEditForm.patchValue({
            userType: res.result[0].userType,
            statusId: res.result[0].statusid,
            accountType: res.result[0].accountType,
          })
        }
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
    })
  }

  update() {
    this.formValidation.markFormGroupTouched(this.corporateAccountUserEditForm);
    if (this.corporateAccountUserEditForm.valid) {
      var formData = this.corporateAccountUserEditForm.value;
      var param = this.corpAccountUserTypeEditService.updateCorpAccountUserTypeCall(formData, this.corpAccountUserType.id, this.selectedCorpUserType)
      this.updateCorpAccountUserType(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateAccountUserEditForm, this.formErrors, false)
    }
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
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
    });
  }

  updateCorpAccountUserType(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCorpUserTypeAccount, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCorpUserTypeAccount + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        this.cancel()
      }
      else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
          this.corporateAccountUserEditForm.patchValue({
            userType: this.corpAccountUserFields.userType,
            statusId: this.corpAccountUserFields.statusId,
            accountType: this.corpAccountUserFields.accountType,
          })
        }
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateCorpUserTypesUrl, res);
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == '/corpAccountUserType') {
      this.router.navigateByUrl("/corpAccountUserType");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests') {
      console.log(this.commonServiceCall.makerRequestEditUrl);
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/corpAccountUserType");
    }
  }


  openActionModel(action, formdata) {
    if (this.corporateAccountUserEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.corpAccountUserFields.userType = formdata.userType;
      this.corpAccountUserFields.statusId = formdata.statusId;
      this.corpAccountUserFields.accountType = formdata.accountType;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateAccountUserEditForm, this.formErrors, false)
    }
  }

  updateCorpAccoutnUserWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corpAccountUserTypeEditService.updateCorpAccountUserTypeCallWithRemark(this.corpAccountUserFields, this.corpAccountUserType.id, this.selectedCorpUserType, formdata);
      this.updateCorpAccountUserType(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }


  closeActionMoel() {
    this.corporateAccountUserEditForm.patchValue({
      userType: this.corpAccountUserFields.userType,
      statusId: this.corpAccountUserFields.statusId,
      accountType: this.corpAccountUserFields.accountType,
    })
    closeTinyModel();
  }

}
