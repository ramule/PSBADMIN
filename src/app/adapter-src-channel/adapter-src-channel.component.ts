import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { AdapterSrcChannelService } from 'src/app/adapter-src-channel/adapter-src-channel.service';
import { Location } from '@angular/common';
declare var showToastMessage: any;
declare var $: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
@Component({
  selector: 'app-adapter-src-channel',
  templateUrl: './adapter-src-channel.component.html',
  styleUrls: ['./adapter-src-channel.component.css']
})
export class AdapterSrcChannelComponent implements OnInit {
  adapterSourceChannelForm: FormGroup;
  remarkDeleteForm: FormGroup;
  remarkForm: FormGroup;
  showForm: boolean = false;
  isAddButtonClicked = false;
  roleId: any;
  adapterSourceChannelDetails = [];
  adapterStatus = [];
  selChannelToDelete: any;
  selModel: any;
  formErrors = {
    channelName: '',
    status: '',
    remark: '',
    remarkDelete: ''
  };
  adapterSrcChannelFields = {
    channelName: '',
    status: '',
  }
  masterStatus = [];
  productTypes = [];
  priviledgeDataArr: any = [];
  // id = "67"
  menuLink = "adapterSrcChannel"
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private adapterSourceChannelService: AdapterSrcChannelService
  ) { }

  public buildForm() {
    this.adapterSourceChannelForm = this.form.group({
      channelName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      status: new FormControl('', [Validators.required]),
    });
    this.adapterSourceChannelForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.adapterSourceChannelForm, this.formErrors, true)
    });


    if (this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }

    if (this.selModel == 'deleteChannelWithRemark') {
      this.remarkDeleteForm = this.form.group({
        remarkDelete: new FormControl('', [Validators.required])
      });
      this.remarkDeleteForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkDeleteForm, this.formErrors, true)
      });
    }
  }

  ngOnInit() {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.roleId = this.commonData.roleId;
    this.commonServiceCall.pageName = "Adapter Source Channel";
    this.buildForm();
    // this.getadapterSourceChannelDetails();
    this.getLeftMenuId();
    this.getAppMasterList();
    this.getStatus();
    this.adapterSourceChannelForm.patchValue({
      status: 'Y'
    })
    this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAdaptrSrcChannel + "\n" + "Params={}", 'view')
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
    var param = this.adapterSourceChannelService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }



  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonData.submenuId = res.result[0].id;
        this.commonData.submenuname = res.result[0].menuLink;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getadapterSourceChannelDetails();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  openActionModel(action, formdata) {
    if (this.adapterSourceChannelForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.adapterSrcChannelFields.channelName = formdata.channelName;
      this.adapterSrcChannelFields.status = formdata.status;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.adapterSourceChannelForm, this.formErrors, false)
    }
  }

  showHideForm() {
    this.showForm = !this.showForm
    this.isAddButtonClicked = true;
    this.adapterSourceChannelForm.patchValue({
      status: 3
    })
  }

  cancel() {
    this.showForm = !this.showForm;
    this.adapterSourceChannelForm.reset();
    this.isAddButtonClicked = false;
    this.getadapterSourceChannelDetails();
  }


  getadapterSourceChannelDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAdaptrSrcChannel).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        res.result.forEach(element => {
          if (element.statusId !== 23) {
            this.adapterSourceChannelDetails.push(element);
          }
        });
        // this.adapterSourceChannelDetails = res.result;
        console.log('Adapter Source Channel array: ', this.adapterSourceChannelDetails);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAdaptrSrcChannel, res);
      }
      $('#dt-sample').DataTable().clear().destroy();
    });
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

  /*Download Buttons for Table*/
  excelDownload() {
    $('.buttons-excel').click()
  }

  pdfDownload() {
    $('.buttons-pdf').click()
  }

  csvDownload() {
    $('.buttons-csv').click()
  }

  addAdapterSourceChannel() {
    this.formValidation.markFormGroupTouched(this.adapterSourceChannelForm);
    if (this.adapterSourceChannelForm.valid) {
      var formData = this.adapterSourceChannelForm.value;
      var param = this.adapterSourceChannelService.addAdapterSourceChannelCall(formData);
      console.log('request parameters: ', param);
      this.saveAdapterSorceChannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.adapterSourceChannelForm, this.formErrors, false)
    }
  }

  addAdapterSourceChannelWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.adapterSourceChannelService.addAdapterSourceChannelWithRemarkCall(this.adapterSrcChannelFields, formData);
      this.saveAdapterSorceChannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  saveAdapterSorceChannel(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addAdapterSrcChannel, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.getadapterSourceChannelDetails();
        this.cancel();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.addAdapterSrcChannel + "\n" + "Params=" + JSON.stringify(param), 'add')
      }
      else {
        if (this.commonData.roleType == this.commonData.makerRole) {
          this.adapterSourceChannelForm.patchValue({
            channelName: this.adapterSrcChannelFields.channelName,
            status: this.adapterSrcChannelFields.status,
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addAdapterSrcChannel, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openModelToDelete(item) {
    this.selChannelToDelete = item;
    this.commonData.adapterChannel.createdon = item.createdon;
    this.selModel = 'deleteChannel';
    openTinyModel();
  }

  openModelToDeleteWithRemark(action, item) {
    openTinyModel();
    this.selModel = action;
    this.buildForm();
    console.log(action);
    this.selChannelToDelete = item;
    this.commonData.adapterChannel.createdon = item.createdon;
  }

  deleteChannel() {
    closeTinyModel();
    console.log('deleting item: ', this.selChannelToDelete);
    var formData = this.selChannelToDelete;
    var param = this.adapterSourceChannelService.deleteChannelCall(formData);
    this.deleteAdapterchannel(param);
  }

  deleteChannelWithRemark(remarkData) {
    console.log('deleting item: ', this.selChannelToDelete);
    this.formValidation.markFormGroupTouched(this.remarkDeleteForm);
    if (this.remarkDeleteForm.valid) {
      closeTinyModel();
      var formData = this.selChannelToDelete;
      var param = this.adapterSourceChannelService.deleteChannelWithRemarkCall(formData, remarkData);
      this.deleteAdapterchannel(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.remarkDeleteForm, this.formErrors, false);
    }
  }

  deleteAdapterchannel(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.deletetAdapterSrcChannel, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.deletetAdapterSrcChannel + this.selChannelToDelete.id + "\n" + "Params={}", 'delete')
        this.getadapterSourceChannelDetails();
      }
      else {
        this.errorCallBack(this.appConstants.deletetAdapterSrcChannel, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  editAdapterSourceChannelDetails(item) {
    console.log(item);
    if (item.statusName === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonData.adapterChannel.createdon = item.createdon;
      this.commonData.submenuname = "adapterSrcChannelEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/adapterSrcChannelEdit", { state: { id: item.id } });
    }
  }

  closeActionModel() {
    this.adapterSourceChannelForm.patchValue({
      channelName: this.adapterSrcChannelFields.channelName,
      status: this.adapterSrcChannelFields.status,
    });
    closeTinyModel();
  }

  cancelClick() {
    this.commonMethod.cancel();
  }
}
