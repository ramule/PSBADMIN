import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MaskingRulesEditService } from './masking-rules-edit.service'
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-masking-rules-edit',
  templateUrl: './masking-rules-edit.component.html',
  styleUrls: ['./masking-rules-edit.component.css']
})
export class MaskingRulesEditComponent implements OnInit {
  beforeParam:any=[];
  maskingRulesForm: FormGroup;
  remarkForm: FormGroup;
  isAllDataMaskedFlag: any = '';
  masterStatus = [];
  productTypes = [];
  selectedMaskedRule;
  maskRule;
  isAllMasked:boolean = false;
  maxNoDigit:any = 10;
  roleId: any;
  selModel: any;
  remarkHistoryArr: any = [];
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

  maskingRuleEditFields = {
    feildName: '',
    description: '',
    isDataMasked: '',
    firstNoDigit: '',
    lastNoDigit: '',
    maskingCharacter: '',
    status:'',
    appId: ''
  }

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private maskingEditService : MaskingRulesEditService
  ) { }

  public buildForm() {
    this.maskingRulesForm = this.form.group({
      feildName: new FormControl('', [Validators.required,Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required,Validators.maxLength(40)]),
      isDataMasked: new FormControl('',[Validators.required]),
      maskingCharacter: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      status: new FormControl('', [Validators.required]),
      appId: new FormControl('', [Validators.required]),
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

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/maskingRules');
      return;
    }

    this.commonServiceCall.pageName = "Edit Masking Rules";
    this.roleId = this.commonData.roleId;
    this.maskRule = this.location.getState();
    this.buildForm();
    this.maskingRulesForm.patchValue({
      isDataMasked : 'Y'
    })
    this.getStatus();
    this.getAppMasterList();
    this.getMaskDataById(this.maskRule.id);
    this.getRemarkHistoryData(this.maskRule.id);
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/"+ this.commonData.submenuId ).subscribe((data) => {
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

  openActionModel(action, formdata) {
    if (this.maskingRulesForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.maskingControlsHandle();
      this.maskingRuleEditFields.feildName = formdata.feildName;
      this.maskingRuleEditFields.description = formdata.description;
      this.maskingRuleEditFields.isDataMasked = formdata.isDataMasked;
      this.maskingRuleEditFields.firstNoDigit = formdata.firstNoDigit;
      this.maskingRuleEditFields.lastNoDigit = formdata.lastNoDigit;
      this.maskingRuleEditFields.maskingCharacter = formdata.maskingCharacter;
      this.maskingRuleEditFields.appId = formdata.appId;
      this.maskingRuleEditFields.status = formdata.status;
      console.log(this.maskingRuleEditFields);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.maskingRulesForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.maskingControlsHandle();
    this.maskingRulesForm.patchValue({
      feildName: this.maskingRuleEditFields.feildName,
      description: this.maskingRuleEditFields.description,
      isDataMasked: this.maskingRuleEditFields.isDataMasked,
      firstNoDigit: this.maskingRuleEditFields.firstNoDigit,
      lastNoDigit : this.maskingRuleEditFields.lastNoDigit,
      maskingCharacter : this.maskingRuleEditFields.maskingCharacter,
      appId : this.maskingRuleEditFields.appId,
      status : this.maskingRuleEditFields.status,
    });
    closeTinyModel();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation)
  {
      var param = this.maskingEditService.addAuditTrailAdaptorParams(URL,operation);
      console.log(param)
      this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
      })
  }

  //on load functions
  getStatus(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.masterStatus = res.resp;
        console.log('response array: ', this.masterStatus);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  //on load functions
  getAppMasterList(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      console.log('response data: ', res);
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.productTypes = res.resp;
        console.log('response array: ', this.productTypes);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'APPROVED' || x.shortName == 'REJECTED');
  }

  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB" || x.shortName == "WALLET" );
  }

  getMaskDataById(id){
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getMaskingRuleByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
        this.beforeParam = res.result[0]
        this.commonMethod.hideLoader();
        this.isAllDataMaskedFlag = res.result[0].maskall_yn;
        if(res.result[0].maskall_yn == 'N'){
          this.isAllMasked = true;
          this.maskingRulesForm.addControl('firstNoDigit', new FormControl('', [Validators.required]));
          this.maskingRulesForm.addControl('lastNoDigit', new FormControl('', [Validators.required]));
        }
        this.selectedMaskedRule = res.result[0];
        if(res.result[0].userAction !=null) {
          this.maskingRulesForm.patchValue({
            feildName: res.result[0].fieldname,
            description: res.result[0].rulenamedesc,
            isDataMasked: res.result[0].maskall_yn,
            firstNoDigit: res.result[0].maskfirstdigits,
            lastNoDigit: res.result[0].masklastdigits,
            maskingCharacter: res.result[0].maskchar,
            status: res.result[0].userAction,
            appId: res.result[0].appid,
          })
        }
        else {
          this.maskingRulesForm.patchValue({
            feildName: res.result[0].fieldname,
            description: res.result[0].rulenamedesc,
            isDataMasked: res.result[0].maskall_yn,
            firstNoDigit: res.result[0].maskfirstdigits,
            lastNoDigit: res.result[0].masklastdigits,
            maskingCharacter: res.result[0].maskchar,
            status: res.result[0].statusid,
            appId: res.result[0].appid,
          });
        }
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getMaskingRuleByIdUrl, res);
      }
    })
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  maskedData(){
    this.isAllDataMaskedFlag = this.maskingRulesForm.get('isDataMasked').value;
    console.log('all data masked status: ', this.isAllDataMaskedFlag);
    this.maskingControlsHandle();
  }

  maskingControlsHandle() {
    console.log('all data masked status: ', this.isAllDataMaskedFlag);
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

  submit(){
    console.log(this.maskingRulesForm.value);
    this.formValidation.markFormGroupTouched(this.maskingRulesForm);
    if (this.maskingRulesForm.valid) {
      var inputParam = this.maskingEditService.getEditRulesParam(this.maskingRulesForm.value,this.maskRule.id);
        this.updateMaskingRules(inputParam);
    } else {
      this.formErrors = this.formValidation.validateForm(this.maskingRulesForm, this.formErrors, false)
    }
  }

  updateMaskingWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.maskingEditService.getEditRulesParamWithRemark(this.maskingRuleEditFields, this.maskRule.id, formdata);
      this.updateMaskingRules(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  updateMaskingRules(param){
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.upadateMaskingRules,param).subscribe((data) => {
      console.log(res);
      var res = data.resp;
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.upadateMaskingRules+"\n"+"Params="+JSON.stringify(param)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParam),'update')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        if(this.commonServiceCall.makerRequestEditUrl == '/maskingRules') {
          this.router.navigateByUrl("/maskingRules");
        }
        else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
          this.router.navigateByUrl("/makerRequests");
        }
        else {
          this.router.navigateByUrl("/calculatorFormula");
        }
      } else {
        if(this.commonData.roleType == this.commonData.makerRole) {
          this.maskingRulesForm.patchValue({
            feildName: this.maskingRuleEditFields.feildName,
            description: this.maskingRuleEditFields.description,
            isDataMasked: this.maskingRuleEditFields.isDataMasked,
            firstNoDigit: this.maskingRuleEditFields.firstNoDigit,
            lastNoDigit : this.maskingRuleEditFields.lastNoDigit,
            maskingCharacter : this.maskingRuleEditFields.maskingCharacter,
            appId : this.maskingRuleEditFields.appId,
            status : this.maskingRuleEditFields.status,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addMaskingRules, res);
      }
    });
  }


  cancel(){
    if(this.commonServiceCall.makerRequestEditUrl == '/maskingRules') {
      this.router.navigateByUrl("/maskingRules");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/maskingRules");
    }
  }

}
