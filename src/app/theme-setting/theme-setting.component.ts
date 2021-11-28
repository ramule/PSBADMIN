import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { ThemeSettingService } from './theme-setting.service'
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
declare var showToastMessage: any;

@Component({
  selector: 'app-theme-setting',
  templateUrl: './theme-setting.component.html',
  styleUrls: ['./theme-setting.component.css']
})
export class ThemeSettingComponent implements OnInit {

  cssFile: any;
  cssFileName: any;
  uploadLogo:any;
  dashboardBgImg:any;
  cssImage:any;
  uploadLogoName:any;
  dashboardBgImgName:any;
  cssImageName:any;
  uploadCssType:any;
  isChecked:boolean = false;
  productTypes:any = [];
  status = "N";

  uplodedCss: any;
  themeSettingForm: FormGroup;
  formErrors = {
    themeName: '',
    channel: '',
    uploadLogo: '',
    postfix: '',
    dashboardBg: '',
    type: '',
    styleCss: '',
    //status: '',
    images: ''
  }

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    private themeSettingService : ThemeSettingService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
  ) { }

  public buildForm() {
    this.themeSettingForm = this.form.group({
      themeName: new FormControl('', [Validators.required,  Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
      channel: new FormControl('', [Validators.required]),
      uploadLogo: new FormControl('', [Validators.required]),
      postfix: new FormControl('', [Validators.required]),
      dashboardBg: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      styleCss: new FormControl('', [Validators.required]),
      //status: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required])
    });
    this.themeSettingForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.themeSettingForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Theme";
    this.commonServiceCall.selectedNav = 'themeSetting';
    this.buildForm();
    this.commonMethod.hideLoader();
    this.themeSettingForm.patchValue({
      type: 'file'
    });
    this.uploadCssType = 'file';
    this.getAppMasterList();
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

  addTheme() {
    console.log("inside",this.themeSettingForm.value);
    this.formValidation.markFormGroupTouched(this.themeSettingForm);
    if (this.themeSettingForm.valid) {
      var formData = this.themeSettingForm.value;
      console.log(formData);
      // channel: "1"
      // dashboardBg: "C:\fakepath\accounts.png"
      // images: "C:\fakepath\logo.png"
      // postfix: "postfix"
      // status: "1"
      // styleCss: "C:\fakepath\pom.xml"
      // themeName: "orange"
      // uploadLogo: "C:\fakepath\add.png"
      //console.log(this.uplodedCss);
      if(formData.type == 'css'){
        this.uplodedCss = formData.styleCss;
        this.uplodedCss = this.uplodedCss.replace(/(\r\n|\n|\r)/gm, "");
        this.uplodedCss = this.uplodedCss.replace(/\\"/g,'"');
      }
      var inputData = this.themeSettingService.themeSettingService(formData,this.uplodedCss,this.uploadLogo,this.dashboardBgImg,this.cssImage,this.status);
      console.log(inputData);
      this.onThemeSaved(inputData);
    } else {
      this.formErrors = this.formValidation.validateForm(this.themeSettingForm, this.formErrors, false)
    }
  }

  cancel() {
    this.themeSettingForm.reset();
    this.uploadLogoName = "";
    this.dashboardBgImgName = "";
    this.cssImageName = "";
    this.router.navigateByUrl('/dashboard');
  }

  fileChanged(e: any) {
    if(e.target.files[0].type != "text/css"){
      showToastMessage("Not A Valid File Format");
      return;
    }
    this.cssFileName = e.target.files[0].name;
    this.cssFile = e.target.files[0];
    this.uploadDocument();
  }

  uploadDocument() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      //console.log(fileReader.result);
      this.uplodedCss = fileReader.result;
      this.uplodedCss = this.uplodedCss.replace(/(\r\n|\n|\r)/gm, "");
      this.uplodedCss = this.uplodedCss.replace(/\"/g,'"');
      console.log(this.uplodedCss);
    }
    fileReader.readAsText(this.cssFile);
  }


  onThemeSaved(param) {
    this.commonMethod.showLoader();
    var url = 'ADDCHANNELTHEMEDATA';
    this.commonServiceCall.postResponsePromiseFile(url, param).subscribe(data => {
      console.log("on saved", data);
      this.commonMethod.hideLoader();
      this.themeSettingForm.reset();
      this.uploadLogoName = "";
      this.dashboardBgImgName = "";
      this.cssImageName = "";
      if (data.status) {
        showToastMessage("Css File Has Been Saved Successfully");
      }
      else {
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else {
          showToastMessage("Theme Update Error");
        }
      }

    })
  }

  uploadImg(type,e){
    console.log(e.target.files[0].type);
    if(e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg' || e.target.files[0].type == 'image/png'){
      this.getBase64(e,type);
    }
    else{
      showToastMessage("Not a Valid Image Format");
    }

  }

  selFileType(e){
    this.uploadCssType = e.srcElement.value;
  }


  getBase64(event,type) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if(type == 'logo'){
        me.uploadLogoName = event.target.files[0].name;
        me.uploadLogo = reader.result;
      }
      else if(type == 'dashboard'){
        me.dashboardBgImgName = event.target.files[0].name;
        me.dashboardBgImg = reader.result
      }
      else if(type == 'cssImg'){
        me.cssImageName = event.target.files[0].name;
        me.cssImage = reader.result
      }
      //console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

 changeStatus(event,resp){
   console.log(resp);
  if(resp == 'N'){
    this.status = "Y";
    this.isChecked = true;
 }
 else (resp == 'Y')
 {
    this.status = "N";
    this.isChecked = false;
 }
 }

}
