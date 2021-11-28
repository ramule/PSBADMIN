import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterLimitsEditService } from './master-limits-edit.service';
import { Location } from '@angular/common';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-master-limits-edit',
  templateUrl: './master-limits-edit.component.html',
  styleUrls: ['./master-limits-edit.component.css']
})
export class MasterLimitsEditComponent implements OnInit {
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
  productType:any = [];
  status:any = [];
  masterLimits:any
  beforeParam:any
  remarkHistoryArr:any=[]
  beforeParams:any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterLimitsService : MasterLimitsEditService,
    public router: Router,
    public location:Location
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

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterLimits');
      return;
    }

    this.commonServiceCall.pageName = "Edit Limits Master";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.masterLimits = this.location.getState();
    this.getStatus()
    this.getProductType()
    this.getMaskDataById(this.masterLimits.id);
    this.getRemarkHistoryData(this.masterLimits.id);
  }

  getMaskDataById(id){
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getOmniLimitMasterById + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
        this.beforeParam = res.result[0]
        this.commonMethod.hideLoader();
        if(res.result[0].userAction !=null) {
          this.masterLimitsForm.patchValue({
            limitName: res.result[0].limitName,
            frequency: res.result[0].frequency,
            minval: res.result[0].minimumValue,
            maxval: res.result[0].maximumValue,
            productType: res.result[0].appId,
            statusId: res.result[0].userAction,
          })
        }
        else {
          this.masterLimitsForm.patchValue({
            limitName: res.result[0].limitName,
            frequency: res.result[0].frequency,
            minval: res.result[0].minimumValue,
            maxval: res.result[0].maximumValue,
            productType: res.result[0].appId,
            statusId: res.result[0].statusId,
          });
        }
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getMaskingRuleByIdUrl, res);
      }
    })
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

    errorCallBack(fld, res){
      this.commonMethod.errorMessage(res);
    }


    cancel(){
      if(this.commonServiceCall.makerRequestEditUrl == '/masterLimits') {
        this.router.navigateByUrl("/masterLimits");
      }
      else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
        this.router.navigateByUrl("/makerRequests");
      }
      else {
        this.router.navigateByUrl("/masterLimits");
      }
    }


  submit(){
    console.log(this.masterLimitsForm.value);
    this.formValidation.markFormGroupTouched(this.masterLimitsForm);

    var minAmount = Number(this.masterLimitsForm.get('minval').value);
    var maxAmount = Number(this.masterLimitsForm.get('maxval').value);

    if (this.masterLimitsForm.valid) {
      if(minAmount > 0 && maxAmount > 0) {
        if(minAmount > maxAmount) {
          showToastMessage("Minimum Value Can Not Be Greater Than Or Equal To Maximum Value")
        }
        else {
          var inputParam = this.masterLimitsService.getEditLimitsParam(this.masterLimitsForm.value,this.masterLimits.id, this.beforeParam);
          this.updateMasterLimits(inputParam);
        }
      }
      else {
        showToastMessage("Please Enter Valid Amount");
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.masterLimitsForm, this.formErrors, false)
    }
  }

    updateMasterLimits(param){
      this.commonMethod.showLoader();
      this.commonServiceCall.postResponsePromise(this.appConstants.updateOmniLimitMaster,param).subscribe((data) => {
        console.log(res);
        var res = data.resp;
        if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateOmniLimitMaster+"\n"+"Params="+JSON.stringify(param)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParams),'update')
          showToastMessage(res.responseMessage);
          this.commonMethod.hideLoader();
          this.cancel()
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

    updateMasterLimitsWithRemark(formdata){
      this.formValidation.markFormGroupTouched(this.remarkForm);
      if (this.remarkForm.valid) {
        closeTinyModel();
        var formData = this.remarkForm.value;
        var param = this.masterLimitsService.getEditLimitsParamWithRemark(this.masterLimitsFields ,this.masterLimits.id, this.beforeParam, formData);
        this.updateMasterLimits(param);
      } else {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
      }
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
            this.masterLimitsFields.limitName = formdata.limitName;
            this.masterLimitsFields.frequency = formdata.frequency;
            this.masterLimitsFields.minval = formdata.minval;
            this.masterLimitsFields.maxval = formdata.maxval;
            this.masterLimitsFields.productType = formdata.productType;
            this.masterLimitsFields.statusId = formdata.statusId;
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

}
