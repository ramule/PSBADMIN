import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsSwitchTransactionService } from './imps-switch-transaction.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-switch-transaction',
  templateUrl: './imps-switch-transaction.component.html',
  styleUrls: ['./imps-switch-transaction.component.css']
})
export class ImpsSwitchTransactionComponent implements OnInit {

  impsSwitchTransForm: FormGroup;
  viewForm: FormGroup;
  toDateValid: boolean = false;
  isViewData: boolean = false;
  todayDate:any;
  type: any;
  menuLink = "impsSwitchTrans";
  isToDateValidError:any = "";
  impsSwitchTransArr: any = [];
  priviledgeDataArr: any = [];
  viewDataArray: any = [];
  formErrors = {
    searchBy: '',
    rrn: '',
    fromDate: '',
    toDate: '',
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private impsSwitchTransactionService: ImpsSwitchTransactionService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Switch Transaction Log";
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.buildForm();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsSwitchTransactionService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonDataService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  getPriviledgeData(id) {
    var url =
      this.appConstants.getPriviledgeDataUrl +
      id +
      "/" +
      this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  public buildForm() {
    this.impsSwitchTransForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.impsSwitchTransForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsSwitchTransForm, this.formErrors, true)
    });
  }

  onSubmitClicked() {
    this.formValidation.markFormGroupTouched(this.impsSwitchTransForm);

    if (this.impsSwitchTransForm.valid) {
      if(this.toDateValid){ return; }
      var formData = this.impsSwitchTransForm.value;
      if (this.type == 'date') {
        var params = this.impsSwitchTransactionService.getSwitchTransByDateCall(formData);
        this.getTransactionLogsByDate(params);
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsSwitchTransForm, this.formErrors, false)
    }
  }

  onViewClicked(item) {
    this.isViewData = true;
    console.log(item);

    this.impsSwitchTransArr.forEach(element => {
      if(element.id == item.id) {
        this.viewDataArray.push(item);
        console.log('viewDataArray: ', this.viewDataArray);
      }
    });
  }

  cancelView() {

    var fromdateVal = this.impsSwitchTransForm.get('fromDate').value;
    var toVal = this.impsSwitchTransForm.get('toDate').value;

    var inputData = {
      "fromdate": fromdateVal,
      "todate": toVal
    }
    this.getTransactionLogsByDate(inputData);
    this.isViewData = false;
    this.viewDataArray = [];
  }

  getTransactionLogsByDate(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.getTransLogsUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      if (res.result.responseCode == "200") {
        console.log("response data: ", res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsSwitchTransArr = res.result.result;
        console.log("IMPS Switch Trans: ", this.impsSwitchTransArr);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getTransLogsUrl + "\n" + "Params={}", 'view')
      } else {
        showToastMessage(res.result.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  getSearchTransLog(value) {
    this.toDateValid = false;
    console.log(value);
    this.type = value.searchBy;
    this.impsSwitchTransArr = [];
    this.impsSwitchTransForm.removeControl('fromDate');
    this.impsSwitchTransForm.removeControl('toDate');

    if (this.type == 'date') {
      this.impsSwitchTransForm.addControl('fromDate', new FormControl('', [Validators.required]));
      this.impsSwitchTransForm.addControl('toDate', new FormControl('', [Validators.required]));
    }
  }

  onDateChange(value){
    if(value.fromDate != "" && value.toDate != ""){
      if(value.toDate < value.fromDate){
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* From date can't be greater than to date";
        this.impsSwitchTransArr = [];
      }
      else{
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }

  cancel(){
    this.commonMethod.cancel();
  }

}
