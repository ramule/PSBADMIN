import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorporateMenuEditService } from 'src/app/corporate-menu-edit/corporate-menu-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-menu-edit',
  templateUrl: './corporate-menu-edit.component.html',
  styleUrls: ['./corporate-menu-edit.component.css']
})
export class CorporateMenuEditComponent implements OnInit {

  corporateMenuEdit: any;

  corporateMenuEditForm: FormGroup;
  remarkForm: FormGroup
  formErrors = {
    menuName: '',
    menuLink: '',
    menuLogoPath: '',
    status: '',
    remark: ''
  }

  corpMenuFields = {
    menuName: '',
    menuLink: '',
    status: '',
    menuLogoPath: ''
  }

  remarkHistoryArr: any = [];
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
    private location: Location,
    private corporateMenuEditService: CorporateMenuEditService,
  ) { }


  public buildForm() {
    this.corporateMenuEditForm = this.form.group({
      menuName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      menuLink: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      menuLogoPath: new FormControl('', [Validators.required, Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpe?g|.png)$/i)]),
      status: new FormControl('', [Validators.required]),
    });
    this.corporateMenuEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateMenuEditForm, this.formErrors, true)
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
      this.router.navigateByUrl('/corporateMenu');
      return;
    }

    this.roleId = this.commonDataShareService.roleId;
    this.commonServiceCall.pageName = "Corporate Menu Edit";
    this.corporateMenuEdit = this.location.getState();
    this.buildForm();
    this.getCorporateMenuById(this.corporateMenuEdit.id);
    this.getRemarkHistoryData(this.corporateMenuEdit.id);
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


  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corporateMenuEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == '/corporateMenu') {
      this.router.navigateByUrl("/corporateMenu");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests') {
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/corporateMenu");
    }
  }

  getCorporateMenuById(id) {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getCorpMenuById + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        var result = res.result[0];
        this.beforeParams = res.result[0];
        console.log('menu: ', result);
        if (res.result[0].userAction != null) {
          this.corporateMenuEditForm.patchValue({
            menuName: result.menuname,
            menuLink: result.menuLink,
            status: result.userAction,
            menuLogoPath: result.menuLogo != null ? result.menuLogo : '-'
          })
        }
        else {
          this.corporateMenuEditForm.patchValue({
            menuName: result.menuname,
            menuLink: result.menuLink,
            status: result.status,
            menuLogoPath: result.menuLogo != null ? result.menuLogo : '-'
          })
        }
      }
      else {
        this.commonMethod.hideLoader();
      }
    })
  }

  editCorporateMenu() {
    this.formValidation.markFormGroupTouched(this.corporateMenuEditForm);
    if (this.corporateMenuEditForm.valid) {
      var formData = this.corporateMenuEditForm.value;
      var param = this.corporateMenuEditService.editCorpMenu(this.corporateMenuEditForm.value, this.corporateMenuEdit.id, this.beforeParams);
      console.log('request parameters: ', param);
      this.updateCorporateMenuDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateMenuEditForm, this.formErrors, false)
    }
  }

  updateCorporateMenuDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCorpMenu, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCorpMenu + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        this.cancel()
      }
      else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
          this.corporateMenuEditForm.patchValue({
            menuName: this.corpMenuFields.menuName,
            menuLink: this.corpMenuFields.menuLink,
            status: this.corpMenuFields.status,
            menuLogoPath: this.corpMenuFields.menuLogoPath
          })
        }
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
    });
  }


  openActionModel(action, formdata) {
    if (this.corporateMenuEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.corpMenuFields.menuName = formdata.menuName;
      this.corpMenuFields.menuLink = formdata.menuLink;
      this.corpMenuFields.status = formdata.status;
      this.corpMenuFields.menuLogoPath = formdata.menuLogoPath;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateMenuEditForm, this.formErrors, false)
    }
  }

  updateCorpMenuWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corporateMenuEditService.editCorpMenuWithRemark(this.corpMenuFields, this.corporateMenuEdit.id, this.beforeParams, formdata);
      this.updateCorporateMenuDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.corporateMenuEditForm.patchValue({
      menuName: this.corpMenuFields.menuName,
      menuLink: this.corpMenuFields.menuLink,
      status: this.corpMenuFields.status,
      menuLogoPath: this.corpMenuFields.menuLogoPath
    })
    closeTinyModel();
  }

}
