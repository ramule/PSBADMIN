import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MessageCodeMasterAddService } from './message-code-master-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-message-code-master-add',
  templateUrl: './message-code-master-add.component.html',
  styleUrls: ['./message-code-master-add.component.css']
})
export class MessageCodeMasterAddComponent implements OnInit {

  languageArray: any = [];
  status:any = [];
  activityArr: any = [];
  productTypes: any = [];
  selModel: any;
  selectedChannel: any;
  selectedActivity: any;
  messageCodeMasterAddForm: FormGroup;
  remarkForm: FormGroup;

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
    public messageCodeMasterAddService : MessageCodeMasterAddService,
    public appConstants : AppConstants,
    public commonMethod : CommonMethods,
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Message Code Master";
    this.buildForm();
    this.getLanguage();
    this.getStatus();
    this.getAllFacilityDetails();
    this.getAppMasterList();
    this.messageCodeMasterAddForm.patchValue({
      statusId: 3
    });
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
    var param = this.messageCodeMasterAddService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
   })
  }

  public buildForm() {
    this.messageCodeMasterAddForm = this.form.group({
      messageCodeName: new FormControl('', [Validators.required]),
      messageCodeDesc: new FormControl('', [Validators.required]),
      errorCode: new FormControl('', [Validators.required]),
      languagecode: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
      activityCode: new FormControl('', [Validators.required])
    });
    this.messageCodeMasterAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.messageCodeMasterAddForm, this.formErrors, true)
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

  //on load functions
  getAllFacilityDetails(){
    this.commonMethod.showLoader();
    $('#dt-sample').DataTable().clear().destroy();
    this.commonServiceCall.getResponsePromise(this.appConstants.getDistinctActivityMasterRecordsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.activityArr = res.result;
        console.log('activity code array: ', this.activityArr);
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getDistinctActivityMasterRecordsUrl, res);
      }
      $('#dt-sample').DataTable().clear().destroy();
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
    if (this.messageCodeMasterAddForm.valid) {

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
      this.formErrors = this.formValidation.validateForm(this.messageCodeMasterAddForm, this.formErrors, false)
    }
  }

  closeActionModel() {
    this.messageCodeMasterAddForm.patchValue({
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

  addMessageCodeWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.messageCodeMasterAddService.addMessageCodeWithRemarkCall(this.messageCodeMasterAddFields, this.remarkForm.value, this.selectedChannel, this.selectedActivity);
      this.addMsgCode(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  addMessageCode(){
    this.formValidation.markFormGroupTouched(this.messageCodeMasterAddForm);
    if (this.messageCodeMasterAddForm.valid) {
      var param = this.messageCodeMasterAddService.addMessageCodeCall(this.messageCodeMasterAddForm.value, this.selectedChannel, this.selectedActivity);
        this.addMsgCode(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.messageCodeMasterAddForm, this.formErrors, false)
    }
  }

  addMsgCode(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addMessageCodeUrl, param).subscribe(data => {
      var res = data.resp;
      console.log('add invProduct response: ', res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addMessageCodeUrl+"\n"+"Params="+JSON.stringify(param),'add')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/messageCodeMaster");
      } else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.messageCodeMasterAddForm.patchValue({
            messageCodeName: this.messageCodeMasterAddFields.messageCodeName,
            messageCodeDesc: this.messageCodeMasterAddFields.messageCodeDesc,
            errorCode: this.messageCodeMasterAddFields.errorCode,
            statusId: this.messageCodeMasterAddFields.statusId,
            languagecode: this.messageCodeMasterAddFields.languagecode,
            activityCode: this.messageCodeMasterAddFields.activityCode,
            productType: this.messageCodeMasterAddFields.productType,
          });
        }
        this.errorCallBack(this.appConstants.addMessageCodeUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  cancel() {
    this.router.navigateByUrl("/messageCodeMaster");
  }

  onActivityChange(event) {
    console.log(event.target.value);

    this.activityArr.forEach(element => {
      if(element.id == event.target.value) {
        this.selectedActivity = element.displayname;
      }
    });
    console.log('activity code name: ', this.selectedActivity);
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
