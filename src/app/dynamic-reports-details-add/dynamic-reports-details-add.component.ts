import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DynamicReportsDetailsAddService } from './dynamic-reports-details-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-dynamic-reports-details-add',
  templateUrl: './dynamic-reports-details-add.component.html',
  styleUrls: ['./dynamic-reports-details-add.component.css']
})
export class DynamicReportsDetailsAddComponent implements OnInit {
  status:any = [];

  dynamicReportsAddForm : FormGroup;
  remarkForm:FormGroup
  formErrors = {
    report:'',
    reportName:'',
    description: '',
    status:'',
    remark:''
  }

  dynamicReportsFields={
    report:'',
    reportName: '',
    description: '',
    status: '',
  }

  roleId: any;
  selModel: any;

  dynamicMenuMaster:any=[]

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private dynamicReportsAddService: DynamicReportsDetailsAddService
  ) { }


  public buildForm() {
    this.dynamicReportsAddForm = this.form.group({
      report:new FormControl('', [Validators.required]),
      reportName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      description: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      status: new FormControl('', [Validators.required]),
    });
    this.dynamicReportsAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.dynamicReportsAddForm, this.formErrors, true)
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
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.commonServiceCall.pageName = "Add Report Category";
    this.dynamicReportsAddForm.patchValue({
      status: 3
    });
    this.commonMethod.hideLoader();
    this.getDynamicReportsDetails();
  }


     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.dynamicReportsAddService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  cancel(){
    this.router.navigateByUrl("/dynamicReportsDetails");
  }

  getDynamicReportsDetails()
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllReportDetails).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.dynamicMenuMaster = res.result;
        console.log('Corporate Menu Master array: ', this.dynamicMenuMaster);

      } else {
       this.errorCallBack(this.appConstants.getAllCorpMenus, res);
      }
      this.commonMethod.hideLoader();
      $('#dt-sample').DataTable().clear().destroy();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  addDynamicReports(){
    this.formValidation.markFormGroupTouched(this.dynamicReportsAddForm);
    if (this.dynamicReportsAddForm.valid) {
      var formData = this.dynamicReportsAddForm.value;
      var param = this.dynamicReportsAddService.addDynamicReport(this.dynamicReportsAddForm.value);
      console.log('request parameters: ', param);
      this.saveDynamicReports(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.dynamicReportsAddForm, this.formErrors, false)
    }
  }

  saveDynamicReports(param)
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addSubReportDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/dynamicReportsDetails");
          this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addSubReportDetailsUrl+"\n"+"Params="+JSON.stringify(param),'add')
      }
      else{
        if(this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.dynamicReportsAddForm.patchValue({
            reportName: this.dynamicReportsFields.reportName,
            description: this.dynamicReportsFields.description,
            status: this.dynamicReportsFields.status,
          });
        }
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
    });
  }

  /*
  openActionModel(action, formdata) {
    if (this.dynamicReportsAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.dynamicReportsFields.reportName = formdata.reportName;
      this.dynamicReportsFields.description = formdata.description;
      this.dynamicReportsFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.dynamicReportsAddForm, this.formErrors, false)
    }
  }

  addDynamicReportsWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.dynamicReportsAddService.addDynamicReportWithRemark(this.dynamicReportsFields, formData);
      this.saveDynamicReports(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.dynamicReportsAddForm.patchValue({
      reportName: this.dynamicReportsFields.reportName,
      description: this.dynamicReportsFields.description,
      status: this.dynamicReportsFields.status,
    });
    closeTinyModel();
  }
  */

}
