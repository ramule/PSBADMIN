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

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TransactionsLogsService } from './transactions-logs.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-transactions-logs',
  templateUrl: './transactions-logs.component.html',
  styleUrls: ['./transactions-logs.component.css']
})
export class TransactionsLogsComponent implements OnInit {
  [x: string]: any;

  menuLink = "transactionsLogs";
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

  transactionDetails: any = [];
  //selectedChannel:any=""
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
    public transactionsLogsService : TransactionsLogsService
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
    this.commonServiceCall.pageName = "Transactions Log";
    this.buildForm();
    this.getLeftMenuId()
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.commonMethod.hideLoader();
     //this.getTransactionsDetails();
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
//     addAuditTrailAdaptor(URL,operation)
//     {
//         var param = this.auditService.addAuditTrailAdaptorParams(URL,operation);
//         console.log(param)
//         this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
//         })
//     }


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

  getTransactionsDetails() {
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
      var param = this.transactionsLogsService.getTransactionsDetails(this.auditTransactionForm.value);

      this.getTransactionsDetailsParam(param);

    } else {
      this.formErrors = this.formValidation.validateForm(this.auditTransactionForm, this.formErrors, false)
    }
  }

  getTransactionsDetailsParam(param) {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getTransactionsDetails, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        //this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getRegistrationDetails+"\n"+"Params="+JSON.stringify(param),'view')
        console.log(res);
        this.transactionDetails = res.result;
       // intisiallize data table
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.transactionDetails = res.result;
        //console.log("result",res.result);
       // console.log("auditTransaction data",this.auditTransaction);
        if (this.transactionDetails.length < 1) {
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
        this.errorCallBack(this.appConstants.getTransactionsDetails, res);
      }
    })
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.getTransactionsDetails) {
      this.commonMethod.errorMessage(res);
    }
  }


}
