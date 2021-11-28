import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CorporateMenuAddService } from 'src/app/corporate-menu-add/corporate-menu-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-menu-add',
  templateUrl: './corporate-menu-add.component.html',
  styleUrls: ['./corporate-menu-add.component.css']
})
export class CorporateMenuAddComponent implements OnInit {

  status: any = [];

  corporateMenuAddForm: FormGroup;
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
    menuLogoPath: '',
    status: '',
  }

  roleId: any;
  selModel: any;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private corporateMenuAddService: CorporateMenuAddService
  ) { }


  public buildForm() {
    this.corporateMenuAddForm = this.form.group({
      menuName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      menuLink: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      menuLogoPath: new FormControl('', [Validators.required, Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpe?g|.png)$/i)]),
      status: new FormControl('', [Validators.required]),
    });
    this.corporateMenuAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateMenuAddForm, this.formErrors, true)
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
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.commonServiceCall.pageName = "Add Corporate Menu";
    this.commonMethod.hideLoader();
    this.corporateMenuAddForm.patchValue({
      status: 3
    })
  }


  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corporateMenuAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  cancel() {
    this.router.navigateByUrl("/corporateMenu");
  }

  addCorporateMenu() {
    this.formValidation.markFormGroupTouched(this.corporateMenuAddForm);
    if (this.corporateMenuAddForm.valid) {
      var formData = this.corporateMenuAddForm.value;
      var param = this.corporateMenuAddService.addCorpMenu(this.corporateMenuAddForm.value);
      console.log('request parameters: ', param);
      this.saveCorporateMenuDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.corporateMenuAddForm, this.formErrors, false)
    }
  }

  saveCorporateMenuDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addCorpMenu, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/corporateMenu");
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.addCorpMenu + "\n" + "Params=" + JSON.stringify(param), 'add')
      }
      else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
          this.corporateMenuAddForm.patchValue({
            menuName: this.corpMenuFields.menuName,
            menuLink: this.corpMenuFields.menuLink,
            menuLogoPath: this.corpMenuFields.menuLogoPath,
            status: this.corpMenuFields.status,
          });
        }
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
    });
  }

  openActionModel(action, formdata) {
    if (this.corporateMenuAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.corpMenuFields.menuName = formdata.menuName;
      this.corpMenuFields.menuLink = formdata.menuLink;
      this.corpMenuFields.menuLogoPath = formdata.menuLogoPath;
      this.corpMenuFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateMenuAddForm, this.formErrors, false)
    }
  }

  addCalculatorFormulaWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corporateMenuAddService.addCorpMenuWithRemark(this.corpMenuFields, formData);
      this.saveCorporateMenuDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.corporateMenuAddForm.patchValue({
      menuName: this.corpMenuFields.menuName,
      menuLink: this.corpMenuFields.menuLink,
      menuLogoPath: this.corpMenuFields.menuLogoPath,
      status: this.corpMenuFields.status,
    });
    closeTinyModel();
  }


}
