import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MasterCustomizeSubmenuAddService } from './master-customize-submenu-add.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-customize-submenu-add',
  templateUrl: './master-customize-submenu-add.component.html',
  styleUrls: ['./master-customize-submenu-add.component.css']
})
export class MasterCustomizeSubmenuAddComponent implements OnInit {

  masterSubMenuForm: FormGroup;
  selProduct: any;
  productTypeArr: any = [];
  formErrors = {
    subMenuName:'',
    status:'',
    channel: '',
    logoPath: '',
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterCustSubMenuAddService: MasterCustomizeSubmenuAddService
  ) { }

  public buildForm() {
    this.masterSubMenuForm = this.form.group({
      subMenuName: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      channel: new FormControl('', [Validators.required]),
      logoPath: new FormControl('', [Validators.required,Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpe?g|.png)$/i)]),
    });
    this.masterSubMenuForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.masterSubMenuForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Master Customize Submenu";
    this.buildForm();
    this.getProductType();
    this.masterSubMenuForm.patchValue({
      status: 3
    });
    this.commonMethod.hideLoader();
  }

  //onload
  getProductType(){
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe(data => {
      if(data.status){
        console.log("roles",data.resp);
        this.productTypeArr = data.resp;
      }
      else{
        this.errorCallBack(this.appConstants.masterListUrl, data.resp);
      }

    })
  }

  filterProduct()
  {
    return this.productTypeArr.filter(x => x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB" );
  }

  selectedValue(event){
    this.selProduct = event.target.value;
  }

  cancel() {
    this.router.navigateByUrl('masterCustomizeSubmenu');
  }

  addSubMasterMenu() {
    this.formValidation.markFormGroupTouched(this.masterSubMenuForm);
    if (this.masterSubMenuForm.valid) {
      var param = this.masterCustSubMenuAddService.addSubMasterMenuCall(this.masterSubMenuForm.value);
      console.log('request parameters: ', param);
      this.saveMasterMenuDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.masterSubMenuForm, this.formErrors, false)
    }
  }

  saveMasterMenuDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addCustomizeSubMenuUrl, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
        this.cancel();
        showToastMessage(res.responseMessage);
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addCustomizeSubMenuUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
      this.commonMethod.errorMessage(res);
  }
}
