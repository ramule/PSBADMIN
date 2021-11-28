import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorporateCompanyMenuEditService } from './corporate-company-menu-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-company-menu-edit',
  templateUrl: './corporate-company-menu-edit.component.html',
  styleUrls: ['./corporate-company-menu-edit.component.css']
})
export class CorporateCompanyMenuEditComponent implements OnInit {

  status: any = [];
  remarkHistoryArr: any = []
  selectedCorpUserType: any;
  corpCompanyMenu: any;
  corporateCompanyMenuEditForm: FormGroup;
  remarkForm: FormGroup
  masterCompany: any = []
  masterMenu: any = []
  createdon: any;
  formErrors = {
    companyName: '',
    menuName: '',
    statusId: '',
    remark: ''
  }
  corpCompanyMenuFields = {
    companyName: '',
    menuName: '',
    statusId: '',
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
    private corpCompanyMenuEditService: CorporateCompanyMenuEditService,
    private location: Location,
  ) { }

  public buildForm() {
    this.corporateCompanyMenuEditForm = this.form.group({
      companyName: new FormControl('', [Validators.required]),
      menuName: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
    });
    this.corporateCompanyMenuEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateCompanyMenuEditForm, this.formErrors, true)
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

  ngOnInit() {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/corporateCompanyMenu');
      return;
    }

    this.commonServiceCall.pageName = "Edit Corporate Company Menu";
    this.roleId = this.commonDataShareService.roleId;
    this.corpCompanyMenu = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getCorpCompanyMenuListByCompanyId(this.corpCompanyMenu.id);
    this.getCompanyList()
    this.getMenuList()
    this.getRemarkHistoryData(this.corpCompanyMenu.id);
  }

  //on load functions
  getCompanyList() {
    this.commonMethod.showLoader();
    this.masterCompany = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.masterCompany = res.result;
      } else {
        this.errorCallBack(this.appConstants.getCorpCompanyDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  getMenuList() {
    this.commonMethod.showLoader();
    this.masterCompany = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCorpMenus).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.masterMenu = res.result;
      } else {
        this.errorCallBack(this.appConstants.getAllCorpMenus, res);
      }
      this.commonMethod.hideLoader();
    });
  }


  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpCompanyMenuEditService.addAuditTrailAdaptorParams(URL, operation);
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


  getCorpCompanyMenuListByCompanyId(id) {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getCorpCompanyMenuListById + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.selectedCorpUserType = res.result[0];
        this.beforeParams = res.result[0];
        this.createdon = res.result[0].createdon;
        if (res.result[0].userAction != null) {
          this.corporateCompanyMenuEditForm.patchValue({
            companyName: res.result[0].companyId,
            statusId: res.result[0].userAction,
            menuName: res.result[0].corpMenuId,
          })
        }
        else {
          this.corporateCompanyMenuEditForm.patchValue({
            companyName: res.result[0].companyId,
            statusId: res.result[0].statusId,
            menuName: res.result[0].corpMenuId,
          })
        }
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
    })
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

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == '/corporateCompanyMenu') {
      this.router.navigateByUrl("/corporateCompanyMenu");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests') {
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/corporateCompanyMenu");
    }
  }

  update() {
    this.formValidation.markFormGroupTouched(this.corporateCompanyMenuEditForm);
    if (this.corporateCompanyMenuEditForm.valid) {
      var formData = this.corporateCompanyMenuEditForm.value;
      var param = this.corpCompanyMenuEditService.updateCorpCompanyMenu(formData, this.corpCompanyMenu.id, this.createdon, this.selectedCorpUserType)
      this.updateCorpCompanyMenu(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateCompanyMenuEditForm, this.formErrors, false)
    }
  }

  updateCorpCompanyMenu(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCorpCompanyMenu, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCorpCompanyMenu + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        this.cancel()
      }
      else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
          this.corporateCompanyMenuEditForm.patchValue({
            companyName: this.corpCompanyMenuFields.companyName,
            statusId: this.corpCompanyMenuFields.statusId,
            menuName: this.corpCompanyMenuFields.menuName,
          })
        }
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateCorpUserTypesUrl, res);
    })
  }

  updateCorpCompanyMenuWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corpCompanyMenuEditService.updateCorpCompanyMenuWithRemark(this.corpCompanyMenuFields, this.corpCompanyMenu.id, formdata, this.createdon, this.selectedCorpUserType);
      this.updateCorpCompanyMenu(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }


  openActionModel(action, formdata) {
    if (this.corporateCompanyMenuEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.corpCompanyMenuFields.companyName = formdata.companyName;
      this.corpCompanyMenuFields.statusId = formdata.statusId;
      this.corpCompanyMenuFields.menuName = formdata.menuName;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateCompanyMenuEditForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.corporateCompanyMenuEditForm.patchValue({
      companyName: this.corpCompanyMenuFields.companyName,
      statusId: this.corpCompanyMenuFields.statusId,
      menuName: this.corpCompanyMenuFields.menuName,
    })
    closeTinyModel();
  }

}
