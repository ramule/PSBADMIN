import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { DynamicReportsEditService } from './dynamic-reports-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-dynamic-reports-edit',
  templateUrl: './dynamic-reports-edit.component.html',
  styleUrls: ['./dynamic-reports-edit.component.css']
})
export class DynamicReportsEditComponent implements OnInit {

  dynamicReportsEdit:any;

  dynamicReportsEditForm : FormGroup;
  remarkForm:FormGroup
  formErrors = {
    reportName:'',
    description: '',
    status:'',
    remark:''
  }

  dynamicReportsFields={
    reportName:'',
    description: '',
    status: '',
  }

  remarkHistoryArr: any = [];
  roleId: any;
  selModel: any;
  beforeParams:any;

  constructor(
    public commonData: CommonDataShareService,
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private dynamicReportsEditService : DynamicReportsEditService,
  ) { }


  public buildForm() {
    this.dynamicReportsEditForm = this.form.group({
      reportName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      description: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      status: new FormControl('', [Validators.required]),
    });
    this.dynamicReportsEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.dynamicReportsEditForm, this.formErrors, true)
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
      this.router.navigateByUrl('/dynamicReports');
      return;
    }

    this.roleId = this.commonDataShareService.roleId;
    this.commonServiceCall.pageName = "Edit Report Category";
    this.dynamicReportsEdit = this.location.getState();
    this.buildForm();
    this.getdynamicReportsById(this.dynamicReportsEdit.id);
    this.getRemarkHistoryData(this.dynamicReportsEdit.id);
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


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.dynamicReportsEditService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  cancel(){
    if(this.commonServiceCall.makerRequestEditUrl == '/dynamicReports') {
      this.router.navigateByUrl("/dynamicReports");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests'){
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/dynamicReports");
    }
  }

  getdynamicReportsById(id)
  {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getReportDetailsById + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
        this.commonMethod.hideLoader();
        var result = res.result[0];
        this.beforeParams=res.result[0];
        this.commonDataShareService.dynamicReports.createdOn = res.result[0].createdOn;
        console.log('menu: ', result);
        if(res.result[0].userAction != null) {
          this.dynamicReportsEditForm.patchValue({
            reportName: result.reportName,
            description:result.reportDescription,
            status: result.userAction,
          })
        }
        else {
          this.dynamicReportsEditForm.patchValue({
            reportName: result.reportName,
            description:result.reportDescription,
            status: result.statusId,
          })
        }
      }
      else{
        this.commonMethod.hideLoader();
      }
    })
  }

  editDynamicReports(){
    this.formValidation.markFormGroupTouched(this.dynamicReportsEditForm);
    if (this.dynamicReportsEditForm.valid) {
      var formData = this.dynamicReportsEditForm.value;
      var param = this.dynamicReportsEditService.editDynamicReports(this.dynamicReportsEditForm.value, this.dynamicReportsEdit.id, this.beforeParams);
      console.log('request parameters: ', param);
      this.updateDynamicReports(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.dynamicReportsEditForm, this.formErrors, false)
    }
  }

  updateDynamicReports(param)
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateReportDetails, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
        showToastMessage(res.responseMessage);
             this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateReportDetails+"\n"+"Params="+JSON.stringify(param)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParams),'update')
        this.cancel()
      }
      else{
        if(this.commonData.roleType == this.commonDataShareService.makerRole) {
          this.dynamicReportsEditForm.patchValue({
            reportName: this.dynamicReportsFields.reportName,
            description:this.dynamicReportsFields.description,
            status: this.dynamicReportsFields.status,
          })
        }
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
    });
  }

  /*
  openActionModel(action, formdata) {
    if (this.dynamicReportsEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.dynamicReportsFields.reportName = formdata.reportName;
      this.dynamicReportsFields.description = formdata.description;
      this.dynamicReportsFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.dynamicReportsEditForm, this.formErrors, false)
    }
  }

  updateDynamicReportsWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.dynamicReportsEditService.editDynamicReportsWithRemark(this.dynamicReportsFields, this.dynamicReportsEdit.id, formdata);
      this.updateDynamicReports(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.dynamicReportsEditForm.patchValue({
      reportName: this.dynamicReportsFields.reportName,
      description:this.dynamicReportsFields.description,
      status: this.dynamicReportsFields.status,
    })
    closeTinyModel();
  }
  */
}
