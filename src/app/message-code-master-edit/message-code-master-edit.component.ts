import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from "@angular/common";
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MessageCodeMasterEditService } from './message-code-master-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-message-code-master-edit',
  templateUrl: './message-code-master-edit.component.html',
  styleUrls: ['./message-code-master-edit.component.css']
})
export class MessageCodeMasterEditComponent implements OnInit {

  languageArray: any = [];
  remarkHistoryArr:any=[];
  status:any = [];
  activityArr: any = [];
  selectedMsgCode: any = [];
  beforeParam: any = [];
  productTypes: any = [];
  selModel: any;
  msgCodeData: any;
  messageCodeMasterEditForm: FormGroup;
  remarkForm: FormGroup;
  selectedChannel: any;

  formErrors = {
    messageCodeName:'',
    messageCodeDesc: '',
    languagecode:'',
    statusId:'',
    errorCode:'',
    activityCode:'',
    productType:'',
    remark: ''
  }

  messageCodeMasterAddFields = {
    messageCodeName:'',
    messageCodeDesc: '',
    languagecode:'',
    statusId:'',
    errorCode:'',
    activityCode:'',
    productType:'',
  }

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public messageCodeMasterEditService : MessageCodeMasterEditService,
    public appConstants : AppConstants,
    public commonMethod : CommonMethods,
    private location: Location,
  ) { }

  ngOnInit(): void {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/messageCodeMaster');
      return;
    }

    this.commonServiceCall.pageName = "Edit Message Code Master";
    this.msgCodeData = this.location.getState();
    this.buildForm();
    this.getLanguage();
    this.getStatus();
    this.getAllFacilityDetails();
    this.getAppMasterList();
    this.getMessageCodeById(this.msgCodeData.id);
    this.getRemarkHistoryData(this.msgCodeData.id);
  }

  //on load functions
  getAppMasterList() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstants.masterListUrl)
    .subscribe((data) => {
      var res = data;
      console.log("response data: ", res);
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        this.productTypes = res.resp;
        console.log("response array: ", this.productTypes);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = this.messageCodeMasterEditService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
   })
  }

  public buildForm() {
    this.messageCodeMasterEditForm = this.form.group({
      messageCodeName: new FormControl('', [Validators.required]),
      messageCodeDesc: new FormControl('', [Validators.required]),
      errorCode: new FormControl('', [Validators.required]),
      languagecode: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
      activityCode: new FormControl('', [Validators.required])
    });
    this.messageCodeMasterEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.messageCodeMasterEditForm, this.formErrors, true)
    });

    if (this.selModel == "remarkField") {
      this.remarkForm = this.form.group({
        remark: new FormControl("", [Validators.required]),
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.remarkForm,
          this.formErrors,
          true
        );
      });
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

  getMessageCodeById(id){
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getMessageCodeMasterDetailsByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.beforeParam =  res.result[0];
        this.selectedMsgCode = res.result[0];

        console.log(res);
        if(res.result[0].userAction !=null) {
          this.messageCodeMasterEditForm.patchValue({
            messageCodeName: res.result[0].shortName,
            statusId: res.result[0].userAction,
            messageCodeDesc: res.result[0].description,
            errorCode: res.result[0].errorCode,
            activityCode: res.result[0].activityCodeName,
            languagecode: res.result[0].i18nCode,
            productType: res.result[0].appId,
          })
        }else{
          this.messageCodeMasterEditForm.patchValue({
            messageCodeName: res.result[0].shortName,
            statusId: res.result[0].statusId,
            messageCodeDesc: res.result[0].description,
            errorCode: res.result[0].errorCode,
            activityCode: res.result[0].activityCodeName,
            languagecode: res.result[0].i18nCode,
            productType: res.result[0].appId,
          })
        }
        this.commonMethod.hideLoader();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getMessageCodeMasterDetailsByIdUrl, res);
      }

    })
  }

  //on load functions
  getAllFacilityDetails(){
    this.commonMethod.showLoader();
    // $('#dt-sample').DataTable().clear().destroy();
    this.commonServiceCall.getResponsePromise(this.appConstants.getDistinctActivityMasterRecordsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        // this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.activityArr = res.result;
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getDistinctActivityMasterRecordsUrl, res);
      }
      // $('#dt-sample').DataTable().clear().destroy();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  /* It brings dynamic languages*/
  getLanguage() {
    var url = this.appConstants.getDistinctLanguageJsonCode;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.languageArray = res.result;
      } else {
        showToastMessage(res.responseMessage);
      }
    });
  }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.status = data.resp;
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  filterStatus()
  {
    return this.status.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  filterProduct()
  {
    return this.commonDataShareService.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "UPIDESKTOP" || x.shortName == "UPIMOBILE" || x.shortName == "ALL");
  }

  openActionModel(action, formdata) {
    if (this.messageCodeMasterEditForm.valid) {

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.messageCodeMasterAddFields.messageCodeName = formdata.messageCodeName;
      this.messageCodeMasterAddFields.messageCodeDesc = formdata.messageCodeDesc;
      this.messageCodeMasterAddFields.languagecode = formdata.languagecode;
      this.messageCodeMasterAddFields.errorCode = formdata.errorCode;
      this.messageCodeMasterAddFields.statusId = formdata.statusId;
      this.messageCodeMasterAddFields.activityCode = formdata.activityCode;
      this.messageCodeMasterAddFields.productType = formdata.productType;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.messageCodeMasterEditForm, this.formErrors, false)
    }
  }

  closeActionModel() {
    this.messageCodeMasterEditForm.patchValue({
      messageCodeName: this.messageCodeMasterAddFields.messageCodeName,
      messageCodeDesc: this.messageCodeMasterAddFields.messageCodeDesc,
      errorCode: this.messageCodeMasterAddFields.errorCode,
      statusId: this.messageCodeMasterAddFields.statusId,
      languagecode: this.messageCodeMasterAddFields.languagecode,
      activityCode: this.messageCodeMasterAddFields.activityCode,
      productType: this.messageCodeMasterAddFields.productType,
    });
    closeTinyModel();
  }

  updateMessageCodeWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.messageCodeMasterEditService.updateMessageCodeWithRemarkCall(this.messageCodeMasterAddFields, this.msgCodeData.id, this.selectedMsgCode ,this.remarkForm.value, this.selectedChannel);
      this.updateMsgcode(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  updateMessageCode(){
    this.formValidation.markFormGroupTouched(this.messageCodeMasterEditForm);
    if (this.messageCodeMasterEditForm.valid) {
      var param = this.messageCodeMasterEditService.updateMessageCodeCall(this.messageCodeMasterEditForm.value, this.msgCodeData.id, this.selectedMsgCode, this.selectedChannel);
        this.updateMsgcode(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.messageCodeMasterEditForm, this.formErrors, false)
    }
  }

  updateMsgcode(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateMessageCodeUrl, param).subscribe(data => {
      var res = data.resp;
      console.log('edit message code response: ', res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateConfigMasterUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParam), 'update')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.messageCodeMasterEditForm.patchValue({
            messageCodeName: this.messageCodeMasterAddFields.messageCodeName,
            messageCodeDesc: this.messageCodeMasterAddFields.messageCodeDesc,
            errorCode: this.messageCodeMasterAddFields.errorCode,
            statusId: this.messageCodeMasterAddFields.statusId,
            languagecode: this.messageCodeMasterAddFields.languagecode,
            activityCode: this.messageCodeMasterAddFields.activityCode,
            productType: this.messageCodeMasterAddFields.productType,
          });
        }
        this.errorCallBack(this.appConstants.updateMessageCodeUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  cancel() {
    if(this.commonServiceCall.makerRequestEditUrl == '/messageCodeMaster') {
      this.router.navigateByUrl("/messageCodeMaster");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/messageCodeMaster");
    }
  }

  onProductChange(event) {
    console.log(event.target.value);
    this.commonDataShareService.productTypes.forEach(element => {
      if(element.id == event.target.value) {
        this.selectedChannel = element.shortName;
      }
    });
    console.log('selected channel: ', this.selectedChannel);
  }

}
