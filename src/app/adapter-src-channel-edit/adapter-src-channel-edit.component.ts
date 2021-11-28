import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { AdapterSrcChannelEditService } from 'src/app/adapter-src-channel-edit/adapter-src-channel-edit.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-adapter-src-channel-edit',
  templateUrl: './adapter-src-channel-edit.component.html',
  styleUrls: ['./adapter-src-channel-edit.component.css']
})
export class AdapterSrcChannelEditComponent implements OnInit {

  adaptersourcechannelEditForm: FormGroup;
  remarkForm: FormGroup;
  roleId: any;
  selModel: any;
  calcMasters = [];
  productTypes = [];
  masterStatus = [];
  remarkHistoryArr: any = [];
  formErrors = {
    channelName: '',
    status: '',
    remark: ''
  };
  adapterSrcChannelEditFields = {
    channelName: '',
    status: '',
  }
  adapterStatus = [];
  selectedAdapterSrcChannel;
  adaptersourcechannel;
  beforeUpdate: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private adapterSourceChannelEditService: AdapterSrcChannelEditService
  ) { }

  public buildForm() {
    this.adaptersourcechannelEditForm = this.form.group({
      channelName: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
      status: new FormControl('', [Validators.required]),
    });
    this.adaptersourcechannelEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.adaptersourcechannelEditForm, this.formErrors, true)
    });

    if (this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Edit Adapter Source Channel";
    this.roleId = this.commonData.roleId;
    this.adaptersourcechannel = this.location.getState();
    this.buildForm();
    this.getAppMasterList();
    this.getStatus();
    this.getAdapterSourceChannelById(this.adaptersourcechannel.id);
    this.getRemarkHistoryData(this.adaptersourcechannel.id);
  }

  //on load functions
  getAppMasterList() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      console.log('response data: ', res);
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.productTypes = res.resp;
        console.log('response array: ', this.productTypes);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  filterProduct() {
    return this.productTypes.filter(x => x.shortName == "WALLET" || x.shortName == "MOBILE" || x.shortName == "DESKTOP");
  }

  openActionModel(action, formdata) {
    if (this.adaptersourcechannelEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.adapterSrcChannelEditFields.channelName = formdata.channelName;
      this.adapterSrcChannelEditFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.adaptersourcechannelEditForm, this.formErrors, false)
    }
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.adapterSourceChannelEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.adapterStatus = res.resp;
        console.log('response array: ', this.adapterStatus);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  filterStatus() {
    return this.adapterStatus.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/" + this.commonData.submenuId).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.remarkHistoryArr = res.result;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
      }
    });
  }

  getAdapterSourceChannelById(id) {
    console.log('editable id: ', id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getAdaptrSrcChannelById + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.selectedAdapterSrcChannel = res.result[0];
        this.beforeUpdate = res.result[0];
        this.adaptersourcechannelEditForm.patchValue({
          channelName: res.result[0].appId,
          status: res.result[0].statusId,
        });
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAdaptrSrcChannelById, res);
      }
    })
  }

  update() {
    this.formValidation.markFormGroupTouched(this.adaptersourcechannelEditForm);
    if (this.adaptersourcechannelEditForm.valid) {
      var formData = this.adaptersourcechannelEditForm.value;
      var param = this.adapterSourceChannelEditService.updateAdapterSourceChannelCall(formData, this.adaptersourcechannel.id)
      this.updateChannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.adaptersourcechannelEditForm, this.formErrors, false)
    }
  }

  updateSrcChannelWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.adapterSourceChannelEditService.updateAdapterSourceChannelWithRemarkCall(this.adapterSrcChannelEditFields, this.adaptersourcechannel.id, formData);
      this.updateChannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  updateChannel(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateAdapterSrcChannel, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        if (this.commonServiceCall.makerRequestEditUrl == '/adapterSrcChannel') {
          this.router.navigateByUrl("/adapterSrcChannel");
        }
        else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
          this.router.navigateByUrl("/makerRequests");
        }
        else {
          this.router.navigateByUrl("/adapterSrcChannel");
        }
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateAdapterSrcChannel + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeUpdate), 'update')
      }
      else {
        if (this.commonData.roleType == this.commonData.makerRole) {
          this.adaptersourcechannelEditForm.patchValue({
            channelName: this.adapterSrcChannelEditFields.channelName,
            status: this.adapterSrcChannelEditFields.status,
          });
        }
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateAdapterSrcChannel, res);
    })
  }

  closeActionMoel() {
    this.adaptersourcechannelEditForm.patchValue({
      channelName: this.adapterSrcChannelEditFields.channelName,
      status: this.adapterSrcChannelEditFields.status,
    });
    closeTinyModel();
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.getAdaptrSrcChannelById) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.updateAdapterSrcChannel) {
      this.commonMethod.errorMessage(res);
    }
  }

  gotoAdapterSourceChannel() {
    if (this.commonServiceCall.makerRequestEditUrl == '/adapterSrcChannel') {
      this.router.navigateByUrl("/adapterSrcChannel");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/adapterSrcChannel");
    }
  }

}
