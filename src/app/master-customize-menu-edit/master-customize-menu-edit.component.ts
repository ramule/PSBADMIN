import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAdministrationAddUserService } from '../admin-administration-add-user/admin-administration-add-user.service';
import { AppConstants } from '../app-constants';
import { browserRefresh } from '../app.component';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MasterCustomizeMenuEditService } from './master-customize-menu-edit.service';
declare var showToastMessage: any;
@Component({
  selector: 'app-master-customize-menu-edit',
  templateUrl: './master-customize-menu-edit.component.html',
  styleUrls: ['./master-customize-menu-edit.component.css']
})
export class MasterCustomizeMenuEditComponent implements OnInit {

  customizeEditUserForm : FormGroup;
  isLogoImgError: boolean = false;
  isValidLogoFileFormat: boolean = false;
  isValidLogoSizeFileFormat: boolean = false;
  logoImage: any;
  beforeParam: any;
  customizeMenuData: any;
  formErrors = {
    modelName:'',
    appId: '',
    type:'',
    statusId:'',
    productType:'',
    menuType: ''
  }
  images={
    logoImage:'',
  }
  roles:any =[];
  status:any = [];
  productTypes:any = [];
  // private productTypes:any =[];
  displayRoles:boolean = false;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public masterCustomizeMenuEditService : MasterCustomizeMenuEditService,
    public appConstants : AppConstants,
    public commonMethod : CommonMethods,
    public datePipe: DatePipe,
    private location: Location,
    public adminAddUser: AdminAdministrationAddUserService,
  ) { }

  public buildForm() {
    this.customizeEditUserForm = this.form.group({
      modelName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
      appId: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
      logoImage: new FormControl(''),
      menuType: new FormControl('', [Validators.required]),
    });
    this.customizeEditUserForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.customizeEditUserForm, this.formErrors, true)
    });
  }

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterCustomizeMenu');
      return;
    }

    this.commonServiceCall.pageName = "Edit Customize Menu";
    this.customizeMenuData = this.location.getState();
    console.log(this.customizeMenuData);
    this.buildForm();
    this.getRoles();
    // this.getProductType();
    this.getStatus();
    this.getAppMasterList();
    this.getCustomizeMenuById(this.customizeMenuData.id);
  }

  //on load functions
  getAppMasterList(){
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      console.log('response data: ', res);
      if (res.status) {
        console.log('response data: ', res);
        this.productTypes = res.resp;
        console.log('response array: ', this.productTypes);
      } else {
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  getCustomizeMenuById(id){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getPSBAppMenuById+id).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.beforeParam =  res.result[0];
        var result = res.result[0];

        this.logoImage = 'data:image/jpg;base64,'+result.menuImageString;
        this.images.logoImage = 'data:image/jpg;base64,'+result.menuImageString;

        console.log(res);
        if(res.result[0].userAction !=null) {
          this.customizeEditUserForm.patchValue({
            logoImage: this.logoImage,
            modelName: res.result[0].moduleName,
            statusId: res.result[0].userAction,
            type: res.result[0].roleId,
            productType: res.result[0].roleId,
            appId: res.result[0].appId,
            menuType: res.result[0].type,
          })
        }else{
          this.customizeEditUserForm.patchValue({
            logoImage: this.logoImage,
            modelName: res.result[0].moduleName,
            statusId: res.result[0].statusId,
            type: res.result[0].roleId,
            productType: res.result[0].roleId,
            appId: res.result[0].appId,
            menuType: res.result[0].type,
          })
        }
        this.commonMethod.hideLoader();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getPSBAppMenuById, res);
      }

    })
  }

  typeChange(){
    if(this.customizeEditUserForm.value.type == '1'){
      this.displayRoles = true;
      this.customizeEditUserForm.addControl('productType', new FormControl('', [Validators.required]));
    }
    else{
      this.displayRoles = false;
      this.customizeEditUserForm.removeControl('productType');
    }
  }
  //on load functions
  getRoles(){
    this.commonMethod.showLoader();
    var param = this.adminAddUser.getRoleTypeIdCall();
    console.log('role type id param: ', param);
    this.commonServiceCall.postResponsePromise(this.appConstants.getActiveRoles, param).subscribe(data => {
      this.commonMethod.hideLoader();
      var res = data.resp;
      if(data.status){
        console.log("roles",data.resp);
        this.roles = res.result;
      }
      else{
        this.errorCallBack(this.appConstants.getActiveRoles, res);
      }
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

  filterStatus()
  {
    return this.status.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  filterProduct()
  {
    return this.commonData.productTypes.filter(x => x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "UPIDESKTOP" || x.shortName == "UPIMOBILE" || x.shortName == "ALL" );
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
          this.isValidLogoFileFormat = true;
          this.isValidLogoSizeFileFormat = false
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
            me.isValidLogoSizeFileFormat = true;
            me.isValidLogoFileFormat = false;
          }
          else{
            me.logoImage = e.target.result;
            me.commonMethod.getBase64FromFile(file).subscribe((base64)=>{
              me.images.logoImage = base64;
            });
            me.customizeEditUserForm.get('logoImage').setValue(file);
            me.isLogoImgError = false;
            me.isValidLogoSizeFileFormat = false;
            me.isValidLogoFileFormat = false;
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  update(){
    this.isLogoImgError = false;
    this.isValidLogoFileFormat = false;
    if(this.customizeEditUserForm.get('logoImage').value == ""){ this.isLogoImgError = true;}
    var userDetails = (this.commonServiceCall.userCredential);
    this.formValidation.markFormGroupTouched(this.customizeEditUserForm);
    if (this.customizeEditUserForm.valid) {
      if(this.isLogoImgError == true){ return;}
      if(this.isValidLogoSizeFileFormat == true){ return;}

      var param = this.masterCustomizeMenuEditService.updateCustomizeUserParam(this.customizeEditUserForm.value, this.images, this.customizeMenuData.id);
        this.updateCustomizeMenu(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.customizeEditUserForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl("/masterCustomizeMenu");
  }

  updateCustomizeMenu(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updatePSBAppMenu, param).subscribe(data => {
      var res = data.resp;
      console.log('add user response: ', res);
      if (res.responseCode == "200") {
        console.log(res);
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/masterCustomizeMenu");
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updatePSBAppMenu, res);
      }
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
