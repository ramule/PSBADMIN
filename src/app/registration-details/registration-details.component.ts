import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
//import { AuditTransactionsService } from './audit-transactions.service';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
import { RegistrationDetailsService } from './registration-details.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.css']
})
export class RegistrationDetailsComponent implements OnInit {
  [x: string]: any;

  menuLink = "auditTransaction";
  priviledgeDataArr: any = [];
  auditTransactionForm: FormGroup;
  formErrors = {
    fromDate: '',
    toDate: '',
    // type: ''
  }
  showForm: boolean = false;
  toDateValid: boolean = false;
  isToDateValidError: any = "";
  p: number = 1;
  todayDate;

  auditTransaction: any = [];
  selectedChannel:any=""
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
   // public auditService: AuditTransactionsService,
    public appConstants: AppConstants,
    public datePipe: DatePipe,
    public commonData:CommonDataShareService,
    public registrationDetailsService : RegistrationDetailsService
  ) { }

  public buildForm() {
    this.auditTransactionForm = this.form.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    });
    this.auditTransactionForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.auditTransactionForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Registration Details";
    this.buildForm();
    this.getLeftMenuId()
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.commonMethod.hideLoader();
    // this.getRegistrationDetails();
  }


  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(!this.priviledgeDataArr.viewChecked) {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.auditService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }


  cancel() {
    this.commonMethod.cancel();
  }

  showHideForm() {
    this.showForm = !this.showForm
  }

  onDateChange(value) {
    if (value.fromDate != "" && value.toDate != "") {
      if (value.toDate < value.fromDate) {
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "*Please enter valid date";
      }
      else {
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }

  getRegistrationDetails() {
    this.formValidation.markFormGroupTouched(this.auditTransactionForm);
    if (this.auditTransactionForm.valid) {
      if (this.toDateValid) { return; }
      var formData = this.auditTransactionForm.value;
      console.log("formData == " ,formData)
      // var param = {
      //   fromdate: formData.fromDate,
      //   todate: formData.toDate
      // }

     // this.router.navigateByUrl('/registrationDetailsTable');

     // var req = '/' + formData.type
      var param = this.registrationDetailsService.getRegistrationDetails(this.auditTransactionForm.value);

      this.getRegistrationDetailsParam(param);

    } else {
      this.formErrors = this.formValidation.validateForm(this.auditTransactionForm, this.formErrors, false)
    }
  }

  getRegistrationDetailsParam(param) {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getRegistrationDetails, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        //this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getRegistrationDetails+"\n"+"Params="+JSON.stringify(param),'view')
        console.log(res);
        this.auditTransaction = res.result;
       // intisiallize data table
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.auditTransaction = res.result;
        //console.log("result",res.result);
       // console.log("auditTransaction data",this.auditTransaction);
        if (this.auditTransaction.length < 1) {
          showToastMessage("No Record Available");
        }
        this.commonMethod.hideLoader();
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getRegistrationDetails, res);
      }
    })
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.getRegistrationDetails) {
      this.commonMethod.errorMessage(res);
    }
  }

  // getBankTokenDetails() {
  //   this.customerDetails = []
  //   this.commonMethod.showLoader();
  //   this.commonServiceCall.getResponsePromise(this.appConstants.getTicketListUrl).subscribe((data) => {
  //     var res = data.resp;
  //     if (res.responseCode == "200") {
  //       console.log(res);
  //       //initiallize datatable
  //       this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getTicketListUrl + "\n" + "Params={}", 'view')
  //       this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
  //       this.customerDetails = res.result;
  //       console.log('new array: ', this.customerDetails);
  //     } else if (res.responseCode == "202") {
  //       showToastMessage(res.responseMessage)
  //       setTimeout(function () {
  //         $('table.display').DataTable({
  //           "language": {
  //             "emptyTable": "No Data found"
  //           }
  //         })
  //       });
  //     } else {
  //       this.errorCallBack(this.appConstants.getTicketListUrl, res);
  //     }
  //     this.commonMethod.hideLoader();
  //     this.commonMethod.destroyDataTable();
  //   });
  // }

  // getCorpBankTokenDetails() {
  //   this.customerDetails = []
  //   this.commonMethod.showLoader();
  //   this.commonServiceCall.getResponsePromise("corpbanktoken/getBankTokenRequestForCorp").subscribe((data) => {
  //     var res = data.resp;
  //     if (res.responseCode == "200") {
  //       console.log(res);
  //       //initiallize datatable
  //       this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + "corpbanktoken/getBankTokenRequestForCorp" + "\n" + "Params={}", 'view')
  //       this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
  //       this.customerDetails = res.result;
  //       console.log('new array: ', this.customerDetails);
  //     } else if (res.responseCode == "202") {
  //       showToastMessage(res.responseMessage)
  //       setTimeout(function () {
  //         $('table.display').DataTable({
  //           "language": {
  //             "emptyTable": "No Data found"
  //           }
  //         })
  //       });
  //     } else {
  //       this.errorCallBack("corpbanktoken/getBankTokenRequestForCorp", res);
  //     }
  //     this.commonMethod.hideLoader();
  //     this.commonMethod.destroyDataTable();
  //   });
  // }




}
