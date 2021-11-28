import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { DocumentTypeAddService } from './document-type-add.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-document-type-add',
  templateUrl: './document-type-add.component.html',
  styleUrls: ['./document-type-add.component.css']
})
export class DocumentTypeAddComponent implements OnInit {

  status:any = [];
  dropdownList = [];
  selectedItems = [];
  documentListArr: any = [];
  tempDocTypeArr: any = [];
  productTypes: any = [];
  dropdownSettings :IDropdownSettings;
  documentTypeAddForm : FormGroup;
  remarkForm:FormGroup;
  formErrors = {
    documentType:'',
    documentList: '',
    appId: '',
    remark:''
  }

  dynamicReportsFields={
    documentType:'',
    documentList: '',
    appId: '',
    status: '',
  }

  roleId: any;
  selModel: any;

  constructor(
    public commonData: CommonDataShareService,
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private documentTypeAddService: DocumentTypeAddService
  ) { }


  public buildForm() {
    this.documentTypeAddForm = this.form.group({
      documentType: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      documentList: new FormControl('', [Validators.required]),
      appId: new FormControl('', [Validators.required])
    });
    this.documentTypeAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.documentTypeAddForm, this.formErrors, true)
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
    this.getDocumentList();
    this.getProductType();
    this.commonServiceCall.pageName = "Add Document Type";
    this.documentTypeAddForm.patchValue({
      status: 3
    });

    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'documentName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  getDocumentList() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getDocumentListUrl)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.documentListArr = res.result;
          console.log("Document List array: ", this.documentListArr);
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.getDocumentListUrl +
              "\n" +
              "Params={}",
            "view"
          );
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getDocumentListUrl, res);
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


  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB" );
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


   /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.documentTypeAddService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  cancel(){
    this.router.navigateByUrl("/documentType");
  }

  onItemSelect(item: any) {
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  addDynamicReports(){
    this.formValidation.markFormGroupTouched(this.documentTypeAddForm);
    if (this.documentTypeAddForm.valid) {
      var formData = this.documentTypeAddForm.value;
      var param = this.documentTypeAddService.addDocumentTypeCall(formData);
      console.log('request parameters: ', param);
      this.saveDynamicReports(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.documentTypeAddForm, this.formErrors, false)
    }
  }

  saveDynamicReports(param)
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveDocumentTypeDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/documentType");
          this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addReportDetails+"\n"+"Params="+JSON.stringify(param),'add')
      }
      else{
        if(this.commonData.roleType == this.commonDataShareService.makerRole) {
          this.documentTypeAddForm.patchValue({
            documentType: this.dynamicReportsFields.documentType,
            // documentList: this.dynamicReportsFields.documentList,
            appId: this.dynamicReportsFields.appId,
            status: this.dynamicReportsFields.status,
          });
        }
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
    });
  }

  openActionModel(action, formdata) {
    if (this.documentTypeAddForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.tempDocTypeArr= [];
      console.log(formdata);
      formdata.documentList.forEach(element => {
        var data = {
          id: element.id,
          documentName: element.documentName
        }
        this.tempDocTypeArr.push(data);
      });
      console.log('temp docType Array: ', this.tempDocTypeArr);

      this.selectedItems = this.tempDocTypeArr;

      console.log('selected items: ', this.selectedItems);

      this.dynamicReportsFields.documentType = formdata.documentType;
      // this.dynamicReportsFields.documentList = formdata.documentList;
      this.dynamicReportsFields.appId = formdata.appId;
      this.dynamicReportsFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.documentTypeAddForm, this.formErrors, false)
    }
  }

  addDynamicReportsWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.documentTypeAddService.addDocumentTypeCalltWithRemark(this.dynamicReportsFields, this.tempDocTypeArr, formData);
      this.saveDynamicReports(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.selectedItems = this.tempDocTypeArr;
    this.documentTypeAddForm.patchValue({
      documentType: this.dynamicReportsFields.documentType,
      appId: this.dynamicReportsFields.appId,
      status: this.dynamicReportsFields.status,
    });
    closeTinyModel();
  }

}
