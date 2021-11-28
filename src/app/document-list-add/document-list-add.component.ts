import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DocumentListAddService } from './document-List-Add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-document-list-add',
  templateUrl: './document-list-add.component.html',
  styleUrls: ['./document-list-add.component.css']
})
export class DocumentListAddComponent implements OnInit {


  status:any = [];

  documentListAddForm : FormGroup;
  remarkForm:FormGroup
  formErrors = {
    reportName:'',
    status:'',
    remark:''
  }

  dynamicReportsFields={
    reportName: '',
    status: '',
  }

  roleId: any;
  selModel: any;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private documentListAddService: DocumentListAddService
  ) { }


  public buildForm() {
    this.documentListAddForm = this.form.group({
      reportName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      status: new FormControl('', [Validators.required]),
    });
    this.documentListAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.documentListAddForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Add Document List";
    this.documentListAddForm.patchValue({
      status: 3
    });
    this.commonMethod.hideLoader();
  }


     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.documentListAddService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  cancel(){
    this.router.navigateByUrl("/documentList");
  }

  addDocumentList(){
    this.formValidation.markFormGroupTouched(this.documentListAddForm);
    if (this.documentListAddForm.valid) {
      var formData = this.documentListAddForm.value;
      var param = this.documentListAddService.addDocumentList(this.documentListAddForm.value);
      console.log('request parameters: ', param);
      this.saveDocumentList(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.documentListAddForm, this.formErrors, false)
    }
  }

  saveDocumentList(param)
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveDocumentDataUrl, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/documentList");
          this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addReportDetails+"\n"+"Params="+JSON.stringify(param),'add')
      }
      else{
        if(this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.documentListAddForm.patchValue({
            reportName: this.dynamicReportsFields.reportName,
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
    if (this.documentListAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.dynamicReportsFields.reportName = formdata.reportName;
      this.dynamicReportsFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.documentListAddForm, this.formErrors, false)
    }
  }


  addDocumentListWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.documentListAddService.addDocumentListWithRemark(this.dynamicReportsFields, formData);
      this.saveDocumentList(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.documentListAddForm.patchValue({
      reportName: this.dynamicReportsFields.reportName,
      status: this.dynamicReportsFields.status,
    });
    closeTinyModel();
  }
  */

}
