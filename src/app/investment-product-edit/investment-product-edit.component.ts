import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from "@angular/common";
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { InvestmentProductEditService } from './investment-product-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-investment-product-edit',
  templateUrl: './investment-product-edit.component.html',
  styleUrls: ['./investment-product-edit.component.css']
})
export class InvestmentProductEditComponent implements OnInit {

  languageArray: any = [];
  status:any = [];
  remarkHistoryArr:any=[];
  beforeParam: any = [];
  selModel: any;
  investmentProductEditForm: FormGroup;
  remarkForm: FormGroup;
  isLogoImgError: boolean = false;
  isValidLogoFileFormat: boolean = false;
  isValidLogoSizeFileFormat: boolean = false;
  logoImage: any;
  invProductData: any;

  formErrors = {
    productName:'',
    productLink: '',
    languagecode:'',
    statusId:'',
    logoImage:'',
    remark: ''
  }

  invProductEditFields = {
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
    public investmentProductEditService : InvestmentProductEditService,
    public appConstants : AppConstants,
    public commonMethod : CommonMethods,
    private location: Location,
  ) { }

  ngOnInit(): void {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/investmentProduct');
      return;
    }

    this.commonServiceCall.pageName = "Add Investment Product";
    this.invProductData = this.location.getState();
    console.log(this.invProductData);
    this.buildForm();
    this.getLanguage();
    this.getStatus();
    this.getInvestmentProductById(this.invProductData.id);
    this.getRemarkHistoryData(this.invProductData.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = this.investmentProductEditService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
   })
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/"+ this.commonDataShareService.submenuId ).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.remarkHistoryArr = res.result;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
      } else if (res.responseCode == "202"){
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
      }
    });
  }

  public buildForm() {
    this.investmentProductEditForm = this.form.group({
      productName: new FormControl('', [Validators.required]),
      productLink: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      languagecode: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
      logoImage: new FormControl('')
    });
    this.investmentProductEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.investmentProductEditForm, this.formErrors, true)
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

  getInvestmentProductById(id){
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getInvestmentProductByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.beforeParam =  res.result[0];
        var result = res.result[0];

        this.logoImage = 'data:image/jpg;base64,'+result.logo;
        this.images.logoImage = 'data:image/jpg;base64,'+result.logo;

        console.log(res);
        if(res.result[0].userAction !=null) {
          this.investmentProductEditForm.patchValue({
            logoImage: this.logoImage,
            productName: res.result[0].productName,
            statusId: res.result[0].userAction,
            productLink: res.result[0].productLink,
            languagecode: res.result[0].jsonKey,
          })
        }else{
          this.investmentProductEditForm.patchValue({
            logoImage: this.logoImage,
            productName: res.result[0].productName,
            statusId: res.result[0].statusId,
            productLink: res.result[0].productLink,
            languagecode: res.result[0].jsonKey,
          })
        }
        this.commonMethod.hideLoader();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getInvestmentProductByIdUrl, res);
      }

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
            me.investmentProductEditForm.get('logoImage').setValue(file);
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

    if (this.investmentProductEditForm.get('logoImage').value == "") { this.isLogoImgError = true; }

    if (this.investmentProductEditForm.valid) {
      if (this.isLogoImgError == true) { return; }
      if (this.isValidLogoSizeFileFormat) { return; }

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.invProductEditFields.productName = formdata.productName;
      this.invProductEditFields.productLink = formdata.productLink;
      this.invProductEditFields.languagecode = formdata.languagecode;
      this.invProductEditFields.logoImage = formdata.logoImage;
      this.invProductEditFields.statusId = formdata.statusId;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.investmentProductEditForm, this.formErrors, false)
    }
  }

  closeActionModel() {
    this.investmentProductEditForm.patchValue({
      logoImage: this.invProductEditFields.logoImage,
      productName: this.invProductEditFields.productName,
      productLink: this.invProductEditFields.productLink,
      statusId: this.invProductEditFields.statusId,
      languagecode: this.invProductEditFields.languagecode
    });
    closeTinyModel();
  }

  editInvProductWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      console.log('logo img: ', this.images.logoImage);

      var param = this.investmentProductEditService.editInvProductWithRemarkCall(this.invProductEditFields, this.images , this.invProductData.id, this.beforeParam, this.remarkForm.value);
      this.updateInvProduct(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  editProduct(){
    this.isLogoImgError = false;
    this.isValidLogoFileFormat = false;
    if(this.investmentProductEditForm.get('logoImage').value == ""){ this.isLogoImgError = true;}
    var userDetails = (this.commonServiceCall.userCredential);
    this.formValidation.markFormGroupTouched(this.investmentProductEditForm);
    if (this.investmentProductEditForm.valid) {
      if(this.isLogoImgError == true){ return;}
      if(this.isValidLogoSizeFileFormat == true){ return;}

      var param = this.investmentProductEditService.editInvProductCall(this.investmentProductEditForm.value, this.images, this.invProductData.id, this.beforeParam);
        this.updateInvProduct(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.investmentProductEditForm, this.formErrors, false)
    }
  }

  updateInvProduct(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateInvestmentProductUrl, param).subscribe(data => {
      var res = data.resp;
      console.log('edit invProduct response: ', res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateInvestmentProductUrl+"\n"+"Params="+JSON.stringify(param),'edit')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.investmentProductEditForm.patchValue({
            productName: this.invProductEditFields.productName,
            productLink: this.invProductEditFields.productLink,
            languagecode: this.invProductEditFields.languagecode,
            logoImage: this.invProductEditFields.logoImage,
            statusId: this.invProductEditFields.statusId
          });
        }
        this.errorCallBack(this.appConstants.updateInvestmentProductUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  cancel() {
    if(this.commonServiceCall.makerRequestEditUrl == '/investmentProduct') {
      this.router.navigateByUrl("/investmentProduct");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/investmentProduct");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
