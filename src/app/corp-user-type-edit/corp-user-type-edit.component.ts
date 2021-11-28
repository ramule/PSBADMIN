import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CorpUserTypeEditService } from './corp-user-type-edit.service';
import { Location } from '@angular/common';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corp-user-type-edit',
  templateUrl: './corp-user-type-edit.component.html',
  styleUrls: ['./corp-user-type-edit.component.css']
})
export class CorpUserTypeEditComponent implements OnInit {
  status: any = [];
  selectedCorpUserType: any;
  corpUserType: any;
  corporateUserEditForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    userType: '',
    description: '',
    statusId: '',
    ruleSeq: '',
    remark: ''
  }

  corpUserTypeFields = {
    userType: '',
    description: '',
    ruleSeq: '',
    statusId: '',
  }

  roleId: any;
  selModel: any;
  remarkHistoryArr: any = [];

  beforeParams: any;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private corpUserTypeEditService: CorpUserTypeEditService,
    private location: Location,
  ) { }


  public buildForm() {
    this.corporateUserEditForm = this.form.group({
      userType: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
      description: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
      ruleSeq: new FormControl('', [Validators.required]),
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
      this.router.navigateByUrl('/corpUserType');
      return;
    }

    this.commonServiceCall.pageName = "Edit Corporate Role";
    this.roleId = this.commonDataShareService.roleId;
    this.corpUserType = this.location.getState();
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.getStatus();
    this.getCorpUserTypeById(this.corpUserType.id);
    this.getRemarkHistoryData(this.corpUserType.id);
  }


  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpUserTypeEditService.addAuditTrailAdaptorParams(URL, operation);
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

  getCorpUserTypeById(id) {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getCorpUserTypesByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.selectedCorpUserType = res.result[0];
        this.beforeParams = res.result[0];
        if (res.result[0].userAction != null) {
          this.corporateUserEditForm.patchValue({
            userType: res.result[0].user_TYPE,
            statusId: res.result[0].userAction,
            description: res.result[0].description,
            ruleSeq: res.result[0].rule_SEQ,
          })
        }
        else {
          this.corporateUserEditForm.patchValue({
            userType: res.result[0].user_TYPE,
            statusId: res.result[0].statusid,
            description: res.result[0].description,
            ruleSeq: res.result[0].rule_SEQ,
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
    this.formValidation.markFormGroupTouched(this.corporateUserEditForm);
    if (this.corporateUserEditForm.valid) {
      var formData = this.corporateUserEditForm.value;
      var param = this.corpUserTypeEditService.updateCorpUserTypeCall(formData, this.corpUserType.id, this.selectedCorpUserType)
      this.updateCorpUserType(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateUserEditForm, this.formErrors, false)
    }
  }

  updateCorpUserType(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCorpUserTypesUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        // this.router.navigateByUrl("/corpUserType");
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCorpUserTypesUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        this.cancel()
      }
      else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
          this.corporateUserEditForm.patchValue({
            userType: this.corpUserTypeFields.userType,
            statusId: this.corpUserTypeFields.statusId,
            description: this.corpUserTypeFields.description,
            ruleSeq: this.corpUserTypeFields.ruleSeq,
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
    if (this.commonServiceCall.makerRequestEditUrl == '/corpUserType') {
      this.router.navigateByUrl("/corpUserType");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests') {
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/corpUserType");
    }
  }



  openActionModel(action, formdata) {
    if (this.corporateUserEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.corpUserTypeFields.userType = formdata.userType;
      this.corpUserTypeFields.description = formdata.description;
      this.corpUserTypeFields.statusId = formdata.statusId;
      this.corpUserTypeFields.ruleSeq = formdata.ruleSeq;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateUserEditForm, this.formErrors, false)
    }
  }

  updateCorpUserTypeWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corpUserTypeEditService.updateCorpUserTypeCallWithRemark(this.corpUserTypeFields, this.corpUserType.id, this.selectedCorpUserType, formdata);
      this.updateCorpUserType(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.corporateUserEditForm.patchValue({
      userType: this.corpUserTypeFields.userType,
      statusId: this.corpUserTypeFields.statusId,
      description: this.corpUserTypeFields.description,
      ruleSeq: this.corpUserTypeFields.ruleSeq,
    })
    closeTinyModel();
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

}
