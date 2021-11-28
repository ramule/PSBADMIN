import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { AdapterSrcIpEditService } from './adapter-src-ip-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-adapter-src-ip-edit',
  templateUrl: './adapter-src-ip-edit.component.html',
  styleUrls: ['./adapter-src-ip-edit.component.css']
})
export class AdapterSrcIpEditComponent implements OnInit {
  beforeParams: any;
  formErrors = {
    adapterChannel: '',
    sourceIp: '',
    status: '',
    remark: ''
  };
  adapterSrcIpEditFields = {
    adapterChannel: '',
    sourceIp: '',
    status: '',
  };
  remarkForm: FormGroup;
  roleId: any;
  selModel: any;
  remarkHistoryArr: any = [];
  adapterSourceChannelDetails = [];
  productTypes: any = [];
  adapterStatus: any = [];
  adapterSourceIpEditForm: FormGroup;
  selectedAdapterSrcIp;
  selAdapterChannel: any;
  adapterSourceIp;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private adapterSrcIpEditService: AdapterSrcIpEditService
  ) { }

  public buildForm() {
    this.adapterSourceIpEditForm = this.form.group({
      adapterChannel: new FormControl('', [Validators.required]),
      sourceIp: new FormControl('', [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)]),
      status: new FormControl('', [Validators.required]),
    });
    this.adapterSourceIpEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.adapterSourceIpEditForm, this.formErrors, true)
    });

    this.remarkForm = this.form.group({
      remark: new FormControl('', [Validators.required])
    });
    this.remarkForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
    });
  }

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.router.navigateByUrl('/adapterSrcIp');
      return;
    }

    this.commonServiceCall.pageName = "Edit Adapter IP";
    this.roleId = this.commonData.roleId;
    this.adapterSourceIp = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    this.getAdapterSourceChannelById(this.adapterSourceIp.id);
    this.getRemarkHistoryData(this.adapterSourceIp.id);
  }

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        var res = data;
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.adapterStatus = res.resp;
          console.log("response array: ", this.adapterStatus);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  filterStatus() {
    return this.adapterStatus.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
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

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.adapterSrcIpEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  openActionModel(action, formdata) {
    if (this.adapterSourceIpEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.adapterSrcIpEditFields.adapterChannel = formdata.adapterChannel;
      this.adapterSrcIpEditFields.sourceIp = formdata.sourceIp;
      this.adapterSrcIpEditFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.adapterSourceIpEditForm, this.formErrors, false)
    }
  }

  closeActionMoel() {
    this.adapterSourceIpEditForm.patchValue({
      adapterChannel: this.adapterSrcIpEditFields.adapterChannel,
      sourceIp: this.adapterSrcIpEditFields.sourceIp,
      status: this.adapterSrcIpEditFields.status,
    });
    closeTinyModel();
  }

  getadapterSourceChannelDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAdaptrSrcChannel).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.adapterSourceChannelDetails = res.result;
        console.log('Adapter Source Channel array: ', this.adapterSourceChannelDetails);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAdaptrSrcChannel, res);
      }
    });
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
    var reqUrl = this.appConstants.getAdapterSrcIpByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.selectedAdapterSrcIp = res.result[0];
        this.beforeParams = res.result[0];
        this.selAdapterChannel = res.result[0].adapterChannel;
        console.log(this.selectedAdapterSrcIp);
        if (res.result[0].userAction != null) {
          this.adapterSourceIpEditForm.patchValue({
            adapterChannel: res.result[0].appId,
            sourceIp: res.result[0].sourceIp,
            status: res.result[0].userAction,
          });
        }
        else {
          this.adapterSourceIpEditForm.patchValue({
            adapterChannel: res.result[0].appId,
            sourceIp: res.result[0].sourceIp,
            status: res.result[0].statusId,
          });
        }
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAdapterSrcIpByIdUrl, res);
      }
    })
  }

  update() {
    console.log('updating channel: ', this.selAdapterChannel);
    this.formValidation.markFormGroupTouched(this.adapterSourceIpEditForm);
    if (this.adapterSourceIpEditForm.valid) {
      var formData = this.adapterSourceIpEditForm.value;
      var param = this.adapterSrcIpEditService.updateAdapterSrcIpCall(formData, this.adapterSourceIp.id, this.selAdapterChannel, this.selectedAdapterSrcIp)
      this.updateChannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.adapterSourceIpEditForm, this.formErrors, false)
    }
  }

  updateSrcIpWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.adapterSrcIpEditService.updateAdapterSrcIpWithRemarkCall(this.adapterSrcIpEditFields, this.adapterSourceIp.id, this.selAdapterChannel, formData, this.selectedAdapterSrcIp);
      this.updateChannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  updateChannel(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateAdapterSrcIpUrl, param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        if (this.commonServiceCall.makerRequestEditUrl == '/adapterSrcIp') {
          this.router.navigateByUrl("/adapterSrcIp");
        }
        else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
          this.router.navigateByUrl("/makerRequests");
        }
        else {
          this.router.navigateByUrl("/adapterSrcIp");
        }
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateAdapterSrcIpUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
      }
      else {
        if (this.commonData.roleType == this.commonData.makerRole) {
          this.adapterSourceIpEditForm.patchValue({
            adapterChannel: this.adapterSrcIpEditFields.adapterChannel,
            sourceIp: this.adapterSrcIpEditFields.sourceIp,
            status: this.adapterSrcIpEditFields.status,
          });
        }
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.errorCallBack(this.appConstants.updateAdapterSrcIpUrl, res);
    })
  }

  gotoAdapterSourceIp() {
    if (this.commonServiceCall.makerRequestEditUrl == '/adapterSrcIp') {
      this.router.navigateByUrl("/adapterSrcIp");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/adapterSrcIp");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
