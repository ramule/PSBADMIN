import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MasterCustomizeSubmenuEditService } from './master-customize-submenu-edit.service';
import { browserRefresh } from '../app.component';
declare var showToastMessage: any;
@Component({
  selector: 'app-master-customize-submenu-edit',
  templateUrl: './master-customize-submenu-edit.component.html',
  styleUrls: ['./master-customize-submenu-edit.component.css']
})
export class MasterCustomizeSubmenuEditComponent implements OnInit {
  [x: string]: any;

  beforeParam:any=[];
  productTypeArr:any=[];
  right:any=[];
  masterSubMenuEdit;
  selProduct: any;
  menuImage:any;
  isMenuImgError: boolean = false;
  isValidMenuFileFormat: boolean = false;
  isValidMenuSizeFileFormat: boolean = false;
  statusId:''

  masterSubMenuEditForm: FormGroup;
  formErrors = {
    menuName:'',
    menuName1:'',
    status:'',
    menuLogo: '',
    channel: '',
    pageurl:'',
    rights:''

  }
  images={
    menuImage:'',
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
    private masterCustSubmenuEditService: MasterCustomizeSubmenuEditService
  ) { }

  public buildForm() {
    this.masterSubMenuEditForm = this.form.group({
      menuName: new FormControl('', [Validators.required]),
      menuName1:new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      menuLogo: new FormControl('', [Validators.required,Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpe?g|.png)$/i)]),
      channel: new FormControl('', [Validators.required]),
      pageurl:new FormControl('', [Validators.required]),
      rights:new FormControl('', [Validators.required]),
      menuImage: new FormControl(''),
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
      this.router.navigateByUrl('/masterCustomizeSubmenu');
      return;
    }

    this.commonServiceCall.pageName = "Master Customize Submenu Edit"
    this.masterSubMenuEdit = this.location.getState();
    this.buildForm();
    this.getProductType();
    this.getSubMastreMenuById(this.masterSubMenuEdit.id);
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

  gotoSubMenuMaster() {
    this.router.navigateByUrl('/masterCustomizeSubmenu');
  }

  getSubMastreMenuById(id){
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getCustomizationSubMenuByidUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
        this.beforeParam = res.result
        this.commonMethod.hideLoader();
        console.log('menu: ', res.result);
        this.menuResult = res.result[0];
        this.masterSubMenuEditForm.patchValue({
          menuName: res.result[0].submenuName,
          status: res.result[0].statusId,
          menuLogo: res.result[0].menuLogo,
          channel: res.result[0].appId,
          pageurl:res.result[0].pageurl,
          rights: res.result[0].rights,
          menuName1:res.result[0].moduleName,

        })
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustomizationSubMenuByidUrl, res);
      }
    })
  }

  selectedValue(event){
    this.selProduct = event.target.value;

  }
  selectedValue1(event){
    this.selProduct = event.target.value;

  }

  // selectedValue2(event){
  //   this.selProduct = event.target.value;
  // }

  update() {
    this.formValidation.markFormGroupTouched(this.masterSubMenuEditForm);
    if (this.masterSubMenuEditForm.valid) {
      var param = this.masterCustSubmenuEditService.updateMasterMenuCall(this.masterSubMenuEditForm.value,this.masterSubMenuEdit.id,this.menuResult)
      this.updateMenuMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.masterSubMenuEditForm, this.formErrors, false)
    }
  }

  updateMenuMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCustomizeSubMenuUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/masterCustomizeSubmenu");
      }
      else {
        this.errorCallBack(this.appConstants.updateCustomizeSubMenuUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  addImage(event: any){
    console.log("inside");
    console.log(event);

    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        console.log(file);
        if(event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png" ){
          this.commonMethod.getBase64FromFile(file);
        }
        else{
          this.isValidMenuFileFormat = true;
          this.isValidMenuSizeFileFormat = false
          return;
        }
        const reader = new FileReader();
        reader.onload = (e:any) => {
        var img = new Image();
        var me = this
        img.src = window.URL.createObjectURL( file );
        img.onload = function() {
          console.log(img);
          var width = img.naturalWidth, height = img.naturalHeight;
          if(width > 380 || height > 180){
            me.isValidMenuSizeFileFormat = true;
            me.isValidMenuFileFormat = false;
          }
          else{
            me.menuImage = e.target.result;
            me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
              me.images.menuImage = base64;
            });
            me.masterSubMenuEditForm.get('menuImage').setValue(file);
            me.isMenuImgError = false;
            me.isValidMenuSizeFileFormat = false;
            me.isValidMenuFileFormat = false;
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  // filterRights()
  // {
  //   return this.right.filter(x => x.shortName == 'T' ||  x.shortName == 'V');
  // }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
