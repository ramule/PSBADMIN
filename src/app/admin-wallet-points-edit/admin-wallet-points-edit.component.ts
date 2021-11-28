import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe, DatePipe } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { AdminWalletPointsEditService } from './admin-wallet-points-edit.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-admin-wallet-points-edit',
  templateUrl: './admin-wallet-points-edit.component.html',
  styleUrls: ['./admin-wallet-points-edit.component.css']
})
export class AdminWalletPointsEditComponent implements OnInit {

  showForm: boolean = false;
  toDateValid: boolean = false;
  isToDateValidError: any = "";
  todayDate: any;
  rewardPointsForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    rewardPointsType: '',
    transAmt: '',
    rewardPoints: '',
    productName: '',
    status: '',
    fromDate: '',
    toDate: '',
    remark: ''
  }

  rewardPointsFields = {
    rewardPointsType: '',
    transAmt: '',
    rewardPoints: '',
    status: '',
    productName: '',
    fromDate: '',
    toDate: ''
  }




  //feild parameter
  beforeParam: any = []
  masterStatus = [];
  selectedUser = [];
  userId: any;
  remarkHistoryArr: any = [];

  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant: AppConstants,
    private commonMethod: CommonMethods,
    public titlecasePipe: TitleCasePipe,
    public datePipe: DatePipe,
    private adminWalletPointsEditService: AdminWalletPointsEditService
  ) { }


  public buildForm() {
    this.rewardPointsForm = this.form.group({
      rewardPointsType: new FormControl(''),
      transAmt: new FormControl('', [Validators.required]),
      rewardPoints: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      productName: new FormControl(''),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required])
    });
    this.rewardPointsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.rewardPointsForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Reward Points Details";
    this.roleId = this.commonData.roleId;
    this.userId = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getRemarkHistoryData(this.userId.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.adminWalletPointsEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
    })
  }


  getWalletDtl(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getRewardPointsById + param).subscribe((result) => {
      var res = result.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('result: ', res.result);
        var result = res.result[0];
        this.beforeParam = res.result[0];
        if (res.result[0].userAction != null) {
          this.rewardPointsForm.patchValue({
            rewardPointsType: result.configtype,
            fromDate: result.fromdate != null ? this.datePipe.transform(result.fromdate, 'yyyy-MM-dd') : '-',
            toDate: result.todate != null ? this.datePipe.transform(result.todate, 'yyyy-MM-dd') : '-',
            transAmt: result.amount,
            rewardPoints: result.points,
            productName: result.shortname != null ? this.titlecasePipe.transform(result.shortname) : '-',
            status: result.userAction
          })
        }
        else {
          this.rewardPointsForm.patchValue({
            rewardPointsType: result.configtype,
            fromDate: result.fromdate != null ? this.datePipe.transform(result.fromdate, 'yyyy-MM-dd') : '-',
            toDate: result.todate != null ? this.datePipe.transform(result.todate, 'yyyy-MM-dd') : '-',
            transAmt: result.amount,
            rewardPoints: result.points,
            productName: result.shortname != null ? this.titlecasePipe.transform(result.shortname) : '-',
            status: result.statusid
          })
        }


      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getMasterSubMenuById, res);
      }

    })
  }

  onDateChange(value) {
    if (value.fromDate != "" && value.toDate != "") {
      if (value.toDate < value.fromDate) {
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* Please enter valid date";
      }
      else {
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }

  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        this.masterStatus = [];
        data.resp.forEach(el => {
          if (el.id == 3 || el.id == 0) {
            this.masterStatus.push(el);
          }
        });
        this.getWalletDtl(this.userId.id);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.masterStatusUrl, res);
      }
    });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.rewardPointsForm);
    if (this.rewardPointsForm.valid) {
      var formData = this.rewardPointsForm.value;
      var param = this.adminWalletPointsEditService.adminWalletPointUpdateCall(formData, this.userId.id);
      this.updateWalletPoint(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.rewardPointsForm, this.formErrors, false)
    }
  }
  updateWalletPoint(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.updateWalletPoints
    this.commonServiceCall.postResponsePromise(url, param).subscribe(data => {
      if (this.toDateValid) return;
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.updateWalletPoints + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParam), 'update')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        if (this.commonServiceCall.makerRequestEditUrl == '/adminWalletPoints') {
          this.router.navigateByUrl("/adminWalletPoints");
        }
        else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
          this.router.navigateByUrl("/makerRequests");
        }
        else {
          this.router.navigateByUrl("/adminWalletPoints");
        }
      } else {
        this.rewardPointsForm.patchValue({
          rewardPointsType: this.rewardPointsFields.rewardPointsType,
          fromDate: this.rewardPointsFields.fromDate,
          toDate: this.rewardPointsFields.toDate,
          transAmt: this.rewardPointsFields.transAmt,
          rewardPoints: this.rewardPointsFields.rewardPoints,
          productName: this.rewardPointsFields.productName,
          status: this.rewardPointsFields.status
        })
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.addWalletPoints, res);
      }

    })
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {

    if (this.commonServiceCall.makerRequestEditUrl == '/adminWalletPoints') {
      this.router.navigateByUrl("/adminWalletPoints");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/adminWalletPoints");
    }
  }

  openActionModel(action, formdata) {
    if (this.rewardPointsForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.rewardPointsFields.rewardPointsType = formdata.rewardPointsType;
      this.rewardPointsFields.transAmt = formdata.transAmt;
      this.rewardPointsFields.status = formdata.status;
      this.rewardPointsFields.productName = formdata.productName;
      this.rewardPointsFields.fromDate = formdata.fromDate;
      this.rewardPointsFields.toDate = formdata.toDate;
      this.rewardPointsFields.rewardPoints = formdata.rewardPoints;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.rewardPointsForm, this.formErrors, false)
    }
  }

  updateWalletPointsWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.adminWalletPointsEditService.adminWalletPointUpdateCallWithRemark(this.rewardPointsFields, this.userId.id, formdata);
      console.log(param);
      this.updateWalletPoint(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.rewardPointsForm.patchValue({
      rewardPointsType: this.rewardPointsFields.rewardPointsType,
      fromDate: this.rewardPointsFields.fromDate,
      toDate: this.rewardPointsFields.toDate,
      transAmt: this.rewardPointsFields.transAmt,
      rewardPoints: this.rewardPointsFields.rewardPoints,
      productName: this.rewardPointsFields.productName,
      status: this.rewardPointsFields.status
    })
    closeTinyModel();
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstant.getRemarkHistoryDataUrl + id + "/" + this.commonData.submenuId).subscribe((data) => {
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
        this.errorCallBack(this.appConstant.getRemarkHistoryDataUrl, res);
      }
    });
  }


}
