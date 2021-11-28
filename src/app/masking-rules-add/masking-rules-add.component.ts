import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MaskingRulesAddService } from './masking-rules-add.service'
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-masking-rules-add',
  templateUrl: './masking-rules-add.component.html',
  styleUrls: ['./masking-rules-add.component.css']
})
export class MaskingRulesAddComponent implements OnInit {

  maskingRulesForm: FormGroup;
  remarkForm: FormGroup;
  isAllDataMaskedFlag: any = 'Y';
  formErrors = {
    feildName: '',
    description: '',
    isDataMasked: '',
    firstNoDigit: '',
    lastNoDigit: '',
    maskingCharacter: '',
    status:'',
    appId: '',
    remark: ''
  }

  maskingRuleAddFields = {
    feildName: '',
    description: '',
    isDataMasked: '',
    firstNoDigit: '',
    lastNoDigit: '',
    maskingCharacter: '',
    status:'',
    appId: ''
  }
  roleId: any;
  selModel: any;
  productType:any = [];
  status:any = [];
  isAllMasked:boolean = false;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private maskingService : MaskingRulesAddService,
    public router: Router
  ) { }

  public buildForm() {
    this.maskingRulesForm = this.form.group({
      feildName: new FormControl('', [Validators.required,Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required,Validators.maxLength(40)]),
      isDataMasked: new FormControl('',[Validators.required]),
      maskingCharacter: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      appId: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
    this.maskingRulesForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.maskingRulesForm, this.formErrors, true)
    });

    if(this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit(){
    this.commonServiceCall.pageName = "Add Masking Rules";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.maskingRulesForm.patchValue({
      isDataMasked : 'Y',
      status: 7
    })
    this.getStatus();
    this.getProductType();
    this.commonMethod.hideLoader();
  }

  openActionModel(action, formdata) {
    if (this.maskingRulesForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.maskingControlsHandle();
      this.maskingRuleAddFields.feildName = formdata.feildName;
      this.maskingRuleAddFields.description = formdata.description;
      this.maskingRuleAddFields.isDataMasked = formdata.isDataMasked;
      this.maskingRuleAddFields.firstNoDigit = formdata.firstNoDigit;
      this.maskingRuleAddFields.lastNoDigit = formdata.lastNoDigit;
      this.maskingRuleAddFields.maskingCharacter = formdata.maskingCharacter;
      this.maskingRuleAddFields.appId = formdata.appId;
      this.maskingRuleAddFields.status = formdata.status;
      console.log(this.maskingRuleAddFields);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.maskingRulesForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.maskingRulesForm.patchValue({
      feildName: this.maskingRuleAddFields.feildName,
      description: this.maskingRuleAddFields.description,
      isDataMasked: this.maskingRuleAddFields.isDataMasked,
      firstNoDigit: this.maskingRuleAddFields.firstNoDigit,
      lastNoDigit : this.maskingRuleAddFields.lastNoDigit,
      maskingCharacter : this.maskingRuleAddFields.maskingCharacter,
      appId : this.maskingRuleAddFields.appId,
      status : this.maskingRuleAddFields.status,
    });
    closeTinyModel();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = this.maskingService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  maskedData(){
    this.isAllDataMaskedFlag = this.maskingRulesForm.get('isDataMasked').value;
    console.log('all data masked status: ', this.isAllDataMaskedFlag);
    this.maskingControlsHandle();
  }

  maskingControlsHandle() {
    if(this.isAllDataMaskedFlag == 'N'){
      this.maskingRulesForm.addControl('firstNoDigit', new FormControl('', [Validators.required]));
      this.maskingRulesForm.addControl('lastNoDigit', new FormControl('', [Validators.required]));
      // this.maskingRulesForm.get('firstNoDigit').setValue('');
      // this.maskingRulesForm.get('lastNoDigit').setValue('');
      this.isAllMasked =true;
    }
    else{
      this.maskingRulesForm.removeControl('firstNoDigit');
      this.maskingRulesForm.removeControl('lastNoDigit');
      this.isAllMasked = false;
    }
  }

  getStatus(){
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.status = data.resp;
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  getProductType(){
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe(data => {
      if(data.status){
        console.log("roles",data.resp);
        this.productType = data.resp;
      }
      else{
        this.commonMethod.errorMessage(data);
      }

    })
  }

  filterStatus()
  {
    return this.status.filter(x => x.shortName == 'APPROVED' || x.shortName == 'REJECTED');
  }

  filterProduct()
  {
    return this.productType.filter(x => x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB" || x.shortName == "WALLET" );
  }



  submit(){
    console.log(this.maskingRulesForm.value);
    this.formValidation.markFormGroupTouched(this.maskingRulesForm);
    if (this.maskingRulesForm.valid) {
        var inputParam = this.maskingService.getAddRulesParam(this.maskingRulesForm.value,this.commonData.user_ID);
        this.addMaskingRules(inputParam);
    } else {
      this.formErrors = this.formValidation.validateForm(this.maskingRulesForm, this.formErrors, false)
    }
  }

  addMaskingRuleWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.maskingService.getAddRulesParamWithRemark(this.maskingRuleAddFields, this.commonData.user_ID ,formData);
      this.addMaskingRules(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  addMaskingRules(param){
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addMaskingRules,param).subscribe((data) => {
      console.log(res);
      var res = data.resp;
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addMaskingRules+"\n"+"Params="+JSON.stringify(param),'add')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl("/maskingRules");
      } else {
        if(this.commonData.roleType == this.commonData.makerRole) {
          this.maskingRulesForm.patchValue({
            feildName: this.maskingRuleAddFields.feildName,
            description: this.maskingRuleAddFields.description,
            isDataMasked: this.maskingRuleAddFields.isDataMasked,
            firstNoDigit: this.maskingRuleAddFields.firstNoDigit,
            lastNoDigit : this.maskingRuleAddFields.lastNoDigit,
            maskingCharacter : this.maskingRuleAddFields.maskingCharacter,
            appId : this.maskingRuleAddFields.appId,
            status : this.maskingRuleAddFields.status,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addMaskingRules, res);
      }
    });
  }

  errorCallBack(fld, res){
    this.commonMethod.errorMessage(res);
  }
  cancel(){
    this.router.navigateByUrl("/maskingRules");
  }
}
