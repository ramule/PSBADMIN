import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DocumentTypeEditService } from './document-type-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.css']
})
export class DocumentTypeEditComponent implements OnInit {
  documentTypeEditForm: FormGroup;
  selectedItems = [];
  masterStatus: any = [];
  documentTypeArr: any = [];
  documentListArr: any = [];
  productTypes: any = [];
  tempDocTypeArr: any = [];
  stateId: any;
  documentTypeData: any;
  remarkForm: FormGroup;
  formErrors = {
    documentType: '',
    documentList: '',
    statusId: '',
    appId: '',
    remark: ''
  };
  holidayListFields = {
    documentType: '',
    documentList: '',
    appId: '',
    statusId: ''
  }
  roleId: any;
  selModel: any;

  remarkHistoryArr: any = [];
  dropdownSettings :IDropdownSettings;;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private documentTypeEditService : DocumentTypeEditService,
    private location: Location,
    private datePipe: DatePipe
  ) { }


  public buildForm() {
    this.documentTypeEditForm = this.form.group({
      documentType: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      documentList: new FormControl('', [Validators.required]),
      appId: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
    });
    this.documentTypeEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.documentTypeEditForm, this.formErrors, true)
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
      this.router.navigateByUrl('/documentType');
      return;
    }

    this.commonServiceCall.pageName = "Edit Document Type";
    this.roleId = this.commonDataShareService.roleId;
    console.log('Role ID: ',this.roleId);
    this.buildForm();
    this.documentTypeData = this.location.getState();
    this.getStatus();
    this.getDocumentList();
    this.getProductType();
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

    console.log(this.documentTypeData);
    console.log(this.documentTypeData.id);

  }

  onStateChange(event) {
    this.stateId = event.target.value;
    console.log(this.stateId);
  }

  onItemSelect(item: any) {
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getDocumentList() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getDocumentListUrl)
      .subscribe((data) => {
        var tempDocTypeArr = []
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          // this.documentListArr = res.result;

          for(var i=0; i< res.result.length; i++) {
            var data: any = {
              documentName: res.result[i].documentName,
              id: i
            }
            tempDocTypeArr.push(data);
          }
          this.documentListArr = tempDocTypeArr
          console.log(this.documentListArr);
          this.getDocumentTypeById(this.documentTypeData.id);
          this.getRemarkHistoryData(this.documentTypeData.id);
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

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.documentTypeEditService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  getDocumentTypeById(id){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getDocumentTypeByIdUrl+id).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result[0]);
        this.documentTypeArr = res.result[0];
        if(res.result[0].userAction !=null) {
          this.documentTypeEditForm.patchValue({
            documentType: res.result[0].type,
            statusId: res.result[0].userAction,
            appId: res.result[0].appId,
          })
        }
        else {
          this.documentTypeEditForm.patchValue({
            documentType: res.result[0].type,
            statusId: res.result[0].statusId,
            appId: res.result[0].appId,
          })
        }
        var docTypeMainArray = [];
        var docTypeArr = res.result[0].document_list.split(',');

        for(var i = 0; i < docTypeArr.length; i++) {
          var objIndex = this.documentListArr.findIndex((obj) => obj.documentName.toLowerCase() == docTypeArr[i].toLowerCase());
          var objId = this.documentListArr[objIndex].id;
          var objDocName = this.documentListArr[objIndex].documentName;
          var data: any = {
            documentName: objDocName,
            id: objId
          }
          docTypeMainArray.push(data);
        }

        this.selectedItems = docTypeMainArray;
        console.log(docTypeMainArray);
      } else {
        this.errorCallBack(this.appConstants.getDocumentTypeByIdUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  updateDocumentType(){
    this.formValidation.markFormGroupTouched(this.documentTypeEditForm);
    if (this.documentTypeEditForm.valid) {
      var formData = this.documentTypeEditForm.value;
      var param = this.documentTypeEditService.getDocumentTypeEditParam(formData, this.documentTypeArr);
      this.updateDocType(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.documentTypeEditForm, this.formErrors, false)
    }
  }

  updateDocumentTypeWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.documentTypeEditService.getDocumentTypeEditParamWithRemark(this.holidayListFields, this.documentTypeArr, this.tempDocTypeArr, formdata);
      this.updateDocType(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  cancel(){
    if(this.commonServiceCall.makerRequestEditUrl == '/documentType') {
      this.router.navigateByUrl("/documentType");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/documentType");
    }
  }

  updateDocType(param){
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateDocumentTypeDetailsUrl,param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        showToastMessage(res.responseMessage);
        // this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateCalculatorFormula+"\n"+"Params="+JSON.stringify(param)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParams),'update')
        this.cancel();
        this.commonMethod.hideLoader();
      } else {
        if(this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.documentTypeEditForm.patchValue({
            documentType: this.holidayListFields.documentType,
            documentList: this.holidayListFields.documentList,
            statusId: this.holidayListFields.statusId,
            appId: this.holidayListFields.appId
          });
        }
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateDocumentTypeDetailsUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    if (this.documentTypeEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.tempDocTypeArr = [];
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

      this.holidayListFields.documentType = formdata.documentType;
      // this.holidayListFields.documentList = formdata.documentList;
      this.holidayListFields.statusId = formdata.statusId;
      this.holidayListFields.appId = formdata.appId;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.documentTypeEditForm, this.formErrors, false)
    }
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
        this.commonMethod.hideLoader();
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

  closeActionMoel() {
    this.selectedItems = this.tempDocTypeArr;
    this.documentTypeEditForm.patchValue({
      documentType: this.holidayListFields.documentType,
      // documentList: this.holidayListFields.documentList,
      statusId : this.holidayListFields.statusId,
      appId : this.holidayListFields.appId
    });
    closeTinyModel();
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

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }
}
