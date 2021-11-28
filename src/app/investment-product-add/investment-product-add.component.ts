import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { InvestmentProductAddService } from './investment-product-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-investment-product-add',
  templateUrl: './investment-product-add.component.html',
  styleUrls: ['./investment-product-add.component.css']
})
export class InvestmentProductAddComponent implements OnInit {

  languageArray: any = [];
  status:any = [];
  selModel: any;
  investmentProductAddForm: FormGroup;
  remarkForm: FormGroup;
  isLogoImgError: boolean = false;
  isValidLogoFileFormat: boolean = false;
  isValidLogoSizeFileFormat: boolean = false;
  logoImage: any;

  formErrors = {
    productName:'',
    productLink: '',
    languagecode:'',
    statusId:'',
    logoImage:'',
    remark: ''
  }

  invProductAddFields = {
    productName:'',
    productLink: '',
    languagecode:'',
    statusId:'',
    logoImage:''
  }

  images={
    logoImage:'',
  }

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public investmentProductAddService : InvestmentProductAddService,
    public appConstants : AppConstants,
    public commonMethod : CommonMethods,
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Investment Product";
    this.buildForm();
    this.getLanguage();
    this.getStatus();
    this.investmentProductAddForm.patchValue({
      statusId: 3
    });
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = this.investmentProductAddService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
   })
  }

  public buildForm() {
    this.investmentProductAddForm = this.form.group({
      productName: new FormControl('', [Validators.required]),
      productLink: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      languagecode: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
      logoImage: new FormControl('')
    });
    this.investmentProductAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.investmentProductAddForm, this.formErrors, true)
    });

    if (this.selModel == "remarkField") {
      this.remarkForm = this.form.group({
        remark: new FormControl("", [Validators.required]),
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.remarkForm,
          this.formErrors,
          true
        );
      });
    }
  }

  /* It brings dynamic languages*/
  getLanguage() {
    var url = this.appConstants.getDistinctLanguageJsonCode;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.languageArray = res.result;
      } else {
        showToastMessage(res.responseMessage);
      }
    });
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
            me.investmentProductAddForm.get('logoImage').setValue(file);
            me.isLogoImgError = false;
            me.isValidLogoSizeFileFormat = false;
            me.isValidLogoFileFormat = false;
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  openActionModel(action, formdata) {
    this.isLogoImgError = false;
    this.isValidLogoSizeFileFormat = false;

    if (this.investmentProductAddForm.get('logoImage').value == "") { this.isLogoImgError = true; }

    if (this.investmentProductAddForm.valid) {
      if (this.isLogoImgError == true) { return; }
      if (this.isValidLogoSizeFileFormat) { return; }

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.invProductAddFields.productName = formdata.productName;
      this.invProductAddFields.productLink = formdata.productLink;
      this.invProductAddFields.languagecode = formdata.languagecode;
      this.invProductAddFields.logoImage = formdata.logoImage;
      this.invProductAddFields.statusId = formdata.statusId;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.investmentProductAddForm, this.formErrors, false)
    }
  }

  closeActionModel() {
    this.investmentProductAddForm.patchValue({
      logoImage: this.invProductAddFields.logoImage,
      productName: this.invProductAddFields.productName,
      productLink: this.invProductAddFields.productLink,
      statusId: this.invProductAddFields.statusId,
      languagecode: this.invProductAddFields.languagecode
    });
    closeTinyModel();
  }

  addInvProductWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      console.log('logo img: ', this.images.logoImage);

      var param = this.investmentProductAddService.addInvProductWithRemarkCall(this.invProductAddFields, this.images , this.remarkForm.value);
      this.addInvProduct(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  addProduct(){
    this.isLogoImgError = false;
    this.isValidLogoFileFormat = false;
    if(this.investmentProductAddForm.get('logoImage').value == ""){ this.isLogoImgError = true;}
    var userDetails = (this.commonServiceCall.userCredential);
    this.formValidation.markFormGroupTouched(this.investmentProductAddForm);
    if (this.investmentProductAddForm.valid) {
      if(this.isLogoImgError == true){ return;}
      if(this.isValidLogoSizeFileFormat == true){ return;}

      var param = this.investmentProductAddService.addInvProductCall(this.investmentProductAddForm.value, this.images);
        this.addInvProduct(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.investmentProductAddForm, this.formErrors, false)
    }
  }

  addInvProduct(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveInvestmentProductUrl, param).subscribe(data => {
      var res = data.resp;
      console.log('add invProduct response: ', res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveInvestmentProductUrl+"\n"+"Params="+JSON.stringify(param),'add')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/investmentProduct");
      } else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.investmentProductAddForm.patchValue({
            productName: this.invProductAddFields.productName,
            productLink: this.invProductAddFields.productLink,
            languagecode: this.invProductAddFields.languagecode,
            logoImage: this.invProductAddFields.logoImage,
            statusId: this.invProductAddFields.statusId
          });
        }
        this.errorCallBack(this.appConstants.saveInvestmentProductUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  cancel() {
    this.router.navigateByUrl("/investmentProduct");
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
