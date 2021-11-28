import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterLimitsAddService } from './master-limits-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-master-limits-add',
  templateUrl: './master-limits-add.component.html',
  styleUrls: ['./master-limits-add.component.css']
})
export class MasterLimitsAddComponent implements OnInit {
  masterLimitsForm: FormGroup;
  remarkForm: FormGroup;
  productTypes:any=[]
  masterStatus:any=[]
  formErrors = {
    limitName: '',
    frequency: '',
    minval: '',
    maxval: '',
    productType: '',
    statusId: '',
    remark:''
  }

  masterLimitsFields={
    limitName: '',
    frequency: '',
    minval: '',
    maxval: '',
    productType: '',
    statusId: '',
  }

  selModel:any
  roleId:any
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterLimitsService : MasterLimitsAddService,
    public router: Router
  ) { }

  public buildForm() {
    this.masterLimitsForm = this.form.group({
      limitName: new FormControl('', [Validators.required,Validators.maxLength(40)]),
      frequency: new FormControl('', [Validators.required]),
      minval: new FormControl('', [Validators.required]),
      maxval: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
    });
    this.masterLimitsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.masterLimitsForm, this.formErrors, true)
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

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Limits Master Add";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.masterLimitsForm.patchValue({
      statusId: 3
    })
    this.getStatus()
    this.getProductType()
    this.commonMethod.hideLoader();
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.masterLimitsService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.masterStatus = [];
        data.resp.forEach(el => {
          if(el.id== 3 || el.id == 0){
            this.masterStatus.push(el);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  getProductType(){
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe(data => {
      if(data.status){
        console.log("roles",data.resp);
        this.productTypes = data.resp;
      }
      else{
        this.commonMethod.errorMessage(data);
      }

    })
  }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP");
  }

  submit(){
    console.log(this.masterLimitsForm.get('minval').value);
    this.formValidation.markFormGroupTouched(this.masterLimitsForm);

    var minAmount = Number(this.masterLimitsForm.get('minval').value);
    var maxAmount = Number(this.masterLimitsForm.get('maxval').value);

    if (this.masterLimitsForm.valid) {
      if(minAmount > 0 && maxAmount > 0) {
        if(minAmount >= maxAmount)
        {
          showToastMessage("Minimum Value Can Not Be Greater Than Or Equal To Maximum Value")
        }
        else
        {
          var inputParam = this.masterLimitsService.getAddLimitsParam(this.masterLimitsForm.value,this.commonData.user_ID);
          this.addMasterLimits(inputParam);
        }
      }
      else {
        showToastMessage("Please Enter Valid Amount");
      }

    } else {
      this.formErrors = this.formValidation.validateForm(this.masterLimitsForm, this.formErrors, false)
    }
  }

  addMasterLimits(param){
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addOmniLimitMaster,param).subscribe((data) => {
      console.log(res);
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addOmniLimitMaster+"\n"+"Params="+JSON.stringify(param),'add')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl("/masterLimits");
      } else {
        if(this.commonData.roleType == this.commonData.makerRole) {
          this.masterLimitsForm.patchValue({
            limitName: this.masterLimitsFields.limitName,
            frequency: this.masterLimitsFields.frequency,
            minval: this.masterLimitsFields.minval,
            maxval: this.masterLimitsFields.maxval,
            productType: this.masterLimitsFields.productType,
            statusId: this.masterLimitsFields.statusId,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addOmniLimitMaster, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    if (this.masterLimitsForm.valid) {

      var minAmount = Number(this.masterLimitsForm.get('minval').value);
      var maxAmount = Number(this.masterLimitsForm.get('maxval').value);

      if(minAmount > 0 && maxAmount > 0) {
        if(minAmount >= maxAmount)
        {
          showToastMessage("Minimum Value Can Not Be Greater Than Or Equal To Maximum Value")
        }
        else
        {
          openTinyModel();
          this.selModel = action;
          this.buildForm();
          this.masterLimitsFields.limitName=formdata.limitName,
          this.masterLimitsFields.frequency=formdata.frequency,
          this.masterLimitsFields.minval=formdata.minval,
          this.masterLimitsFields.maxval=formdata.maxval,
          this.masterLimitsFields.productType=formdata.productType,
          this.masterLimitsFields.statusId=formdata.statusId
        }
      }
      else {
        showToastMessage("Please Enter Valid Amount");
      }
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.masterLimitsForm, this.formErrors, false)
    }
  }

  addMasterLimitsWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterLimitsService.getAddLimitsParamWithRemark(this.masterLimitsFields ,formData);
      this.addMasterLimits(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.masterLimitsForm.patchValue({
      limitName: this.masterLimitsFields.limitName,
      frequency: this.masterLimitsFields.frequency,
      minval: this.masterLimitsFields.minval,
      maxval: this.masterLimitsFields.maxval,
      productType: this.masterLimitsFields.productType,
      statusId: this.masterLimitsFields.statusId,
    });
    closeTinyModel();
  }

  cancel(){
    this.router.navigateByUrl("/masterLimits");
  }

}
