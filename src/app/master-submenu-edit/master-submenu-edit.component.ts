import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';

import { AppConstants } from '../app-constants';
import { MasterSubMenuEditService } from './master-submenu-edit.service';
import { browserRefresh } from '../app.component';

declare var showToastMessage: any;
@Component({
  selector: 'app-master-submenu-edit',
  templateUrl: './master-submenu-edit.component.html',
  styleUrls: ['./master-submenu-edit.component.css']
})
export class MasterSubMenuEditComponent implements OnInit {
  beforeParam:any=[]
  masterSubMenuEdit;
  masterSubMenuEditForm: FormGroup;
  formErrors = {
    menuName:'',
    status:'',
    menuLogo: '',
    menudesc:'',
    menuLink:'',
  }

  menuResult:any=[];
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterMenuEditService: MasterSubMenuEditService
  ) { }

  public buildForm() {
    this.masterSubMenuEditForm = this.form.group({
      menuName: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      menuLogo: new FormControl('', [Validators.required,//Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpe?g|.png)$/i)
    ]),
      menudesc: new FormControl('', [Validators.required]),
      menuLink: new FormControl('', [Validators.required]),
    });
    this.masterSubMenuEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.masterSubMenuEditForm, this.formErrors, true)
    });
  }

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterMenu');
      return;
    }

    this.commonServiceCall.pageName = "Submenu Master Edit"
    this.masterSubMenuEdit = this.location.getState();
    this.buildForm();
    this.getSubMastreMenuById(this.masterSubMenuEdit.id);
  }

  gotoSubMenuMaster() {
    this.router.navigateByUrl('/masterSubMenu');
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.masterMenuEditService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  getSubMastreMenuById(id){
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getMasterSubMenuById + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
        this.beforeParam = res.result
        this.commonMethod.hideLoader();
        console.log('menu: ', res.result);
        this.menuResult = res.result;
        this.masterSubMenuEditForm.patchValue({
          menuName: res.result.menuName,
          status: res.result.statusId,
          menuLogo: res.result.menuLogo,
          menudesc:res.result.menudesc,
          menuLink:res.result.menuLink
        })
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getMasterSubMenuById, res);
      }
    })
  }

  update() {
    this.formValidation.markFormGroupTouched(this.masterSubMenuEditForm);
    if (this.masterSubMenuEditForm.valid) {
      var param = this.masterMenuEditService.updateMasterMenuCall(this.masterSubMenuEditForm.value,this.masterSubMenuEdit.id,this.menuResult)
      this.updateMenuMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.masterSubMenuEditForm, this.formErrors, false)
    }
  }

  updateMenuMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateMasterSubMenu, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateMasterSubMenu+"\n"+"Params="+JSON.stringify(param)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParam),'update')
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/masterSubMenu");
      }
      else {
        showToastMessage("Master Update Error");
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateMasterSubMenu, res);
    })
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.updateMasterSubMenu) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.getMasterSubMenuById) {
      this.commonMethod.errorMessage(res);
    }
  }

}
