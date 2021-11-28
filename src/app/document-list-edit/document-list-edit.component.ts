import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { DocumentListEditService } from './document-list-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-document-list-edit',
  templateUrl: './document-list-edit.component.html',
  styleUrls: ['./document-list-edit.component.css']
})
export class DocumentListEditComponent implements OnInit {

  dynamicListEdit:any;

  documentListEditForm : FormGroup;
  remarkForm:FormGroup
  formErrors = {
    reportName:'',
    status:'',
    remark:''
  }

  documentListFields={
    reportName:'',
    status: '',
  }

  remarkHistoryArr: any = [];
  roleId: any;
  selModel: any;
  beforeParams:any;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private documentListEditService : DocumentListEditService,
  ) { }


  public buildForm() {
    this.documentListEditForm = this.form.group({
      reportName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      status: new FormControl('', [Validators.required]),
    });
    this.documentListEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.documentListEditForm, this.formErrors, true)
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

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/documentList');
      return;
    }

    this.roleId = this.commonDataShareService.roleId;
    this.commonServiceCall.pageName = "Document List Edit";
    this.dynamicListEdit = this.location.getState();
    this.buildForm();
    this.getdocumentListById(this.dynamicListEdit.id);
    this.getRemarkHistoryData(this.dynamicListEdit.id);
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
        var param = this.documentListEditService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  cancel(){
    if(this.commonServiceCall.makerRequestEditUrl == '/documentList') {
      this.router.navigateByUrl("/documentList");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/documentList");
    }
  }

  getdocumentListById(id)
  {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getDocumentByIdUrl + id;
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
          this.documentListEditForm.patchValue({
            reportName: result.documentName,
            status: result.userAction,
          })
        }
        else {
          this.documentListEditForm.patchValue({
            reportName: result.documentName,
            status: result.statusId,
          })
        }
      }
      else{
        this.commonMethod.hideLoader();
      }
    })
  }

  editDocumentList(){
    this.formValidation.markFormGroupTouched(this.documentListEditForm);
    if (this.documentListEditForm.valid) {
      var formData = this.documentListEditForm.value;
      var param = this.documentListEditService.editDocumentList(this.documentListEditForm.value, this.dynamicListEdit.id);
      console.log('request parameters: ', param);
      this.updateDocumentList(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.documentListEditForm, this.formErrors, false)
    }
  }

  updateDocumentList(param)
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateDocumentDetaUrl, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
        showToastMessage(res.responseMessage);
             this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateReportDetails+"\n"+"Params="+JSON.stringify(param)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParams),'update')
        this.cancel()
      }
      else{
        if(this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.documentListEditForm.patchValue({
            reportName: this.documentListFields.reportName,
            status: this.documentListFields.status,
          })
        }
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
    });
  }

  /*
  openActionModel(action, formdata) {
    if (this.documentListEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.documentListFields.reportName = formdata.reportName;
      this.documentListFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.documentListEditForm, this.formErrors, false)
    }
  }

  editDocumentListWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.documentListEditService.editDocumentListWithRemark(this.documentListFields, this.dynamicListEdit.id, formdata);
      this.updateDocumentList(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.documentListEditForm.patchValue({
      reportName: this.documentListFields.reportName,
      status: this.documentListFields.status,
    })
    closeTinyModel();
  }
  */

}
