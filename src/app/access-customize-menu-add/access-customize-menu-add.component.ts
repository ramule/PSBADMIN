import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { AccessCustomizeMenuAddService } from './access-customize-menu-add.service'
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { browserRefresh } from '../app.component';

declare var showToastMessage: any;

@Component({
  selector: 'app-access-customize-menu-add',
  templateUrl: './access-customize-menu-add.component.html',
  styleUrls: ['./access-customize-menu-add.component.css']
})
export class AccessCustomizeMenuAddComponent implements OnInit {

  accessCustomizeAddMenuForm: FormGroup;
  submenuId: any;
  submenuArr: any = [];
  mainMenuData: any;
  formErrors = {
    menuName: '',
    submenuName: '',
  }

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public accessCustomizeAddService: AccessCustomizeMenuAddService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods,
    private location: Location
  ) { }

  public buildForm() {
    this.accessCustomizeAddMenuForm = this.form.group({
      menuName: new FormControl('', [Validators.required]),
      submenuName: new FormControl('', [Validators.required]),
    });
    this.accessCustomizeAddMenuForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.accessCustomizeAddMenuForm, this.formErrors, true);
    });
  }

  ngOnInit(): void {
    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/accessCustomizeMenu');
      return;
    }
    this.commonServiceCall.pageName = "Add Customize Menu Submenu";
    this.mainMenuData = this.location.getState();
    console.log(this.mainMenuData);
    this.buildForm();
    this.getSubmenuList();
    this.accessCustomizeAddMenuForm.patchValue({
      menuName: this.mainMenuData.menuName
    })
  }

  getSubmenuList() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCustomizationSubMenuUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.submenuArr = res.result;
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllCustomizationSubMenuUrl, res);
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.accessCustomizeAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }


  onSubmenuChange(event) {
    this.submenuId = event.target.value;
    console.log('submenu id: ', this.submenuId);
  }

  add() {
    if (this.accessCustomizeAddMenuForm.valid) {
      var param = this.accessCustomizeAddService.addCustomizeUserParam(this.accessCustomizeAddMenuForm.value, this.mainMenuData);
      this.addCustomizeMenuMapping(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.accessCustomizeAddMenuForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl("/accessCustomizeMenuDetails");
  }

  addCustomizeMenuMapping(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addCustomizationMenuSubMenuMappingUrl, param).subscribe(data => {
      var res = data.resp;
      console.log('add user response: ', res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.addCustomizationMenuSubMenuMappingUrl + "\n" + "Params=" + JSON.stringify(param), 'add')
        console.log(res);
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/accessCustomizeMenuDetails");
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addCustomizationMenuSubMenuMappingUrl, res);
      }
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
