import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAdministrationAddUserService } from '../admin-administration-add-user/admin-administration-add-user.service';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MasterCustomizeMenuAddService } from './master-customize-menu-add.service';
declare var showToastMessage: any;
@Component({
  selector: 'app-master-customize-menu-add',
  templateUrl: './master-customize-menu-add.component.html',
  styleUrls: ['./master-customize-menu-add.component.css']
})
export class MasterCustomizeMenuAddComponent implements OnInit {

  customizeAddUserForm : FormGroup;
  isLogoImgError: boolean = false;
  isValidLogoFileFormat: boolean = false;
  isValidLogoSizeFileFormat: boolean = false;
  logoImage: any;
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
    public masterCustomizeMenuAddService : MasterCustomizeMenuAddService,
    public appConstants : AppConstants,
    public commonMethod : CommonMethods,
    public adminAddUser: AdminAdministrationAddUserService,
  ) { }

  public buildForm() {
    this.customizeAddUserForm = this.form.group({
      modelName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
      appId: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
      logoImage: new FormControl(''),
      menuType: new FormControl('', [Validators.required]),
    });
    this.customizeAddUserForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.customizeAddUserForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Add Customize Menu";
    this.buildForm();
    this.getRoles();
    this.getAppMasterList();
    this.getStatus();
    this.customizeAddUserForm.patchValue({
      statusId : 3
    })
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

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.masterCustomizeMenuAddService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }


  typeChange(){
    if(this.customizeAddUserForm.value.type == '1'){
      this.displayRoles = true;
      this.customizeAddUserForm.addControl('productType', new FormControl('', [Validators.required]));
    }
    else{
      this.displayRoles = false;
      this.customizeAddUserForm.removeControl('productType');
    }
  }
  //on load functions
  getRoles(){
    this.commonMethod.showLoader();
    var param = this.adminAddUser.getRoleTypeIdCall();
    console.log('role type id param: ', param);
    this.commonServiceCall.postResponsePromise(this.appConstants.getActiveRoles, param).subscribe(data => {
      var res = data.resp;
      this.commonMethod.hideLoader();
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
    return this.commonData.productTypes.filter(x => x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "UPIDESKTOP" || x.shortName == "UPIMOBILE" || x.shortName == "ALL");
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
            me.customizeAddUserForm.get('logoImage').setValue(file);
            me.isLogoImgError = false;
            me.isValidLogoSizeFileFormat = false;
            me.isValidLogoFileFormat = false;
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  add(){
    this.isLogoImgError = false;
    this.isValidLogoFileFormat = false;
    if(this.customizeAddUserForm.get('logoImage').value == ""){ this.isLogoImgError = true;}
    var userDetails = (this.commonServiceCall.userCredential);
    this.formValidation.markFormGroupTouched(this.customizeAddUserForm);
    if (this.customizeAddUserForm.valid) {
      if(this.isLogoImgError == true){ return;}
      if(this.isValidLogoSizeFileFormat == true){ return;}

      var param = this.masterCustomizeMenuAddService.addCustomizeUserParam(this.customizeAddUserForm.value, this.images);
        this.addUserMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.customizeAddUserForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl("/masterCustomizeMenu");
  }

  addUserMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.customizeMenuAdd, param).subscribe(data => {
      var res = data.resp;
      console.log('add user response: ', res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.customizeMenuAdd+"\n"+"Params="+JSON.stringify(param),'add')
        console.log(res);
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/masterCustomizeMenu");
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.customizeMenuAdd, res);
      }
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
