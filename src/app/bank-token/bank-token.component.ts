import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { BankTokenService } from './bank-token.service';
import { CommonDataShareService } from '../common-data-share.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-bank-token',
  templateUrl: './bank-token.component.html',
  styleUrls: ['./bank-token.component.css']
})
export class BankTokenComponent implements OnInit {

  id = 66;
  menuLink = "bankToken";
  priviledgeDataArr: any = [];
  bankTokenForm: FormGroup;
  type: any;
  todayDate: any;
  p: number = 1;
  customerDetails: any = [];
  newCustDetails: any = [];
  toDateValid: boolean = false;
  isToDateValidError: any = "";
  displayImage: any;
  selUserToResetPass: any;
  selModel: any;
  selectedTokenToDelete;
  formErrors = {
    searchBy: '',
    cifNo: '',
    customerName: '',
    mobileNo: '',
    fromDate: '',
    toDate: '',
    //type: ''
  }
  selectedChannel:any=""
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe,
    private bankTokenService: BankTokenService,
    public CommonData: CommonDataShareService
  ) { }

  public buildForm() {
    this.bankTokenForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.bankTokenForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.bankTokenForm, this.formErrors, true)
    });
  }


  ngOnInit() {
    this.commonServiceCall.pageName = "Bank Token";
    this.buildForm();
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.bankTokenService.addAuditTrailAdaptorParams(URL, operation);
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
        this.CommonData.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.CommonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
         // this.getBankTokenDetails();
         // this.getCorpBankTokenDetails()
         this.commonMethod.hideLoader();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
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

  getBankTokenDetails() {
    this.customerDetails = []
    this.commonMethod.showLoader();
    var param = {
      "id1": this.CommonData.user_ID
    }
    this.commonServiceCall.postResponsePromise(this.appConstants.getTicketListUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        //initiallize datatable
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getTicketListUrl + "\n" + "Params={}", 'view')
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.customerDetails = res.result;
        console.log('new array: ', this.customerDetails);
      } else if (res.responseCode == "202") {
        showToastMessage(res.responseMessage)
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.errorCallBack(this.appConstants.getTicketListUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  getCorpBankTokenDetails() {
    this.customerDetails = []
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise("corpbanktoken/getBankTokenRequestForCorp").subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        //initiallize datatable
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + "corpbanktoken/getBankTokenRequestForCorp" + "\n" + "Params={}", 'view')
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.customerDetails = res.result;
        console.log('new array: ', this.customerDetails);
      } else if (res.responseCode == "202") {
        showToastMessage(res.responseMessage)
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.errorCallBack("corpbanktoken/getBankTokenRequestForCorp", res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  openTinyModelAction(item) {
    if (item.statusname == 'TOKEN GENERATED' || item.statusname == 'REJECTED') {
      showToastMessage('You Cannot Perform This Action');
      return;
    }
    this.selModel = 'deleteToken';
    this.selectedTokenToDelete = item;
    openTinyModel();
  }

  deleteToken() {
    closeTinyModel();
    var param = this.bankTokenService.deleteTokenCall(this.selectedTokenToDelete.id);
    if(this.selectedChannel=="Retail")
    this.deleteTokenDetails(param);
    else
    this.deleteCorpTokenDetails(param)

  }

  deleteTokenDetails(param) {
    console.log('deleted id: ', param);
    this.commonServiceCall.postResponsePromise(this.appConstants.deleteBankTokenUrl, param).subscribe(data => {
      var res = data.resp;
      console.log('delete response: ', res);
      if (res) {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.getBankTokenDetails();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.deleteBankTokenUrl, res);
      }
    })
  }

  deleteCorpTokenDetails(param) {
    console.log('deleted id: ', param);
    this.commonServiceCall.postResponsePromise("corpbanktoken/rejectBankTokenForCorp", param).subscribe(data => {
      var res = data.resp;
      console.log('delete response: ', res);
      if (res) {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.getBankTokenDetails();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack("corpbanktoken/rejectBankTokenForCorp", res);
      }
    })
  }

  getKycImage(item) {
    console.log('item', item);
    if (item.base64 === null || item.base64 === '' || item.base64 === undefined) {
      showToastMessage('Customer Image Not Available');
    }
    else {
      this.selModel = 'kycImage';
      openTinyModel();
      this.getKycImage = item.base64;
    }
  }

  closeActionModel() {
    this.selModel = "";
    closeTinyModel();
  }

  gotoBankTokenDetails(item) {
    if (item.statusName == 'TOKEN GENERATED' || item.statusName == 'REJECTED' || item.statusName == 'ADMIN APPROVER PENDING') {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      // this.commonData.masterCalculator.createdon = item.createdon;
      this.CommonData.submenuname = "bankTokenEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.CommonData.bankTokenData.channel = item.channel;
      this.router.navigateByUrl("/bankTokenEdit", { state: { id: item.id, channel:this.selectedChannel } });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.commonMethod.cancel();
  }

  refresh()
  {
    if( this.selectedChannel=='Retail')
    this.getBankTokenDetails();
    else
    this.getCorpBankTokenDetails()
  }

  selectedValue(value)
  {
    this.selectedChannel = value
    if(value=='Retail') {
      this.getBankTokenDetails();
    }
    else if(value == 'Corp') {
      this.getCorpBankTokenDetails();
    }
  }
}
