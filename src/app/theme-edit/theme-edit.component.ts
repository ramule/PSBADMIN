import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonMethods } from '../common-methods';
import { ThemeDetailsService } from '../theme-details/theme-details.service';
import { NgxPrettifyService } from '@smartcodelab/ngx-prettify';
import { AppConstants } from '../app-constants';
declare var showToastMessage: any;
declare function beautify(): any;

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit {

  cssDetails: any;
  themeName: any;
  message: any;
  themeEditForm: FormGroup;
  pageType: any;
  urlResp:any;
  productTypes:any = [];

  uploadLogoName: any;
  dashboardBgImgName: any;
  cssImageName: any;

  reloadLogoImage: any;
  reloadBgImage: any;
  reloadIconImage: any;

  isChecked:boolean = false;
  status = "N";

  formErrors = {
    themeName: '',
    channel: '',
    uploadLogo: '',
    postfix: '',
    dashboardBg: '',
    styleCss: '',
    images: ''
  }

  beautify = require('js-beautify').css;

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    private location: Location,
    private commonDataService: CommonDataShareService,
    private themeDtlService: ThemeDetailsService,
    private commonMethod: CommonMethods,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public prettifier: NgxPrettifyService,
    private appConstants: AppConstants,
  ) { }

  public buildForm() {
    this.themeEditForm = this.form.group({
      styleCss: new FormControl('', [Validators.required]),
      themeName: new FormControl('', [Validators.required]),
      channel: new FormControl('', [Validators.required]),
      uploadLogo: new FormControl('', [Validators.required]),
      postfix: new FormControl('', [Validators.required]),
      dashboardBg: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required])
    });
    this.themeEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.themeEditForm, this.formErrors, true)
    });
  }
  ngOnInit(): void {
    this.commonServiceCall.pageName = "Theme";
    this.getAppMasterList();
    this.commonServiceCall.selectedNav = 'themeDtl';
    this.commonMethod.hideLoader();
    this.buildForm();
    this.urlResp = this.location.getState();
    console.log(this.urlResp.data.themeId);
    var param = {
      "entityId": "MOBILE",
      "deviceId": "9",
      "map": {
        "entityId": "MOBILE",
        "cbsType": "TCS",
        "mobPlatform": "android",
        "mobileAppVersion": "1.0.0",
        "deviceId": "9",
        "clientAppVer": "1.0.0",
        "channelId": this.urlResp.data.channelID,
        "themeId": this.urlResp.data.themeId
      }
    }

    this.loadThemeDetails(param);
  }

  loadThemeDetails(param) {
    this.commonMethod.showLoader();
    var url = 'THEMEDETAILS';
    this.commonServiceCall.postResponsePromiseFile(url, param).subscribe(data => {
      console.log(data);
      this.commonMethod.hideLoader();
      if (data.status) {
        if (data.resp.responseParameter.opstatus == "08") {
          showToastMessage(data.resp.responseParameter.Result);
          return;
        }

        this.cssDetails = data.resp.responseParameter;
        this.themeName = this.cssDetails.themeName;
        this.pageType = this.urlResp.type;
        console.log("pageType ===>", this.pageType);

        //decrypt and beautify message
        this.message = this.commonDataService.decryptRequestData(this.cssDetails.themeData, "@MrN$2Qi8R");
        this.message = this.message.slice(1, -1);
        this.message = this.message.replace(/\\"/g, '"');
        this.message = this.message.replace(/\\n/g, '');
        this.message = this.beautify(this.message, { indent_size: 2, space_in_empty_paren: true });

        this.reloadLogoImage = this.cssDetails.logoImage;
        this.reloadBgImage = this.cssDetails.dasboardbackImage;
        this.reloadIconImage = this.cssDetails.themeLogo;

        this.themeEditForm.patchValue({
          styleCss: this.message,
          themeName: this.cssDetails.themeName,
          channel: this.cssDetails.channelID,
          postfix: this.cssDetails.postostFix,
          uploadLogo: this.cssDetails.logoImage,
          dashboardBg: this.cssDetails.dasboardbackImage,
          images: this.cssDetails.themeLogo
        })

        this.status = this.cssDetails.isDefaultTheme;
        if(this.status == 'Y'){
          this.isChecked = true;
        }

      }
      else {
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else {
          showToastMessage("Master Update Error");
        }
      }

    });

  }

  getAppMasterList(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        this.productTypes = res.resp;
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB" || x.shortName == "WALLET" );
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  editTheme() {
    this.formValidation.markFormGroupTouched(this.themeEditForm);
    if (this.themeEditForm.valid) {
      var formData = this.themeEditForm.value;
      console.log(formData);
      var inputData = this.themeDtlService.themeEditService(formData, formData.styleCss,this.urlResp.data.themeId,this.status);
      console.log(inputData);
      this.editSelTheme(inputData);
    } else {
      this.formErrors = this.formValidation.validateForm(this.themeEditForm, this.formErrors, false)
    }
  }

  editSelTheme(param) {
    this.commonMethod.showLoader();
    var url = 'UPDATECHANNELTHEMEDATA';
    this.commonServiceCall.postResponsePromiseFile(url, param).subscribe(data => {
      console.log(data);
      this.commonMethod.hideLoader();
      if (data.status) {
        this.router.navigateByUrl("/themeDtl");
      }
      else {
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else {
          showToastMessage("Master Update Error");
        }
      }

    });
  }


  gotoPrevPage() {
    this.router.navigateByUrl("/themeDtl");
  }

  uploadImg(type, e) {
    console.log(e.target.files[0].type);
    if (e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg' || e.target.files[0].type == 'image/png') {
      this.getBase64(e, type);
    }
    else {
      showToastMessage("Not A Valid Image Format");
    }
  }



  getBase64(event, type) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (type == 'logo') {
        me.uploadLogoName = event.target.files[0].name;
        me.themeEditForm.patchValue({
          uploadLogo: reader.result
        })
      }
      else if (type == 'dashboard') {
        me.dashboardBgImgName = event.target.files[0].name;
        me.themeEditForm.patchValue({
          dashboardBg: reader.result
        })
      }
      else if (type == 'cssImg') {
        me.cssImageName = event.target.files[0].name;
        me.themeEditForm.patchValue({
          images: reader.result
        })
      }
      //console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  changeStatus(event,resp,isChecked){
    console.log(resp);
    console.log(isChecked);
    if(isChecked == false){
       this.status = "Y";
       this.isChecked = true;
    }
    else if(isChecked == true)
    {
       this.status = "N";
       this.isChecked = false;
    }
  }

}
